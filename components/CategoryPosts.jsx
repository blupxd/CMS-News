import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, } from '@fortawesome/free-solid-svg-icons'
import { getLatestPosts } from '../services';


const CategoryPosts = () => {
  let cat = [1,2,3];
  const [LatestPosts, setLatestPosts] = useState([]);
  useEffect(() => {
    getLatestPosts().then((newLatestPosts) => {
      setLatestPosts(newLatestPosts);
    })
  }, []);
 const categoryPosts = (posts) => {
  if (posts.length === 0) return null;
  return (
    <>
      <a href={`category/${posts[0].categories[0].slug}`} className="transition duration-300 hover:text-red-800 text-2xl border-l-8 px-2 border-red-500 font-bold">{posts[0].categories[0].name}</a>
      <div className="grid grid-cols-4 gap-12">
        {posts.map((post) => (
          <div className="w-auto h-30 lg:col-span-2 col-span-4 md:col-span-4 sm:col-span-4 row-span-3 rounded-lg mt-4" key={post.title}>
            <div className="overflow-hidden">
                <a href={`/post/${post.slug}`}>
                    <img
                    src={post.featuredimage.url}
                    alt={post.title}
                    href={`/post/${post.slug}`}
                    className="h-48 w-full lg:h-96 sm:h-48 md:h-64 object-cover"
                  />
                </a>
                <h1 className="mt-2 transition duration-300 w-72 truncate mb-0 cursor-pointer
                              hover:text-red-800 text-xl font-semibold">
                          <Link href={`/post/${post.slug}`}>
                              {post.title}
                          </Link>
                  </h1>
                  <p className="w-96 text-l">{post.excerpt}</p>
                    <div className="inline-flex gap-1 items-center mt-2">
                      <FontAwesomeIcon className="text-gray-500" icon={faClock} width="20px" height="20px" />
                      <p className="text-sm">{moment(post.createdAt).fromNow()}</p>
                  </div>
            </div>
        </div>)).slice(0,1)}
        {posts.map((post) => (
          <div className="w-auto h-30 lg:col-span-2 col-span-4 md:col-span-4 sm:col-span-4 row-span-1 rounded-lg mt-4" key={post.title}>
            <div className="flex border-l-4 border-red-500 pl-2 overflow-hidden">
              <div className="ml-2">
                    <h1 className="transition duration-300 w-72 truncate mb-0 cursor-pointer
                                hover:text-red-800 text-l lg:text-l md:text-l font-semibold">
                            <Link href={`/post/${post.slug}`}>
                                {post.title}
                            </Link>
                    </h1>
                    <p className="w-60 lg:text-l text-sm h-24">{post.excerpt}</p>
                      <div className="inline-flex items-center">
                        <FontAwesomeIcon className="text-gray-500" icon={faClock} width="20px" height="20px" />
                        <p className="text-xs">{moment(post.createdAt).fromNow()}</p>
                    </div>
                </div>
                <a href={`/post/${post.slug}`}>
                    <img
                    src={post.featuredimage.url}
                    alt={post.title}
                    href={`/post/${post.slug}`}
                    className="h-32 w-32 hidden md:flex lg:flex object-cover"
                  />
                </a>
            </div>
        </div>)).slice(1,5)}
      </div>
    </>
  );
};
  return (
    <div className="w-full rounded-lg pb-12 mt-4">
        <div className="w-full inline-block pb-12">
        {cat.map(el => (
        <div key={el} className="mt-4 border-b border-gray-400 pb-6">
          {categoryPosts(LatestPosts.filter(post => post.tag == el).reverse().slice(0, 4))}
        </div>))}
        </div>
    </div>
  );
};

export default CategoryPosts;