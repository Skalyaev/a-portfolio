import colors from "tailwindcss/colors"

export const languageColors: Record<string, string> = {
  "Python": colors.teal[500],
  "TypeScript": colors.blue[500],
  "JavaScript": colors.yellow[500],
  "CSS": colors.violet[500],
  "C": colors.orange[500],
  "C++": colors.pink[500],
  "Assembly": colors.red[500],
  "Shell": colors.lime[500],
  "Makefile": colors.green[500],
  "Dockerfile": colors.sky[500]
}
export const languageLightColors: Record<string, string> = {
  "Python": colors.teal[100],
  "TypeScript": colors.blue[100],
  "JavaScript": colors.yellow[100],
  "CSS": colors.violet[100],
  "C": colors.orange[100],
  "C++": colors.pink[100],
  "Assembly": colors.red[100],
  "Shell": colors.lime[100],
  "Makefile": colors.green[100],
  "Dockerfile": colors.sky[100]
}

export const otherLanguageColor = colors.gray[500]

export const otherLanguageKey = "other"

export const languageOrder: string[] = [
  "Python",
  "JavaScript",
  "TypeScript",
  "CSS",
  "C",
  "C++",
  "Assembly",
  "Shell",
  "Makefile",
  "Dockerfile"
]
