import { Globe } from "@/components/svg/Globe"
import { Server } from "@/components/svg/Server"
import { Processor } from "@/components/svg/Processor"
import { Chart } from "@/components/svg/Chart"
import { Shield } from "@/components/svg/Shield"

import type { ComponentType } from "react"

export type SkillCategory =
  "web" | "devops" | "systems" | "network" | "security"

export const skillCategories: SkillCategory[] = [
  "web",
  "devops",
  "systems",
  "network",
  "security"
]

type SkillCategoryIcon = ComponentType<{
  className?: string
  width?: number | string
  height?: number | string
  fill?: boolean
}>

export const skillCategoryIcons: Record<SkillCategory, SkillCategoryIcon> = {
  web: Globe,
  devops: Server,
  systems: Processor,
  network: Chart,
  security: Shield
}

export const skillDescriptionKeys: Record<string, string> = {
  "Next.js": "nextjs",
  React: "react",
  NestJS: "nestjs",
  PostgreSQL: "postgresql",
  Nginx: "nginx",
  MariaDB: "mariadb",
  Docker: "docker",
  "Kubernetes (K3s)": "kubernetes",
  Vagrant: "vagrant",
  "Argo CD (GitOps)": "argocd",
  Git: "git",
  GNS3: "gns3",
  "System Calls": "systemCalls",
  "IPC (Shared Memory, Semaphores, Message Queues)": "ipc",
  "Memory Management": "memoryManagement",
  "Multithreading (pthreads)": "multithreading",
  "Assembly (x86-64)": "assembly",
  "TCP/IP": "tcpIp",
  "BGP / EVPN": "bgpEvpn",
  "Subnetting & Routing": "subnetting",
  "ICMP (Ping, Traceroute)": "icmp",
  "Port Scanning": "portScanning",
  "Reverse Engineering (ELF)": "reverseEngineering",
  "Binary Exploitation": "binaryExploitation",
  "SQL Injection": "sqlInjection",
  "ARP Spoofing (MITM)": "arpSpoofing",
  "Malware Analysis": "malwareAnalysis"
}

export const skillsByCategory: Record<SkillCategory, string[]> = {
  web: ["Next.js", "React", "NestJS", "PostgreSQL", "Nginx", "MariaDB"],
  devops: [
    "Docker",
    "Kubernetes (K3s)",
    "Vagrant",
    "Argo CD (GitOps)",
    "Git",
    "GNS3"
  ],
  systems: [
    "System Calls",
    "IPC (Shared Memory, Semaphores, Message Queues)",
    "Memory Management",
    "Multithreading (pthreads)",
    "Assembly (x86-64)"
  ],
  network: [
    "TCP/IP",
    "BGP / EVPN",
    "Subnetting & Routing",
    "ICMP (Ping, Traceroute)",
    "Port Scanning"
  ],
  security: [
    "Reverse Engineering (ELF)",
    "Binary Exploitation",
    "SQL Injection",
    "ARP Spoofing (MITM)",
    "Malware Analysis"
  ]
}
