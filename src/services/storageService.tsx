import React from 'react';

import {Plugins} from '@capacitor/core';

import dico_json from '../data/dictionary.json'
import {Ingredient} from "../Models/Ingredient";
import {Dish} from "../Models/Dish";
import {Menu} from "../Models/Menu";

const {Storage} = Plugins;

export async function setIngredients(value: Ingredient[]): Promise<void> {
    await Storage.set({
        key: "ingredientList",
        value: JSON.stringify(value)
    });
}

export async function getIngredients(): Promise<Ingredient[]> {
    let newVar = await Storage.get({ key: "ingredientList" }) as any;
    return JSON.parse(newVar.value);
}

export async function setDishes(value: Dish[]): Promise<void> {
    await Storage.set({
        key: "dishList",
        value: JSON.stringify(value)
    });
}

export async function getDishes(): Promise<Dish[]> {
    let newVar = await Storage.get({ key: "dishList" }) as any;
    return JSON.parse(newVar.value);
}

export async function setMenus(value: Menu[]): Promise<void> {
    await Storage.set({
        key: "menuList",
        value: JSON.stringify(value)
    });
}

export async function getMenus(): Promise<Menu[]> {
    let newVar = await Storage.get({ key: "menuList" }) as any;
    return JSON.parse(newVar.value);
}

export async function remove(key: string): Promise<void> {
    await Storage.remove({
        key: key
    });
}

class StorageService {

    static db = dico_json.fr;
}
export default StorageService;


