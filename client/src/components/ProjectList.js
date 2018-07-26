import React from "react"
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";
import "./ProjectList.css";

import AppContext from './AppContext';


class ProjectListElement extends React.Component {
    render() {
        const linkPath = "/project/" + this.props.project._id;

        return (
            <li className="d-flex flex-row align-items-center justify-content-between">
                <img src={this.props.project.photoUrl} alt={this.props.project.name} />
                <Link to={linkPath}>{this.props.project.name}</Link>
                <span>{this.props.project.percentComplete}%</span>
                <Button color="danger">Delete</Button>
            </li>
        );
    }
}

class ProjectListInterior extends React.Component {
    componentWillMount() {
        if (!this.props.context.projectsLoaded) {
            this.props.context.updateProjects();
        }
    }

    render() {
        return (
            <div>
                <div>
                </div>
                <div>
                <Navbar fluid={true}>
                Nav test
                </Navbar>
<SideBar />
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
                        return <ProjectListInterior
                            context={context}
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
