//React
import React, {Component} from 'react';
//Redux
import {connect} from "react-redux";
import {Dispatch} from 'redux';
//Ionic
import {
    IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton, IonModal, IonItem,
    IonTextarea, IonList, IonLabel, IonToast, IonSearchbar, IonIcon
} from '@ionic/react';
//Style
import './Ingredients.css';

import * as actions from "../../../actions/actions";
import {addIngredient, removeIngredient, updateIngredient} from "../../../actions/actions";
import {IRootState} from "../../../reducers";
import {ActionType} from "typesafe-actions";
import {Ingredient} from "../../../Models/Ingredient";
import {closeCircleOutline, save, trash} from "ionicons/icons";
import {Dish} from "../../../Models/Dish";

const mapStateToProps = ({ingredients, dishes}: IRootState) => {
    const {ingredientList} = ingredients;
    const {dishList} = dishes;
    return {ingredientList, dishList};
}


const mapDispatcherToProps = (dispatch: Dispatch<ActionType<typeof actions>>) => {
    return {
        removeIngredient: (item: Ingredient) => dispatch(actions.removeIngredient(item)),
        updateIngredient: (item: Ingredient) => dispatch(actions.updateIngredient(item)),
        addIngredient: (item: Ingredient) => dispatch(actions.addIngredient(item))
    }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;


class IngredientsPage extends React.Component<ReduxType> {
    ERROR: string = "danger";
    INFO: string = "success"

    state = {
        currentIngredient: new Ingredient(),
        deleteMode: false,
        displayModal: false,
        displayToast: false,
        filter: "",
        label: "",
        toastMessage: "",
        toastType: ""
    }

    displayToast = (type: string, reason: string) => {
        this.setState({
            displayToast: true,
            toastMessage: reason,
            toastType: type
        })
    }

    resetState = () => {
        this.setState({
            currentIngredient: new Ingredient(),
            deleteMode: false,
            displayModal: false
        })
    }

    handleFilterChange = (str: string) => {
        this.setState({filter: str});
    }

    handleAddIngredient = (newLabel: string) => {
        if (newLabel.trim() === "") {
            this.displayToast(this.ERROR, "Name can not be empty")
        } else {
            let elementFound: boolean = this.props.ingredientList.some(elt => elt.name.trim() === newLabel);
            if (elementFound) {
                this.setState({
                    displayToast: true,
                    toastMessage: "The element does already exist",
                    toastType: "danger"
                })
            } else {
                let newElement = new Ingredient(newLabel,
                    this.props.ingredientList.length + 1)
                this.props.addIngredient(newElement);
                this.displayToast(this.INFO, "Element has been created")
                this.resetState();
            }
        }
    }

    handleUpdateIngredient = (newLabel: string) => {
        let newElement = new Ingredient(newLabel,
            this.state.currentIngredient.id)
        this.props.updateIngredient(newElement);
        this.displayToast(this.INFO, "Your change has been applied")
        this.resetState()
    }

    handleDeleteIngredient = () => {
        let listLinkDish = this.checkIngredientIsNotUsed()
        if (listLinkDish.length > 0) {
            this.displayToast(this.ERROR, "Used in " + listLinkDish.toString());
        } else {
            this.props.removeIngredient(this.state.currentIngredient);
            this.displayToast(this.INFO, "Element has been removed")
            this.resetState()
        }
    }

    checkIngredientIsNotUsed = (): Dish[] => {
        let linkedDish: Dish[] = [];
        this.props.dishList.forEach(dish => {
            let b = dish.recipe.some(ing => ing.id === this.state.currentIngredient.id);
            if (b) {
                linkedDish.push(dish)
            }
        })
        return linkedDish;
    }

    renderIngredients = () => {
        if (this.props.ingredientList.length == 0) {
            return (<IonLabel>Damn it, it seems you have nothing in your list</IonLabel>)
        } else {
            return (
                <IonList className="list-ingredient">
                    {this.props.ingredientList
                        .filter(elt => elt.name.toLowerCase().indexOf(this.state.filter.toString().toLowerCase()) >= 0)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(item => {
                            return (
                                <IonItem onClick={() => this.setState({displayModal: true, currentIngredient: item})}
                                         key={item.id} className="list-ingredient">
                                    <IonLabel className="list-ingredient">{item.name}</IonLabel>
                                </IonItem>
                            )
                        })}

                </IonList>
            )
        }
    }

    renderModal() {

        let textValue = this.state.currentIngredient.name.trim();
        let icon = "/assets/icon/app/ic_ing_ajout.png";
        let modalTitle = "Add an ingredient";
        let buttonLabel = save;
        let displayDeleteButton = false;
        let clickAction = () => this.handleAddIngredient(textValue)
        if (this.state.deleteMode) {
            icon = "/assets/icon/app/ic_ing_suppr.png";
            modalTitle = "Remove ingredient";
            buttonLabel = trash;
            displayDeleteButton = false;
            clickAction = () => this.handleDeleteIngredient()
        } else if (textValue.length > 0) {
            icon = "/assets/icon/app/ic_ing_modif.png";
            modalTitle = "Update ingredient";
            buttonLabel = save;
            displayDeleteButton = true;
            clickAction = () => this.handleUpdateIngredient(textValue)
        }
        return (
            <IonModal cssClass="ingredient-modal"
                      isOpen={this.state.displayModal}
                      onDidDismiss={() => {
                          this.resetState();
                      }}>
                <div className="flex-container">
                    <img src={icon} height="80px"/>
                    <div className="title">{modalTitle}</div>
                </div>
                <IonItem className="modal-content">
                    <IonTextarea placeholder="Ingredient name"
                                 readonly={this.state.deleteMode}
                                 disabled={this.state.deleteMode}
                                 value={textValue}
                                 onIonChange={e => textValue = (e.target as HTMLInputElement).value}>

                    </IonTextarea>
                </IonItem>
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
                                   deleteMode: false,
                                   currentIngredient: new Dish()
                               })}>
                        <IonIcon icon={closeCircleOutline}/>
                    </IonButton>
                </div>
            </IonModal>
        )
    }

    render() {

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/config"/>
                        </IonButtons>
                        <IonTitle>Ingredients</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonButton onClick={() => this.setState({displayModal: true, currentIngredient: new Ingredient()})}
                               expand='block' color="light">Add</IonButton>
                    <IonSearchbar onIonChange={e => this.handleFilterChange((e.target as HTMLInputElement).value)}
                                  showCancelButton="focus"> </IonSearchbar>
                    {this.renderIngredients()}
                    {this.renderModal()}
                </IonContent>
                <IonToast
                    isOpen={this.state.displayToast}
                    onDidDismiss={() => this.setState({displayToast: false})}
                    message={this.state.toastMessage.toString()}
                    color={this.state.toastType.toString()}
                    duration={20000}
                />
            </IonPage>
        );
    }
}

export default connect(mapStateToProps, {removeIngredient, addIngredient, updateIngredient})(IngredientsPage);