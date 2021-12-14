import React, { useState, useEffect} from 'react';
import moment from 'moment';
import { getRecentPosts, getSimilarPosts } from '../services/index.js';


const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if(slug) {
      getSimilarPosts(categories, slug)
        .then((result) => setRelatedPosts(result))
    } else{
      getRecentPosts(categories, slug)
        .then((result) => setRelatedPosts(result))
    }
  }, [slug])
  return (
    <div className="bg-white mt-8 mb-8">
      <h3 className="text-xl mb-8 border-b py-4">
        {slug ? 'Related Posts' : "Recent Posts"}
      </h3>
      {relatedPosts.map((post)=>  
        <div key={post.title} className="flex items-center mb-4">
            <div className="flex-grow border-l-4 px-2 border-red-500">
              <a href={`/post/${post.slug}`} key={post.title} className="font-semibold transition duration-2 hover:text-red-500 visited:text-purple-600 text-md">
                {post.title}
              </a>
              <p className="text-black text-l">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
        </div>
      )}
      <hr></hr>
    </div>
  )
}

export default PostWidget
