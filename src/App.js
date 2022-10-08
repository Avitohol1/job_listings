import './App.css';
import { useState, useEffect } from 'react'
import JobCard from './Components/JobCard'
import Filters from './Components/Filters'
import data from './data.json'
import header_background_desktop from './images/bg-header-desktop.svg'
import header_background_mobile from './images/bg-header-mobile.svg'

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
  const [jobs, setJobs] = useState(filterJobs(data))

  

  const handleFilters = (tag) => {
    // Check if tag exists in filters array
    if(filters.indexOf(tag) === -1) {
      // Add tag to filter array
      setFilters(prevValue => [...prevValue, tag])
    }
  }

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
    setJobs(filterJobs(data))
  }, [filters])
  


  return (
    <main>

      <header style = { {backgroundImage:  `url(${background})`} }> </header>

      { filters.length !== 0 
        && <Filters 
              filters = {filters} 
              clearAll = {clearAll} 
              clearFilter = {clearFilter} 
            /> 
      }
      <JobCard 
        jobs = {jobs} 
        handleFilters = {handleFilters}
      />

    <footer>
      Created by <a href='https://github.com/Avitohol1' target='_blank' rel='noreferrer'>Rosen Ivanov</a>
    </footer>
    </main>
  );
}

export default App;
