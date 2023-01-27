import gsap from "gsap"
import { useCallback, useEffect, useRef } from "react"


const useOverlay = (isOpen: boolean, setIsOpen: (isOpen: boolean) => void) => {

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
    
  }, [])

  return {
    overlayRef,
    menuRef,
    closeMenu
  }

}

export {
  useOverlay
}