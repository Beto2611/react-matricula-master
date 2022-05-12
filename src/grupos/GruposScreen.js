import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Search } from 'react-bootstrap-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem,Dropdown,Spinner} from "reactstrap";
import {Formik,Form} from 'formik'
import FormikControl from '../utils/FormikControl';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import './GrupoScreen.css'
import Select from "react-dropdown-select";

export default function GruposScreen(){
    const [dataGrupos, setDataGrupos] = useState([]);
    const baseUrlNombre = "http://localhost:8080/Willyrex/api/ciclo"
    const [ciclos, setciclos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [modalInsertar, setModalInsertar] = useState(false);
    const [selectValue, setSelectValue] = useState("Buscar");
    const [refrescar, setRefrescar] = useState(true);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const params = useParams();
    const initialValues = {
            profesor:"",
            idCiclo:0,
            codigoCurso:"",
            horaInicio:"",
            horaFinal: ""
      }


      const peticionGetAllCiclos = async () => {
        const urlPeticion = "http://localhost:8080/Willyrex/api/ciclo/todos" 
        await axios
          .get(urlPeticion)
          .then((response) => {
            let array = []
            let array2 = []
            array2.push({label: "Inserte un valor",value: ""})
            response.data.forEach(element =>{
                let object = {
                    key: element.idCiclo,
                    value: element.idCiclo
                  }
                  let object2 = {
                    value: element.idCiclo,
                    label:  "Id Ciclo: "+element.idCiclo+", Año: "+element.annio+", N.Ciclo: "+element.numeroCiclo
                  }
                array.push(object)
                array2.push(object2)
            });
            setDropdownOptions(array);
            setciclos(array2)
     
          })
          .catch((error) => {
            console.log(error);
          });
    };
      const [bids, setBids] = useState([]);
      const [bids2, setBids2] = useState([]);
    
    const [ws, setws] = useState(new WebSocket("ws://localhost:8080/Willyrex/buscarGrupoPorId"));
    const apiCall = {
      action: "GETGRUPOSPORIDCURSO",
      idCurso: params.idcurso
    };


    useEffect(() => {
        ws.onopen = (event) => {
          ws.send(JSON.stringify(apiCall));
        };  
       // return () => ws.close();
      }, [])


    ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    console.log(json);
    switch (json.action) {
        case 'GETGRUPOSPORIDCURSO':   
            setBids(json.data);
            break;
        default:
            break;
    }
    }
    const displayCiclos = () =>{
     ws.send(JSON.stringify(apiCall));
    }
    console.log(new Array(bids))

    useEffect(() => {
        
    }, []);

    const onSubmit =(values, actions)=>{  
        values['action'] = "POSTGRUPO";
        values['codigoCurso'] = params.idcurso;      
        ws.send(JSON.stringify(values))
      setModalInsertar(false)
      setRefrescar(!refrescar);
    }
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
      };

   
      const handleSearch = (valor) => {
        console.log(bids);
            if (valor !== "")
            {
              setBids(bids.filter(element => element.IdCiclo === valor))
            }
            else{
                setRefrescar(!refrescar)
            }    
            console.log(bids);
      }
    
    function handleOnChangeInputSearch(e){
        setBusqueda(e.target.value)
    }
    useEffect(() => {
        peticionGetAllCiclos()
    }, []);

    useEffect(() => {
      
    }, [ciclos]);
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
                    <label className='buscador'>Grupos Curso {params.idcurso}</label>
                </div>
                <div className="col-sm">
                    <div className="container d-flex justify-content-center">
                            <div className="input-group col-sm-7 input-group-lg align-content-start">
                                <div className="input-group-prepend">                                    
                                </div> 
                                <Select options={ciclos} className="selectCSS"  onChange={(values) => handleSearch(values[0].value)} />                                                     
                          
                            </div>
                    </div>
                </div>
                <div className="col-sm">
                    <button onClick={displayCiclos}>Recargar</button>
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
                    <th>{Grupo.NumeroGrupo}</th>
                    <th>{Grupo.IdProfesor}</th>
                    <td>{Grupo.HoraInicio}</td>
                    <td>{Grupo.HoraFin}</td>
                    </tr>                  
                    )                
                )   
                }
                </tbody>
                </table>        
            </div>
        </div>
        <Modal isOpen={modalInsertar}>
            <ModalHeader>Insertar Grupo</ModalHeader>
            <ModalBody>             
                <Formik initialValues={initialValues}  onSubmit={onSubmit}>
                {
                     formik =>
                    <Form>
                       <div className='container'>
                        <div className='row'>

                        <div className="col-4">
                              <label className="etiqueta">Id del Profesor</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='profesor'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Id del Ciclo</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='select' name='idCiclo' options={dropdownOptions}/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Hora de Inicio</label>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='horaInicio'/>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-4">
                              <label className="etiqueta">Hora de Fin</label>
                        </div>
                        <div className="col-8">
                          <FormikControl control='input' type='text' name='horaFinal'/>
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