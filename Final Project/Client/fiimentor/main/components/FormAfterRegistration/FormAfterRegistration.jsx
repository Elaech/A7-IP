import React from 'react';
import {FastField, Field, Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import {Button} from '@material-ui/core';
import {FormGroup} from '../LoginFormComponents/LoginFormStyles';
import {FormContainer, buttonStyles} from './FormAfterRegistrationStyles';

import {SelectOption} from '../Generics/Select/SelectOption';
import {Select} from '../Generics/Select/Select';
import {options1} from './SelectOptionsForm';
import {options321,options322, options333} from '../PostFormComponents/SelectOptions';



interface AfterRegistrationFormValues {
    role1: SelectOption;
}


const initialValues: AfterRegistrationFormValues = {
    role1: [SelectOption.create()],
};


const validationSchema: Yup.Schema<AfterRegistrationFormValues> = Yup.object().shape({
    role1: Yup.string()
        .required('Alege rolul!'),
    
});


class AfterRegistrationForm extends React.Component<Props> {
    handleSubmit = (values: AfterRegistrationFormValues)=> {
        console.log(values);

     }

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
                            values: {role1, role11, role12, role13}
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

                                {role1  && (role1.label === 'Student' || role1.label === 'Tutore') &&
                                (<div>
                                            <FastField
                                                label="An:"
                                                name="role11"
                                                options={options321}
                                                closeMenuOnSelect
                                                component={Select}
                                            />
                                            <FastField
                                                label="Semian:"
                                                name="role12"
                                                options={options322}
                                                closeMenuOnSelect
                                                component={Select}
                                            />
                                            <FastField
                                                label="Grupa:"
                                                name="role13"
                                                options={options333}
                                                closeMenuOnSelect
                                                component={Select}
                                            />
                                        </div>)
                                }

                                <Button
                                    type="submit"
                                    style={buttonStyles}
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                                
                                
                            </FormGroup>
                        );
                    }}

                </Formik>
            </FormContainer>
        );
    }

    
}

export default AfterRegistrationForm;




