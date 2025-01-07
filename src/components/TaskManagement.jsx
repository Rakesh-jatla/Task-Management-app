import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";
import TaskFilter from "./TaskFilter";
import api from "../services/api";
import { toast } from "react-toastify";
import TaskItem from "./TaskItem";

const TaskMangement = () => {
  // state for mangaging the tasks filter toggeling etc
  const [tasks, setTasks] = useState([]);
  const [filterTask,setFilterTask]=useState([]);
  const [filter,setFilter]=useState('All')
  const [highlightedTask,setHighlightedTask]=useState(null)
  

  // fetching the Data Form the Servers
  useEffect(() => {
    api
      .get("/tasks")
      .then(({ data }) => setTasks(data))
      .catch((err) => toast.error("error in fecthing the data"));

    // cleanup phase
    return () => {};
  }, [tasks]); //reterive the data only once from the server and at newtask updates at initial Load

  // function to create The Task
  let addTask = (text, priority) => {
    // console.log(text, priority);
    let newtask = { text, completed: false, priority };
    api
      .post("/tasks", newtask)
      .then(({ data }) => {
        const updatedTasks = [...tasks, data];
        setTasks(updatedTasks);

        // Reapply the filter after adding new task

        if (filter === 'All') {
          setFilterTask(updatedTasks);
        } else if (filter === 'Completed') {
          setFilterTask(updatedTasks.filter((task) => task.completed));
        } else if (filter === 'Pending') {
          setFilterTask(updatedTasks.filter((task) => !task.completed));
        }
        toast.success("NewTask added to your List");
      })
      .catch((err) => toast.error("failed to add the Newtask 😮"));
  };

  // function to edit The task
  let editTask = (id,text,priority) => {
    //  console.log(id,text,priority)
     const editedTask={ text, completed: false, priority };
     api.put(`/tasks/${id}`,editedTask)
     .then(({ data }) => {
      const updatedTasks = tasks.map((task) => (task.id === id ? data : task));
        setTasks(updatedTasks);
      // setTasks(tasks.map(task=>task.id===id?data:task));

      // Reapplying the filters after edited the task

      if (filter === 'All') {
        setFilterTask(updatedTasks);
      } else if (filter === 'Completed') {
        setFilterTask(updatedTasks.filter((task) => task.completed));
      } else if (filter === 'Pending') {
        setFilterTask(updatedTasks.filter((task) => !task.completed));
      }
      toast.success(" Task Edited Successfully to your List");
     })
     .catch((err) => toast.error("failed to edit the Newtask"));
  };

  
  // function to delete the task
  let deleteTask = (id) => {
    // console.log(id)
    api.delete(`/tasks/${id}`)
    .then(() => {
      // setTasks(tasks.filter(task=>task.id!==id));

      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      if (filter === 'All') {
        setFilterTask(updatedTasks);
      } else if (filter === 'Completed') {
        setFilterTask(updatedTasks.filter((task) => task.completed));
      } else if (filter === 'Pending') {
        setFilterTask(updatedTasks.filter((task) => !task.completed));
      }

      toast.success("Deleted task in your List");
     })
     .catch((err) => toast.error("failed to delete the task"));
  };
  // function to filter the task
  function handleFilter(filterType){
    setFilter(filterType)
    if(filterType === 'All'){
      setFilterTask(tasks)
    }else if (filterType === 'Completed'){
      setFilterTask(tasks.filter((task)=>task.completed))
    } else if (filterType === "Pending"){
      setFilterTask(tasks.filter((task)=>!task.completed))
    }
  }

  // function to search the task

  function handleSearch(query){
    if(query.trim()===''){
      setFilterTask(tasks)
    }else{
      setFilterTask(
        tasks.filter((task)=>
          task.text.toLowerCase().includes(query.toLowerCase())
      ))
    }
   }


  return (
    <div className="container my-2 p-2">
      {/* Search Functionality start */}
      <div className="search-functionality ">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-8 col-lg-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-4">
            <TaskFilter filter={filter} onsetFilter={handleFilter} />
          </div>
        </div>
      </div>
      {/* search functionality end */}
      <TaskForm onaddTask={addTask} />

      {/* displaying the Tasks fetched From Database and tasks added or edited or filtered */}
      <ul className='list-group  '>
        {filterTask.map((task)=>(
          <TaskItem
          key={task.id}
          task={task}
          oneditTask={editTask}
          ondeleteTask={deleteTask}
          // onToggleComplete={toggleCompleteTask}
          isHighlighted={highlightedTask === task.id} // pass highlight state
          onClick={()=> setHighlightedTask(task.id)} // set highlight
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskMangement;