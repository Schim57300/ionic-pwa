import React, {Component} from 'react';
import {
    IonButton,
    IonCardSubtitle, IonContent, IonFooter, IonHeader, IonImg, IonItem, IonPage, IonText, IonToast
} from '@ionic/react';

import DICTIONARY from '../../services/storageService'
import './Home.css';

import dico_json from '../../data/dictionary.json'

class Home extends Component {

    iconFr = "/assets/flags/fr32.png";
    iconEn = "/assets/flags/en32.png";

    // Used to force refresh on click
    state = {
        test: true,
        displayToast: true
    };

    handleChangeLangage = (lang: String) => {
        if (lang === "fr") {
            DICTIONARY.db = dico_json.fr;
        } else {
            DICTIONARY.db = dico_json.en;
        }
        this.setState({test: !this.state.test, displayToast: true});
    }


    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonButton expand='block' routerLink="/menu"
                               color="light">{DICTIONARY.db.home_page.MENU_BUTTON_LABEL}</IonButton>
                    <IonButton expand='block' routerLink="/list"
                               color="light">{DICTIONARY.db.home_page.SHOPPING_LIST_BUTTON_LABEL}</IonButton>
                    <IonButton expand='block' routerLink="/config"
                               color="light">{DICTIONARY.db.home_page.CONFIG_BUTTON_LABEL}</IonButton>
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
                    <IonToast
                        isOpen={this.state.displayToast}
                        showCloseButton
                        message={DICTIONARY.db.WARNING_MESSAGE.DEMO_VERSION}
                        color={"warning"}
                    />
                </IonContent>
                <IonFooter>
                    <IonCardSubtitle color='white'>menu v0.0.3-SNAPSHOT</IonCardSubtitle>
                </IonFooter>
            </IonPage>);
    }
}

export default Home;
