import { tool } from "@opencode-ai/plugin";
import regenSlices from "./regen-slices";

export default tool({
  description:
    "Quick alias to regenerate Prismic slices with screenshot refresh",
  async execute(_args, context) {
    return regenSlices.execute({ screenshots: true }, context);
  },
});
