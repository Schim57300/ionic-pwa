import {
    IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton,
    IonModal, IonItem, IonInput, IonList, IonLabel, IonSearchbar, IonCheckbox, IonToast, IonIcon, IonText, IonTextarea
} from '@ionic/react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import './Menu.css';

import {updateMenu} from "../../actions/actions";
import * as actions from "../../actions/actions";
import {IRootState} from "../../reducers";
import {ActionType} from "typesafe-actions";
import {Menu} from "../../Models/Menu";
import {closeCircleOutline, save} from "ionicons/icons";
import {Dish} from "../../Models/Dish";

import DICTIONARY from '../../services/storageService'

const mapStateToProps = ({menus, dishes}: IRootState) => {
    const {menuList} = menus;
    const {dishList} = dishes;
    return {menuList, dishList};
}


const mapDispatcherToProps = (dispatch: Dispatch<ActionType<typeof actions>>) => {
    return {
        updateMenu: (element: Menu) => dispatch(actions.updateMenu(element))
    }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

class MenusPage extends React.Component<ReduxType> {
    ERROR: string = "danger";
    INFO: string = "success";

    LUNCH: string = "lunch";
    DINNER: string = "dinner";

    state = {
        currentMeal: [] as Dish[],
        currentMenu: new Menu(),
        currentMenuDetail: "",
        displayModal: false,
        displayToast: false,
        filter: "",
        label: "",
        toastMessage: "",
        toastType: ""
    }

    resetState = () => {
        this.setState({
            currentMeal: [],
            currentMenu: new Menu(),
            currentMenuDetail: "",
            displayModal: false
        })
    }


    displayToast = (type: string, reason: string) => {
        this.setState({
            displayToast: true,
            toastMessage: reason,
            toastType: type
        })
    }

    getSelectedMeal = (): Dish[] => {
        if (this.state.currentMenuDetail === this.LUNCH) {
            return this.state.currentMenu.lunchMeal;
        } else {
            return this.state.currentMenu.dinnerMeal;
        }
    }

    handleFilterChange = (str: string) => {
        this.setState({filter: str});
    }

    handleCheckBoxChange(event: any) {
        let selectedDish = this.props.dishList.find(dish => dish.id.toString() === event.target.value);
        if (!event.target.checked) {
            let elementToRemove = this.state.currentMeal.findIndex(element => element === selectedDish);
            this.state.currentMeal.splice(elementToRemove, 1);
        } else if (selectedDish !== undefined) {
            this.state.currentMeal.push(selectedDish);
        }
    }

    displayLunchMenu = (item: Menu) => {
        return (
            <IonItem
                onClick={() => this.setState({
                    displayModal: true,
                    currentMenu: Object.assign({}, item),
                    currentMenuDetail: this.LUNCH,
                    currentMeal: item.lunchMeal
                })}
                lines="none"
                className="list-menu">
                <IonLabel>
                    <h4>{DICTIONARY.db.menu_page.LIST_LUNCH}</h4>
                    {item.lunchMeal.length <= 0 ? <IonLabel>{DICTIONARY.db.menu_page.EMPTY_LIST}</IonLabel> :
                        item.lunchMeal.map(dish => {
                            return (
                                <IonLabel>{dish.name}</IonLabel>
                            )
                        })}
                </IonLabel>
            </IonItem>
        )
    }

    displayDinnerMenu = (item: Menu) => {
        return (
            <IonItem
                onClick={() => this.setState({
                    displayModal: true,
                    currentMenu: Object.assign({}, item),
                    currentMenuDetail: this.DINNER,
                    currentMeal: item.dinnerMeal
                })}
                className="list-menu">
                <IonLabel className="list-menu">
                    <h4>{DICTIONARY.db.menu_page.LIST_DINNER}</h4>
                    {item.dinnerMeal.length <= 0 ? <IonLabel>{DICTIONARY.db.menu_page.EMPTY_LIST}</IonLabel> :
                        item.dinnerMeal.map(dish => {
                            return (
                                <IonLabel>{dish.name}</IonLabel>
                            )
                        })}
                </IonLabel>
            </IonItem>
        )
    }

    renderMenu = () => {
        return (
            <div>
                {this.props.menuList
                    .map(item => {
                        return (
                            <div key={item.id}>
                                <IonItem
                                    lines="none"
                                    color={item.color}>
                                    <IonLabel>
                                        <IonText>
                                            <h1>{item.name}</h1>
                                        </IonText>
                                    </IonLabel>
                                </IonItem>
                                {this.displayLunchMenu(item)}
                                {this.displayDinnerMenu(item)}
                            </div>
                        )
                    })}
            </div>
        )

    }

    renderModal = () => {
        let icon = "/assets/icon/app/ic_plat.png";
        let clickAction = () => this.resetState();

        return (
            <IonModal cssClass="menu-modal"
                      isOpen={this.state.displayModal}
                      onDidDismiss={() => {
                          this.resetState();
                      }}>
                <div className="flex-container">
                    <img src={icon} height="40px"/>
                    <div className="title">{DICTIONARY.db.menu_page.MODAL_CHOOSE}</div>
                </div>
                <IonList className="list-checkable-ingredient">
                    {this.props.dishList
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(item => {
                            return (
                                <IonItem key={item.id}>
                                    <IonLabel>{item.name}</IonLabel>
                                    <IonCheckbox
                                        checked={
                                            this.getSelectedMeal().some(element => item.id === element.id)
                                        }
                                        onClick={(e) => this.handleCheckBoxChange(e)}
                                        value={item.id.toString()}/>
                                </IonItem>
                            )
                        })}
                </IonList>
                <div className="flex-container">
                    <IonButton slot="end"
                               expand='block'
                               color="light"
                               onClick={clickAction}>
                        <IonIcon icon={save}/>
                    </IonButton>
                    <IonButton slot="end"
                               expand='block'
                               color="light"
                               onClick={() => this.resetState()}>
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
                        <IonBackButton defaultHref="/home"/>
                    </IonButtons>
                    <IonTitle>{DICTIONARY.db.menu_page.PAGE_TITLE}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {this.renderMenu()}
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

export default connect(mapStateToProps, {updateMenu})(MenusPage);