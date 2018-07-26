import React from 'react';
import { Route } from "react-router-dom";
import axios from 'axios';

import './App.css';

import AppContext from './components/AppContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Inventory from './components/Inventory';
import MaterialList from './components/MaterialList';
import MaterialPicker from './components/MaterialPicker';
import Project from './components/Project';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import Shopping from './components/Shopping';
import UserProfile from './components/UserProfile';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.allocateProjectMaterials = (projectId, allocation) => {
            axios.post("/api/projects/" + projectId + "/materials", allocation).then((res) => {
                this.updateProjectRequirements(projectId);
            });
        };

        this.commitBasket = () => {
            axios.post("/api/shopping", {}).then((res) => {
                this.updateShopping();
            });
        };

        this.createProject = (project) => {
            axios.post("/api/projects", project).then((res) => {
                this.updateProjects();
            });
        };

        this.deleteProject = (projectId) => {
            axios.delete("/api/projects/" + projectId).then((res) => {
                this.updateProjects();
            });
        };

        this.modifyBasket = (materialId, quantity) => {
            axios.put("/api/shopping/basket/" + materialId, { quantity }).then((res) => {
                let shopping = this.state.shopping;
                shopping.basket = res.data;

                this.setState({ shopping });
            });
        };

        this.modifyProject = (project) => {
            axios.put("/api/projects/" + project._id, project).then((res) => {
                this.updateProjects();
            });
        };

        this.modifyProjectMaterialRequirement = (projectId, materialId, quantity) => {
            axios.put("/api/projects/" + projectId + "/materials/" + materialId, { quantity }).then((res) => {
                let projectRequirements = this.state.projectRequirements;
                projectRequirements[projectId] = res.data;

                this.setState({ projectRequirements });
            });
        };

        this.modifyWishlist = (materialId, quantity) => {
            axios.put("/api/shopping/wishlist/" + materialId, { quantity }).then((res) => {
                let shopping = this.state.shopping;
                shopping.wishlist = res.data;

                this.setState({ shopping });
            });
        };

        this.sortMaterialsByHue = (materials) => {
            if (!materials) {
                materials = this.state.materials;
            }
            let materialsKeys = Object.keys(materials);

            materialsKeys.sort(function(aKey, bKey) {
                let a = materials[aKey];
                let b = materials[bKey];

                let aHue = (a.hue * 1000000) + (a.saturation * 1000) + a.lightness;
                let bHue = (b.hue * 1000000) + (b.saturation * 1000) + b.lightness;

                return (aHue - bHue);
            });

            this.setState({
                materials: materials,
                materialsKeys: materialsKeys,
                materialsSort: 'hue',
            });
        };

        this.sortMaterialsByName = (materials) => {
            if (!materials) {
                materials = this.state.materials;
            }
            let materialsKeys = Object.keys(materials);

            materialsKeys.sort(function(aKey, bKey) {
                let a = materials[aKey];
                let b = materials[bKey];

                return a.name.localeCompare(b.name);
            });

            this.setState({
                materials: materials,
                materialsKeys: materialsKeys,
                materialsSort: 'name',
            });
        };

        this.sortMaterialsBySKU = (materials) => {
            if (!materials) {
                materials = this.state.materials;
            }
            let materialsKeys = Object.keys(materials);

            // Try to find the first set of numbers in each SKU and compare them
            materialsKeys.sort(function(aKey, bKey) {
                let a = materials[aKey];
                let b = materials[bKey];

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

            this.setState({
                materials: materials,
                materialsKeys: materialsKeys,
                materialsSort: 'sku',
            });
        };

        this.updateInventory = () => {
            this.setState({ inventoryLoaded: true });

            axios.get("/api/inventory").then((res) => {
                this.setState({ inventory: res.data });
            });
        };

        this.updateMaterials = () => {
            this.setState({ materialsLoaded: true });

            axios.get("/api/materials").then((res) => {
                if (this.state.materialsSort === 'name') {
                    this.sortMaterialsByName(res.data);
                } else if (this.state.materialsSort === 'sku') {
                    this.sortMaterialsBySKU(res.data);
                } else {
                    this.sortMaterialsByHue(res.data);
                }
            });
        };

        this.updateProjects = (cb) => {
            this.setState({ projectsLoaded: true });

            axios.get("/api/projects").then((res) => {
                let projects = res.data;
                let projectsKeys = Object.keys(projects);

                projectsKeys.sort(function (aKey, bKey) {
                    let a = projects[aKey];
                    let b = projects[bKey];

                    return a.name.localeCompare(b.name);
                });

                this.setState({
                    projects: projects,
                    projectsKeys: projectsKeys,
                });

                if (cb) {
                    cb();
                }
            });
        };

        this.updateProjectRequirements = (projectId) => {
            axios.get("/api/projects/" + projectId + "/materials").then((res) => {
                let projectRequirements = this.state.projectRequirements;
                projectRequirements[projectId] = res.data;
                
                this.setState({ projectRequirements });
            });
        };

        this.updateShopping = () => {
            this.setState({ shoppingLoaded: true });

            axios.get("/api/shopping").then((res) => {
                this.setState({ shopping: res.data });
            });
        };

        this.state = {
            inventory: [],
            materials: {},
            materialsKeys: [],
            materialsSort: 'hue',
            projects: {},
            projectsKeys: [],
            projectRequirements: {},
            shopping: {},

            inventoryLoaded: false,
            materialsLoaded: false,
            projectsLoaded: false,
            shoppingLoaded: false,

            allocateProjectMaterials: this.allocateProjectMaterials,
            commitBasket: this.commitBasket,
            createProject: this.createProject,
            deleteProject: this.deleteProject,
            modifyBasket: this.modifyBasket,
            modifyProject: this.modifyProject,
            modifyProjectMaterialRequirement: this.modifyProjectMaterialRequirement,
            modifyWishlist: this.modifyWishlist,

            sortMaterialsByHue: this.sortMaterialsByHue,
            sortMaterialsByName: this.sortMaterialsByName,
            sortMaterialsBySKU: this.sortMaterialsBySKU,

            updateInventory: this.updateInventory,
            updateMaterials: this.updateMaterials,
            updateProjects: this.updateProjects,
            updateProjectRequirements: this.updateProjectRequirements,
            updateShopping: this.updateShopping,
        };
    };

    componentWillMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/authed').then((res) => {
            // do nothing
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                this.props.history.push("/login");
            }
        });
    };

    render() {
        return (
            <AppContext.Provider value={this.state}>
                <Navbar />
                <Sidebar />

                <Route path="/createProject" component={ProjectForm} />
                <Route path="/inventory" component={Inventory} />
                <Route path="/materialPicker/:id" component={MaterialPicker} />
                <Route path="/materials" component={MaterialList} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/project/:id" component={Project} />
                <Route path="/projects" component={ProjectList} />
                <Route path="/shopping" component={Shopping} />
            </AppContext.Provider>
        );
    };
}


export default App;
