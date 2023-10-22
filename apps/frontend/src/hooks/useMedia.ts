import { useState } from "react";
import useResize from "./useResize";


const useMedia = (query: string, deps: any[] = []) => {

  const [isMatching, setIsMatching] = useState(false);

  useResize(() => {
    const media = window.matchMedia(query);
    setIsMatching(media.matches);
  })

  return isMatching;
}

export default useMedia;