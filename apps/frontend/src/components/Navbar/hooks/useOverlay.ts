import gsap from "gsap"
import { ForwardedRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"

export interface MenuRef {
  toggle: () => void
  open: boolean
}

const useOverlay = (ref: ForwardedRef<MenuRef>) => {

  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback(() => {
    const tl = gsap.timeline()

    tl.to(overlayRef.current, {
      duration: 0.3,
      animation: "ease-in",
      opacity: 0
    })

    tl.to(menuRef.current, {
      duration: 0.3,
      animation: "ease-in",
      left: -400
    }, "-=0.3")

    tl.play().eventCallback('onComplete', () => {
      setOpen(false)
      document.onclick = null
    })
  }, [open])

  const openMenu = useCallback(() => {

    const tl = gsap.timeline()

    tl.to(overlayRef.current, {
      duration: 0.3,
      animation: "ease-in",
      opacity: 0.5
    })

    tl.to(menuRef.current, {
      duration: 0.3,
      animation: "ease-in",
      left: 0
    })

    tl.play().eventCallback('onComplete', () => {
      document.onclick = (e) => {
        const clientRect = menuRef.current?.getBoundingClientRect()
        if (!clientRect)
          return
        const { left, width } = clientRect
        if (e.clientX < left || e.clientX > left + width)
          closeMenu()
      }
    })

  }, [open])

  useImperativeHandle(ref, () => ({
    toggle: () => open ? closeMenu() : setOpen(true),
    open: open
  }), [{}])

  useEffect(() => {
    if (open) openMenu()
  }, [open])

  return {
    open,
    overlayRef,
    menuRef,
    closeMenu
  }

}

export {
  useOverlay
}