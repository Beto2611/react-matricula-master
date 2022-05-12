import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { App, Search } from 'react-bootstrap-icons';
import './CarreraScreen.css'
import { Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem,Dropdown,Spinner} from "reactstrap";
import {Formik,Form} from 'formik'
import FormikControl from '../utils/FormikControl';
import { useNavigate } from 'react-router-dom';

export default function CarreraScreen(){
    const [dataCarrera, setDataCarrera] = useState([]);
    const baseUrlNombre = "http://localhost:8080/Willyrex/api/carrera"
    const [busqueda, setBusqueda] = useState("");
    const [modalInsertar, setModalInsertar] = useState(false);
    const [selectValue, setSelectValue] = useState("Buscar");
    const [refrescar, setRefrescar] = useState(true);
    const navigate = useNavigate();


    const initialValues = {
        codigo: '',
        nombre: '',
        titulo:''
      }

      
    const onSubmit =(values, actions)=>{
      
      if (modalInsertar) {
        peticionPost(values);
      }
      else  actions.setSubmitting(false);
      setModalInsertar(false)
      setRefrescar(!refrescar);
    }
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
      };
    
      const peticionGetAll = async (nombre) => {
        const urlPeticion = baseUrlNombre +"/getAll"       
        await axios
          .get(urlPeticion)
          .then((response) => {
            setDataCarrera(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const peticionGetNombre = async (nombre) => {
        const urlPeticion = baseUrlNombre +"/nombre/"+nombre       
        await axios
          .get(urlPeticion)
          .then((response) => {
            setDataCarrera(new Array(response.data))
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const peticionGetCodigo = async (codigo) => {
        const urlPeticion = baseUrlNombre +"/codigo/"+codigo       
        await axios
          .get(urlPeticion)
          .then((response) => {
            setDataCarrera(new Array(response.data))
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
     
      const peticionPost = async (carrera) => {      
        await axios
        .post(baseUrlNombre,carrera)
        .then((response) => {
        console.log(response.data);
      }).catch((e) => {
        console.log(e);
      });
      };

    const handleOnClickSearch = () => {
        setDataCarrera([])
       if (busqueda !== "")
        {
          if (selectValue === "Codigo") 
          {
            peticionGetCodigo(busqueda)
          }
          if (selectValue === "Nombre") {
            peticionGetNombre(busqueda);
          }
         
        } 
        else peticionGetAll();
        setDataCarrera([])
    }

    function handleOnChangeInputSearch(e){
        setBusqueda(e.target.value)
    }
    useEffect(() => {
      peticionGetAll()
    }, []);
    
     useEffect(() => {    
      }, [dataCarrera]);
      useEffect(() => {
        peticionGetAll()
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
                   <label className='buscador'>Carrera</label>
                </div>
                <div className="col-sm">
                    <div className="container d-flex justify-content-center">
                            <div className="input-group col-sm-7 input-group-lg align-content-start">
                                <div className="input-group-prepend">                                    
                                </div> 
                                    <input type="text" className="form-control" onChange={(e)=>handleOnChangeInputSearch(e)} placeholder={selectValue}/>                                 
                                    <button type="button" className="btn btn-dark" onClick={(e) => handleOnClickSearch()}><Search/></button>                        
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
              <select className="form-select" defaultValue={""} onChange={(e)=>setSelectValue(e.target.value)}>
                  <option >Buscar por</option>
                  <option value="Codigo">Codigo</option>
                  <option value="Nombre">Nombre</option>
                </select>
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
                    <th scope="col">Código Carrera</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Cursos</th>
                    </tr>
                </thead>
                <tbody>
                {          
                dataCarrera.length === 0?<tr key={"Vacio"}><th>NO DATA</th></tr>:dataCarrera.map((Carrera) =>
                    (       
                    <tr key={Carrera.codigo}>
                    <th scope="row">{Carrera.codigo}</th>
                    <td>{Carrera.nombre}</td>
                    <td>{Carrera.titulo}</td>
                    <td><button className="btn btn-dark" onClick={() => navigate(`/Curso/${Carrera.codigo}`,{replace: true})}>Ver cursos</button></td>
                    </tr>                  
                    )                
                )   
                }
                </tbody>
                </table>        
            </div>
        </div>
        <Modal isOpen={modalInsertar}>
            <ModalHeader>Insertar Carrera</ModalHeader>
            <ModalBody>             
                <Formik initialValues={initialValues}  onSubmit={onSubmit}>
                {
                     formik =>
                    <Form>
                       <div className='container'>
                        <div className='row'>

                        <div className="col-4">
                              <label className="etiqueta">Código Carrera</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='codigo'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Nombre Carrera</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' label='Nombre Carrera' name='nombre'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Título Carrera</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' label='Titulo Carrera' name='titulo'/>
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