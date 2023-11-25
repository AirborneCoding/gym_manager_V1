import { useEffect, useState } from "react";
import { customFetch } from "./index";


const useLocalState = () => {

 const [isLoading, setIsLoading] = useState(true);
 const [user, setUser] = useState(null);

 
 const saveUser = (user) => {
  setUser(user);
 };
 const removeUser = () => {
  setUser(null);
 };
 
 const fetchUser = async () => {
  try {
   const { data } = await customFetch.get("/users/showMe");
   saveUser(data.user);
  } catch (error) {
   removeUser();
  }
  setIsLoading(false);
 };


 const logoutUser = async () => {
  try {
   await customFetch.get('/auth/logout');
   removeUser();
  } catch (error) {
   console.log(error);
  }
 };

 useEffect(() => {
  fetchUser();
 }, []);

 return {
  isLoading,
  setIsLoading,
  setUser,
  user,
  saveUser,
  fetchUser,
  logoutUser
 };
};


export default useLocalState;
