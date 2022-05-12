import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { App, Search } from 'react-bootstrap-icons';
import './Profesor.css'
import { Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem,Dropdown,Spinner} from "reactstrap";
import {Formik,Form} from 'formik'
import FormikControl from '../utils/FormikControl';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';
import { useContext } from 'react';
export const ProfesorScreen = () => {



  const [dataCarrera, setDataCarrera] = useState([]);
  const baseUrlNombre = "http://localhost:8080/Willyrex/api/carrera"
  const ws = new WebSocket("ws://localhost:8080/Willyrex/buscarGrupoPorId");
  const we = new WebSocket("ws://localhost:8080/Willyrex/buscarGrupoPorId");
  const w2 = new WebSocket("ws://localhost:8080/Willyrex/nota");
  const [busqueda, setBusqueda] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [selectValue, setSelectValue] = useState("Buscar");
  const [valorsito, setvalorsito] = useState({})
  const [IdAlumno, setIdAlumno] = useState("")
  const [valor, setValor] = useState("Buscar");
  const [refrescar, setRefrescar] = useState(true);
  const [Data, setData] = useState([])
  const [resfrescaPuta, setResfrecaPuta]= useState(true);
  const [DataAlumnos,setDataAlumnos]= useState([])
  const navigate = useNavigate();
  const [first, setfirst] = useState(true)

const {user}= useContext(AuthContext);
  const initialValues = {
   Nota: 0,
    
    }
   
    const profesorLogin ={
      action:'GETGRUPOSPORIDPROFESOR',
      IdProfesor:user.name,
    }
    
  useEffect(() => {
   
  }, [first])

  useEffect(() => {
    getAlumnos();
  }, [resfrescaPuta])
  
  
  const updateNote = (values)=>{
  
      w2.send(JSON.stringify(values));
      setResfrecaPuta(!resfrescaPuta)
    
  }
    const handleAlumnos = ()=>{
      setfirst(!first)
      setvalorsito({
        action:"GETALUMNOSPORIDGRUPO",
        IdGrupo:parseInt(selectValue,10)
      })
      
   
    }
  
    useEffect(() => {
      getAlumnos();
    }, [first])
    
    const getAlumnos=()=>{
      we.onopen = (event) => {
        we.send(JSON.stringify(valorsito));
      };
      we.onmessage = function (event) {
        const json = JSON.parse(event.data);
        try {
          if ((json.event = "data")) {
            setDataAlumnos(json.data);
            console.log(json.data)
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    
  const onSubmit =(values, actions)=>{
    
    if (modalInsertar) {
    
  
     const teemo= Data.find(element=>{
       
      return element.Id === parseInt(selectValue)
     })
       
     values['action'] = 'UPDATENOTA'
     values['idAlumno'] = IdAlumno;
     values['codigoCurso'] = teemo.codigoCurso

     updateNote(values);
     
    }
    else  actions.setSubmitting(false);
    setModalInsertar(false)
    setRefrescar(!refrescar);
  }
  const abrirCerrarModalInsertar = (alumnos) => {
      setModalInsertar(!modalInsertar);
      setIdAlumno(alumnos.IdAlumno)
    

    };
  
      
      useEffect(() => {
          ws.onopen = (event) => {
            ws.send(JSON.stringify(profesorLogin));
          };
          ws.onmessage = function (event) {
            const json = JSON.parse(event.data);
            try {
              if ((json.event = "data")) {
                setData(json.data);
              }
            } catch (err) {
              console.log(err);
            }
          }
          
        }, [DataAlumnos])
        
      
    

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
                 <label className='buscador'>Grupos</label>
              </div>
              <div className="col-sm">
                 
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
            <select  className="form-select" onChange={(e)=>setSelectValue(e.target.value)}>
            <option >Grupos Asignados</option>
                  {Data.map((data, i) =>{
                  return(
                    <option key={i} value={data.Id}>{ "Numero Grupo "+ data.Id +" "+ data.codigoCurso}</option>
                  )
                 
                })
              }
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
                  <button type="button" onClick={handleAlumnos} className="btn btn-primary botonInsert" >Buscar</button>
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
                  <th scope="col">IdAlumno</th>
                  <th scope="col">NombreAlumno</th>
                  <th scope="col">Nota</th>
                  <th scope="col">Actualizar o Agregar Nota</th>
                  </tr>
              </thead>
              <tbody>
              
              {        
              DataAlumnos.length === 0 || DataAlumnos === undefined ?<tr key={""}><th></th></tr>:DataAlumnos.map((alumnos) =>
                         
                  <tr key={alumnos.IdAlumno}>
                  <th scope="row">{alumnos.IdAlumno}</th>
                  <td>{alumnos.NombreAlumno}</td>
                  <td>{alumnos.Nota}</td>
                  <td><button className="btn btn-primary" onClick={() => abrirCerrarModalInsertar(alumnos)}>Nota</button></td>
                  </tr>                  
                              
              )   
              }
              </tbody>
            
              </table>   
                 
          </div>
            
      </div>
      <Modal isOpen={modalInsertar}>
          <ModalHeader>Agregar o Modificar Nota</ModalHeader>
          <ModalBody>             
              <Formik initialValues={initialValues}  onSubmit={onSubmit}>
              {
                   formik =>
                  <Form>
                     <div className='container'>
                      <div className='row'>

                      <div className="col-4">
                      <label className="etiqueta">Nota</label>
                      </div>
                      <div className="col-8">
                        <FormikControl control='input' type='number' name='Nota'/>
                      </div>
                      <br/>
                      <br/>
                      
  
                      </div>
                     </div>            
                      <ModalFooter>                                      
                      <button type='submit' disabled={formik.isSubmitting}className="btn btn-primary">Aceptar</button>      
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
