function TaskCard(props) {
  return (
    <div className="TaskCard card">
      <h3>{props.eachTask.title}</h3>
      <h4>Description:</h4>
      <p>{props.eachTask.description}</p>
    </div>
  );
}

export default TaskCard;
