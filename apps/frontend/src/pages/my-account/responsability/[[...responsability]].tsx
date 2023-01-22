import React from "react"
import { GetServerSideProps } from "next";
import AccountWrapper from "src/components/MyAccount/AccountWrapper";
import Decharges from "src/components/MyAccount/Decharges";

interface Props {
	serverParams: string[]
}

const Responsability: React.FC<Props> = ({ serverParams }) => {
	return <AccountWrapper title="Mes décharges">
		<Decharges serverParams={serverParams}/>
	</AccountWrapper>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			serverParams: context.params?.responsability || []
		}
	}
}

export default Responsability;