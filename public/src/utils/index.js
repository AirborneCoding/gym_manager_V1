import { toast } from "react-toastify";
export function displayToast(message, type) {
 const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
 };

 switch (type) {
  case "success":
   toast.success(message, toastConfig);
   break;
  case "warn":
   toast.warn(message, toastConfig);
   break;
  case "error":
   toast.error(message, toastConfig);
   break;
  default:
   toast.info(message, toastConfig);
   break;
 }
}


import axios from "axios"
const developmentUrl = "/api/v1"
export const customFetch = axios.create({
 baseURL: developmentUrl,
});


export const getUniqueMembershipType = (clients) => {
  return [
    'all',
    ...new Set(clients.map((client) => client.membershipType)),
  ];
};

export const getUniqueGender = (clients) => {
  return [
    'all',
    ...new Set(clients.map((client) => client.gender)),
  ];
};

export const getStaticMembershipType = (clients) => {
  return clients.map((client) => client.membershipType)
};

export const getStaticgender = (clients) => {
  return clients.map((client) => client.gender);
};



export const membershipTypeArray = [
  { membershipType: "Musculation" },
  { membershipType: "Cardio", },
  { membershipType: "Musculation + Cardio", }
];

