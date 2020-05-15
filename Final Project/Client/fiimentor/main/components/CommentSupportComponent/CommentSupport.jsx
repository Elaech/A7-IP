import React, {Component} from 'react';
import {Field, Formik, FormikProps} from 'formik';
import {TextAreaInput} from '../Generics/TextAreaInput';
import {
    AuthorName,
    CommentButton,
    CommentDate,
    CommentsContainer,
    CommentStyles,
    ContentComment,
    CreateCommentContainer,
    HeaderContainer,
    NumberOfComments,
    ViewMoreLabel,
} from './CommentSupportStyle';

import {FormGroup} from '../LoginFormComponents/LoginFormStyles';
import {Profile} from '../../globalStyledVariables';
import type {PostState} from '../../store/Post/postReducer';
import type {AppState} from '../../store/AppState';
import {createCommentThunk} from '../../store/Comment/createCommentThunk';
import {connect} from 'react-redux';
import {Context} from '../../Context';
import {Comment} from '../../core/domain/Comment'
import {Checkbox} from '../Generics/CheckBox';
import type {CreateCommentRequest} from '../../core/services/ApiService';
import * as Yup from 'yup';
import {Postare} from '../../core/domain/Postare';


interface StateProps {
    post: PostState;
}

interface DispatchProps {
    createComment(commentRequest: CreateCommentRequest, authorizer: string): void;
}

type Props = StateProps & DispatchProps;

interface CommentFormValues {
    content: string;
    isAnonymous: boolean;
}

const initialValues: CommentFormValues = {
    content: '',
    isAnonymous: false,
};

interface State {
    from: number;
    currentComments: Comment[];
}

const size: number = 5;
let counter: number = 1;

const validationSchema: Yup.Schema<CommentFormValues> = Yup.object().shape({
    content: Yup.string()
        .required('Pentru a lasa un comentariu trebuie introdus macar un carcater'),
    isAnonymous: Yup.boolean(),
});

class UnconnectedCommentForm extends Component<Props, State> {
    constructor() {
        super();
        this.state = {
            from: 0,
            currentComments: [],
        };
    }

    handleSubmit = (values: CommentFormValues) => {
        const id = Context.routerService.query.id.split('&')[0];
        const type = Context.routerService.query.id.split('&')[1];

        const content = values.content;
        const isAnonymous = values.isAnonymous;

        const request: CreateCommentRequest = {
          content,
          pmessageId: type === 'privateMessage'? parseInt(id,10) : null,
          postId: type === 'post'? parseInt(id,10) : null,
          isAnonymous,
        };

        const userToken = sessionStorage.getItem('userToken');

        if(userToken) {

            this.props.createComment(request, userToken);

        }
    };

    componentDidMount(): void {
        if (this.props.post) {
            const newComments: Comment[] = this.props.post.comments.slice(this.state.from, size * counter++);
            const {currentComments} = this.state;
            currentComments.length > 0 ?
                this.setState({currentComments: [...currentComments, ...newComments]})
                :
                this.setState({currentComments: newComments});
        }
    }

    viewMore = async () => {
        await this.setState({from: this.state.from + size});

        if (this.props.post) {
            const newComments: Comment[] = this.props.post.comments.slice(this.state.from, size * counter++);
            const {currentComments} = this.state;

            this.setState({currentComments: [...currentComments, ...newComments]});
        }
    };

    viewLess = async () => {
        await this.setState({from: 0});

        counter = 1;
        const newComments: Comment[] = this.props.post.comments.slice(this.state.from, size * counter++);

        this.setState({currentComments: newComments});

    };


    render() {
        const {post} = this.props;
        const {currentComments, from} = this.state;

        if (!post) {
            return <div>Postare inexistenta...</div>
        }

        return (
            <>
                <NumberOfComments>
                    {
                        post.comments.length > 0 ?
                            post.comments.length === 1 ?
                                '1 Comentariu' :
                                `${post.comments.length} Comentarii `
                            : 'Nu exista comentarii'
                    }
                </NumberOfComments>
                <CommentsContainer>
                    {currentComments.map((comment, index) => (
                        <CommentStyles key={index}>
                            <HeaderContainer>
                                <Profile/>
                                <AuthorName>
                                    {comment.isAnonymous === 0 ? comment.author : 'Acest comentariu este anonim'}
                                </AuthorName>
                                <CommentDate>
                                    {Context.dateService.formatTime(comment.timestamp)}
                                </CommentDate>
                            </HeaderContainer>
                            <ContentComment>
                                {comment.content}
                            </ContentComment>
                        </CommentStyles>
                    ))}
                </CommentsContainer>
                {
                    !(from + size >= post.comments.length) &&
                    (
                        <ViewMoreLabel onClick={this.viewMore}>
                            Vezi mai multe...
                        </ViewMoreLabel>
                    )}
                {(from + size >= post.comments.length && currentComments.length >= size) &&
                (
                    <ViewMoreLabel onClick={this.viewLess}>
                        Vezi mai putine...
                    </ViewMoreLabel>
                )
                }
                <CreateCommentContainer>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={this.handleSubmit}
                        validationSchema={validationSchema}
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
                                            label="Scrie un comentariu:"
                                            placeholder="Scrie..."
                                            component={TextAreaInput}
                                        />
                                        <Field
                                            name="isAnonymous"
                                            label="Trimite drept anonim"
                                            component={Checkbox}
                                        />
                                        <CommentButton
                                            type="submit"
                                        >
                                            Trimite comentariu
                                        </CommentButton>
                                    </FormGroup>

                                );
                            }
                        }
                    </Formik>
                </CreateCommentContainer>
            </>
        );
    }
}

const mapStateToProps = ({post}: AppState): StateProps => ({
    post,
});

const mapDispatchToProps: DispatchProps = {
    createComment: createCommentThunk,
};

export const CommentForm = connect(mapStateToProps, mapDispatchToProps)(UnconnectedCommentForm);
