import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton} from '@ionic/react';
import React from 'react';

import './Config.css';
import DICTIONARY from '../../services/storageService';

const ConfigPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>{DICTIONARY.db.config_page.PAGE_TITLE}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton disabled expand='block' color="light">{DICTIONARY.db.config_page.ACCOUNT_BUTTON_LABEL}</IonButton>
                <IonButton expand='block' routerLink="/ingredients" color="light">{DICTIONARY.db.config_page.INGREDIENT_BUTTON_LABEL}</IonButton>
                <IonButton expand='block' routerLink="/dishes" color="light">{DICTIONARY.db.config_page.DISH_BUTTON_LABEL}</IonButton>
            </IonContent>
        </IonPage>
    );
};
export default ConfigPage;