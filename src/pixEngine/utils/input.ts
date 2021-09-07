
export type inputEvent = 'keydown' | 'keyup' | 'click' | 'dblclick' | 'mouseup' | 'mousedown'
export type listener = (ev: KeyboardEvent | MouseEvent) => void;

export class Input {
    input: inputEvent;
    cb: listener;

    constructor(input: inputEvent, cb: listener) {
        this.input = input;
        this.cb = cb;
    }
}
