//imports all of the important stuff
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts-json';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
 
//function that renders a post page
export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

//returns a list of possible values for 'id'
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths, 
        fallback: false,
    };
}

//fetches necessary data for blog posts with a given id
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}