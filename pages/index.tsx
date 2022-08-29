import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PhotoCards from '../components/home/PhotoCards';
import NewsletterForm from '../components/NewsletterForm';
import Layout from '../components/Layout';
import { posts as allPosts } from '../utils/sample-data';
import { GetStaticProps } from 'next';
import { Post } from '../interfaces';
import useColorTheme from '../hooks/useColorTheme';

const latestPostsLength = 10;

type Props = {
    posts?: Post[];
    errors?: string;
};

const IndexPage = ({ posts }: Props) => {
    const colors = useColorTheme();

    const router = useRouter();
    const items = posts ?? [];

    const onClickPost = (slug: string) => {
        router.push(`/posts/${slug}`);
        window.scrollTo(0, 0);
    };

    return (
        <Layout title="Main | Modern News" px={{ base: '.6em', md: '1.2em' }} py="1.4em">
            <Box as="section">
                <Heading marginX=".1em" marginBottom=".6em" fontSize={'1.6em'} color={colors.default} fontWeight="300">
                    Trending
                </Heading>
                {items.length >= 4 && (
                    <PhotoCards
                        onClickPost={({ slug }) => onClickPost(slug)}
                        containerHeight={540}
                        post1={items[0]}
                        post2={items[1]}
                        post3={items[2]}
                        post4={items[3]}
                    />
                )}
            </Box>
          
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async ({}) => {
    try {
        return { props: { posts: allPosts } };
    } catch (err) {
        return { props: { errors: err.message } };
    }
};

export default IndexPage;
