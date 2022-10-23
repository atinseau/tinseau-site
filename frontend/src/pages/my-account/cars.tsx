import { GetServerSideProps } from "next";
import React from "react";
import AccountWrapper from "src/components/MyAccount/AccountWrapper";
import Cars from "src/components/MyAccount/Cars";

interface Props {
	serverQuery: Object
}

const CarsPage: React.FC<Props> = ({ serverQuery }) => {
	return <AccountWrapper title="Mes voitures">
		<Cars serverQuery={serverQuery}/>
	</AccountWrapper>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			serverQuery: context.query
		}
	}
}

export default CarsPage;