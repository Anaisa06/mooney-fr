import { createContext, Dispatch, SetStateAction } from "react"; 
import { IUser } from "src/interfaces/user.interface";
import { setUser } from "src/services/auth.services";

export interface authContextProps {
    user: IUser,
    login: (user: IUser) => void;
    logout: () => void;
}

export const defaultUser = {
    user: {
        id: 0,
        name: 'user',
        email: 'user@email.com'
    },
    login: () => {},
    logout: () => {}
}

export const AuthContext = createContext<authContextProps>(defaultUser);
