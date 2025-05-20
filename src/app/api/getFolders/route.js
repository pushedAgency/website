import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = 'nodejs';

export async function GET(req) {
  try {
    const directoryPath = path.join(process.cwd(), 'public', '_next-video');

    if (!fs.existsSync(directoryPath)) {
      return NextResponse.json(
        { error: `Folder does not exist` },
        { status: 404 }
      );
    }

    const getSubfolders = (dirPath) => {
      return fs.readdirSync(dirPath).filter((item) =>
        fs.statSync(path.join(dirPath, item)).isDirectory()
      );
    };

    const readJsonMetadataInSubfolder = (subfolderPath) => {
      const items = fs.readdirSync(subfolderPath);
      const results = [];

      items.forEach((item) => {
        const fullPath = path.join(subfolderPath, item);

        if (fs.statSync(fullPath).isFile() && item.endsWith('.json')) {
          try {
            const fileContent = fs.readFileSync(fullPath, 'utf-8');
            const json = JSON.parse(fileContent);

            const assetId = json?.providerMetadata?.mux?.assetId || null;

            results.push({
              filename: item.replace('.mov.json', ''),
              assetId,
            });
          } catch (err) {
            console.warn(`Error parsing JSON file ${item}:`, err.message);
          }
        }
      });

      return results;
    };

    const subfolderNames = getSubfolders(directoryPath);
    if (subfolderNames.length === 0) {
      return NextResponse.json(
        { error: "No subfolders found in this folder" },
        { status: 404 }
      );
    }

    const result = {};

    for (const subfolder of subfolderNames) {
      const subfolderPath = path.join(directoryPath, subfolder);
      const metadataList = readJsonMetadataInSubfolder(subfolderPath);

      if (metadataList.length > 0) {
        result[subfolder] = metadataList;
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error reading JSON metadata:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch video metadata" },
      { status: 500 }
    );
  }
}
