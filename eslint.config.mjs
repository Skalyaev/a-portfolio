import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import eslintConfigPrettier from "eslint-config-prettier"

//======== GENERAL
const generalConfigIgnores = globalIgnores(
  [".next/**", "next-env.d.ts"],
  "general/ignores"
)
const generalConfigs = [generalConfigIgnores]

//======== NEXT
const nextConfigs = [...nextVitals, ...nextTs]

//======== PRETTIER
const prettierConfigRecommended = {
  name: "prettier/recommended",
  ...eslintConfigPrettier
}
const prettierConfigs = [prettierConfigRecommended]

/**
 * @type {import('eslint').Linter.Config[]}
 */
const configs = defineConfig([
  ...generalConfigs,
  ...nextConfigs,
  ...prettierConfigs
])
export default configs
