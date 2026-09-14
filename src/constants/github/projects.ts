import { Chart } from "@/components/svg/Chart"
import { Globe } from "@/components/svg/Globe"
import { Processor } from "@/components/svg/Processor"
import { Server } from "@/components/svg/Server"
import { Shield } from "@/components/svg/Shield"
import { Variable } from "@/components/svg/Variable"

import type { IconComponent } from "@/constants/icons"

export const githubUsername = "Skalyaev"

export const githubRevalidateSeconds = 3600

export const githubLanguageFetchConcurrency = 8

export type ProjectTag =
  "web" | "cybersecurity" | "sysadmin" | "network" | "unix" | "algorithms"

export const allProjectTags: ProjectTag[] = [
  "web",
  "cybersecurity",
  "sysadmin",
  "network",
  "unix",
  "algorithms"
]

export const projectTagIcons: Record<ProjectTag, IconComponent> = {
  web: Globe,
  cybersecurity: Shield,
  sysadmin: Server,
  network: Chart,
  unix: Processor,
  algorithms: Variable
}

export type Technology =
  | "Next.js"
  | "Kubernetes (K3s)"
  | "Vagrant"
  | "Argo CD (GitOps)"
  | "TCP/IP"
  | "Port Scanning"
  | "Binary Exploitation"
  | "Reverse Engineering (ELF)"
  | "SQL Injection"
  | "ARP Spoofing (MITM)"
  | "Malware Analysis"
  | "IPC (Shared Memory, Semaphores, Message Queues)"
  | "System Calls"
  | "BGP / EVPN"
  | "Docker"
  | "GNS3"
  | "Subnetting & Routing"
  | "ICMP (Ping, Traceroute)"
  | "React"
  | "NestJS"
  | "PostgreSQL"
  | "Nginx"
  | "Tailwind CSS"
  | "Memory Management"
  | "Multithreading (pthreads)"
  | "Assembly (x86-64)"
  | "Git"
  | "Vue.js"
  | "FastAPI"
  | "Figma"
  | "Hostinger"
  | "Raspberry Pi"
  | "Sentry"
  | "Burp Suite"

interface ProjectOverride {
  htmlUrl: string
  tags: ProjectTag[]
  technologies?: Technology[]
}

export const projectOverrides: ProjectOverride[] = [
  {
    htmlUrl: "https://github.com/Skalyaev/a-portfolio",
    tags: ["web", "sysadmin"],
    technologies: ["Next.js", "React", "Tailwind CSS", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/inception-of-things",
    tags: ["sysadmin", "network"],
    technologies: ["Kubernetes (K3s)", "Vagrant", "Argo CD (GitOps)", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/boot2root",
    tags: ["cybersecurity", "network", "unix"],
    technologies: ["TCP/IP", "Port Scanning", "Binary Exploitation", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/override",
    tags: ["cybersecurity", "algorithms", "unix"],
    technologies: ["Reverse Engineering (ELF)", "Binary Exploitation", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/rainfall",
    tags: ["cybersecurity", "algorithms", "unix"],
    technologies: ["Reverse Engineering (ELF)", "Binary Exploitation", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/snow-crash",
    tags: ["cybersecurity", "unix", "algorithms"],
    technologies: ["Binary Exploitation", "Reverse Engineering (ELF)", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/vaccine",
    tags: ["cybersecurity", "web"],
    technologies: ["SQL Injection", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/inquisitor",
    tags: ["cybersecurity", "network"],
    technologies: ["ARP Spoofing (MITM)", "TCP/IP", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/iron_dome",
    tags: ["cybersecurity", "unix", "algorithms"],
    technologies: ["Malware Analysis", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/stockholm",
    tags: ["cybersecurity", "unix", "algorithms"],
    technologies: ["Malware Analysis", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/reverse_me",
    tags: ["cybersecurity", "algorithms", "unix"],
    technologies: ["Reverse Engineering (ELF)", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/ft_otp",
    tags: ["cybersecurity", "algorithms"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/arachnida",
    tags: ["cybersecurity", "web"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/lem-ipc",
    tags: ["unix"],
    technologies: [
      "IPC (Shared Memory, Semaphores, Message Queues)",
      "System Calls",
      "Git"
    ]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/badass",
    tags: ["network"],
    technologies: ["BGP / EVPN", "Docker", "GNS3", "TCP/IP", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/ft_nmap",
    tags: ["network", "cybersecurity"],
    technologies: [
      "Port Scanning",
      "TCP/IP",
      "Multithreading (pthreads)",
      "Git"
    ]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/net_practice",
    tags: ["network", "sysadmin"],
    technologies: ["Subnetting & Routing", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/ft_traceroute",
    tags: ["network"],
    technologies: ["ICMP (Ping, Traceroute)", "TCP/IP", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/ft_ping",
    tags: ["network"],
    technologies: ["ICMP (Ping, Traceroute)", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/ft_strace",
    tags: ["unix"],
    technologies: ["System Calls", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/ft_transcendence",
    tags: ["web"],
    technologies: ["React", "NestJS", "PostgreSQL", "Tailwind CSS", "Docker", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/webserv",
    tags: ["web", "network"],
    technologies: ["TCP/IP", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/inception",
    tags: ["sysadmin", "web"],
    technologies: ["Docker", "Nginx", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/ft_containers",
    tags: ["algorithms"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/cpp_modules",
    tags: ["algorithms"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/cub3d",
    tags: ["algorithms"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/minishell",
    tags: ["unix"],
    technologies: ["System Calls", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/philosophers",
    tags: ["algorithms"],
    technologies: ["Multithreading (pthreads)", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/pipex",
    tags: ["unix"],
    technologies: ["System Calls", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/push_swap",
    tags: ["algorithms"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/so_long",
    tags: ["algorithms"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/born2beroot",
    tags: ["sysadmin", "unix"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/ft_printf",
    tags: ["algorithms"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/get_next_line",
    tags: ["algorithms"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/libft",
    tags: ["algorithms"],
    technologies: ["Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/malloc",
    tags: ["unix", "algorithms"],
    technologies: ["Memory Management", "Git"]
  },
  {
    htmlUrl: "https://github.com/Skalyaev/libasm",
    tags: ["unix", "algorithms"],
    technologies: ["Assembly (x86-64)", "Git"]
  }
]
