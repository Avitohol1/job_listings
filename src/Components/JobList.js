import React from 'react'
import './JobList.css'
import JobCard from './JobCard'

function JobList( {jobs, handleFilters} ) {

    // Map all jobs and return a div element for each one
    const cards = jobs.map(job => {
        return (
            <JobCard 
                key = {job.id}
                job = {job}
                handleFilters = {handleFilters}
            />
        )
    })


  return (
    <div className='cards'>
        { cards }
    </div>
    
  )
}

export default JobList