import React from 'react';
import {FastField, Field, Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import {Button} from '@material-ui/core';
import {buttonStyles, PostFormContainer, TitleContainer} from './PostFormStyles';
import {TextAreaInput} from '../Generics/TextAreaInput';
import {TextInput} from '../Generics/TextInput';
import {Checkbox} from '../Generics/CheckBox';
import {FormGroup} from '../LoginFormComponents/LoginFormStyles';

import {Postare} from '../../core/domain/Postare';
import {SelectOption} from '../Generics/Select/SelectOption';
import {Select} from '../Generics/Select/Select';
import {options1, options21, options22, options321, options322, options333} from './SelectOptions';
import {Profesor} from '../../core/domain/Profesor';
import type {AppState} from '../../store/AppState';
import {connect} from 'react-redux';
import {getProfesoriThunk} from '../../store/Profesor/getProfesoriThunk';
import {Context} from '../../Context';
import type {CreatePostRequest} from '../../core/services/ApiService';
import {createAPostThunk} from '../../store/Post/createAPostThunk';
import type {UserToken} from '../../store/User/tokenReducer';
import {setUserTokenThunk} from '../../store/User/setUserTokenThunk';



interface PostFormValues {
    vizibility1: SelectOption;
    vizibility2: SelectOption;
    vizibility3: SelectOption;
    title: string;
    content: string;
    isAnonymous: boolean;
}

interface StateProps {
    profesori: Profesor[];
    token: UserToken;
}

interface DispatchProps {
    getProfesori(token: string): void;
    setUserToken(token: string): void;
    createPost(post: CreatePostRequest): void;
}


type Props = StateProps & DispatchProps;

const initialValues: PostFormValues = {
    contacts: [SelectOption.create()],
    title: '',
    content: '',
    isAnonymous: false,
};

let grupeMentorat= {};
let user;

const validationSchema: Yup.Schema<PostFormValues> = Yup.object().shape({
    contacts: Yup.string()
        .required('Alege contactele!'),
    content: Yup.string()
        .min(Postare.contentConstraint.min)
        .max(Postare.contentConstraint.max)
        .required('Continutul postarii nu poate fi gol'),
    isAnonymous: Yup.boolean(),
});


class UnconnectedPostForm extends React.Component<Props> {

    async componentDidMount(): void {
        const {getProfesori, setUserToken } = this.props;

        const tokenLS = sessionStorage.getItem('userToken');
        await  setUserToken(tokenLS);

        user = sessionStorage.getItem('user');

        if (tokenLS) {
           await getProfesori(tokenLS.toString());
            grupeMentorat = await Context.apiService.getGrupeMentorat(tokenLS.toString());
            grupeMentorat = grupeMentorat.list.slice();
        }


    }

    mapProfesori = () => this.props.profesori ? this.props.profesori.map((profesor) => (
        SelectOption.create({
            name: profesor.professorId,
            value: profesor.professorId,
            label: profesor.firstName + ' ' + profesor.lastName,
            parentName: 'Profesor',
        })
    )) : {};

    mapGrupeMentorat = () => grupeMentorat ? grupeMentorat.map((grup) => (
        SelectOption.create({
            name: grup.ownerId,
            label: grup.title,
            parentName: 'Grup Mentorat',
            value: grup.ownerId,
        })
    )) : {};

    handleSubmit = (values: PostFormValues)=> {
        const{createPost} = this.props;
        console.log(values.vizibility1);
        const {
            vizibility1,
            vizibility2,
            vizibility31,
            vizibility32,
            vizibility33,
            title,
            content,
            isAnonymous,
        } = values;


        if(vizibility1.label === 'Toti utilizatorii') {
            const postRequest: CreatePostRequest = {
                isAnonymous,
                recipients: 'All',
                title,
                content,
            };

            createPost(postRequest);
        } else {
            if(vizibility1.label === 'Profesori') {
                    if(vizibility2.label === 'Toti Profesorii' ) {
                        const postRequest: CreatePostRequest = {
                            recipients : 'Professors',
                            professors : {
                                recipient: 'All',
                            },
                            content,
                            title,
                            isAnonymous,
                        };

                        createPost(postRequest);
                    } else {
                        if(vizibility2.label === 'Tutore') {
                            const postRequest: CreatePostRequest = {
                                recipients: 'Professors',
                                professors: {
                                    recipient: 'Tutor',
                                },
                                content,
                                title,
                                isAnonymous,
                            };

                            createPost(postRequest);
                        } else if(vizibility2.parentName === 'Profesor') {
                            const postRequest: CreatePostRequest = {
                                recipients: 'Professors',
                                professors: {
                                    recipient: 'Professor',
                                    professorId: vizibility2.value,
                                },
                                content,
                                title,
                                isAnonymous,
                            };

                            createPost(postRequest);
                        }
                    }
            } else {
                if(vizibility1.label === 'Grup') {
                    if(vizibility2.label === 'Grup Facultate') {
                        const postRequest: CreatePostRequest = {
                            recipients: 'Groupe',
                            groupe: {
                                year: vizibility31.value,
                                letter: vizibility32.value,
                                number: vizibility33.value,
                            },
                            content,
                            title,
                            isAnonymous,
                        };

                        createPost(postRequest);
                    } else if(vizibility2.label === 'Grup Mentorat') {
                        const postRequest: CreatePostRequest = {
                            recipients: 'Groupe',
                            groupe: {
                               groupeId: vizibility31.value,
                            },
                            content,
                            title,
                            isAnonymous,
                        };

                        createPost(postRequest);
                    }
                }
            }
        }
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
                        const {
                            handleSubmit,
                            values: {vizibility1, vizibility2, vizibility31, vizibility32, vizibility33}
                        } = formikProps;

                        return (
                            <FormGroup onSubmit={handleSubmit}>
                                <FastField
                                    label="Vizibilitate"
                                    name="vizibility1"
                                    options={options1}
                                    closeMenuOnSelect
                                    component={Select}
                                />
                                {vizibility1  && vizibility1.label === 'Profesori' &&
                                (<div>
                                    <FastField
                                        label="Selecteaza Profesor"
                                        name="vizibility2"
                                        options={options21}
                                        closeMenuOnSelect
                                        component={Select}
                                    />
                                    {vizibility2 && vizibility2.label === 'Profesor' &&
                                    (
                                        <FastField
                                            label="Alege Profesorii"
                                            name="vizibility2"
                                            options={this.mapProfesori()}
                                            closeMenuOnSelect
                                            component={Select}
                                        />
                                    )
                                    }
                                </div>)
                                }


                                {vizibility1  && vizibility1.label === 'Grup' &&
                                (<div>
                                        <FastField
                                            label="Selecteaza grup"
                                            name="vizibility2"
                                            options={options22}
                                            closeMenuOnSelect
                                            component={Select}
                                        />
                                        {vizibility2  && vizibility2.label === 'Grup Mentorat' &&
                                        (<FastField
                                            label="Selecteaza grup"
                                            name="vizibility31"
                                            options={this.mapGrupeMentorat()}
                                            closeMenuOnSelect
                                            component={Select}
                                        />)
                                        }
                                        {vizibility2 && vizibility2.label === 'Grup Facultate' &&
                                        (<div>
                                            <FastField
                                                label="An"
                                                name="vizibility31"
                                                options={options321}
                                                closeMenuOnSelect
                                                component={Select}
                                            />
                                            <FastField
                                                label="Semian"
                                                name="vizibility32"
                                                options={options322}
                                                closeMenuOnSelect
                                                component={Select}
                                            />
                                            <FastField
                                                label="Grupa"
                                                name="vizibility33"
                                                options={options333}
                                                closeMenuOnSelect
                                                component={Select}
                                            />
                                        </div>)
                                        }
                                    </div>
                                )
                                }


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
                                {user && user.role === 'student'
                                &&
                                    <Field
                                        name="isAnonymous"
                                        label="Trimite drept anonim"
                                        component={Checkbox}
                                    />
                                }
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

const mapStateToProps = ({profesori}: AppState): StateProps => ({
    profesori,
});

const mapDispatchToProps: DispatchProps = {
    getProfesori: getProfesoriThunk,
    setUserToken: setUserTokenThunk,
    createPost: createAPostThunk,
};

export const PostForm = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPostForm);


