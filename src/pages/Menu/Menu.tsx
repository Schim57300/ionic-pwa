import {
    IonButton,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonPage,
    IonText
} from '@ionic/react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import './Menu.css';

import * as actions from "../../actions/actions";
import {displayToast, updateMenu} from "../../actions/actions";
import {IRootState} from "../../reducers";
import {ActionType} from "typesafe-actions";
import {Menu} from "../../Models/Menu";
import {closeCircleOutline, save} from "ionicons/icons";
import {Dish} from "../../Models/Dish";

import DICTIONARY, {DINNER, INFO, LUNCH} from '../../services/storageService'
import NavBar from "../../Components/NavBar";

const mapStateToProps = ({menuReducer, dishReducer}: IRootState) => {
    const {menuList} = menuReducer;
    const {dishList} = dishReducer;
    return {menuList, dishList};
}


const mapDispatcherToProps = (dispatch: Dispatch<ActionType<typeof actions>>) => {
    return {
        updateMenu: (element: Menu) => dispatch(actions.updateMenu(element)),
        displayToast: (type: string, message: string) => dispatch(actions.displayToast(type, message))
    }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

class MenusPage extends React.Component<ReduxType> {


    state = {
        currentMeal: [] as Dish[],
        currentMenu: new Menu(),
        currentMenuDetail: "",
        displayModal: false,
        filter: "",
        label: ""
    }

    resetState = () => {
        this.setState({
            currentMeal: [],
            currentMenu: new Menu(),
            currentMenuDetail: "",
            displayModal: false
        })
    }

    getSelectedMeal = (): Dish[] => {
        if (this.state.currentMenuDetail === LUNCH) {
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

    handleUpdatMenu = () => {
        let newMenu = new Menu(this.state.currentMenu.name,
            this.state.currentMenu.id,
            this.state.currentMenu.color,
            (this.state.currentMenuDetail === LUNCH ? this.state.currentMeal : this.state.currentMenu.lunchMeal),
            (this.state.currentMenuDetail === DINNER ? this.state.currentMeal : this.state.currentMenu.dinnerMeal)
        );
        this.props.updateMenu(newMenu);
        this.props.displayToast(INFO, DICTIONARY.db.INFO_MESSAGE.CHANGE_APPLIED)
        this.resetState()
    }

    displayLunchMenu = (item: Menu) => {
        return (
            <IonItem
                key={"lunch" + item.id}
                onClick={() => this.setState({
                    displayModal: true,
                    currentMenu: Object.assign({}, item),
                    currentMenuDetail: LUNCH,
                    currentMeal: item.lunchMeal
                })}
                lines="none"
                className="list-menu ion-text-center">
                <IonLabel>
                    <h4>{DICTIONARY.db.menu_page.LIST_LUNCH}</h4>
                    {item.lunchMeal.length <= 0 ? <IonLabel> </IonLabel> :
                        item.lunchMeal.map(dish => {
                            return (
                                <IonLabel key={"lunch" + item.id + dish.id}>{dish.name}</IonLabel>
                            )
                        })}
                </IonLabel>
            </IonItem>
        )
    }

    displayDinnerMenu = (item: Menu) => {
        return (
            <IonItem
                key={"dinner" + item.id}
                onClick={() => this.setState({
                    displayModal: true,
                    currentMenu: Object.assign({}, item),
                    currentMenuDetail: DINNER,
                    currentMeal: item.dinnerMeal
                })}
                lines="none"
                className="list-menu  ion-text-center">
                <IonLabel className="list-menu">
                    <h4>{DICTIONARY.db.menu_page.LIST_DINNER}</h4>
                    {item.dinnerMeal.length <= 0 ? <IonLabel> </IonLabel> :
                        item.dinnerMeal.map(dish => {
                            return (
                                <IonLabel key={"dinner" + item.id + dish.id}>{dish.name}</IonLabel>
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
                                    color="light">
                                    <IonLabel>
                                        <IonText>
                                            <h3>{item.name}</h3>
                                        </IonText>
                                    </IonLabel>
                                </IonItem>
                                <div className="flex-menu-container">
                                    {this.displayLunchMenu(item)}
                                    {this.displayDinnerMenu(item)}
                                </div>
                            </div>
                        )
                    })}
            </div>
        )

    }

    renderModal = () => {
        let icon = "/assets/icon/app/ic_plat.png";
        let clickAction = () => this.handleUpdatMenu();

        return (
            <IonModal
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
                <NavBar title={DICTIONARY.db.menu_page.PAGE_TITLE}
                        displayToast={this.props.displayToast}/>
            </IonHeader>
            <IonContent>
                {this.renderMenu()}
                {this.renderModal()}
            </IonContent>
        </IonPage>
    }
}

export default connect(mapStateToProps, {updateMenu, displayToast})(MenusPage);