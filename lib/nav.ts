import navFile from "./nav.json"

export type NavItem = {
  id: string
  name: string
  description: string
  href: string
  external: boolean
}

export type NavMenu = {
  id: string
  name: string
  items: NavItem[]
}

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://")
}

function menuName(id: string) {
  return id.charAt(0).toUpperCase() + id.slice(1)
}

export const subscribeLink = {
  name: "Subscribe",
  href: navFile.subscribe,
  external: isExternal(navFile.subscribe),
}

export const navMenu: NavMenu = {
  id: "info",
  name: menuName("info"),
  items: Object.entries(navFile.info).map(([id, item]) => ({
    id,
    name: item.name,
    description: item.description,
    href: item.link,
    external: isExternal(item.link),
  })),
}

export function isCurrentPath(href: string, pathname: string) {
  if (isExternal(href)) {
    return false
  }

  const path = href.split("#")[0] || "/"

  if (path === "/") {
    return pathname === "/"
  }

  return pathname === path || pathname.startsWith(`${path}/`)
}

export function menuIsCurrent(menu: NavMenu, pathname: string) {
  return menu.items.some((item) => isCurrentPath(item.href, pathname))
}
