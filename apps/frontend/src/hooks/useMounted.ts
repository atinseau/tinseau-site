import { useEffect } from "react";

const useMounted = <T extends React.EffectCallback>(fn: T, deps: string[] = []) => {
	useEffect(fn as any, deps)
}

export default useMounted;