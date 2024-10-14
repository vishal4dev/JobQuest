import React from 'react'
import Navbar from './shared/Navbar.jsx'
import Job from './Job';

const randomJobs =[1,2,45];

const Browse = () => {
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='font-bold text-xl my-10'>Search results: ({randomJobs.length})</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    // map over the search results and display
                    randomJobs.map((item,index) =>{
                        return(
                            <Job/>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Browse