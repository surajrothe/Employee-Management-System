import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({empemail: "", emppassword: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({empemail: credentials.empemail, emppassword: credentials.emppassword})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container">
            <div className="form login">
                <span className="title">Login</span>
                <form  onSubmit={handleSubmit}>
                  <div className="input-field">
                    <input type="text" value={credentials.empemail} onChange={onChange} id="empemail" name="empemail" placeholder="Enter your email" required/>
                    <i className="uil uil-envelope icon"></i>
                  </div>
                  <div className="input-field">
                    <input type="password" className="password" value={credentials.emppassword} onChange={onChange} name="emppassword" id="emppassword" placeholder="Enter your password" required/>
                    <i className="uil uil-lock icon"></i>
                    <i className="uil uil-eye-slash showHidePw"></i>
                  </div>

                  <div className="checkbox-text">

                    <a href="/" className="text">Forgot password?</a>
                  </div>

                  <div className="input-field button">
                  <button type="submit" className="btn btn-primary">Submit</button>
                    {/* <input type="submit" value="submit"/> */}
                  </div>
                </form>
              </div>
        </div>
    
  )
}

export default Login
