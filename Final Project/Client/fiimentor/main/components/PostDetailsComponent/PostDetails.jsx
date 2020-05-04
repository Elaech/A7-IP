import React from 'react';
import type {PostState} from '../../store/Post/postReducer';
import {AuthorContainer, ContentContainer, LogoContainer, PostContainer, PostTitle} from './PostDetailsStyles';
import type {AppState} from '../../store/AppState';
import {connect} from 'react-redux';
import {getPostThunk} from '../../store/Post/getPostThunk';
import {Context} from '../../Context';

interface StateProps {
    post: PostState;
}

interface DispatchProps {
    getPost(postId: string, postType: string, authorizer: string): void;

}

interface OwnProps {
    postId: number;
    postType: string;
};

type Props = StateProps & DispatchProps & OwnProps;

class UnconnectedPostDetails extends React.Component<Props> {
    componentDidMount() {
        const authorizer = localStorage.getItem('userToken');
        const {postId, postType} = this.props;


            this.props.getPost(postId, postType, authorizer);

    }

    render(){
        const {post} = this.props;

        if(!post) {
            return <div>Loading...</div>
        }

        return(
            <PostContainer>
                <PostTitle>
                    {post.title || 'Aceasta postare nu are titlul'}
                </PostTitle>
                <AuthorContainer>
                   Postat de {post.author} pe data de {Context.dateService.formatTime(post.timestamp)}
                </AuthorContainer>
                <LogoContainer>

                </LogoContainer>
                <ContentContainer>
                    {post.content}
                </ContentContainer>
            </PostContainer>
        );
    }
}

const mapStateToProps = ({post}: AppState): StateProps => ({
    post,
});

const mapDispatchToProps: DispatchProps = {
    getPost: getPostThunk,
};

export const PostDetails = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPostDetails);
