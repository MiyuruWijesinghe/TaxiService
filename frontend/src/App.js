import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "./components/Header";
import CategoryList from "./components/Category/CategoryList";
import AddCategory from "./components/Category/AddCategory";
import VehicleList from "./components/Vehicle/VehicleList";
import VehicleListForCategory from "./components/CategoriesAndVehicles/VehicleListForCategory";
import ViewVehicleForCategory from "./components/CategoriesAndVehicles/ViewVehicleForCategory";
import AddVehicle from "./components/Vehicle/AddVehicle";
import ViewVehicle from "./components/Vehicle/ViewVehicle";
import AddVehicleTripCharges from "./components/Trips/AddVehicleTripCharges";
import CalculateTripCharges from "./components/Trips/CalculateTripCharges";

function App() {
  return (
    <Router>
        <div>
            <Header/>
            <Route path="/category/add" exact component={AddCategory} />
            <Route path="/category/:id/vehicles" exact component={VehicleListForCategory} />
            <Route path="/category/:id/vehicle/view/:id" exact component={ViewVehicleForCategory} />
            <Route path="/vehicles" exact component={VehicleList} />
            <Route path="/vehicle/add" exact component={AddVehicle} />
            <Route path="/vehicle/view/:id" exact component={ViewVehicle} />
            <Route path="/charge/add/:id" exact component={AddVehicleTripCharges} />
            <Route path="/charge/calculate/:id" exact component={CalculateTripCharges} />
            <Route path="/" exact component={CategoryList} />
        </div>
    </Router>
  );
}

export default App;
