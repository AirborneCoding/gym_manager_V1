import React, { useState } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import moment from "moment"
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

    const [selectedTasks, setSelectedTasks] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleCheckboxChange = (clientID) => {
        if (selectedTasks.includes(clientID)) {
            setSelectedTasks(selectedTasks.filter(_id => _id !== clientID));
        } else {
            setSelectedTasks([...selectedTasks, clientID]);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedTasks([]);
        } else {
            const allclientIDs = clients.map(item => item._id);
            setSelectedTasks(allclientIDs);
        }
        setSelectAll(!selectAll);
    };

    // console.log(selectedTasks);

    return (
        <div className="overflow-x-auto">
            <table className="table table-pin-rows  bg-white">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>membership Type</th>
                        <th>gender</th>
                        <th>Registartion Date</th>
                        <th>isMonthEnd</th>
                        {/* <th>Actions</th> */}

                    </tr>
                </thead>

                <tbody>
                    {clients.map((item) => {
                        const date = moment(item?.registrationDate).format('L');
                        return <tr key={item._id}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox"
                                        checked={selectedTasks.includes(item._id)}
                                        onChange={() => handleCheckboxChange(item._id)}
                                    />
                                </label>
                            </th>
                            <td>
                                {item?.name}
                            </td>
                            <td>
                                {item?.membershipType}
                            </td>
                            <td>
                                {item?.gender}
                            </td>
                            <td>
                                {date}
                            </td>
                            <td className={!item?.isMonthEnd === true ? "text-green-500" : "text-red-500"}>{!item?.isMonthEnd ? 'Member' : 'End'}</td>
                            <td className="flex space-x-2 justify-end">
                                {
                                    item?.isMonthEnd && <button onClick={() => handleClientPayed(item._id)} className="btn btn-xs">Payed</button>
                                }
                                <button onClick={() => handleEdit(item._id, { ...item })}>
                                    <FaEdit className="text-success" />
                                </button>
                                <button onClick={() => hendleDelete(item?._id)}>
                                    <FaTrash className="text-red-600" />
                                </button>

                            </td>
                            {/* <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th> */}
                        </tr>
                    })}
                </tbody>
            </table >
        </div >
    )
};

export default TasksTable;