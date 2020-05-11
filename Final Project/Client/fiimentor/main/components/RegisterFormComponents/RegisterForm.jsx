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
    .min(User.nameConstraint.min, 'Numele este prea scurt!')
    .max(User.nameConstraint.max, 'Numele este prea lung!')
    .required('Campul nu poate fi gol!');

const validationSchema: Yup.Schema<RegisterFormValues> = Yup.object().shape({
    email: Yup.string()
        .email('Email-ul trebuie sa fie unul valid!')
        .matches(User.emailPattern, 'Email-ul nu corespunde domeniului')
        .required('Campul nu poate fi gol'),
    password: Yup.string()
        .min(User.passwordConstraint.min, `Parola trebuie sa aiba minim ${User.passwordConstraint.min}  caractere!`)
        .max(User.passwordConstraint.max, `Parola trebuie sa aiba maxim ${User.passwordConstraint.max}  caractere!`)
        .required('Campul nu poate fi gol!'),
    confPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Parolele trebuie sa corespunda!'),
    username: Yup.string()
        .min(User.usernameConstraint.min, 'Username-ul este prea scurt!')
        .max(User.usernameConstraint.max, 'Username-ul este prea lung!')
        .required('Campul nu poate fi gol!'),
    serialNumber: Yup.string()
        .required('Campul nu poate fi gol!'),
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
                                    component={TextInput}
                                />

                                <Field
                                    name="firstName"
                                    label="Prenume*"
                                    placeholder="Prenume"
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
                                    component={TextInput}
                                />

                                <Field
                                    name="password"
                                    label="Parola*"
                                    placeholder="Parola"
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
                                   Register
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
