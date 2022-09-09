import Head from "next/head";
import React from "react"
import Footer from "./Footer";
import Header from "./Header";

interface Props {
	children: React.ReactNode;
	title: string
}

const Wrapper: React.FC<Props> = ({ children, title }) => {
	return <>
		<Head>
			<title>{title}</title>
		</Head>
		<div className="page__wrapper">
			<Header />
			{children}
			<Footer />
		</div>
	</>
}

export default Wrapper;