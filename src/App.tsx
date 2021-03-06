import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, IonToast} from '@ionic/react';
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
import DishesPage from "./pages/Config/Dishes/Dishes";
import ImportPage from "./pages/Config/Import/Import";
import IngredientsPage from "./pages/Config/Ingredients/Ingredients";
import SectionPage from "./pages/Config/Sections/Sections";
import MenusPage from "./pages/Menus/Menus";
import ShoppingList from "./pages/ShoppingList/ShoppingList";

import {getDishes, getIngredients, getMenus, getSections} from "./services/storageService";
import {Dish} from "./Models/Dish";
import {IRootState} from "./reducers";
import {ActionType} from "typesafe-actions";
import * as actions from "./actions/actions";
import {
    hideToast, prepareDishList, prepareIngredientList, prepareMenuList,
    prepareSectionList
} from "./actions/actions";
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {Ingredient} from "./Models/Ingredient";
import {FRIDAY, Menu, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY} from "./Models/Menu";
import DICTIONARY from "./services/storageService";
import {Section} from "./Models/Section";


const mapStateToProps = ({notificationReducer}: IRootState) => {
    const {displayToast, toastMessage, toastType} = notificationReducer;
    return {displayToast, toastMessage, toastType};
}


const mapDispatcherToProps = (dispatch: Dispatch<ActionType<typeof actions>>) => {
    return {
        prepareIngredientList: (element: Ingredient[]) => dispatch(actions.prepareIngredientList(element)),
        prepareDishList: (element: Dish[]) => dispatch(actions.prepareDishList(element)),
        prepareSectionList: (element: Section[]) => dispatch(actions.prepareSectionList(element)),
        prepareMenuList: (element: Menu[]) => dispatch(actions.prepareMenuList(element)),
        hideToast: () => dispatch(actions.hideToast())
    }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

class App extends React.Component<ReduxType> {

    componentDidMount() {
        getIngredients().then(value => {
                if (value === null) {
                    value = [];
                }
                this.props.prepareIngredientList(value)
            }
        );
        getDishes().then(value => {
                if (value === null) {
                    value = [];
                }
                this.props.prepareDishList(value)
            }
        );
        getSections().then(value => {
                if (value === null) {
                    value = [
                        new Section("Conserves", 0, 1),
                        new Section("Pâtes et riz", 1, 2),
                        new Section("Fruits et Légumes", 2, 3),
                        new Section("Petit déjeuner", 3, 4),
                        new Section("Surgelés", 4, 5),
                        new Section("Rayon frais", 5, 6),
                        new Section("Liquides", 6, 7),
                        new Section("Viandes et poissons", 7, 8),
                        new Section("Epice", 8, 9)
                    ];
                }
                this.props.prepareSectionList(value);
            }
        );
        getMenus().then(value => {
                if (value === null) {
                    value = [
                        new Menu(DICTIONARY.db.MONDAY, 1, MONDAY),
                        new Menu(DICTIONARY.db.TUESDAY, 2, TUESDAY),
                        new Menu(DICTIONARY.db.WEDNESDAY, 3, WEDNESDAY),
                        new Menu(DICTIONARY.db.THURSDAY, 4, THURSDAY),
                        new Menu(DICTIONARY.db.FRIDAY, 5, FRIDAY),
                        new Menu(DICTIONARY.db.SATURDAY, 6, SATURDAY),
                        new Menu(DICTIONARY.db.SUNDAY, 7, SUNDAY)
                    ];
                }
                this.props.prepareMenuList(value)
            }
        );
    }


    render() {
        return (
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet>
                        <Route path="/home" component={Home} exact={true}/>
                        <Route path="/ingredients" component={IngredientsPage} exact={true}/>
                        <Route path="/dishes" component={DishesPage} exact={true}/>
                        <Route path="/section" component={SectionPage} exact={true}/>
                        <Route path="/menu" component={MenusPage} exact={true}/>
                        <Route path="/list" component={ShoppingList} exact={true}/>
                        <Route path="/import" component={ImportPage} exact={true}/>
                        <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                    </IonRouterOutlet>
                </IonReactRouter>
                <IonToast
                     isOpen={this.props.displayToast}
                     onDidDismiss={this.props.hideToast}
                     message={this.props.toastMessage}
                     color={this.props.toastType}
                    duration={2000}
                />
            </IonApp>
        )
    }


}

export default connect(mapStateToProps, {
    prepareIngredientList,
    prepareDishList,
    prepareSectionList,
    prepareMenuList,
    hideToast})(App);
