import Link from 'next/link';
import { Searchbar } from '.';
import React, { useState, useEffect} from 'react'
import { getCategories } from '../services'
const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() =>{
        getCategories().then((newCategories) => setCategories(newCategories))
    }, []);
    return (
        <div className="bg-black m-0 sticky top-0 z-50">
            <div className="flex ml-10 sm:ml-2 m-0">
                <div className="md:float-left sm:mt-6 lg:mt-0 md:mt-0">
                    <Link href="/">
                        <span className="cursor-pointer text-3xl text-white">
                            NEWS
                        </span>
                    </Link>
                </div>
                <div className="lg:contents inline-flex sm:block">
                    <div className='sm:inline-flex md:gap-0 text-center lg:gap-0 sm:gap-2'>
                        {categories.map((category)=>(
                            <div className='lg:contents py-0 sm:py-2'>
                                <Link key={category.slug} href={`/category/${category.slug}`}>
                                    <span className="text-base md:text-sm hover:bg-red-600 sm:px-2 py-2 px-4 text-white align-middle cursor-pointer">
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
            </div>
        </div>
    )
}

export default Header
