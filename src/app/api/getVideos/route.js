// app/api/videos/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const auth = Buffer.from(
    `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`
  ).toString('base64');

  try {
    const res = await fetch('https://api.mux.com/video/v1/assets', {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!res.ok) throw new Error('Mux API error');

    const { data } = await res.json();

    const videos = data
      .map((video) => ({
        id: video.id,
        title: video?.meta?.title || 'Untitled',
        playback_id: video?.playback_ids?.[0]?.id || null,
        external_id: video?.meta?.external_id || null,
      }));

    return NextResponse.json({ videos });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 });
  }
}
