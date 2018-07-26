import React from "react"
import { Link } from "react-router-dom";

import AppContext from './AppContext';


class ProjectListElement extends React.Component {
    render() {
        return (
            <li>
                <Link to="/project/{this.props.project._id}">{this.props.project.name}</Link>
            </li>
        );
    }
}

class ProjectListInterior extends React.Component {
    render() {
        return (
            <div>
                <div>
                </div>
                <div>
                    <ul>
                        {
                            this.props.projects.map((project) => (
                                <ProjectListElement key={project._id} project={project} />
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

class ProjectList extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {
                    (context) => {
                        if (!context.projectsLoaded) {
                            context.updateProjects();
                        }

                        return <ProjectListInterior
                            projects={context.projects}
                            />
                    }
                }
            </AppContext.Consumer>
        )
    }
}

export default ProjectList;
