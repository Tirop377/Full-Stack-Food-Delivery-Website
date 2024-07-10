import  { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import PropTypes from 'prop-types'


const LoginPopup = ({setShowLogin}) => {
    const {url, setToken} = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Sign in")
    const [data, setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data, [name]:value}));
    }

    

    const onLogin = async (event)=>{
      event.preventDefault();
      let newUrl = url;

      if(currentState === "Login"){
        newUrl += "/api/user/login";
      }else{
        newUrl += "/api/user/register" ;
      }

      const response = await axios.post(newUrl, data);

      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      }

    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState === "Login" ? <></> : <input type="text" placeholder='Your Name' onChange={onChangeHandler} value={data.name} name='name'  required/>}
            <input type="email" placeholder='Email' onChange={onChangeHandler} value={data.email} name='email' required/>
            <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required/>
        </div>
        <button type='submit'>{currentState === "Sign in" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? <p>Create a new account? <span onClick={()=>setCurrentState("Sign in")}>Click here</span></p> : <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>}

      </form>
    </div>
  )
}

LoginPopup.propTypes = {
  setShowLogin:PropTypes.string
}

export default LoginPopup
