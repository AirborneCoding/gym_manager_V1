import React, { useState } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import moment from "moment"

// actions
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setIsEdit } from "../../redux/slices/clientsSlice";
import { deleteClient, isClientPayed } from "../../redux/api/clientsApiCall";

const TasksTable = ({ clients }) => {

    const dispatch = useDispatch()

    const hendleDelete = (clientID) => {
        dispatch(deleteClient(clientID))
    }

    const navigate = useNavigate()
    const handleEdit = (clientID, item) => {
        dispatch(setIsEdit({ state: true, id: clientID, item: item }))
        navigate("/dashboard/add-client")
    }

    const handleClientPayed = (clientID) => {
        dispatch(isClientPayed(clientID))
        navigate("/dashboard/all-clients")
    }

    return (
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-5 ">
            {
                clients.map((item) => {
                    const date = moment(item?.registrationDate).format('L')
                    // const currentDate = new Date();
                    // const registrationDate = new Date(item?.registrationDate);
                    // const differenceInMilliseconds = currentDate - registrationDate;
                    // const differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);
                    // const oneMonthInDays = 30;
                    // const isMoreThanOneMonth = differenceInDays > oneMonthInDays;
                    return <div key={item._id} className="card bg-base-100  shadow-xl">
                        <div className="card-body space-y-2">
                            <h2 className="card-title">
                                {/* {item?.name} */}
                                {/* <div className="badge badge-secondary">NEW</div> */}
                                <p>
                                    <span className="font-bold text-sky-500 capitalize">Name : </span>
                                    {item?.name}
                                </p>
                                {
                                    item?.isMonthEnd && (
                                        <>
                                            <div className="badge badge-danger bg-red-500">End</div>

                                        </>
                                    )
                                }
                                {/* {
                                    isMoreThanOneMonth && (
                                        <>
                                            <div className="badge badge-danger bg-red-500">End</div>

                                        </>
                                    )
                                } */}
                            </h2>
                            <div className="space-y-3">
                                <p>
                                    <span className="font-bold text-sky-500 capitalize">membershipType : </span>
                                    {item?.membershipType} ({item?.money} DH)
                                </p>
                                <p>
                                    <span className="font-bold text-sky-500 capitalize">date : </span>
                                    {date}
                                </p>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                {/* <flex className="flex justify-between"> */}
                                <span className="font-bold text-sky-500 capitalize">Actions : </span>
                                {/* <button className="badge badge-outline">Details</button> */}
                                <div className="space-x-3 flex items-center">
                                    {
                                        item?.isMonthEnd && <button
                                            onClick={() => handleClientPayed(item._id)}
                                            className="btn btn-xs">Payed</button>
                                    }
                                    <button
                                        onClick={() => handleEdit(item._id, { ...item })}>
                                        <FaEdit className="text-success" /></button>
                                    <button
                                        onClick={() => hendleDelete(item._id)}>
                                        <FaTrash className="text-red-600" />
                                    </button>
                                </div>
                                {/* </flex> */}
                            </div>
                        </div>
                    </div>
                })
            }
        </div >
    );
};

export default TasksTable;
