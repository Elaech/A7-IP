import App from 'next/app'
import React from 'react'
import withReduxStore from '../main/WithReduxStore'
import { Provider } from 'react-redux'
import {Context} from '../main/Context';
import swal from "sweetalert2";
import {HttpApiService} from '../main/services/HttpApiService';
import Router from 'next/router';


Context.initialize({
    alertService: swal,
    apiService: new HttpApiService(),
    routerService: Router,
});

  class FiiMentorApp extends App {

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
