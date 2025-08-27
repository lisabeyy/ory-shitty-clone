// Simple store abstraction: Vercel KV if available, else in-memory Map

let memory = new Map<string, any>();

async function kvClient() {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import("@vercel/kv");
      return kv;
    }
  } catch {}
  return null as any;
}

const PREFIX = "site:";

export async function saveSite(slug: string, data: any) {
  const kv = await kvClient();
  if (kv) {
    await kv.hset(PREFIX + slug, data);
    // TODO: Maintain an index set for listing if needed
  } else {
    memory.set(slug, data);
  }
}

export async function getSite(slug: string) {
  const kv = await kvClient();
  if (kv) {
    const res = await kv.hgetall(PREFIX + slug);
    return res && Object.keys(res).length ? res : null;
  } else {
    return memory.get(slug) ?? null;
  }
}

export async function listSites(limit = 10) {
  const kv = await kvClient();
  if (kv) {
    return [] as { slug: string; title?: string; templateId: string }[];
  }
  const arr: { slug: string; title?: string; templateId: string }[] = [];
  for (const [slug, data] of memory) {
    arr.push({ slug, title: data?.props?.title, templateId: data?.templateId });
    if (arr.length >= limit) break;
  }
  return arr;
}
