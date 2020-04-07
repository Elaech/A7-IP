import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Button,
} from '@material-ui/core';
import {User} from '../core/domain/User.js'

import {EmailInput} from './Generics/emailInput';
import {PasswordInput} from './Generics/passwordInput';
import {LoginFormContainer } from './LoginFormStyles';

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
      .required('Trebuie sa introduci email-ul'),
    password: Yup.string()
      .min(User.passwordConstraint.min, 'Parola trebuie sa aiba cel putin 6 caractere')
      .max(User.passwordConstraint.max, 'Parola trebuie sa aiba cel mult 18 caractere')
      .required('trebuie sa introduci parola'),
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
                        
                <Button type="submit">Login</Button>
                      
                      </FormGroup>
                    );
                  }}

                </Formik>
              </LoginFormContainer>
        );
    }
}
 
export default LoginForm;