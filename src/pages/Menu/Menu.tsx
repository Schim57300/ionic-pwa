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

    handleFilterChange = (str: string) => {
        this.setState({filter: str});
    }

    handleCheckBoxChange(event: any) {
        let selectedDish = this.props.dishList.find(dish => dish.id.toString() === event.target.value)!;
        if (event.target.checked) {
            if (this.state.currentMenuDetail === this.LUNCH) {
                this.state.currentMenu.lunchMeal.push(selectedDish);
            } else {
                this.state.currentMenu.dinnerMeal.push(selectedDish);
            }
        } else {
            if (this.state.currentMenuDetail === this.LUNCH) {
                let elementToRemove = this.state.currentMenu.lunchMeal.findIndex(element => element === selectedDish);
                this.state.currentMenu.lunchMeal.splice(elementToRemove, 1);
            } else {
                let elementToRemove = this.state.currentMenu.dinnerMeal.findIndex(element => element === selectedDish);
                this.state.currentMenu.dinnerMeal.splice(elementToRemove, 1);
            }
        }
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
                                <IonItem
                                    onClick={() => this.setState({
                                        displayModal: true,
                                        currentMenu: Object.assign({},item),
                                        currentMenuDetail: this.LUNCH})}
                                    lines="none"
                                    className="list-menu">
                                    <IonLabel>
                                        <p>Lunch</p>
                                        {item.lunchMeal.length <= 0 ? <IonLabel>Nothing</IonLabel>:
                                            item.lunchMeal.map(dish => {
                                            return (
                                                <IonLabel>{dish.name}</IonLabel>
                                            )
                                        })}
                                    </IonLabel>
                                </IonItem>
                                <IonItem
                                    onClick={() => this.setState({
                                        displayModal: true,
                                        currentMenu: Object.assign({},item),
                                        currentMenuDetail: this.DINNER
                                    })}
                                    className="list-menu">
                                    <IonLabel className="list-menu">
                                        <p>Dinner</p>
                                        {item.dinnerMeal.length <= 0 ? <IonLabel>Nothing</IonLabel>:
                                            item.dinnerMeal.map(dish => {
                                            return (
                                                <IonLabel>{dish.name}</IonLabel>
                                            )
                                        })}
                                    </IonLabel>
                                </IonItem>
                            </div>
                        )
                    })}

            </div>
        )

    }

    renderModal = () => {
        let icon = "/assets/icon/app/ic_plat.png";
        let modalTitle = "Choose your meal";
        let mainButtonLabel = save;
        let clickAction = () => console.log("Click");

        return (
            <IonModal cssClass="menu-modal"
                      isOpen={this.state.displayModal}
                      onDidDismiss={() => {
                          this.resetState();
                      }}>
                <div className="flex-container">
                    <img src={icon} height="40px"/>
                    <div className="title">{modalTitle}</div>
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
                                            (this.state.currentMenuDetail === this.LUNCH
                                            && this.state.currentMenu.lunchMeal.some(element => item.id === element.id))
                                            ||
                                            (this.state.currentMenuDetail === this.DINNER
                                                && this.state.currentMenu.dinnerMeal.some(element => item.id === element.id))
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
                        <IonIcon icon={mainButtonLabel}/>
                    </IonButton>
                    <IonButton slot="end"
                               expand='block'
                               color="light"
                               onClick={() => this.setState({
                                   displayModal: false,
                                   deleteMode: false,
                                   currentMenu: new Menu()
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
                        <IonBackButton defaultHref="/home"/>
                    </IonButtons>
                    <IonTitle>Menus</IonTitle>
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