import React, { Component } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

class MaterialList extends Component {

    state = {
        materials: [{
            _id: 1,
            materialSKU: "2342",
            materialName: "Very blue",
            materialPrimaryColor: "#fff000"
        },
        {
            _id: 2,
            materialSKU: "23aa42",
            materialName: "Very Not blue",
            materialPrimaryColor: "#001212"
        }]
    };

    refreshList(){
        console.log("Are you listening?");
        axios.get("/api/materials").then( (res) => {
            console.log("hi" + res);
            this.setState({ materials: res.data });
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    render(){
        return (
            <div>
                {
                    this.state.materials.map( material => (
                        <div key={material._id}>
                        <h1>{material.materialName}</h1>
                        <h2>{material.materialPrimaryColor}</h2>
                        <h3>{material.materialSKU}</h3>

                        </div>
                    ))
                }
            </div>
        )
    }
}

export default MaterialList;