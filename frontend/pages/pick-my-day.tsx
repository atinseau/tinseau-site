import Wrapper from "../components/Wrapper"

import Welcome from "../components/PickMyDay/components/Welcome";
import Configurator from "../components/PickMyDay/components/Configurator";
import useConfiguratorAnimation from "../components/PickMyDay/hooks/useConfiguratorAnimation";

const GetMyDay = () => {

	const { isWelcome, configuratorRef, welcomeRef, goToConfigurator } = useConfiguratorAnimation(false)

	return <Wrapper title="Choisir ma journée">
		<div className="pick__my__day">
			{isWelcome && <Welcome ref={welcomeRef} goToConfigurator={goToConfigurator}/>}
			<Configurator ref={configuratorRef} isOnScreen={!isWelcome}/>
		</div>		
	</Wrapper>
}

export default GetMyDay;