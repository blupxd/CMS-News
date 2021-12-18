import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


const Searchbar = () => {
    const [name, setName] = useState("");
    const {pathname} = useRouter()
    const handleSubmit = (event) => {
        event.preventDefault();
            window.open(`/search/${name}`,"_self");
    }
    return (
    <div>
        <form onSubmit={handleSubmit}>
                <input className='xl:w-64 mb-1 text-sm md:w-64 w-48 sm:w-64 lg:w-48 border-2
                 border-gray-200 rounded focus:outline-none py-1 pl-4'
                    type="text" 
                    value={name}
                    placeholder="Search for posts"
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
              <input className='sm:ml-2 ml-1 px-1 py-1 text-sm md:py-1 md:px-6 sm:ml-2 transition duration-300 rounded bg-red-500 text-white hover:bg-gray-200 cursor-pointer 
              hover:text-black py-1 px-8' type="submit" value="Search"/>
        </form>
    </div>
        
        
    )
}


export default Searchbar;
