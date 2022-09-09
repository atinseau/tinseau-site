#/bin/bash

WORKDIR=/home/arthur/DEV/STRAPI/tinseau-site

function backend () {
	cd "${WORKDIR}/backend"
	yarn develop
}

function frontend () {
	cd "${WORKDIR}/frontend"
	yarn dev
}

function stop() {
	echo "Stopping all processes"
	pkill -U $(jobs -p)
	exit 0
}

function loop () {
	trap 'stop' SIGINT
	clear
	echo "Press [CTRL+C] to stop.."
	
	(backend) &
	(frontend) &

	while true; do read; done
}


loop
