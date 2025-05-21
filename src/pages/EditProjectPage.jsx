import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)
      .then((response) => {
        console.log(response);
        //actualizamos los estados de los campos para que aparezca con la data actual
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch(() => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // ...updated logic should be here

    const updatedProject = {
      title,
      description,
    };
    //todo lo que viene de axios es el front comunicandose por backend--punto de contacto
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`,
        updatedProject
      );
      navigate(`/projects/${params.projectId}`); //esto es punto de contacto entre el usuario y el forntend
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = () => {
    // ...delete logic should be here
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)
      .then(() => {
        navigate("/projects");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;
