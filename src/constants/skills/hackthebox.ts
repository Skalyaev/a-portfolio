import type { PlatformProfile } from "@/constants/skills/profile"

export interface HtbEntry {
  name: string
  url?: string
  category: string
  date?: string
}

export interface HtbCategory {
  name: string
  solved: number
  total: number
}

export interface HtbAcademyData {
  lastUpdated: string
  categories: HtbCategory[]
  modules: HtbEntry[]
}

export interface HtbLabData {
  lastUpdated: string
  rank: number | null
  challengesSolved: number
  challengesTotal: number
  machinesSolved: number
  machinesTotal: number
  challengeCategories: HtbCategory[]
  solvedChallenges: HtbEntry[]
}

const hackTheBoxProfileId = "01a089e9-5e12-7172-88bd-af8834d82d69"

export const hackTheBoxProfile: PlatformProfile = {
  name: "HackTheBox - Lab",
  profileUrl: `https://profile.hackthebox.com/profile/${hackTheBoxProfileId}`
}

export const hackTheBoxAcademy: PlatformProfile = {
  name: "HackTheBox - Academy",
  profileUrl: "https://academy.hackthebox.com/"
}

// The Academy API only accepts a browser session cookie (no stable app
// token like the Labs API), so this section is a static snapshot: run
// `npm run htb:academy` (see scripts/fetch-htb-academy.mjs) to refresh it.
// --- HTB Academy data (generated) ---
export const hackTheBoxAcademyData: HtbAcademyData = {
  lastUpdated: "2026-09-12",
  categories: [
    { name: "General", solved: 27, total: 56 },
    { name: "Offensive", solved: 23, total: 98 },
    { name: "Defensive", solved: 1, total: 197 },
    { name: "Purple", solved: 1, total: 3 }
  ],
  modules: [
    {
      name: "Android Fundamentals",
      url: "https://academy.hackthebox.com/course/preview/android-fundamentals",
      category: "General",
      date: "2025-06-25"
    },
    {
      name: "File Inclusion",
      url: "https://academy.hackthebox.com/course/preview/file-inclusion",
      category: "Offensive",
      date: "2025-04-17"
    },
    {
      name: "Web Fuzzing",
      url: "https://academy.hackthebox.com/course/preview/web-fuzzing",
      category: "Offensive",
      date: "2025-04-13"
    },
    {
      name: "Pentest in a Nutshell",
      url: "https://academy.hackthebox.com/course/preview/pentest-in-a-nutshell",
      category: "Offensive",
      date: "2025-04-06"
    },
    {
      name: "Network Foundations",
      url: "https://academy.hackthebox.com/course/preview/network-foundations",
      category: "General",
      date: "2025-04-01"
    },
    {
      name: "Intro to Academy's Purple Modules",
      url: "https://academy.hackthebox.com/course/preview/intro-to-academys-purple-modules",
      category: "Purple",
      date: "2025-03-20"
    },
    {
      name: "Fundamentals of AI",
      url: "https://academy.hackthebox.com/course/preview/fundamentals-of-ai",
      category: "General",
      date: "2025-03-19"
    },
    {
      name: "Introduction to Information Security",
      url: "https://academy.hackthebox.com/course/preview/introduction-to-information-security",
      category: "General",
      date: "2025-03-19"
    },
    {
      name: "Introduction to Penetration Testing",
      url: "https://academy.hackthebox.com/course/preview/introduction-to-penetration-testing",
      category: "Offensive",
      date: "2025-03-19"
    },
    {
      name: "Shells & Payloads",
      url: "https://academy.hackthebox.com/course/preview/shells--payloads",
      category: "Offensive",
      date: "2025-02-20"
    },
    {
      name: "File Transfers",
      url: "https://academy.hackthebox.com/course/preview/file-transfers",
      category: "Offensive",
      date: "2025-02-19"
    },
    {
      name: "Vulnerability Assessment",
      url: "https://academy.hackthebox.com/course/preview/vulnerability-assessment",
      category: "Offensive",
      date: "2025-02-19"
    },
    {
      name: "Using the Metasploit Framework",
      url: "https://academy.hackthebox.com/course/preview/using-the-metasploit-framework",
      category: "Offensive",
      date: "2025-02-18"
    },
    {
      name: "Cross-Site Scripting (XSS)",
      url: "https://academy.hackthebox.com/course/preview/cross-site-scripting-xss",
      category: "Offensive",
      date: "2025-02-18"
    },
    {
      name: "Information Gathering - Web Edition",
      url: "https://academy.hackthebox.com/course/preview/information-gathering---web-edition",
      category: "Offensive",
      date: "2025-02-18"
    },
    {
      name: "Footprinting",
      url: "https://academy.hackthebox.com/course/preview/footprinting",
      category: "Offensive",
      date: "2025-02-17"
    },
    {
      name: "DNS Enumeration Using Python",
      url: "https://academy.hackthebox.com/course/preview/dns-enumeration-using-python",
      category: "General",
      date: "2024-05-05"
    },
    {
      name: "Introduction to C#",
      url: "https://academy.hackthebox.com/course/preview/introduction-to-c",
      category: "General",
      date: "2024-05-05"
    },
    {
      name: "Documentation & Reporting",
      url: "https://academy.hackthebox.com/course/preview/documentation--reporting",
      category: "General",
      date: "2024-05-04"
    },
    {
      name: "Brief Intro to Hardware Attacks",
      url: "https://academy.hackthebox.com/course/preview/brief-intro-to-hardware-attacks",
      category: "General",
      date: "2024-05-04"
    },
    {
      name: "Security Incident Reporting",
      url: "https://academy.hackthebox.com/course/preview/security-incident-reporting",
      category: "General",
      date: "2024-05-04"
    },
    {
      name: "Windows Privilege Escalation",
      url: "https://academy.hackthebox.com/course/preview/windows-privilege-escalation",
      category: "Offensive",
      date: "2024-01-13"
    },
    {
      name: "SQL Injection Fundamentals",
      url: "https://academy.hackthebox.com/course/preview/sql-injection-fundamentals",
      category: "Offensive",
      date: "2024-01-07"
    },
    {
      name: "Linux Privilege Escalation",
      url: "https://academy.hackthebox.com/course/preview/linux-privilege-escalation",
      category: "Offensive",
      date: "2024-01-07"
    },
    {
      name: "Stack-Based Buffer Overflows on Windows x86",
      url: "https://academy.hackthebox.com/course/preview/stack-based-buffer-overflows-on-windows-x86",
      category: "Offensive",
      date: "2024-01-07"
    },
    {
      name: "Cracking Passwords with Hashcat",
      url: "https://academy.hackthebox.com/course/preview/cracking-passwords-with-hashcat",
      category: "Offensive",
      date: "2024-01-06"
    },
    {
      name: "Stack-Based Buffer Overflows on Linux x86",
      url: "https://academy.hackthebox.com/course/preview/stack-based-buffer-overflows-on-linux-x86",
      category: "Offensive",
      date: "2024-01-06"
    },
    {
      name: "Introduction to Python 3",
      url: "https://academy.hackthebox.com/course/preview/introduction-to-python-3",
      category: "General",
      date: "2024-01-06"
    },
    {
      name: "Bug Bounty Hunting Process",
      url: "https://academy.hackthebox.com/course/preview/bug-bounty-hunting-process",
      category: "General",
      date: "2024-01-05"
    },
    {
      name: "SQLMap Essentials",
      url: "https://academy.hackthebox.com/course/preview/sqlmap-essentials",
      category: "Offensive",
      date: "2024-01-02"
    },
    {
      name: "Network Enumeration with Nmap",
      url: "https://academy.hackthebox.com/course/preview/network-enumeration-with-nmap",
      category: "Offensive",
      date: "2023-12-30"
    },
    {
      name: "Attacking Web Applications with Ffuf",
      url: "https://academy.hackthebox.com/course/preview/attacking-web-applications-with-ffuf",
      category: "Offensive",
      date: "2023-12-30"
    },
    {
      name: "Login Brute Forcing",
      url: "https://academy.hackthebox.com/course/preview/login-brute-forcing",
      category: "Offensive",
      date: "2023-12-30"
    },
    {
      name: "Using Web Proxies",
      url: "https://academy.hackthebox.com/course/preview/using-web-proxies",
      category: "Offensive",
      date: "2023-12-30"
    },
    {
      name: "Incident Handling Process",
      url: "https://academy.hackthebox.com/course/preview/incident-handling-process",
      category: "General",
      date: "2023-12-30"
    },
    {
      name: "Getting Started",
      url: "https://academy.hackthebox.com/course/preview/getting-started",
      category: "Offensive",
      date: "2023-12-29"
    },
    {
      name: "Intro to Assembly Language",
      url: "https://academy.hackthebox.com/course/preview/intro-to-assembly-language",
      category: "General",
      date: "2023-12-29"
    },
    {
      name: "Penetration Testing Process",
      url: "https://academy.hackthebox.com/course/preview/penetration-testing-process",
      category: "General",
      date: "2023-12-29"
    },
    {
      name: "JavaScript Deobfuscation",
      url: "https://academy.hackthebox.com/course/preview/javascript-deobfuscation",
      category: "Defensive",
      date: "2023-12-28"
    },
    {
      name: "Web Requests",
      url: "https://academy.hackthebox.com/course/preview/web-requests",
      category: "General",
      date: "2023-12-25"
    },
    {
      name: "Introduction to Web Applications",
      url: "https://academy.hackthebox.com/course/preview/introduction-to-web-applications",
      category: "General",
      date: "2023-12-25"
    },
    {
      name: "Intro to Network Traffic Analysis",
      url: "https://academy.hackthebox.com/course/preview/intro-to-network-traffic-analysis",
      category: "General",
      date: "2023-12-25"
    },
    {
      name: "MacOS Fundamentals",
      url: "https://academy.hackthebox.com/course/preview/macos-fundamentals",
      category: "General",
      date: "2023-12-25"
    },
    {
      name: "Introduction to Windows Command Line",
      url: "https://academy.hackthebox.com/course/preview/introduction-to-windows-command-line",
      category: "General",
      date: "2023-12-25"
    },
    {
      name: "Windows Fundamentals",
      url: "https://academy.hackthebox.com/course/preview/windows-fundamentals",
      category: "General",
      date: "2023-12-24"
    },
    {
      name: "Introduction to Active Directory",
      url: "https://academy.hackthebox.com/course/preview/introduction-to-active-directory",
      category: "General",
      date: "2023-12-24"
    },
    {
      name: "Introduction to Bash Scripting",
      url: "https://academy.hackthebox.com/course/preview/introduction-to-bash-scripting",
      category: "General",
      date: "2023-12-22"
    },
    {
      name: "Introduction to Networking",
      url: "https://academy.hackthebox.com/course/preview/introduction-to-networking",
      category: "General",
      date: "2023-12-22"
    },
    {
      name: "Linux Fundamentals",
      url: "https://academy.hackthebox.com/course/preview/linux-fundamentals",
      category: "General",
      date: "2023-12-20"
    },
    {
      name: "Setting Up",
      url: "https://academy.hackthebox.com/course/preview/setting-up",
      category: "General",
      date: "2023-12-20"
    },
    {
      name: "Learning Process",
      url: "https://academy.hackthebox.com/course/preview/learning-process",
      category: "General",
      date: "2023-12-19"
    },
    {
      name: "Intro to Academy",
      url: "https://academy.hackthebox.com/course/preview/intro-to-academy",
      category: "General",
      date: "2023-12-19"
    }
  ]
}
// --- end HTB Academy data ---

