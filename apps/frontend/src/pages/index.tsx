import type { GetServerSidePropsContext, NextPage } from 'next'
import About from '../components/Home/About'
import Contact from '../components/Home/Contact'
import Galleries from '../components/Home/Galleries'
import NextEvent from '../components/Home/NextEvent'
import Services from '../components/Home/Services'
import Wrapper from '../components/Wrapper'

const Home: NextPage = () => {
	return (<Wrapper title="Home page">
		<div className="home__page">
			<div className="hero__black">
				<NextEvent />
				<hr/>
				<About />
			</div>

			<div className="hero__white">
				<Services/>
			</div>

			<div className="hero__black">
				<Galleries/>
				<Contact/>
			</div>
		</div>
	</Wrapper>)
}

export default Home
