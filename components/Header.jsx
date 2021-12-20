import Link from 'next/link';
import { NavbarMob, Searchbar } from '.';
import React, { useState, useEffect} from 'react'
import { getCategories } from '../services'
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faTimes
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  
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
                <div className="lg:contents mx-2 lg:flex hidden md:block sm:block">
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
                <NavbarMob />
            </div>
        </div>
    )
}

export default Header
