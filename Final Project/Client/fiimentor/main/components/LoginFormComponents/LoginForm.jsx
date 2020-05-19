import React from 'react';
import {Field, Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import {Button, Link} from '@material-ui/core';
import {User} from '../../core/domain/User.js';
import {TextInput} from '../Generics/TextInput';
import {PasswordInput} from '../Generics/PasswordInput';
import type {UserState} from '../../store/User/userReducer';
import type {LoginUserRequest} from '../../core/services/ApiService';
import type {AppState} from '../../store/AppState';
import {loginUserThunk} from '../../store/User/loginUserThunk';
import {connect} from 'react-redux';

import {buttonStyles, FormGroup, LoginFormContainer, TitleContainer} from './LoginFormStyles';


interface LoginFormValues {
    username: string;
    password: string;
}

interface StateProps {
    User: UserState;
}

interface DispatchProps {
    loginUser(user: LoginUserRequest): void;
}

interface State {
    isRegisterModalOpen: boolean;
}

type Props = StateProps & DispatchProps;

const initialValues: LoginFormValues = {
    username: '',
    password: ''
};

const validationSchema: Yup.Schema<LoginFormValues> = Yup.object()
    .shape({
        username: Yup.string()
            .min(User.usernameConstraint.min,
                `Numele utilizatorului trebuie sa aiba cel putin ${User.usernameConstraint.min} caractere`
            )
            .max(User.usernameConstraint.max,
                `Numele utilizatorului trebuie sa aiba cel mult ${User.usernameConstraint.max} caractere`
            )
            .required('Acest camp nu poate fi gol'),

        password: Yup.string()
            .min(User.passwordConstraint.min, `Parola trebuie sa aiba cel putin ${User.passwordConstraint.min} caractere`)
            .max(User.passwordConstraint.max, `Parola trebuie sa aiba cel mult ${User.passwordConstraint.max} caractere`)
            .required('Acest camp nu poate fi gol'),
    });

class UnconnectedLoginForm extends React.Component<Props, State> {

    handleSubmit = (values: LoginFormValues) =>{
        const {loginUser} = this.props;

        loginUser(values);

    };

    render() {
        return (
            <LoginFormContainer>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit}
                >
                    {(formikProps: FormikProps<LoginFormValues>) => {
                        const {handleSubmit} = formikProps;

                        return (
                            <FormGroup onSubmit={handleSubmit}>

                                <TitleContainer>
                                    <h2> Autentificare </h2>
                                </TitleContainer>

                                <Field
                                    name="username"
                                    label="Nume utilizator*"
                                    placeholder="Nume utilizator"
                                    helperText="Acest camp trebuie sa aiba cel putin 5 si cel mult 50 de caractere!"
                                    component={TextInput}
                                />

                                <Field
                                    name="password"
                                    label="Parola*"
                                    placeholder="Parola"
                                    helperText="Acest camp trebuie sa aiba cel putin 8 si cel mult 50 de caractere!"
                                    component={PasswordInput}
                                />

                                <Button
                                    type="submit"
                                    style={buttonStyles}
                                    variant="contained"
                                >
                                    Autentificare
                                </Button>
                            </FormGroup>
                        );
                    }}

                </Formik>
            </LoginFormContainer>
        );
    }
}

const mapStateToProps = ({User}: AppState): StateProps => ({
    User,
});

const mapDispatchToProps: DispatchProps = {
    loginUser: loginUserThunk,
};

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLoginForm);
