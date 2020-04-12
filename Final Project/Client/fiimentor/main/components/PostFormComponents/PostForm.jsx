import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Button,
} from '@material-ui/core';
import { PostFormContainer, buttonStyles, TitleContainer, autoCompleteStyles } from './PostFormStyles';
import { Mesaj } from '../../core/domain/Mesaj'
import { TextAreaInput } from '../Generics/TextAreaInput';
import { TextInput } from '../Generics/TextInput';
import { Checkbox } from '../Generics/CheckBox';
import CreateSvgIcon from "@material-ui/core/utils"
import TextField from "@material-ui/core/TextField"
import Autocomplete from '@material-ui/lab/Autocomplete';

interface PostFormValues {
  contacts?: string[];
  content: string;
  isAnonymous: boolean;
}

const contacts = [
  { name: 'Exemplu' },
];

const initialValues: PostFormValues = {
  contacts: [],
  content: '',
  isAnonymous: false,
};

const validationSchema: Yup.Schema<PostFormValues> = Yup.object().shape({
  contacts: Yup.string()
    .required('Alege contactele!'),
  content: Yup.string()
    .min(Mesaj.contentContraint.min)
    .max(Mesaj.contentContraint.max)
    .required('Mesajul nu poate fi gol'),
  isAnonymous: Yup.boolean(),
});

class PostForm extends React.Component {
  handleSubmit(values: PostFormValues) {
    console.log(values);
  }
  render() {

    return (
      <PostFormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
        >
          {(formikProps: FormikProps<PostFormValues>) => {
            const { handleSubmit } = formikProps;

            return (
              <FormGroup onSubmit={handleSubmit}>
                <TitleContainer>
                  <h2>Creare postare</h2>
                </TitleContainer>
                <Autocomplete
                  multiple
                  style={autoCompleteStyles}
                  id="search-contacts"
                  options={contacts}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Destinatari:"
                      variant="standard"
                      placeholder="Selecteaza contacte..."
                    />
                  )}
                />
                <Field
                  name="title"
                  label="Titlu postare:"
                  placeholder="Scrie..."
                  component={TextInput}
                />
                <Field
                  name="content"
                  label="Continut postare:"
                  placeholder="Scrie..."
                  component={TextAreaInput}
                />
                <Field
                  name="anonymous"
                  label="Trimite drept anonim"
                  component={Checkbox}
                />

                <Button
                  type="submit"
                  style={buttonStyles}
                  variant="contained"
                >
                  Postează
                        </Button>
              </FormGroup>
            );
          }}

        </Formik>
      </PostFormContainer>
    );
  }
}

export default PostForm;
