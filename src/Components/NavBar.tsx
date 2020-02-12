import React from "react";
import {home, menu, nutrition, person, restaurant} from "ionicons/icons";
import {IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar} from "@ionic/react";
import DICTIONARY from "../services/storageService";

import './NavBar.css';

class NavBar extends React.Component<NavBarProps> {


    state = {
        displayModal: false
    }


    renderModal = () => {

        return (
            <IonModal
                cssClass={"navbar-modal"}
                isOpen={this.state.displayModal}
                onDidDismiss={() => {
                    this.setState({displayModal: false});
                }}>

                <IonList>
                    <IonItem
                        onClick={() => this.setState({displayModal: false})}
                        routerLink="/home"
                    >
                        <IonIcon icon={home}/>
                        <IonLabel className="nav-element">{DICTIONARY.db.config_page.HOME_PAGE_BUTTON_LABEL}</IonLabel>
                    </IonItem>
                    <IonItem
                        onClick={() => this.setState({displayModal: false})}
                        routerLink="/ingredients"
                    >
                        <IonIcon icon={nutrition}/>
                        <IonLabel className="nav-element">{DICTIONARY.db.config_page.INGREDIENT_BUTTON_LABEL}</IonLabel>
                    </IonItem>
                    <IonItem
                        routerLink="/dishes"
                        onClick={() => this.setState({displayModal: false})}
                    >
                        <IonIcon icon={restaurant}/>
                        <IonLabel className="nav-element">{DICTIONARY.db.config_page.DISH_BUTTON_LABEL}</IonLabel>
                    </IonItem>
                    <IonItem disabled onClick={() => this.setState({displayModal: false})}>
                        <IonIcon icon={person}/>
                        <IonLabel className="nav-element">{DICTIONARY.db.config_page.ACCOUNT_BUTTON_LABEL}</IonLabel>
                    </IonItem>
                </IonList>
            </IonModal>
        )
    }

    render() {
        return (
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton slot="end"
                               expand='block'
                               onClick={() => this.setState({displayModal: true})}>
                        <IonIcon icon={menu}/>
                    </IonButton>
                </IonButtons>
                <IonTitle>{this.props.title}</IonTitle>
                {this.renderModal()}
            </IonToolbar>
        )
    }


}

type NavBarProps = {
    title: string
}


export default NavBar;