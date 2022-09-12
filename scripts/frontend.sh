#/bin/bash

WORKDIR=/home/arthur/DEV/STRAPI/tinseau-site


function frontend () {
	cd "${WORKDIR}/frontend"
	yarn dev
}


frontend