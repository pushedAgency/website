import { NextResponse } from "next/server";
import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Agrega tu token en el .env.local

export async function GET() {
  try {
    const headers = GITHUB_TOKEN
      ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
      : {};

    const response = await axios.get(
      `https://api.github.com/repos/pushedAgency/website-img/contents`,
      { headers }
    );
    if (response.data) {
      const imageUrls = response.data
        .filter(
          (file) =>
            file.name &&
            file.name !== ".DS_Store" &&
            file.name !== "README.md"
        )
        .map((file) => file.name);

      return NextResponse.json(imageUrls);
    }
  } catch (error) {
    console.error(
      "Error fetching images:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      { error: error.response?.data?.message || "Failed to fetch images" },
      { status: error.response?.status || 500 }
    );
  }
}
