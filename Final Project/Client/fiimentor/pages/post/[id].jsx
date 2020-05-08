import Head from 'next/head';
import React from 'react';

import {PostDetails} from '../../main/components/PostDetailsComponent/PostDetails';


const PostDetailsPage = ({postId, postType}) => {
    return(
        <>
        <Head>
            <title>Detalii Postare</title>
        </Head>
        <PostDetails postId ={postId} postType={postType}/>
            </>
    );
};

PostDetailsPage.getInitialProps = async({ query}: any) => {
    const postId = query.id.split('&')[0];
    const postType = query.id.split('&')[1];

    return {
        postId,
        postType
    };
};

export default PostDetailsPage;
