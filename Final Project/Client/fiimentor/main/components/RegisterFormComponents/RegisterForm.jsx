import React from 'react';
import {Field, Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import {User} from '../../core/domain/User'
import {TextInput} from '../Generics/TextInput';
import {PasswordInput} from '../Generics/PasswordInput';
import {EmailInput} from '../Generics/EmailInput';
import type {UserState} from '../../store/User/userReducer';
import type {RegisterUserRequest} from '../../core/services/ApiService';
import type {AppState} from '../../store/AppState';
import {connect} from 'react-redux';
import {registerUserThunk} from '../../store/User/registerUserThunk';

import {registerButton, RegisterFormContainer, TitleContainer,} from './RegisterFormStyles';
import {Button} from '@material-ui/core';
import { FormGroup} from '../LoginFormComponents/LoginFormStyles';


interface RegisterFormValues {
    firstName: string;
    lastName: string;
    serialNumber: string;
    username: string;
    password: string;
    confPassword: string;
    email: string;
}

interface StateProps {
    User: UserState;
};

interface DispatchProps {
    registerUser(user: RegisterUserRequest): void;
};

type Props = StateProps & DispatchProps;

const initialValues: RegisterFormValues = {
    firstName: '',
    lastName: '',
    serialNumber: '',
    username: '',
    password: '',
    confPassword: '',
    email: '',

};

export const nameSchema: Yup.Schema<string> = Yup.string()
    .min(User.nameConstraint.min, `Numele trebuie sa aiba cel putin ${User.usernameConstraint.min} caractere`)
    .max(User.nameConstraint.max, `Numele trebuie sa aiba cel mult ${User.usernameConstraint.max} caractere`)
    .required('Acest camp nu poate fi gol!');

const validationSchema: Yup.Schema<RegisterFormValues> = Yup.object().shape({
    email: Yup.string()
        .email('Email-ul trebuie sa fie unul valid!')
        .matches(User.emailPattern, 'Email-ul nu corespunde domeniului!')
        .required('Acest camp nu poate fi gol!'),
    password: Yup.string()
        .min(User.passwordConstraint.min, `Parola trebuie sa aiba minim ${User.passwordConstraint.min}  caractere!`)
        .max(User.passwordConstraint.max, `Parola trebuie sa aiba maxim ${User.passwordConstraint.max}  caractere!`)
        .required('Acest camp nu poate fi gol!'),
    confPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Parolele trebuie sa corespunda!')
        .required('Acest camp nu poate fi gol!'),
    username: Yup.string()
        .min(User.usernameConstraint.min, `Numele trebuie sa aiba cel putin ${User.usernameConstraint.min} caractere`)
        .max(User.usernameConstraint.max, `Numele trebuie sa aiba cel putin ${User.usernameConstraint.max} caractere`)
        .required('Acest camp nu poate fi gol!'),
    serialNumber: Yup.string()
        .required('Acest camp nu poate fi gol!'),
    firstName: nameSchema,
    lastName: nameSchema,
});


class UnconnectedRegisterForm extends React.Component<Props> {

    handleSubmit =  (values: RegisterFormValues) =>{

        const {
            username,
            email,
            firstName,
            lastName,
            serialNumber,
            password
        } = values;

        const {registerUser} = this.props;

        registerUser({
            firstName,
            lastName,
            serialNumber,
            username,
            password,
            email,
        });
    };

    render() {
        return (
            <RegisterFormContainer>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit}
                >
                    {(formikProps: FormikProps<RegisterFormValues>) => {
                        const {handleSubmit} = formikProps;

                        return (
                            <FormGroup onSubmit={handleSubmit}>
                                <Field
                                    name="lastName"
                                    label="Nume*"
                                    placeholder="Nume"
                                    helperText="Acest camp trebuie sa aiba cel putin 3 si cel mult 50 de caractere!"
                                    component={TextInput}
                                />

                                <Field
                                    name="firstName"
                                    label="Prenume*"
                                    placeholder="Prenume"
                                    helperText="Acest camp trebuie sa aiba cel putin 3 si cel mult 50 de caractere!"
                                    component={TextInput}
                                />

                                <Field
                                    name="serialNumber"
                                    label="Numar matricol*"
                                    placeholder="Numar matricol"
                                    component={TextInput}
                                />

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

                                <Field
                                    name="confPassword"
                                    label="Confirma parola*"
                                    placeholder="Confirma parola"
                                    component={PasswordInput}
                                />

                                <Field
                                    name="email"
                                    label="Email*"
                                    placeholder="Email"
                                    component={EmailInput}
                                />

                                <Button
                                    type="submit"
                                    style={registerButton}
                                    variant="contained"
                                >
                                   Inregistrare
                                </Button>

                            </FormGroup>
                        );
                    }}

                </Formik>
            </RegisterFormContainer>
        );
    }
}

const mapStateToProps = ({User}: AppState): StateProps => ({
    User,
});

const mapDispatchToProps: DispatchProps = {
    registerUser: registerUserThunk,
};

export const RegisterForm = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRegisterForm);
