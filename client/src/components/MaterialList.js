import React from "react";

import AppContext from "./AppContext";
import "./MaterialList.css";

class MaterialListElement extends React.Component {
  render() {
    let rgb = [
      this.props.material.red,
      this.props.material.green,
      this.props.material.blue
    ];
    let styles = {
      display: "inline-block",
      backgroundColor: `rgb(${rgb})`
    };

    return (
      <li className="materialList d-flex flex-row align-items-center">
        <div className="materialColorBlock" style={styles} />
        <div className="d-flex flex-column">
          <h2 className="materialSKU">{this.props.material.sku}</h2>
          <span className="materialName">{this.props.material.name}</span>
        </div>
      </li>
    );
  }
}

class MaterialListInterior extends React.Component {
  sortHue = e => {
    e.preventDefault();
    this.props.sortHue();
  };

  sortName = e => {
    e.preventDefault();
    this.props.sortName();
  };

  sortSKU = e => {
    e.preventDefault();
    this.props.sortSKU();
  };

  render() {
    return (
      <div>
        <ul
          className="nav nav-pills flex-md-row mb-2 justify-content-around"
          id="tabs-text"
          role="tablist"
        >
          <li className="nav-item">
            <button className="btn btn-primary nav-link mb-sm-3 mb-md-0" onClick={this.sortHue}>Hue</button>
          </li>
          <li className="nav-item">
            <button className="btn btn-primary nav-link mb-sm-3 mb-md-0" onClick={this.sortName}>Name</button>
          </li>
          <li className="nav-item">
            <button className="btn btn-primary nav-link mb-sm-3 mb-md-0" onClick={this.sortSKU}>SKU</button>
          </li>
        </ul>
        <div>
          <ul>
            {this.props.materialsKeys.map(materialKey => (
              <MaterialListElement
                key={materialKey}
                material={this.props.materials[materialKey]}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class MaterialList extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => {
          if (!context.materialsLoaded) {
            context.updateMaterials();
          }

          return (
            <MaterialListInterior
              materialsKeys={context.materialsKeys}
              materials={context.materials}
              sortHue={context.sortMaterialsByHue}
              sortName={context.sortMaterialsByName}
              sortSKU={context.sortMaterialsBySKU}
            />
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default MaterialList;
