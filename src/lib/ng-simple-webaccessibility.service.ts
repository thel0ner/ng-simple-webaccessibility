import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { WebAccessibilityConfiguration } from './configuration.type';
import { filterClasses, filterTags, findTabIndexes, monitorKeyboardChanges$, navigateBasedOnKeyboardBehavior } from './webaccessibility';

@Injectable({
  providedIn: 'root'
})
export class NgSimpleWebaccessibilityService implements OnDestroy {
  private subs: Subscription[] = [];
  private config!: WebAccessibilityConfiguration;
  private activeElement!: Element;
  private elementRef!: HTMLElement;
  constructor() { }

  private setActiveElement(): void {
    if (document?.activeElement) {
      this.activeElement = document?.activeElement;
    }
  }

  private setElementRef(inpt: HTMLElement): void {
    this.elementRef = inpt;
  }

  private validateConfiguration(config: WebAccessibilityConfiguration): boolean {
    if (config.allowedTags?.length === 0) {
      throw new Error('Please provide a list of allowed tags. Allowed tags can not be empty');
    }
    if (!config.elementRef) {
      throw new Error('Please provide a elementRef');
    }
    return true;
  }

  private restrictDomsByClassName(): boolean {
    if (this.config.classesToRestrictTo) {
      return filterClasses(this.config.classesToRestrictTo);
    }
    return true;
  }

  private subscribers(): void {
    const sub$ = monitorKeyboardChanges$(
      this.config.allowedKeysForNavigation,
      this.config.keyboardEventToListen
    ).pipe(
      filter(_ => filterTags(this.config.allowedTags)),
      filter(_ => this.restrictDomsByClassName()),
      tap(_ => this.setActiveElement())
    ).subscribe(
      next => navigateBasedOnKeyboardBehavior(
        next.key === this.config.nextKey,
        this.activeElement,
        findTabIndexes(this.elementRef),
      ),
    );
    this.subs.push(sub$);
  }

  /**
   * web accessibility starter
   * @param config configuration of the event listener
   * @description simply starts the process of listening to keyboard behavior and responds back based on provided behavior schema in config.
   */
  public start(config: WebAccessibilityConfiguration): void {
    if (this.validateConfiguration(config)) {
      this.config = config;
      this.setElementRef(config.elementRef);
      this.subscribers();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
