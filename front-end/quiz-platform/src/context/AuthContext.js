import { createContext, useEffect, useReducer } from 'react';

export const AuthConext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': return { user: action.payload }
        case 'LOGOUT': return { user: null }
        default: return state;
    }
}

export const AuthConextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user){
            dispatch({type :'LOGIN', payload :user})
        }
    }, [])
    console.log("AuthContext state", state);

    return (
        <AuthConext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthConext.Provider>
    )
}