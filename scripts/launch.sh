#/bin/bash

source ./variables.sh

function stop() {
	echo "Stopping all processes"
	pkill -U $(jobs -p)
	exit 0
}

function loop () {
	trap 'stop' SIGINT
	clear
	echo "Press [CTRL+C] to stop.."
	
	pwd

	${WORKDIR}/scripts/backend.sh &
	${WORKDIR}/scripts/frontend.sh &

	while true; do read; done
}


loop
