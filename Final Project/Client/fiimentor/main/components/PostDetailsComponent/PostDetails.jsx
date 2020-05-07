import React from 'react';
import type {PostState} from '../../store/Post/postReducer';
import {AuthorContainer, ContentContainer, LogoContainer, PostContainer, PostTitle} from './PostDetailsStyles';
import type {AppState} from '../../store/AppState';
import {connect} from 'react-redux';
import {getPostThunk} from '../../store/Post/getPostThunk';
import {Context} from '../../Context';
import {LogoPosts} from '../../globalStyledVariables';

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
    /*componentDidMount() {
        const authorizer = localStorage.getItem('userToken');
        const {postId, postType} = this.props;


            this.props.getPost(postId, postType, authorizer);

    }*/

    render(){
        /*const {post} = this.props;

        if(!post) {
            return <div>Loading...</div>
        }*/

        return(
            <PostContainer>
                <PostTitle>
                    {'Aceasta postare nu are titlul'}
                </PostTitle>
                <AuthorContainer>
                   Postat de autor pe data de data
                </AuthorContainer>
                <LogoContainer>
                 <LogoPosts/>
                </LogoContainer>
                <ContentContainer>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                </ContentContainer>
            </PostContainer>
        );
    }
}

/*const mapStateToProps = ({post}: AppState): StateProps => ({
    post,
});

const mapDispatchToProps: DispatchProps = {
    getPost: getPostThunk,
};

export const PostDetails = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPostDetails);
*/
export {UnconnectedPostDetails};