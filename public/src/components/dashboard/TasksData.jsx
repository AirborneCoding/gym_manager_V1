import React, { useState, useEffect } from "react";
import { FaTable, FaTh } from 'react-icons/fa';
import TasksTable from "./TasksTable";
import TasksCard from "./TasksCard";
import Loading from "../temp/Loading"
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

const TasksData = () => {
 let { clientsUI, count } = useSelector(state => state.clients);
 const [viewMode, setViewMode] = useState("card");

 const navigation = useNavigation()
 const isPageLoading = navigation.state === "loading"

 useEffect(() => {
  const savedViewMode = localStorage.getItem("viewMode");
  if (savedViewMode) {
   setViewMode(savedViewMode);
  }
 }, []);

 const renderTasks = () => {
  if (clientsUI.length === 0) {
   return (
    <div className="flex flex-col items-center">
     <p className="text-white font-bold text-3xl mt-32">
      No Clients found.
     </p>
    </div>
   );
  }

  if (viewMode === "table") {
   return <TasksTable clients={clientsUI} />;
  } else if (viewMode === "card") {
   return <TasksCard clients={clientsUI} />;
  }
 };

 const handleViewModeChange = newViewMode => {
  setViewMode(newViewMode);
  localStorage.setItem("viewMode", newViewMode);
 };

 return (
  <main className="my-16">
   <div className="flex justify-start items-center mb-4">
    <button
     className={`mr-2 ${viewMode === "table" ? "text-primary" : "text-secondary"}`}
     onClick={() => handleViewModeChange("table")}
    >
     <FaTable className="mr-1" size={25} />
    </button>
    <button
     className={`${viewMode === "card" ? "text-primary" : "text-secondary"}`}
     onClick={() => handleViewModeChange("card")}
    >
     <FaTh className="mr-1" size={25} />
    </button>
    <h3 className="text-xl ml-3"><span className="font-bold text-green-500">{count}</span> tasks found</h3>
   </div>

   {isPageLoading ? (
    <Loading />
   ) : (
    renderTasks()
   )}
  </main>
 );
};

export default TasksData;
