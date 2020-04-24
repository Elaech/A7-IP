import App, { AppContext, AppProps } from 'next/app';
import React from 'react'
import withReduxStore from '../main/WithReduxStore'
import { Provider } from 'react-redux'
import {Context} from '../main/Context';
import swal from "sweetalert2";
import {HttpApiService} from '../main/services/HttpApiService';
import Router from 'next/router';
import { Store } from 'redux';
import type {AppState} from '../main/store/AppState';


Context.initialize({
    alertService: swal,
    apiService: new HttpApiService(),
    routerService: Router,
});

  class FiiMentorApp extends App<AppProps & { reduxStore: Store<AppState> }> {
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

      render() {
          const { Component, pageProps, reduxStore } = this.props;
          return (
                  <Provider store={reduxStore}>
                      <Component {...pageProps} />
                  </Provider>
          )
      }
  }

export default withReduxStore(FiiMentorApp)
