import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, } from '@fortawesome/free-solid-svg-icons'

const PostCard = ({ post }) => {
    return (
        <div className="w-auto mb-0 sm:mb-6 rounded-lg mt-4" key={post.excerpt}>
            <div className="overflow-hidden mb-3">
               <a href={`/post/${post.slug}`}>
                   <img
                    src={post.featuredimage.url}
                    alt={post.title}
                    href={`/post/${post.slug}`}
                    className="h-32 md:h-32 lg:h-32 sm:h-64 w-full object-cover"
                />
                </a>
            </div>
            <div className="text-left h-30">
                <h1 className="transition duration-300 mb-0 cursor-pointer
                            hover:text-gray-800 sm:text-xl text-l font-semibold">
                        <Link href={`/post/${post.slug}`}>
                            {post.title}
                        </Link>
                </h1>
                <p className="text-sm sm:text-sm">{post.excerpt}</p>
                <div className="inline-flex gap-1 items-center">
                    <FontAwesomeIcon className="text-red-500" icon={faClock} width="20px" height="20px" />
                    <p className="text-xs text-red-500">{moment(post.createdAt).fromNow()}</p>
                </div>  
            </div>
            <hr className='mt-6'></hr>
        </div>
    )
}

export default PostCard
