import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playbackId = searchParams.get("playbackId");

  if (!playbackId) {
    return NextResponse.json(
      { error: "Playback ID is required" },
      { status: 400 }
    );
  }

  const keyId = process.env.MUX_TOKEN_ID;
  const keySecret = Buffer.from(
    process.env.MUX_BASE64_ENCODED_PRIVATE_KEY,
    "base64"
  ).toString("ascii");



  try {
    const token = jwt.sign(
      {
        kid: process.env.MUX_SINGING_KEY,
        aud: "t",
        sub: playbackId,
        exp: 1747345691,
      },
      keySecret,
      {
        algorithm: "RS256",
        keyid: keyId,
      }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Mux Signing Error:", error);
    return NextResponse.json(
      { error: "Failed to generate signed token" },
      { status: 500 }
    );
  }
}
