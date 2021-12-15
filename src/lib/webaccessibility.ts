import { fromEvent, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


/**
 * simply filters tags, so only allowed ones will be passed
 * @param allowedTags NodeName of allowed tags
 * @returns true if current active element is allowed
 */
export const filterTags = (allowedTags: string[] = ['BUTTON']): boolean =>
    document?.activeElement?.nodeName ? allowedTags.includes(document.activeElement.nodeName) : false;

export const filterClasses = (classesToRestrictTo: string[] = []): boolean =>
    classesToRestrictTo.some(className => document?.activeElement?.classList.contains(className));

/**
 * listens on keyboard events and passes those which match the provided criteria
 * @param allowedKeysForNavigation which keys should be listened to?
 * @param keyboardEventToListen which keyboard behavior should be choosen for
 * @returns emited events based on provided criteria
 */
export const monitorKeyboardChanges$ = (allowedKeysForNavigation: string[] = ['ArrowLeft', 'ArrowRight'], keyboardEventToListen: 'keydown' | 'keyup' = 'keydown'): Observable<KeyboardEvent> => {
    return fromEvent<KeyboardEvent>(document, keyboardEventToListen).pipe(
        filter(event => event.isTrusted === true),
        filter(event => allowedKeysForNavigation.includes(event.key)),
    );
};

/**
 * Generates a NodeList of elements with tabindex attribute
 * @param elementRef refrense to element
 * @returns NodeList of elements containing tabindex
 */
export const findTabIndexes = (elementRef: HTMLElement): NodeListOf<Element> => elementRef.querySelectorAll(`[tabindex]`);

/**
 * Finds the index of provided element inside of provioded NodeList of elements
 * @param elementToFind element to find
 * @param nodes NodeList of elements
 * @returns index of found element in side of NodeList
 */
export const findNodeInNodeList = (elementToFind: Element, nodes: NodeListOf<Element>): Promise<number> => {
    return new Promise(
        (resolve) => {
            let answer = 0;
            let c = 0;
            const len = nodes.length;
            while (c <= len) {
                if (elementToFind.isEqualNode(nodes[c])) {
                    answer = c;
                }
                c++;
            }
            resolve(answer);
        },
    );
};

/**
 * Navigates and sets focus on elemetns, based on provided criteria
 * @param prev should go backward or forward?
 * @param activeNode refrence to current active node
 * @param nodes NodeList of items containing tabindex
 * @returns void
 */
export const navigateBasedOnKeyboardBehavior = async (prev: boolean, activeNode: Element, nodes: NodeListOf<Element>) => {
    const id: number = await findNodeInNodeList(activeNode, nodes);
    const edge: number = nodes.length - 1;
    if (prev) {
        if (id === 0) {
            (nodes[edge] as any).focus();
            return;
        }
        (nodes[id - 1] as any).focus();
        return;
    }

    if (id >= edge) {
        (nodes[0] as any).focus();
        return;
    }
    (nodes[id + 1] as any).focus();
    return;
};
