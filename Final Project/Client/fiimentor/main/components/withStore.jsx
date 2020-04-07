import { NextPageContext } from 'next';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import React from 'react';
import { Store } from 'redux';

import { AppState } from '../store/AppState';
import { initializeStore } from '../store/store';


  interface Window extends window{
    __NEXT_REDUX_STORE__?: Store<AppState>;
  }


const isServer = typeof window === 'undefined';

function getOrCreateStore(initialState?: AppState): Store<AppState> {
  if (isServer) {
    return initializeStore(initialState);
  }

  if (!window.__NEXT_REDUX_STORE__) {
    window.__NEXT_REDUX_STORE__ = initializeStore(initialState);
  }

  return window.__NEXT_REDUX_STORE__;
}

export type AppContextWithRedux = AppContext & {
  ctx: NextPageContext & { reduxStore: Store<AppState> };
};

export const withStore = (
  Comp: React.ComponentType<AppProps & { reduxStore: Store<AppState> }>,
) =>
  class WithRedux extends App<AppProps & { reduxStore: Store<AppState> }> {
    static async getInitialProps(
      appContext: AppContext,
    ): Promise<AppInitialProps & { initialReduxState: AppState }> {
      const reduxStore = getOrCreateStore();

      const appContextWithRedux: AppContextWithRedux = appContext as AppContextWithRedux;

      appContextWithRedux.ctx.reduxStore = reduxStore;

      let appProps: AppInitialProps;

      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContextWithRedux);

        return {
          ...appProps,
          initialReduxState: reduxStore.getState(),
        };
      }

      return {
        pageProps: undefined,
        initialReduxState: reduxStore.getState(),
      };
    }

    reduxStore: Store<AppState>;

    constructor(
      props: AppProps & {
        reduxStore: Store<AppState>;
        initialReduxState: AppState;
      },
    ) {
      super(props);

      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <Comp {...this.props} reduxStore={this.reduxStore} />;
    }
  };
