import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton} from '@ionic/react';
import React from 'react';

import './Config.css';

const ConfigPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Configuration</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton disabled expand='block' color="light">Account (coming soon)</IonButton>
                <IonButton expand='block' routerLink="/ingredients" color="light">Ingredients</IonButton>
                <IonButton expand='block' routerLink="/dishes" color="light">Dishes</IonButton>
            </IonContent>
        </IonPage>
    );
};
export default ConfigPage;