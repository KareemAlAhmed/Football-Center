import React, { useEffect, useState } from 'react'
import "./Auth.css"
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
// import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
import { useNavigate, useParams } from 'react-router-dom';
// import  FacebookLogin  from 'react-facebook-login';
// import FacebookLogin from '@greatsumini/react-facebook-login';
export default function Auth() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    // const responseFacebook = (response) => {
    //     console.log(response);
    //   }
    const {slug}=useParams();
    const [mode,setMode]=useState(slug)
    const login = useGoogleLogin({
        onSuccess: async(response)=>{
            try{
                const res=await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers:{
                            Authorization : `Bearer ${response.access_token}`
                        }
                    }
                );
                register(res.data.name,res.data.email,"81258136",res.data.picture)
                console.log(res)
            }catch(error){
                console.log(error)
            }
        }
    });
    const register=async (username=null,emailAdd=null,password=null,image_url=null)=>{
        let request;
        if(username != null){
            request= await axios.post(`${baseUrl}api/addUser`,{name:username,email:emailAdd,password,image_url})
        }else{

            request= await axios.post(`${baseUrl}api/addUser`,{name,email,password})
        }
        let result=request.data
        console.log(result)
    }


    useEffect(()=>{
        // let body=document.querySelector("body");
        // let footer=document.querySelector(".footer");
        let nav=document.querySelector(".navBar");
        let authBlock=document.querySelector(".authenticationBlock");
        // let totalLength=`${body.offsetHeight - (footer.offsetHeight + 30)}`
        if(authBlock){
            authBlock.style.height=`calc(100vh - ${nav.offsetHeight + 20}px)`
        }
        let form=document.querySelector("form");
        let line=document.querySelector(".optionSep");
        if(line){

            line.style.width=`${form.offsetWidth}px`
        }
        // calc(100vh - 290px)
    },[mode])
  return (
    <>
        <NavBar />
        <div className="authenticationBlock">
            <div className="container">
                    <div className="authenticationContent">
                        {mode === "register" ? (
                            <>
                                <h3>Join Us</h3>
                        <form action="" onSubmit={(e)=>{e.preventDefault();register()}}>
                            <div className="username">
                                <label for="name">Name :</label>  <input type="text" id='name' onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="email">
                                <label for="email">Email :</label> <input type="email" id='email' onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                            <div className="password">
                                <label for="password">Password :</label> <input type="password" id='password' onChange={(e)=>setPassword(e.target.value)} />

                            </div>
                            <input type="submit" value="Submit" className='sbtBtn' />
                        </form>

                        <div className='optionSep'></div>
 
                        <div id="customBtn" class="customGPlusSignIn" onClick={() => login()}>
                            <span class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48" class="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg></span>
                            <span class="buttonText">Sign Up With Google Account</span>
                        </div>
                        {/* <FacebookLogin
  appId="924695576361212"
  style={{
    backgroundColor: '#4267b2',
    color: '#fff',
    fontSize: '16px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
  }}
/> */}
                        <p className='hadAccount'>Already have an account? <span onClick={()=>{navigate("/auth/login");setMode("login")}}>Sign In</span></p>
                            </>
                        ) : (
                            <>
                                      <h3>Welcome back</h3>
                        <form action="" onSubmit={(e)=>{e.preventDefault();register()}}>
                            <div className="email">
                                <label for="email">Email :</label> <input type="email" id='email' onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                            <div className="password">
                                <label for="password">Password :</label> <input type="password" id='password' onChange={(e)=>setPassword(e.target.value)} />

                            </div>
                            <input type="submit" value="Submit" className='sbtBtn' />
                        </form>

                        <div className='optionSep'></div>
 
                        <div id="customBtn" class="customGPlusSignIn" onClick={() => login()}>
                            <span class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48" class="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg></span>
                            <span class="buttonText">Sign In With Google Account</span>
                        </div>
                        {/* <FacebookLogin
  appId="924695576361212"
  style={{
    backgroundColor: '#4267b2',
    color: '#fff',
    fontSize: '16px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
  }}
/> */}
                        <p className='hadAccount'>Are you new here? <span onClick={()=>{navigate("/auth/register");setMode("register")}}> Create an account</span></p>
                            </>
                        )}
                        
                    </div>

            </div>
        </div>
        <Footer />
    </>
  )
}
