import gsap from "gsap"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef } from "react"
import useResize from "src/hooks/useResize"


const useOverlay = (isOpen: boolean, setIsOpen: (isOpen: boolean) => void) => {

  const menuRef = useRef<HTMLUListElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

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
      setIsOpen(false)
      document.onclick = null
    })
  }, [isOpen])

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

  }, [isOpen])

  useEffect(() => {
    if (isOpen) openMenu()
  }, [isOpen])

  useEffect(() => {
    router.events.on('routeChangeComplete', closeMenu)
    return () => router.events.off('routeChangeComplete', closeMenu)
  }, [router])

  // Watch width to close menu on resize
  useResize((width) => {
      console.log("salut")
      if (width > 1024)
        closeMenu()
  }, [isOpen], isOpen)

  return {
    overlayRef,
    menuRef,
    closeMenu
  }

}

export {
  useOverlay
}