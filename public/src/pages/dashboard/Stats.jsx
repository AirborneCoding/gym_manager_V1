import React from "react";

import {
 ClientSatistics, ClientCharts, Loading
} from "../../components"
import { useLoaderData, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

const Stats = () => {
 const { clientsData, monthlyMoneyData } = useLoaderData()
 // const { monthlyMoneyData } = useSelector(state => state.clients)
 console.log(monthlyMoneyData);
 const navigation = useNavigation()
 const isPageLoading = navigation.state === "loading"
 // console.log({ clientsData, monthlyMoneyData });
 return <>
  {
   isPageLoading ? (
    <Loading />
   ) : (
    <>
     <ClientSatistics clientsData={clientsData} />
     <hr className="my-5" />
     <ClientCharts clientsData={clientsData} monthlyMoneyData={monthlyMoneyData} />
    </>
    // <>
    //  {
    //   monthlyMoneyData.length > 0 && (
    //    <>
    //     <ClientSatistics clientsData={clientsData} />
    //     <hr className="my-5" />
    //     <ClientCharts clientsData={clientsData} monthlyMoneyData={monthlyMoneyData} />
    //    </>
    //   )
    //  }
    // </>
   )
  }
 </>
};

export default Stats;
