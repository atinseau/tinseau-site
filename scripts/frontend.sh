#/bin/bash

source ./variables.sh

function frontend () {
	cd "${WORKDIR}/frontend"
	yarn dev
}


frontend