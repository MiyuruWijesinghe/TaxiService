import React, {useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";

export default function AddVehicle(props) {

    const [categoryList, setCategoryList] = useState([]);
    const [optionsList, setOptionsList] = useState([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [model, setModel] = useState("");
    const [type, setType] = useState("");
    const [categories, setCategories] = useState([]);

    function onSelect(e) {
        let cat = []
        cat = e.map((topping, index) => ({
            categoryId : topping.value
        }))
        setCategories(cat)
    }

    useEffect(() => {
        getCategories();
    }, [])

    function getCategories() {
        axios.get("http://localhost:5000/category/all").then((res) => {
            setCategoryList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if(categoryList.length > 0) {
            setOptionValues();
        }
    }, [categoryList])

    function setOptionValues() {
        const gotOptions = categoryList.map((category, index) => ({
            value : category.id,
            label : category.name
        }))
        setOptionsList(gotOptions)
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            name,
            code,
            model,
            type,
            categories
        }
        axios.post("http://localhost:5000/vehicle/add", dataObject).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/vehicles");
        }).catch((err) => {
            alert(err);
        })
    }

    return(
        <div className="container" style={{marginTop: 10}}>
            <div className="card" style={{width : "50%"}}>
                <div className="card-header">
                    <h4>Add Vehicle</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3">Vehicle Name</label>
                            <div className="col-sm-5">
                                <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder="Enter Vehicle Name" required/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="code" className="col-sm-3">Vehicle Code</label>
                            <div className="col-sm-5">
                                <input type="text" onChange={(e) => setCode(e.target.value)} className="form-control" id="code" placeholder="Enter Vehicle Code" required/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="model" className="col-sm-3">Vehicle Model</label>
                            <div className="col-sm-5">
                                <input type="text" onChange={(e) => setModel(e.target.value)} className="form-control" id="model" placeholder="Enter Vehicle Model" required/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="type" className="col-sm-3">Vehicle Type</label>
                            <div className="col-sm-5">
                                <input type="text" onChange={(e) => setType(e.target.value)} className="form-control" id="type" placeholder="Enter Vehicle Type" required/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="categories" className="col-sm-3">Categories</label>
                            <div className="col-sm-5">
                                <Select options={optionsList} onChange={(e) => onSelect(e)} id="categories" placeholder="Select Category" className="basic-multi-select" isMulti autoFocus isSearchable/>
                            </div>
                        </div><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}