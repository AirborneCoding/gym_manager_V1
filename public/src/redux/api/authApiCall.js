import { customFetch, displayToast } from "../../utils"
import { redirect } from "react-router-dom"

// register
export const actionRegister =
  (store) =>
    async ({ request }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      try {
        const response = await customFetch.post("auth/register", data);
        displayToast(response.data.msg, "success")
        return redirect('/login');
      } catch (error) {
        console.log(error);
        const errorMessage =
          error?.response?.data?.msg ||
          'Something went , Please try again';
        displayToast(errorMessage, "success")
        return null;
      }
    }


// updateUser 
// TODO add email
export const actionUpdateUser =
  (store) =>
    async ({ request }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      try {
        const response = await customFetch.patch("/users/updateUser", data);
        displayToast(response.data.msg, "success")
        return redirect('/dashboard');
      } catch (error) {
        console.log(error);
        const errorMessage =
          error?.response?.data?.msg ||
          'Something went , Please try again';
        displayToast(errorMessage, "warning")
        return null;
      }
    }


// updateUserPassword
export const actionUpdatePassword =
  (store) =>
    async ({ request }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      try {
        const response = await customFetch.put("/users/updateUserPassword", data);
        displayToast(response.data.msg, "success")
        return redirect('/dashboard');
      } catch (error) {
        console.log(error);
        const errorMessage =
          error?.response?.data?.msg ||
          'Something went , Please try again';
        displayToast(errorMessage, "warning")
        return null;
      }
    }




export const changeUserActions = (store) => async ({ request }) => {

  const formData = await request.formData()
  let intent = formData.get("intent");

  const data = Object.fromEntries(formData)

  if (intent == "userInfo") {
    try {
      const response = await customFetch.patch("/users/updateUser", data);
      displayToast(response.data.msg, "success")
      return redirect('/dashboard');
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.msg ||
        'Something went , Please try again';
      displayToast(errorMessage, "warning")
      return null;
    }
  }

  if (intent == "userPassword") {
    try {
      const response = await customFetch.put("/users/updateUserPassword", data);
      displayToast(response.data.msg, "success")
      return redirect('/dashboard');

    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.msg ||
        'Something went , Please try again';
      displayToast(errorMessage, "warning")
      return null;
    }
  }
}

// delete client
export function deleteUser() {
  return async () => {
    try {
      await customFetch.delete(`deleteUser`);
      displayToast('task deleted', 'success');
    } catch (error) {
      console.log(error);
    }
  };
}