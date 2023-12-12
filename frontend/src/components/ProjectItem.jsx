import React from 'react'
import { useDispatch } from 'react-redux'
import {deleteProject} from '../features/projects/projectSlice'


function ProjectItem({project}) {
  const dispatch = useDispatch()

  return (
    <div className="goal">
        <div>
            {new Date(project.createdAt).toLocaleString('en-US')}
        </div>
        
        <h2>{project.projectName}</h2>

        <button onClick={()=>{ dispatch(deleteProject(project._id)) }} className="close">X</button>
    </div>
  )
}

export default ProjectItem