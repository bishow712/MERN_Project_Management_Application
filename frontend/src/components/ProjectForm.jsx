import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {createProject} from '../features/projects/projectSlice'

function ProjectForm() {
    const [projectName, setProjectName] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) =>{
        e.preventDefault()

        dispatch(createProject({projectName}))
        setProjectName('')
    }

  return (
    <section className="form">
        <form action="" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Project</label>
                <input type="text" name='projectName' id='projectName' value={projectName} onChange={(e)=>setProjectName(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>Add Project</button>
            </div>
        </form>
    </section>
  )
}

export default ProjectForm