import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask"; // for rendering Task Add Form
import TaskCard from "../components/TaskCard"; // for rendering Task List
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectDetailsPage() {
  const params = useParams();
  console.log(params);

  const [details, setDetails] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/projects/${
          params.projectId
        }?_embed=tasks`
      );
      console.log(response.data);

      setDetails(response.data);
    } catch (error) {
      console.log(error); //poner página de error
    }
  };

  if (details === null) {
    return <h3>... buscando detalles</h3>;
  }
  return (
    <div className="ProjectDetailsPage">
      <div>
        <h1>{details.title}</h1>
        <p>{details.description}</p>
      </div>

      {/* ... list of all Tasks for this Project should be rendered here */}
      {details.tasks.map((eachTask) => {
        return <TaskCard key={eachTask.id} eachTask={eachTask} />;
      })}

      {/* example of a single TaskCard being rendered */}
      {/* <TaskCard /> */}

      {/* ... form for adding a new Task should be rendered here    */}
      <AddTask projectId={details.id} getData={getData} />

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${details.id}`}>
        <button>Edit Project</button>
      </Link>
    </div>
  );
}

export default ProjectDetailsPage;
