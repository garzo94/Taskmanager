import React from 'react'
import TasksCompletion from './TaskCompletion/index'
import TasksByCategory from "./TasksByCategory"

export default function Dashboard() {
  return (

    <div>

      <TasksCompletion/>
      <TasksByCategory/>

    </div>
    
  )
}
