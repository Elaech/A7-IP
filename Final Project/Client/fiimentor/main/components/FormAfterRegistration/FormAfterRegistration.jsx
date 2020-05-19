import React from 'react';
import {FastField, Field, Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import {Button} from '@material-ui/core';
import {FormGroup} from '../LoginFormComponents/LoginFormStyles';
import {buttonStyles, FormContainer} from './FormAfterRegistrationStyles';

import {SelectOption} from '../Generics/Select/SelectOption';
import {Select} from '../Generics/Select/Select';
import {options1} from './SelectOptionsForm';
import {options321, options322, options333} from '../CreatePostComponents/SelectOptions';
import {TextInput} from '../Generics/TextInput';
import type {UpdateUserRequest} from '../../core/services/ApiService';
import {updateUserThunk} from '../../store/User/updateUserThunk';
import {connect} from 'react-redux';
import {errorResponse} from '../../services/AxiosService';


interface AfterRegistrationFormValues {
    role1: SelectOption;
}

interface DispatchProps {
    updateUser(request: UpdateUserRequest): void;
}


const initialValues: AfterRegistrationFormValues = {
    role1: [SelectOption.create()],
};


const validationSchema: Yup.Schema<AfterRegistrationFormValues> = Yup.object().shape({
    role1: Yup.string()
        .required('Alege rolul!'),

});

let userToken;

class UnconnectedAfterRegistrationForm extends React.Component<DispatchProps> {
    componentDidMount(): void {
        userToken = sessionStorage.getItem('userToken');
    }

    handleSubmit = (values) => {
        const role = values.role1.value;

        if(userToken) {

            if (role === 'Student') {
                const request: UpdateUserRequest = {
                    role: role.toLowerCase(),
                    year: parseInt(values.year.value, 10),
                    letter: values.letter.value,
                    number: parseInt(values.number.value, 10),
                };

                this.props.updateUser(request, userToken);
            } else if (role === 'Profesor') {
                const request: UpdateUserRequest = {
                    role: role.toLowerCase(),
                    academicRank: values.academicRank,
                };

                this.props.updateUser(request, userToken);
            } else {
                const request: UpdateUserRequest = {
                    role: role.toLowerCase(),
                    academicRank: values.academicRank,
                    groupeTitle: values.groupeTitle,
                };
                this.props.updateUser(request, userToken);
            }
        } else {
            Context.alertService.fire({
                title: 'Eroare!',
                text: ` Nu sunteti autorizat sa executati aceasta actiune `,
                type: 'error',
                confirmButtonText: 'Ok',
                icon: 'error',
            })
        }
    };

    render() {
        return (
            <FormContainer>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit}
                >
                    {(formikProps: FormikProps<AfterRegistrationFormValues>) => {
                        const {
                            handleSubmit,
                            values: {role1}
                        } = formikProps;

                        return (
                            <FormGroup onSubmit={handleSubmit}>

                                <FastField
                                    label="Rol:"
                                    name="role1"
                                    options={options1}
                                    closeMenuOnSelect
                                    component={Select}
                                />

                                {role1 && (role1.label === 'Student') &&
                                (<div>
                                    <FastField
                                        label="An:"
                                        name="year"
                                        options={options321}
                                        closeMenuOnSelect
                                        component={Select}
                                    />
                                    <FastField
                                        label="Semian:"
                                        name="letter"
                                        options={options322}
                                        closeMenuOnSelect
                                        component={Select}
                                    />
                                    <FastField
                                        label="Grupa:"
                                        name="number"
                                        options={options333}
                                        closeMenuOnSelect
                                        component={Select}
                                    />
                                </div>)
                                }

                                {role1 && (role1.label === 'Profesor' || role1.label === 'Tutore') &&
                                (<div>
                                    <Field
                                        name="academicRank"
                                        label="Grad:"
                                        placeholder="Grad"
                                        helperText="Acest camp trebuie sa aiba maxim 50 de caractere!"
                                        component={TextInput}
                                    />

                                </div>)
                                }
                                {role1 && (role1.label === 'Tutore') &&
                                (<div>
                                    <Field
                                        name="groupTitle"
                                        label="Nume grupa:"
                                        placeholder="Titlu grupa"
                                        helperText="Acest camp trebuie sa aiba maxim 50 de caractere!"
                                        component={TextInput}
                                    />

                                </div>)
                                }

                                <Button
                                    type="submit"
                                    style={buttonStyles}
                                    variant="contained"
                                >
                                    Salveaza
                                </Button>


                            </FormGroup>
                        );
                    }}

                </Formik>
            </FormContainer>
        );
    }


}

const mapDispatchToProps: DispatchProps = {
    updateUser: updateUserThunk,
};

export const AfterRegistrationForm = connect(null, mapDispatchToProps)(UnconnectedAfterRegistrationForm);




