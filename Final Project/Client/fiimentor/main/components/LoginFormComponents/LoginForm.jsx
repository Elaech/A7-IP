import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Button,
} from '@material-ui/core';
import {User} from '../../core/domain/User.js'

import {EmailInput} from '../Generics/EmailInput';
import {PasswordInput} from '../Generics/PasswordInput';
import {LoginFormContainer } from './LoginFormStyles';
import {buttonStyles} from './LoginFormStyles';
import {TitleContainer} from './LoginFormStyles';

import {Link} from '@material-ui/core'

interface LoginFormValues {
    email: string;
    password: string;
  }


const initialValues: LoginFormValues = {
    email: '',
    password: ''
  };

const validationSchema: Yup.Schema<LoginFormValues> = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Acest camp nu poate fi gol'),
    password: Yup.string()
      .min(User.passwordConstraint.min, 'Parola trebuie sa aiba cel putin 6 caractere')
      .max(User.passwordConstraint.max, 'Parola trebuie sa aiba cel mult 18 caractere')
      .required('Acest camp nu poate fi gol'),
  });

  class LoginForm extends React.Component {

    handleSubmit (values: LoginFormValues) {
      console.log(values);
}
    render() {
        return (
            <LoginFormContainer>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={this.handleSubmit}
                >
                  {(formikProps: FormikProps<LoginFormValues>)=>{
                    const {handleSubmit} = formikProps;

                    return(
                      <FormGroup onSubmit={handleSubmit}>

                        <TitleContainer>
                          <h1> Login </h1>
                        </TitleContainer>

                        <Field
                            name="email"
                            label="Email*"
                            placeholder="Email"
                            component={EmailInput}
                        />

                        <Field
                            name="password"
                            label="Password*"
                            placeholder="Password"
                            component={PasswordInput}
                        />

                        <Button
                        type="submit"
                        style={buttonStyles}
                        variant="contained"
                        >
                        Login
                        </Button>

                        <Link href="#"  color="inherit">
                          Ai uitat parola?
                        </Link>
                        <Link href="#"  color="inherit">
                          Nu ai cont? Inregistreaza-te!
                        </Link>

                      </FormGroup>
                    );
                  }}

                </Formik>
              </LoginFormContainer>
        );
    }
}

export default LoginForm;
