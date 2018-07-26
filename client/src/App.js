import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import './App.css';

import AppContext from './components/AppContext';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

// import InventoryList from './components/InventoryList';
import MaterialList from './components/MaterialList';
import ProjectList from './components/ProjectList';
// import Shopping from './components/Shopping';
// import UserProfile from './components/UserProfile';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.sortMaterialsByHue = () => {
            let materials = this.state.materials.slice();

            materials.sort(function(a, b) {
                let aHue = (a.hue * 1000000) + (a.saturation * 1000) + a.lightness;
                let bHue = (b.hue * 1000000) + (b.saturation * 1000) + b.lightness;

                return (aHue - bHue);
            });

            this.setState({ materials });
        };

        this.sortMaterialsByName = () => {
            let materials = this.state.materials.slice();
            materials.sort(function(a, b) { return a.name.localeCompare(b.name); });
            this.setState({ materials });
        };

        this.sortMaterialsBySKU = () => {
            let materials = this.state.materials.slice();

            // Try to find the first set of numbers in each SKU and compare them
            materials.sort(function(a, b) {
                let allRegex = /^\d+$/;

                let aAll = allRegex.exec(a.sku) !== null;
                let bAll = allRegex.exec(b.sku) !== null;

                if (aAll !== bAll) {
                    return (aAll ? -1 : 1);
                }

                let numRegex = /\d+/;
                let aNum = numRegex.exec(a.sku);
                let bNum = numRegex.exec(b.sku);

                if (aNum && bNum) {
                    return aNum - bNum;
                }

                return a.sku.localeCompare(b.sku);
            });

            this.setState({ materials });
        };

        this.updateInventory = () => {
            this.setState({ inventoryLoaded: true });
        };

        this.updateMaterials = () => {
            this.setState({ materialsLoaded: true });

            axios.get("/api/materials").then((res) => {
                this.setState({ materials: res.data });
            })
        };

        this.updateProjects = () => {
            this.setState({ projectsLoaded: true });

            axios.get("/api/projects").then((res) => {
                this.setState({ projects: res.data });
            })
        };

        this.state = {
            inventory: [],
            materials: [],
            projects: [],

            inventoryLoaded: false,
            materialsLoaded: false,
            projectsLoaded: false,

            sortMaterialsByHue: this.sortMaterialsByHue,
            sortMaterialsByName: this.sortMaterialsByName,
            sortMaterialsBySKU: this.sortMaterialsBySKU,

            updateInventory: this.updateInventory,
            updateMaterials: this.updateMaterials,
            updateProjects: this.updateProjects,
        };
    };

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    };

    render() {
        return (
            <AppContext.Provider value={this.state}>
                <Router>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />

                        <Route path="/materials" component={MaterialList} />
                        <Route path="/projects" component={ProjectList} />
                    </div>
                </Router>
            </AppContext.Provider>
        );
    };
}

/*

                    <Route path="/inventory" component={InventoryList} />
                    <Route path="/profile" component={UserProfile} />
                    <Route path="/shopping" component={Shopping} />
                    */

export default App;
