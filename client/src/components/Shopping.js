import React from "react"

import AppContext from './AppContext';


class ShoppingInterior extends React.Component {
    render() {
        return (
            <div>
                <ShoppingBasket context={context} />
                <ShoppingNeeds context={context} />
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
                        if (!context.materialsLoaded) {
                            context.updateMaterials();
                        }

                        if (!context.shoppingLoaded) {
                            context.updateShopping();
                        }

                        return <ShoppingInterior
                            context={context}
                            />
                    }
                }
            </AppContext.Consumer>
        )
    }
}

export default Shopping;