// The live HTB API is too rate-limit-flaky to call from the site itself, so
// this section is a static snapshot: run `npm run htb:lab` (see
// scripts/fetch-htb-lab.mjs) to refresh it.
// --- HTB Lab data (generated) ---
export const hackTheBoxLabData: HtbLabData = {
  lastUpdated: "2026-09-13",
  rank: 968,
  challengesSolved: 69,
  challengesTotal: 853,
  machinesSolved: 13,
  machinesTotal: 552,
  challengeCategories: [
    { name: "Reversing", solved: 11, total: 101 },
    { name: "Crypto", solved: 10, total: 132 },
    { name: "Web", solved: 8, total: 171 },
    { name: "Hardware", solved: 8, total: 42 },
    { name: "Forensics", solved: 7, total: 77 },
    { name: "Coding", solved: 6, total: 18 },
    { name: "Blockchain", solved: 5, total: 17 },
    { name: "Pwn", solved: 4, total: 136 },
    { name: "GamePwn", solved: 3, total: 13 },
    { name: "Mobile", solved: 2, total: 24 },
    { name: "AI/ML", solved: 2, total: 18 },
    { name: "Misc", solved: 1, total: 60 },
    { name: "OSINT", solved: 1, total: 11 },
    { name: "ICS", solved: 1, total: 11 },
    { name: "Secure Coding", solved: 0, total: 6 },
    { name: "Quantum", solved: 0, total: 7 },
    { name: "Satellite", solved: 0, total: 9 }
  ],
  solvedChallenges: [
    {
      name: "NoRadar",
      url: "https://app.hackthebox.com/challenges/noradar",
      category: "GamePwn",
      date: "2025-08-08"
    },
    {
      name: "Token to Wonderland",
      url: "https://app.hackthebox.com/challenges/token-to-wonderland",
      category: "Blockchain",
      date: "2025-08-03"
    },
    {
      name: "Like a Glove",
      url: "https://app.hackthebox.com/challenges/like-a-glove",
      category: "AI/ML",
      date: "2025-08-03"
    },
    {
      name: "Desires",
      url: "https://app.hackthebox.com/challenges/desires",
      category: "Web",
      date: "2025-08-03"
    },
    {
      name: "Magic Vault",
      url: "https://app.hackthebox.com/challenges/magic-vault",
      category: "Blockchain",
      date: "2025-08-02"
    },
    {
      name: "Honor Among Thieves",
      url: "https://app.hackthebox.com/challenges/honor-among-thieves",
      category: "Blockchain",
      date: "2025-08-02"
    },
    {
      name: "PINsmith",
      url: "https://app.hackthebox.com/challenges/pinsmith",
      category: "Coding",
      date: "2025-08-02"
    },
    {
      name: "Line",
      url: "https://app.hackthebox.com/challenges/line",
      category: "Hardware",
      date: "2025-08-02"
    },
    {
      name: "Rhome",
      url: "https://app.hackthebox.com/challenges/rhome",
      category: "Crypto",
      date: "2025-07-31"
    },
    {
      name: "Fishy HTTP",
      url: "https://app.hackthebox.com/challenges/fishy-http",
      category: "Forensics",
      date: "2025-07-31"
    },
    {
      name: "r0bob1rd",
      url: "https://app.hackthebox.com/challenges/r0bob1rd",
      category: "Pwn",
      date: "2025-07-31"
    },
    {
      name: "CubeMadness2",
      url: "https://app.hackthebox.com/challenges/cubemadness2",
      category: "GamePwn",
      date: "2025-07-30"
    },
    {
      name: "AI SPACE",
      url: "https://app.hackthebox.com/challenges/ai-space",
      category: "AI/ML",
      date: "2025-07-30"
    },
    {
      name: "Factory",
      url: "https://app.hackthebox.com/challenges/factory",
      category: "ICS",
      date: "2025-07-19"
    },
    {
      name: "Protein Cookies",
      url: "https://app.hackthebox.com/challenges/protein-cookies",
      category: "Crypto",
      date: "2025-07-19"
    },
    {
      name: "Quantum-Safe",
      url: "https://app.hackthebox.com/challenges/quantum-safe",
      category: "Crypto",
      date: "2025-07-19"
    },
    {
      name: "Partial Encryption",
      url: "https://app.hackthebox.com/challenges/partial-encryption",
      category: "Reversing",
      date: "2025-07-19"
    },
    {
      name: "Embryonic Plant",
      url: "https://app.hackthebox.com/challenges/embryonic-plant",
      category: "Crypto",
      date: "2025-07-19"
    },
    {
      name: "RFlag",
      url: "https://app.hackthebox.com/challenges/rflag",
      category: "Hardware",
      date: "2025-07-19"
    },
    {
      name: "Cyberpsychosis",
      url: "https://app.hackthebox.com/challenges/cyberpsychosis",
      category: "Reversing",
      date: "2025-07-19"
    },
    {
      name: "ARMs Race",
      url: "https://app.hackthebox.com/challenges/arms-race",
      category: "Reversing",
      date: "2025-07-19"
    },
    {
      name: "Execute",
      url: "https://app.hackthebox.com/challenges/execute",
      category: "Pwn",
      date: "2025-07-19"
    },
    {
      name: "POP Restaurant",
      url: "https://app.hackthebox.com/challenges/pop-restaurant",
      category: "Web",
      date: "2025-07-19"
    },
    {
      name: "Pentest Notes",
      url: "https://app.hackthebox.com/challenges/pentest-notes",
      category: "Web",
      date: "2025-07-16"
    },
    {
      name: "RAuth",
      url: "https://app.hackthebox.com/challenges/rauth",
      category: "Reversing",
      date: "2025-07-15"
    },
    {
      name: "RSAisEasy",
      url: "https://app.hackthebox.com/challenges/rsaiseasy",
      category: "Crypto",
      date: "2025-07-15"
    },
    {
      name: "Wander",
      url: "https://app.hackthebox.com/challenges/wander",
      category: "Hardware",
      date: "2025-07-15"
    },
    {
      name: "Micro Storage",
      url: "https://app.hackthebox.com/challenges/micro-storage",
      category: "Misc",
      date: "2025-07-15"
    },
    {
      name: "Suspicious Threat",
      url: "https://app.hackthebox.com/challenges/suspicious-threat",
      category: "Forensics",
      date: "2025-07-15"
    },
    {
      name: "Signals",
      url: "https://app.hackthebox.com/challenges/signals",
      category: "Hardware",
      date: "2025-07-15"
    },
    {
      name: "Mission Pinpossible",
      url: "https://app.hackthebox.com/challenges/mission-pinpossible",
      category: "Hardware",
      date: "2025-07-14"
    },
    {
      name: "TrueSecrets",
      url: "https://app.hackthebox.com/challenges/truesecrets",
      category: "Forensics",
      date: "2025-07-13"
    },
    {
      name: "Obscure",
      url: "https://app.hackthebox.com/challenges/obscure",
      category: "Forensics",
      date: "2025-07-12"
    },
    {
      name: "Bypass",
      url: "https://app.hackthebox.com/challenges/bypass",
      category: "Reversing",
      date: "2025-07-12"
    },
    {
      name: "Reminiscent",
      url: "https://app.hackthebox.com/challenges/reminiscent",
      category: "Forensics",
      date: "2025-07-12"
    },
    {
      name: "Cat",
      url: "https://app.hackthebox.com/challenges/cat",
      category: "Mobile",
      date: "2025-07-11"
    },
    {
      name: "Exatlon",
      url: "https://app.hackthebox.com/challenges/exatlon",
      category: "Reversing",
      date: "2025-07-11"
    },
    {
      name: "emo",
      url: "https://app.hackthebox.com/challenges/emo",
      category: "Forensics",
      date: "2025-07-11"
    },
    {
      name: "APKey",
      url: "https://app.hackthebox.com/challenges/apkey",
      category: "Mobile",
      date: "2025-07-11"
    },
    {
      name: "CubeMadness1",
      url: "https://app.hackthebox.com/challenges/cubemadness1",
      category: "GamePwn",
      date: "2025-07-11"
    },
    {
      name: "Diagnostic",
      url: "https://app.hackthebox.com/challenges/diagnostic",
      category: "Forensics",
      date: "2025-07-11"
    },
    {
      name: "xorxorxor",
      url: "https://app.hackthebox.com/challenges/xorxorxor",
      category: "Crypto",
      date: "2025-07-11"
    },
    {
      name: "PDFy",
      url: "https://app.hackthebox.com/challenges/pdfy",
      category: "Web",
      date: "2025-07-11"
    },
    {
      name: "Baby Time Capsule",
      url: "https://app.hackthebox.com/challenges/baby-time-capsule",
      category: "Crypto",
      date: "2025-07-10"
    },
    {
      name: "Simple Encryptor",
      url: "https://app.hackthebox.com/challenges/simple-encryptor",
      category: "Reversing",
      date: "2025-07-10"
    },
    {
      name: "The Last Dance",
      url: "https://app.hackthebox.com/challenges/the-last-dance",
      category: "Crypto",
      date: "2025-07-10"
    },
    {
      name: "Restaurant",
      url: "https://app.hackthebox.com/challenges/restaurant",
      category: "Pwn",
      date: "2025-07-09"
    },
    {
      name: "Debugging Interface",
      url: "https://app.hackthebox.com/challenges/debugging-interface",
      category: "Hardware",
      date: "2025-07-09"
    },
    {
      name: "The Needle",
      url: "https://app.hackthebox.com/challenges/the-needle",
      category: "Hardware",
      date: "2025-07-09"
    },
    {
      name: "BabyEncryption",
      url: "https://app.hackthebox.com/challenges/babyencryption",
      category: "Crypto",
      date: "2025-07-09"
    },
    {
      name: "Behind the Scenes",
      url: "https://app.hackthebox.com/challenges/behind-the-scenes",
      category: "Reversing",
      date: "2025-07-09"
    },
    {
      name: "Distract and Destroy",
      url: "https://app.hackthebox.com/challenges/distract-and-destroy",
      category: "Blockchain",
      date: "2025-07-08"
    },
    {
      name: "Low Logic",
      url: "https://app.hackthebox.com/challenges/low-logic",
      category: "Hardware",
      date: "2025-07-08"
    },
    {
      name: "Survival of the Fittest",
      url: "https://app.hackthebox.com/challenges/survival-of-the-fittest",
      category: "Blockchain",
      date: "2025-07-08"
    },
    {
      name: "Spookifier",
      url: "https://app.hackthebox.com/challenges/spookifier",
      category: "Web",
      date: "2025-07-07"
    },
    {
      name: "SpookyPass",
      url: "https://app.hackthebox.com/challenges/spookypass",
      category: "Reversing",
      date: "2025-07-07"
    },
    {
      name: "You know 0xDiablos",
      url: "https://app.hackthebox.com/challenges/you-know-0xdiablos",
      category: "Pwn",
      date: "2024-01-16"
    },
    {
      name: "Find The Easy Pass",
      url: "https://app.hackthebox.com/challenges/find-the-easy-pass",
      category: "Reversing",
      date: "2024-01-15"
    },
    {
      name: "Weak RSA",
      url: "https://app.hackthebox.com/challenges/weak-rsa",
      category: "Crypto",
      date: "2024-01-15"
    },
    {
      name: "Pivot Chain",
      url: "https://app.hackthebox.com/challenges/pivot-chain",
      category: "Coding"
    },
    {
      name: "CDNio",
      url: "https://app.hackthebox.com/challenges/cdnio",
      category: "Web"
    },
    {
      name: "Sudoking",
      url: "https://app.hackthebox.com/challenges/sudoking",
      category: "Coding"
    },
    {
      name: "Dark Runes",
      url: "https://app.hackthebox.com/challenges/dark-runes",
      category: "Web"
    },
    {
      name: "Hubbub",
      url: "https://app.hackthebox.com/challenges/hubbub",
      category: "Reversing"
    },
    {
      name: "Primed for Action",
      url: "https://app.hackthebox.com/challenges/primed-for-action",
      category: "Coding"
    },
    {
      name: "Evaluative",
      url: "https://app.hackthebox.com/challenges/evaluative",
      category: "Coding"
    },
    {
      name: "NexusSeven",
      url: "https://app.hackthebox.com/challenges/nexusseven",
      category: "Web"
    },
    {
      name: "Cred Hunter",
      url: "https://app.hackthebox.com/challenges/cred-hunter",
      category: "Coding"
    },
    {
      name: "The Suspicious Reviewer",
      url: "https://app.hackthebox.com/challenges/the-suspicious-reviewer",
      category: "OSINT"
    }
  ]
}
// --- end HTB Lab data ---
