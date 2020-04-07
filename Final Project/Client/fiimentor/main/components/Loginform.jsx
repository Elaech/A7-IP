import React from 'react'
import { Formik } from 'formik'
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import styled from 'styled-components'

const DivForm = styled.div`
  width: 400px;
  text-align:center;
  padding: 0 20px;
  padding-bottom: 20px;
  border: grey solid 1px; 
  border-radius: 20px;
  background:#F6F6F6;
`;



class Loginform extends React.Component {
    //handleSubmit()
    render() {
        return (
            <DivForm>
                <Formik
                    initialValues={{ contact: '', message: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.contact) {
                            errors.contact = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid contact';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
						
                    }) => (
                            <form onSubmit={handleSubmit} >
                                <h1>Login</h1>
                                <Field
                                    name="email"
                                    label="Email*"
                                    placeholder="Email"
                                    component={EmailInput}
                  />
                            </form>
                        )}
                </Formik>
            </DivForm>
        );
    }
}

export default Loginform;