import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export default tool({
  description:
    "Regenerate Prismic slices in the current project using Slice Machine. Starts the Slice Machine UI/server, which automatically syncs models from Prismic, regenerates mock data, updates components if needed, and refreshes previews/screenshots on load or via manual actions in the UI. Useful after slice model changes in Prismic.",
  args: {
    sliceNames: z
      .array(z.string())
      .optional()
      .describe(
        "Optional array of specific slice names (not used for targeted CLI regeneration, as it's not supported natively). Provided for future extensibility or manual reference.",
      ),
    screenshots: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "If true, emphasizes the need to manually update screenshots in the Slice Machine UI after startup (no automated force via CLI).",
      ),
  },
  async execute(args, context) {
    const { sliceNames, screenshots } = args;

    // Many projects define "slicemachine" or "slice-machine" in package.json scripts
    // We use pnpm (strictly enforced in this project), so prefer "pnpm slicemachine" if available
    // Fallback to "pnpm slice-machine" or direct npx
    const command =
      "pnpm slicemachine || pnpm slice-machine || pnpm start-slicemachine || npx start-slicemachine";

    let message = `Starting Prismic Slice Machine UI/server via: ${command}\n\n`;
    message += "Slice Machine will automatically:\n";
    message += "- Pull latest slice models from Prismic\n";
    message += "- Regenerate/update mock data (mocks.json per slice)\n";
    message += "- Sync local components if models changed\n\n";
    message +=
      "Open the UI (usually http://localhost:9999) to review changes.\n";

    if (sliceNames && sliceNames.length > 0) {
      message += `Note: Targeted regeneration of specific slices (${sliceNames.join(
        ", ",
      )}) is not supported via CLI. Use the UI to focus on those slices.\n`;
    }

    if (screenshots) {
      message += "For updated screenshots/previews:\n";
      message += "- Go to each slice in the UI\n";
      message += "- Use the Simulator to preview with good mock data\n";
      message +=
        "- Click 'Update screenshot' or use the automatic capture button if available\n\n";
    }

    message += "Command output (if any):\n";

    try {
      // Run non-interactively; .quiet() suppresses stdout, but we capture any errors
      const result = await Bun.$`${command}`.quiet().text();
      message +=
        result ||
        "Slice Machine started successfully (check your terminal/browser for the UI).";
    } catch (error) {
      message += `\nError starting Slice Machine: ${error.message || error}\n`;
      message +=
        "Fallback: Try running 'pnpm slicemachine' or check your package.json scripts.";
    }

    return message;
  },
});
