import { NextComponentType, NextPage } from "next"
import type { AppProps } from "next/app"

declare global {

  type WithLayout = {
    getLayout?: (page: ReactNode) => ReactNode
  }

  type AppPropsWithLayout = AppProps & {
    Component: NextComponentType & WithLayout
  }

  type NextPageWithLayout<T = any> = NextPage<T> & WithLayout
}

export {}