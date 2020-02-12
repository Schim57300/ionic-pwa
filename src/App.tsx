import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp, IonButtons, IonRouterOutlet, IonTitle, IonToolbar, IonBackButton, IonButton,
    IonIcon
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ConfigPage from "./pages/Config/Config";
import DishesPage from "./pages/Config/Dishes/Dishes";
import IngredientsPage from "./pages/Config/Ingredients/Ingredients";
import Menu from "./pages/Menu/Menu";
import ShoppingList from "./pages/ShoppingList/ShoppingList";

import {getDishes, getIngredients} from "./services/storageService";
import {Dish} from "./Models/Dish";
import {IRootState} from "./reducers";
import {ActionType} from "typesafe-actions";
import * as actions from "./actions/actions";
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {prepareDishList, prepareIngredientList} from "./actions/actions";
import {Ingredient} from "./Models/Ingredient";
import DICTIONARY from "./services/storageService";
import {menu} from "ionicons/icons";
import NavBar from "./Components/NavBar";


const mapStateToProps = ({ingredients, dishes, menus}: IRootState) => {
    const {ingredientList} = ingredients;
    const {dishList} = dishes;
    const {menuList} = menus;
    return {ingredientList, dishList, menuList};
}


const mapDispatcherToProps = (dispatch: Dispatch<ActionType<typeof actions>>) => {
    return {
        prepareIngredientList: (element: Ingredient[]) => dispatch(actions.prepareIngredientList(element)),
        prepareDishList: (element: Dish[]) => dispatch(actions.prepareDishList(element))

    }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

class App extends React.Component<ReduxType> {

    componentDidMount() {
        getIngredients().then(value => {
                console.log("getIngredients==", value);
                if (value === null) {
                    value = [];
                }
                this.props.prepareIngredientList(value)
            }
        )
        getDishes().then(value => {
                console.log("getDishes==", value);
                if (value === null) {
                    value = [];
                }
                this.props.prepareDishList(value)
            }
        )
    }


    render() {
        return (
            //TODO: Create a navigation component
            // Label in reducer?
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet>
                        <Route path="/home" component={Home} exact={true}/>
                        <Route path="/config" component={ConfigPage} exact={true}/>
                        <Route path="/list" component={ShoppingList} exact={true}/>
                        <Route path="/dishes" component={DishesPage} exact={true}/>
                        <Route path="/ingredients" component={IngredientsPage} exact={true}/>
                        <Route path="/menu" component={Menu} exact={true}/>
                        <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonApp>
        )
    }


}

export default connect(mapStateToProps, {prepareIngredientList, prepareDishList})(App);
