"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  ChevronDown,
  Flag,
  Info,
  Landmark,
  Menu,
  Newspaper,
  Shield,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react"
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react"

import {
  ctaLink,
  groupIsCurrent,
  isCurrentPath,
  navGroups,
  type NavChild,
  type NavGroup,
  type NavIconName,
} from "@/lib/nav"
import { useNavStore } from "@/lib/nav-store"
import { cn } from "@/lib/utils"

const icons: Record<NavIconName, LucideIcon> = {
  BookOpen,
  Newspaper,
  Terminal,
  Info,
  Shield,
  Flag,
  Landmark,
}

const enter = {
  duration: 0.5,
  ease: [0.215, 0.61, 0.355, 1] as const,
}

function NavIcon({ name }: { name: NavIconName }) {
  const Icon = icons[name]

  return <Icon aria-hidden size={16} />
}

function NavAnchor({
  item,
  pathname,
  onNavigate,
}: {
  item: NavChild
  pathname: string
  onNavigate: () => void
}) {
  const current = isCurrentPath(item.href, pathname)
  const content = (
    <>
      <span className="nav-item-icon">
        <NavIcon name={item.icon} />
      </span>
      <span className="nav-item-copy">
        <span className="nav-item-name">{item.name}</span>
        <span className="nav-item-desc">{item.description}</span>
      </span>
    </>
  )

  if (item.external) {
    return (
      <a
        href={item.href}
        className="nav-item-link"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      href={item.href}
      className="nav-item-link"
      aria-current={current ? "page" : undefined}
      data-current={current ? "true" : undefined}
      onClick={onNavigate}
    >
      {content}
    </Link>
  )
}

function NavGroupMenu({ group }: { group: NavGroup }) {
  const pathname = usePathname()
  const openGroupId = useNavStore((state) => state.openGroupId)
  const openGroup = useNavStore((state) => state.openGroup)
  const scheduleCloseGroup = useNavStore((state) => state.scheduleCloseGroup)
  const closeGroup = useNavStore((state) => state.closeGroup)
  const reduced = useReducedMotion()
  const pointerType = useRef("mouse")
  const isOpen = openGroupId === group.id
  const current = groupIsCurrent(group, pathname)
  const panelId = `nav-panel-${group.id}`

  return (
    <motion.div
      className="nav-group"
      onPointerEnter={(event) => {
        pointerType.current = event.pointerType

        if (event.pointerType === "touch") {
          return
        }

        openGroup(group.id)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") {
          return
        }

        scheduleCloseGroup()
      }}
      onFocus={() => openGroup(group.id)}
      onBlur={(event) => {
        const next = event.relatedTarget

        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          scheduleCloseGroup()
        }
      }}
    >
      <button
        type="button"
        className="nav-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={(event) => {
          const fromKeyboard = event.detail === 0

          if (!fromKeyboard && pointerType.current !== "touch") {
            openGroup(group.id)
            return
          }

          if (isOpen) {
            closeGroup()
            return
          }

          openGroup(group.id)
        }}
      >
        <span
          className="hover-underline"
          data-open={isOpen || current ? "true" : "false"}
        >
          {group.name}
        </span>
        <ChevronDown aria-hidden />
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id={panelId}
            className="nav-panel"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 8 }}
            transition={enter}
          >
            <motion.div className="nav-panel-card">
              <motion.div className="nav-panel-intro">
                <p className="nav-kicker">{group.name}</p>
                <p className="nav-item-desc">{group.description}</p>
              </motion.div>
              <ul className="nav-panel-list">
                {group.children.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...enter,
                      delay: reduced ? 0 : Math.min(index * 0.028, 0.2),
                    }}
                  >
                    <NavAnchor
                      item={item}
                      pathname={pathname}
                      onNavigate={closeGroup}
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

