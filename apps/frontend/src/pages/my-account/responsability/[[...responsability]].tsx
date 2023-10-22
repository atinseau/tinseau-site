import React from "react"
import { GetServerSideProps } from "next";
import Decharges from "src/components/MyAccount/Decharges";
import Wrapper from "src/components/Wrapper";

interface Props {
	serverParams: string[]
}

const Responsability: NextPageWithLayout<Props> = ({ serverParams }) => <Decharges serverParams={serverParams} />

Responsability.getLayout = (page) => <Wrapper
	isAccount={true}
	title="Mes décharges">
	{page}
</Wrapper>

export const getServerSideProps: GetServerSideProps = async (context) => {

	console.log(context.params)

	return {
		props: {
			serverParams: context.params?.responsability || []
		}
	}
}

export default Responsability;