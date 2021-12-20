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
  
library.add(
    faBars,
    faTimes
  );

const NavbarMob = () => {
    const [categories, setCategories] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    console.log(showMenu);
    useEffect(() =>{
        getCategories().then((newCategories) => setCategories(newCategories))
    }, []);
    return (
        <div className='bg-black absolute w-full sm:hidden'>
                    <div className='right-0 m-2 absolute'>
                            <FontAwesomeIcon 
                                className='text-white' 
                                icon={faBars}
                                size="lg"
                                style={{ display: showMenu ? 'none' : 'block' }}
                                onClick={() => setShowMenu(!showMenu)}
                                />
                            <FontAwesomeIcon
                                className='text-white hidden'
                                style={{ display: showMenu ? 'block' : 'none' }}
                                icon={faTimes}
                                size="lg"
                                onClick={() => setShowMenu(!showMenu)}
                            />
                    </div>
                    <div className='text-xl text-center' style={{ display: showMenu ? 'block' : 'none' }}>
                        {categories.map((category)=>(
                                <div className='lg:contents text-center py-0 sm:py-2' key={category.name}>
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
    )
}

export default NavbarMob
