import React from "react"
import { Link } from "react-router-dom";

import AppContext from './AppContext';


class ProjectListElement extends React.Component {
    render() {
        const linkPath = "/project/" + this.props.project._id;

        return (
            <li>
                <Link to={linkPath}>{this.props.project.name}</Link>
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
                            this.props.projectsKeys.map((projectKey) => (
                                <ProjectListElement key={projectKey} project={this.props.projects[projectKey]} />
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
                            projectsKeys={context.projectsKeys}
                            projects={context.projects}
                            />
                    }
                }
            </AppContext.Consumer>
        )
    }
}

export default ProjectList;
