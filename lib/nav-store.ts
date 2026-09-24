import { create } from "zustand"

const CLOSE_MS = 140

type NavState = {
  menuOpen: boolean
  mobileOpen: boolean
  scrolled: boolean
  openMenu: () => void
  scheduleCloseMenu: () => void
  closeMenu: () => void
  setMobileOpen: (open: boolean) => void
  closeAll: () => void
  setScrolled: (scrolled: boolean) => void
}

let closeTimer: ReturnType<typeof setTimeout> | null = null

function clearCloseTimer() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

export const useNavStore = create<NavState>((set) => ({
  menuOpen: false,
  mobileOpen: false,
  scrolled: false,
  openMenu: () => {
    clearCloseTimer()
    set({ menuOpen: true })
  },
  scheduleCloseMenu: () => {
    clearCloseTimer()
    closeTimer = setTimeout(() => {
      set({ menuOpen: false })
    }, CLOSE_MS)
  },
  closeMenu: () => {
    clearCloseTimer()
    set({ menuOpen: false })
  },
  setMobileOpen: (open) => {
    if (!open) {
      set({ mobileOpen: false })
      return
    }

    clearCloseTimer()
    set({ mobileOpen: true, menuOpen: false })
  },
  closeAll: () => {
    clearCloseTimer()
    set({ menuOpen: false, mobileOpen: false })
  },
  setScrolled: (scrolled) => {
    set((state) => (state.scrolled === scrolled ? state : { scrolled }))
  },
}))
