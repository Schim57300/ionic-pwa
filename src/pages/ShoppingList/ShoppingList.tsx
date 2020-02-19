import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage} from '@ionic/react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import './ShoppingList.css';

import * as actions from "../../actions/actions";
import {displayToast} from "../../actions/actions";
import {IRootState} from "../../reducers";
import {ActionType} from "typesafe-actions";

import DICTIONARY from '../../services/storageService'
import {Ingredient} from "../../Models/Ingredient";
import NavBar from "../../Components/NavBar";

const mapStateToProps = ({menuReducer, dishReducer}: IRootState) => {
    const {menuList} = menuReducer;
    const {dishList} = dishReducer;
    return {menuList, dishList};
}


const mapDispatcherToProps = (dispatch: Dispatch<ActionType<typeof actions>>) => {
    return {displayToast: (type: string, message: string) => dispatch(actions.displayToast(type, message))}
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

class ShoppingListPage extends React.Component<ReduxType> {
    ERROR: string = "danger";
    INFO: string = "success";



    composeShoppingList = () : Ingredient[] => {
        let shoppingList: Ingredient[] =[]
        /*
        this.props.menuList.forEach(menu => {
            menu.lunchMeal.forEach(recipe => {
                recipe.recipe.forEach(elt => shoppingList.push(elt));
            })
            menu.dinnerMeal.forEach(recipe => {
                recipe.recipe.forEach(elt => shoppingList.push(elt));
            })
        })
        */
        //Quick fix until data is correctly stored in memory
        this.props.menuList.forEach(menu => {
            menu.lunchMeal.forEach(recipe => {
                recipe.recipe.forEach(elt => {
                    if (!shoppingList.some(item => item.id === elt.id)) {
                        shoppingList.push(elt)
                    }
                });
            })
            menu.dinnerMeal.forEach(recipe => {
                recipe.recipe.forEach(elt => {
                    if (!shoppingList.some(item => item.id === elt.id)) {
                        shoppingList.push(elt)
                    }
                });
            })
        })


        let newSet = new Set(shoppingList);
        return Array.from(newSet);
    }




    render() {
        let shoppingList = this.composeShoppingList();
        return <IonPage>
            <IonHeader>
                <NavBar title={DICTIONARY.db.shoppinglist_page.PAGE_TITLE}
                        displayToast={this.props.displayToast}/>
            </IonHeader>
            <IonContent>
                <IonList className="shopping-list-item">
                    {shoppingList
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(item => {
                            return (
                                <div key={item.id}>
                                    <IonItem key={item.id} className="shopping-list-item">
                                        <IonLabel className="shopping-list-item">{item.name}</IonLabel>
                                    </IonItem>
                                </div>
                            )
                        })}
                </IonList>
            </IonContent>
        </IonPage>
    }
}

export default connect(mapStateToProps, {displayToast})(ShoppingListPage);