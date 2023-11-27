import { useState } from "react";
import axios from "axios"
import { LOGIN_URL, NAME_KEY } from "../hooks/config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../services/auth/authContext";
import { useEffect } from "react";

const Login = () => { 
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [validName ,setValidName] = useState(false);
    const navigate = useNavigate(); 
    const {signIn,userToken} = useContext(AuthContext)
    async function submitFnc (e){
        e.preventDefault();
        validName && axios.post(LOGIN_URL,{password:password}).then((e)=>{
            if(e.status === 401){
                return alert("Invalid Password");
            }   
        signIn(e.data.token)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            navigate("/home");
            console.log(userToken)
        })
    }
    useEffect(()=>{
        setValidName(name === NAME_KEY)
    },[name])
    return(
        <div className="loginContainer">
            <div className="formContainer">
                <form className="form">
                    <input type="text" placeholder="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                    <input type="password" placeholder="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <input type="submit" id="submit" onClick={submitFnc}/>
                </form>

            </div>

        </div>
    )
}
export default Login