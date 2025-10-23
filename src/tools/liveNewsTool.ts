


// Headings removed and compiled as one

import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";

// ---------------------------------------------------
//   🧠 Fetch and generate one clean-line summary per news
//--------------------------------------------------- 
export async function fetchLiveNewsDigest(query: string) {
  console.log("🟢 Fetching concise digest for:", query);
  try {
    const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(
      query
    )}&hl=en-US&gl=US&ceid=US:en`;

    const res = await fetch(feedUrl);
    if (!res.ok) return `❌ Failed to fetch RSS (${res.status}).`;

    const xml = await res.text();
    const parsed = await parseStringPromise(xml, { trim: true });
    const items = parsed?.rss?.channel?.[0]?.item || [];

    if (items.length === 0) return `⚠️ No news found for "${query}".`;

    // 🧩 Extract and compress descriptions only
    const summaries = items
      .slice(0, 5)
      .map((item: any) => {
        let desc = (item.description?.[0] || "")
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        // Remove headline repetition
        const title = (item.title?.[0] || "").trim();
        if (desc.startsWith(title)) {
          desc = desc.slice(title.length).trim();
        }

        // Clean punctuation and shorten
        if (desc.length > 180) desc = desc.split(".")[0] + ".";

        return `- ${desc}`;
      })
      .filter((line) => line && line.length > 5)
      .join("\n");

    return `🧠 Concise AI Digest for "${query}"\n\n${summaries}`;
  } catch (err: any) {
    console.error("💥 Error in fetchLiveNewsDigest:", err);
    return `❌ Error: ${err.message}`;
  }
}

// ---------------------------------------------------
//   🧪 Run manually
//--------------------------------------------------- 
(async () => {
  console.log("🚀 Running minimal digest...");
  const result = await fetchLiveNewsDigest("latest news about artificial intelligence");
  console.log("\n✅ RESULT:\n", result);
  console.log("\n🏁 Done.");
})();

// All compiles into one
