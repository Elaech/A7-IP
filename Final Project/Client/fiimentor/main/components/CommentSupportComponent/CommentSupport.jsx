import React, {Component} from 'react';
import {Field, Formik, FormikProps} from 'formik';
import {TextAreaInput} from '../Generics/TextAreaInput';
import {TextInput} from '../Generics/TextInput'
import {Button} from '@material-ui/core';
import {buttonStyles, CommentFormContainer, CommentFormSection, Comentariu1, AuthorContainer, ContentComment, Comentariu2} from './CommentSupportStyle';

import {FormGroup} from '../LoginFormComponents/LoginFormStyles';
import {Profile} from '../../globalStyledVariables';
import styled from 'styled-components';

interface CommentFormValues {
    content: string;
}

const initialValues: CommentFormValues = {content: '',};

class CommentForm extends Component {
    handleSubmit = (values: CommentFormValues) => {
        console.log(values);
    };
    handleInputChange = () => {
    };

    render() {
        return (
            <CommentFormContainer>
                <Formik
                    initialValues={initialValues}
                    onSubmit={this.handleSubmit}
                >
                    {
                        (formikProps: FormikProps<CommentFormValues>) => {
                            const {handleSubmit} = formikProps;
                            return (
                                <FormGroup
                                    onSubmit={handleSubmit}
                                >
                                    <Field
                                        name="content"
                                        label="Comentariul tau:"
                                        placeholder="Scrie..."
                                        component={TextAreaInput}
                                    />
                                    <Button
                                        type="submit"
                                        style={buttonStyles}
                                        variant="contained"
                                    >
                                        Trimite comentariu
                                    </Button>
                                </FormGroup>
                            
                            );
                        }
                    }
                </Formik>
                <CommentFormSection>
                    <Comentariu1>
                        <AuthorContainer>
                            <Profile/>
                            Autor comentariu
                        </AuthorContainer>
                        <ContentComment>
                      *Comentariu*
                      Curiosity remaining own see repulsive household advantage son additions
                            
                        </ContentComment>
                    </Comentariu1>

                    <Comentariu2>
                        <AuthorContainer>
                        <Profile/>
                            Autor comentariu
                        </AuthorContainer>
                        <ContentComment>
                        *Comentariu*
                      Curiosity remaining own see repulsive household advantage son additions   
                        </ContentComment>
                    </Comentariu2>
                </CommentFormSection>
            </CommentFormContainer>
        );
    }
}

export default CommentForm;