import { GetServerSideProps } from "next";
import React from "react";
import AccountWrapper from "src/components/MyAccount/AccountWrapper";
import Cars from "src/components/MyAccount/Cars";

interface Props {
	serverParams: string[]
}

const CarsPage: React.FC<Props> = ({ serverParams }) => {
	return <AccountWrapper title="Mes voitures">
		<Cars serverParams={serverParams}/>
	</AccountWrapper>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			serverParams: context.params?.cars || []
		}
	}
}

export default CarsPage;