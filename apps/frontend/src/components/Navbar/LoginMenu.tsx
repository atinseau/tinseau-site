import { useAuthContext } from "src/hooks";
import AuthMenu from "./AuthMenu";
import MenuItem from "./MenuItem";
import MenuWrapper from "./MenuWrapper";


const LoginMenu = () => {

  const authCtx = useAuthContext()

  return !authCtx.isLoading ? <>
    <section className="right__menu">
      {!authCtx.user ? <MenuWrapper className="login__menu">
        <MenuItem onClick={() => authCtx.toggleLoginModal("login")} title="Login" />
        <MenuItem onClick={() => authCtx.toggleLoginModal("register")} title="Register" />
      </MenuWrapper> : <AuthMenu />}
    </section>
  </> : null
}

export default LoginMenu;