import React, { use, useContext, useEffect, useState } from 'react'
import logo from "../assets/book-03.png"
import googleLogo from "../assets/googleLogo.svg"
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignInWithGoogle } from "../firebase/auth.js"
import { updateProfile } from 'firebase/auth';
import FeatureFallBack from './DashboardComponents/Modals/FeatureFallBack.jsx';


const AuthPage = (props) => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [confirmPassError, setConfirmPassError] = useState("");
    const [error, setError] = useState({
        email: "",
        pass: "",
        others: ""
    });
    const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);

    const authType = props.isLogin ? "Log in" : props.isSignup ? "Sign up" : "";
    const heading = props.isLogin ? "Log in to your account" : props.isSignup ? "Sign up for an account" : "";

    localStorage.setItem("authType", authType);

    function handleX() {
        props.setIsLogin(false);
        props.setIsSignup(false);
        navigate("/")
    }

    useEffect(() => {
        if (!props.isLogin && !props.isSignup) {
            navigate("/")
        }
    }, [])

    function handleForgetPassword() {
        setIsForgotPasswordClicked(true);
    }

    async function handleSignup() {

        if (password !== confirmPass) {
            setConfirmPassError("Password doesn't match");
            return;
        }

        try {
            const userCredential = await doCreateUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            updateProfile(user, {
                displayName: name
            })

            navigate("/dashboard");
        }
        catch (error) {
            console.log(error);

            // Handling firebase auth errors
            if (error.code === "auth/email-already-in-use") {
                setError((prevState) => ({ ...prevState, email: "This email is already in use" }));
            }
            else if (error.code === "auth/invalid-email") {
                setError((prevState) => ({ ...prevState, email: "Invalid email address" }));
            }
            else if (error.code === "auth/weak-password") {
                setError((prevState) => ({ ...prevState, pass: "Password must be at least 6 characters" }));
            }
            else if (error.code == "auth/missing-password") {
                setError((prevState) => ({ ...prevState, pass: "Password Missing" }));
            }
            else {
                setError((prevState) => ({ ...prevState, others: "Something went wrong. Please try again" }));
            }
        }
    }

    async function handleLogin() {
        if (password === "".trim()) {
            setError((prevState) => ({ ...prevState, pass: "Password Missing" }));
            return;
        }

        try {
            const userCredential = await doSignInWithEmailAndPassword(email, password);
            navigate("/dashboard");
        }
        catch (error) {
            console.log(error.code);

            setPassword("");

            //Handling firebase auth errors
            if (error.code === "auth/invalid-email") {
                setError((prevState) => ({ ...prevState, email: "Invalid email address" }))
            }
            else if (error.code === "auth/invalid-credential") {
                setError((prevState) => ({ ...prevState, others: "Invalid email or password. Please try again" }))
            }
            else if (error.code === "auth/user-not-found") {
                setError((prevState) => ({ ...prevState, email: "No account found with this email" }));
            }
            else if (error.code === "auth/missing-password") {
                setError((prevState) => ({ ...prevState, pass: "Missing password" }));
            }
            else if (error.code === "auth/too-many-requests") {
                setError((prevState) => ({ ...prevState, others: "Too many failed attempts. Please try again later" }));
            }
            else if (error.code === "auth/user-disabled") {
                setError((prevState) => ({ ...prevState, others: "This account has been disabled" }));
            }
        }
    }

    async function signInWithGoogle() {
        await doSignInWithGoogle();
        navigate("/dashboard");

    }

    /* Btn class names */

    const authBtnClass = "w-full mt-8 text-white text-md bg-indigo-500 font-semibold py-1.5 rounded-lg hover:bg-indigo-400";


    return (
        <main className=' pt-10 relative min-h-screen pb-16 min-w-screen bg-gray-900 flex justify-center items-center '>
            <FaXmark onClick={handleX} className=' absolute right-4 top-4 size-8 sm:right-8 sm:top-8 text-white cursor-pointer hover:scale-120' />
            <section className=' mt-10 sm:mt-6 h-screen w-full sm:w-96 flex flex-col justify-center'>

                <header className=' w-full flex flex-col items-center gap-8 '>

                    <img src={logo} className='size-16' alt="logo" />
                    <h1 className=' text-2xl text-white font-semibold text-center '>{heading}</h1>
                    {/* General Error message */}
                    {error.others && <h3 className=' text-red-500 -my-6'>{error.others}</h3>}

                </header>

                <div className=' mt-12 px-4 sm:px-0'>

                    {/* Display Name */}

                    {
                        props.isSignup && <div className=' mb-6'>
                            <span className='inline-block text-lg text-white mb-2'>Display Name</span>
                            <input value={name} onChange={(e) => { setName(e.target.value) }} required type="text" className=' border border-gray-600 w-full h-9 rounded-lg bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400 text-white px-2' />

                        </div>
                    }

                    {/* Email */}

                    <div>
                        <span className='inline-block text-lg text-white mb-2'>Email address</span>
                        {/* Error message */}

                        {error.email && <span className='ml-4 text-red-500'>{error.email}</span>}

                        <input value={email} onChange={(e) => { setEmail(e.target.value), setError(prevState => ({ ...prevState, email: "" })) }} required type="email" className=' border border-gray-600 w-full h-9 rounded-lg bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400 text-white px-2' />
                    </div>

                    {/* Password */}

                    <div className=' mt-6'>
                        <div className=' flex justify-between items-center w-full'>
                            <span className=' text-lg text-white mb-2'> Password</span>

                            {/* Error message */}
                            {error.pass && <span className=' mb-2 text-red-500'>{error.pass}</span>}

                            {/* Reset Password */}
                            {props.isLogin && <button onClick={handleForgetPassword} className=' mb-2 text-indigo-400 text-md cursor-pointer hover:text-indigo-300 font-semibold'>Forgot password?</button>}

                        </div>

                        <input onChange={(e) => { setPassword(e.target.value), setError(prevState => ({ ...prevState, pass: "" })) }} value={password} type="password" required className=' border border-gray-600 w-full h-9 rounded-lg bg-gray-800 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-400 text-white px-2 mr-2' />
                    </div>

                    {/* Confirm Password */}

                    {props.isSignup && <div className=' mt-6'>
                        <span className='inline-block text-lg text-white mb-2'>Confirm Password</span>

                        <span className=' ml-4 text-red-500 '>{confirmPassError}</span>

                        <input onChange={(e) => { setConfirmPass(e.target.value), setConfirmPassError("") }} type="password" required className=' border border-gray-600 w-full h-9 rounded-lg bg-gray-800 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-400 text-white px-2' />

                    </div>}

                    {/* Log in or Sign up */}

                    {props.isLogin ? (
                        <button onClick={handleLogin} className={authBtnClass}>{authType}</button>
                    ) : props.isSignup ? (
                        <button onClick={handleSignup} className={authBtnClass}>{authType}</button>
                    ) : ""}

                    {/* continue with text */}

                    <div className=' text-center mt-8'>
                        <span className='inline-block text-center text-white relative  after:absolute after:bg-gray-600 after:h-[1px] after:w-3/4 after:left-40 after:top-3 before:absolute before:bg-gray-600 before:h-[1px] before:w-3/4 before:right-40 before:top-3  '>Or continue with</span>
                    </div>

                    {/* Continue with */}

                    <div className=' mt-8 w-full flex justify-between gap-4'>

                        <button onClick={signInWithGoogle} className=' w-full mx-auto flex justify-center items-center bg-gray-200 h-10 rounded-full px-5 gap-2 cursor-pointer hover:bg-gray-300'>
                            <img src={googleLogo} className=' size-6 ' alt="" />
                            <span >Google</span>
                        </button>

                    </div>

                </div>

            </section>

            {isForgotPasswordClicked && <FeatureFallBack setIsForgotPasswordClicked={setIsForgotPasswordClicked} />}

        </main >
    )
}

export default AuthPage
