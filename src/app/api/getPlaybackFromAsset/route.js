import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get("assetId");

    if (!assetId) {
      return NextResponse.json({ error: "Missing assetId" }, { status: 400 });
    }

    const asset = await mux.video.assets.retrieve(assetId);
    const playback = asset.playback_ids;

    if (!playback || playback.length === 0) {
      return NextResponse.json(
        { error: "No playback IDs found" },
        { status: 404 }
      );
    }

    // Buscar por tipo de policy
    const publicId = playback.find((item) => item.policy === "public")?.id || null;
    const signedId = playback.find((item) => item.policy === "signed")?.id || null;

    return NextResponse.json({ publicId, signedId });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
