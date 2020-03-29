import {IMPORT_DATA, INIT_SECTION, UPDATE_SECTIONS} from "../actions/actions";
import {InitialState, initialStateImpl} from "./index";

import {setSections} from "../services/storageService";
import {Section} from "../Models/Section";

export function sectionReducer(state: InitialState = initialStateImpl, action: any): InitialState {
    switch(action.type) {
        case INIT_SECTION:
            return Object.assign({}, state, {sectionList: action.data});
        case IMPORT_DATA:
            if (action.data.sections.length === 0) {
                let defaultValues = [
                    new Section("Conserves", 0, 1),
                    new Section("Pâtes et riz", 1, 2),
                    new Section("Fruits et Légumes", 2, 3),
                    new Section("Petit déjeuner", 3, 4),
                    new Section("Surgelés", 4, 5),
                    new Section("Rayon frais", 5, 6),
                    new Section("Liquides", 6, 7),
                    new Section("Viandes et poissons", 7, 8),
                    new Section("Epicerie salée", 8, 9)
                ];
                setSections(defaultValues);
                return Object.assign({}, state, {sectionList: defaultValues});
            } else {
                setSections(action.data.sections);
                return Object.assign({}, state, {sectionList: action.data.sections});
            }
        case UPDATE_SECTIONS:
            setSections(action.data);
            return Object.assign({}, state, {sectionList: action.data});
        default:
            return state;
    }

}
