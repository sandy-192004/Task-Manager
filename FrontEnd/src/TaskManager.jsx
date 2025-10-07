import React from 'react'

const TaskManager = () => {
  return (
    <div>
        <form>
        <h2>Welcome ${localStorage.getItem('username')}</h2>
        <input type = "text"
        placeholder='Enter Task'/>
        <button className='btn btn-primary' type='submit'>Add</button>
        </form>

      
    </div>
  )
}

export default TaskManager
