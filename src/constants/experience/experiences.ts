import { Bash } from "@/components/svg/Bash"
import { BurpSuite } from "@/components/svg/BurpSuite"
import { Css } from "@/components/svg/Css"
import { Docker } from "@/components/svg/Docker"
import { FastApi } from "@/components/svg/FastApi"
import { Git } from "@/components/svg/Git"
import { Html } from "@/components/svg/Html"
import { JavaScript } from "@/components/svg/JavaScript"
import { NestJs } from "@/components/svg/NestJs"
import { NextJs } from "@/components/svg/NextJs"
import { Nginx } from "@/components/svg/Nginx"
import { PostgreSql } from "@/components/svg/PostgreSql"
import { Python } from "@/components/svg/Python"
import { ReactJs } from "@/components/svg/ReactJs"
import { Rust } from "@/components/svg/Rust"
import { Sentry } from "@/components/svg/Sentry"
import { Sql } from "@/components/svg/Sql"
import { TailwindCss } from "@/components/svg/TailwindCss"
import { TypeScript } from "@/components/svg/TypeScript"
import { VueJs } from "@/components/svg/VueJs"

import type { Technology } from "@/constants/github/projects"
import type { IconComponent } from "@/constants/icons"

export type ExperienceId = "klaire" | "limed" | "mbc" | "opale"

export type ContractType = "internship" | "freelance" | "permanent"

export type LeaderRole = "ceo" | "cto" | "founder" | "cofounder"

export type ExperienceTechnology = Extract<
  Technology,
  | "React"
  | "Next.js"
  | "Vue.js"
  | "NestJS"
  | "FastAPI"
  | "PostgreSQL"
  | "Nginx"
  | "Tailwind CSS"
  | "Sentry"
  | "Burp Suite"
  | "Docker"
  | "Git"
>

// GitHub linguist names, so they match the language names of the skills page.
export type ExperienceLanguage =
  | "Python"
  | "JavaScript"
  | "Rust"
  | "TypeScript"
  | "SQL"
  | "Bash"
  | "HTML"
  | "CSS"

export interface ExperienceLeader {
  name: string
  // A leader can hold several roles at once, e.g. sole founder and CEO.
  roles: LeaderRole[]
  linkedinUrl: string
}

export interface Experience {
  id: ExperienceId
  company: string
  websiteUrl: string | null
  linkedinUrl: string | null
  leaders: ExperienceLeader[]
  contract: ContractType
  startDate: string
  endDate: string
  highlightKeys: string[]
  languages: ExperienceLanguage[]
  technologies: ExperienceTechnology[]
}

// Most recent first.
export const experiences: Experience[] = [
  {
    id: "klaire",
    company: "Klaire",
    websiteUrl: "https://www.klaire-notaires.com/",
    linkedinUrl: "https://www.linkedin.com/company/klaire-ai/",
    leaders: [
      {
        name: "Félix des Rotours",
        roles: ["ceo", "cofounder"],
        linkedinUrl:
          "https://www.linkedin.com/in/f%C3%A9lix-des-rotours-b6a1a822a/"
      },
      {
        name: "Alain du Pavillon",
        roles: ["cto", "cofounder"],
        linkedinUrl: "https://www.linkedin.com/in/alain-du-pavillon-3b4264148/"
      }
    ],
    contract: "permanent",
    startDate: "2025-12-01",
    endDate: "2026-07-01",
    highlightKeys: [
      "fullstack",
      "fullstackContribution",
      "rituals",
      "frontendRedesign",
      "bugTracking"
    ],
    languages: ["JavaScript", "TypeScript", "HTML", "CSS", "SQL", "Bash"],
    technologies: [
      "React",
      "Tailwind CSS",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "Git",
      "Sentry"
    ]
  },
  {
    id: "limed",
    company: "Limed",
    websiteUrl: null,
    linkedinUrl: "https://www.linkedin.com/company/limed-france/",
    leaders: [
      {
        name: "Jacobo Sanchez",
        roles: ["ceo", "founder"],
        linkedinUrl: "https://www.linkedin.com/in/jacoboss/"
      }
    ],
    contract: "internship",
    startDate: "2025-05-01",
    endDate: "2025-11-01",
    highlightKeys: ["internalProjects", "saasApps", "botExtension", "salesPoc"],
    languages: ["JavaScript", "TypeScript", "HTML", "CSS", "Python", "Bash"],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Burp Suite",
      "Docker",
      "Git"
    ]
  },
  {
    id: "mbc",
    company: "Music Brand Communication",
    websiteUrl: "https://www.mbc.eu.com/",
    linkedinUrl: "https://www.linkedin.com/company/music-brand-communication/",
    leaders: [
      {
        name: "Stephane Malca",
        roles: ["ceo", "founder"],
        linkedinUrl: "https://www.linkedin.com/in/stephane-malca-11213a6"
      }
    ],
    contract: "freelance",
    startDate: "2024-06-01",
    endDate: "2025-04-01",
    highlightKeys: ["webInterface", "backend", "crossPlatform", "deployment"],
    languages: [
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Python",
      "Rust",
      "Bash"
    ],
    technologies: ["Vue.js", "FastAPI", "PostgreSQL", "Nginx", "Docker", "Git"]
  },
  {
    id: "opale",
    company: "Opale",
    websiteUrl: "https://www.opale.ai/",
    linkedinUrl: "https://www.linkedin.com/company/opaleai/",
    leaders: [
      {
        name: "Aubin Mazet",
        roles: ["ceo", "cofounder"],
        linkedinUrl: "https://www.linkedin.com/in/aubin-mazet/"
      },
      {
        name: "Ali Kefia",
        roles: ["cto", "cofounder"],
        linkedinUrl: "https://www.linkedin.com/in/alikefia/"
      },
      {
        name: "Sami Bargaoui",
        roles: ["cofounder"],
        linkedinUrl: "https://www.linkedin.com/in/samibargaoui/"
      }
    ],
    contract: "internship",
    startDate: "2024-06-01",
    endDate: "2024-12-01",
    highlightKeys: ["fullstack", "designCollab", "backend", "testing"],
    languages: ["JavaScript", "TypeScript", "HTML", "CSS", "Python", "Bash"],
    technologies: ["Vue.js", "Tailwind CSS", "FastAPI", "PostgreSQL", "Git"]
  }
]

export const languageIcons: Record<ExperienceLanguage, IconComponent> = {
  Python: Python,
  JavaScript: JavaScript,
  TypeScript: TypeScript,
  Rust: Rust,
  SQL: Sql,
  Bash: Bash,
  HTML: Html,
  CSS: Css
}

export const technologyIcons: Record<ExperienceTechnology, IconComponent> = {
  "React": ReactJs,
  "Next.js": NextJs,
  "Vue.js": VueJs,
  "NestJS": NestJs,
  "FastAPI": FastApi,
  "PostgreSQL": PostgreSql,
  "Nginx": Nginx,
  "Tailwind CSS": TailwindCss,
  "Sentry": Sentry,
  "Burp Suite": BurpSuite,
  "Docker": Docker,
  "Git": Git
}
