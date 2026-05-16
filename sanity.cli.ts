import "dotenv/config";
import { defineCliConfig } from "sanity/cli";

const sanityProjectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset =
  process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: {
    projectId: sanityProjectId ?? "",
    dataset: sanityDataset,
  },
});
