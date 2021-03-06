import React from "react"

import AppContext from './AppContext';
import MaterialList from './MaterialList';


class ShoppingInterior extends React.Component {
    addToBasket = (e) => {
        e.preventDefault();
        this.props.history.push("/materialPicker/basket");
    };

    addToWishlist = (e) => {
        e.preventDefault();
        this.props.history.push("/materialPicker/wishlist");
    };

    commitBasket = (e) => {
        e.preventDefault();
        this.props.context.commitBasket();
    };

    decrementBasket = (material) => {
        let shopping = this.props.context.shopping;

        if (shopping.basket[material._id] !== undefined) {
            this.props.context.modifyBasket(material._id, shopping.basket[material._id] - 1);
        }
    };

    decrementWishlist = (material) => {
        let shopping = this.props.context.shopping;

        if (shopping.wishlist[material._id] !== undefined) {
            this.props.context.modifyWishlist(material._id, shopping.wishlist[material._id] - 1);
        }
    };

    incrementBasket = (material) => {
        let shopping = this.props.context.shopping;

        this.props.context.modifyBasket(material._id, (shopping.basket[material._id] || 0) + 1);
    };

    incrementWishlist = (material) => {
        let shopping = this.props.context.shopping;

        if (shopping.wishlist[material._id] !== undefined) {
            this.props.context.modifyWishlist(material._id, shopping.wishlist[material._id] + 1);
        }
    };

    componentWillMount() {
        if (!this.props.context.materialsLoaded) {
            this.props.context.updateMaterials();
        }

        if (!this.props.context.shoppingLoaded) {
            this.props.context.updateShopping();
        }
    }

    render() {
        const shopping = this.props.context.shopping;

        let neededMaterials = {};

        if (shopping.needs && shopping.needs.materials) {
            for (let materialId of Object.keys(shopping.needs.materials)) {
                neededMaterials[materialId] = [
                    shopping.basket[materialId] || 0,
                    shopping.needs.materials[materialId],
                ];
            }
        }

        const basketCallbacks = {
            decrement: this.decrementBasket,
            increment: this.incrementBasket,
        };

        const wishlistCallbacks = {
            decrement: this.decrementWishlist,
            increment: this.incrementWishlist,
        };

        return (
            <div>
                <h1>Shopping</h1>
                <div className="shoppingBasket">
                    <h3>Shopping Basket</h3>
                    <h5>+/- Add/Subtract Amount in Basket</h5>
                    <MaterialList quantities={shopping.basket} quantityCallbacks={basketCallbacks} />

        <ul className="nav nav-pills flex-md-row mb-2 justify-content-around">
          <li className="nav-item">
            <button className="btn btn-success nav-link mb-sm-3 mb-md-0" onClick={this.addToBasket}>Add Material to Basket</button>
          </li>
          <li className="nav-item">
            <button className="btn btn-info nav-link mb-sm-3 mb-md-0" onClick={this.commitBasket}>Commit Basket to Inventory</button>
          </li>
        </ul>
                </div>
                <div className="shoppingNeeded">
                    <h3>Needed Materials from Active Projects and Wishlist</h3>
                    <h5>Amount in Basket / Total Needed</h5>
                    <h5>+/- Add/Subtract Amount in Basket</h5>
                    <MaterialList quantities={neededMaterials} quantityCallbacks={basketCallbacks} />
                </div>
                <div className="shoppingWishlist">
                    <h3>Wishlist</h3>
                    <h5>+/- Add/Subtract Amount on Wishlist</h5>
                    <MaterialList quantities={shopping.wishlist} quantityCallbacks={wishlistCallbacks} />

        <ul className="nav nav-pills flex-md-row mb-2 justify-content-around">
          <li className="nav-item">
            <button className="btn btn-success nav-link mb-sm-3 mb-md-0" onClick={this.addToWishlist}>Add Material to Wishlist</button>
          </li>
        </ul>
                </div>
            </div>
        )
    }
}

class Shopping extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {
                    (context) => {
                        return <ShoppingInterior
                            context={context}
                            history={this.props.history}
                            />
                    }
                }
            </AppContext.Consumer>
        )
    }
}

export default Shopping;
