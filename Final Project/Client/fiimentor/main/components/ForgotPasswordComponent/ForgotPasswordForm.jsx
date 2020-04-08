import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Button,
} from '@material-ui/core';
import {
   ForgotPasswordFormContainer,
   buttonStyles
   } from './ForgotPasswordFormStyles';
import {EmailInput} from '../Generics/EmailInput';
interface ForgotPasswordFormValues {
  content: string;
}

const initialValues: ForgotPasswordFormValues = {
  content: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
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
                        placeholder='Enter email'
                        autoCapitalize='none'
                        />
                        <Button
                          buttonType='outline'
                          title='Send Email'
                          buttonColor='#039BE5'
                          style={buttonStyles}
                          variant="contained"
                        >
                          Send Email
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