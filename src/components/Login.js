import React, {useContext} from "react";
import {useForm} from "../hooks/useForm";
import {createAPIEndpoint, ENDPOINTS} from "../api";
import {useStateContext} from "../hooks/useStateContext";
import {useNavigate} from "react-router-dom";


export function Login(){
    const formStates = ()=> ({
        name: "",
        email: "",
        // password: "",
        // confirmedPassword: "",
        subscription: false
    })
    const {context, setContext} = useStateContext();
    const navigate = useNavigate();
    const {
        formData,
        setFormData,
        setErrors,
        handleChange,
        validation,
        errors
    } = useForm(formStates);
    //
    // React.useEffect(() => {
    //     resetContext()
    // }, [])


    function submit(e){
        e.preventDefault();
        if (validation() == ''){
            createAPIEndpoint(ENDPOINTS.participant)
                .post(formData)
                .then(res=> {
                    setContext({participantId: res.data.id})
                    navigate('/question')
                    })
                .catch(err=>console.log(err))
        }
    }


    return(
        <div className="container">
            <div className="card"></div>
            <div className="card">
                <h1 className="title">Login</h1>
                <form name={'login-form'} autoComplete={'off'} id={'loginForm'} onSubmit={submit}>
                    <div className="input-container">
                        <input type="text"
                               name={'name'}
                               onChange={e=>{handleChange(e);validation()}}
                               value={formData.name}
                               required="required"/>
                        <label htmlFor="#{label}">Name</label>
                        <div className="bar"></div>
                    </div>
                    <div className="input-container">
                        <input type="text"
                               name={'email'}
                               onChange={e=>{handleChange(e);validation()}}
                               value={formData.email}
                               required="required"/>
                        <label htmlFor="#{label}">Email</label>
                        <div className="bar"></div>
                        <small className={'error-text'}>{errors.email}</small>
                    </div>
                    <div className="sub-container">
                        <input
                        type="checkbox"
                        id={'subscription'}
                        name={'subscription'}
                        onChange={handleChange}
                        checked={formData.subscription}
                        />
                        <label htmlFor="subscription">I want to receive test results to my email</label>
                    </div>
                    <button type={'submit'} className="custom-btn btn-6 input-container middle-container"><span>Start</span></button>
                </form>
            </div>
        </div>
        // <form name={'login-form'} autoComplete={'off'} id={'loginForm'} className={'mainForm'} onSubmit={submit}>
        //     <div className="input-wrapper">
        //         <input
        //             type="text"
        //             name={'name'}
        //             onChange={e=>{handleChange(e);validation()}}
        //             value={formData.name}
        //             placeholder={'name'}
        //         />
        //     </div>
        //     <div className="input-wrapper">
        //         <input
        //             type="text"
        //             name={'email'}
        //             onChange={e=>{handleChange(e);validation()}}
        //             value={formData.email}
        //             placeholder={'email'}
        //         />
        //         <small>{errors.email}</small>
        //     </div>
        //     {/*<input*/}
        //     {/*    type="password"*/}
        //     {/*    name={'password'}*/}
        //     {/*    onChange={e=>{handleChange(e);validation()}}*/}
        //     {/*    value={formData.password}*/}
        //     {/*    placeholder={'password'}*/}
        //     {/*/>*/}
        //     {/*<small>{errors.password}</small>*/}
        //
        //     {/*<input*/}
        //     {/*    type="password"*/}
        //     {/*    name={'confirmedPassword'}*/}
        //     {/*    onChange={e=>{handleChange(e);validation()}}*/}
        //     {/*    value={formData.confirmedPassword}*/}
        //     {/*    placeholder={'confirm password'}*/}
        //     {/*/>*/}
        //     {/*<small>{errors.confirmedpassword}</small>*/}
        //
        //     <div>
        //         <input
        //             type="checkbox"
        //             name={'subscription'}
        //             onChange={handleChange}
        //             checked={formData.subscription}
        //         />
        //         <label htmlFor="subscription">I want to receive test results to my email</label>
        //     </div>
        //
        //     <button type={'submit'} className="custom-btn btn-6"><span>Read More</span></button>
        // </form>
    )

}