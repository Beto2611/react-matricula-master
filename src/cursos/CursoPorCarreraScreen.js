import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Search } from 'react-bootstrap-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem,Dropdown,Spinner} from "reactstrap";
import {Formik,Form} from 'formik'
import FormikControl from '../utils/FormikControl';
import { useNavigate, useParams } from 'react-router-dom';
import './CursoPorCarerraScreen.css'
import Swal from 'sweetalert2';

export default function CursoPorCarerraScreen(){
    const [dataCursos, setDataCursos] = useState([]);
    const baseUrlNombre = "http://localhost:8080/Willyrex/api/curso"
    const [busqueda, setBusqueda] = useState("");
    const [modalInsertar, setModalInsertar] = useState(false);
    const [selectValue, setSelectValue] = useState("Buscar");
    const [refrescar, setRefrescar] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    const initialValues = {
        codigo: '',
        creditos: 0,
        horasPorSemana: 0,
        nombre: ''
      }

      
    const onSubmit =(values, actions)=>{
      
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

    const peticionGetNombre = async (nombre) => {
        const urlPeticion = baseUrlNombre +"/nombre/"+nombre       
        await axios
          .get(urlPeticion)
          .then((response) => {
            setDataCursos(new Array(response.data))
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
            setDataCursos(new Array(response.data))
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
     
      const peticionGetCodigoCarrera = async (codigoCarrera) => {
        const urlPeticion = baseUrlNombre +"/codigoCarrera/"+codigoCarrera       
        await axios
          .get(urlPeticion)
          .then((response) => {
            setDataCursos(response.data)
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const peticionPost = async (curso) => {     
        curso['codigoCarrera'] = params.id;
        await axios
        .post(baseUrlNombre,curso)
        .then((response) => {
        console.log(response.data);
      }).catch((e) => {
        console.log(e);
      });
      };

      const peticionDelete = async (curso) => {     
        const urlDelete = baseUrlNombre + "/borrarCurso/"+ curso
        await axios
        .delete(urlDelete)
        .then((response) => {
        console.log(response.data);
      }).catch((e) => {
        console.log(e);
      });
      };
      const borrarCurso = (codigo) =>{
        Swal.fire({
            title: 'Seguro que desea borrar el curso?',
            text: "Esta operacion no se podra revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
                peticionDelete(codigo);
                setRefrescar(!refrescar);
              Swal.fire(
                'Borrado!',
                'El curso ha sido eliminado.',
                'success'
              )
            }
          })
      }
    useEffect(() => {
        peticionGetCodigoCarrera(params.id);
    }, []);
    
     useEffect(() => {    
      }, [dataCursos]);

      useEffect(() => {
        peticionGetCodigoCarrera(params.id)
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
                   
                </div>
            </div>
            <div className="row">
               <br/>
            </div>
            <div className='row'>
              <div className="col-sm">
               
              </div>
              <div className='col-sm'>
                <h1 className='etiquetaCurso'>
                {params.id}
                </h1>
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
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Creditos</th>
                    <th scope="col">Horas</th>
                    </tr>
                </thead>
                <tbody>
                {          
                dataCursos.length === 0?<tr key={"Vacio"}><th>NO DATA</th></tr>:dataCursos.map((Curso) =>
                    (       
                    <tr key={Curso.codigo}>
                    <th>{Curso.codigo}</th>
                    <td>{Curso.nombre}</td>
                    <td>{Curso.creditos}</td>
                    <td>{Curso.horasPorSemana}</td>
                    <td><button type="button" className="btn btn-danger" value={Curso.codigo} onClick={()=>{borrarCurso(Curso.codigo)}}>Borrar</button></td>
                    <td><button type="button" className="btn btn-dark" value={Curso.codigo} onClick={() => navigate(`/Grupos/${Curso.codigo}`,{replace: true})}>Ver Grupos</button></td>
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
                              <label className="etiqueta">Código Curso</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='codigo'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Nombre Curso</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' label='Nombre Carrera' name='nombre'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Créditos Curso</label>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='creditos'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Horas Curso</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='horasPorSemana'/>
                        </div>
                        <br/>
                        <br/>
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