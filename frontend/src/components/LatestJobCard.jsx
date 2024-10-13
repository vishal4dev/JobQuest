import React from 'react'
import { Badge } from './ui/badge'
const LatestJobCard = () => {
  return (
    <div className='p-4 bg-white rounded-md border border-grey-100 cursor-pointer shadow-xl'>
        <div>
            <h1 className='font-medium text-lg'>google</h1>
            <p className='text-sm text-gray-500'>india</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>backend engineer</h1>
            <p className='text-sm text-gray-600'>a backend dev is needed urgently</p>
        </div>
        <div>
           <Badge className={'text-blue-700 font-bold'} variant="ghost">5 postions</Badge>
              <Badge className={'text-[#F83002] font-bold'} variant="ghost">Full time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">50lpa</Badge>
        </div>
    </div>
  )
}

export default LatestJobCard