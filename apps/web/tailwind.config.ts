import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "../../libs/ui/**/*.{ts,tsx}"],
  presets: [import("../../libs/ui/tailwind.config")],
};
export default config;