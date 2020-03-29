//React
import React, {Component} from 'react';
//Redux
import {connect} from "react-redux";
import {Dispatch} from 'redux';
//Ionic
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonPage,
    IonSearchbar,
    IonSegment,
    IonSegmentButton, IonSlide, IonSlides,
    IonTextarea,
    IonToolbar
} from '@ionic/react';
//Style
import './Ingredients.css';

import * as actions from "../../../actions/actions";
import {addIngredient, displayToast, removeIngredient, updateIngredient} from "../../../actions/actions";
import {IRootState} from "../../../reducers";
import {ActionType} from "typesafe-actions";
import {Ingredient} from "../../../Models/Ingredient";
import {closeCircleOutline, save, trash} from "ionicons/icons";
import {Dish} from "../../../Models/Dish";

import DICTIONARY, {ERROR, INFO} from '../../../services/storageService';
import NavBar from "../../../Components/NavBar";
import {Menu} from "../../../Models/Menu";
import {Section} from "../../../Models/Section";

const mapStateToProps = ({ingredientReducer, dishReducer, sectionReducer, menuReducer}: IRootState) => {
    const {ingredientList} = ingredientReducer;
    const {dishList} = dishReducer;
    const {sectionList} = sectionReducer;
    const {menuList} = menuReducer;
    return {ingredientList, dishList, sectionList, menuList};
}


