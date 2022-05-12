import axios from 'axios';
import { Formik,Form } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/authContext';
import FormikControl from '../utils/FormikControl'

export const AcademicRecordScreen = () => {
  const ws = new WebSocket("ws://localhost:8080/Willyrex/nota");
  const {user} = useContext(AuthContext);
  const[state,setState]= useState(true);
  const [ciclos, setciclos] = useState([]);
  const [values,setValues] = useState({

  });
  const [Data,setData]=useState([]);
  const [AlumnoLog,setAlumnoLog]=useState("")
  
  useEffect(() => {
   setAlumnoLog(user.name)
  }, [])
  

    const initialValues = {
      idCiclo: '',
    }

    const peticionGetAllCiclos = async () => {
      const urlPeticion = "http://localhost:8080/Willyrex/api/ciclo/todos" 
      await axios
        .get(urlPeticion)
        .then((response) => {
          response.data.forEach(element =>{
          });
          setciclos(response.data)
          
        })
        .catch((error) => {
          console.log(error);
        });
  };
    
   
     
      
    
      const handleData = ()=>{
        ws.onopen =  (event) => {
          
           ws.send(JSON.stringify(values));
        };
        ws.onmessage = (event)=> {
          const json = JSON.parse(event.data);
          try {
            if ((json.event = "data")) {
              setData(json.data);
            }
          } catch (err) {
            console.log(err);
          }
        }
        
       
      } 
      
    const handleOnClick = () =>{
      let cicloStr = "";
      ciclos.forEach(element => cicloStr = cicloStr + '\n' +" Id Ciclo: "+element.idCiclo+", Año: "+element.annio+", N.Ciclo: "+element.numeroCiclo)
      Swal.fire(cicloStr)
    }
       
    useEffect(() => {
      
    }, [ciclos]);

    useEffect(() => {
      peticionGetAllCiclos()
    }, []);
    
    useEffect(() => {
     
      handleData();
    }, [state])
    
    const onSubmit =(values)=>{
        values['action'] = "GETHISTORIAL"
        values['idAlumno']= AlumnoLog;
        setValues(values)
        setState(!state);
        handleData();
    }
     
    return (
    <>

      <h1 className="mb-1 text-center">Historial Academico</h1>
      <div className="text-center mt-5 mb-5">
       
          


              <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  >
                  <Form style={{width:"280px", margin:"auto"}}>

                  <div className="col-9">
                      <FormikControl control='input' type='text' label='idCiclo' name='idCiclo' className="form-control" placeholder="Digite numero del ciclo" />
                      <div className="checkbox mt-3"></div>
                      <div className="d-grid gap-2"> 
                      <button type="submit" className="btn btn-dark btn-lg btn-block">Buscar</button>
                      <button onClick={handleOnClick}>Ver ciclos</button>
                    </div> 
                  </div>
                  </Form>
                  </Formik>

        
        </div>
      <div className="container">
        <div className="row">
        <div className="table-responsive">
          <table className="table table-hover table-condensed table-striped">
            <thead>
              <tr>
                
                <th scope="col" className="text-center col-sm-1"><span className="hover-mieo">Nombre del Curso</span></th>
                <th scope="col" className="text-center col-sm-1"><span className="hover-mieo">IdProfesor</span></th>
                <th scope="col" className="text-center col-sm-1"><span className="hover-mieo">CodigoCurso</span></th>
                <th scope="col" className="text-center col-sm-1"><span className="hover-mieo">Nota</span></th>
              </tr>
            </thead>
            <tbody>   
              {Data.map(( (data,i) =>  {
                return(
                <tr key={i}>
                <td className="text-center col-sm-2">{data.Nombre}</td>
                <td className="text-center col-sm-2">{data.IdProfesor}</td>
                <td className="text-center col-sm-2">{data.CodigoCurso}</td>
                <td className="text-center col-sm-2">{data.Nota}</td>
              </tr>
                )
                
              }))
            
              
              }
                 
            </tbody>
          </table>
          </div>
    </div>
    </div>
    </>
  )
}
