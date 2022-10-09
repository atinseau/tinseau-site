import React from "react"
import { GetServerSideProps } from "next";
import AccountWrapper from "src/components/MyAccount/AccountWrapper";
import Decharges from "src/components/MyAccount/Decharges";

interface Props {
	serverQuery: Object
}

const Responsability: React.FC<Props> = ({ serverQuery }) => {
	return <AccountWrapper title="Mes décharges">
		<Decharges serverQuery={serverQuery}/>
	</AccountWrapper>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			serverQuery: context.query
		}
	}
}

export default Responsability;