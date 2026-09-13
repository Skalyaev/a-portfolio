// Tailwind 500 shades, hardcoded to keep the full palette out of client bundles.
export const languageColors: Record<string, string> = {
  "Python": "oklch(70.4% 0.14 182.503)",
  "TypeScript": "oklch(62.3% 0.214 259.815)",
  "JavaScript": "oklch(79.5% 0.184 86.047)",
  "CSS": "oklch(60.6% 0.25 292.717)",
  "C": "oklch(70.5% 0.213 47.604)",
  "C++": "oklch(65.6% 0.241 354.308)",
  "Assembly": "oklch(63.7% 0.237 25.331)",
  "Shell": "oklch(76.8% 0.233 130.85)",
  "Makefile": "oklch(72.3% 0.219 149.579)",
  "Dockerfile": "oklch(68.5% 0.169 237.323)"
}

// Tailwind 100 shades of the colors above.
export const languageLightColors: Record<string, string> = {
  "Python": "oklch(95.3% 0.051 180.801)",
  "TypeScript": "oklch(93.2% 0.032 255.585)",
  "JavaScript": "oklch(97.3% 0.071 103.193)",
  "CSS": "oklch(94.3% 0.029 294.588)",
  "C": "oklch(95.4% 0.038 75.164)",
  "C++": "oklch(94.8% 0.028 342.258)",
  "Assembly": "oklch(93.6% 0.032 17.717)",
  "Shell": "oklch(96.7% 0.067 122.328)",
  "Makefile": "oklch(96.2% 0.044 156.743)",
  "Dockerfile": "oklch(95.1% 0.026 236.824)"
}

// Tailwind gray-500.
export const otherLanguageColor = "oklch(55.1% 0.027 264.364)"

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
