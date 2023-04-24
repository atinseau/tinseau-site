import { GetServerSideProps } from "next";
import React from "react";
import Cars from "src/components/MyAccount/Cars";
import Wrapper from "src/components/Wrapper";

interface Props {
	serverParams: string[]
}

const CarsPage: NextPageWithLayout<Props> = ({ serverParams }) => <Cars serverParams={serverParams} />

CarsPage.getLayout = (page) => <Wrapper
	isAccount={true}
	title="Mes voitures"
>
	{page}
</Wrapper>

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			serverParams: context.params?.cars || []
		}
	}
}

export default CarsPage;