const mapDispatcherToProps = (dispatch: Dispatch<ActionType<typeof actions>>) => {
    return {
        removeIngredient: (item: Ingredient) => dispatch(actions.removeIngredient(item)),
        updateIngredient: (item: Ingredient) => dispatch(actions.updateIngredient(item)),
        addIngredient: (item: Ingredient) => dispatch(actions.addIngredient(item)),
        displayToast: (type: string, message: string) => dispatch(actions.displayToast(type, message))
    }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;


class IngredientsPage extends React.Component<ReduxType> {

    state = {
        currentIngredient: new Ingredient(),
        deleteMode: false,
        displayModal: false,
        filter: "",
        label: ""
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
            this.props.displayToast(ERROR, DICTIONARY.db.ERROR_MESSAGE.MANDATORY_VALUE)
        } else {
            let elementFound: boolean = this.props.ingredientList.some(elt => String(elt.name.trim().toUpperCase() === newLabel.toUpperCase()));
            if (elementFound) {
                this.props.displayToast(ERROR, DICTIONARY.db.ERROR_MESSAGE.VALUE_ALREADY_EXIST);
            } else {
                let newElement = new Ingredient(newLabel,
                    this.props.ingredientList.length + 1)
                this.props.addIngredient(newElement);
                this.props.displayToast(INFO, DICTIONARY.db.INFO_MESSAGE.ELEMENT_CREATED)
                this.resetState();
            }
        }
    }

    handleUpdateIngredient = (newLabel: string) => {
        let newElement = new Ingredient(newLabel,
            this.state.currentIngredient.id, this.state.currentIngredient.sectionId)
        this.props.updateIngredient(newElement);
        this.props.displayToast(INFO, DICTIONARY.db.INFO_MESSAGE.CHANGE_APPLIED)
        this.resetState()
    }

    handleDeleteIngredient = () => {
        let listLinkDish = this.checkIngredientIsNotUsed()
        let listLinkMenu = this.checkIngredientIsNotPlanned();
        if (listLinkDish.length > 0) {
            this.props.displayToast(ERROR, DICTIONARY.db.ERROR_MESSAGE.VALUE_ALREADY_USED + listLinkDish.toString());
        } else if (listLinkMenu.length > 0) {
            this.props.displayToast(ERROR, DICTIONARY.db.ERROR_MESSAGE.VALUE_ALREADY_PLANNED + listLinkMenu.toString());
        } else {
            this.props.removeIngredient(this.state.currentIngredient);
            this.props.displayToast(INFO, DICTIONARY.db.INFO_MESSAGE.ELEMENT_DELETED)
            this.resetState()
        }
    }

    handleSegmentSelect = (e: any) => {
        let newIngredient = Object.assign({}, this.state.currentIngredient);
        newIngredient.sectionId = this.props.sectionList.filter(elt => elt.id.toString() === e.detail.value)[0]?.id;
        this.setState({
            currentIngredient: newIngredient
        })
    }

    checkIngredientIsNotUsed = (): Dish[] => {
        let linkedDish: Dish[] = [];
        this.props.dishList.forEach(dish => {
            let b = dish.recipe.some(ing => ing === this.state.currentIngredient.id);
            if (b) {
                linkedDish.push(dish)
            }
        })
        return linkedDish;
    }

    checkIngredientIsNotPlanned = (): Menu[] => {
        let linkedMenu: Menu[] = [];
        this.props.menuList.forEach(menu => {
            let plannedForLunch = menu.lunchMeal.some(menuItem => !(menuItem as Dish).recipe &&
                menuItem.id === this.state.currentIngredient.id);
            let plannedForDinner = menu.dinnerMeal.some(menuItem => !(menuItem as Dish).recipe &&
                menuItem.id === this.state.currentIngredient.id);
            if (plannedForLunch || plannedForDinner) {
                linkedMenu.push(menu);
            }
        })
        return linkedMenu;
    }


    getSectionName = (sectionId: number) => {
        if (sectionId > 0) {
            return this.props.sectionList.filter(item => item.id === sectionId)[0]?.name;
        } else {
            return "";
        }
    }

    renderIngredients = () => {
        if (this.props.ingredientList.length == 0) {
            return (<IonLabel>{DICTIONARY.db.INFO_MESSAGE.NO_ELEMENT}</IonLabel>)
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
                                    <IonLabel
                                        className="list-ingredient">{this.getSectionName(item.sectionId)}</IonLabel>
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
        let modalTitle = DICTIONARY.db.ingredient_page.MODAL_ADD;
        let mainButtonLabel = save;
        let displayDeleteButton = false;
        let clickAction = () => this.handleAddIngredient(textValue)
        if (this.state.deleteMode) {
            icon = "/assets/icon/app/ic_ing_suppr.png";
            modalTitle = DICTIONARY.db.ingredient_page.MODAL_DELETE;
            mainButtonLabel = trash;
            //Delete button won't be displayed. The "delete" action
            //is handled by the main button
            displayDeleteButton = false;
            clickAction = () => this.handleDeleteIngredient()
        } else if (textValue.length > 0) {
            icon = "/assets/icon/app/ic_ing_modif.png";
            modalTitle = DICTIONARY.db.ingredient_page.MODAL_UPDATE;
            mainButtonLabel = save;
            displayDeleteButton = true;
            clickAction = () => this.handleUpdateIngredient(textValue)
        }
        const slideOpts = {
            initialSlide: 1,
            speed: 400
        };
        return (
            <IonModal
                isOpen={this.state.displayModal}
                onDidDismiss={() => {
                    this.resetState();
                }}>
                <IonItem className="flex-container">
                    <img src={icon} height="40px"/>
                    <div className="title">{modalTitle}</div>
                </IonItem>
                <IonItem className="modal-content">
                    <IonTextarea placeholder={DICTIONARY.db.ingredient_page.NAME_PLACEHOLDER}
                                 readonly={this.state.deleteMode}
                                 disabled={this.state.deleteMode}
                                 value={textValue}
                                 onIonChange={e => textValue = (e.target as HTMLInputElement).value}>

                    </IonTextarea>
                </IonItem>
                <IonToolbar>
                    <IonSegment scrollable color="secondary"
                                value={"" + this.state.currentIngredient?.sectionId}
                                onIonChange={e => this.handleSegmentSelect(e)}>
                        {this.props.sectionList.map(section =>
                            <IonSegmentButton key={section.id} value={section.id.toString()} layout="icon-start">
                                {section.name}
                            </IonSegmentButton>
                        )}
                    </IonSegment>
                </IonToolbar>
                <IonSlides options={slideOpts}>
                    {
                        this.props.sectionList.map(section =>
                            <IonSlide key={section.id}>
                                <h1>{this.props.sectionList[1]?.name}</h1>
                            </IonSlide>
                        )
                    }
                    <IonSlide>
                        <h1>{this.props.sectionList[1]?.name}</h1>
                    </IonSlide>
                    <IonSlide>
                        <h1>{this.props.sectionList[2]?.name}</h1>
                    </IonSlide>
                    <IonSlide>
                        <h1>{this.props.sectionList[3]?.name}</h1>
                    </IonSlide>
                    <IonSlide>
                        <h1>{this.props.sectionList[4]?.name}</h1>
                    </IonSlide>
                    <IonSlide>
                        <h1>{this.props.sectionList[5]?.name}</h1>
                    </IonSlide>
                    <IonSlide>
                        <h1>{this.props.sectionList[6]?.name}</h1>
                    </IonSlide>
                    <IonSlide>
                        <h1>{this.props.sectionList[7]?.name}</h1>
                    </IonSlide>
                    <IonSlide>
                        <h1>{this.props.sectionList[8]?.name}</h1>
                    </IonSlide>
                </IonSlides>
                <IonItem className="flex-container">
                    <IonButton slot="end"
                               expand='block'
                               color="light"
                               onClick={clickAction}>
                        <IonIcon icon={mainButtonLabel}/>
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
                </IonItem>
            </IonModal>
        )
    }

    render() {

        return (
            <IonPage>
                <IonHeader>
                    <NavBar title={DICTIONARY.db.ingredient_page.PAGE_TITLE}
                            displayToast={this.props.displayToast}/>
                </IonHeader>

                <IonContent forceOverscroll={false}>
                    <IonButton onClick={() => this.setState({displayModal: true, currentIngredient: new Ingredient()})}
                               expand='block' color="light">{DICTIONARY.db.ingredient_page.ADD_BUTTON_LABEL}</IonButton>
                    <IonSearchbar onIonChange={e => this.handleFilterChange((e.target as HTMLInputElement).value)}
                                  placeholder={DICTIONARY.db.ingredient_page.FILTER_PLACEHOLDER}
                                  showCancelButton="focus"> </IonSearchbar>
                    {this.renderIngredients()}
                    {this.renderModal()}
                </IonContent>
            </IonPage>
        );
    }
}

export default connect(mapStateToProps, {
    removeIngredient,
    addIngredient,
    updateIngredient,
    displayToast
})(IngredientsPage);