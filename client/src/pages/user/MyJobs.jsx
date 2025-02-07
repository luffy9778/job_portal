import React, { useContext, useEffect, useState } from 'react'
import AppliedJobs from '../../components/user/myjobs/AppliedJobs'
import SavedJobs from '../../components/user/myjobs/SavedJobs'

const MyJobs = () => {
    const [active, setActive] = useState("applied")
    
  return (
    <div className='px-4 md:px-44  w-full'>
        <h1 className='pt-5 text-3xl font-bold'>My Jobs</h1>
        <div className='flex text-xl w-full border-b'>
            <div className={`${active==="applied"&&" border-b-4 border-orange-500"} p-5`}
            onClick={()=>setActive("applied")}>Apllied</div>
            <div className={`${active==="saved"&&" border-b-4 border-orange-500"} p-5`}
            onClick={()=>setActive("saved")}>saved</div>
        </div>
        <div>
            {active==="applied"?
            <AppliedJobs />:
            
            <SavedJobs/>
        }
        </div>
    </div>
  )
}

export default MyJobs