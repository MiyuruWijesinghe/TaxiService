import React, {useState, useEffect} from "react";
import axios from "axios";

export default function CategoryList(props) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    function getCategories() {
        axios.get("http://localhost:5000/category/all").then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewCategory(categoryId) {
        props.history.push("category/"+categoryId+"/vehicles")
    }

    function addCategory() {
        props.history.push("category/add")
    }

    return(
        <div className="container" style={{marginTop: 20}}>
            <div className="form-group row">
                <h3 className="col-sm-3">Category List</h3>
                <div className="col-sm-5">
                    <button className="btn btn-success" onClick={() => addCategory()}>+ Add Category</button>
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
                    categories.length === 0 ?
                        <tr align="center">
                            <td colSpan="6">No Records Available</td>
                        </tr> :
                        categories.map((category, index) => (
                            <tr key={index}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td><button className="btn btn-primary" onClick={() => viewCategory(category.id)}>View</button></td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    )
}