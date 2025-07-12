import React, { useEffect, useState } from 'react';
import './Planner.css';
import { FaFolderMinus, FaPlus, FaCheckCircle, FaEdit, FaSave, FaTrash, FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiServices from '../../Services/apiServices';
import { toast } from 'react-toastify';


const Planner = () => {
  // State variables
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [tasks, setTasks] = useState({});
  const [newFolderName, setNewFolderName] = useState('');
  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(()=>{
    fetchPlanner()
  },[])

  const fetchPlanner=()=>{
    let formData={

    }
    apiServices.fetchAllToDo()
    .then((res)=>{
      console.log(res);
      let data=res.data.toDoData.map((el,index)=>({title:el.title, _id:el._id}))
      setFolders(res.data.toDoData)
    })
    .catch((err)=>{
      toast.error(err.message)
    })
  }

  // Folder functions
  const addFolder = () => {
    if (newFolderName.trim() && !folders.includes(newFolderName.trim())) {
      let formData={
        title:newFolderName.trim(),
        tasks:[],
        description:"test",
        userId:sessionStorage.getItem("ID")
      }
      apiServices.addToDo(formData)
      .then((res)=>{
        if(res.data.success){
          console.log(res.data.toDoData?._id);
          
            const updatedFolders = [...folders, {title:newFolderName.trim(),_id:res.data.toDoData?._id}];
            setFolders(updatedFolders);
            setTasks({ ...tasks, [newFolderName.trim()]: [] });
            setSelectedFolder(newFolderName.trim());
            setNewFolderName('');
        }else{
          toast.error(res.data.message)
        }
      })
      .catch((err)=>{
        toast.error(err.message)
      })

    }
  };



  const deleteFolder = (id) => {
    const updatedFolders = folders.filter(folder => folder !== id);
    const updatedTasks = { ...tasks };
    delete updatedTasks[id];
    
    setFolders(updatedFolders);
    setTasks(updatedTasks);
    
    if (selectedFolder === id) {
      setSelectedFolder(updatedFolders[0] || null);
    }
  };

  // Task functions
  const addTask = () => {
    if (newTaskText.trim() && selectedFolder) {
      let updatedTasks = [ ...selectedFolder.tasks ];
      updatedTasks= [...updatedTasks, newTaskText.trim()];
     
      
      updateToDo( updatedTasks)
    }
  };

  const updateToDo=(updatedTasks)=>{
     let formData={
        tasks:updatedTasks,
        _id:selectedFolder._id
      }
    apiServices.updateToDo(formData)
       .then((res)=>{
        if(res.data.success){
          setSelectedFolder({...selectedFolder, tasks:updatedTasks})
          setNewTaskText('');
        }else{
          toast.error(res.data.message)
        }
      })
      .catch((err)=>{
        toast.error(err.message)
      })
  }
  const toggleTaskComplete = (taskId) => {
    const updatedTasks = { ...tasks };
    const taskIndex = updatedTasks[selectedFolder].findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      updatedTasks[selectedFolder][taskIndex].completed = !updatedTasks[selectedFolder][taskIndex].completed;
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (taskName) => {
    let updatedTasks = [ ...selectedFolder.tasks ];
    updatedTasks = updatedTasks.filter(task => task !== taskName);
    updateToDo( updatedTasks)
    // setTasks(updatedTasks);
  };

  const startEditingTask = (task) => {
    console.log(task);
    
    setEditingTaskId(task);
    setEditingTaskText(task);
  };

  const saveEditedTask = () => {
    if (editingTaskText.trim() && selectedFolder) {
      const updatedTasks = [ ...selectedFolder.tasks ];
      const taskIndex = updatedTasks.findIndex(task => task=== editingTaskId);
      
      if (taskIndex !== -1) {
        updatedTasks[taskIndex] = editingTaskText.trim();
        updateToDo( updatedTasks)
        setEditingTaskId(null);
        setEditingTaskText('');
      }
    }
  };

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="app-container d-flex">
        {/* Mobile folders button */}
        <div className="d-md-none d-flex m-2">
          <div className="folders-text" onClick={toggleSidebar}>
            Folders <FaBars className="fs-4" />
          </div>
        </div>

        {/* Sidebar */}
        <div className={`sidebar bg-primary text-white p-3 collapse-sidebar d-md-block ${isSidebarOpen ? 'show' : ''}`}>
          <h4 className="mb-3">Folders</h4>
          <ul className="list-unstyled">
            {folders.map((folder, index) => (
              <li
                key={index}
                className={`folder-item ${selectedFolder?._id === folder?._id ? 'active-folder' : ''}`}
                onClick={() => {
                  setSelectedFolder(folder);
                  if (window.innerWidth < 768) toggleSidebar();
                }}
              >
                <span>{folder.title}</span>
                <FaFolderMinus
                  className="text-danger ms-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFolder(folder._id);
                  }}
                />
              </li>
            ))}
          </ul>

          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="New folder"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addFolder()}
            />
            <button className="btn btn-light" onClick={addFolder}>
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="main-area flex-grow-1 p-3">
          <h1 className="text-primary mb-3 text-center">Sticky Wall</h1>
          {selectedFolder && <h2 className="text-primary mb-4">{selectedFolder?.title}</h2>}

          <div className="task-grid">
            {selectedFolder && selectedFolder.tasks?.map((task) => (
              <div className="card task-card shadow-sm" key={task.id}>
                <div className="card-body">
                  {editingTaskId === task ? (
                    <input
                      className="form-control mb-2"
                      value={editingTaskText}
                      onChange={(e) => setEditingTaskText(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <div className={`task-text ${task.completed ? 'completed-task' : ''}`}>
                      {task}
                    </div>
                  )}
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <FaCheckCircle
                    title="Mark Complete"
                    className={`icon-button ${task.completed ? 'text-success' : ''}`}
                    onClick={() => toggleTaskComplete(task.id)}
                  />
                  {editingTaskId === task ? (
                    <FaSave
                      title="Save"
                      className="icon-button text-success"
                      onClick={saveEditedTask}
                    />
                  ) : (
                    <FaEdit
                      title="Edit"
                      className="icon-button"
                      onClick={() => startEditingTask(task)}
                    />
                  )}
                  <FaTrash
                    title="Delete"
                    className="icon-button text-danger"
                    onClick={() => deleteTask(task)}
                  />
                </div>
              </div>
            ))}

            {/* Add Task Card */}
            <div className="card add-task shadow-sm">
              <div className="card-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New task"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                />
                <button className="btn btn-outline-primary w-100 mt-2" onClick={addTask}>
                  <FaPlus /> Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Planner;