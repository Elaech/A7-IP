import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import {
   ForgotPasswordFormContainer,
   buttonStyles
   } from './ForgotPasswordFormStyles';
import {EmailInput} from '../Generics/EmailInput';
import {FormGroup} from '../LoginFormComponents/LoginFormStyles';

interface ForgotPasswordFormValues {
  content: string;
}

const initialValues: ForgotPasswordFormValues = {
  content: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Email-ul trebuie sa fie unul valid!')
    .required('Acest camp nu poate fi gol!')
})
class ForgotPasswordForm extends React.Component {

    handleSubmit (values: ForgotPasswordFormValues) {
      console.log(values);
}
    render() {
        return (
          <ForgotPasswordFormContainer>
                <Formik
                  initialValues={initialValues}
                  onSubmit={this.handleSubmit}
                  validationSchema={validationSchema}>
                  {(formikProps: FormikProps<ForgotPasswordFormValues>)=>{
                    const {handleSubmit} = formikProps;
                    return(
                      <FormGroup onSubmit={handleSubmit}>
                        <Field
                        name='email'
                        component={EmailInput}
                        placeholder='Email'
                        autoCapitalize='none'
                        />
                        <Button
                          buttonType='outline'
                          title='Trimite Email'
                          buttonColor='#039BE5'
                          style={buttonStyles}
                          variant="contained"
                        >
                          Trimite 
                        </Button>
                      </FormGroup>
                    );
                  }}
                </Formik>
          </ForgotPasswordFormContainer>
        );
    }
}

export default ForgotPasswordForm;
