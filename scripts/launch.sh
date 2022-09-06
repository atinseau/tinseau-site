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

(backend) &
(frontend) &
