import React, { useState, useEffect} from 'react'
import { getCategories } from '../services'
import Link from 'next/link';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookSquare,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { Searchbar } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(
  faGithub,
  faFacebookSquare,
  faInstagram
);
const Footer = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() =>{
        getCategories().then((newCategories) => setCategories(newCategories))
    }, []);
    return (
        <div className='bg-black'>
            <div className='mx-0 py-16 grid grid-cols-2'>
                <div className='grid grid-cols-3 gap-y-4 text-center sm:ml-4 ml-16'>
                {categories.map((category)=>(
                    <div className='py-2 ' key={category.name}>
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className="text-center hover:bg-red-600 text-white md:text-l sm:text-sm border-l-4 border-red-600 py-2 px-2 cursor-pointer">
                                {category.name}
                            </span>
                        </Link>
                    </div>
                        ))}
                </div>
                <div className='grid gap-y-2 border-l-4 border-red-600 px-2'>
                    <div className='flex items-center gap-2 '>
                    <FontAwesomeIcon className='text-white w-6 h-6' icon={faGithub} />
                    <a href='https://github.com/blupxd' className='text-white text-xs'>GitHub Account</a>
                    </div>
                    <div className='flex items-center gap-2'>
                    <FontAwesomeIcon className='text-white w-6 h-6' icon={faInstagram} />
                    <a href='https://instagram.com/_matija.s ' className='text-white text-xs'>Instagram Account</a>
                    </div>
                    <div className='flex items-center gap-2'>
                    <FontAwesomeIcon className='text-white w-6 h-6' icon={faFacebookSquare} />
                    <a href='https://facebook.com' className='text-white text-xs'>Facebook Account</a>
                    </div>
                    <Searchbar />
                </div>
            </div>
            <hr className='border-gray-400 mx-12'></hr>
            <div className='py-4 text-center'>
                <p className='text-gray-400 text-sm'>© CMS News 2021</p>
            </div>
        </div>
    )
}

export default Footer
