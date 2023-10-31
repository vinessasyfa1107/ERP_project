import { useStore } from ".."
import { stateTitleNavbar } from "../../lib/localStorage";

export const useNavbarStore1 = () => {
    const [{navbarStore}, setState] = useStore();

    const changeTitleNavbar1 = (title: string) => {
        console.log('ini perbahan title ', title);
        setState("navbarStore", { title_navbar: title });
    }

    return [
        navbarStore,
        {
            changeTitleNavbar1
        }
   ]
}