import { render } from '@testing-library/react';
import React from 'react'

export default function Button(props){

    const {label, name, ...rest} = props
    return(
        <button className="btn btn-warning" name={name} onClick={() => (console.log("Funcion"))}>
        {name}
        </button>
                  

    );
    
}