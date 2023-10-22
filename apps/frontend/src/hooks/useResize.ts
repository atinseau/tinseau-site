import { useEffect } from "react"
import useMounted from "./useMounted"


const useResize = (onResize: (width: number, heigth: number) => void, deps: any[] = [], conditionnalAttach?: boolean) => {
  useMounted(() => {

    onResize(window.innerWidth, window.innerHeight)

    const handleResize = () => onResize(window.innerWidth, window.innerHeight)
    if (typeof conditionnalAttach === "undefined" || (typeof conditionnalAttach !== "undefined" && conditionnalAttach))
      window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, deps)
}

export default useResize;