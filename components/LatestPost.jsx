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
            <div className="grid grid-cols-6 grid-rows-2 gap-5 mb-16">
            
            {latestPost.slice(2,3).map((post)=>  
                <div key={post.title} className="block md:flex col-span-6 lg:col-span-3 row-span-2">
                    <div className="text-left h-30">
                        <h1 className="transition duration-300 mb-0 cursor-pointer
                                    hover:text-red-700 w-64 lg:w-48 font-semibold">
                                <a className="text-2xl" href={`/post/${post.slug}`}>
                                    {post.title}
                                </a>
                        </h1>
                        <p className="text-xl w-72 lg:w-48">{post.excerpt}</p>   
                        <div className="inline-flex gap-1 items-center">
                            <FontAwesomeIcon className="text-gray-500" icon={faClock} width="16px" height="16px" />
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
            <div key={post.title} className="px-5 col-span-3 border-l-4 border-red-500 lg:flex hidden">
                <div className="overflow-hidden">
                <a href={`/post/${post.slug}`}>
                    <img
                        src={post.featuredimage.url}
                        alt={post.title}
                        href={`/post/${post.slug}`}
                        className="h-32 w-36 object-cover"
                    />
                    </a>
                    <div className="flex mt-2 gap-2 items-center">
                        <FontAwesomeIcon className="text-gray-500" icon={faClock} width="16px" height="16px" />
                        <p className="text-xs">{moment(post.createdAt).fromNow()}</p>
                    </div>
                </div>
                <div className="text-left ml-2">
                    <h1 className="transition duration-300 w-48 cursor-pointer hover:text-red-700 text-xl font-semibold">
                            <Link href={`/post/${post.slug}`}>
                                {post.title}
                            </Link>
                    </h1>
                    <p className="text-sm w-48">{post.excerpt}</p>   
                </div>
            </div>
        )}
        </div>
    )
}

export default LatestPost
