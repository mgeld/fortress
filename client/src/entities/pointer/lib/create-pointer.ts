import { PointerCreator } from "./pointer-creator";
import IconPointer from '../assets/icons/pointer.png';

export const createPointer = (name: string) => new PointerCreator(name).createPoint(IconPointer)