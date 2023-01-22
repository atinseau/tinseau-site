import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getEnvConfig } from "src/functions/getConfig";


const useSocket = () => {

	const [socket, setSocket] = useState<Socket | null>(null)
	const [online, setOnline] = useState(false)

	useEffect(() => {
		const socket = io(getEnvConfig().SERVER_ADDRESS);
		socket.on('connect', () => {
			console.log("Connected")
			setOnline(true)
		})
		setSocket(socket)
	}, [])

	return socket
}

export default useSocket;