function MobileNav() {
  const pathname = usePathname()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const mobileOpen = useNavStore((state) => state.mobileOpen)
  const mobileExpandedId = useNavStore((state) => state.mobileExpandedId)
  const setMobileOpen = useNavStore((state) => state.setMobileOpen)
  const toggleMobileGroup = useNavStore((state) => state.toggleMobileGroup)
  const reduced = useReducedMotion()

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (mobileOpen && !dialog.open) {
      dialog.showModal()
    }

    if (!mobileOpen && dialog.open) {
      dialog.close()
    }
  }, [mobileOpen])

  return (
    <dialog
      ref={dialogRef}
      id="nav-dialog"
      className="nav-dialog"
      aria-label="Menu"
      onClose={() => setMobileOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setMobileOpen(false)
        }
      }}
    >
      <motion.div className="nav-dialog-bar">
        <Link
          href="/"
          className="site-wordmark"
          onClick={() => setMobileOpen(false)}
        >
          awfixer
        </Link>
        <button
          type="button"
          className="mnav-toggle"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        >
          <X aria-hidden size={20} />
        </button>
      </motion.div>
      <motion.div className="nav-dialog-body">
        {navGroups.map((group) => {
          const expanded = mobileExpandedId === group.id
          const panelId = `mobile-panel-${group.id}`

          return (
            <motion.div key={group.id} className="nav-mobile-group">
              <button
                type="button"
                className="nav-mobile-trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggleMobileGroup(group.id)}
              >
                <span className="nav-mobile-title">{group.name}</span>
                <ChevronDown
                  aria-hidden
                  data-open={expanded ? "true" : "false"}
                />
              </button>
              <AnimatePresence>
                {expanded ? (
                  <motion.div
                    id={panelId}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: 8 }}
                    transition={enter}
                  >
                    <p className="nav-kicker">{group.description}</p>
                    <ul className="nav-mobile-list">
                      {group.children.map((item) => (
                        <li key={item.href}>
                          <NavAnchor
                            item={item}
                            pathname={pathname}
                            onNavigate={() => setMobileOpen(false)}
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
      <motion.div className="nav-dialog-foot">
        <a
          href={ctaLink.href}
          className="button primary-fill"
          onClick={() => setMobileOpen(false)}
        >
          {ctaLink.name}
        </a>
      </motion.div>
    </dialog>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const scrolled = useNavStore((state) => state.scrolled)
  const mobileOpen = useNavStore((state) => state.mobileOpen)
  const setScrolled = useNavStore((state) => state.setScrolled)
  const setMobileOpen = useNavStore((state) => state.setMobileOpen)
  const closeGroup = useNavStore((state) => state.closeGroup)
  const closeAll = useNavStore((state) => state.closeAll)

  useEffect(() => {
    closeAll()
  }, [pathname, closeAll])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [setScrolled])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeGroup()
      }
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target

      if (!(target instanceof Element) || target.closest(".nav-group")) {
        return
      }

      closeGroup()
    }

    window.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointerDown)

    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [closeGroup])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")

    function onChange() {
      if (media.matches) {
        setMobileOpen(false)
      }
    }

    media.addEventListener("change", onChange)

    return () => media.removeEventListener("change", onChange)
  }, [setMobileOpen])

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={cn("site-header", (scrolled || mobileOpen) && "is-solid")}
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <motion.div className="wide-container site-header-bar">
          <Link href="/" className="site-wordmark" onClick={closeAll}>
            awfixer
          </Link>
          <nav className="site-nav-desktop" aria-label="Primary">
            {navGroups.map((group) => (
              <NavGroupMenu key={group.id} group={group} />
            ))}
          </nav>
          <motion.div className="site-header-actions">
            <a href={ctaLink.href} className="button primary-fill">
              {ctaLink.name}
            </a>
            <button
              type="button"
              className="mnav-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="nav-dialog"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu aria-hidden size={20} />
            </button>
          </motion.div>
        </motion.div>
        <MobileNav />
      </header>
    </MotionConfig>
  )
}
