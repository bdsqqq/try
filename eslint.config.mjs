import eslint from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
   eslint.configs.recommended,
   ...tseslint.configs.recommended,
   prettierRecommended,
);
