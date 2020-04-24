import React from 'react';
import {FormContainer, TitleContainer} from './PostPageStyle';
import {PostForm} from '../PostFormComponents/PostForm';
import type {UserLogged} from '../../../global';

interface  PostsPageProps {
    user: UserLogged;
    token: string;

}
class PostsPage extends React.Component<PostsPageProps> {
    render() {
        console.log(this.props);
        return (
            <>
                <TitleContainer>
                    <h2><b> Postari</b></h2>
                </TitleContainer>
                <FormContainer>
                    <PostForm user={this.props.user.user} token={this.props.user.token}/>

                </FormContainer>
            </>
        );
    }

}

export default PostsPage;
