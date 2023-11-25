import React from "react";
import { Filters, PaginationContainer, TasksData } from "../../components";

const TaskList = () => {
  return <section className="">
    <Filters />
    <TasksData />
    <PaginationContainer />
  </section>;
};

export default TaskList;
