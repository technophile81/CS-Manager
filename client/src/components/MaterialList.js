import React from "react";

import AppContext from "./AppContext";
import "./MaterialList.css";

class MaterialListElement extends React.Component {
  decrementQuantity = e => {
    e.preventDefault();
    this.props.quantityCallbacks.decrement(this.props.material);
  };

  incrementQuantity = e => {
    e.preventDefault();
    this.props.quantityCallbacks.increment(this.props.material);
  };

  pickMaterial = e => {
    e.preventDefault();
    if (this.props.pickerCallback) {
      this.props.pickerCallback(this.props.material);
    }
  };

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
        <div className="materialColorBlock" style={styles} onClick={this.pickMaterial} />
        <div className="d-flex flex-column" onClick={this.pickMaterial} >
          <h2 className="materialSKU">{this.props.material.sku}</h2>
          <span className="materialName">{this.props.material.name}</span>
        </div>
        {
            (this.props.quantity !== undefined) &&
                <div className="d-flex flex-column ml-auto p-2">
                  {
                      (this.props.quantityCallbacks !== undefined) &&
                          ((this.props.quantity === 1)
                              ? <button className="btn btn-secondary btn-sm" onClick={this.decrementQuantity}>X</button>
                              : <button className="btn btn-secondary btn-sm" onClick={this.decrementQuantity}>-</button>)
                              
                  }
                  {
                      (Array.isArray(this.props.quantity))
                          ? <span className="materialQuantity">{this.props.quantity[0]} / {this.props.quantity[1]}</span>
                          : <span className="materialQuantity">{this.props.quantity}</span>
                  }
                  {
                      (this.props.quantityCallbacks !== undefined) &&
                          <button className="btn btn-secondary btn-sm" onClick={this.incrementQuantity}>+</button>
                              
                  }
                </div>
        }
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

  componentWillMount() {
    if (!this.props.context.materialsLoaded) {
      this.props.context.updateMaterials();
    }
  }


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
            {
                this.props.materialsKeys.map((materialKey) => {
                    if (this.props.quantities) {
                        if (this.props.quantities[materialKey] === undefined) {
                            return null;
                        }
                        return <MaterialListElement
                          key={materialKey}
                          material={this.props.materials[materialKey]}
                          quantity={this.props.quantities[materialKey]}
                          quantityCallbacks={this.props.quantityCallbacks}
                        />
                    } else {
                        return <MaterialListElement
                          key={materialKey}
                          material={this.props.materials[materialKey]}
                          pickerCallback={this.props.pickerCallback}
                        />
                    }
                })
            }
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
          return (
            <MaterialListInterior
              context={context}
              materialsKeys={context.materialsKeys}
              materials={context.materials}
              pickerCallback={this.props.pickerCallback}
              quantities={this.props.quantities}
              quantityCallbacks={this.props.quantityCallbacks}
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
