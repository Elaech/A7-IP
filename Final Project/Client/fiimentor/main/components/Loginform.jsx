import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Button,
} from '@material-ui/core';
import { MessageFormContainer } from './MessageFormStyles';
import {user} from '../../core/domain/user'
import {Checkbox} from '../Generics/CheckBox';
import {EmailInput} from '../Generics/EmailInput';
import {passwordImput} from '../Generics/EmailInput';


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
      .required('Field is required'),
    password: Yup.string()
      .min(user.passwordConstraint.min, 'Parola trebuie sa aiba cel putin 6 caractere')
      .max(user.passwordConstraint.min, 'Parola trebuie sa aiba cel mult 18 caractere')
      .required('Field is required'),
  });

const SignupForm = () => {
    const formik = useFormik({
      initialValues: { email: "" },
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      }
    });
    return (
            <Form onSubmit={handleSubmit}>
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
              <LoginButtonContainer>
                <Button type="submit" style={loginButtonColor}>Login</Button>
              </LoginButtonContainer>
              <LoginOptionsContainer>
                <Button size="sm" style={optionsButton} onClick={this.openReset}>Forgot Password</Button>
                <Button size="sm" style={registerButton} onClick={this.openRegister}>Register</Button>
              </LoginOptionsContainer>
            </Form>
    );
  };
  
  function App() {
    return <SignupForm />;
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);

  class Loginform extends React.Component {
 
    handleSubmit (values: MessageFormValues) {
      console.log(values);
}
    render() {
        return (
          <MessageFormContainer>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={this.handleSubmit}
                >
                  {(formikProps: FormikProps<MessageFormValues>)=>{
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

                    );
                  }}
 
                </Formik>
          </MessageFormContainer>
        );
    }
}
 
export default LoginFormForm;