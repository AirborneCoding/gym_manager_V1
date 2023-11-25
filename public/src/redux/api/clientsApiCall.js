import { customFetch, displayToast } from "../../utils"
import { redirect } from "react-router-dom"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addClientUI, deleteClientUI, setClientsUI, setCount, setIsEdit, updateClientUI, setShowMonthlyMoney } from "../slices/clientsSlice";



const url = "/client"
// load clients
export const loaderTasks = (store) => async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])

  const res = await customFetch.get(`${url}`, {
    params
  })

  const clients = res.data.clients
  const pagination = res.data.pagination

  store.dispatch(setClientsUI(clients))
  store.dispatch(setCount(pagination.total))

  return { clients, params, pagination }
}

// load clients stats
export const loaderStats = (store) => async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])

  const res1 = await customFetch.get(`${url}/clientsData`, {
    params
  })
  const res2 = await customFetch.get(`${url}/moneyData`, {
    params
  })

  const clientsData = res1.data.clientStats
  const monthlyMoneyData = res2.data.monthlyMoneyData

  store.dispatch(setShowMonthlyMoney(monthlyMoneyData))

  return { clientsData, monthlyMoneyData }
}

// add && edit client

// ** edit and add action
export const addEditClientAction = (store) => async ({ request }) => {

  const formData = await request.formData()
  let intent = formData.get("intent");

  const data = Object.fromEntries(formData)

  if (data.hasOwnProperty('isMonthEnd')) {
    data.isMonthEnd = data.isMonthEnd === 'on';
  }

  const insertedData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => key !== 'clientID')
  );

  // get id
  // console.log({ id: data.clientID, type: typeof data.clientID });

  // clear dara
  function clearObjectValues(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = '';
      } else if (typeof obj[key] === 'boolean' && obj[key] === false) {
        obj[key] = '';
      }
    }
  }

  if (intent == "add") {
    try {
      const res = await customFetch.post(url, data)
      const newClient = res.data.client

      store.dispatch(addClientUI(newClient))
      displayToast("client added", "success");
      // return redirect("/dashboard/all-clients")
      return null
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg ||
        'please double check your credentials';

      displayToast(errorMessage, "error");
      // console.log(error);
      return null
    }
  }

  if (intent == "edit") {
    try {
      const res = await customFetch.patch(`client/${data.clientID}`, insertedData);
      const editedClient = res.data.client;
      store.dispatch(updateClientUI(editedClient))
      store.dispatch(setIsEdit(false))
      displayToast("client updated", "success");
      clearObjectValues(data);
      return redirect("/dashboard/all-clients")

    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg ||
        'please double check your credentials';

      displayToast(errorMessage, "error");
      // console.log(error);

      return null
    }
  }
}

// delete client
export function deleteClient(clientID) {
  return async (dispatch, getState) => {
    try {
      await customFetch.delete(`${url}/${clientID}`);
      dispatch(deleteClientUI(clientID))
      dispatch(setCount(getState().clients.count - 1));
      displayToast('client deleted', 'success');
    } catch (error) {
      console.log(error);
    }
  };
}

// update is client payed
export function isClientPayed(clientID) {
  return async (dispatch, getState) => {
    try {
      await customFetch.put(`${url}/updateMonth/${clientID}`);
      displayToast('client deleted', 'success');
    } catch (error) {
      console.log(error);
    }
  };
}