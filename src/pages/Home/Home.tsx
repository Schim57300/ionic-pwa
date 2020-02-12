import React, {Component} from 'react';
import {
    IonButton, IonButtons,
    IonCardSubtitle, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonPage, IonText, IonTitle, IonToast,
    IonToolbar
} from '@ionic/react';

import DICTIONARY from '../../services/storageService'
import './Home.css';

import dico_json from '../../data/dictionary.json'
import {menu} from "ionicons/icons";
import NavBar from "../../Components/NavBar";

class Home extends Component {

    iconFr = "/assets/flags/fr32.png";
    iconEn = "/assets/flags/en32.png";

    // Used to force refresh on click
    state = {
        test: true
    };

    handleChangeLangage = (lang: String) => {
        if (lang === "fr") {
            DICTIONARY.db = dico_json.fr;
        } else {
            DICTIONARY.db = dico_json.en;
        }
        this.setState({test: !this.state.test});
    }


    render() {
        return (
            <IonPage>
                <IonHeader>
                    <NavBar title={DICTIONARY.db.home_page.PAGE_TITLE} />
                </IonHeader>
                <IonContent>
                    <br/>
                    <br/>
                    <div className="div-center no-background">
                        <IonButton color="light" onClick={() => this.handleChangeLangage("fr")}>
                            <IonImg src={this.iconFr}/>
                        </IonButton>
                        <IonButton color="light" onClick={() => this.handleChangeLangage("en")}>
                            <IonImg src={this.iconEn}/>
                        </IonButton>
                    </div>
                    <br/>
                    <br/>
                    <IonItem className="no-background" lines="none">
                        <div dangerouslySetInnerHTML={{__html: DICTIONARY.db.home_page.DESCRIPTION}}/>
                    </IonItem>
                </IonContent>
                <IonFooter>
                    <IonButton routerLink="/menu"
                               size="large"
                               className="home-button"
                               color="light">{DICTIONARY.db.home_page.MENU_BUTTON_LABEL}</IonButton>
                    <IonButton routerLink="/list"
                               size="large"
                               className="home-button"
                               color="light">{DICTIONARY.db.home_page.SHOPPING_LIST_BUTTON_LABEL}</IonButton>
                    <IonCardSubtitle color='white'>menu v0.0.6-SNAPSHOT</IonCardSubtitle>
                </IonFooter>
            </IonPage>);
    }
}

export default Home;
