import React from "react"

import AppContext from './AppContext';


class ProjectFormInterior extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            infoUrl: '',
            photoUrl: '',
            message: '',
        };
    };

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.name.length < 1) {
            this.setState({ message: 'You must specify a name for your project.' });
            return;
        }

        if (this.state.infoUrl.length > 0) {
            if (!(this.state.infoUrl.startsWith('http://') || this.state.infoUrl.startsWith('https://'))) {
                this.setState({ message: 'You must specify a valid Info URL or leave it blank.' });
                return;
            }
        }

        if (this.state.photoUrl.length > 0) {
            const photoUrl = this.state.photoUrl;

            if (!(photoUrl.startsWith('http://') || photoUrl.startsWith('https://'))) {
                this.setState({ message: 'You must specify a valid Photo URL or leave it blank.' });
                return;
            }

            if (!(photoUrl.endsWith('.gif') || photoUrl.endsWith('.jpg') || photoUrl.endsWith('.png'))) {
                this.setState({ message: 'You must specify a .gif, .jpg, or .png for your Photo URL or leave it blank.' });
                return;
            }
        }

        this.setState({ message: '' });

        this.props.context.createProject({
            name: this.state.name,
            description: this.state.description,
            infoUrl: this.state.infoUrl,
            photoUrl: this.state.photoUrl,
            active: true,
            percentComplete: 0,
        });

        this.props.history.push('/projects');
    };

    render() {
        const {
            name,
            description,
            infoUrl,
            photoUrl,
            message,
        } = this.state;

        return (
            <div className="container">
                <form className="form-newproject" onSubmit={this.onSubmit}>
                    {
                        message !== '' &&
                            <div className="alert alert-warning alert-dismissible" role="alert">
                                { message }
                            </div>
                    }
                    <h2 className="form-newproject-heading">Create Project</h2>
                    <label htmlFor="inputName" className="sr-only">Email address</label>
                    <input type="text" className="form-control" placeholder="Project Name" name="name" value={name} onChange={this.onChange} required />
                    <label htmlFor="inputDescription" className="sr-only">Description</label>
                    <input type="text" className="form-control" placeholder="Description" name="description" value={description} onChange={this.onChange} />
                    <label htmlFor="inputInfoUrl" className="sr-only">Info URL</label>
                    <input type="text" className="form-control" placeholder="Info URL" name="infoUrl" value={infoUrl} onChange={this.onChange} />
                    <label htmlFor="inputPhotoUrl" className="sr-only">Photo URL</label>
                    <input type="text" className="form-control" placeholder="Photo URL" name="photoUrl" value={photoUrl} onChange={this.onChange} />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Create Project</button>
                </form>
            </div>
        );

    }
}


class ProjectForm extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {
                    (context) => (
                        <ProjectFormInterior context={context} match={this.props.match} history={this.props.history}/>
                    )
                }
            </AppContext.Consumer>
        )
    }
}

export default ProjectForm;
