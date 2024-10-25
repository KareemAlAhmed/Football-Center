import React, { useEffect, useState } from 'react'
import "./Auth.css"
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
// import  FacebookLogin  from 'react-facebook-login';
// import FacebookLogin from '@greatsumini/react-facebook-login';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { LOGINGIN_USER, REGISTERING_USER } from '../../redux/user/userActions';
import { ToastContainer } from 'react-toastify';

const SignupSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('The Name is required'),
    email: Yup.string().email('Invalid email').required('The Email is required'),
    password: Yup.string()
        .min(8)
        .required("The Password is required & At least 8 characters"),
});
const LoginSchema = Yup.object({
    email: Yup.string().email('Invalid email').required("The Email is required"),
    password: Yup.string().min(8).required("The Password is required & At least 8 characters"),
});

export default function Auth() {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const userToken=useSelector(state=>state.users.userToken);
   
    const currentError=useSelector(state=>state.users.currentUserError);
    const {slug}=useParams();
    const [userRegistering,setUserRegistering]=useState(slug === "register" ? true : false)

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
                let name=res.data.name;
                let email=res.data.email;
                let password="81258136";
                let image_url=res.data.picture;

                userRegistering ? dispatch(REGISTERING_USER({name,email,password,image_url})) : 
                dispatch(LOGINGIN_USER({email,password}))
            }catch(error){
            }
        }
    });


    const formSchema = userRegistering ? SignupSchema : LoginSchema;
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: async(values) => {
            if (userRegistering) {
                dispatch(REGISTERING_USER(values))               
            }else{
                dispatch(LOGINGIN_USER(values))
            }                
            formik.resetForm();
            
        },
        validationSchema: formSchema,
        
    });

    useEffect(()=>{
        let nav=document.querySelector(".navBar");
        let authBlock=document.querySelector(".authenticationBlock");
        if(authBlock){
            authBlock.style.height=`calc(100vh - ${nav.offsetHeight + 20}px)`
        }
        let form=document.querySelector("form");
        let line=document.querySelector(".optionSep");
        if(line){

            line.style.width=`${form.offsetWidth}px`
        }
    },[userRegistering,userToken])

  return (
    <>
        <NavBar />
        <div className="authenticationBlock">
            <div className="container">
                    <div className="authenticationContent">
                    <form action=""  onSubmit={formik.handleSubmit}>
                        {userRegistering ? (
                            <>
                                <h3>Join Us</h3>
                        
                            <div className="username">
                                <label for="name">Name :</label>  
                                <input type="text" id='name' 
                                    value={formik.values.name}
                                    onChange={formik.handleChange("name")}
                                    onBlur={formik.handleBlur("name")}/>
                            </div>
                            {formik.errors.name &&
                                formik.touched.name ? (
                                    <p className="inputError">
                                        ***{formik.errors.name}
                                    </p>
                                ) : (
                                    <></>
                                )}
                            <div className="email">
                                <label for="email">Email :</label> 
                                <input type="email" id='email' 
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")} />
                            </div>
                            {formik.errors.email &&
                                formik.touched.email ? (
                                    <p className="inputError">
                                        ***{formik.errors.email}
                                    </p>
                                ) : (
                                    <></>
                                )}
                            <div className="password">
                                <label for="password">Password :</label> 
                                <input type="password" id='password' 
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")} />

                            </div>
                            {formik.errors.password &&
                                formik.touched.password ? (
                                    <p className="inputError">
                                        ***{formik.errors.password}
                                    </p>
                                ) : (
                                    <></>
                            )}
                                
                            </>
                        ) : (
                            <>
                                      <h3>Welcome back</h3>

                            <div className="email">
                                <label for="email">Email :</label> <input type="email" id='email'  
                                 value={formik.values.email}
                                 onChange={formik.handleChange("email")}

                                 onBlur={formik.handleBlur("email")}/>
                            </div>
                            {formik.errors.email && formik.touched.email ? (
                                    <p className="inputError">
                                        ***{formik.errors.email}
                                    </p>
                                ) : (
                                    <></>
                                )}
    
                            <div className="password">
                                <label for="password">Password :</label> 
                                <input type="password" id='password'  
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")} />

                            </div>
                            {formik.errors.password &&
                                formik.touched.password ? (
                                    <p className="inputError">
                                        ***{formik.errors.password}
                                    </p>
                                ) : (
                                    <></>
                            )}
           
                            </>
                        )}
                            {currentError !== "" &&
                                <p className="inputError" >***{currentError}</p>
                             }
                            <input type="submit" value="Submit" className='sbtBtn' />
                        </form>

                        <div className='optionSep'></div>
                        {userRegistering ? (
                            <>
                                 <div id="customBtn" className="customGPlusSignIn" onClick={() => login()}>
                                    <span className="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48" className="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg></span>
                                    <span className="buttonText">Sign Up With Google Account</span>
                                </div>

                                <p className='hadAccount'>Already have an account? <span onClick={()=>{navigate("/auth/login");setUserRegistering(!userRegistering)}}>Sign In</span></p>
                            </>
                        ):(
                            <>
                                <div id="customBtn" className="customGPlusSignIn" onClick={() => login()}>
                                    <span className="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48" className="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg></span>
                                    <span className="buttonText">Sign In With Google Account</span>
                                </div>
        
                                <p className='hadAccount'>Are you new here? <span onClick={()=>{navigate("/auth/register");setUserRegistering(!userRegistering)}}> Create an account</span></p>
                            </>
                        )}
                                             
                    </div>

            </div>
        </div>
        <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <Footer />
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
    </>
  )
}



