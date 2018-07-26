import React from "react"

import AppContext from './AppContext';


class MaterialListElement extends React.Component {
    render() {
        let rgb = [ this.props.material.red, this.props.material.green, this.props.material.blue ];
        let styles = {
            width: '20px',
            height: '20px',
            display: 'inline-block',
            backgroundColor: `rgb(${rgb})`,
        };

        return (
            <li>
                <div className="materialColorBlock" style={styles}></div>
                <span className="materialName">{this.props.material.name}</span>
                <span className="materialSKU">({this.props.material.sku})</span>
            </li>
        );
    }
}

class MaterialListInterior extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <button onClick={this.props.sortHue}>Hue</button>
                    <button onClick={this.props.sortName}>Name</button>
                    <button onClick={this.props.sortSKU}>SKU</button>
                </div>
                <div>
                    <ul>
                        {
                            this.props.materials.map((material) => (
                                <MaterialListElement key={material._id} material={material} />
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

class MaterialList extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {
                    (context) => {
                        if (!context.materialsLoaded) {
                            context.updateMaterials();
                        }

                        return <MaterialListInterior
                            materials={context.materials}
                            sortHue={context.sortMaterialsByHue}
                            sortName={context.sortMaterialsByName}
                            sortSKU={context.sortMaterialsBySKU}
                            />
                    }
                }
            </AppContext.Consumer>
        )
    }
}

export default MaterialList;
