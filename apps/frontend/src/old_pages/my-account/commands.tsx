import Wrapper from "src/components/Wrapper";

const MyCommands: NextPageWithLayout = () => <h1>Commands !</h1>

MyCommands.getLayout = (page) => <Wrapper
  isAccount={true}
  title="Mes Commandes">
  {page}
</Wrapper>

export default MyCommands;