import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;
const client = redisUrl ? new Redis(redisUrl) : null;

export async function saveSite(slug: string, data: any) {
  if (client) {
    await client.set(`site:${slug}`, JSON.stringify(data));
  } else {
    memory.set(slug, data);
  }
}

export async function getSite(slug: string) {
  if (client) {
    const raw = await client.get(`site:${slug}`);
    return raw ? JSON.parse(raw) : null;
  }
  return memory.get(slug) ?? null;
}

export async function listSites(limit = 10) {
  if (client) {
    const keys = await client.keys("site:*");
    const results: any[] = [];
    for (const k of keys.slice(0, limit)) {
      const raw = await client.get(k);
      if (raw) {
        const data = JSON.parse(raw);
        results.push({ slug: k.replace("site:", ""), ...data });
      }
    }
    return results;
  }
  return Array.from(memory.entries()).map(([slug, data]) => ({ slug, ...data }));
}

let memory = new Map<string, any>();
