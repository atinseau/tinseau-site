import Wrapper from "../components/Wrapper"

import Welcome from "../components/PickMyDay/components/Welcome";
import Configurator from "../components/PickMyDay/components/Configurator";
import useConfiguratorAnimation from "../components/PickMyDay/hooks/useConfiguratorAnimation";

const GetMyDay = () => {

	const { isWelcome, isLast, isConfigurator, mainRef, nextRef, goToNext } = useConfiguratorAnimation()

	return <Wrapper title="Choisir ma journée">
		<div className="pick__my__day">
			{isWelcome && <Welcome
				ref={mainRef}
				goToNext={goToNext}
			/>}
			<Configurator ref={nextRef} isOnScreen={!isWelcome} />
		</div>
	</Wrapper>
}

export default GetMyDay;