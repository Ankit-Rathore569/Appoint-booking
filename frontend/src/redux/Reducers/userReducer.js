import {
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    CLEAR_ERRORS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
} from "../Constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
        case USER_LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };

        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            };
        case USER_REGISTER_FAIL:
        case USER_LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.type,
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const allUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ALL_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case ALL_USER_FAIL:
            return {
                ...state,
                loading: true,
                error: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                users: null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
