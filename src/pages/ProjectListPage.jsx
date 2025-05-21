import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"; // used to render each Project
import { useEffect, useState } from "react";
import axios from "axios";
function ProjectListPage() {
  const [allProjects, setAllProjects] = useState(null); //...asique la almacenamos en allprojects

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/projects`)
      .then((response) => {
        console.log(response); //recibimos la data...
        setAllProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (allProjects === null) {
    return <h3>.. buscando Project</h3>;
  }

  return (
    <div className="ProjectListPage">
      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>

      {/* ... list of all projects should be rendered here   */}
      {allProjects.map((eachProject) => {
        return <ProjectCard key={eachProject.id} eachProject={eachProject} />;
      })}

      {/* ... for each project, we should render one ProjectCard */}
    </div>
  );
}

export default ProjectListPage;
