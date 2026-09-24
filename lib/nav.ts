export type NavIconName =
  | "BookOpen"
  | "Newspaper"
  | "Terminal"
  | "Info"
  | "Shield"
  | "Flag"
  | "Landmark"

export type NavChild = {
  name: string
  href: string
  description: string
  external?: boolean
  icon: NavIconName
}

export type NavGroup = {
  id: string
  name: string
  /** Hub path. Omit when the trigger only opens the menu. */
  href?: string
  description: string
  children: NavChild[]
}

/**
 * Same grouped shape as the church header (the nav the party bar was
 * copied from). Destinations are this site's arms, not church routes.
 */
export const navGroups: NavGroup[] = [
  {
    id: "writing",
    name: "Writing",
    description: "Essays, the build log, and the site they live on",
    children: [
      {
        name: "The Autist",
        href: "https://theautist.me",
        description: "The editorial site",
        external: true,
        icon: "BookOpen",
      },
      {
        name: "Journal",
        href: "https://theautist.me/blog",
        description: "Essays and notes",
        external: true,
        icon: "Newspaper",
      },
      {
        name: "build",
        href: "https://theautist.me/build",
        description: "Linux terminal agent",
        external: true,
        icon: "Terminal",
      },
      {
        name: "About",
        href: "https://theautist.me/about",
        description: "Who writes this",
        external: true,
        icon: "Info",
      },
    ],
  },
  {
    id: "divisions",
    name: "Divisions",
    description: "The arms of the work",
    children: [
      {
        name: "Army",
        href: "https://awfixer.army",
        description: "The operational arm",
        external: true,
        icon: "Shield",
      },
      {
        name: "Party",
        href: "https://awfixer.party",
        description: "Civic organization",
        external: true,
        icon: "Flag",
      },
      {
        name: "Church",
        href: "https://awfixer.church",
        description: "The question and the teachings",
        external: true,
        icon: "Landmark",
      },
    ],
  },
]

export const ctaLink = {
  name: "Subscribe",
  href: "/#newsletter",
} as const

export function isCurrentPath(href: string, pathname: string) {
  if (href.startsWith("http")) {
    return false
  }

  const path = href.split("#")[0] || "/"

  if (path === "/") {
    return pathname === "/"
  }

  return pathname === path || pathname.startsWith(`${path}/`)
}

export function groupIsCurrent(group: NavGroup, pathname: string) {
  if (group.href && isCurrentPath(group.href, pathname)) {
    return true
  }

  return group.children.some((child) => isCurrentPath(child.href, pathname))
}
