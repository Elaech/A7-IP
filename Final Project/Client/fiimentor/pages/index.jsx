import Head from 'next/head'
import React from 'react'
import LoginFormLayout from '../main/components/LoginFormLayout/LoginFormLayout'
const Home = () => (
  <>
  <Head>
  <title>FIIMentor</title>
  <link rel="stylesheet" href="../main/components/LoginFormLayout/LoginPageLayout.css"/>
		</Head>
  <LoginFormLayout />
	</>
);
export default Home