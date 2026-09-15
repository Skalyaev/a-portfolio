/** @type {import("prettier").Config} */
const config = {
  /**
   * always (default): Always include parentheses around
   * arrow function arguments.
   *
   * avoid: Omit parentheses when there is a single
   * argument.
   */
  arrowParens: "always",

  /**
   * true: Put the `>` of a multi-line element (JSX/HTML)
   * at the end of the last line instead of on its own line.
   *
   * false (default): Put the `>` on its own line.
   */
  bracketSameLine: true,

  /**
   * true (default): Print spaces between the braces of
   * object literals.
   *
   * false: Print no spaces between the braces.
   */
  bracketSpacing: true,

  /**
   * auto (default): Format code embedded in strings
   * (e.g. CSS/GraphQL in a template literal).
   *
   * off: Never format code embedded in strings.
   */
  embeddedLanguageFormatting: "auto",

  /**
   * lf (default): Use the Unix line ending character
   * (\n).
   *
   * crlf: Use the Windows line ending characters
   * (\r\n).
   *
   * cr: Use the classic Mac line ending character
   * (\r).
   *
   * auto: Keep the existing line ending character.
   */
  endOfLine: "lf",

  /**
   * start: Put the operator at the start of the line when
   * a binary expression is broken.
   *
   * end (default): Put the operator at the end of the line
   * when a binary expression is broken.
   */
  experimentalOperatorPosition: "end",

  /**
   * true: Use the experimental ternary formatting, with the
   * question mark after the condition.
   *
   * false (default): Use the classic ternary formatting.
   */
  experimentalTernaries: false,

  /**
   * css (default): Follow the CSS `display` rules to decide
   * whether whitespace is significant.
   *
   * strict: Treat whitespace as always significant.
   *
   * ignore: Treat whitespace as never significant.
   */
  htmlWhitespaceSensitivity: "css",

  /**
   * true: Use single quotes instead of double quotes in
   * JSX.
   *
   * false (default): Use double quotes in JSX.
   */
  jsxSingleQuote: false,

  /**
   * preserve (default): Keep an object literal multi-line
   * if the source had a newline in it.
   *
   * collapse: Fit an object literal on a single line
   * whenever possible.
   */
  objectWrap: "collapse",

  /**
   * 80 (default): Line length, in characters, beyond which
   * Prettier tries to wrap.
   */
  printWidth: 80,

  /**
   * always: Wrap Markdown prose to fit `printWidth`.
   *
   * never: Never wrap Markdown prose.
   *
   * preserve (default): Leave Markdown prose as is.
   */
  proseWrap: "preserve",

  /**
   * as-needed (default): Only quote object keys when
   * required.
   *
   * consistent: Quote every key as soon as one requires
   * it.
   *
   * preserve: Keep quotes as written in the source.
   */
  quoteProps: "consistent",

  /**
   * true (default): Add a semicolon at the end of every
   * statement.
   *
   * false: Omit semicolons, except where required to avoid
   * ambiguity (ASI).
   */
  semi: false,

  /**
   * true: Enforce a single attribute per line in HTML, Vue
   * and JSX.
   *
   * false (default): Allow several attributes per line.
   */
  singleAttributePerLine: true,

  /**
   * true: Use single quotes instead of double quotes.
   *
   * false (default): Use double quotes.
   */
  singleQuote: false,

  /**
   * 2 (default): Number of spaces per indentation level.
   */
  tabWidth: 2,

  /**
   * all (default): Add trailing commas wherever
   * syntactically valid.
   *
   * es5: Add trailing commas only where valid in ES5
   * (arrays, objects, etc.).
   *
   * none: Never add trailing commas.
   */
  trailingComma: "none",

  /**
   * true: Indent with tabs instead of spaces.
   *
   * false (default): Indent with spaces.
   */
  useTabs: false,

  /**
   * true: Indent the content of `<script>` and `<style>`
   * tags in Vue files.
   *
   * false (default): Do not indent the content of these
   * tags.
   */
  vueIndentScriptAndStyle: false
}
export default config
