import Head from 'next/head'
import React from 'react';
import LoginPageLayout from '../main/components/LoginPageLayout/LoginPageLayout';
import AfterRegistrationForm from '../main/components/FormAfterRegistration/FormAfterRegistration';
const Home = () => (
  <>
    <Head>
      <title>FIIMentor</title>
    </Head>
    <AfterRegistrationForm/>
  </>
);
export default Home
