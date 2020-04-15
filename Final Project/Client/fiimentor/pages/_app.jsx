import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initializeStore } from '../main/store/store';
import {Context} from '../main/Context';
import swal from "sweetalert2";
import {HttpApiService} from '../main/services/HttpApiService';
import Router from 'next/router';


Context.initialize({
    alertService: swal,
    apiService: new HttpApiService(),
    routerService: Router,
});

export default withRedux(initializeStore)(
  class FiiMentorApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
      );
    }
  }
);
