import { create } from "zustand"

const CLOSE_MS = 140

type NavState = {
  openGroupId: string | null
  mobileOpen: boolean
  mobileExpandedId: string | null
  scrolled: boolean
  openGroup: (id: string) => void
  scheduleCloseGroup: () => void
  closeGroup: () => void
  setMobileOpen: (open: boolean) => void
  toggleMobileGroup: (id: string) => void
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
  openGroupId: null,
  mobileOpen: false,
  mobileExpandedId: null,
  scrolled: false,
  openGroup: (id) => {
    clearCloseTimer()
    set({ openGroupId: id })
  },
  scheduleCloseGroup: () => {
    clearCloseTimer()
    closeTimer = setTimeout(() => {
      set({ openGroupId: null })
    }, CLOSE_MS)
  },
  closeGroup: () => {
    clearCloseTimer()
    set({ openGroupId: null })
  },
  setMobileOpen: (open) => {
    if (!open) {
      set({ mobileOpen: false, mobileExpandedId: null })
      return
    }

    clearCloseTimer()
    set({ mobileOpen: true, openGroupId: null })
  },
  toggleMobileGroup: (id) => {
    set((state) => ({
      mobileExpandedId: state.mobileExpandedId === id ? null : id,
    }))
  },
  closeAll: () => {
    clearCloseTimer()
    set({ openGroupId: null, mobileOpen: false, mobileExpandedId: null })
  },
  setScrolled: (scrolled) => {
    set((state) => (state.scrolled === scrolled ? state : { scrolled }))
  },
}))
