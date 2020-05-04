import React from 'react';
import {Table, TableBody} from '@material-ui/core';
import {TheadStyled, ThStyled, TrowStyled} from './ListOfPostsStyles';
import type {SearchedPostsState} from '../../store/Post/searchPostReducer';
import type {SearchRequest} from '../../core/services/ApiService';
import type {AppState} from '../../store/AppState';
import {searchPostThunk} from '../../store/Post/searchPostThunk';
import {connect} from 'react-redux';
import {SearchPostRequest} from '../../core/domain/SearchPostRequest';
import {FormGroup} from '../LoginFormComponents/LoginFormStyles';
import {FastField, Formik, FormikProps} from 'formik';
import {TextInput} from '../Generics/TextInput';
import {Context} from '../../Context';
import Link from 'next/link';

interface StateProps {
    searchedPosts: SearchedPostsState;
}

interface DispatchProps {
    searchPosts(searchReq: SearchRequest): void;
}

interface SearchProps {
    query: string;
}


type Props = StateProps & DispatchProps;

const initialValues: SearchProps = {
    query: '',
};

class UnconnectedViewPosts extends React.Component<Props> {

    componentDidMount() {
        const request = SearchPostRequest.create();

        const {searchPosts} = this.props;

        const authorization = localStorage.getItem('userToken');

        searchPosts(request, authorization);

    }

    handleSubmit = (values: SearchProps) => {

        const request = SearchPostRequest.create({queryParam: values.query});
        const {searchPosts} = this.props;
        const authorization = localStorage.getItem('userToken');

        searchPosts(request, authorization);

    };

    render() {
        const {searchedPosts} = this.props;

        if (!searchedPosts) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={this.handleSubmit}
                >
                    {(formikProps: FormikProps<SearchProps>) => {
                        const {handleSubmit} = formikProps;

                        return (
                            <FormGroup onSubmit={handleSubmit}>
                                <FastField
                                    name="query"
                                    label="Cauta o postare..."
                                    component={TextInput}
                                />
                            </FormGroup>
                        );
                    }}
                </Formik>
                <Table stickyHeader>
                    <TheadStyled>
                        <TrowStyled>
                            <ThStyled>Titlu</ThStyled>
                            <ThStyled>Autor</ThStyled>
                            <ThStyled>Data</ThStyled>
                        </TrowStyled>
                    </TheadStyled>
                    <TableBody>
                        {searchedPosts.map((post, index) => (
                            <TrowStyled key={index}>
                                <td>
                                    <Link href="/post/[id]" as={`/post/${post.id}&${post.type}`}>
                                        <a>{post.title || 'Aceasta postare nu are titlu'}</a>
                                    </Link>
                                </td>
                                <td>{post.author || 'Aceasta postare este anonima'}</td>
                                <td>{Context.dateService.formatTime(post.timestamp)}</td>
                            </TrowStyled>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = ({searchedPosts}: AppState): StateProps => ({
    searchedPosts,
});

const mapDispatchToProps: DispatchProps = {
    searchPosts: searchPostThunk,
};

export const ListOfPosts = connect(mapStateToProps, mapDispatchToProps)(UnconnectedViewPosts);
