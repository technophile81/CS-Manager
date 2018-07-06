import React, { Component } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

class MaterialListElement extends Component {
    render() {
        let rgb = [ this.props.material.materialRed, this.props.material.materialGreen, this.props.material.materialBlue ];
        let styles = {
            width: '20px',
            height: '20px',
            display: 'inline-block',
            backgroundColor: `rgb(${rgb})`,
        };

        return (
            <div key={this.props.material._id}>
                <h1>{this.props.material.materialName}</h1>
                <h2><div style={styles}></div></h2>
                <h3>{this.props.material.materialSKU}</h3>
            </div>
        );
    }
}

class MaterialList extends Component {

    state = {
        materials: []
    };

    refreshList() {
        console.log("Are you listening?");
        axios.get("/api/materials").then( (res) => {
            console.log("hi" + res);
            this.setState({ materials: res.data });
        })
    }

    componentDidMount() {
        this.refreshList();
    }

    // ColorList(props) {
    //     const colors = props.colors;
    //     const listItems = colors.map((color) => 
    //     <li key={color.toString()}>
    //     {color}
    //     </li>
    //     );
    //     return (
    //         <ul>{listItems}</ul>
    //     );
    // }
    // <div key={material._id}>
    // <h1>{material.materialName}</h1>
    // <h2><div style={{ width: '20px', height: '20px', display: 'inline-block', backgroundColor: 'rgb({material.materialRed}, {material.materialGreen}, {material.materialBlue})' }}></div></h2>
    // <h3>{material.materialSKU}</h3>
    // <this.ColorList colors={this.colors} />
    // </div>
    render() {
        return (
            <div>
                {
                    this.state.materials.map( material => (
                        <MaterialListElement material={material} />
                    ))
                }
            </div>
        )
    }
}

export default MaterialList;