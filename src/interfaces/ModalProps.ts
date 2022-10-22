import Character from "./Character";

export default interface ModalProps {
    open: boolean;
    character: Character | undefined;
}
