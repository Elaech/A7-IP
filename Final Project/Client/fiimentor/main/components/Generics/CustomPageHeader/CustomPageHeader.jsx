import Head from 'next/head';
import React, { FC } from 'react';

interface Props {
    title: string;
}

const CustomPageHeader: FC<Props> = (props: Props) => {
    const { title } = props;
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <h1 className="page-title">{title}</h1>
        </>
    );
};

export default CustomPageHeader;
