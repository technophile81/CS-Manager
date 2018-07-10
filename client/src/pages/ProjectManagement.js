import React from "react"
import { Link, withRouter } from "react-router-dom";
import axios from "axios"

class PostProject extends React.Component {
    state = {
        projectPhoto: "",
        projectDescription: "",
        projectUrl: "",
        projectActive: "",
        projectPercentComplete: ""
    }
    handleInputChange = event => {
        const {name, value} = event.target;
        console.log(name);
        this.setState({ [name]: value });
    }
    postProject = event => {
        event.preventDefault();
        const { projectPhoto, projectDescription, projectUrl, projectActive, projectPercentComplete } = this.state;
        axios.post("/api/projects", { projectPhoto, projectDescription, projectUrl, projectActive, projectPercentComplete }).then(res => {
            console.log(res);
            this.setState({ projectPhoto: "", projectDescription: "", projectUrl: "", projectActive, projectPercentComplete });
            this.props.history.push("/");
        })
    }
    render(){
        return(
            <div>
                <Link to="/">Home</Link>
                
            </div>
        )
    }
}