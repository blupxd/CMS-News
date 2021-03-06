import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Loader} from '../../components';

const CategoryPost = ({ posts }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

  return (
      <div className="container mx-auto h-screen pt-4 px-4 mb-64">
        <h1 className="text-2xl">Latest Posts for you</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-2">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            )).reverse()}
        </div>
      </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}