
import React from 'react';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => {
      return s+p.exercises
    }, 0)
    return(
      <strong><p>total of {total} exercises</p></strong>
    ) 
  }
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {
          course.parts.map((part) => 
            <Part part={part} key={part.id} />
          )
        }
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course