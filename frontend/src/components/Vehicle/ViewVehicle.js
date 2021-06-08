import React, {useState, useEffect} from "react";
import axios from "axios";

export default function ViewVehicle(props) {

    const [vehicle, setVehicle] = useState({
        id: "",
        name: "",
        code: "",
        model: "",
        type:""
    })

    useEffect(() => {
        getVehicle();
    }, [])

    function getVehicle() {
        const vehicleId = props.match.params.id;
        axios.get("http://localhost:5000/vehicle/" + vehicleId).then((res) => {
            console.log(res.data);
            setVehicle(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    return(
        <div className="container" style={{marginTop: 20}}>
            <div className="card" style={{width : "50%"}}>
                <div className="card-header">
                    <h4>Vehicle Details</h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="id" className="col-sm-3">Vehicle Id</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="id" value={vehicle.id} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3">Vehicle Name</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="name" value={vehicle.name} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="code" className="col-sm-3">Vehicle Code</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="code" value={vehicle.code} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="model" className="col-sm-3">Vehicle Model</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="model" value={vehicle.model} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="type" className="col-sm-3">Vehicle Type</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="type" value={vehicle.type} readOnly/>
                            </div>
                        </div><br/>
                    </form>
                </div>
            </div><br/>
        </div>
    )
}