import React from "react"
import { Link } from "react-router-dom";

import AppContext from './AppContext';
import MaterialList from './MaterialList';


class ProjectDisplay extends React.Component {
    addMaterialRequirement = (e) => {
        e.preventDefault();
        this.props.history.push("/materialPicker/" + this.props.project._id);
    };

    allocateMaterials = (e) => {
        e.preventDefault();

        let allocation = this.props.requirements.shouldAllocateFromInventory || {};
        this.props.context.allocateProjectMaterials(this.props.project._id, allocation);
    };

    decrementRequirement = (material) => {
        let requirements = this.props.requirements.totalRequired || {};

        if (requirements[material._id] !== undefined) {
            this.props.context.modifyProjectMaterialRequirement(this.props.project._id, material._id, requirements[material._id] - 1);
        }
    };

    incrementRequirement = (material) => {
        let requirements = this.props.requirements.totalRequired || {};

        if (requirements[material._id] !== undefined) {
            this.props.context.modifyProjectMaterialRequirement(this.props.project._id, material._id, requirements[material._id] + 1);
        }
    };

    componentWillMount() {
        this.props.context.updateProjectRequirements(this.props.project._id);
    }

    render() {
        const project = this.props.project;
        const requirements = this.props.requirements;

        let quantities = {};

        if (requirements) {
            for (let materialId of Object.keys(requirements.totalRequired)) {
                quantities[materialId] = [
                    requirements.allocatedFromInventory[materialId],
                    requirements.totalRequired[materialId],
                ];
            }
        }

        const requirementCallbacks = {
            decrement: this.decrementRequirement,
            increment: this.incrementRequirement,
        };

        return (
            <div>
                <h1>{project.name}</h1>
                <h3>Material Requirements</h3>
                <h5>Allocated/Total Required</h5>
                <h5>+/- Add/Subtract Required Materials</h5>
                <MaterialList quantities={quantities} quantityCallbacks={requirementCallbacks} />

        <ul className="nav nav-pills flex-md-row mb-2 justify-content-around">
          <li className="nav-item">
            <button className="btn btn-success nav-link mb-sm-3 mb-md-0" onClick={this.addMaterialRequirement}>Add New Requirement</button>
          </li>
          <li className="nav-item">
            <button className="btn btn-info nav-link mb-sm-3 mb-md-0" onClick={this.allocateMaterials}>Allocate Available Materials</button>
          </li>
        </ul>
            </div>
        )
    }
}


class ProjectInterior extends React.Component {
    componentWillMount() {
        if (!this.props.context.projectsLoaded) {
            this.props.context.updateProjects();
        }
    }

    render() {
        let params = this.props.match.params;
        let project = this.props.context.projects[params.id];

        if (!project) {
            return <div>Project not found</div>
        }

        let requirements = this.props.context.projectRequirements[params.id];
        return <ProjectDisplay context={this.props.context} history={this.props.history} project={project} requirements={requirements} />
    }
}


class Project extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {
                    (context) => (
                        <ProjectInterior context={context} history={this.props.history} match={this.props.match} />
                    )
                }
            </AppContext.Consumer>
        )
    }
}

export default Project;
