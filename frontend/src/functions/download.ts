


const download = (url: string, name: string, mode?: string) => {
	const a = document.createElement('a')
	a.href = url
	if (mode === "_blank")
		a.target = "_blank"
	else
		a.download = name
	a.click()
}

export {
	download
}