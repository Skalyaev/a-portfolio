/** @type {import("prettier").Config} */
const config = {
  /**
   * always (défaut) : Toujours inclure les parenthèses
   * autour des arguments d'une fonction fléchée.
   *
   * avoid : Ne pas inclure les parenthèses quand il n'y
   * a qu'un seul argument.
   */
  arrowParens: "always",

  /**
   * true : Place le `>` d'un élément multi-lignes (JSX/HTML)
   * sur la dernière ligne au lieu d'une ligne à part.
   *
   * false (défaut) : Place le `>` sur une ligne à part.
   */
  bracketSameLine: true,

  /**
   * true (défaut) : Ajoute des espaces entre les accolades
   * des littéraux d'objet.
   *
   * false : N'ajoute pas d'espaces entre les accolades.
   */
  bracketSpacing: true,

  /**
   * auto (défaut) : Formate le code intégré dans des
   * chaînes (ex. CSS/GraphQL dans un template literal).
   *
   * off : Ne formate pas le code intégré dans des chaînes.
   */
  embeddedLanguageFormatting: "auto",

  /**
   * lf (défaut) : Utilise le caractère de fin de ligne Unix
   * (\n).
   *
   * crlf : Utilise le caractère de fin de ligne Windows
   * (\r\n).
   *
   * cr : Utilise le caractère de fin de ligne classique Mac
   * (\r).
   *
   * auto : Conserve le caractère de fin de ligne existant.
   */
  endOfLine: "lf",

  /**
   * start : Place l'opérateur en début de ligne quand une
   * expression binaire est coupée.
   *
   * end (défaut) : Place l'opérateur en fin de ligne quand
   * une expression binaire est coupée.
   */
  experimentalOperatorPosition: "end",

  /**
   * true : Utilise une mise en forme expérimentale des
   * ternaires, point d'interrogation après la condition.
   *
   * false (défaut) : Utilise la mise en forme classique des
   * ternaires.
   */
  experimentalTernaries: false,

  /**
   * css (défaut) : Respecte les règles CSS `display` pour
   * décider si les espaces blancs sont significatifs.
   *
   * strict : Considère les espaces blancs comme toujours
   * significatifs.
   *
   * ignore : Considère les espaces blancs comme jamais
   * significatifs.
   */
  htmlWhitespaceSensitivity: "css",

  /**
   * true : Utilise des guillemets simples plutôt que
   * doubles dans le JSX.
   *
   * false (défaut) : Utilise des guillemets doubles dans le
   * JSX.
   */
  jsxSingleQuote: false,

  /**
   * preserve (défaut) : Conserve le retour à la ligne d'un
   * littéral d'objet s'il y en avait un dans la source.
   *
   * collapse : Force un littéral d'objet sur une seule
   * ligne quand c'est possible.
   */
  objectWrap: "collapse",

  /**
   * 80 (défaut) : Longueur de ligne, en nombre de
   * caractères, à partir de laquelle Prettier tente de
   * retourner à la ligne.
   */
  printWidth: 80,

  /**
   * always : Reformate le texte Markdown pour respecter
   * `printWidth`.
   *
   * never : Ne reformate jamais le texte Markdown.
   *
   * preserve (défaut) : Laisse le texte Markdown tel quel.
   */
  proseWrap: "preserve",

  /**
   * as-needed (défaut) : Ajoute des guillemets uniquement
   * quand ils sont nécessaires.
   *
   * consistent : Ajoute des guillemets à toutes les clés dès
   * qu'une seule en a besoin.
   *
   * preserve : Conserve les guillemets tels qu'écrits dans
   * la source.
   */
  quoteProps: "consistent",

  /**
   * true (défaut) : Ajoute un point-virgule à la fin des
   * instructions.
   *
   * false : N'ajoute pas de point-virgule, sauf si
   * nécessaire pour éviter une ambiguïté (ASI).
   */
  semi: false,

  /**
   * true : Force un seul attribut par ligne en HTML, Vue et
   * JSX.
   *
   * false (défaut) : Autorise plusieurs attributs par ligne.
   */
  singleAttributePerLine: true,

  /**
   * true : Utilise des guillemets simples plutôt que
   * doubles.
   *
   * false (défaut) : Utilise des guillemets doubles.
   */
  singleQuote: false,

  /**
   * 2 (défaut) : Nombre d'espaces utilisés par niveau
   * d'indentation.
   */
  tabWidth: 2,

  /**
   * all (défaut) : Ajoute des virgules finales partout où
   * c'est syntaxiquement possible.
   *
   * es5 : Ajoute des virgules finales uniquement là où
   * elles sont valides en ES5 (tableaux, objets, etc.).
   *
   * none : N'ajoute jamais de virgule finale.
   */
  trailingComma: "none",

  /**
   * true : Indente avec des tabulations plutôt que des
   * espaces.
   *
   * false (défaut) : Indente avec des espaces.
   */
  useTabs: false,

  /**
   * true : Indente le contenu des balises `<script>` et
   * `<style>` dans les fichiers Vue.
   *
   * false (défaut) : N'indente pas le contenu de ces
   * balises.
   */
  vueIndentScriptAndStyle: false
}
export default config
