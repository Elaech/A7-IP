import React from 'react';
import {Table, TableBody} from '@material-ui/core';
import {TheadStyled, ThStyled, TrowStyled} from '../ListOfPostsComponent/ListOfPostsStyles';
import type {SearchedPosts} from '../../store/Post/searchPostReducer';
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
import {PaginationBar} from '../Generics/Pagination/PaginationBar';
import type {PaginatorOptions} from '../Generics/Pagination/Paginator';

interface StateProps {
    searchedPosts: SearchedPosts;
}

interface DispatchProps {
    searchPosts(searchReq: SearchRequest): void;
}

interface SearchProps {
    query: string;
}

interface State {
    from: number;
}

type Props = StateProps & DispatchProps;

const initialValues: SearchProps = {
    query: '',
};

const size = 20;

class UnconnectedMyPosts extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            from: 0,
        };
    }

    componentDidMount() {

        const page = Math.floor(this.state.from /size);

        const request = SearchPostRequest.create({page, postedByMe:true});

        const {searchPosts} = this.props;

        const authorization = sessionStorage.getItem('userToken');

        searchPosts(request, authorization);

    }
    componentDidUpdate(prevProps, prevState: State) {
        if (prevState.from !== this.state.from && prevProps) {
            const page = Math.floor(this.state.from /size);

            const request = SearchPostRequest.create({page, postedByMe:true});

            const {searchPosts} = this.props;

            const authorization = sessionStorage.getItem('userToken');

            searchPosts(request, authorization);
        }
    }

    handleSubmit = (values: SearchProps) => {

        const request = SearchPostRequest.create({queryParam: values.query, postedByMe:true});
        const {searchPosts} = this.props;
        const authorization = sessionStorage.getItem('userToken');

        searchPosts(request, authorization);

    };

    newSearchRequest = (options: PaginatorOptions) => {
        const from = options.from + size;
        this.setState({from});
    };

    render() {
        const {posts, total} = this.props.searchedPosts;
        const options: PaginatorOptions = {
            from: this.state.from,
            total: total || 0,
            size,
        };

        if (!posts) {
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
                        {posts.map((post, index) => (
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
                <PaginationBar options={options} onChange={this.newSearchRequest}/>
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

export const MyPosts = connect(mapStateToProps, mapDispatchToProps)(UnconnectedMyPosts);
