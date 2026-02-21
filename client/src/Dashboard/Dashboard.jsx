import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';

import Modal from '../Modal/Modal.jsx';

import './Dashboard.css';

function Dashboard(){

    const [data, setData] = useState([]);
    
    const [isOpen, setIsOpen] = useState(false);
    
    const [modalData, setModalData] = useState({message: '', type: '', next: ''});

    const Navigate = useNavigate();

    async function fetchData(){
        const result = await axios.get('http://localhost:8080/api', {withCredentials: true});
        if(result.data == 'Login'){
            Navigate('/login');
        } else{
            setData(result.data);
        }
        
    }

    useEffect(() => {
        fetchData();
    },[])

    function handleCreateShortID(){
        Navigate('/create');
    }

    async function handleURLDelete(id){
        try{
            const result = await axios.get(`http://localhost:8080/api/delete/${id}`, {withCredentials: true});
            if(result.data == 'Login'){
                Navigate('/login');
            } else{
                setModalData({message: 'Deleted Successfully', type: 'Success', next: ''});
                setIsOpen(!isOpen);
            }
        } catch(err){
            console.error("Error: ", err);
            setModalData({message: 'Could Not Delete', type: 'Error', next: ''});
            setIsOpen(!isOpen);
        }
    }

    function handleUpdateURL(id){
        
        Navigate('/update', {state: {id: id}});
    }

    async function handleUserChange(){
        try{
            const result = await axios.post('http://localhost:8080/logout', {}, {withCredentials: true});
            Navigate('/login');
        } catch(err){
            console.error('Error:', err);
        }
    }

    return(
    <div className='dash-container'>
        {isOpen && (
            <Modal message={modalData.message} type={modalData.type} next={modalData.next}/>
        )}
        
        <button className='user-change' onClick={handleUserChange}>Log-Out</button>
        <table className='dash'>
            <thead className='dash-head'>
                <tr>
                    <th>S.No.</th>
                    <th>Short-URL</th>
                    <th>Redirect-URL</th>
                    <th>No. of Clicks</th>
                    <th>Link</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody className='dash-body'>
                {data.map((elem, index) => 
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{elem.shortId}</td>
                        <td>{elem.redirectId}</td>
                        <td>{elem.visitHistory.length}</td>
                        <td><a href={`http://localhost:8080/redirect/${elem.shortId}`}>Link</a></td>
                        <td><button className='del-btn' onClick={() => handleURLDelete(elem.shortId)}>Delete</button></td>
                        <td><button className='update-btn' onClick={() => handleUpdateURL(elem.shortId)}>Update</button></td>
                    </tr>
                )}
            </tbody>
        </table>
        <div className='btn-container'>
            <button className='create-btn' onClick={handleCreateShortID}>Create</button>
            
        </div>
    </div>
    )
}

export default Dashboard;