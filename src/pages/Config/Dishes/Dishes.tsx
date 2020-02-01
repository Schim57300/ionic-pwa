import {
    IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton,
    IonModal, IonItem, IonInput, IonList, IonLabel, IonSearchbar, IonCheckbox, IonToast, IonIcon
} from '@ionic/react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import './Dishes.css';

import {addDish, removeDishById} from "../../../actions/actions";
import * as actions from "../../../actions/actions";
import {IRootState} from "../../../reducers/index";
import {ActionType} from "typesafe-actions";
import {Ingredient} from "../../../Models/Ingredient";
import {Dish} from "../../../Models/Dish";

import {save, closeCircleOutline, trash, checkmarkCircleOutline, create} from 'ionicons/icons';

const mapStateToProps = ({ingredients, dishes}: IRootState) => {
    const {ingredientList} = ingredients;
    const {dishList} = dishes;
    return {ingredientList, dishList};
}


const mapDispatcherToProps = (dispatch: Dispatch<ActionType<typeof actions>>) => {
    return {
        addDish: (element: Dish) => dispatch(actions.addDish(element)),
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
        let selectedIngredient = this.props.ingredientList.find(ing => ing.id.toString() === event.target.value)!;
        if (event.target.checked) {
            this.state.currentDish.recipe.push(selectedIngredient);
        } else {
            let elementToRemove = this.state.currentDish.recipe.findIndex(element => element === selectedIngredient);
            this.state.currentDish.recipe.splice(elementToRemove, 1);
        }
    }

    handleAddDish(dishName: string) {
        let elementFound: boolean = this.props.dishList.some(elt => elt.name.trim() === dishName);
        if (elementFound) {
            this.setState({
                displayToast: true,
                toastMessage: "The element does already exist",
                toastType: "danger"
            })
        } else {
            let newDish = new Dish(dishName, this.props.dishList.length + 1, this.state.currentDish.recipe);
            this.props.addDish(newDish);
            this.resetState(true, "Element has been created");
        }
    }

    renderIngredients() {

        if (this.state.editMode || this.state.currentDish.id === 0) {
            return (
                <IonList className="list-checkable-ingredient">
                    {this.props.ingredientList
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(item => {
                            return (
                                <IonItem key={item.id}>
                                    <IonLabel>{item.name}</IonLabel>
                                    <IonCheckbox
                                        checked={this.state.currentDish.recipe.some(element => item.id === element.id)}
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
        let buttonLabel = save;
        let displayDeleteButton = false;
        let clickAction = () => console.log("click");

        if (this.state.deleteMode) {
            icon = "/assets/icon/app/ic_plat_suppr.png";
            modalTitle = "Remove a dish";
            buttonLabel = trash;
            displayDeleteButton = false;
        } else if (this.state.editMode) {
            icon = "/assets/icon/app/ic_plat_modif.png";
            modalTitle = "Update a dish";
            buttonLabel = save;
            displayDeleteButton = false;
        } else if (this.state.currentDish.id === 0) {
            icon = "/assets/icon/app/ic_plat_ajout.png";
            modalTitle = "Add a dish";
            buttonLabel = save;
            displayDeleteButton = false;
            clickAction = () => this.handleAddDish(textValue)
        } else {
            icon = "/assets/icon/app/ic_plat.png";
            modalTitle = "Detail";
            buttonLabel = create;
            displayDeleteButton = true;
            clickAction = () => this.setState({editMode: true})
        }
        return (
            <IonModal cssClass="dishes-modal" isOpen={this.state.displayModal}
                      onDidDismiss={() => this.resetState(false)}>
                <div className="flex-container">
                    <img src={icon} height="40px"/>
                    <div className="title">{modalTitle}</div>
                </div>
                <IonInput placeholder="Dish name"
                          readonly={!this.state.editMode && this.state.currentDish.id !== 0}
                          disabled={!this.state.editMode && this.state.currentDish.id !== 0}
                          value={textValue}
                          onIonChange={e => textValue = (e.target as HTMLInputElement).value}
                          clearInput>
                </IonInput>

                <div className="list-checkable-ingredient">
                    {this.renderIngredients()}
                </div>
                <div className="flex-container">
                    <IonButton slot="end"
                               expand='block'
                               color="light"
                               onClick={clickAction}>
                        <IonIcon icon={buttonLabel}/>
                    </IonButton>
                    {
                        displayDeleteButton ?
                            <IonButton slot="end"
                                       expand='block'
                                       color="light"
                                       onClick={() => this.setState({
                                           deleteMode: true
                                       })}>
                                <IonIcon icon={trash}/>
                            </IonButton>
                            : []
                    }
                    <IonButton slot="end"
                               expand='block'
                               color="light"
                               onClick={() => this.setState({
                                   displayModal: false,
                                   editMode: false,
                                   deleteMode: false,
                                   currentDish: new Dish()
                               })}>
                        <IonIcon icon={closeCircleOutline}/>
                    </IonButton>
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
            <IonToast
                isOpen={this.state.displayToast}
                onDidDismiss={() => this.setState({displayToast: false})}
                message={this.state.toastMessage.toString()}
                color={this.state.toastType.toString()}
                duration={2000}
            />
        </IonPage>
    }
}

export default connect(mapStateToProps, {addDish, removeDishById})(DishesPage);