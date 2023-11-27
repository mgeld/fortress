import { PointerCreator } from "./pointer-creator";
import IconPointer from '../assets/icons/3pointer.png';

export const createPointer = (
    // username: string,
    usericon: string
) => {
    return new PointerCreator().createPoint(IconPointer, usericon)
}