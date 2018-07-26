import React from "react"

import AppContext from './AppContext';
import MaterialList from './MaterialList';


class InventoryInterior extends React.Component {
    componentWillMount() {
        if (!this.props.context.inventoryLoaded) {
            this.props.context.updateInventory();
        }

        if (!this.props.context.materialsLoaded) {
            this.props.context.updateMaterials();
        }
    }

    render() {
        const inventoryItems = this.props.context.inventory;
        let inventory = {};

        for (let inventoryId of Object.keys(inventoryItems)) {
            let item = inventoryItems[inventoryId];

            if (inventory[item.materialId] === undefined) {
                inventory[item.materialId] = [ 0, 0 ];
            }

            if (!item.projectId) {
                inventory[item.materialId][0]++;
            }

            inventory[item.materialId][1]++;
        }

        return (
            <div>
                <h1>Inventory</h1>
                <h5>Unallocated / Total (Allocated + Unallocated) in Inventory</h5>
                <MaterialList quantities={inventory} />
            </div>
        )
    }
}

class Inventory extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {
                    (context) => {
                        return <InventoryInterior
                            context={context}
                            />
                    }
                }
            </AppContext.Consumer>
        )
    }
}

export default Inventory;
