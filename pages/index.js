import Head from 'next/head'
import { PostCard, LatestPost, CategoryPosts} from '../components';
import {getPosts} from '../services'
import moment from 'moment';


export default function Home({posts}) {
  return (
    <div className="bg-gray-100">
      <div className="flex items-center py-1 px-32 bg-red-500">
          <h1 className="text-white">Todays date:</h1>
          <p className="ml-6 text-white">{moment().format('MMMM Do YYYY')}</p>
        </div>
      <div className="container mx-auto bg-white px-10">
        <Head>
          <title>Site for News</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="mt-24 mb-4 border-b w-full inline-block border-gray-400">
          <LatestPost />
        </div>
        <div className="border-b w-full mt-2 inline-block border-gray-400">
          <h1 className="text-2xl">
            Latest News
          </h1>
            <div className="grid mb-12 lg:grid-cols-5 gap-5 lg:col-span-8 col-span-2 md:grid-cols-3">
               {posts.map((post) => <PostCard post={post.node} key={post.title}/>).reverse().slice(0,5)}
            </div>
        </div>
        <div className='grid grid-gap-5'>
          <CategoryPosts />
        </div>
      </div>
    </div>
  )
}
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return{
    props:{posts}
  }
}