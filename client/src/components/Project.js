import React from "react"
import { Link } from "react-router-dom";

import AppContext from './AppContext';
import MaterialList from './MaterialList';


class ProjectDisplay extends React.Component {
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

        const pickerPath = "/materialPicker/" + project._id;

        return (
            <div>
                <h1>
                    {project.name}
                </h1>
                <MaterialList quantities={quantities} quantityCallbacks={requirementCallbacks} />
                <Link to={pickerPath}>Add new material requirement</Link>
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
        return <ProjectDisplay context={this.props.context} project={project} requirements={requirements} />
    }
}


class Project extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {
                    (context) => (
                        <ProjectInterior context={context} match={this.props.match} />
                    )
                }
            </AppContext.Consumer>
        )
    }
}

export default Project;
