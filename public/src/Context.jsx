import React, { useContext, useState, useEffect } from 'react';
import { customFetch, displayToast } from './utils';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
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
   const { data } = await customFetch.get(`/users/showMe`);
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


 const deleteUser = async () => {
  try {
   await customFetch.delete(`/users/deleteUser`);
   removeUser();
   displayToast('you account has deleted', 'success');
  } catch (error) {
   console.log(error);
  }
 }

 useEffect(() => {
  fetchUser();
 }, []);

 return (
  <AppContext.Provider
   value={{
    isLoading,
    saveUser,
    user,
    logoutUser,
    deleteUser
   }}
  >
   {children}
  </AppContext.Provider>
 );
};
// make sure use
export const useGlobalContext = () => {
 return useContext(AppContext);
};

export { AppProvider };
