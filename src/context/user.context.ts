import { createContext } from "react"; 
import { IUser } from "src/interfaces/user.interface";

export interface authContextProps {
    user: IUser
}

export const defaultUser = {
    user: {
        id: 0,
        name: 'user',
        email: 'user@email.com'
    }
}

export const AuthContext = createContext<authContextProps>(defaultUser);
