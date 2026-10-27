export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string[];
  tags: string[];
  category: "AI" | "Backend" | "Fullstack" | "Tools";
  gradient: string;
  orb: string;
  image: string;
  features: { title: string; desc: string }[];
  stack: { name: string; reason: string }[];
  metrics: { value: string; label: string }[];
  role: string;
  timeline: string;
  team: string;
  status: "Live" | "Beta" | "Open Source" | "Archived";
  demo?: string;
  github?: string;
  year: string;
  challenges: { title: string; solution: string }[];
  outcomes: string[];
  architecture: string[];
  testimonial?: { quote: string; author: string; role: string };
};

export const projects: Project[] = [
  {
    slug: "yxuos",
    title: "yxuOS",
    tagline: "AI operating system for a company's software — plans, architecture, designs and delivery in one place.",
    description:
      "A powerful platform that connects your plans, architecture, designs and team workflows with AI agents. It helps you build, organize and ship faster — with RAG over company knowledge, whiteboards, and autonomous task distribution.",
    longDescription: [
      "yxuOS started from a simple frustration: plans live in Notion, architecture in Miro, tasks in Jira, and nobody knows what's actually true. I built yxuOS as a single source of truth — every RFC, ADR, Figma frame and sprint task indexed into one knowledge graph.",
      "On top of that graph sit specialized agents: a planner that turns vague ideas into scoped epics, an architect that reviews PRs against ADRs, a designer that generates UI from whiteboard sketches, and a dispatcher that assigns work based on capacity and history. Teams chat with the system in plain language and get executable plans back.",
    ],
    tags: ["AI", "Next.js", "PostgreSQL", "RAG", "Mastra"],
    category: "AI",
    gradient: "from-indigo-600 via-violet-600 to-fuchsia-600",
    orb: "dashboard-yxuos",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c429?q=80&w=1200&auto=format&fit=crop",
    features: [
      { title: "RAG over company knowledge", desc: "Ingests Notion, GitHub, Figma and ADRs. Answers with citations, not hallucinations." },
      { title: "AI whiteboard", desc: "Markdown + Mermaid live canvas. Sketch a flow, get DB schema + API spec." },
      { title: "UI/UX design agent", desc: "Figma-like generation from prompts with design-system constraints." },
      { title: "Autonomous dispatch", desc: "Breaks epics into tasks, estimates, assigns and follows up in Slack." },
    ],
    stack: [
      { name: "Next.js 15", reason: "App Router + RSC for fast dashboard" },
      { name: "TypeScript", reason: "End-to-end type safety" },
      { name: "PostgreSQL + pgvector", reason: "Knowledge graph + embeddings" },
      { name: "Mastra", reason: "Agent orchestration + evals" },
      { name: "Vercel AI SDK", reason: "Streaming chat + tool calling" },
      { name: "Tailwind CSS", reason: "Rapid cosmic UI iteration" },
    ],
    metrics: [
      { value: "42%", label: "faster sprint planning" },
      { value: "12k+", label: "docs indexed in demo org" },
      { value: "4", label: "autonomous agents live" },
      { value: "<800ms", label: "median RAG answer time" },
    ],
    role: "Founder, Design + Backend + AI",
    timeline: "Jan 2025 — Present",
    team: "Solo + 2 beta teams",
    status: "Beta",
    demo: "#",
    github: "#",
    year: "2025",
    challenges: [
      { title: "Stale docs poisoned answers", solution: "Added freshness scoring + GitHub webhooks. Every answer shows source + last-updated, stale chunks are down-ranked automatically." },
      { title: "Agents went off-rails", solution: "Introduced plan-approval gates + eval suite (120 cases). Tool calls require human approve above risk threshold." },
    ],
    outcomes: [
      "Beta with 2 startups, 14 engineers dogfooding daily",
      "Planning meeting cut from 90 min to 35 min on average",
      "92% of generated tasks accepted without major edits",
    ],
    architecture: ["Next.js App Router (Vercel)", "Postgres + pgvector for hybrid search", "Mastra agents: planner / architect / designer / dispatcher", "Inngest background ingestion workers", "Clerk auth + per-org RLS"],
    testimonial: { quote: "It feels like Notion, Linear and an architect had a baby that actually reads our docs.", author: "Omar K.", role: "CTO, beta user" },
  },
  {
    slug: "zynda",
    title: "Zynda",
    tagline: "General-purpose multi-agent platform — compose teams of agents that research, build and ship.",
    description:
      "A multi-agent orchestration platform for building autonomous workflows. Route tasks across specialized agents with memory, tools and guardrails — from research to execution.",
    longDescription: [
      "Zynda is my lab for multi-agent systems. Instead of one giant prompt, you compose a team: researcher, coder, critic, runner. Each has its own memory, tools and budget. A router decomposes the goal and streams progress live.",
      "It includes long-term memory (per user + per project), a tool registry (web, code exec, DB), and full trace observability so you can replay exactly why an agent did what it did.",
    ],
    tags: ["AI", "Next.js", "Mastra", "Agents"],
    category: "AI",
    gradient: "from-cyan-500 via-indigo-600 to-violet-700",
    orb: "dashboard-zynda",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop",
    features: [
      { title: "Multi-agent routing", desc: "Decompose goals into parallel sub-tasks with dependency graph." },
      { title: "Persistent memory", desc: "Episodic + semantic memory scoped per agent and project." },
      { title: "Tool registry", desc: "Web search, code sandbox, SQL, HTTP — with permission scopes." },
      { title: "Traces & evals", desc: "Every run is replayable. Score agents on quality, cost, latency." },
    ],
    stack: [
      { name: "Next.js", reason: "Realtime dashboard + streaming" },
      { name: "Mastra", reason: "Workflows + agent memory" },
      { name: "PostgreSQL", reason: "Runs, traces, memory store" },
      { name: "Redis", reason: "Queues + rate limits" },
      { name: "Tailwind CSS", reason: "Agent graph UI" },
    ],
    metrics: [
      { value: "6", label: "built-in specialist agents" },
      { value: "3.2x", label: "faster research vs single-agent" },
      { value: "100%", label: "runs fully traceable" },
      { value: "$0.04", label: "median cost per task" },
    ],
    role: "Builder — agents, infra, UI",
    timeline: "Jun 2024 — Dec 2024",
    team: "Solo",
    status: "Open Source",
    demo: "#",
    github: "#",
    year: "2024",
    challenges: [
      { title: "Endless agent loops burned tokens", solution: "Added step budgets, stall detection and critic agent that forces convergence after N rounds." },
      { title: "Inconsistent tool outputs", solution: "Zod-validated tool schemas + auto-retry with repair prompt. Invalid JSON dropped 94%." },
    ],
    outcomes: ["320+ GitHub stars in first 2 months", "Used in 3 university AI workshops in Egypt", "Template gallery: research, code-review, content pipeline"],
    architecture: ["Edge chat + streaming", "Workflow engine (Mastra)", "Sandboxed tool runner", "Postgres traces + Redis queues"],
  },
  {
    slug: "multi-ai-chat-api",
    title: "Multi-AI-Chat-API",
    tagline: "One OpenAI-compatible gateway for every LLM — streaming, fallbacks, caching, billing.",
    description:
      "One OpenAI-compatible endpoint to talk to every major LLM. Streaming, fallbacks, rate-limits, caching and plugin hooks — built for .NET backends that need reliability.",
    longDescription: [
      "Teams kept rewriting glue code every time they switched providers. I built a single gateway: point your OpenAI client at one URL, set a model like `auto:balanced`, and the gateway handles routing, retries, fallbacks and cost tracking.",
      "It's .NET 8, SignalR for streaming, Redis for semantic cache. Drop-in for any OpenAI SDK. Includes per-key budgets, per-model rate limits and a plugin pipeline (PII redaction, logging, eval sampling).",
    ],
    tags: [".NET", "SignalR", "Redis", "LLM Gateway"],
    category: "Backend",
    gradient: "from-violet-600 via-indigo-700 to-slate-900",
    orb: "dashboard-gateway",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    features: [
      { title: "OpenAI-compatible", desc: "Works with existing SDKs. Change baseURL, done." },
      { title: "Smart routing", desc: "Latency / cost / quality auto-routing with fallbacks." },
      { title: "Semantic cache", desc: "Redis vector cache cuts repeat costs up to 60%." },
      { title: "Guardrails + metering", desc: "PII filter, budgets, per-key analytics." },
    ],
    stack: [
      { name: ".NET 8", reason: "High-throughput minimal APIs" },
      { name: "SignalR", reason: "Token streaming to any client" },
      { name: "Redis", reason: "Cache + sliding-window limits" },
      { name: "PostgreSQL", reason: "Usage ledger + keys" },
    ],
    metrics: [
      { value: "99.95%", label: "uptime over 6 months" },
      { value: "1.2M+", label: "requests proxied" },
      { value: "58%", label: "cost saved via cache" },
      { value: "180ms", label: "p50 added overhead" },
    ],
    role: "Backend Engineer",
    timeline: "Mar 2024 — Aug 2024",
    team: "Solo",
    status: "Open Source",
    demo: "#",
    github: "#",
    year: "2024",
    challenges: [
      { title: "Provider outages at 2am", solution: "Circuit breakers + priority fallback chains per model class. Failover in <2s with zero client changes." },
      { title: "Streaming backpressure", solution: "Channels + SSE batching. Sustains 400 concurrent streams on a $12 VPS." },
    ],
    outcomes: ["Adopted by 2 freelance client projects", "Full Postman collection + Docker one-liner", "Benchmarks published vs direct provider calls"],
    architecture: ["YARP-style routing layer", "Provider adapters (OpenAI, Anthropic, Gemini, Groq)", "Redis semantic cache", "OTel tracing + Prometheus metrics"],
  },
  {
    slug: "internship-connect-egypt",
    title: "Internship Connect Egypt",
    tagline: "Where Egyptian students meet companies — matching, AI resumes, application tracking.",
    description:
      "Bridging students and companies across Egypt. Smart matching, AI resume builder, and application tracking — from first CV to signed offer.",
    longDescription: [
      "In Egypt, internships spread by word-of-mouth. I built a platform where students create one profile, generate an ATS-friendly CV with AI, and get matched to real openings by skills, governorate and availability.",
      "Companies get a pipeline board, one-click screening questions, and structured interviews. Includes Arabic + English CV templates tuned for local recruiters.",
    ],
    tags: [".NET", "React", "ML", "Platform"],
    category: "Fullstack",
    gradient: "from-indigo-500 via-blue-600 to-cyan-600",
    orb: "dashboard-intern",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    features: [
      { title: "Smart matching", desc: "Skill + location + availability scoring, explainable." },
      { title: "AI resume builder", desc: "ATS-safe EN/AR templates, tailored per posting." },
      { title: "Pipeline board", desc: "Applied → screened → interview → offer, with reminders." },
      { title: "Company dashboard", desc: "Post in 2 min, filter, bulk actions, export." },
    ],
    stack: [
      { name: ".NET", reason: "API + auth + background jobs" },
      { name: "React", reason: "Student + company portals" },
      { name: "ML.NET", reason: "Match scoring model" },
      { name: "SQL Server", reason: "Relational core" },
    ],
    metrics: [
      { value: "850+", label: "students onboarded (pilot)" },
      { value: "60+", label: "companies posted" },
      { value: "210", label: "interviews scheduled" },
      { value: "4.8/5", label: "student satisfaction" },
    ],
    role: "Full-stack — everything",
    timeline: "Sep 2023 — Feb 2024",
    team: "Solo + faculty advisor",
    status: "Archived",
    demo: "#",
    github: "#",
    year: "2023",
    challenges: [
      { title: "Cold start: no jobs, no students", solution: "Seeded with 40 real openings scraped with permission + partnered with 2 student clubs for launch week." },
      { title: "Low-quality CVs", solution: "Guided builder with examples in Arabic + instant ATS score. Completion rate went 31% → 78%." },
    ],
    outcomes: ["Piloted at Faculty of Science", "Featured in 2 campus career fairs", "Open-sourced matching rubric"],
    architecture: ["Monolith-first .NET API", "React SPA x2 (student/company)", "Hangfire jobs for reminders", "ML.NET match scorer v1"],
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  tag: string;
  excerpt: string;
  gradient: string;
  image: string;
  readingTime: string;
  content: { heading: string; body: string[]; code?: { lang: string; code: string } }[];
};

export const posts: Post[] = [
  {
    slug: "ai-agents-from-scratch",
    title: "Building AI Agents from Scratch",
    date: "Aug 12, 2026",
    tag: "AI Agents",
    excerpt: "Memory, tools, planning loops — the minimal architecture that actually works in production.",
    gradient: "from-indigo-600 to-fuchsia-600",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    readingTime: "9 min read",
    content: [
      { heading: "The loop is all you need", body: ["Every useful agent is the same loop: observe → think → act → observe. Start with that. Don't start with frameworks.", "I ship v1 as ~120 lines: a while-loop, a system prompt, two tools (search + exec), and a transcript. If it can't do the task with that, a framework won't save you."] },
      { heading: "Memory that matters", body: ["Split memory three ways: working (last 20 messages), episodic (summaries of past runs), semantic (docs + facts in pgvector). Most failures I see are working-memory overflow, not model intelligence.", "Summarize aggressively. Store decisions, not chatter."] },
      { heading: "Tools beat prompts", body: ["Give the agent fewer, better tools with Zod-validated schemas. One `db.query(sql, params)` beats five bespoke endpoints.", "Log every tool call with latency + cost. You'll find 80% of spend is 20% of calls. Cache those."] , code: { lang: "ts", code: "const agent = defineAgent({\n  model: 'auto:balanced',\n  tools: [webSearch, codeExec, dbQuery],\n  budget: { maxSteps: 12, maxCostUsd: 0.08 },\n  memory: ['working:20', 'episodic', 'vector:project-docs']\n});" }},
      { heading: "Ship checklist", body: ["Step budget + stall detector. Approval gate for irreversible actions. Full trace log. Eval set of 30+ real tasks. If you have those four, you're production-ready."] },
    ],
  },
  {
    slug: "system-design-llm-apps",
    title: "System Design for LLM Applications",
    date: "Aug 02, 2026",
    tag: "Architecture",
    excerpt: "RAG, evals, caching and fallbacks — how I design LLM systems that survive real users.",
    gradient: "from-cyan-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    readingTime: "11 min read",
    content: [
      { heading: "Design for failure", body: ["Providers go down. Models drift. Users paste 40-page PDFs at midnight. Design the fallback first: primary → cheaper backup → cached answer → graceful 'I'll get back to you'.", "Every LLM call gets timeout, retry with jitter, and a cost ceiling. No exceptions."] },
      { heading: "RAG that doesn't hallucinate", body: ["Hybrid search (BM25 + vectors), rerank top-20 to top-5, cite sources inline, show freshness. If confidence is low, say so and ask a clarifying question.", "Chunk by structure (headers, functions, ADRs) — not by fixed 500 tokens. Your retrieval quality doubles."] },
      { heading: "Evals > vibes", body: ["Keep 100 golden Q/A pairs from real support tickets. Run them on every prompt or model change. Block deploy if score drops >3%.", "Sample 5% of prod traffic for human review weekly. That's how you catch drift early."] , code: { lang: "ts", code: "// gateway routing\nroute({\n  policy: 'balanced',\n  primary: 'gpt-5-mini',\n  fallbacks: ['claude-haiku', 'groq-llama-3.3'],\n  cache: { semantic: true, ttlHours: 24 },\n  budgetPerRequestUsd: 0.02\n});" }},
    ],
  },
  {
    slug: "dotnet-high-performance",
    title: "Optimizing .NET for High Performance",
    date: "Jul 24, 2026",
    tag: ".NET",
    excerpt: "Span<T>, channels, pooling — squeezing latency out of hot paths without rewriting everything.",
    gradient: "from-violet-600 to-indigo-900",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    readingTime: "8 min read",
    content: [
      { heading: "Measure first", body: ["BenchmarkDotNet + dotnet-counters + a load test with k6. I don't touch code until p95 and allocations are on a dashboard.", "The usual suspects: JSON serialization, EF N+1, string concatenation in loops, sync-over-async."] },
      { heading: "The big wins", body: ["System.Text.Json source generators (30% faster cold JSON). Span<T> + ArrayPool for parsing. Channels for producer/consumer instead of BlockingCollection. ObjectPool for transient DTOs in tight loops.", "EF Core: AsNoTracking for reads, compiled queries for hot paths, split queries for includes."] , code: { lang: "csharp", code: "private static readonly ObjectPool<StringBuilder> _pool =\n  new DefaultObjectPoolProvider().CreateStringBuilderPool();\n\nusing var _ = _pool.Get(out var sb);\nsb.Append(span); // zero-alloc hot path" }},
    ],
  },
  {
    slug: "arch-hyprland-setup",
    title: "My Arch Linux + Hyprland Setup",
    date: "Jul 10, 2026",
    tag: "Linux",
    excerpt: "Tiling, terminals and dotfiles — the exact setup I use for deep-focus engineering.",
    gradient: "from-fuchsia-600 to-purple-900",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop",
    readingTime: "6 min read",
    content: [
      { heading: "Why Hyprland", body: ["Dynamic tiling + buttery animations + Wayland. My whole workflow is keyboard-driven: SUPER+Enter terminal, SUPER+F browser, SUPER+1..9 workspaces.", "Ghostty + tmux + Neovim. Waybar with CPU, mem, now-playing. Rofi for launcher. All dotfiles in git, fresh install in 20 minutes."] },
      { heading: "What actually boosts focus", body: ["One workspace per context (code / comms / research). Notifications off except mentions. 25-min timers with hypridle dimming at minute 24.", "Dark cosmic wallpaper so the screen feels calm at 2am. Sounds silly, works."] },
    ],
  },
  {
    slug: "future-ai-agents",
    title: "The Future of AI Agents",
    date: "Jun 28, 2026",
    tag: "Vision",
    excerpt: "Why small teams of agents will run the next software companies — and what breaks first.",
    gradient: "from-blue-600 to-cyan-500",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c429?q=80&w=1200&auto=format&fit=crop",
    readingTime: "7 min read",
    content: [
      { heading: "Companies become agent teams", body: ["The next 10-person startup will command 200 agents: researchers, QA, support, ops. Humans set taste and constraints; agents do volume.", "The bottleneck shifts from writing code to writing evals. Whoever defines 'good' wins."] },
      { heading: "What breaks", body: ["Trust (who approved that refund?), cost (a loop spent $40 overnight), and context rot (agents acting on stale docs). Solve approvals, budgets and freshness and you're ahead of 95%."] },
    ],
  },
  {
    slug: "productivity-tools",
    title: "Productivity Tools I Use Daily",
    date: "Jun 12, 2026",
    tag: "Toolkit",
    excerpt: "My honest daily stack for building fast without burning out — free tiers included.",
    gradient: "from-indigo-500 to-blue-700",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
    readingTime: "5 min read",
    content: [
      { heading: "Build", body: ["Neovim + Ghostty + tmux. Linear for tasks. Notion for long-form. Bruno for APIs (lighter than Postman). Docker + lazydocker for everything local."] },
      { heading: "Think", body: ["Paper notebook for morning plan (3 outcomes max). 90-min deep blocks, phone in another room. Evening shutdown ritual: inbox zero, tomorrow's top-3, git push. Boring, effective."] },
    ],
  },
];

export const experience = [
  {
    role: "AI Platform Engineer (Startup)",
    company: "Stealth — AI agent platforms",
    period: "2025 — Present",
    location: "Cairo / Remote",
    points: ["Own yxuOS agent core: RAG pipeline, planner + dispatcher agents, eval harness", "Cut planning latency 42% for 2 beta teams; $0.04 median task cost", "Stack: Next.js, Mastra, pgvector, Vercel AI SDK, Inngest"],
  },
  {
    role: "Backend Engineer",
    company: "Freelance + Contract",
    period: "2022 — 2025",
    location: "Egypt / Remote",
    points: ["Built .NET + Node APIs serving 1.2M+ LLM-gateway requests at 99.95% uptime", "Postgres/Redis tuning, SignalR streaming, Docker + CI/CD", "Clients in EG + Gulf: booking, edtech, internships"],
  },
  {
    role: "CS Graduate → AI Focus",
    company: "Faculty of Science + Self-study",
    period: "2020 — 2024",
    location: "Egypt",
    points: ["Graduated Faculty of Science; shipped Internship Connect Egypt pilot (850 students)", "Deep dives: distributed systems, ML.NET, LLM evals", "Arch Linux daily-driver since 2021"],
  },
];

export const skills = [
  { group: "Backend", items: [{ name: ".NET / C#", level: 92 }, { name: "Node / TS", level: 88 }, { name: "PostgreSQL", level: 90 }, { name: "Redis", level: 84 }] },
  { group: "AI / LLM", items: [{ name: "RAG + pgvector", level: 90 }, { name: "Agents (Mastra)", level: 88 }, { name: "Evals + Tracing", level: 82 }, { name: "Prompt systems", level: 86 }] },
  { group: "Frontend", items: [{ name: "Next.js / React", level: 87 }, { name: "Tailwind", level: 90 }, { name: "Framer Motion", level: 80 }] },
  { group: "Ops", items: [{ name: "Docker", level: 85 }, { name: "CI/CD", level: 82 }, { name: "Linux / Hyprland", level: 93 }] },
];

export const testimonials = [
  { quote: "Mohamed turns vague ideas into shippable systems. Our planning went from chaos to calm in two weeks.", author: "Omar K.", role: "CTO, beta team", initials: "OK" },
  { quote: "Rare mix: deep backend rigor + real product taste. The gateway he built just never goes down.", author: "Sara M.", role: "Founder, edtech client", initials: "SM" },
  { quote: "He docs, tests and measures everything. Code reviews from him leveled up our whole team.", author: "Ahmed R.", role: "Backend lead", initials: "AR" },
];

export const journey = [
  { year: "2020", text: "Started CS — fell in love with Linux and backend" },
  { year: "2022", text: "First paid backend work (.NET APIs for local clients)" },
  { year: "2023", text: "Shipped Internship Connect Egypt pilot" },
  { year: "2024", text: "Graduated Faculty of Science; pivoted to AI agents" },
  { year: "2025", text: "Building yxuOS + Zynda; freelance gateway at 1.2M requests" },
  { year: "2026", text: "Full-time on AI agent platforms (startup)" },
];

export const faqs = [
  { q: "Are you available for freelance?", a: "Yes — one project at a time. Backend + AI systems, 2–6 week scopes. Email yxu@proton.me with context, timeline and budget and I'll reply within 48h." },
  { q: "What do you actually do best?", a: "Production LLM systems (RAG, agents, evals) on solid .NET/Next.js backends. If it needs to be fast, observable and cheap to run — that's my lane." },
  { q: "Can I see code?", a: "Yes — Zynda and Multi-AI-Chat-API are open source. yxuOS is private beta but I can walk through architecture on a call." },
  { q: "Where are you based?", a: "Egypt (EET, UTC+2). I work async-first across EU/MENA hours and overlap US mornings when needed." },
];
