import { getAllPosts } from '../../services';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Searchbar, CategoryPosts } from '../../components';
import moment from 'moment';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, } from '@fortawesome/free-solid-svg-icons'
const SearchResultPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const {query} = useRouter()
  useEffect(() => {
    getAllPosts().then((newAllPosts) => {
    setAllPosts(newAllPosts);
    })
  }, []);
  const after = 0;
  let msg = "";
  allPosts.filter((post)=>{
      if(post.title.toLowerCase().includes((query.slug).toLowerCase()) || post.excerpt.toLowerCase().includes((query.slug).toLowerCase())){
        after++
      }
    })
  if(after === 0){
    msg =`No results for "${query.slug}"`;
  }else{
    msg = `We found ${after} posts for you`;
  }
    return (
        <div className='mx-44 sm:mx-20 mt-12'>
          <Searchbar />
          <h1 className='text-4xl font-bold mb-6'>Results for: "{query.slug}"</h1>
          <p className='text-xl text-red-500 mb-6'>{msg}</p>
          <div className='grid grid-cols-2 gap-6'>
          {allPosts.filter((post)=>{
            if(post.title.toLowerCase().includes((query.slug).toLowerCase()) || post.excerpt.toLowerCase().includes((query.slug).toLowerCase())){
              return post;
            }
          }).map((post) => (
            <div className='p-4 flex border-l-4 sm:col-span-2 col-span-1 border-red-500 gap-4 mb-4'>
              <a href={`/post/${post.slug}`}>
                   <img
                    src={post.featuredimage.url}
                    alt={post.title}
                    href={`/post/${post.slug}`}
                    className="h-32 w-32 object-cover"
                />
                </a>
                <div>
                  <Link href={`/post/${post.slug}`}><p className='text-xl font-bold hover:text-red-500 cursor-pointer transition duration-300 '>{post.title}</p></Link>
                  <p className='w-64'>{post.excerpt}</p>
                  <div className="inline-flex gap-1 items-center">
                    <FontAwesomeIcon className="text-gray-500" icon={faClock} width="20px" height="20px" />
                    <p className="text-xs">{moment(post.createdAt).fromNow()}</p>
                  </div>
                </div>
            </div>
                  
              ))}
          </div>
          <hr className='my-12'></hr>
              <div>
                <CategoryPosts />
              </div>
        </div>
  );
}
export default SearchResultPosts;
