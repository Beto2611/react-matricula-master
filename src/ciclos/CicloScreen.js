import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Search } from 'react-bootstrap-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem,Dropdown,Spinner} from "reactstrap";
import {Formik,Form} from 'formik'
import FormikControl from '../utils/FormikControl';
import './CicloScreen.css'
import Swal from 'sweetalert2';

export default function CicloScreen(){
    const [dataCiclos, setDataCiclos] = useState([]);
    const baseUrlNombre = "http://localhost:8080/Willyrex/api/ciclo"
    const [busqueda, setBusqueda] = useState("");
    const [modalInsertar, setModalInsertar] = useState(false);
    const [selectValue, setSelectValue] = useState("Buscar por año..");
    const [refrescar, setRefrescar] = useState(true);

    const formatDate = (input) =>{
        const [year, month, day] =  input.split('-')
        // dd/mm/yyyy
       const nuevaFecha = `${day}/${month}/${year}`;
       return nuevaFecha;
    }

    const dropdownOptions = [
        {key: '1', value:'1'},
        {key: '2', value:'2'}
    ]
    const initialValues = {
        annio: 0,
        numeroCiclo: 1,
        fechaInicio: '',
        fechaFin:'',
        titulo:''
      }

      
    const onSubmit =(values, actions)=>{
        const fechaIni = formatDate(values.fechaInicio)
        const fechaFi = formatDate(values.fechaFin)
        values['fechaInicio'] = fechaIni
        values['fechaFin'] = fechaFi
      if (modalInsertar) {
        peticionPost(values);
      }
      else actions.setSubmitting(false);
      setModalInsertar(false)
      setRefrescar(!refrescar);
    }
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
      };

    const peticionGetCiclo = async (annio) => {
        const urlPeticion = baseUrlNombre +"/annio/"+annio       
        await axios
          .get(urlPeticion)
          .then((response) => {
            setDataCiclos(response.data)
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    };

    const peticionGetAll = async () => {
        const urlPeticion = baseUrlNombre +"/todos" 
        await axios
          .get(urlPeticion)
          .then((response) => {
            setDataCiclos(response.data)
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    };

      const peticionPost = async (curso) => {     
        await axios
        .post(baseUrlNombre,curso)
        .then((response) => {
        console.log(response.data);
      }).catch((e) => {
        console.log(e);
      });
      };
       
      const handleSearch = () => {
            if (busqueda !== "")
            {
                peticionGetCiclo(busqueda)
            }
            else{
                peticionGetAll()   
                setRefrescar(!refrescar)
            }    
            
      }
    
    function handleOnChangeInputSearch(e){
        setBusqueda(e.target.value)
    }
    useEffect(() => {
        peticionGetAll()
    }, []);
     useEffect(() => {    
      }, [dataCiclos]);

      useEffect(() => {
      
      }, [refrescar]);

    return (
        <>
        <div className="container">
            <div className="row">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            </div>
            <div className="row">      
                <div className="col-sm">
                    <label className='buscador'>Ciclo</label>
                </div>
                <div className="col-sm">
                    <div className="container d-flex justify-content-center">
                            <div className="input-group col-sm-7 input-group-lg align-content-start">
                                <div className="input-group-prepend">                                    
                                </div> 
                                <input type="text" className="form-control" onChange={(e)=>handleOnChangeInputSearch(e)} placeholder={selectValue}/>                                 
                                <button type="button" className="btn btn-dark" onClick={() => handleSearch()}><Search/></button>       
                            </div>
                    </div>
                </div>
                <div className="col-sm">
                    
                </div> 
               

            </div>
            <div className="row">
               <br/>
            </div>
            <div className='row'>
              <div className="col-sm">
               
              </div>
              <div className='col-sm'>
              
                <br/>
              </div>
              <div className="col-sm">
               
               </div>
            </div>
            <div className="row">
                <div className="col-sm">
                
                </div>
                <div className="col-sm">
                    <br/>
                    <button type="button" className="btn btn-dark botonInsert" onClick={(e) => abrirCerrarModalInsertar()}>Insertar</button>
                </div>
                <div className="col-sm">
                
                </div>
            </div>
            <div className="row">
               <br/>
            </div>
            <div className="row">
            <table className="table table-responsive">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Año</th>
                    <th scope="col">N.Ciclo</th>
                    <th scope="col">Fecha Inicio</th>
                    <th scope="col">Fecha Fin</th>
                    <th scope="col">Titulo</th>
                    </tr>
                </thead>
                <tbody>
                {          
                dataCiclos.length === 0?<tr key={"Vacio"}><th>NO DATA</th></tr>:dataCiclos.map((Ciclo) =>
                    (       
                    <tr key={Ciclo.titulo}>
                    <th>{Ciclo.annio}</th>
                    <td>{Ciclo.numeroCiclo}</td>
                    <td>{Ciclo.fechaInicio}</td>
                    <td>{Ciclo.fechaFin}</td>
                    <td>{Ciclo.titulo}</td>
                    </tr>                  
                    )                
                )   
                }
                </tbody>
                </table>        
            </div>
        </div>
        <Modal isOpen={modalInsertar}>
            <ModalHeader>Insertar Curso</ModalHeader>
            <ModalBody>             
                <Formik initialValues={initialValues}  onSubmit={onSubmit}>
                {
                     formik =>
                    <Form>
                       <div className='container'>
                        <div className='row'>

                        <div className="col-4">
                              <label className="etiqueta">Año Ciclo</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='annio'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Número Ciclo</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='select' name='numeroCiclo' options={dropdownOptions}/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Fecha inicio</label>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-8">
                          <FormikControl control='input' type='date' name='fechaInicio'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Fecha Fin</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='date' name='fechaFin'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Titulo</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='titulo'/>
                        </div>
                        </div>
                       </div>            
                        <ModalFooter>                                      
                        <button type='submit' disabled={formik.isSubmitting}className="btn btn-dark">Aceptar</button>      
                        <button className="btn btn-danger"
                          onClick={() => {                    
                            setModalInsertar(false)
                          }}
                        >    
                        Cancelar
                        </button>  
                        </ModalFooter>
                    </Form>
                }
                </Formik>
            </ModalBody>        
          </Modal>
        </>
      )
}