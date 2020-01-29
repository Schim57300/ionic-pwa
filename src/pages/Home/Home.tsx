import {
    IonButton,
    IonCardSubtitle, IonContent, IonHeader, IonPage
} from '@ionic/react';
import React from 'react';

import './Home.css';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonButton expand='block' color="light">Menu</IonButton>
                <IonButton expand='block' color="light">Shop</IonButton>
                <IonButton expand='block' routerLink="/config" color="light">Config</IonButton>
            </IonHeader>
            <IonContent>
                <IonCardSubtitle color='white'>menu v1.0</IonCardSubtitle>
            </IonContent>

        </IonPage>);
};

export default Home;
