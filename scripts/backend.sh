#/bin/bash

source ./variables.sh


function backend () {
	cd "${WORKDIR}/backend"
	yarn dev
}


backend
