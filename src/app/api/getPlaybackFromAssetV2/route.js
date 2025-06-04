import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const assetIds = searchParams.getAll("assetId");

    if (!assetIds || assetIds.length === 0) {
      return NextResponse.json(
        { error: "Missing assetId(s)" },
        { status: 400 }
      );
    }

    // Ejecuta las llamadas en paralelo
    const results = await Promise.all(
      assetIds.map(async (assetId) => {
        try {
          const asset = await mux.video.assets.retrieve(assetId);
          const playback = asset.playback_ids;

          if (!playback || playback.length === 0) {
            return { assetId, error: "No playback IDs found" };
          }

          const publicId =
            playback.find((item) => item.policy === "public")?.id || null;

          if (publicId === null) {
            const playbackId = await Video.Assets.createPlaybackId(assetId, {
              policy: "public", // o 'public'
            });
          }

          const signedId =
            playback.find((item) => item.policy === "signed")?.id || null;

          return { assetId, publicId, signedId };
        } catch (err) {
          return { assetId, error: err.message };
        }
      })
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
