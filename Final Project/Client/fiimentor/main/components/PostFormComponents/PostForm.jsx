import React from 'react';
import {FastField, Field, Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Button,
} from '@material-ui/core';
import { PostFormContainer, buttonStyles, TitleContainer, autoCompleteStyles } from './PostFormStyles';
import { TextAreaInput } from '../Generics/TextAreaInput';
import { TextInput } from '../Generics/TextInput';
import { Checkbox } from '../Generics/CheckBox';


import {Postare} from '../../core/domain/Postare';
import {SelectOption} from '../Generics/Select/SelectOption';
import {Select} from '../Generics/Select/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

interface PostFormValues {
  contacts: SelectOption[];
  title: string;
  content: string;
  isAnonymous: boolean;
}

interface State {
  option1: SelectOption;
  option2: SelectOption;
  option3: SelectOption;
}

const initialValues: PostFormValues = {
  contacts: [SelectOption.create()],
  title: '',
  content: '',
  isAnonymous: false,
};

const options: SelectOption[] = [
  { name: 'Profesori', label: 'Profesori', value: 'Profesori' },
  { name: 'Grup', label: 'Grup', value: 'Grup' },
  { name: 'Toti utilizatorii', label: 'Toti utilizatorii', value: 'Toti utilizatorii' },
];
const options2: SelectOption[] =[
  { name: 'Profesor', label: 'Profesor', value: 'Profesor', parentName: 'Profesori' },
  { name: 'Mentor', label: 'Mentor', value: 'Mentor', parentName: 'Profesori' },
  { name: 'Toti profesorii', label: 'Toti profesorii', value: 'Toti profesorii', parentName: 'Profesori' },
];
const options3= [
  { name: 'Mentorat', label: 'Mentorat', value: 'Mentorat', parentName: 'Grup' },
  { name: 'An', label: 'An', value: 'An', parentName: 'An si Facultate' },
  { name: 'Litera', label: 'Litera', value: 'Litera', parentName: 'An si Facultate' },
  { name: '1', label: '1', value: '1', parentName: 'An' },
  { name: '2', label: '2', value: '2', parentName: 'An' },
  { name: '3', label: '3', value: '3', parentName: 'An' },
  { name: 'A', label: 'A', value: 'A', parentName: 'Litera' },
  { name: 'B', label: 'B', value: 'B', parentName: 'Litera' },
  { name: 'E', label: 'E', value: 'E', parentName: 'Litera' },
];


const validationSchema: Yup.Schema<PostFormValues> = Yup.object().shape({
  contacts: Yup.string()
    .required('Alege contactele!'),
  content: Yup.string()
    .min(Postare.contentConstraint.min)
    .max(Postare.contentConstraint.max)
    .required('Mesajul nu poate fi gol'),
  isAnonymous: Yup.boolean(),
});


class PostForm extends React.Component<{},State> {

  constructor() {
    super();

    this.state = {
      option1: SelectOption.create(),
      option2: SelectOption.create(),
      option3: SelectOption.create(),
    };
    this.handleChange1 = this.handleChange1.bind(this);
  }

  handleSubmit(values: PostFormValues) {
    console.log(values);
  }

   handleChange1 = (event) => {
    console.log(event.target.innerText);
    const value = event.target.innerText;
    this.setState({option1: SelectOption.create({name: value, label: value, value: value})});
  };

  handleChange2 = (selectedOption: SelectOption) => {
    this.setState({options2: selectedOption})
  };

  render() {
    return (
      <PostFormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
        >
          {(formikProps: FormikProps<PostFormValues>) => {
            const {
              handleSubmit,
                values: {vizibility1, vizibility2, vizibility3}
                } = formikProps;

            return (
              <FormGroup onSubmit={handleSubmit}>
                <TitleContainer>
                  <h2>Creare postare</h2>
                </TitleContainer>
                <FastField
                    label="Vizibilitate"
                    name="vizibility1"
                    options={options}
                    closeMenuOnSelect
                    component={Select}
                />

                {vizibility1!==undefined && vizibility1.name === 'Profesori' &&
                (<FastField
                    label="Vizibilitate2"
                    name="vizibility2"
                    options={options2}
                    closeMenuOnSelect
                    component={Select}
                />)
                }
                {vizibility1!== undefined && vizibility1.name === 'Mentor'}
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
                  name="isAnonymous"
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
