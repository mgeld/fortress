import { PointerCreator } from "./pointer-creator";
import IconPointer from '../assets/icons/3pointer.png';

export const createPointer = (
    // username: string,
    usericon: string
) => {
    console.log('99 createPointer')
    return new PointerCreator().createPoint(IconPointer, usericon)
}