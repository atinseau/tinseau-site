import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";

const dynamicServerComponent = <T extends Function>(importFunction: T) => {

  const Component = dynamic(importFunction)
  const functions = importFunction();

  return {
    Component,
    functions
  };
}

const A = dynamicServerComponent(() => import('../components/Server/a.server'))


const Test = () => {

  const { Component, functions } = A;

  return (
    <div className="text-white">
      <Component/>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

  const { Component, functions } = A;

  const rawComponent = (await functions).default;

  console.log(rawComponent.getServerSideProps())

  return {
    props: {}
  }

}

export default Test;