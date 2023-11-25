import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import {
  Home,
  Login,
  Register,
  About,
  Dashboard,
  TaskList,
  ClientsForms,
  Settings,
  Error,
  Stats,
} from "./pages"

import { store } from "./redux/store.js"
import {
  actionRegister as actionRegister,
  // actionUpdateUser as actionUpdateUser
  changeUserActions as changeUserActions
} from "./redux/api/authApiCall"

import {
  loaderTasks as loaderTasks,
  loaderStats as loaderStats,
  addEditClientAction as addEditClientAction,
  // actionUpdatePassword as actionUpdatePassword,

} from "./redux/api/clientsApiCall"
import { useGlobalContext } from "./Context";

// const { user, isLoading } = store.getState().auth

const App = () => {
  const { user } = useGlobalContext()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: !user ? <Register /> : < Navigate to="/" />,
      action: actionRegister()
    },
    {
      path: "/login",
      element: !user ? <Login /> : < Navigate to="/dashboard" />,
    },
    {
      path: "/dashboard",
      element: user ? <Dashboard /> : <Navigate to="/" />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Stats />,
          loader: loaderStats(store)
        },
        {
          path: "all-clients",
          element: <TaskList />,
          loader: loaderTasks(store),
        },
        {
          path: "add-client",
          element: <ClientsForms />,
          action: addEditClientAction(store),
        },
        {
          path: "profile",
          element: <Settings />,
          action: changeUserActions(store),
        },
        // Stats
      ]
    },
    {
      path: "/about",
      element: <About />,
    },
  ])

  return <RouterProvider router={router} />
};

export default App;
