import {IMPORT_DATA, INIT_SECTION, UPDATE_SECTIONS} from "../actions/actions";
import {InitialState, initialStateImpl} from "./index";

import {setSections} from "../services/storageService";

export function sectionReducer(state: InitialState = initialStateImpl, action: any): InitialState {
    switch(action.type) {
        case INIT_SECTION:
            return Object.assign({}, state, {sectionList: action.data});
        case IMPORT_DATA:
            setSections(action.data.sections);
            return Object.assign({}, state, {sectionList: action.data.sectionList });
        case UPDATE_SECTIONS:
            setSections(action.data);
            return Object.assign({}, state, {sectionList: action.data});
        default:
            return state;
    }

}
