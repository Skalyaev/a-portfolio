interface NavItem {
  href: string
  labelKey: string
}

export const navItems: NavItem[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/skills", labelKey: "nav.skills" },
  { href: "/experience", labelKey: "nav.experience" },
  { href: "/education", labelKey: "nav.education" },
  { href: "/contact", labelKey: "nav.contact" }
]
