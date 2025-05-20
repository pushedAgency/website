import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playbackId = searchParams.get("playbackId");

  const keySecret = Buffer.from(
    process.env.MUX_BASE64_ENCODED_PRIVATE_KEY,
    "base64"
  ).toString("ascii");

  let baseOptions = {
    keyId: process.env.MUX_SINGING_KEY,
    keySecret: keySecret,
    expiration: "1d",
  };

  const token = await mux.jwt.signPlaybackId(playbackId, {
    ...baseOptions,
    type: "video",
  });

  if (!playbackId) {
    return NextResponse.json(
      { error: "Playback ID is required" },
      { status: 400 }
    );
  }

  return NextResponse.json({ token });
}
