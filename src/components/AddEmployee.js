import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./AddEmployee.css";
import Navbar from './Navbar';
const AddEmployee = () => {

    const [credentials, setCredentials] = useState({empname: "", empemail: "", empcontact: "", empdept: "", empjoin: "", emppassword: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {empname,empemail,empcontact,empdept,empjoin,emppassword} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({empname,empemail,empcontact,empdept,empjoin,emppassword})
        });
        const json = await response.json()
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/");

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
        <Navbar />
            <div className="add-container">
                <h3 className="text-center">ADD New Employee Details:</h3>
                <br/>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="empname" className="col-sm-2 col-form-label">Employee Name:</label>
                        <div className="col-sm-10 padding-align">
                            <input type="text" className="form-control" id="empname" name="empname" onChange={onChange} placeholder="Enter Employee's Full Name"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="empemail" className="col-sm-2 col-form-label">Employee Email:</label>
                        <div className="col-sm-10 padding-align">
                            <input type="email" className="form-control" id="empemail" name="empemail" onChange={onChange} placeholder="Enter Employee Email Id"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="empcontact" className="col-sm-2 col-form-label">Employee Contact:</label>
                        <div className="col-sm-10 padding-align">
                            <input type="text" className="form-control" id="empcontact" name="empcontact" onChange={onChange} placeholder="Enter Employee's Contact Number"/>
                        </div>
                    </div>
                    <div className="row md-3">
                        <label htmlFor="empdept" className="col-sm-2 col-form-label">Select Department:</label>
                        <div className="col-sm-10 padding-align">
                            <select id="empdept" name="empdept" onChange={onChange} className="form-select">
                                <option>Select Department</option>
                                <option>HR Department</option>
                                <option>Lab Department</option>
                                <option>Production Department</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div className="row mb-3">
                        <label htmlFor="empjoin" className="col-sm-2 col-form-label">Date of Joining:</label>
                        <div className="col-sm-10 padding-align">
                            <input type="date" className="form-control" id="empjoin" name="empjoin" onChange={onChange} placeholder="Employee's Date of Joining as DD-MM-YYYY"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="emppassword" className="col-sm-2 col-form-label">Employee Password:</label>
                        <div className="col-sm-10 padding-align">
                            <input type="password" className="form-control" id="emppassword" name="emppassword" onChange={onChange} placeholder="Enter Password for Employee"/>
                        </div>
                    </div>


                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary me-md-2 linear-bg-btn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddEmployee
