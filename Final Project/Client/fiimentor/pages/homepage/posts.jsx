import Head from 'next/head'
import React from 'react'
import {FormContainer, TitleContainer} from '../../main/components/PostPageComponent/PostPageStyle';
import {ListOfPosts} from '../../main/components/ListOfPostsComponent/ListOfPosts';

const Posts= () => (

        <>
            <TitleContainer>
                <h2><b> Postari</b></h2>
            </TitleContainer>
            <FormContainer>

                <ListOfPosts/>
            </FormContainer>
        </>
);

export default Posts;
