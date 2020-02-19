import {InitialState, initialStateImpl} from "./index";
import {DISPLAY_TOAST, HIDE_TOAST} from "../actions/actions";



export function notificationReducer(state: InitialState = initialStateImpl, action: any): InitialState {
    switch (action.type) {
        case DISPLAY_TOAST:
            return Object.assign({},
                state,
                {displayToast: true, toastMessage: action.data.message, toastType: action.data.type});
        case HIDE_TOAST:
            return Object.assign({}, state, {displayToast: false});
        default:
            return state;
    }
}

