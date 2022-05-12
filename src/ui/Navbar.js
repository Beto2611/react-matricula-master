import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext'
import { types } from '../types/types';

export const Navbar = () => {
    const {user,dispatch} = useContext(AuthContext)
    const navigate = useNavigate();
    

     const handleLogout = ()=>{
           const accion={
            type: types.logout,
           }         
        
        navigate('/login',{
            replace: true
        })
        dispatch(accion)
     }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    
                    {
                        user.rol === "Estudiante"?<>
                        
                        <NavLink 
                        
                        className={ ({ isActive })=>"nav-item nav-link " + (isActive?'active':'')} 
                        
                        to="/AcademicRecord">
                        
                        Historial Academico
                        </NavLink>
                        
                        
                        
                        </> :<></>
                    }
                    {
                        user.rol ==="Profesor"?<>
                          <NavLink 
                        
                        className={ ({ isActive })=>"nav-item nav-link " + (isActive?'active':'')} 
                        
                        to="/Profesor"
                    >
                        Profesor
                    </NavLink>
                        
                        
                        </>:<></>
                    }

                    {
                       user.rol ==="Matriculador"?<>
                        <NavLink 
                        
                        className={ ({ isActive })=>"nav-item nav-link " + (isActive?'active':'')} 
                        
                        to="/Matricular"
                    >
                        Matricular
                    </NavLink>
                       
                       
                       
                       </>:<></>
                    }

                  
                    {
                        
                        user.rol === "Admin"?<>
                          <NavLink 
                        
                        className={ ({ isActive })=>"nav-item nav-link " + (isActive?'active':'')} 
                        
                        to="/Carrera"
                    >
                        Carrera
                    </NavLink>
                    
                   
                    
                    
                    
                    <NavLink 
                        
                        className={ ({ isActive })=>"nav-item nav-link " + (isActive?'active':'')} 
                        
                        to="/Ciclo"
                    >
                        Ciclos
                    </NavLink>





                        
                        </>:<></>
                    }
                    { user.rol === "Admin"?
                          <NavLink 
                        
                        className={ ({ isActive })=>"nav-item nav-link " + (isActive?'active':'')} 
                        
                        to="/UserManagement"
                    >
                        Adminstrar usuarios
                    </NavLink>:<></>}

                    { user.rol === "Admin"?
                          <NavLink 
                        
                        className={ ({ isActive })=>"nav-item nav-link " + (isActive?'active':'')} 
                        
                        to="/StudentHistory"
                    >
                       Historial Alumnos
                    </NavLink>:<></>}
                  

                   
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className='nav-item nav-link text-info'>
                        {user.name}
                    </span>
                    <button onClick={handleLogout}
                        
                        className="nav-item nav-link btn" 
                     
                        to="/Login"
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}