import React from 'react'
import Input from '../utils/Input'
import Select from '../utils/Select'
import DatePicker from './DatePicker'
import TextArea from '../utils/TextArea'

export default function FormikControl(props){
    const {control, ...rest} = props
    switch(control)
    {
        case 'input': return <Input {...rest}/>
        case 'select': return <Select {...rest}/>
        case 'radio':
        case 'checkbox':
        case 'date':return <DatePicker {...rest}/>
        case 'textarea': return <TextArea {...rest}/>
        default: return null           
    }
}
