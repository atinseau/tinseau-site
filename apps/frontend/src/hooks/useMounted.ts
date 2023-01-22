import { useEffect } from "react";

const useMounted = <T extends React.EffectCallback>(fn: T) => {
	useEffect(fn as any, [])
}

export default useMounted;