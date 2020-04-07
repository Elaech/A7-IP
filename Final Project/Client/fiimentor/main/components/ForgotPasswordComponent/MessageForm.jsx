import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Button,
} from '@material-ui/core';
import { MessageFormContainer } from './MessageFormStyles';
import {Mesaj} from '../../core/domain/Mesaj'
import { TextAreaInput } from '../Generics/TextAreaInput';
import {Checkbox} from '../Generics/CheckBox';

interface MessageFormValues {
  content: string;
}

const initialValues: MessageFormValues = {
  content: '',
};

/*const validationSchema: Yup.Schema<MessageFormValues> = Yup.object().shape({
  content: Yup.string()
    .min(Mesaj.contentContraint.min)
    .max(Mesaj.contentContraint.max)
    .required('Mesajul nu poate fi gol'),
});*/
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
})
class MessageForm extends React.Component {

    handleSubmit (values: MessageFormValues) {
      console.log(values);
}
    render() {
        return (
          <MessageFormContainer>
                <Formik
                  initialValues={initialValues}
                  onSubmit={this.handleSubmit}
                  validationSchema={validationSchema}>
                  {(formikProps: FormikProps<MessageFormValues>)=>{
                    const {handleSubmit} = formikProps;
                    return(
                      <FormGroup onSubmit={handleSubmit}>
                        <Field
                        name='email'
                        component={TextAreaInput}
                        placeholder='Enter email'
                        autoCapitalize='none'
                        iconName='ios-mail'
                        iconColor='#2C384A'
                        />
                        <Button
                          buttonType='outline'
                          title='Send Email'
                          buttonColor='#039BE5'
                          variant="contained"
                          color='red'
                        >
                          Send Email
                        </Button>
                      </FormGroup>
                    );
                  }}
                </Formik>
          </MessageFormContainer>
        );
    }
}

export default MessageForm;