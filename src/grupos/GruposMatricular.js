import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Search } from 'react-bootstrap-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem,Dropdown,Spinner} from "reactstrap";
import {Formik,Form} from 'formik'
import FormikControl from '../utils/FormikControl';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import './GrupoScreen.css'

export default function GruposMatricula(){
    const [dataGrupos, setDataGrupos] = useState([]);
    const baseUrlNombre = "http://localhost:8080/Willyrex/api/ciclo"
    const [busqueda, setBusqueda] = useState("");
    const [modalInsertar, setModalInsertar] = useState(false);
    const [selectValue, setSelectValue] = useState("Buscar");
    const [refrescar, setRefrescar] = useState(true);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [idAlumno, setidAlumno] = useState("");
    const [codigoCarrera, setcodigoCarrera] = useState("");
    const [objAlumnoNota, setobjAlumnoNota] = useState({});
    const params = useParams();
    const initialValues = {
            profesor:"",
            idCiclo:0,
            codigoCurso:"",
            horaInicio:"",
            horaFinal: ""
      }


      const [bids, setBids] = useState([]);
      const [bids2, setBids2] = useState([]);
    
    const [ws, setws] = useState( new WebSocket("ws://localhost:8080/Willyrex/buscarGrupoPorId"));
    const [wsAlumnos, setwsAlumnos] = useState(new WebSocket("ws://localhost:8080/Willyrex/buscarAlumnoPorId")) ;
    const [wsMatricula, setWsMatricula] = useState(new WebSocket("ws://localhost:8080/Willyrex/buscarAlumnoPorId"));
    const [wsNota, setWsNota] = useState(new WebSocket("ws://localhost:8080/Willyrex/nota"));

   ws.onmessage = function (event) {
        const json = JSON.parse(event.data);
        console.log(json);
        switch (json.action) {
            case 'GETGRUPOSPORCARRERA':   
                setBids(json.data);
                break;
            default:
                break;
        }
    }
    const [alumno, setalumno] = useState();
    wsAlumnos.onmessage = function (event) {
        const json = JSON.parse(event.data);
        console.log(json);
        switch (json.action) {
            case 'GETALUMNOID':   
                setcodigoCarrera(json.data.CodigoCarrera);
                setBids2(new Array(json.data));
                break;
            default:
                break;
        }
        const apiCall = {
            action: "GETGRUPOSPORCARRERA",
            idCarrera: (json.data.CodigoCarrera)
          };
        ws.send(JSON.stringify(apiCall));
        setalumno(json.data)
        return () => ws.close();  
        }
        
    wsMatricula.onmessage = function (event) {
        const json = JSON.parse(event.data);
        console.log(json);
        switch (json.action) {
            case 'GETALUMNOID':   
                setcodigoCarrera(json.data.CodigoCarrera);
                setBids2(new Array(json.data));
                break;
            default:
                break;
        }
        }

    useEffect(() => {
        
    }, []);

    const onSubmit =(values, actions)=>{  
        const obj= {}
        obj['idCiclo'] = values.idCiclo;
        obj['CodigoCurso'] = values.codigoCurso;
        obj['idProfesor'] = values.profesor;
        obj['Nota'] = 0;
        obj['idAlumno'] = idAlumno;  
        setobjAlumnoNota(obj);
        wsAlumnos.send(JSON.stringify(values))  
        setModalInsertar(false)
        setRefrescar(!refrescar);
    }
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
      };

   
      const handleSearch = () => {
            if (busqueda !== "")
            {             
                const apiCallAlumno = {
                    action:"GETALUMNOID",
                    id:busqueda
                }
                wsAlumnos.send(JSON.stringify(apiCallAlumno));
                return () => wsAlumnos.close();           
     
            }
            else{
                setRefrescar(!refrescar)
                return;
            }    
            setRefrescar(!refrescar)
      }
    
    const matricular = (Grupo) =>{
        const apiCall = {
            action:"MATRICULAR",
            Id:alumno.Id,
            Nombre:alumno.Nombre,
            IdGrupo:Grupo.Id
          };
          const apiCallNota = {
            action:"REGISTER",
            idCiclo: Grupo.IdCiclo,
            CodigoCurso: Grupo.CodigoCurso,
            idProfesor: Grupo.IdProfesor,
            idAlumno:alumno.Id,
            Nota:0
          };
        ws.send(JSON.stringify(apiCall));     
        wsNota.send(JSON.stringify(apiCallNota));   
        Swal.fire({
            position: 'top-end',
            icon: 'success', 
            title: (alumno.Nombre + " matriculado con exito en grupo " + Grupo.NumeroGrupo),
            showConfirmButton: false,
            timer: 1500
        })
    }

    function handleOnChangeInputSearch(e){
        setBusqueda(e.target.value)
    }
    useEffect(() => {
       
    }, []);

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
                    <label className='buscador'>Matricular estudiante por ID: {params.idcurso}</label>
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
                    <th scope="col">Nombre</th>
                    <th scope="col">Id</th>
                    <th scope="col">Fecha Nacimiento</th>
                    <th scope="col">Email</th>
                    <th scope="col">Codigo Carrera</th>
                    </tr>
                </thead>
                <tbody>
                {          
                bids2 === undefined || bids2.length === 0 ?<tr key={"Vacio"}><th>NO DATA</th></tr>:bids2.map((est) =>
                    (       
                    <tr key={est.Id}>
                    <th>{est.Nombre}</th>
                    <th>{est.Id}</th>
                    <td>{est.FechaNacimiento}</td>
                    <td>{est.Email}</td>
                    <td>{est.CodigoCarrera}</td>
                    </tr>                  
                    )                
                )   
                }
                </tbody>
                </table>        
            </div>
            <br/>
            <br/>
            <br/>
            <div className="row">  
            <table className="table table-responsive">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Curso</th>
                    <th scope="col">N.Grupo</th>
                    <th scope="col">Id Profesor</th>
                    <th scope="col">Hora Inicio</th>
                    <th scope="col">Hora Fin</th>
                    </tr>
                </thead>
                <tbody>
                {          
                bids === undefined || bids.length === 0 ?<tr key={"Vacio"}><th>NO DATA</th></tr>:bids.map((Grupo) =>
                    (       
                    <tr key={Grupo.Id}>  
                    <th>{Grupo.CodigoCurso}</th>
                    <td>{Grupo.NumeroGrupo}</td>
                    <td>{Grupo.IdProfesor}</td>
                    <td>{Grupo.HoraInicio}</td>
                    <td>{Grupo.HoraFin}</td>
                    <td>{<button type="button" className="btn btn-dark" onClick={()=>matricular(Grupo)}>Matricular</button>}</td>
                    </tr>                  
                    )           
                )   
                }
                </tbody>
                </table>        
            </div>
        </div>
        </>
      )
}