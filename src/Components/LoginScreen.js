import axios  from "axios";
import React, { useContext,useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext'
import { types } from '../types/types';
import FormikControl from '../utils/FormikControl'
import { Formik,Form } from 'formik'



export const LoginScreen = () => {
  const { dispatch } = useContext(AuthContext);  
  const navigate = useNavigate();
  //const [loginFail,setLoginFail]=useState(false);
  const [nombre, setnombre] = useState({

  })
  const baseUrl = "http://localhost:8080/Willyrex/api/login/sesion";
  const [estadoSesion, setEstadoSesion] = useState()
  const [estado, setEstado] = useState(true);
  
  

  useEffect(() => {
   if (nombre.NombreUsuario !== undefined) {
    verificaSesion();
   }
   
  }, [nombre])
  
  
  useEffect(() => {
    if (estado===false) {
      verificaSesion();
    
    }
  }, [estado])
  
  const handleLogin = async(teemo)=>{
    await axios
      .post(baseUrl,teemo)
    .then((response) => {
      try{
        setnombre({
          NombreUsuario:response.data.nombre,
          Rol:response.data.rol
        })
        
        if(response.data.nombre === undefined) {
          throw "empty"
        }
      }
      
       catch(error){
        setEstado(false);
       }
    })
    .catch((error) => {
     
      console.log(error);
    });

  }
  const initialValues = {
    nombre: '',
    password:""
  }
  const onSubmit =(values)=>{
    handleLogin(values);
   
    
}
const verificaSesion=()=>{
if((nombre.NombreUsuario !== undefined ) || estado === true){
    
    const accion = { 
      type: types.login,
      payload:{
        name:nombre.NombreUsuario,
        rol:nombre.Rol
      },
      
  }
      dispatch(accion)
      navigate('/',{
        replace: true
    })
  }
  else if(estado === false){
   
    
   
  }
}
  return (
    <>
      <div>
            <p>
            </p>
        </div>
        <div className="text-center mt-5 mb-5">
        <img className="mb-1" src="https://cdn.discordapp.com/attachments/826373988154212437/966575441567686656/png-transparent-fortnite-battle-royale-youtuber-video-game-youtube-blue-game-angle_1.png"></img>
        <h2>Login</h2>
        <br/>
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        >
          
        <Form action="" method="" style={{width:"380px", margin:"auto"}}>
         
        <FormikControl control='input' name="nombre" label="nombre" type="text" className={`${!estado && "form-control is-invalid" || estado && "form-control"}`} placeholder="Username"></FormikControl>
       
        <FormikControl control='input' name="password" label="password"placeholder="Password" className={`${!estado && "form-control is-invalid" || estado && "form-control"}`} ></FormikControl >
        <div className="checkbox mt-3"></div>
        <div className="d-grid gap-2">
        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
        </div>
        </Form>
        </Formik>
    </div>
       
    </>
  )
}
