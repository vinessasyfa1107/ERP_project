
type userDataType = {
    username: string,
    email: string
}

export interface SessionStoreState {
    sessionData: object;
    changeSessionStore: (userData: object) => void;
}

const userData = sessionStorage.getItem("userData");
const objData = userData as unknown as userDataType;

export const SessionInitiateState = () : SessionStoreState => ({
    sessionData: objData,
    changeSessionStore: (userData: object) => {}
})