import { NavbarInitiateState, NavbarStoreState} from './Navbar/StateNavbar';
import { SessionInitiateState, SessionStoreState } from './Session/StateSession';

export interface RootState {
    navbarStore: NavbarStoreState,
    sessionStore: SessionStoreState,
}

export const rootInitialState = (): RootState => ({ 
    navbarStore: NavbarInitiateState(),
    sessionStore: SessionInitiateState()
});