import { PointerCreator } from "./pointer-creator";
import IconPointer from '../assets/icons/pointer.png';

export const createPointer = (
    username: string,
    usericon: string
) => {
    console.log('99 createPointer')
    return new PointerCreator(username).createPoint(IconPointer, usericon)
}