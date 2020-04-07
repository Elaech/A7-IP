import React from 'react'
import { Formik, FormikProps, Field } from 'formik'
import {
  FormControlLabel,
  FormControl,
  Checkbox,
  Button
} from '@material-ui/core';

import { DivForm, MyH2 } from './MessageFormStyles';
import { TextAreaInput } from '../Generics/TextAreaInput';
import FormGroup from '@material-ui/core/FormGroup';

const initialValues  = {
  contacts: [],
  content: '',
  isAnonymous: false,
};

class MessageForm extends React.Component {
    handleSubmit(values) {
      console.log(values);
    }
    render() {
        return (
          <DivForm>
                <Formik
                    initialValues={initialValues}
                    validationSchema=''
                    onSubmit={this.handleSubmit}
                    render={(formikProps) => {
                      const { handleSubmit } = formikProps;

                      return (
                        <FormGroup onSubmit={handleSubmit}>
                          <Field
                            name="content"
                            label="Mesaj:"
                            placeholder="Scrie..."
                            component={TextAreaInput}
                          />
                          <Button  variant="contained" type="submit" color="primary">TRIMITE</Button>
                        </FormGroup>
                      );

                    }}
                    />
          </DivForm>
        );

    }
}

export default MessageForm;