import React from 'react'
import './Filters.css'
import { nanoid } from 'nanoid'

function Filters( {filters, clearAll, clearFilter} ) {
  return (
    <div className='filters__container'>
      <div className='filters'>

        {filters.map(tag => {
          return (
            <div className='filter' key={nanoid()}>
              <span>{tag}</span> 
              {/* Clear filter button */}
              <button className='filter__clear-button' onClick = {() => clearFilter(tag)}>X</button>
            </div>
          )
        })}

        <div className='filters__clear'>
          {/* Clear All button */}
          <span onClick = {() => clearAll()}>Clear</span>
        </div>

      </div>
    </div>
    
  )
}

export default Filters