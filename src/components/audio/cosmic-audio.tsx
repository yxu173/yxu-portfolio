"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type CosmicAudio = {
  playing: boolean;
  toggle: () => void;
  volume: number;
  setVolume: (v: number) => void;
  getLevel: () => number;
  getFrequencyData: () => Uint8Array | null;
  playNote: (
    index: number,
    opts?: { velocity?: number; duration?: number }
  ) => void;
  trackName: string;
  frequency: string;
};

const TRACK_NAME = "Cairo Nights — generative";
const FREQUENCY = "88.7 MHz";
const VOLUME_KEY = "yxu-fm-volume";
const DEFAULT_VOLUME = 0.6;
const FADE_SECONDS = 1.5;
const PAD_LEVEL = 0.5;
const PAD_VOICE_LEVEL = 0.11;

const PENTATONIC = [
  220.0, // A3
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.0, // G4
  440.0, // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
];

const CHORDS = [
  [220.0, 261.63, 329.63, 493.88], // Am9
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [130.81, 164.81, 196.0, 246.94], // Cmaj7
  [196.0, 246.94, 293.66, 329.63], // G6
];

type PadBank = { gain: GainNode; oscs: OscillatorNode[] };

type Engine = {
  ctx: AudioContext | null;
  master: GainNode | null;
  ambient: GainNode | null;
  analyser: AnalyserNode | null;
  noteBus: GainNode | null;
  pluckBus: GainNode | null;
  padFilter: BiquadFilterNode | null;
  banks: PadBank[];
  activeBank: number;
  chordIndex: number;
  freqData: Uint8Array<ArrayBuffer> | null;
  timeData: Uint8Array<ArrayBuffer> | null;
  level: number;
  nextPluckAt: number;
  schedulerTimer: number | null;
  chordTimer: number | null;
  heartbeatTimer: number | null;
  suspendTimer: number | null;
  generation: number;
  volume: number;
};

