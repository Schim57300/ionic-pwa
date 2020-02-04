import {
    IonButton,
    IonCardSubtitle, IonContent, IonHeader, IonPage
} from '@ionic/react';
import React from 'react';

import {DICTIONARY} from '../../services/storageService'
import './Home.css';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonButton expand='block' routerLink="/menu" color="light">{DICTIONARY.home_page.MENU_BUTTON_LABEL}</IonButton>
                <IonButton disabled expand='block' color="light">{DICTIONARY.home_page.SHOPPING_LIST_BUTTON_LABEL}</IonButton>
                <IonButton expand='block' routerLink="/config" color="light">{DICTIONARY.home_page.CONFIG_BUTTON_LABEL}</IonButton>
            </IonHeader>
            <IonContent>
                <IonCardSubtitle color='white'>menu v1.0</IonCardSubtitle>
            </IonContent>

        </IonPage>);
};

export default Home;
