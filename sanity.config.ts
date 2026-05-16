import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const sanityProjectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset =
  process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const sanityApiVersion =
  process.env.SANITY_STUDIO_API_VERSION ??
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ??
  "2025-01-01";

export default defineConfig({
  name: "dariusz-dryl-portfolio",
  title: "Dariusz Dryl Portfolio",
  projectId: sanityProjectId ?? "",
  dataset: sanityDataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool({
      defaultApiVersion: sanityApiVersion,
    }),
  ],
});
