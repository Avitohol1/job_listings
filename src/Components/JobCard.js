import React from 'react'
import './JobCard.css'
import { nanoid } from 'nanoid'

function JobCard( {jobs, handleFilters} ) {

    // Map all jobs and return a div element for each one
    const cards = jobs.map(job => {
        return (
            <div className= 'card' key = {job.id}>
                { job.featured && <div className='feature-highlight'></div> }
                
                <div className='card__container'>
                    <img src= {job.logo} alt='faceit' className='card__image'/>

                    <div className='card__job-info'>
                        <div className='card__job-info-company'>
                            <span className='card__job-info-company-name'>{job.company}</span>
                            { job.new && <button className='card__job-info-new'><span>New!</span></button> }
                            { job.featured && <button className='card__job-info-featured'><span>Featured</span></button> }
                        </div>
                        
                        <h3 className='card__job-info-title'>{job.position}</h3>

                        <div className='card__job-info-details'>
                            <span>{job.postedAt}</span><span>•</span>
                            <span>{job.contract}</span><span>•</span>
                            <span>{job.location}</span>
                        </div>
                    </div>

                    <div className='tags'>
                        
                        {/* On click call the handleFilters function (App.js) and add the corresponding tag to the filters array */}
                        <span className='tag' onClick = {() => handleFilters(job.role)}>{job.role}</span>
                        <span className='tag' onClick = {() => handleFilters(job.level)}>{job.level}</span>

                        {job.languages.length !== 0 ? job.languages.map(language => {
                            return <span className='tag' key = {nanoid()} onClick = {() => handleFilters(language)}>{language}</span>
                        }) : ''}

                        {job.tools.length !== 0 ? job.tools.map(tool => {
                            return <span className='tag' key = {nanoid()} onClick = {() => handleFilters(tool)}>{tool}</span>
                        }) : ''}
                    </div>
                </div>
            
            </div>
        )
    })


  return (
    <div className='cards'>
        { cards.map(card => card) }
    </div>
    
  )
}

export default JobCard