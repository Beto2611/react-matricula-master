import React from 'react'
import TextError from '../utils/TextError'
import {Field, ErrorMessage } from "formik"

export default function TextArea(props){
    const {label, name, ...rest} = props;
    return(
        <div >
            <label htmlFor={name}>{label}</label>
            <Field as='textarea'id={name} name={name} {...rest}/>
            <ErrorMessage name={name} component={TextError}/>  
        </div>

    )
}