import React from 'react'

import AppContext from './AppContext';
import MaterialList from './MaterialList';


class MaterialPickerDisplay extends React.Component {
    pickMaterial = (material) => {
        let params = this.props.match.params;
        let context = this.props.context;

        if (!context.shoppingLoaded) {
            context.updateShopping();
        }

        if (params.id === 'basket') {
            if (context.shopping.basket[material._id] === undefined) {
                context.modifyBasket(material._id, 1);
            }
            this.props.history.push('/shopping');
        } else if (params.id === 'wishlist') {
            if (context.shopping.wishlist[material._id] === undefined) {
                context.modifyWishlist(material._id, 1);
            }
            this.props.history.push('/shopping');
        } else {
            context.modifyProjectMaterialRequirement(params.id, material._id, 1);
            this.props.history.push('/project/' + params.id);
        }
    };

    render() {
        return (
            <MaterialList pickerCallback={this.pickMaterial} />
        )
    }
}


class MaterialPicker extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {
                    context => (
                        <MaterialPickerDisplay match={this.props.match} history={this.props.history} context={context} />
                    )
                }
            </AppContext.Consumer>
        )
    }
}

export default MaterialPicker;
