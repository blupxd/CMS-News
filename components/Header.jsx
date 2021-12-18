import Link from 'next/link';
import { Searchbar } from '.';
import React, { useState, useEffect} from 'react'
import { getCategories } from '../services'
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faTimes
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getElementById } from 'domutils';
  
library.add(
    faBars,
    faTimes
  );
const Header = () => {

    const [categories, setCategories] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() =>{
        getCategories().then((newCategories) => setCategories(newCategories))
    }, []);
    return (
        <div className="bg-black m-0 sticky top-0 z-50">
            <div className="flex m-0">
                <div className="mx-10">
                    <Link href="/">
                        <span className="cursor-pointer text-3xl text-white">
                            NEWS
                        </span>
                    </Link>
                </div>
                <div className="lg:contents mx-auto lg:flex hidden md:block sm:block">
                    <div className='flex md:gap-0 lg:gap-0'>
                        {categories.map((category)=>(
                            <div className='lg:contents text-center py-0 sm:py-2'>
                                <Link key={category.slug} href={`/category/${category.slug}`}>
                                    <span className="text-base text-justify sm:text-sm md:text-sm hover:bg-red-600 sm:px-2 py-2 px-4 text-white align-middle cursor-pointer">
                                        {category.name}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="ml-2">
                        <Searchbar />  
                    </div>
                </div>
                <div className='block bg-black absolute w-full sm:hidden'>
                    <div className='absolute mt-0.5 mr-1 right-0'>
                            <FontAwesomeIcon 
                                className='text-white' 
                                icon={faBars}
                                size="2x"
                                style={{ display: showMenu ? 'none' : 'block' }}
                                onClick={() => setShowMenu(!showMenu)}
                                />
                            <FontAwesomeIcon
                                className='text-white mt-0.5 mr-1 hidden'
                                style={{ display: showMenu ? 'block' : 'none' }}
                                icon={faTimes}
                                size="2x"
                                onClick={() => setShowMenu(!showMenu)}
                            />
                    </div>
                    <div className='text-xl text-center' style={{ display: showMenu ? 'block' : 'none' }}>
                        {categories.map((category)=>(
                                <div className='lg:contents text-center py-0 sm:py-2'>
                                    <Link key={category.slug} href={`/category/${category.slug}`}>
                                        <span className="text-base text-justify sm:text-sm md:text-sm hover:bg-red-600 sm:px-2 py-2 px-4 text-white align-middle cursor-pointer">
                                            {category.name}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                            <Searchbar /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
