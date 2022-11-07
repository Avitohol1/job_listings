import './App.css'
import { useState, useEffect, useCallback } from 'react'
import JobList from './Components/JobList'
import Filters from './Components/Filters'
import data from './data.json'
import header_background_desktop from './images/bg-header-desktop.svg'
import header_background_mobile from './images/bg-header-mobile.svg'
import { RingLoader } from "react-spinners"

function App() {

  // Checking if display is mobile so that the correct header background is used
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
      setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = screenWidth <= 768;

  const background = isMobile ? header_background_mobile : header_background_desktop;

  // Filter the jobs based on given tags
  const filterJobs = (data) => {
    return data.filter(job => {
      // Joining all tags together so that we can filter more easily
      const jobTags = [job.role, job.level, ...job.languages || [], ...job.tools || []]
      return filters.every(filter => jobTags.includes(filter))
    })
  }

  // States for the filters (tags) and jobs
  const [filters, setFilters] = useState([])
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState(null)

  const handleFilters = useCallback((tag) => {
    // Check if tag exists in filters array
    if(filters.indexOf(tag) === -1) {
      // Add tag to filter array
      setFilters(prevValue => [...prevValue, tag])
    }
  }, [filters])
    

  // Clear a filter
  const clearFilter = (tag) => {
    setFilters(filters.filter(item => item !== tag))
  }

  // Clear everything from filters array
  const clearAll = () => {
    setFilters([])
  }

  useEffect(() => {
    // Set the filtered jobs
    if(jobs.length === 0) {
      const timeOut = setTimeout(() => {
        setIsLoading(true)
        setJobs(() => filterJobs(data))
      }, 3000)
          
      return () => {
        clearTimeout(timeOut)
        setIsLoading(false)
      }
    }

    else {
      setJobs(() => filterJobs(data))
    }
  }, [filters])

  useEffect(() => { 
    if(isLoading) {
      setContent( <div className="loader">
                    <RingLoader
                      color="hsl(180, 29%, 50%)"
                      loading={isLoading}
                      size={50}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                )
    }

    if(jobs.length > 0) {
      setContent( <JobList jobs = {jobs} handleFilters = {handleFilters} /> )
    }
  }, [isLoading, jobs])


  return (
    <main>
      <header style = { {backgroundImage:  `url(${background})`} } />

      { filters.length !== 0 
        && <Filters 
              filters = {filters} 
              clearAll = {clearAll} 
              clearFilter = {clearFilter} 
            /> 
      }
        
      { content }

      <footer>
        Created by <a href='https://github.com/Avitohol1' target='_blank' rel='noreferrer'>Rosen Ivanov</a>
      </footer>
    </main>
  );
}

export default App;
