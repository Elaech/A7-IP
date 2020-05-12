import React from 'react'
import CustomPageHeader from '../../main/components/Generics/CustomPageHeader/CustomPageHeader';
import {PostForm} from '../../main/components/PostFormComponents/PostForm';

const CreatePost = () => (

    <>
        <CustomPageHeader title="Creaza o postare"/>
        <PostForm/>
    </>
);

export default CreatePost;
