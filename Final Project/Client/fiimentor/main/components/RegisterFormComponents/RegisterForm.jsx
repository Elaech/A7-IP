import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Button,
} from '@material-ui/core';
import {User} from '../../core/domain/User'
import { 
  RegisterFormContainer,
  TitleContainer, 
  buttonStyles
  } from './RegisterFormStyles';
import { TextInput } from '../Generics/TextInput';
import { PasswordInput } from '../Generics/PasswordInput';
import { EmailInput } from '../Generics/EmailInput';

interface RegisterFormValues {
    firstName: string;
    lastname: string;
    registrNo: string;
    username: string;
    password: string;
    confPassword: string;
    email: string;
    year?: number;
    group?: string;  
}

const initialValues: RegisterFormValues = {
    firstName:'',
    lastName: '',
    registrNo:'',
    username: '',
    password: '',
    confPassword:'',
    email:'',
    year:'',
    group:'',
};

export const nameSchema: Yup.Schema<string> = Yup.string()
  .min(User.nameConstraint.min, 'Numele este prea scurt!')
  .max(User.nameConstraint.max, 'Numele este prea lung!')
  .required('Campul nu poate fi gol!');

const validationSchema: Yup.Schema<ResgisterFormValues> = Yup.object().shape({
  email: Yup.string()
    .email('Email-ul trebuie sa fie unul valid!')
    .required('Campul nu poate fi gol'),
  password: Yup.string()
    .min(User.passwordConstraint.min, 'Parola trebuie sa aiba minim '+ User.passwordConstraint.min + ' caractere!')
    .max(User.passwordConstraint.max, 'Parola trebuie sa aiba maxim '+ User.passwordConstraint.max + ' caractere!')
    .required('Campul nu poate fi gol!'),
  confPassword: Yup.string()
    .oneOf([Yup.ref('password'),null],'Parolele trebuie sa corespunda!'),
  username: Yup.string()
    .min(User.usernameConstraint.min, 'Username-ul este prea scurt!')
    .max(User.usernameConstraint.max, 'Username-ul este prea lung!')
    .required('Campul nu poate fi gol!'),
  registrNo: Yup.string()
    .required('Campul nu poate fi gol!'),
  firstName: nameSchema,
  lastName: nameSchema,
});



class RegisterForm extends React.Component {

    handleSubmit (values: RegisterFormValues) {
      console.log(values);
}
    render() {
        return (
          <RegisterFormContainer>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={this.handleSubmit}
                >
                  {(formikProps: FormikProps<RegisterFormValues>)=>{
                    const {handleSubmit} = formikProps;

                    return(
                      <FormGroup onSubmit={handleSubmit}>
                      <TitleContainer>Inregistrare</TitleContainer>
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
                         name="registrNo"
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
                          style={buttonStyles}
                          variant="contained"
                        >
                          SUBMIT
                        </Button>

                      </FormGroup>
                    );
                  }}

                </Formik>
          </RegisterFormContainer>
        );
    }
}

export default RegisterForm;