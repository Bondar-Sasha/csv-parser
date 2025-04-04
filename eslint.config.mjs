import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node, 
      },
    },
    plugins: { js },
    extends: ["js/recommended"],
  },
]);