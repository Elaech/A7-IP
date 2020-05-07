import App, {AppContext, AppProps} from 'next/app';
import React from 'react'
import withReduxStore from '../main/WithReduxStore'
import {Provider} from 'react-redux'
import {Context} from '../main/Context';
import swal from 'sweetalert2';
import {HttpApiService} from '../main/services/HttpApiService';
import Router from 'next/router';
import {Store} from 'redux';
import type {AppState} from '../main/store/AppState';
import {TimeService} from '../main/services/TimeService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../main/global.css';
import Layout from '../main/components/Layout';
import {setUserTokenThunk} from '../main/store/User/setUserTokenThunk';
import {loginUserSuccessAction} from '../main/store/User/userActions';


Context.initialize({
    alertService: swal,
    apiService: new HttpApiService(),
    dateService: new TimeService(),
    routerService: Router,
});

interface State {
    userToken: string | null;
}

class FiiMentorApp extends App<AppProps & { reduxStore: Store<AppState> }, State> {

    constructor() {
        super();

        this.state = {
            userToken: null,
        };
    }

    static async getInitialProps({Component, ctx}: AppContext) {
        let pageProps = {};

        if (ctx.res) {
            ctx.res.setHeader('Cache-Control', 'max-age=0');
        }

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }

    componentDidMount() {
        const userFromSessionStorage = sessionStorage.getItem('userToken');

        if (!userFromSessionStorage && Context.routerService.pathname!=='/') {
           window.location.replace('/');
        }

        this.setState({userToken: userFromSessionStorage});
        this.props.reduxStore.dispatch(setUserTokenThunk(userFromSessionStorage));

    }

    componentDidUpdate() {
        const userFromSessionStorage = sessionStorage.getItem('userToken');

        if (!userFromSessionStorage && Context.routerService.pathname!=='/') {
            window.location.replace('/');
        }

        if(this.state.userToken !== userFromSessionStorage) {
            this.setState({userToken: userFromSessionStorage});
            this.props.reduxStore.dispatch(setUserTokenThunk(userFromSessionStorage));
        }
    }

    render() {
        const {Component, pageProps, reduxStore} = this.props;
        const {userToken} = this.state;


        return (
            <Provider store={reduxStore}>
                {(userToken && (<Layout>
                    <Component {...pageProps} />
                </Layout>))|| (<Component {...pageProps} />)
                }
            </Provider>
        )
    }
}

export default withReduxStore(FiiMentorApp)
