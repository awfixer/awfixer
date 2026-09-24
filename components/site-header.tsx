"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react"

import {
  isCurrentPath,
  menuIsCurrent,
  navMenu,
  subscribeLink,
  type NavItem,
} from "@/lib/nav"
import { useNavStore } from "@/lib/nav-store"
import { cn } from "@/lib/utils"

const enter = {
  duration: 0.5,
  ease: [0.215, 0.61, 0.355, 1] as const,
}

function NavAnchor({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem
  pathname: string
  onNavigate: () => void
}) {
  const current = isCurrentPath(item.href, pathname)
  const content = (
    <span className="nav-item-copy">
      <span className="nav-item-name">{item.name}</span>
      <span className="nav-item-desc">{item.description}</span>
    </span>
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

function SubscribeLink({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a
      href={subscribeLink.href}
      className="button primary-fill"
      target={subscribeLink.external ? "_blank" : undefined}
      rel={subscribeLink.external ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
    >
      {subscribeLink.name}
    </a>
  )
}

function NavMenu() {
  const pathname = usePathname()
  const menuOpen = useNavStore((state) => state.menuOpen)
  const openMenu = useNavStore((state) => state.openMenu)
  const scheduleCloseMenu = useNavStore((state) => state.scheduleCloseMenu)
  const closeMenu = useNavStore((state) => state.closeMenu)
  const reduced = useReducedMotion()
  const pointerType = useRef("mouse")
  const current = menuIsCurrent(navMenu, pathname)
  const panelId = `nav-panel-${navMenu.id}`

  return (
    <motion.div
      className="nav-group"
      onPointerEnter={(event) => {
        pointerType.current = event.pointerType

        if (event.pointerType === "touch") {
          return
        }

        openMenu()
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") {
          return
        }

        scheduleCloseMenu()
      }}
      onFocus={() => openMenu()}
      onBlur={(event) => {
        const next = event.relatedTarget

        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          scheduleCloseMenu()
        }
      }}
    >
      <button
        type="button"
        className="nav-trigger"
        aria-expanded={menuOpen}
        aria-controls={panelId}
        onClick={(event) => {
          const fromKeyboard = event.detail === 0

          if (!fromKeyboard && pointerType.current !== "touch") {
            openMenu()
            return
          }

          if (menuOpen) {
            closeMenu()
            return
          }

          openMenu()
        }}
      >
        <span
          className="hover-underline"
          data-open={menuOpen || current ? "true" : "false"}
        >
          {navMenu.name}
        </span>
        <ChevronDown aria-hidden />
      </button>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id={panelId}
            className="nav-panel"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 8 }}
            transition={enter}
          >
            <motion.div className="nav-panel-card">
              <ul className="nav-panel-list">
                {navMenu.items.map((item, index) => (
                  <motion.li
                    key={item.id}
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
                      onNavigate={closeMenu}
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
  const setMobileOpen = useNavStore((state) => state.setMobileOpen)

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
        <p className="nav-kicker">{navMenu.name}</p>
        <ul className="nav-mobile-list">
          {navMenu.items.map((item) => (
            <li key={item.id}>
              <NavAnchor
                item={item}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div className="nav-dialog-foot">
        <SubscribeLink onNavigate={() => setMobileOpen(false)} />
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
  const closeMenu = useNavStore((state) => state.closeMenu)
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
        closeMenu()
      }
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target

      if (!(target instanceof Element) || target.closest(".nav-group")) {
        return
      }

      closeMenu()
    }

    window.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointerDown)

    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [closeMenu])

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
            <NavMenu />
          </nav>
          <motion.div className="site-header-actions">
            <SubscribeLink />
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
