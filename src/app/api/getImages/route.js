import { NextResponse } from "next/server";
import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Agrega tu token en el .env.local

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const folderName = searchParams.get("folder_name");

  if (!folderName) {
    return NextResponse.json(
      { error: "Missing folder_name parameter" },
      { status: 400 }
    );
  }

  try {
    const headers = GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};
    
    const response = await axios.get(
      `https://api.github.com/repos/pushedAgency/website-img/contents//${folderName}`,
      { headers }
    );

    if (response.data && Array.isArray(response.data)) {
      const imageUrls = response.data
        .filter(
          (file) =>
            file.type === "file" &&
            file.download_url &&
            file.name !== ".DS_Store" // Excluir .DS_Store
        )
        .map((file) => file.download_url);

      return NextResponse.json(imageUrls);
    } else {
      return NextResponse.json(
        { error: "No images found in this folder" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching images:", error.response?.data || error.message);

    return NextResponse.json(
      { error: error.response?.data?.message || "Failed to fetch images" },
      { status: error.response?.status || 500 }
    );
  }
}
