import { useEffect, useState } from "react";
import { Search } from 'react-bootstrap-icons';

export default function StudentHistoryScreen(){
const [Data, setData] = useState([]);
const ws = new WebSocket("ws://localhost:8080/Willyrex/nota");
const [bids, setBids] = useState([]);
const [busqueda, setBusqueda] = useState("");
const [refrescar, setRefrescar] = useState(true);

useEffect(() => {
    
}, [refrescar]);

const apiCall = {
    action: "GETHISTORIALPORID",
    idAlumno: busqueda
  };

ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    console.log(json);
    switch (json.action) {
        case 'GETHISTORIALPORID':   
            setData(json.data);
            break;
        default:
            break;
    }
}

const handleSearch = () => {
    if (busqueda !== "")
    {
        ws.send(JSON.stringify(apiCall));    
    }
    else{   
        setData([])     
    }    
    setRefrescar(!refrescar)
}
function handleOnChangeInputSearch(e){
    setBusqueda(e.target.value)
}

    return(
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="container">
            <div className="row">      
                <div className="col-sm">
                    <label className='buscador'>Id Alumno</label>
                </div>
                <div className="col-sm">
                    <div className="container d-flex justify-content-center">
                            <div className="input-group col-sm-7 input-group-lg align-content-start">
                                <div className="input-group-prepend">                                    
                                </div> 
                                <input type="text" className="form-control" onChange={(e)=>handleOnChangeInputSearch(e)} placeholder={"Buscar.."}/>                                 
                                <button type="button" className="btn btn-dark" onClick={()=>handleSearch()}><Search/></button>       
                            </div>
                    </div>
                </div>
                <div className="col-sm">
                    
                </div>
            </div>
            <br/>
            <br/>
        <div className="row">
        <div className="table-responsive">
          <table className="table table-hover table-condensed table-striped">
            <thead>
              <tr>
                
                <th scope="col" className="text-center col-sm-1"><span className="hover-mieo">IdProfesor</span></th>
                <th scope="col" className="text-center col-sm-1"><span className="hover-mieo">CodigoCurso</span></th>
                <th scope="col" className="text-center col-sm-1"><span className="hover-mieo">Nota</span></th>
              </tr>
            </thead>
            <tbody>   
              { Data === undefined || Data.length === 0 ?<tr key={"Vacio"}><th>NO DATA</th></tr>:Data.map(( data =>  {
                return(
                <tr key={data.Nombre}>
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