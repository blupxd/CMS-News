import React, { useState, useEffect} from 'react';
import moment from 'moment';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, } from '@fortawesome/free-solid-svg-icons'
import { getLatestPost } from '../services/index.js';



const LatestPost = ( {categories, slug} ) => {
const [latestPost, setLatestPosts] = useState([]);

    useEffect(() => {
        getLatestPost(categories, slug)
            .then((result) => setLatestPosts(result))
    }, [])

    return (
            <div className="grid grid-cols-6 lg:grid-rows-2 sm:grid-rows-1 gap-5 mb-16">
            
            {latestPost.slice(2,3).map((post)=>  
                <div key={post.title} className="flex md:col-span-6 sm:col-span-6 pb-14 mb-12 lg:row-span-2 md:col-span-3 lg:col-span-3 sm:col-span-4 sm:row-span-1">
                    <div className="text-left h-30">
                        <h1 className="transition duration-300 w-32 mb-0 cursor-pointer
                                    hover:text-red-700 md:text-lg sm:w-64 md:w-64 font-semibold">
                                <a className="text-3xl" href={`/post/${post.slug}`}>
                                    {post.title}
                                </a>
                        </h1>
                        <p className="text-sm w-64 h-16">{post.excerpt}</p>   
                        <div className="inline-flex gap-1 items-center absolute mt-4">
                            <FontAwesomeIcon className="text-gray-500" icon={faClock} width="20px" height="20px" />
                            <p className="text-xs">{moment(post.createdAt).fromNow()}</p>
                        </div>
                    </div>
                    
                <div className="overflow-hidden">
                    <a href={`/post/${post.slug}`}>
                        <img
                            src={post.featuredimage.url}
                            alt={post.title}
                            href={`/post/${post.slug}`}
                            className="h-64 w-96 object-cover"
                        />
                    </a>
                </div>
            </div>
        )}
        {latestPost.slice(0,2).map((post)=>
            <div key={post.title} className="px-5 sm:col-span-6 border-l-4 border-red-500 gap-4 flex lg:col-span-3 md:col-span-6">
                <div className="overflow-hidden">
                <a href={`/post/${post.slug}`}>
                    <img
                        src={post.featuredimage.url}
                        alt={post.title}
                        href={`/post/${post.slug}`}
                        className="h-36 w-36 object-cover"
                    />
                    </a>
                    <div className="flex mt-2 gap-2 items-center">
                        <FontAwesomeIcon className="text-gray-500" icon={faClock} width="20px" height="20px" />
                        <p className="text-xs">{moment(post.createdAt).fromNow()}</p>
                    </div>
                </div>
                <div className="text-left">
                    <h1 className="transition duration-300 w-64 cursor-pointer hover:text-red-700 text-xl font-semibold">
                            <Link href={`/post/${post.slug}`}>
                                {post.title}
                            </Link>
                    </h1>
                    <p className="text-sm w-64">{post.excerpt}</p>   
                </div>
            </div>
        )}
        </div>
    )
}

export default LatestPost
