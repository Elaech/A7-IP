import Head from 'next/head'
import React from 'react'
import PostsPage from '../../main/components/PostPageComponent/PostsPage';

const Post= (user, token) => (
    <>
        <Head>
            <title>FIIMentor</title>
        </Head>
        <PostsPage user={user} token={token}/>
    </>
);

Post.getInitialProps = async ({ reduxStore}) => {
    const user = reduxStore.getState().User;
    const token = reduxStore.getState().Token;
    return {user, token};

    };

export default Post;
