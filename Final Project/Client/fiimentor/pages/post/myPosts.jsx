import React from 'react'
import CustomPageHeader from '../../main/components/Generics/CustomPageHeader/CustomPageHeader';
import {MyPosts} from '../../main/components/MyPostsComponent/MyPost';

const Posts = () => (

    <>
        <CustomPageHeader title="Postarile mele"/>
        <MyPosts/>
    </>
);

export default Posts;
