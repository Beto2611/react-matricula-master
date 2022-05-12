import React from 'react'


export default function TextError(props){
    return(
        <div className='error text-danger'>
            {props.children}
        </div>
    )
}