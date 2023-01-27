import Wrapper from 'src/components/Wrapper'
import About from '../components/Home/About'
import Contact from '../components/Home/Contact'
import Galleries from '../components/Home/Galleries'
import NextEvent from '../components/Home/NextEvent'
import Services from '../components/Home/Services'

const Home: NextPageWithLayout = () => {
	return (
		<div className="home__page">
			<div className="hero__black">
				<NextEvent />
				<hr />
				<About />
			</div>

			<div className="hero__white">
				<Services />
			</div>

			<div className="hero__black">
				<Galleries />
				<Contact />
			</div>
		</div>
	)
}

Home.getLayout = (page) => <Wrapper title="Home page">
	{page}
</Wrapper>


export default Home
