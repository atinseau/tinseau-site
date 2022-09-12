#/bin/bash

WORKDIR=/home/arthur/DEV/STRAPI/tinseau-site


function backend () {
	cd "${WORKDIR}/backend"
	yarn develop
}


backend