import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem,Dropdown,Spinner} from "reactstrap";
import {Formik,Form, FormikHelpers} from 'formik'
import FormikControl from '../utils/FormikControl';
import Swal from 'sweetalert2';
import './UserManagerScreen.css'

export default function UserManagerScreen(){
    const [modalAlumno, setmodalAlumno] = useState(false)
    const [modalProfesor, setmodalProfesor] = useState(false)
    const [modalUsuario, setmodalUsuario] = useState(false);
    const [dropdownCodigos, setdropdownCodigos] = useState([]);
    const baseUrlAlumno = "http://localhost:8080/Willyrex/api/users/addEstudiante"
    const baseUrlProfesor = "http://localhost:8080/Willyrex/api/users/addProfesor"
    const baseUrlUser = "http://localhost:8080/Willyrex/api/users/addUser"
    const baseUrlCarreras = "http://localhost:8080/Willyrex/api/carrera/getAll"
    const [submitCancel, setsubmitCancel] = useState(true);
  const [dataCarreras, setDataCarreras] = useState();
   
    const abrirCerrarModalInsertarAlumno = () => {
      setmodalAlumno(!modalAlumno);
    };

    const peticionPostAlumno = async (alumno) => {     
        await axios
        .post(baseUrlAlumno,alumno)
        .then((response) => {
        console.log(response.data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Inserción de estudiante correcta',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e
        })
      });
    };

    const peticionPostProfesor = async (profesor) => {     
      await axios
      .post(baseUrlProfesor,profesor)
      .then((response) => {
      console.log(response.data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Inserción de profesor correcta',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch((e) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e
      })
    });
  };

  const peticionPostUsuario = async (user) => {     
    await axios
    .post(baseUrlUser,user)
    .then((response) => {
    console.log(response.data);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Inserción de usuario correcta',
      showConfirmButton: false,
      timer: 1500
    })
  }).catch((e) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: e
    })
  });
};


    const peticionGetAll = async (nombre) => {
      const urlPeticion = baseUrlCarreras       
      await axios
        .get(urlPeticion)
        .then((response) => {
          setDataCarreras(response.data)
          const array = []
          array.push( {key: 'Seleccione una opcion', value:''})
          response.data.forEach(element => array.push({key:element.codigo, value:element.codigo}))
          setdropdownCodigos(array)
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const dropdownOptionsUsuarios = [
      {key: 'Seleccione una opcion', value:''},
      {key: 'Admin', value:'Admin'},
      {key: 'Matriculador', value:'Matriculador'}
  ]

  const initialValuesAlumno = {
        id:"",
        nombre:"",
        password:"",
        //rol:"",
        telefono:"",
        email:"@gmail.com",
        fechaNacimiento:"",
        codigoCarrera:""
  }
  const initialValuesProfesor = {
    id:"",
    nombre:"",
    password:"",
    rol:"",
    telefono:"",
    email:"@gmail.com"
  }
  const initialValuesUsuario = {
    id:"",
    password:"",
    rol:""
  }

    
    const onSubmit = (values, actions) =>{
      const [year, day, month] = values.fechaNacimiento.split('-');
      const result = `${month}/${day}/${year}`;
      values['rol'] = 'Estudiante';
      values['fechaNacimiento'] = result;
      console.log(submitCancel)
      if (submitCancel) {
        console.log("submit true")
        peticionPostAlumno(values)
      }     
      setsubmitCancel(true)
      setmodalAlumno(false)

    }

    const onSubmitProfesor = (values, actions) =>{
      values['rol'] = 'Profesor';
      console.log(submitCancel)
      if (submitCancel) {
        console.log("submit true")
        peticionPostProfesor(values)
      }     
      setsubmitCancel(true)
      setmodalProfesor(false)
    }

    const onSubmitUsuario = (values, actions) =>{
      console.log(submitCancel)
      if (submitCancel) {
        console.log("submit true")
        peticionPostUsuario(values)
      }     
      setsubmitCancel(true)
      setmodalUsuario(false)
    }

    useEffect(() => {
      peticionGetAll()
      
    }, []);

    useEffect(() => {
      
    }, [dataCarreras]);

    return(
        <>  
        <div className="backgroundImg" style={{minHeight: '100vh',backgroundImage: "url(https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80)" }}>
        <div className="container">
        <br/>
        <br/>
        <br/>
        <br/>
            <div className="row">               
                <div className="col">
                    <div className="card border-primary mb-3" style={{width: "18rem"}}>
                        <img src="https://cdn-icons-png.flaticon.com/512/194/194931.png" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Estudiante</h5>
                            <p className="card-text">Ingresar un nuevo usuario con rol de estudiante</p>
                            <button className="btn btn-primary" onClick={(e)=>{abrirCerrarModalInsertarAlumno()}}>Ingresar Estudiante</button>
                        </div>
                    </div>  
                </div>
                <div className="col">
                <div className="card" style={{width: "18rem"}}>
                        <img src="https://cdn-icons-png.flaticon.com/512/183/183753.png" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Profesor</h5>
                            <p className="card-text">Ingresar un nuevo usuario con rol de Profesor</p>
                            <a href="#" className="btn btn-primary" onClick={()=>{setmodalProfesor(true)}}>Ingresar Profesor</a>
                        </div>
                    </div>  
                </div>
                <div className="col">
                <div className="card" style={{width: "18rem"}}>
                        <img src="https://cdn-icons-png.flaticon.com/512/476/476761.png" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Usuarios</h5>
                            <p className="card-text">Ingresar un nuevo usuario del tipo de rol: Matricular o Admin</p>
                            <button className="btn btn-primary" onClick={()=>{setmodalUsuario(true)}}>Ingresar usuario</button>
                        </div>
                    </div>  
                </div>
            </div>
        </div> 
        <Modal isOpen={modalAlumno}>
            <ModalHeader>Insertar Alumno</ModalHeader>
            <ModalBody>             
                <Formik initialValues={initialValuesAlumno}  onSubmit={(values,actions)=>{onSubmit(values,actions)}}>
                {
                     formik =>
                    <Form>
                       <div className='container'>
                        <div className='row'>
                        <div className="col-3">
                              <label className="etiqueta">Id</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='id'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-3">
                              <label className="etiqueta">Nombre</label>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-8">
                          <FormikControl control='input' name='nombre'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-3">
                              <label className="etiqueta">Contraseña</label>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='password'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-3">
                              <label className="etiqueta">Telefono</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='telefono'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-3">
                              <label className="etiqueta">Email</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='email' name='email'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Fecha de Nacimiento</label>
                        </div>
                        <div className="col-6" style={{marginInlineStart:'-40px'}}>
                          <FormikControl control='input' type='date' name='fechaNacimiento'/>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Codigo Carrera</label>
                        </div>
                        <div className="col-8">
                        <FormikControl control='select' type='text' name='codigoCarrera' options={dropdownCodigos} style={{marginInlineStart:'-40px'}}/>
                        </div>
                        </div>
                       </div>
                       <br/>
                        <br/>            
                        <ModalFooter>                                      
                        <button type='submit' disabled={formik.isSubmitting}className="btn btn-dark">Aceptar</button>      
                        <button className="btn btn-danger"
                          onClick={() => {         
                            setsubmitCancel(false)
                            setmodalAlumno(false)
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

          <Modal isOpen={modalProfesor}>
            <ModalHeader>Insertar Profesor</ModalHeader>
            <ModalBody>             
                <Formik initialValues={initialValuesProfesor}  onSubmit={(values,actions)=>{onSubmitProfesor(values,actions)}}>
                {
                     formik =>
                    <Form>
                       <div className='container'>
                        <div className='row'>
                        <div className="col-3">
                              <label className="etiqueta">Id</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='id'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-3">
                              <label className="etiqueta">Nombre</label>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-8">
                          <FormikControl control='input' name='nombre'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-3">
                              <label className="etiqueta">Contraseña</label>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='password'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-3">
                              <label className="etiqueta">Telefono</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='telefono'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-3">
                              <label className="etiqueta">Email</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='email' name='email'/>
                        </div>
                        <br/>
                        <br/>                        
                        </div>
                       </div>
                       <br/>
                        <br/>            
                        <ModalFooter>                                      
                        <button type='submit' disabled={formik.isSubmitting}className="btn btn-dark">Aceptar</button>      
                        <button className="btn btn-danger"
                          onClick={() => {         
                            setsubmitCancel(false)
                            setmodalProfesor(false)
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

          <Modal isOpen={modalUsuario}>
            <ModalHeader>Insertar Usuario</ModalHeader>
            <ModalBody>             
                <Formik initialValues={initialValuesUsuario}  onSubmit={(values,actions)=>{onSubmitUsuario(values,actions)}}>
                {
                     formik =>
                    <Form>
                       <div className='container'>
                        <div className='row'>
                        <div className="col-3">
                              <label className="etiqueta">Id</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='id'/>
                        </div>
                        <br/>
                        <br/>
                       
                        <div className="col-3">
                              <label className="etiqueta">Contraseña</label>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='password'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-3">
                              <label className="etiqueta">Rol</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='select' name='rol' options={dropdownOptionsUsuarios}/>
                        </div>
                        <br/>
                        <br/>                      
                        </div>
                       </div>
                       <br/>
                        <br/>            
                        <ModalFooter>                                      
                        <button type='submit' disabled={formik.isSubmitting}className="btn btn-dark">Aceptar</button>      
                        <button className="btn btn-danger"
                          onClick={() => {         
                            setsubmitCancel(false)
                            setmodalUsuario(false)
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
        </div>
        </>
    )
}
