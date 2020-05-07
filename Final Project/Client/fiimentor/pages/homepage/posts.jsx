import React from 'react'
import {ListOfPosts} from '../../main/components/ListOfPostsComponent/ListOfPosts';
import CustomPageHeader from '../../main/components/Generics/CustomPageHeader/CustomPageHeader';

const Posts = () => (

    <>
        <CustomPageHeader title="Postari"/>
        <ListOfPosts/>
    </>
);

export default Posts;
