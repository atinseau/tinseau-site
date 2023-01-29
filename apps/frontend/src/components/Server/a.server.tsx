import { GetServerSidePropsContext } from "next"
import { useEffect } from "react"

import fs from "fs"


const A = () => {

  console.log("server side and client side")

  useEffect(() => {
    console.log("<")
    console.log(A.getServerSideProps)
  }, [])
  return <h1>salut</h1>
}

A.test = () => {
  
}

A.getServerSideProps = (context: GetServerSidePropsContext) => ({ 
  message: "salut", 
  test: () => {
    console.log(fs)
  }
})




export default A