function createEngine(): Engine {
  return {
    ctx: null,
    master: null,
    ambient: null,
    analyser: null,
    noteBus: null,
    pluckBus: null,
    padFilter: null,
    banks: [],
    activeBank: 0,
    chordIndex: 0,
    freqData: null,
    timeData: null,
    level: 0,
    nextPluckAt: 0,
    schedulerTimer: null,
    chordTimer: null,
    heartbeatTimer: null,
    suspendTimer: null,
    generation: 0,
    volume: DEFAULT_VOLUME,
  };
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function makeImpulse(ctx: AudioContext, seconds: number, decay: number): AudioBuffer {
  const rate = ctx.sampleRate;
  const length = Math.max(1, Math.floor(rate * seconds));
  const buffer = ctx.createBuffer(2, length, rate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return buffer;
}

function ensureContext(engine: Engine, volume: number): AudioContext | null {
  if (engine.ctx) {
    if (engine.suspendTimer !== null) {
      window.clearTimeout(engine.suspendTimer);
      engine.suspendTimer = null;
    }
    if (engine.ctx.state === "suspended") void engine.ctx.resume();
    return engine.ctx;
  }
  if (typeof window === "undefined") return null;

  const AudioCtor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtor) return null;

  let ctx: AudioContext;
  try {
    ctx = new AudioCtor();
  } catch {
    return null;
  }

  const master = ctx.createGain();
  master.gain.value = volume;

  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.knee.value = 24;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.01;
  compressor.release.value = 0.3;

  const analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.82;

  master.connect(compressor);
  compressor.connect(analyser);
  analyser.connect(ctx.destination);

  const ambient = ctx.createGain();
  ambient.gain.value = 0;
  ambient.connect(master);

  const noteBus = ctx.createGain();
  noteBus.gain.value = 0.9;
  noteBus.connect(master);

  const pluckBus = ctx.createGain();
  pluckBus.gain.value = 1;
  pluckBus.connect(ambient);

  const reverb = ctx.createConvolver();
  reverb.buffer = makeImpulse(ctx, 2.8, 2.6);
  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.4;
  pluckBus.connect(reverb);
  reverb.connect(reverbGain);
  reverbGain.connect(ambient);

  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.33;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.32;
  const delayGain = ctx.createGain();
  delayGain.gain.value = 0.28;
  pluckBus.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(delayGain);
  delayGain.connect(ambient);

  const padFilter = ctx.createBiquadFilter();
  padFilter.type = "lowpass";
  padFilter.frequency.value = 760;
  padFilter.Q.value = 0.8;
  padFilter.connect(ambient);

  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.055;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 340;
  lfo.connect(lfoGain);
  lfoGain.connect(padFilter.frequency);
  lfo.start();

  const banks: PadBank[] = [0, 1].map(() => {
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(padFilter);
    const oscs = [0, 1, 2, 3].map((i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "triangle" : "sawtooth";
      osc.frequency.value = CHORDS[0][i];
      osc.detune.value = [-6, 5, -3, 7][i];
      const voice = ctx.createGain();
      voice.gain.value = PAD_VOICE_LEVEL;
      osc.connect(voice);
      voice.connect(gain);
      osc.start();
      return osc;
    });
    return { gain, oscs };
  });

  banks[0].gain.gain.value = PAD_LEVEL;

  engine.ctx = ctx;
  engine.master = master;
  engine.ambient = ambient;
  engine.analyser = analyser;
  engine.noteBus = noteBus;
  engine.pluckBus = pluckBus;
  engine.padFilter = padFilter;
  engine.banks = banks;
  engine.activeBank = 0;
  engine.chordIndex = 0;
  engine.freqData = new Uint8Array(analyser.frequencyBinCount);
  engine.timeData = new Uint8Array(analyser.fftSize);
  engine.volume = volume;

  return ctx;
}

function clearSchedulingTimers(engine: Engine) {
  if (engine.schedulerTimer !== null) {
    window.clearTimeout(engine.schedulerTimer);
    engine.schedulerTimer = null;
  }
  if (engine.chordTimer !== null) {
    window.clearInterval(engine.chordTimer);
    engine.chordTimer = null;
  }
  if (engine.heartbeatTimer !== null) {
    window.clearInterval(engine.heartbeatTimer);
    engine.heartbeatTimer = null;
  }
}

function scheduleShimmer(engine: Engine, at: number) {
  const ctx = engine.ctx;
  const pluckBus = engine.pluckBus;
  if (!ctx || !pluckBus) return;

  const note = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
  const duration = 0.9 + Math.random() * 0.9;
  const velocity = 0.07 + Math.random() * 0.08;

  const osc = ctx.createOscillator();
  osc.type = Math.random() < 0.55 ? "sine" : "triangle";
  osc.frequency.setValueAtTime(note, at);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(velocity, at + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);

  osc.connect(gain);
  gain.connect(pluckBus);
  osc.start(at);
  osc.stop(at + duration + 0.05);
  osc.onended = () => {
    try {
      osc.disconnect();
      gain.disconnect();
    } catch {
      /* already disconnected */
    }
  };
}

function scheduleLoop(engine: Engine, generation: number) {
  const ctx = engine.ctx;
  if (!ctx || engine.generation !== generation) return;

  const horizon = ctx.currentTime + 0.4;
  while (engine.nextPluckAt < horizon) {
    scheduleShimmer(engine, engine.nextPluckAt);
    engine.nextPluckAt += 0.22 + Math.random() * 0.55;
  }
  engine.schedulerTimer = window.setTimeout(
    () => scheduleLoop(engine, generation),
    140
  );
}

function playHeartbeat(engine: Engine) {
  const ctx = engine.ctx;
  const ambient = engine.ambient;
  if (!ctx || !ambient) return;

  const at = ctx.currentTime + 0.02;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(55, at);
  osc.frequency.exponentialRampToValueAtTime(40, at + 0.24);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(0.22, at + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.34);

  osc.connect(gain);
  gain.connect(ambient);
  osc.start(at);
  osc.stop(at + 0.38);
  osc.onended = () => {
    try {
      osc.disconnect();
      gain.disconnect();
    } catch {
      /* already disconnected */
    }
  };
}

function crossfadeChord(engine: Engine, index: number) {
  const ctx = engine.ctx;
  if (!ctx || engine.banks.length < 2) return;

  const nextIndex = 1 - engine.activeBank;
  const oldBank = engine.banks[engine.activeBank];
  const newBank = engine.banks[nextIndex];
  const chord = CHORDS[index % CHORDS.length];
  const now = ctx.currentTime;

  newBank.oscs.forEach((osc, i) => {
    osc.frequency.cancelScheduledValues(now);
    osc.frequency.setTargetAtTime(chord[i], now, 0.5);
  });
  newBank.gain.gain.cancelScheduledValues(now);
  newBank.gain.gain.setTargetAtTime(PAD_LEVEL, now, 0.8);
  oldBank.gain.gain.cancelScheduledValues(now);
  oldBank.gain.gain.setTargetAtTime(0, now, 0.8);

  engine.activeBank = nextIndex;
}

function startAmbient(engine: Engine, volume: number): boolean {
  const ctx = ensureContext(engine, volume);
  if (!ctx) return false;

  engine.generation++;
  const generation = engine.generation;
  clearSchedulingTimers(engine);
  if (engine.suspendTimer !== null) {
    window.clearTimeout(engine.suspendTimer);
    engine.suspendTimer = null;
  }
  if (ctx.state === "suspended") void ctx.resume();

  const now = ctx.currentTime;
  engine.chordIndex = 0;
  engine.nextPluckAt = now + 0.6;

  const active = engine.banks[engine.activeBank];
  if (active) {
    active.oscs.forEach((osc, i) => {
      osc.frequency.cancelScheduledValues(now);
      osc.frequency.setTargetAtTime(CHORDS[0][i], now, 0.25);
    });
    active.gain.gain.cancelScheduledValues(now);
    active.gain.gain.setTargetAtTime(PAD_LEVEL, now, 0.4);
  }
  const other = engine.banks[1 - engine.activeBank];
  if (other) {
    other.gain.gain.cancelScheduledValues(now);
    other.gain.gain.setTargetAtTime(0, now, 0.4);
  }

  const ambient = engine.ambient;
  if (ambient) {
    ambient.gain.cancelScheduledValues(now);
    ambient.gain.setValueAtTime(Math.max(ambient.gain.value, 0.0001), now);
    ambient.gain.setTargetAtTime(1, now, FADE_SECONDS / 3);
  }

  engine.schedulerTimer = window.setTimeout(
    () => scheduleLoop(engine, generation),
    100
  );
  engine.chordTimer = window.setInterval(() => {
    if (engine.generation !== generation) return;
    engine.chordIndex = (engine.chordIndex + 1) % CHORDS.length;
    crossfadeChord(engine, engine.chordIndex);
  }, 8000);
  engine.heartbeatTimer = window.setInterval(() => {
    if (engine.generation !== generation) return;
    playHeartbeat(engine);
  }, 857);

  return true;
}

function stopAmbient(engine: Engine) {
  engine.generation++;
  clearSchedulingTimers(engine);

  const ctx = engine.ctx;
  const ambient = engine.ambient;
  if (!ctx || !ambient) return;

  const now = ctx.currentTime;
  ambient.gain.cancelScheduledValues(now);
  ambient.gain.setValueAtTime(ambient.gain.value, now);
  ambient.gain.setTargetAtTime(0, now, FADE_SECONDS / 3);

  const generation = engine.generation;
  if (engine.suspendTimer !== null) window.clearTimeout(engine.suspendTimer);
  engine.suspendTimer = window.setTimeout(() => {
    engine.suspendTimer = null;
    if (engine.generation !== generation) return;
    const current = engine.ctx;
    if (current && current.state === "running") void current.suspend();
  }, FADE_SECONDS * 1000 + 150);
}

function destroyEngine(engine: Engine) {
  engine.generation++;
  clearSchedulingTimers(engine);
  if (engine.suspendTimer !== null) {
    window.clearTimeout(engine.suspendTimer);
    engine.suspendTimer = null;
  }
  const ctx = engine.ctx;
  engine.ctx = null;
  engine.master = null;
  engine.ambient = null;
  engine.analyser = null;
  engine.noteBus = null;
  engine.pluckBus = null;
  engine.padFilter = null;
  engine.banks = [];
  engine.freqData = null;
  engine.timeData = null;
  engine.level = 0;
  if (ctx) {
    try {
      void ctx.close();
    } catch {
      /* context already closed */
    }
  }
}

const CosmicAudioContext = createContext<CosmicAudio | null>(null);

const fallback: CosmicAudio = {
  playing: false,
  toggle: () => {},
  volume: DEFAULT_VOLUME,
  setVolume: () => {},
  getLevel: () => 0,
  getFrequencyData: () => null,
  playNote: () => {},
  trackName: TRACK_NAME,
  frequency: FREQUENCY,
};

export function CosmicAudioProvider({ children }: { children: React.ReactNode }) {
  const engineRef = useRef<Engine | null>(null);
  const ensureEngine = useCallback((): Engine => {
    if (engineRef.current === null) engineRef.current = createEngine();
    return engineRef.current;
  }, []);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const playingRef = useRef(false);
  const volumeRef = useRef(DEFAULT_VOLUME);

  useEffect(() => {
    const engine = ensureEngine();
    let timer = 0;
    try {
      const raw = window.localStorage.getItem(VOLUME_KEY);
      if (raw !== null) {
        const parsed = Number(raw);
        if (Number.isFinite(parsed)) {
          const next = clamp01(parsed);
          volumeRef.current = next;
          if (engine.ctx && engine.master) {
            engine.master.gain.setTargetAtTime(
              next,
              engine.ctx.currentTime,
              0.05
            );
          }
          timer = window.setTimeout(() => setVolumeState(next), 0);
        }
      }
    } catch {
      /* storage unavailable */
    }
    return () => {
      if (timer) window.clearTimeout(timer);
      destroyEngine(engine);
    };
  }, [ensureEngine]);

  const toggle = useCallback(() => {
    const engine = ensureEngine();
    if (playingRef.current) {
      playingRef.current = false;
      setPlaying(false);
      stopAmbient(engine);
      return;
    }
    const started = startAmbient(engine, volumeRef.current);
    if (started) {
      playingRef.current = true;
      setPlaying(true);
    }
  }, [ensureEngine]);

  const setVolume = useCallback(
    (v: number) => {
      const next = clamp01(v);
      volumeRef.current = next;
      setVolumeState(next);
      try {
        window.localStorage.setItem(VOLUME_KEY, String(next));
      } catch {
        /* storage unavailable */
      }
      const engine = engineRef.current;
      if (engine?.ctx && engine.master) {
        engine.master.gain.setTargetAtTime(
          next,
          engine.ctx.currentTime,
          0.05
        );
      }
    },
    []
  );

  const getLevel = useCallback(() => {
    const engine = engineRef.current;
    if (
      !engine ||
      !playingRef.current ||
      !engine.analyser ||
      !engine.ctx ||
      engine.ctx.state !== "running"
    ) {
      return 0;
    }
    const data =
      engine.timeData ??
      (engine.timeData = new Uint8Array(engine.analyser.fftSize));
    engine.analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const sample = (data[i] - 128) / 128;
      sum += sample * sample;
    }
    const rms = Math.sqrt(sum / data.length);
    const target = Math.min(1, rms * 4);
    engine.level += (target - engine.level) * 0.12;
    return engine.level;
  }, []);

  const getFrequencyData = useCallback(() => {
    const engine = engineRef.current;
    if (!engine?.analyser || !engine.freqData) return null;
    engine.analyser.getByteFrequencyData(engine.freqData);
    return engine.freqData;
  }, []);

  const playNote = useCallback(
    (index: number, opts?: { velocity?: number; duration?: number }) => {
      const engine = ensureEngine();
      const ctx = ensureContext(engine, volumeRef.current);
      if (!ctx || !engine.noteBus) return;
      if (ctx.state === "suspended") void ctx.resume();

      const wrapped =
        ((Math.floor(index) % PENTATONIC.length) + PENTATONIC.length) %
        PENTATONIC.length;
      const note = PENTATONIC[wrapped];
      const duration = Math.max(0.08, opts?.duration ?? 0.9);
      const velocity = clamp01(opts?.velocity ?? 0.5);
      const at = ctx.currentTime + 0.01;

      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(note, at);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(
        Math.max(0.0002, velocity * 0.35),
        at + 0.012
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);

      osc.connect(gain);
      gain.connect(engine.noteBus);
      osc.start(at);
      osc.stop(at + duration + 0.05);
      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          /* already disconnected */
        }
      };
    },
    [ensureEngine]
  );

  const value = useMemo<CosmicAudio>(
    () => ({
      playing,
      toggle,
      volume,
      setVolume,
      getLevel,
      getFrequencyData,
      playNote,
      trackName: TRACK_NAME,
      frequency: FREQUENCY,
    }),
    [playing, toggle, volume, setVolume, getLevel, getFrequencyData, playNote]
  );

  return (
    <CosmicAudioContext.Provider value={value}>
      {children}
    </CosmicAudioContext.Provider>
  );
}

export function useCosmicAudio(): CosmicAudio {
  return useContext(CosmicAudioContext) ?? fallback;
}
