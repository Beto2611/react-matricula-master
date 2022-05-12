import { Route,Routes } from "react-router-dom"
import CarreraScreen from "../carrera/CarreraScreen"
import CicloScreen from "../ciclos/CicloScreen"
import { AcademicRecordScreen } from "../Components/AcademicRecordScreen"
import { CourseScreen } from "../Components/CourseScreen"
import { ProfesorScreen } from "../Components/ProfesorScreen"
import { StudentScreen } from "../Components/StudentScreen"
import CursoPorCarerraScreen from "../cursos/CursoPorCarreraScreen"
import GruposMatricula from "../grupos/GruposMatricular"
import GruposScreen from "../grupos/GruposScreen"
import { Navbar } from "../ui/Navbar"
import UserManagerScreen from "../admins/UserManagerScreen"
import StudentHistoryScreen from "../alumnos/StudentHistoryScreen"

export const DashboardRoutes = () => {
  return (

    <>
    <Navbar />
    <Routes>     
        <Route path="/" element={<StudentScreen />} />
        <Route path="/Course" element={<CourseScreen />} />
        <Route path="/Profesor" element={<ProfesorScreen />} />
        <Route path="/AcademicRecord" element={<AcademicRecordScreen />}/>
        <Route path="/Carrera" element={<CarreraScreen />}/>
        <Route path="/Curso/:id" element={<CursoPorCarerraScreen />}/>
        <Route path="/Ciclo" element={<CicloScreen />}/>
        <Route path="/Grupos/:idcurso" element={<GruposScreen />}/>
        <Route path="/Matricular" element={<GruposMatricula />}/>
        <Route path="/UserManagement" element={<UserManagerScreen/>}/>
        <Route path="/StudentHistory" element={<StudentHistoryScreen/>}/>
        </Routes>
    
    
    
    
    </>
  )
}
