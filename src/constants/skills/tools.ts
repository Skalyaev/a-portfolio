import { Chart } from "@/components/svg/Chart"
import { Globe } from "@/components/svg/Globe"
import { Processor } from "@/components/svg/Processor"
import { Server } from "@/components/svg/Server"
import { Shield } from "@/components/svg/Shield"

import type { Technology } from "@/constants/github/projects"
import type { IconComponent } from "@/constants/icons"

export type SkillCategory =
  "web" | "devops" | "network" | "systems" | "security"

export const skillCategories: SkillCategory[] = [
  "web",
  "devops",
  "network",
  "systems",
  "security"
]

export const skillCategoryIcons: Record<SkillCategory, IconComponent> = {
  web: Globe,
  devops: Server,
  systems: Processor,
  network: Chart,
  security: Shield
}

export const skillDescriptionKeys: Record<Technology, string> = {
  "Next.js": "nextjs",
  "React": "react",
  "NestJS": "nestjs",
  "PostgreSQL": "postgresql",
  "Nginx": "nginx",
  "MariaDB": "mariadb",
  "Docker": "docker",
  "Kubernetes (K3s)": "kubernetes",
  "Vagrant": "vagrant",
  "Argo CD (GitOps)": "argocd",
  "Git": "git",
  "GNS3": "gns3",
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

export const skillsByCategory: Record<SkillCategory, Technology[]> = {
  web: ["React", "Next.js", "NestJS", "PostgreSQL", "Nginx", "MariaDB"],
  devops: [
    "Docker",
    "Kubernetes (K3s)",
    "Vagrant",
    "GNS3",
    "Git",
    "Argo CD (GitOps)"
  ],
  network: [
    "TCP/IP",
    "BGP / EVPN",
    "Subnetting & Routing",
    "ICMP (Ping, Traceroute)",
    "Port Scanning"
  ],
  systems: [
    "System Calls",
    "IPC (Shared Memory, Semaphores, Message Queues)",
    "Memory Management",
    "Multithreading (pthreads)",
    "Assembly (x86-64)"
  ],
  security: [
    "Reverse Engineering (ELF)",
    "Binary Exploitation",
    "SQL Injection",
    "ARP Spoofing (MITM)",
    "Malware Analysis"
  ]
}
