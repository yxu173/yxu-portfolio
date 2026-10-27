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
    tagline: "Whiteboards, designs and AI agents that draft with your team, from idea to spec in one workspace.",
    description:
      "A team workspace for system diagrams, UI mockups, research and planning, with an AI agent in every surface. Sketch architecture on a whiteboard, generate UI on a design canvas, research a question, then turn it into approved tasks without switching apps.",
    longDescription: [
      "yxuOS started from a simple frustration: diagrams live in one tool, mockups in another, research in docs and tasks somewhere else, so the context never travels with the work. yxuOS puts boards, designs, research notes, plans and tasks in one shared team workspace, where everything is owned by the team.",
      "Each surface has its own Mastra agent. The board agent draws Excalidraw diagrams, Mermaid charts and markdown cards straight onto the canvas. The design agent builds real-looking UI on a Figma-style artboard canvas, reusing the team's components and design tokens. The researcher answers questions from the workspace and the web and writes a cited note. The planner turns that note into task rows you approve one by one before they land on the task board.",
      "Underneath sits a project brain: boards, designs, tasks, plans, notes, comments and imported GitHub repos are chunked, embedded and stored in Postgres with pgvector, so every agent and the Cmd+K search can pull the right context instead of guessing.",
    ],
    tags: ["AI", "Next.js", "Mastra", "RAG", "pgvector"],
    category: "AI",
    gradient: "from-arcturus to-arcturus/70",
    orb: "dashboard-yxuos",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c429?q=80&w=1200&auto=format&fit=crop",
    features: [
      { title: "AI whiteboards", desc: "Excalidraw boards with an agent that drops Mermaid diagrams, sticky notes, shapes and markdown cards on demand, wired with real arrows." },
      { title: "Design canvas", desc: "A custom artboard canvas where the design agent produces real-looking UI mockups, components and assets, with every state, not just the happy path." },
      { title: "Research to plan to tasks", desc: "The researcher writes cited notes from the workspace and the web. The planner turns them into task rows you approve before they hit the board." },
      { title: "Project brain", desc: "Semantic search over boards, designs, tasks, notes, comments and imported GitHub code, shared by Cmd+K and every agent." },
      { title: "Team workspaces", desc: "Add teammates by username. Every board, design and component belongs to the team, with comments, mentions and share links." },
    ],
    stack: [
      { name: "Next.js 16", reason: "App Router for the workspace and streaming agent chat" },
      { name: "Mastra", reason: "Four agents with memory, tools and scorers" },
      { name: "Vercel AI SDK + Claude", reason: "Streaming chat and tool calling" },
      { name: "Neon Postgres + Drizzle", reason: "Typed schema and migrations" },
      { name: "pgvector", reason: "Embeddings for the project brain" },
      { name: "Excalidraw + Tiptap", reason: "Whiteboards and rich-text notes" },
      { name: "Better Auth", reason: "Accounts and team membership" },
      { name: "Upstash Redis + Vercel Blob", reason: "Caching and file attachments" },
    ],
    metrics: [
      { value: "4", label: "AI agents, one per surface" },
      { value: "8", label: "kinds of content in the brain" },
      { value: "3", label: "scorers grading agent turns" },
      { value: "100+", label: "commits shipped" },
    ],
    role: "Creator: product, full-stack and AI",
    timeline: "May 2026 — Present",
    team: "Solo",
    status: "Live",
    demo: "https://yxu-os.vercel.app",
    github: "https://github.com/yxu173/yxuOS",
    year: "2026",
    challenges: [
      { title: "Agents drew messy, overlapping diagrams", solution: "Rewrote the board agent's prompt as step-by-step playbooks and gave it layout tools (find free space, auto-layout, bound arrows), so the model never computes coordinates by hand." },
      { title: "Prompt changes caused silent regressions", solution: "Added Mastra scorers for tool economy, playbook compliance and audit passes on agent turns. The lowest-scoring runs show exactly where a prompt drifted after a deploy." },
      { title: "Code parsing broke on serverless", solution: "Tree-sitter grammars failed to load on Vercel. Resolved the WASM files through the module graph and pinned a compatible web-tree-sitter version so repo indexing works anywhere." },
    ],
    outcomes: [
      "Live demo: create a team and start drawing in under a minute",
      "Research note to approved tasks without leaving the workspace",
      "One retrieval layer shared by search and all four agents",
    ],
    architecture: [
      "Next.js App Router on Vercel",
      "Mastra agents: board architect, design architect, researcher, planner",
      "Postgres-backed agent memory, per thread and per project",
      "Neon Postgres + Drizzle, pgvector for 1536-dim embeddings",
      "GitHub repo import with tree-sitter code chunking",
      "Exa web search for the researcher",
      "Better Auth, Upstash Redis cache, Vercel Blob storage",
    ],
  },
  {
    slug: "yxu-code",
    title: "yxu-code",
    tagline: "A local multi-agent orchestrator for your terminal. Opus plans and reviews, your coding agents build in isolated worktrees.",
    description:
      "Claude Code (Opus) reads the repo, plans and reviews; the coding agent CLIs you already have (Claude, OpenCode, Command Code, any ACP agent) do the work in parallel git worktrees. Nothing reaches your branch until you apply it. No server, no account, no telemetry.",
    longDescription: [
      "I had several coding agents installed and kept juggling them by hand: one to explore, one to write, one to review, each touching my branch. yxu-code turns them into a team. Opus acts as the lead: it reads the repo, plans, delegates tasks to the agents in their own git worktrees, runs your verify command and reviews the result. Then you decide: apply, view the diff, decide later or discard.",
      "The team is defined by role (scout, coder, builder, tester, debugger, reviewer, resolver, docs, expert, backup) and mapped onto whichever CLIs you have. Workflows chain them: a feature pipeline goes scout, plan, parallel build, tests, verify, review. It also goes from a GitHub issue to a pull request with a description written from what actually happened, and can fix a failing CI run on the PR's branch.",
      "The interface is a terminal instrument with a star map in the header, one star per agent slot, lit while that agent works. You can watch an agent live, correct it mid-task, or take over in your editor. It is fully configurable through layered YAML, shareable packs and TypeScript plugins, and accessible: every state is shown as words and glyphs, not color alone, with ASCII, no-color and reduced-motion modes.",
    ],
    tags: ["AI agents", "CLI", "TypeScript", "Bun", "Claude Code"],
    category: "Tools",
    gradient: "from-rigel to-rigel/70",
    orb: "terminal-yxu-code",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop",
    features: [
      { title: "Opus leads, your agents build", desc: "Claude Code plans, delegates and reviews. Claude, OpenCode, Command Code or any ACP agent do the work in parallel git worktrees." },
      { title: "Nothing touches your branch", desc: "Every result waits at a decision: apply, view the diff, later or discard. Cancel any time; agents are killed and your branch stays untouched." },
      { title: "A team by role", desc: "Ten roles from scout to debugger to reviewer, each with its own CLI, model and permissions. Feature, bugfix, review and explore workflows chain them." },
      { title: "Issue to pull request", desc: "Run from a GitHub issue, open a PR whose description lists what each agent did and which checks passed, and let the debugger fix failing CI." },
      { title: "Watch and step in", desc: "Follow an agent's tool calls live, send it a correction mid-task, or take over its worktree in your editor." },
      { title: "Configurable, safely", desc: "Layered YAML config, shareable packs and TypeScript plugins. Repo commands and plugins run only after you trust them; agents can be sandboxed to their worktree." },
    ],
    stack: [
      { name: "TypeScript + Bun", reason: "Fast startup and single-file binaries" },
      { name: "Claude Agent SDK", reason: "Opus as the planning and reviewing orchestrator" },
      { name: "Agent Client Protocol", reason: "Plug in any ACP-speaking coding agent" },
      { name: "Git worktrees", reason: "Each task isolated from your branch" },
      { name: "Custom terminal UI", reason: "Row-diffed rendering, kitty keys, ASCII and no-color modes" },
      { name: "GitHub CLI", reason: "Issues in, pull requests and CI fixes out" },
    ],
    metrics: [
      { value: "10", label: "agent roles in the default team" },
      { value: "179", label: "tests, incl. terminal frame tests" },
      { value: "4", label: "releases in the first week" },
      { value: "0", label: "servers, accounts or telemetry" },
    ],
    role: "Creator: design, engineering and the terminal UI",
    timeline: "Oct 2026 — Present",
    team: "Solo",
    status: "Open Source",
    github: "https://github.com/yxu173/yxu-code",
    year: "2026",
    challenges: [
      { title: "Parallel agents on one repo", solution: "Every task runs in its own git worktree, results wait at an explicit decision, and a resolver agent handles merge conflicts when parallel work is combined." },
      { title: "A terminal UI that never breaks the terminal", solution: "Frame tests check every row is exactly the terminal width from 40x16 to 220x60, and a pseudo-terminal driver runs the real binary to confirm the terminal is restored on exit." },
      { title: "Running other people's commands safely", solution: "A cloned repo's hooks, steps and plugins run only after yxu trust, agents must ask before anything beyond editing files, and bwrap can confine an agent to its worktree." },
    ],
    outcomes: [
      "MIT-licensed, with prebuilt checksum-verified binaries for Linux, macOS and Windows",
      "Install script plus Homebrew and AUR packages, self-update built in",
      "Works with Claude, OpenCode, Command Code and any ACP agent",
    ],
    architecture: [
      "Orchestrator: Claude Code (Opus) via the Agent SDK, or a local agent",
      "Subagents: CLI and ACP adapters, each in its own git worktree",
      "Repo map: a code overview for the orchestrator, file and symbol slices for each task",
      "Layered config: defaults, user, packs, project, local, env, flags",
      "Terminal UI: pure render from state, separate from execution",
      "Sessions saved locally and resumable from any folder",
    ],
  },
  {
    slug: "zynda",
    title: "Zynda",
    tagline: "AI for everyone, from everyone. One chat box in front of a fleet of specialist agents that research, build, design and get work done.",
    description:
      "Zynda AI's multi-agent assistant platform, live at zynda.ai. One chat box routes to specialist agents that talk, research, build websites and apps, produce real documents, create and edit images, operate 37 connected apps and run recurring work unattended, with a visual Studio for image and video production.",
    longDescription: [
      "Zynda is the product of Zynda AI, where I work on it as a full-stack engineer. The idea is simple to say and hard to build: one chat box, and behind it a fleet of specialists. A router reads the request and hands it to the right lanes in sequence (general, content, coder, image, document, integration, web/CMS, schedule, research, Studio), each with its own budget, tools and prompt.",
      "Each lane is a product in itself. Deep Research plans, gathers sources in parallel and writes a cited report, re-fetching the load-bearing URLs to verify them. The document agent builds real PDF, PPTX, XLSX and DOCX files in a sandbox and QA-reviews its own output. The coder plans first, waits for approval, then builds a site or app that has to pass typecheck, build, auth, accessibility and visual gates before it is delivered as a GitHub PR and a Vercel deploy.",
      "Around the agents sits everything a real product needs: five layers of memory, Projects with RAG over files and imported sources, a Library for every artifact, scheduled tasks, a node-based Studio for image, video, voiceover and captions, 38 integration providers behind staged writes you approve before anything is sent, and per-step credit billing with refunds on failure. The accessibility floor is WCAG 2.2 AA.",
    ],
    tags: ["AI", "Next.js", "Mastra", "tRPC", "Trigger.dev"],
    category: "AI",
    gradient: "from-arcturus to-rigel/70",
    orb: "graph-zynda",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    features: [
      { title: "Agent fleet", desc: "A router picks up to three specialist lanes per turn from 11 agents, each with its own budget, tools and versioned prompt, sharing one identity and voice." },
      { title: "Deep Research", desc: "Plan, gather, synthesize: parallel workers with budgets, a reviewable plan, mid-run steering, gap analysis and a cited report checked against its sources." },
      { title: "Documents and code", desc: "Real PDF, PPTX, XLSX and DOCX files built and QA-reviewed in a sandbox. Sites and apps built plan-first and shipped only after verification gates pass." },
      { title: "Studio", desc: "A node canvas with 26 node types for images, video, voiceover and captions, with an agent co-pilot that proposes whole subgraphs." },
      { title: "37 connected apps", desc: "Gmail, Slack, Notion, GitHub, Stripe, Figma and more, behind staged writes: preview before commit, single-use approvals, secrets always masked." },
      { title: "Memory and Projects", desc: "Five memory layers, project instructions, RAG over uploaded and imported sources, a Library of every artifact, and scheduled tasks." },
    ],
    stack: [
      { name: "Next.js 16 + React 19", reason: "One modular-monolith app" },
      { name: "Mastra", reason: "Agents, workflows and memory" },
      { name: "Vercel AI SDK + AI Gateway", reason: "Every model behind one interface" },
      { name: "tRPC + TanStack Query", reason: "48 typed routers end to end" },
      { name: "Neon Postgres + Drizzle + pgvector", reason: "Data, memory and retrieval" },
      { name: "Trigger.dev", reason: "Durable long runs and cron" },
      { name: "Daytona", reason: "Sandboxes for code and documents" },
      { name: "Upstash Redis + Cloudflare R2", reason: "Streaming, rate limits and files" },
    ],
    metrics: [
      { value: "11", label: "specialist agents" },
      { value: "37", label: "connected apps" },
      { value: "26", label: "Studio node types" },
      { value: "5", label: "layers of memory" },
    ],
    role: "Full-stack engineer",
    timeline: "Feb 2025 — Present",
    team: "Zynda AI team",
    status: "Live",
    demo: "https://zynda.ai",
    year: "2025",
    challenges: [
      { title: "Research runs outlived the request", solution: "Long runs move to Trigger.dev and stream back through Redis, with suspend and resume, cooperative cancel and a per-user queue, so a Deep Research report survives a closed tab." },
      { title: "Agents acting in people's real apps", solution: "Every write to a connected app is staged: a preview first, a single-use approval token that expires in 24 hours, per-app auto-send only when the user opts in, and secrets masked everywhere." },
      { title: "Generated apps that looked done but weren't", solution: "The coder can't deliver until a blocking set of gates passes: typecheck, lint, build, database, boot, routes, auth, accessibility and visual checks, with revision evidence and rollback." },
      { title: "Fair billing across very different work", solution: "One pricing rule for every surface, charged per step as it lands on an idempotent ledger, with refunds when a step fails." },
    ],
    outcomes: [
      "Live in production at zynda.ai",
      "38 integration providers behind 9 sub-agents, all with staged writes",
      "WCAG 2.2 AA as the accessibility floor across the app",
    ],
    architecture: [
      "Modular monolith: one Next.js app, three chat runtimes (chat, agent, Deep Research)",
      "Router picks lanes via pre-routes, an evaluation-model call and a small planner",
      "Mastra agents, workflows and five memory layers on Postgres + pgvector",
      "Trigger.dev for durable runs and cron, streamed through Upstash Redis",
      "Daytona sandboxes for code, documents and the coder's dev previews",
      "Better Auth, Sentry, Mastra Studio tracing, SSRF guard and nonced CSP",
    ],
  },
  {
    slug: "scy-ai",
    title: "scy-ai",
    tagline: "Build a calmer reading habit. AI trackers that follow the topics you care about and keep your reading queue in one place.",
    description:
      "Describe a topic and an agent finds real sources, picks keywords and sets up a tracker. Every day it collects new stories, drops duplicates and stale items, ranks what's left by relevance and summarizes it, so you read the signal instead of the feed.",
    longDescription: [
      "I follow a lot of fast-moving topics, AI models most of all, and keeping up meant dozens of tabs and newsletters full of the same story told five times. scy-ai replaces that with trackers: you describe what you care about in plain language, and ScyAgent proposes a tracker with a name, focused keywords and six to ten real sources, each with a note on what it contributes. You review it, it saves it.",
      "From there the curation workflow does the reading. It pulls from up to 28 sources in parallel, normalizes URLs and titles to remove duplicates, filters out stale and off-topic items, scores the rest for relevance and summarizes the strongest ones. A daily workflow refreshes every active tracker on its own.",
      "On top of the feed you can chat with your resources or adjust a tracker in real time, turn any article into a technical or marketing brief that only uses the source text and says what it does not establish, follow other people's public trackers, and get a weekly digest of what changed. Access is invite-only: you request it, an admin approves, and you sign in with a magic link.",
    ],
    tags: ["AI", "Mastra", "Next.js", "Postgres", "RSS"],
    category: "AI",
    gradient: "from-rigel to-arcturus/60",
    orb: "feed-scy-ai",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",
    features: [
      { title: "Trackers from a sentence", desc: "ScyAgent turns a topic into a tracker: a name, 5-10 focused keywords and 6-10 real sources it discovered and previewed. It never invents a source." },
      { title: "Curation that reads for you", desc: "Parallel fetching, URL and title de-duplication, freshness and relevance filtering, then AI summaries for the strongest stories." },
      { title: "Daily refresh", desc: "A scheduled workflow refreshes every active tracker each morning, so new resources are waiting when you open the app." },
      { title: "Chat with your feed", desc: "Ask what's new, compare stories, or tell the agent to adjust a tracker. Answers stay grounded in the resources in your feed." },
      { title: "Evidence-first briefs", desc: "Turn an article into a technical or marketing brief built only from the source text, with claims to verify and what it doesn't establish." },
      { title: "Explore and digest", desc: "Follow public trackers from other readers, rate resources to tune results, and get a weekly digest of the top stories." },
    ],
    stack: [
      { name: "Next.js 16 + React 19", reason: "App, API routes and streaming chat" },
      { name: "Mastra", reason: "Agents, tools, workflows and scheduled refresh" },
      { name: "Vercel AI SDK", reason: "Chat UI and model streaming" },
      { name: "PostgreSQL + Drizzle", reason: "Trackers, articles and follows" },
      { name: "Better Auth + Resend", reason: "Magic-link sign-in with admin approval" },
      { name: "AI Elements + shadcn", reason: "Chat, sources and reasoning UI" },
    ],
    metrics: [
      { value: "28", label: "sources checked per refresh" },
      { value: "6-10", label: "real sources per tracker" },
      { value: "Daily", label: "automatic refresh of every tracker" },
      { value: "2", label: "brief modes: technical and marketing" },
    ],
    role: "Creator: product, full-stack and AI",
    timeline: "Jul 2026 — Present",
    team: "Solo",
    status: "Live",
    demo: "https://scy-ai-mu.vercel.app",
    github: "https://github.com/yxu173/scy-ai",
    year: "2026",
    challenges: [
      { title: "The same story from ten outlets", solution: "Normalize every URL (dropping tracking parameters) and title before ranking, and compare against what the tracker already holds, so each story shows up once." },
      { title: "Agents that make up sources", solution: "ScyAgent must discover sources with a tool and preview uncertain ones before proposing them, and is told never to invent a URL, publication or claim about coverage." },
      { title: "Summaries that overstate the news", solution: "Briefs use only the article's own text, separate confirmed facts from implications, and end with what the source does not establish. Thin sources get refused instead of padded." },
    ],
    outcomes: [
      "Live, invite-only, with admin-approved magic-link access",
      "Source packs for AI providers, research and the AI market built in",
      "Ranking logic covered by tests",
    ],
    architecture: [
      "Next.js App Router with API routes for trackers, feed, briefs and chat",
      "Mastra agents: ScyAgent for trackers, a summarizer for summaries and briefs",
      "Mastra workflows: tracker creation, content curation, feed assembly, daily refresh",
      "RSS fetch, source discovery and tracker tools",
      "PostgreSQL via node-postgres and Drizzle",
      "Better Auth magic links sent through Resend, admin access requests",
    ],
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
    gradient: "from-rigel to-arcturus",
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
    github: "https://github.com/yxu173/Internship-Platform",
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

export const posts: Post[] = [];

export const experience = [
  {
    role: "Full-Stack Engineer",
    company: "Zynda AI",
    period: "Feb 2025 — Present",
    points: [
      "Building Zynda, the company's multi-agent AI platform, across backend, frontend, AI and DevOps",
      "Backend: tRPC APIs, Postgres, durable runs on Trigger.dev",
      "Frontend: the chat, Studio canvas and document viewers in Next.js and React",
      "AI: the agent router, specialist lanes, Deep Research and memory",
      "DevOps: deployments, CI/CD and infrastructure upkeep",
    ],
  },
  {
    role: "CS Graduate → AI Focus",
    company: "Faculty of Science, Menofia University + Self-study",
    period: "2021 — 2025",
    location: "Egypt",
    points: ["Graduated from the Faculty of Science, Menofia University; shipped Internship Connect Egypt pilot (850 students)", "Deep dives: distributed systems, ML.NET, LLM evals", "Arch Linux daily-driver since 2021"],
  },
];

export const skills = [
  { group: "AI", items: ["Mastra agents + workflows", "Vercel AI SDK", "RAG + pgvector", "Agent evals + scorers", "Claude Code + coding agents"] },
  { group: "Backend", items: ["TypeScript", "Bun + Node", "tRPC", "PostgreSQL + Drizzle", "Redis", ".NET"] },
  { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Excalidraw + canvas UIs", "Terminal UIs"] },
  { group: "Infra", items: ["Vercel", "Neon", "Trigger.dev", "Daytona sandboxes", "GitHub Actions", "Arch Linux + Hyprland"] },
];

export const journey = [
  { year: "2021", text: "Started CS — fell in love with Linux and backend" },
  { year: "2023", text: "Shipped Internship Connect Egypt pilot" },
  { year: "2025", text: "Graduated from Menofia University and joined Zynda AI as a full-stack engineer" },
  { year: "2026", text: "Built and launched yxuOS, an AI workspace for teams" },
];

export const faqs = [
  { q: "Are you available for freelance work?", a: "Sometimes, alongside my full-time role at Zynda AI. Send what you're building, your timeline and budget, and I'll tell you honestly whether I can take it on." },
  { q: "What do you work on?", a: "AI products end to end: agents, RAG and workflows, the backend underneath them and the interface on top. Most of it in TypeScript with Next.js, Mastra and Postgres." },
  { q: "Can I see your code?", a: "Yes. yxu-code, yxuOS, scy-ai and the Internship Platform are open source on GitHub, and yxuOS and scy-ai have live demos." },
  { q: "Where are you based?", a: "Cairo, Egypt, on UTC+2." },
];
