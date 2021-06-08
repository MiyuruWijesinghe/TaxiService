import React, {useState, useEffect} from "react";
import axios from "axios";

export default function CalculateTripCharges(props) {

    const [data, setData] = useState({
        id: "",
        categoryName: "",
        vehicleName: "",
        chargeForKM: "",
        kilometersNumber: ""
    })

    const [chargeData, setChargeData] = useState({
        duration: ""
    })

    useEffect(() => {
        getCategoryVehicle();
    }, [])

    function getCategoryVehicle() {
        const categoryVehicleId = props.match.params.id;
        axios.get("http://localhost:5000/vehicles-categories/" + categoryVehicleId).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const catVehId = props.match.params.id;
        axios.post("http://localhost:5000/vehicles-categories/calculate/" + catVehId, chargeData).then((res) => {
            console.log(chargeData);
            alert(res.data.messages);
        }).catch((err) => {
            alert(err);
        })
    }

    function handle(e) {
        const newData = {...chargeData}
        newData[e.target.id] = e.target.value
        setChargeData(newData)
    }

    return(
        <div className="container" style={{marginTop: 20}}>
            <div className="card" style={{width : "50%"}}>
                <div className="card-header">
                    <h4>Calculate Trip Charge</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                        <div className="form-group row">
                            <label htmlFor="id" className="col-sm-3">Id</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="id" value={data.id} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="categoryName" className="col-sm-3">Category Name</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="categoryName" value={data.categoryName} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="vehicleName" className="col-sm-3">Vehicle Name</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="vehicleName" value={data.vehicleName} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="chargeForKM" className="col-sm-3">Charge per KM</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="chargeForKM" value={data.chargeForKM} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="kilometersNumber" className="col-sm-3">Number of KM</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="kilometersNumber" value={data.kilometersNumber} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="duration" className="col-sm-3">Number of Duration (in KM)</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" onChange={(e) => handle(e)} id="duration" placeholder="Enter Duration" value={chargeData.duration} required/>
                            </div>
                        </div><br/>
                        <button type="submit" className="btn btn-primary">Calculate</button>
                    </form>
                </div>
            </div><br/>
        </div>
    )
}