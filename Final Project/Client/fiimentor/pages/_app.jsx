import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import swal from 'sweetalert2';
import {AppState} from '../main/store/AppState';


import { withStore } from '../main/components/withStore';
import { Context } from '../main/Context';
import { HttpApiService } from '../main/services/HttpApiService';


Context.initialize({
  alertService: swal,
  apiService: new HttpApiService(),
  routerService: Router,
});

interface State {
  authState: string;
}

class ReduxApp extends App<AppProps & { reduxStore: Store<AppState> }> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (ctx.res) {
      ctx.res.setHeader('Cache-Control', 'max-age=0');
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  state: State = {
    authState: '',
  };

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <Head>
          <title>Login</title>
        </Head>

      </Provider>
    );
  }
}

export default withStore(ReduxApp);
