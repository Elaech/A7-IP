import Head from 'next/head'
import React from 'react'
import {FormContainer, TitleContainer} from '../../main/components/PostPageComponent/PostPageStyle';
import {PostForm} from '../../main/components/PostFormComponents/PostForm';

const Post= () => (

        <>
            <TitleContainer>
                <h2><b> Postari</b></h2>
            </TitleContainer>
            <FormContainer>
                <PostForm/>

            </FormContainer>
        </>
);

export default Post;
