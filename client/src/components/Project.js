import React from "react"

import AppContext from './AppContext';


class ProjectDisplay extends React.Component {
    render() {
        const project = this.props.project;

        return (
            <h1>
                {project.name}
            </h1>
        )
    }
}


class Project extends React.Component {
    render() {
        let params = this.props.match.params;

        return (
            <AppContext.Consumer>
                {
                    (context) => {
                        for (let project of context.projects) {
                            if (project._id == params.id) {
                                return <ProjectDisplay context={context} project={project} />
                            }
                        }

                        return <div>Project not found</div>
                    }
                }
            </AppContext.Consumer>
        )
    }
}

export default Project;
