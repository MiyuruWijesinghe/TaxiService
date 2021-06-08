import React, {useState} from "react";
import axios from "axios";

export default function AddCategory(props) {

    const [data, setData] = useState({
        name: ""
    })

    function submit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/category/add", data).then((res) => {
            console.log(data);
            alert(res.data.messages);
            props.history.push("/");
        }).catch((err) => {
            alert(err);
        })
    }

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    return(
        <div className="container" style={{marginTop: 10}}>
            <div className="card" style={{width : "50%"}}>
                <div className="card-header">
                    <h4>Add Category</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3">Category Name</label>
                            <div className="col-sm-5">
                                <input type="text" onChange={(e) => handle(e)} className="form-control" id="name" placeholder="Enter Category Name" value={data.name} required/>
                            </div>
                        </div><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}