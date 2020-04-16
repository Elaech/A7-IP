import React from 'react';
import {FormContainer, TitleContainer} from './PostPageStyle';
import PostForm from '../PostFormComponents/PostForm';
import type {UserState} from '../../store/User/userReducer';
import type {UserToken} from '../../store/User/tokenReducer';


interface PostPageProps {
    user: UserState,
    token: UserToken,
}
class PostsPage extends React.Component<PostPageProps> {
    render() {
        return (
            <>
                <TitleContainer>
                    <h2><b> Postari</b></h2>
                </TitleContainer>
                <FormContainer>
                    <PostForm user={this.props.user} token={this.props.token}/>

                </FormContainer>
            </>
        );
    }

}

export default PostsPage;
