import Wrapper from "../components/Wrapper"

import Welcome from "../components/PickMyDay/components/Welcome";
import Configurator from "../components/PickMyDay/components/Configurator";
import useConfiguratorAnimation from "../components/PickMyDay/hooks/useConfiguratorAnimation";

const GetMyDay: NextPageWithLayout = () => {

	const { isWelcome, isLast, isConfigurator, mainRef, nextRef, goToNext } = useConfiguratorAnimation()

	return <div className="pick__my__day">
		{isWelcome && <Welcome
			ref={mainRef}
			goToNext={goToNext}
		/>}
		<Configurator ref={nextRef} isOnScreen={!isWelcome} />
	</div>
}

GetMyDay.getLayout = (page) => <Wrapper title="Choisir ma journée">
	{page}
</Wrapper>

export default GetMyDay;