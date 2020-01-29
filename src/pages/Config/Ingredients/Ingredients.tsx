//React
import React, {Component} from 'react';
//Redux
import {connect} from "react-redux";
import {Dispatch} from 'redux';
//Ionic
import {
    IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton, IonModal, IonItem,
    IonTextarea, IonList, IonLabel, IonToast, IonSearchbar
} from '@ionic/react';
//Style
import './Ingredients.css';

import * as actions from "../../../actions/actions";
import {addIngredient, removeIngredient, updateIngredient} from "../../../actions/actions";
import {IRootState} from "../../../reducers/index";
import {ActionType} from "typesafe-actions";
import {Ingredient} from "../../../Models/Ingredient";

const mapStateToProps = ({ingredients}: IRootState) => {
    const {ingredientList} = ingredients;
    return {ingredientList};
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

    resetState = (displayToast: boolean, reason: string = "") => {
        this.setState({
            currentIngredient: new Ingredient(),
            deleteMode:false,
            displayModal: false,
            displayToast: displayToast,
            toastMessage: reason,
            toastType: "primary"
        })
    }

    handleFilterChange = (str: string) => {
        this.setState({filter: str});
    }

    addNewIngredient = (newLabel: string) => {
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
            this.resetState(true, "Element has been created");
        }
    }

    updateIngredient = (newLabel: string) => {
        let newElement = new Ingredient(newLabel,
            this.state.currentIngredient.id)
        this.props.updateIngredient(newElement);
        this.resetState(true, "Your change has been applied")
    }

    deleteIngredient = () => {
        this.props.removeIngredient(this.state.currentIngredient);
        this.resetState(true, "Element has been removed")
    }

    renderIngredients = () => {
        if (this.props.ingredientList.length == 0) {
            return (<IonLabel>Damn it, it seems you have nothing in your list</IonLabel>)
        } else {
            return (
                <IonList className="list-ingredient">
                    {this.props.ingredientList
                        .filter(elt => elt.name.toLowerCase().indexOf(this.state.filter.toString().toLowerCase())>=0)
                        .sort((a,b) => a.name.localeCompare( b.name))
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
        let buttonLabel = "Add";
        let displayDeleteButton = false;
        let clickAction = () => this.addNewIngredient(textValue)
        if (this.state.deleteMode) {
            icon = "/assets/icon/app/ic_ing_suppr.png";
            modalTitle = "Remove ingredient";
            buttonLabel = "Confirm";
            displayDeleteButton = false;
            clickAction = () => this.deleteIngredient()
        } else if (textValue.length > 0) {
            icon = "/assets/icon/app/ic_ing_modif.png";
            modalTitle = "Update ingredient";
            buttonLabel = "Update";
            displayDeleteButton = true;
            clickAction = () => this.updateIngredient(textValue)
        }
        return (
            <IonModal cssClass="ingredient-modal"
                      isOpen={this.state.displayModal}
                      onDidDismiss={() => {this.resetState(false);}}>
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
                    <IonButton expand='block' color="light" onClick={clickAction}>{buttonLabel}</IonButton>
                    <IonButton expand='block' color="light" onClick={() => this.setState({
                        displayModal: false,
                        deleteMode: false,
                        currentIngredient: new Ingredient()
                    })}>Cancel</IonButton>
                    {
                        displayDeleteButton ?
                            <IonButton expand='block' color="light" onClick={() => this.setState({
                                deleteMode: true
                            })}>Delete</IonButton>
                            : []
                    }
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
                    <IonSearchbar onIonChange={e => this.handleFilterChange((e.target as HTMLInputElement).value)} showCancelButton="focus"></IonSearchbar>
                    {this.renderIngredients()}
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
        );
    }
}

export default connect(mapStateToProps, {removeIngredient, addIngredient, updateIngredient})(IngredientsPage);