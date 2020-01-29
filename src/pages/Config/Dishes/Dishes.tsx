import {
    IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton,
    IonModal, IonItem, IonInput, IonList, IonLabel, IonSearchbar, IonCheckbox
} from '@ionic/react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import './Dishes.css';

import {removeDishById} from "../../../actions/actions";
import * as actions from "../../../actions/actions";
import {IRootState} from "../../../reducers/index";
import {ActionType} from "typesafe-actions";
import {Ingredient} from "../../../Models/Ingredient";
import {Dish} from "../../../Models/Dish";


const mapStateToProps = ({ingredients, dishes}: IRootState) => {
    const {ingredientList} = ingredients;
    const {dishList} = dishes;
    return {ingredientList, dishList};
}


const mapDispatcherToProps = (dispatch: Dispatch<ActionType<typeof actions>>) => {
    return {
        removeDishById: (item: number) => dispatch(actions.removeDishById(0))
    }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

//TODO:
// - Div fix et scrollable
// - Boutons à ordonner

class DishesPage extends React.Component<ReduxType> {


    state = {
        currentDish: new Dish(),
        deleteMode: false,
        displayModal: false,
        displayToast: false,
        editMode: false,
        filter: "",
        label: "",
        toastMessage: "",
        toastType: ""
    }

    resetState = (displayToast: boolean, reason: string = "") => {
        this.setState({
            currentIngredient: new Ingredient(),
            deleteMode: false,
            displayModal: false,
            displayToast: displayToast,
            editMode: false,
            toastMessage: reason,
            toastType: "primary"
        })
    }

    handleFilterChange = (str: string) => {
        this.setState({filter: str});
    }

    renderDishes = () => {
        if (this.props.dishList.length == 0) {
            return (<IonLabel>Damn it, it seems you have nothing in your list</IonLabel>)
        } else {
            return (
                <IonList className="list-dish">
                    {this.props.dishList
                        .filter(elt => elt.name.toLowerCase().indexOf(this.state.filter.toString().toLowerCase()) >= 0)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(item => {
                            return (
                                <IonItem onClick={() => this.setState({displayModal: true, currentDish: item})}
                                         key={item.id} className="list-dish">
                                    <IonLabel className="list-dish">{item.name}</IonLabel>
                                </IonItem>
                            )
                        })}

                </IonList>
            )
        }
    }

    handleCheckBoxChange(event: any) {
        console.log("id", event.target.value);
        console.log("checked", event.target.checked);


    }

    renderIngredients() {

        if (this.state.editMode || this.state.currentDish.id === 0) {
            return (
                <IonList>
                    {this.props.ingredientList
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(item => {
                            return (
                                <IonItem key={item.id}>
                                    <IonLabel>{item.name}</IonLabel>
                                    <IonCheckbox checked={this.state.currentDish.recipe.some(element => item.id === element.id)}
                                                 onClick={(e) => this.handleCheckBoxChange(e)}
                                                 value={item.id.toString()} ion-/>
                                </IonItem>
                            )
                        })}
                </IonList>
            )
        } else {
            return (
                <IonList>
                    {this.state.currentDish.recipe
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(item => {
                            return (
                                <IonItem key={item.id}>
                                    <IonLabel>{item.name}</IonLabel>
                                </IonItem>
                            )
                        })}
                </IonList>
            )
        }
    }

    renderModal() {
        let textValue = this.state.currentDish.name.trim();
        let icon = "/assets/icon/app/ic_ing_ajout.png";
        let modalTitle = "Add an ingredient";
        let buttonLabel = "Add";
        let displayDeleteButton = false;
        let clickAction = () => console.log("click");

        if (this.state.deleteMode) {
            icon = "/assets/icon/app/ic_plat_suppr.png";
            modalTitle = "Remove a dish";
            buttonLabel = "Confirm";
            displayDeleteButton = false;
        } else if (this.state.editMode) {
            icon = "/assets/icon/app/ic_plat_modif.png";
            modalTitle = "Update a dish";
            buttonLabel = "Confirm";
            displayDeleteButton = true;
        } else if (this.state.currentDish.id === 0) {
            icon = "/assets/icon/app/ic_plat_ajout.png";
            modalTitle = "Add a dish";
            buttonLabel = "Add";
            displayDeleteButton = false;
        } else {
            icon = "/assets/icon/app/ic_plat.png";
            modalTitle = "Detail";
            buttonLabel = "Edit";
            displayDeleteButton = true;
            clickAction = () => this.setState({editMode: true})
        }
        return (
            <IonModal cssClass="dishes-modal" isOpen={this.state.displayModal} onDidDismiss={() => this.resetState(false)}>
                <div className="flex-container">
                    <img src={icon} height="80px"/>
                    <div className="title">{modalTitle}</div>
                </div>
                <div>
                    <IonInput placeholder="Dish name"
                              readonly={!this.state.editMode && this.state.currentDish.id !== 0}
                              disabled={!this.state.editMode && this.state.currentDish.id !== 0}
                              value={textValue}
                              clearInput></IonInput>
                    {this.renderIngredients()}
                </div>
                <div className="flex-container">
                    <IonButton slot="end"
                               expand='block'
                               color="light"
                               onClick={clickAction}>{buttonLabel}</IonButton>
                    <IonButton slot="end"
                               expand='block'
                               color="light"
                               onClick={() => this.setState({
                                   displayModal: false,
                                   editMode: false,
                                   deleteMode: false,
                                   currentDish: new Dish()
                               })}>Cancel</IonButton>
                    {
                        displayDeleteButton ?
                            <IonButton slot="end"
                                       expand='block'
                                       color="light"
                                       onClick={() => this.setState({
                                           deleteMode: true
                                       })}>Delete</IonButton>
                            : []
                    }
                </div>

            </IonModal>
        )
    }

    render() {

        return <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/config"/>
                    </IonButtons>
                    <IonTitle>Dishes</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonButton onClick={() => this.setState({displayModal: true})} expand='block'
                           color="light">Add</IonButton>
                <IonSearchbar onIonChange={e => this.handleFilterChange((e.target as HTMLInputElement).value)}
                              showCancelButton="focus"></IonSearchbar>
                {this.renderDishes()}
                {this.renderModal()}
            </IonContent>
        </IonPage>
    }

}

export default connect(mapStateToProps, {removeDishById})(DishesPage);