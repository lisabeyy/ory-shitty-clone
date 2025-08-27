import { NextResponse } from "next/server";
import { listSites } from "@/lib/store";

export async function GET() {
  try {
    const sites = await listSites(100); // Get up to 100 sites
    return NextResponse.json(sites);
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 });
  }
}
