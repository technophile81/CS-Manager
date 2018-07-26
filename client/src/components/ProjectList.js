import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./ProjectList.css";

import AppContext from "./AppContext";

class ProjectListElement extends React.Component {
    onClickDelete = (e) => {
        e.preventDefault();
        this.props.deleteProject(this.props.project._id);
    };

    render() {
        const linkPath = "/project/" + this.props.project._id;

        return (
            <li className="d-flex flex-row align-items-center justify-content-between">
                <img src={this.props.project.photoUrl} alt={this.props.project.name} />
                <Link to={linkPath}>{this.props.project.name}</Link>
                <span>{this.props.project.percentComplete}%</span>
                <Button color="danger" onClick={this.onClickDelete}>Delete</Button>
            </li>
        );
    }
}

class ProjectListInterior extends React.Component {
    createNewProject = (e) => {
        e.preventDefault();
        this.props.history.push("/createProject");
    };

  componentWillMount() {
    if (!this.props.context.projectsLoaded) {
      this.props.context.updateProjects();
    }
  };

    render() {
        return (
            <div>
                <div>
                    <ul>
                        {
                            this.props.projectsKeys.map((projectKey) => (
                                <ProjectListElement key={projectKey} project={this.props.projects[projectKey]} deleteProject={this.props.context.deleteProject} />
                            ))
                        }
                    </ul>
                </div>
        <ul className="nav nav-pills flex-md-row mb-2 justify-content-around">
          <li className="nav-item">
            <button className="btn btn-success nav-link mb-sm-3 mb-md-0" onClick={this.createNewProject}>Create New Project</button>
          </li>
        </ul>
            </div>
        )
    }
}

class ProjectList extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => {
          return (
            <ProjectListInterior
              context={context}
              history={this.props.history}
              projectsKeys={context.projectsKeys}
              projects={context.projects}
            />
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default ProjectList;
