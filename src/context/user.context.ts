import { createContext} from 'react';
import { IUser } from 'src/interfaces/user.interface';

export interface authContextProps {
    user: IUser,
    login: (user: IUser) => void;
    logout: () => void;
}

export const defaultUser = {
    user: {
        id: 0,
        name: 'user',
        email: 'user@email.com',
    },
    login: () => {},
    logout: () => {},
};

export const AuthContext = createContext<authContextProps>(defaultUser);
