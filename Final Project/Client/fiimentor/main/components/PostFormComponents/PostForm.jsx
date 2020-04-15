import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Button,
} from '@material-ui/core';
import { PostFormContainer, buttonStyles, TitleContainer, autoCompleteStyles } from './PostFormStyles';
import { TextAreaInput } from '../Generics/TextAreaInput';
import { TextInput } from '../Generics/TextInput';
import { Checkbox } from '../Generics/CheckBox';
import CreateSvgIcon from "@material-ui/core/utils"
import TextField from "@material-ui/core/TextField"
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Label } from '@material-ui/icons';
import {Postare} from '../../core/domain/Postare';

interface PostFormValues {
  contacts?: string[];
  content: string;
  isAnonymous: boolean;
}

const initialValues: PostFormValues = {
  contacts: [],
  content: '',
  isAnonymous: false,
};

const options = [
  { name: 'Profesori', label: 'Profesori', value: 'Profesori' },
  { name: 'Grup', label: 'Grup', value: 'Grup' },
  { name: 'Toti utilizatorii', label: 'Toti utilizatorii', value: 'Toti utilizatorii' },
];

const options2 = [
  { name: 'Profesor', label: 'Profesor', value: 'Profesor', link: 'Profesori' },
  { name: 'Mentor', label: 'Mentor', value: 'Mentor', link: 'Profesori' },
  { name: 'Toti profesorii', label: 'Toti profesorii', value: 'Toti profesorii', link: 'Profesori' },
  { name: 'An si Facultate', label: 'An si Facultate', value: 'An si Facultate', link: 'Grup' },
  { name: 'Mentorat', label: 'Mentorat', value: 'Mentorat', link: 'Grup' }
];

const options3 = [
  { name: 'An', label: 'An', value: 'An', link: 'An si Facultate' },
  { name: 'Litera', label: 'Litera', value: 'Litera', link: 'An si Facultate' },
  { name: 'Numar', label: 'Numar', value: 'Numar', link: 'An si Facultate' },
];

const options4 = [
  { name: 'Exemplu', label: 'Exemplu', value: 'Exemplu'},
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

class PostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: {},
      selectedOption2: {},
      selectedOption3: {},
    };
  }


  handleSubmit(values: PostFormValues) {
    console.log(values);
  }

  handleChange1 = (event, selectedOption) => {
    this.setState({ selectedOption })
  };

  handleChange2 = (event, selectedOption) => {
    this.setState({ selectedOption2: selectedOption })
  }

  handleChange3 = (event, selectedOption2) => {
    this.setState({ selectedOption3: selectedOption2 })

  }

  render() {
    const filteredOptions = options2.filter((o) => o.link === this.state.selectedOption.value)
    const filteredOptions2 = options3.filter((o) => o.link === this.state.selectedOption2.value)

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
                <h3>Destinatari:</h3>
                <Autocomplete
                  style={autoCompleteStyles}
                  id="search-contacts"
                  options={options}
                  getOptionLabel={(option) => option.name}
                  onChange={this.handleChange1}
                  value={this.state.selectedOption.value}
                  filterSelectedOptions
                  disableClearable
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Optiune 1:"
                      variant="standard"
                      placeholder="Către..."
                    />
                  )}
                />
                <Autocomplete
                  style={autoCompleteStyles}
                  id="search-contacts2"
                  options={filteredOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={this.handleChange2}
                  value={this.state.selectedOption2.value}
                  filterSelectedOptions
                  disableClearable
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Optiune 2:"
                      variant="standard"
                      placeholder="Către..."
                    />
                  )}
                />
                {(this.state.selectedOption2.value === 'Profesor') ||
                (this.state.selectedOption2.value === 'Mentorat') ?
                  <Autocomplete
                    style={autoCompleteStyles}
                    id="search-name"
                    options={options4}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    disableClearable
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Alege:"
                        variant="standard"
                        placeholder="Către..."
                      />
                    )}
                  /> : null}
                <Autocomplete
                  style={autoCompleteStyles}
                  id="search-contacts3"
                  options={filteredOptions2}
                  getOptionLabel={(option) => option.name}
                  onChange={this.handleChange3}
                  value={this.state.selectedOption3.value}
                  filterSelectedOptions
                  disableClearable
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Optiune 3:"
                      variant="standard"
                      placeholder="Către..."
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
