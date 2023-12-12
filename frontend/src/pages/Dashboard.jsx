import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import ProjectForm from '../components/ProjectForm'
import Spinner from '../components/Spinner'
import { getProjects, reset } from "../features/projects/projectSlice"
import ProjectItem from "../components/ProjectItem"


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user} = useSelector((state) => state.auth)
  const {projects, isLoading, isError, message} = useSelector((state) => {
    return state.project
  })

  useEffect(()=>{
    if(isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getProjects())

    //When you want to return smth when the component unmounts then return from useEffect (Here clear the projects when we leave Dashboard)
    return () =>{
      dispatch(reset())
    }
  }, [user, navigate, dispatch, isError, message])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Projects Dashboard</p>
      </section>

      <ProjectForm/>

      <section className="content">
        {projects.length>0 
        ? (<div className="projects">
          {projects.map((project)=>(
            <ProjectItem key={project._id} project={project} />
          ))}
        </div>)
        : (<h3>You donot have any projects yet.</h3>)}
      </section>
    </>
  )
}

export default Dashboard