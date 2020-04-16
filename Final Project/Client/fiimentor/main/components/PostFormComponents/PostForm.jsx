import React from 'react';
import {FastField, Field, Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import {Button, FormGroup,} from '@material-ui/core';
import {buttonStyles, PostFormContainer, TitleContainer} from './PostFormStyles';
import {TextAreaInput} from '../Generics/TextAreaInput';
import {TextInput} from '../Generics/TextInput';
import {Checkbox} from '../Generics/CheckBox';


import {Postare} from '../../core/domain/Postare';
import {SelectOption} from '../Generics/Select/SelectOption';
import {Select} from '../Generics/Select/Select';
import {options1, options21, options22, options321, options322, options333} from './SelectOptions';
import {Profesor} from '../../core/domain/Profesor';
import type {AppState} from '../../store/AppState';
import {connect} from 'react-redux';
import {getProfesoriThunk} from '../../store/Profesor/getProfesoriThunk';
import type {UserLogged} from '../../../global';
import {Context} from '../../Context';

interface PostFormValues {
    contacts: SelectOption[];
    title: string;
    content: string;
    isAnonymous: boolean;
}

interface StateProps {
    profesori: Profesor[];
}

interface DispatchProps {
    getProfesori(token: string): void;
}

interface OwnProps {
    user: UserLogged;
    token: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const initialValues: PostFormValues = {
    contacts: [SelectOption.create()],
    title: '',
    content: '',
    isAnonymous: false,
};

let grupeMentorat= {};

const validationSchema: Yup.Schema<PostFormValues> = Yup.object().shape({
    contacts: Yup.string()
        .required('Alege contactele!'),
    content: Yup.string()
        .min(Postare.contentConstraint.min)
        .max(Postare.contentConstraint.max)
        .required('Mesajul nu poate fi gol'),
    isAnonymous: Yup.boolean(),
});


class UnconnectedPostForm extends React.Component<Props> {

    async componentDidMount(): void {
        const {getProfesori, token} = this.props;

        if (token) {
            getProfesori(token.toString());
            grupeMentorat = await Context.apiService.getGrupeMentorat(token.toString());
            grupeMentorat = grupeMentorat.list.slice();
            console.log(grupeMentorat);
        }


    }

    mapProfesori = () => this.props.profesori ? this.props.profesori.map((value) => (
        SelectOption.create({
            name: value.firstName + ' ' + value.lastName,
            value: value.userId,
            label: value.firstName + ' ' + value.lastName,
            parentName: 'Profesor',
        })
    )) : {};

    mapGrupeMentorat = () => grupeMentorat ? grupeMentorat.map((value) => (
        SelectOption.create({
            name: value.title,
            label: value.title,
            parentName: 'Grup Mentorat',
            value: value.ownerId,
        })
    )) : {};

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
                        const {
                            handleSubmit,
                            values: {vizibility1, vizibility2, vizibility31, vizibility32, vizibility33}
                        } = formikProps;

                        return (
                            <FormGroup onSubmit={handleSubmit}>
                                <TitleContainer>
                                    <h2>Creare postare</h2>
                                </TitleContainer>
                                <FastField
                                    label="Vizibilitate"
                                    name="vizibility1"
                                    options={options1}
                                    closeMenuOnSelect
                                    component={Select}
                                />
                                {vizibility1 !== undefined && vizibility1.name === 'Profesori' &&
                                (<div>
                                    <FastField
                                        label="Selecteaza Profesor"
                                        name="vizibility2"
                                        options={options21}
                                        closeMenuOnSelect
                                        component={Select}
                                    />
                                    {vizibility2 !== undefined && vizibility2.name === 'Profesor' &&
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


                                {vizibility1 !== undefined && vizibility1.name === 'Grup' &&
                                (<div>
                                        <FastField
                                            label="Selecteaza grup"
                                            name="vizibility2"
                                            options={options22}
                                            closeMenuOnSelect
                                            component={Select}
                                        />
                                        {vizibility2 !== undefined && vizibility2.name === 'Grup Mentorat' &&
                                        (<FastField
                                            label="Selecteaza grup"
                                            name="vizibility31"
                                            options={this.mapGrupeMentorat()}
                                            closeMenuOnSelect
                                            component={Select}
                                        />)
                                        }
                                        {vizibility2 !== undefined && vizibility2.name === 'Grup Facultate' &&
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

const mapStateToProps = ({profesori}: AppState): StateProps => ({
    profesori,
});

const mapDispatchToProps: DispatchProps = {
    getProfesori: getProfesoriThunk,
};

export const PostForm = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPostForm);


