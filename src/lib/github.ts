const OWNER = "yxu173";

const REPOS = [
  { repo: "yxu-code", slug: "yxu-code" },
  { repo: "yxuOS", slug: "yxuos" },
  { repo: "scy-ai", slug: "scy-ai" },
];

export type Transmission = {
  repo: string;
  slug: string;
  message: string;
  url: string;
  date: string;
};

type GitHubCommit = {
  html_url: string;
  commit: { message: string; author: { date: string } | null; committer: { date: string } | null };
};

const PER_REPO = 2;

function tidy(message: string) {
  const line = message.split("\n")[0].replace(/^(feat|fix|chore|docs|refactor|perf|test|style)(\([^)]*\))?!?:\s*/i, "");
  return line.charAt(0).toUpperCase() + line.slice(1);
}

/**
 * Latest real commits across my open-source repos, newest first. Cached for an hour;
 * set GITHUB_TOKEN to raise the API rate limit. Returns [] when GitHub can't be reached.
 */
export async function getTransmissions(): Promise<Transmission[]> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const perRepo = await Promise.all(
    REPOS.map(async ({ repo, slug }) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/commits?per_page=12`, {
          headers,
          next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const commits = (await res.json()) as GitHubCommit[];
        return commits
          .filter((c) => !/^Merge (pull request|branch|remote-tracking)/.test(c.commit.message))
          .slice(0, PER_REPO)
          .map((c) => ({
            repo,
            slug,
            message: tidy(c.commit.message),
            url: c.html_url,
            date: c.commit.author?.date ?? c.commit.committer?.date ?? "",
          }));
      } catch {
        return [];
      }
    })
  );

  return perRepo.flat().sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function timeAgo(iso: string, now = Date.now()) {
  const seconds = Math.round((Date.parse(iso) - now) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["week", 604_800],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
  ];
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "just now";
}
