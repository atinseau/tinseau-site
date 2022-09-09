#/bin/bash

WORKDIR=/Users/arthur/Desktop/Dev/STRAPI/tinseau-site

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
