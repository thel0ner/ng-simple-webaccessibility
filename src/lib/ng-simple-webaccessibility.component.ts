import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgSimpleWebaccessibilityService } from './ng-simple-webaccessibility.service';

@Component({
  selector: 'lib-ng-simple-webaccessibility',
  template: `
    <div #domRefrence>
        <button tabindex="0" style="margin-right:5px;">Button one</button>
        <button tabindex="0" style="margin-left:5px;">Button two</button>
        <button tabindex="0" style="margin-left:5px;">Button threa</button>
    </div>
  `,
  styles: [
  ]
})
export class NgSimpleWebaccessibilityComponent implements OnInit, AfterViewInit {
  @ViewChild('domRefrence', {
    read: ElementRef
  }) elementRef!: ElementRef;
  constructor(
    private webAccessibilityService: NgSimpleWebaccessibilityService,
  ) {}

  ngAfterViewInit(): void {
    this.webAccessibilityService.start({
      allowedKeysForNavigation: ['ArrowLeft', 'ArrowRight'],
      allowedTags: ['BUTTON'],
      elementRef: this.elementRef?.nativeElement,
      keyboardEventToListen: 'keydown',
      nextKey: 'ArrowRight',
      // classesToRestrictTo: ['btn']
    });
  }

  ngOnInit(): void {}

}
