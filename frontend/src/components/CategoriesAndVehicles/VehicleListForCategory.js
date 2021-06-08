import React, {useState, useEffect} from "react";
import axios from "axios";

export default function VehicleListForCategory(props) {

    const [category, setCategory] = useState({
        id: "",
        name: ""
    })

    useEffect(() => {
        getCategory();
    }, [])

    function getCategory() {
        const categoryId = props.match.params.id;
        axios.get("http://localhost:5000/category/" + categoryId).then((res) => {
            console.log(res.data);
            setCategory(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    const [categoryVehicles, setCategoryVehicles] = useState([]);

    useEffect(() => {
        getCategoryVehicles();
    }, [])

    function getCategoryVehicles() {
        const categoryId = props.match.params.id;
        axios.get("http://localhost:5000/vehicles-categories/category/"+categoryId).then((res) => {
            setCategoryVehicles(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewVehicle(vehicleId) {
        props.history.push("vehicle/view/"+vehicleId)
    }

    function addCharge(vehicleCatId) {
        props.history.push("/charge/add/"+vehicleCatId)
    }

    function calculateCharge(vehicleCatId) {
        props.history.push("/charge/calculate/"+vehicleCatId)
    }

    return(
        <div className="container" style={{marginTop: 20}}>
            <div className="card" style={{width : "50%"}}>
                <div className="card-header">
                    <h4>{category.name}</h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="id" className="col-sm-3">Category Id</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="id" value={category.id} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3">Category Name</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="name" value={category.name} readOnly/>
                            </div>
                        </div><br/>
                    </form>
                </div>
            </div><br/>

            <h3>Vehicles</h3><br/>
            <table className="table table-striped table-light">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Charge per 1 Km</th>
                    <th scope="col">View</th>
                    <th scope="col">Charge</th>
                    <th scope="col">Calculate</th>
                </tr>
                </thead>
                <tbody>
                {
                    categoryVehicles.length === 0 ?
                        <tr align="center">
                            <td colSpan="6">No Records Available</td>
                        </tr> :
                        categoryVehicles.map((categoryVehicle, index) => (
                            <tr key={index}>
                                <td>{categoryVehicle.id}</td>
                                <td>{categoryVehicle.vehicleName}</td>
                                <td>Rs. {categoryVehicle.chargeForKM}</td>
                                <td><button className="btn btn-primary" onClick={() => viewVehicle(categoryVehicle.vehicleId)}>View</button></td>
                                <td><button className="btn btn-dark" onClick={() => addCharge(categoryVehicle.id)}>Add Charge</button></td>
                                <td><button className="btn btn-success" onClick={() => calculateCharge(categoryVehicle.id)}>Calculate</button></td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    )
}