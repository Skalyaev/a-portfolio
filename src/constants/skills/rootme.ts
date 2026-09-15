import type { PlatformProfile } from "@/constants/skills/profile"

interface RootMeChallenge {
  name: string
  url: string
  date?: string
}

interface RootMeCategory {
  name: string
  url: string
  percent: number
  score: number
  solved: number
  total: number
  solvedChallenges: RootMeChallenge[]
}

interface RootMeData {
  score: number
  rank: number
  challengesSolved: number
  challengesTotal: number
  machinesSolved: number
  machinesTotal: number
  lastUpdated: string
  categories: RootMeCategory[]
}

const rootMeUsername = process.env.NEXT_PUBLIC_ROOTME_USERNAME ?? "Skalyaev"

export const rootMeProfile: PlatformProfile = {
  name: "Root-Me",
  profileUrl: `https://www.root-me.org/${rootMeUsername}`
}

export const rootMeActivityHorizon = "2023-11-01"

export const rootMeData: RootMeData = {
  score: 2680,
  rank: 4011,
  challengesSolved: 152,
  challengesTotal: 608,
  machinesSolved: 5,
  machinesTotal: 163,
  lastUpdated: "2026-09-12",
  categories: [
    {
      name: "App - Script",
      url: "https://www.root-me.org/fr/Challenges/App-Script/",
      percent: 76,
      score: 545,
      solved: 25,
      total: 33,
      solvedChallenges: [
        {
          name: "Bash - System 1",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Bash-System-1"
        },
        {
          name: "sudo - faiblesse de configuration",
          url: "https://www.root-me.org/fr/Challenges/App-Script/sudo-faiblesse-de-configuration"
        },
        {
          name: "Bash - System 2",
          url: "https://www.root-me.org/fr/Challenges/App-Script/ELF32-System-2"
        },
        {
          name: "LaTeX - Input",
          url: "https://www.root-me.org/fr/Challenges/App-Script/LaTeX-Input"
        },
        {
          name: "Powershell -  Command injection",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Powershell-Command-injection"
        },
        {
          name: "AppArmor - Jail Introduction",
          url: "https://www.root-me.org/fr/Challenges/App-Script/AppArmor-Jail-Introduction"
        },
        {
          name: "Bash - unquoted expression injection",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Bash-unquoted-expression-injection"
        },
        {
          name: "Docker - I am groot",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Docker-I-am-groot",
          date: "2023-11-01"
        },
        {
          name: "Perl - Command injection",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Perl-Command-injection"
        },
        {
          name: "Powershell - SecureString",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Powershell-SecureString"
        },
        {
          name: "Bash - cron",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Bash-cron"
        },
        {
          name: "LaTeX - Execution de commandes",
          url: "https://www.root-me.org/fr/Challenges/App-Script/LaTeX-Execution-de-commandes"
        },
        {
          name: "Python - input()",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Python-input"
        },
        {
          name: "R : exécution de code",
          url: "https://www.root-me.org/fr/Challenges/App-Script/R-execution-de-code"
        },
        {
          name: "Powershell - Basic jail",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Powershell-Basic-jail",
          date: "2023-11-01"
        },
        {
          name: "Python - pickle",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Python-pickle",
          date: "2023-11-01"
        },
        {
          name: "Bash - quoted expression injection",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Bash-quoted-expression-injection",
          date: "2023-11-01"
        },
        {
          name: "Docker - Sys-Admin’s Docker",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Docker-Sys-Admin-s-Docker",
          date: "2023-11-01"
        },
        {
          name: "Shared Objects hijacking",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Shared-Objects-hijacking",
          date: "2023-12-01"
        },
        {
          name: "SSH - Agent Hijacking",
          url: "https://www.root-me.org/fr/Challenges/App-Script/SSH-Agent-Hijacking",
          date: "2023-12-01"
        },
        {
          name: "Bash - race condition",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Bash-race-condition",
          date: "2023-12-01"
        },
        {
          name: "Docker - Talk through me",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Docker-Talk-through-me",
          date: "2023-12-01"
        },
        {
          name: "Python - format string",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Python-format-string",
          date: "2023-12-01"
        },
        {
          name: "Python - PyJail 1",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Python-PyJail-1",
          date: "2023-12-01"
        },
        {
          name: "Python - PyJail 2",
          url: "https://www.root-me.org/fr/Challenges/App-Script/Python-PyJail-2",
          date: "2023-12-01"
        }
      ]
    },
    {
      name: "Programmation",
      url: "https://www.root-me.org/fr/Challenges/Programmation/",
      percent: 62,
      score: 485,
      solved: 18,
      total: 29,
      solvedChallenges: [
        {
          name: "TCP - Retour au collège",
          url: "https://www.root-me.org/fr/Challenges/Programmation/TCP-Retour-au-college"
        },
        {
          name: "TCP - Chaîne encodée",
          url: "https://www.root-me.org/fr/Challenges/Programmation/TCP-Chaine-encodee"
        },
        {
          name: "TCP - La roue romaine",
          url: "https://www.root-me.org/fr/Challenges/Programmation/TCP-La-roue-romaine"
        },
        {
          name: "TCP - Uncompress Me",
          url: "https://www.root-me.org/fr/Challenges/Programmation/TCP-Uncompress-Me"
        },
        {
          name: "CAPTCHA me if you can",
          url: "https://www.root-me.org/fr/Challenges/Programmation/CAPTCHA-me-if-you-can"
        },
        {
          name: "Ethereum - Tutoreum",
          url: "https://www.root-me.org/fr/Challenges/Programmation/Ethereum-Tutoreum"
        },
        {
          name: "Suite mathématique",
          url: "https://www.root-me.org/fr/Challenges/Programmation/Suite-mathematique"
        },
        {
          name: "ELF x64 - Shellcoding - Sheep warmup",
          url: "https://www.root-me.org/fr/Challenges/Programmation/ELF-x64-Shellcoding-Sheep-warmup"
        },
        {
          name: "Solveur de polynômes du second degré",
          url: "https://www.root-me.org/fr/Challenges/Programmation/Solveur-de-polynomes-du-second-degre"
        },
        {
          name: "Ethereum - Takeover",
          url: "https://www.root-me.org/fr/Challenges/Programmation/Ethereum-Takeover"
        },
        {
          name: "Multiples encodages",
          url: "https://www.root-me.org/fr/Challenges/Programmation/Multiples-encodages"
        },
        {
          name: "Apprenti Scraper",
          url: "https://www.root-me.org/fr/Challenges/Programmation/Apprenti-Scraper",
          date: "2023-12-01"
        },
        {
          name: "ARM - Shellcoding - Egg hunter",
          url: "https://www.root-me.org/fr/Challenges/Programmation/ARM-Shellcoding-Egg-hunter",
          date: "2023-12-01"
        },
        {
          name: "Ethereum - NotSoPriv8",
          url: "https://www.root-me.org/fr/Challenges/Programmation/Ethereum-NotSoPriv8",
          date: "2023-12-01"
        },
        {
          name: "ELF x64 - Shellcoding - Polymorphism",
          url: "https://www.root-me.org/fr/Challenges/Programmation/ELF-x64-Shellcoding-Polymorphism",
          date: "2023-12-01"
        },
        {
          name: "Ethereum - Reentrancy",
          url: "https://www.root-me.org/fr/Challenges/Programmation/Ethereum-Reentrancy",
          date: "2023-12-01"
        },
        {
          name: "Quick Response Code",
          url: "https://www.root-me.org/fr/Challenges/Programmation/Quick-Response-Code",
          date: "2023-12-01"
        },
        {
          name: "Ethereum - BadStack",
          url: "https://www.root-me.org/fr/Challenges/Programmation/Ethereum-BadStack",
          date: "2023-12-01"
        }
      ]
    },
    {
      name: "Réseau",
      url: "https://www.root-me.org/fr/Challenges/Reseau/",
      percent: 43,
      score: 215,
      solved: 15,
      total: 35,
      solvedChallenges: [
        {
          name: "FTP - Authentification",
          url: "https://www.root-me.org/fr/Challenges/Reseau/FTP-Authentification"
        },
        {
          name: "TELNET - authentification",
          url: "https://www.root-me.org/fr/Challenges/Reseau/TELNET-authentification"
        },
        {
          name: "ETHERNET - trame",
          url: "https://www.root-me.org/fr/Challenges/Reseau/ETHERNET-trame"
        },
        {
          name: "Authentification twitter",
          url: "https://www.root-me.org/fr/Challenges/Reseau/Authentification-twitter"
        },
        {
          name: "Bluetooth - Fichier inconnu",
          url: "https://www.root-me.org/fr/Challenges/Reseau/Bluetooth-Fichier-inconnu"
        },
        {
          name: "CISCO - mot de passe",
          url: "https://www.root-me.org/fr/Challenges/Reseau/CISCO-mot-de-passe"
        },
        {
          name: "DNS - transfert de zone",
          url: "https://www.root-me.org/fr/Challenges/Reseau/DNS-transfert-de-zone"
        },
        {
          name: "IP - Time To Live",
          url: "https://www.root-me.org/fr/Challenges/Reseau/IP-Time-To-Live"
        },
        {
          name: "LDAP - null bind",
          url: "https://www.root-me.org/fr/Challenges/Reseau/LDAP-null-bind"
        },
        {
          name: "OSPF - Authentification",
          url: "https://www.root-me.org/fr/Challenges/Reseau/OPSF-Authentification"
        },
        {
          name: "POP - APOP",
          url: "https://www.root-me.org/fr/Challenges/Reseau/POP-APOP"
        },
        {
          name: "RF - AM Transmission",
          url: "https://www.root-me.org/fr/Challenges/Reseau/RF-AM-Transmission"
        },
        {
          name: "RF - FM Transmission",
          url: "https://www.root-me.org/fr/Challenges/Reseau/RF-FM-Transmission"
        },
        {
          name: "RF - Key Fixed Code",
          url: "https://www.root-me.org/fr/Challenges/Reseau/RF-Key-Fixed-Code"
        },
        {
          name: "SIP - Authentification",
          url: "https://www.root-me.org/fr/Challenges/Reseau/SIP-Authentification"
        }
      ]
    },
    {
      name: "Cracking",
      url: "https://www.root-me.org/fr/Challenges/Cracking/",
      percent: 29,
      score: 290,
      solved: 20,
      total: 70,
      solvedChallenges: [
        {
          name: "ELF x86 - 0 protection",
          url: "https://www.root-me.org/fr/Challenges/Cracking/ELF-x86-0-protection"
        },
        {
          name: "ELF x86 - Basique",
          url: "https://www.root-me.org/fr/Challenges/Cracking/ELF-x86-Basique"
        },
        {
          name: "PE x86 - 0 protection",
          url: "https://www.root-me.org/fr/Challenges/Cracking/PE-x86-0-protection"
        },
        {
          name: "ELF C++ - 0 protection",
          url: "https://www.root-me.org/fr/Challenges/Cracking/ELF-C-0-protection"
        },
        {
          name: "Godot - 0 protection",
          url: "https://www.root-me.org/fr/Challenges/Cracking/Godot-0-protection"
        },
        {
          name: "PE DotNet - 0 protection",
          url: "https://www.root-me.org/fr/Challenges/Cracking/PE-DotNet-0-protection"
        },
        {
          name: "APK - Introduction",
          url: "https://www.root-me.org/fr/Challenges/Cracking/APK-Introduction"
        },
        {
          name: "ELF MIPS - Basic Crackme",
          url: "https://www.root-me.org/fr/Challenges/Cracking/ELF-MIPS-Basic-Crackme"
        },
        {
          name: "ELF x64 - Golang basique",
          url: "https://www.root-me.org/fr/Challenges/Cracking/ELF-x64-Golang-basique"
        },
        {
          name: "ELF x86 - Fake Instructions",
          url: "https://www.root-me.org/fr/Challenges/Cracking/ELF-x86-Fake-Instructions"
        },
        {
          name: "ELF x86 - Ptrace",
          url: "https://www.root-me.org/fr/Challenges/Cracking/ELF-x86-Ptrace"
        },
        {
          name: "Godot - Bytecode",
          url: "https://www.root-me.org/fr/Challenges/Cracking/Godot-Bytecode"
        },
        {
          name: "WASM - Introduction",
          url: "https://www.root-me.org/fr/Challenges/Cracking/WASM-Introduction"
        },
        {
          name: "APK - Flutter Debug",
          url: "https://www.root-me.org/fr/Challenges/Cracking/APK-Flutter-Debug"
        },
        {
          name: "ELF ARM - Basic Crackme",
          url: "https://www.root-me.org/fr/Challenges/Cracking/ELF-ARM-Basic-Crackme"
        },
        {
          name: "ELF x64 - Basic KeygenMe",
          url: "https://www.root-me.org/fr/Challenges/Cracking/ELF-x64-Basic-KeygenMe"
        },
        {
          name: "Godot - Mono",
          url: "https://www.root-me.org/fr/Challenges/Cracking/Godot-Mono"
        },
        {
          name: "PE DotNet - Basic Anti-Debug",
          url: "https://www.root-me.org/fr/Challenges/Cracking/PE-DotNet-Basic-Anti-Debug"
        },
        {
          name: "PE DotNet - Basic Crackme",
          url: "https://www.root-me.org/fr/Challenges/Cracking/PE-DotNet-Basic-Crackme"
        },
        {
          name: "PYC - ByteCode",
          url: "https://www.root-me.org/fr/Challenges/Cracking/PYC-ByteCode"
        }
      ]
    },
    {
      name: "Stéganographie",
      url: "https://www.root-me.org/fr/Challenges/Steganographie/",
      percent: 25,
      score: 55,
      solved: 6,
      total: 24,
      solvedChallenges: [
        {
          name: "EXIF - Metadata",
          url: "https://www.root-me.org/fr/Challenges/Steganographie/EXIF-Metadata"
        },
        {
          name: "Point à la ligne",
          url: "https://www.root-me.org/fr/Challenges/Steganographie/Point-a-la-ligne"
        },
        {
          name: "Steganomobile",
          url: "https://www.root-me.org/fr/Challenges/Steganographie/Steganomobile"
        },
        {
          name: "Twitter Secret Messages",
          url: "https://www.root-me.org/fr/Challenges/Steganographie/Twitter-Secret-Messages"
        },
        {
          name: "TXT - George et Alfred",
          url: "https://www.root-me.org/fr/Challenges/Steganographie/TXT-George-et-Alfred"
        },
        {
          name: "WAV - Analyse de bruit",
          url: "https://www.root-me.org/fr/Challenges/Steganographie/WAV-Analyse-de-bruit"
        }
      ]
    },
    {
      name: "App - Système",
      url: "https://www.root-me.org/fr/Challenges/App-Systeme/",
      percent: 22,
      score: 490,
      solved: 20,
      total: 93,
      solvedChallenges: [
        {
          name: "ELF x86 - Stack buffer overflow basic 1",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Stack-buffer-overflow-basic-1"
        },
        {
          name: "ELF x64 - Basic heap overflow",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x64-Basic-heap-overflow"
        },
        {
          name: "ELF x86 - Stack buffer overflow basic 2",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Stack-buffer-overflow-basic-2"
        },
        {
          name: "PE32 - Stack buffer overflow basic",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/PE32-Stack-buffer-overflow-basic"
        },
        {
          name: "ELF x86 - Format string bug basic 1",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Format-string-bug-basic-1"
        },
        {
          name: "ELF x64 - Stack buffer overflow - basic",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x64-Stack-buffer-overflow-basic"
        },
        {
          name: "ELF x86 - Format string bug basic 2",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Format-string-bug-basic-2"
        },
        {
          name: "ELF x86 - Race condition",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Race-condition"
        },
        {
          name: "ELF ARM - Stack buffer overflow - basic",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-ARM-Stack-buffer-overflow-basic",
          date: "2023-12-01"
        },
        {
          name: "ELF MIPS - Stack buffer overflow - No NX",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-MIPS-Stack-buffer-overflow-No-NX",
          date: "2023-12-01"
        },
        {
          name: "ELF x64 - Double free",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x64-Double-free",
          date: "2023-12-01"
        },
        {
          name: "ELF x86 - Stack buffer overflow basic 3",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Stack-buffer-overflow-basic-3",
          date: "2023-12-01"
        },
        {
          name: "ELF x86 - Use After Free - basic",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Use-After-Free-basic",
          date: "2023-12-01"
        },
        {
          name: "ELF x64 - Stack buffer overflow - PIE",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x64-Stack-buffer-overflow-PIE",
          date: "2023-12-01"
        },
        {
          name: "ELF x86 - BSS buffer overflow",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-BSS-buffer-overflow",
          date: "2023-12-01"
        },
        {
          name: "ELF x86 - Stack buffer overflow basic 4",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Stack-buffer-overflow-basic-4",
          date: "2023-12-01"
        },
        {
          name: "ELF x86 - Stack buffer overflow basic 6",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Stack-buffer-overflow-basic-6",
          date: "2023-12-01"
        },
        {
          name: "ELF x86 - Format String Bug Basic 3",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Format-String-Bug-Basic-3",
          date: "2023-12-01"
        },
        {
          name: "ELF x86 - Stack buffer and integer overflow",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Stack-buffer-and-integer-overflow",
          date: "2024-06-01"
        },
        {
          name: "ELF x86 - Stack buffer overflow basic 5",
          url: "https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x86-Stack-buffer-overflow-basic-5",
          date: "2023-12-01"
        }
      ]
    },
    {
      name: "Web - Serveur",
      url: "https://www.root-me.org/fr/Challenges/Web-Serveur/",
      percent: 22,
      score: 320,
      solved: 21,
      total: 97,
      solvedChallenges: [
        {
          name: "HTML - Code source",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/HTML-Code-source"
        },
        {
          name: "HTTP - Contournement de filtrage IP",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-Contournement-de-filtrage-IP"
        },
        {
          name: "HTTP - Open redirect",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-Open-redirect"
        },
        {
          name: "HTTP - User-agent",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-User-agent"
        },
        {
          name: "Mot de passe faible",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/Mot-de-passe-faible"
        },
        {
          name: "PHP - Injection de commande",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/PHP-Injection-de-commande"
        },
        {
          name: "Fichier de sauvegarde",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/Fichier-de-sauvegarde",
          date: "2023-11-01"
        },
        {
          name: "HTTP - Directory indexing",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-Directory-indexing",
          date: "2023-11-01"
        },
        {
          name: "HTTP - Headers",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-Headers",
          date: "2023-11-01"
        },
        {
          name: "HTTP - POST",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-POST",
          date: "2023-11-01"
        },
        {
          name: "HTTP - Redirection invalide",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-Redirection-invalide",
          date: "2023-11-01"
        },
        {
          name: "HTTP - Verb tampering",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-Verb-tampering",
          date: "2023-11-01"
        },
        {
          name: "Install files",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/Install-files",
          date: "2023-11-01"
        },
        {
          name: "CRLF",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/CRLF",
          date: "2023-11-01"
        },
        {
          name: "File upload - Double extensions",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/File-upload-Double-extensions",
          date: "2023-11-01"
        },
        {
          name: "File upload - Type MIME",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/File-upload-Type-MIME"
        },
        {
          name: "GraphQL - Introspection",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/GraphQL-Introspection",
          date: "2023-11-01"
        },
        {
          name: "HTTP - Cookies",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-Cookies",
          date: "2023-11-01"
        },
        {
          name: "Insecure Code Management",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/Insecure-Code-Management",
          date: "2023-11-01"
        },
        {
          name: "JWT - Introduction",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/JWT-Introduction",
          date: "2023-11-01"
        },
        {
          name: "XSS - Server Side",
          url: "https://www.root-me.org/fr/Challenges/Web-Serveur/XSS-Server-Side",
          date: "2023-11-01"
        }
      ]
    },
    {
      name: "Cryptanalyse",
      url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/",
      percent: 21,
      score: 160,
      solved: 16,
      total: 75,
      solvedChallenges: [
        {
          name: "Encodage - ASCII",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Encodage-ASCII"
        },
        {
          name: "Encodage - UU",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Encodage-UU"
        },
        {
          name: "Hash - DCC",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Hash-DCC"
        },
        {
          name: "Hash - DCC2",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Hash-DCC2"
        },
        {
          name: "Hash - LM",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Hash-LM"
        },
        {
          name: "Hash - Message Digest 5",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Hash-Message-Digest-5"
        },
        {
          name: "Hash - NT",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Hash-NT"
        },
        {
          name: "Hash - SHA-2",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Hash-SHA-2"
        },
        {
          name: "Chiffrement par décalage",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Chiffrement-par-decalage"
        },
        {
          name: "CISCO - Salted Password",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/CISCO-Salted-Password"
        },
        {
          name: "Décomposition pixelisée",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Decomposition-pixelisee"
        },
        {
          name: "ELF64 - Chiffrement avec le PID",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/ELF64-Chiffrement-avec-le-PID",
          date: "2023-11-01"
        },
        {
          name: "Fichier - PKZIP",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Fichier-PKZIP",
          date: "2023-11-01"
        },
        {
          name: "Substitution monoalphabétique - César",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Substitution-monoalphabetique-Cesar",
          date: "2023-12-01"
        },
        {
          name: "Circular Bit Shift",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Circular-Bit-Shift",
          date: "2023-12-01"
        },
        {
          name: "Transposition - Rail Fence",
          url: "https://www.root-me.org/fr/Challenges/Cryptanalyse/Transposition-Rail-Fence",
          date: "2023-12-01"
        }
      ]
    },
    {
      name: "Web - Client",
      url: "https://www.root-me.org/fr/Challenges/Web-Client/",
      percent: 21,
      score: 105,
      solved: 9,
      total: 42,
      solvedChallenges: [
        {
          name: "HTML - boutons désactivés",
          url: "https://www.root-me.org/fr/Challenges/Web-Client/HTML-boutons-desactives"
        },
        {
          name: "Javascript - Authentification",
          url: "https://www.root-me.org/fr/Challenges/Web-Client/Javascript-Authentification"
        },
        {
          name: "Javascript - Source",
          url: "https://www.root-me.org/fr/Challenges/Web-Client/Javascript-Source"
        },
        {
          name: "Javascript - Authentification 2",
          url: "https://www.root-me.org/fr/Challenges/Web-Client/Javascript-Authentification-2"
        },
        {
          name: "Javascript - Obfuscation 1",
          url: "https://www.root-me.org/fr/Challenges/Web-Client/Javascript-Obfuscation-1"
        },
        {
          name: "Javascript - Obfuscation 2",
          url: "https://www.root-me.org/fr/Challenges/Web-Client/Javascript-Obfuscation-2"
        },
        {
          name: "Javascript - Native code",
          url: "https://www.root-me.org/fr/Challenges/Web-Client/Javascript-Native-code"
        },
        {
          name: "Javascript - Webpack",
          url: "https://www.root-me.org/fr/Challenges/Web-Client/Javascript-Webpack"
        },
        {
          name: "Javascript - Obfuscation 3",
          url: "https://www.root-me.org/fr/Challenges/Web-Client/Javascript-Obfuscation-3",
          date: "2023-12-01"
        }
      ]
    },
    {
      name: "Forensic",
      url: "https://www.root-me.org/fr/Challenges/Forensic/",
      percent: 2,
      score: 5,
      solved: 1,
      total: 48,
      solvedChallenges: [
        {
          name: "Fichier supprimé",
          url: "https://www.root-me.org/fr/Challenges/Forensic/Fichier-supprime"
        }
      ]
    },
    {
      name: "Réaliste",
      url: "https://www.root-me.org/fr/Challenges/Realiste/",
      percent: 2,
      score: 10,
      solved: 1,
      total: 62,
      solvedChallenges: [
        {
          name: "Eh oui, parfois",
          url: "https://www.root-me.org/fr/Challenges/Realiste/Eh-oui-parfois"
        }
      ]
    }
  ]
}
