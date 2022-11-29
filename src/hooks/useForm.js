import React from "react";


export function useForm(formStates){
    const [formData, setFormData] = React.useState(formStates())
    const [errors, setErrors] = React.useState([])
    function handleChange(e){
        const {name, value, type, checked} = e.target
        setFormData(oldFormData=>({
            ...oldFormData,
            [name]: type === 'checkbox'? checked : value
        }))



    }
    function validation(){
        const temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(formData.email)? '': 'Wrong email format'
        // temp.confirmedpassword = (formData.password === formData.confirmedPassword)? "": "Passwords don't match"
        // temp.password = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(formData.password)?"":"Password is not valid"
        setErrors(temp)
        return Object.values(temp)
    }

    return{
        formData,
        setFormData,
        setErrors,
        handleChange,
        validation,
        errors
    }

}