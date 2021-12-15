/**
 * @description configuration of webaccessibility
 * @param allowedTags which tags are allowed to be passed? use nodeName
 * @param classesToRestrictTo restrict system to tags with specific className(s)? then provide them in array of strings
 * @param allowedKeysForNavigation pass the keyCode(s) which should system listen on
 * @param keyboardEventToListen which one do you prefer? keyDown or keyUp?
 * @param nextKey how to recognize the next key?!
 * @param elementRef ref to element
 */
export type WebAccessibilityConfiguration = {
    allowedTags: string[];
    classesToRestrictTo?: string[];
    allowedKeysForNavigation: string[];
    keyboardEventToListen: 'keydown' | 'keyup';
    nextKey: 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown';
    elementRef: HTMLElement
};
