import React from 'react';
import {FormContainer, TitleContainer} from './PostPageStyle';
import PostForm from '../PostFormComponents/PostForm';

class PostsPage extends React.Component {
    render() {
        return (
            <>
                <TitleContainer>
                    <h2><b> Postari</b></h2>
                </TitleContainer>
                <FormContainer>
                    <PostForm/>

                </FormContainer>
            </>
        );
    }

}

export default PostsPage;
