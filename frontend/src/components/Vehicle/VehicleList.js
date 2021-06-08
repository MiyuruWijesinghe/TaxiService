import React, {useState, useEffect} from "react";
import axios from "axios";

export default function VehicleList(props) {

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getVehicles();
    }, [])

    function getVehicles() {
        axios.get("http://localhost:5000/vehicle/all").then((res) => {
            setVehicles(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewVehicle(vehicleId) {
        props.history.push("vehicle/view/"+vehicleId)
    }

    function addVehicle() {
        props.history.push("vehicle/add")
    }

    return(
        <div className="container" style={{marginTop: 20}}>
            <div className="form-group row">
                <h3 className="col-sm-3">Vehicle List</h3>
                <div className="col-sm-5">
                    <button className="btn btn-success" onClick={() => addVehicle()}>+ Add Vehicle</button>
                </div>
            </div><br/>
            <table className="table table-striped table-light">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">View</th>
                </tr>
                </thead>
                <tbody>
                {
                    vehicles.length === 0 ?
                        <tr align="center">
                            <td colSpan="6">No Records Available</td>
                        </tr> :
                        vehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.name}</td>
                                <td><button className="btn btn-primary" onClick={() => viewVehicle(vehicle.id)}>View</button></td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    )
}