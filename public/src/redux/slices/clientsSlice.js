import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 clientsUI: [],
 client: null,
 isEdit: { state: false, id: null, item: {} },
 count: null,
 monthlyMoneyData: [],
}

const authSlice = createSlice({
 name: "client",
 initialState,
 reducers: {
  setClientsUI(state, action) {
   state.clientsUI = action.payload
  },
  addClientUI(state, action) {
   state.clientsUI.push(action.payload);
  },
  deleteClientUI: (state, action) => {
   state.clientsUI = state.clientsUI.filter((c) => c._id !== action.payload);
  },
  updateClientUI: (state, action) => {
   const updatedClient = action.payload;
   state.clientsUI = state.clientsUI.map((c) =>
    c._id === updatedClient._id ? { ...updatedClient } : c
   );
  },
  setSingleClient(state, action) {
   state.client = action.payload
  },
  setIsEdit(state, action) {
   state.isEdit.state = action.payload.state;
   state.isEdit.id = action.payload.id;
   state.isEdit.item = action.payload.item;
  },
  setCount(state, action) {
   state.count = action.payload
  },
  setShowMonthlyMoney(state, action) {
   state.monthlyMoneyData = action.payload;
  }
 }
})


export const {
 setClientsUI,
 addClientUI,
 deleteClientUI,
 updateClientUI,
 setSingleClient,
 setIsEdit,
 setCount,
 setShowMonthlyMoney,
} = authSlice.actions

export default authSlice.reducer