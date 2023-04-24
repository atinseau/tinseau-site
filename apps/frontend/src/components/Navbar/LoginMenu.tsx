'use client';

import { memo, useMemo } from "react";
import { useAuthContext } from "src/hooks";
import AuthMenu from "./AuthMenu";
import MenuItem from "./MenuItem";
import MenuWrapper from "./MenuWrapper";

import type { AuthMode } from "src/contexts/AuthContext";


interface Props {
  closeMenu?: (isOpen: boolean) => void;
  isOpen?: boolean;
}



const LoginMenu: React.FC<Props> = ({ isOpen, closeMenu }) => {

  const authCtx = useAuthContext()

  const actions: { type: AuthMode, title: string }[] = useMemo(() => ([
    { type: "login", title: "Connexion" },
    { type: "register", title: "Inscription" }
  ]), [])

  return !authCtx.isLoading ? <>
    <section className="right__menu">
      {!authCtx.user ? <MenuWrapper className="login__menu">

        {actions.map(({ type, title }, i) => <MenuItem
          key={i}
          onClick={() => {
            authCtx.toggleLoginModal(type)
            closeMenu && isOpen && closeMenu(false)
          }}
          title={title}
        />)}
      </MenuWrapper> : <AuthMenu />}
    </section>
  </> : null
}

export default memo(LoginMenu);