# ng-simple-webaccessibility

Web accessibility toolkit for Angular projects.

for now, it simply helps you navigate through elements with different tabindexes throw defines keyCode(s) in configuration, as described below:

## Usage and Configuratiom

First, add it to your angular projects:

```
npm i ng-simple-webaccessibility --save

```

or, if you are a yarner, just:

```
yarn add ng-simple-webaccessibility

```

then, add it to imports section of your **NgModule**:

```
 imports: [
    BrowserModule,
    NgSimpleWebaccessibilityModule,
    AppRoutingModule,
    NgbModule,
    SharedModule
  ],
```

as next step, simply inject the **NgSimpleWebaccessibilityService** in to your component:

```
 constructor(
    private webAccessibilityService: NgSimpleWebaccessibilityService,
  ) {}
```

now, you need to provide a refrence to the element you want service to work on. For this purpose, you may use **@ViewChild** like:

```
  @ViewChild('domRefrence', {
    read: ElementRef
  }) elementRef!: ElementRef;
```

now, as the final step, simply call the **start()** method in side of **ngAfterViewInit()** , where the view has been initialized successfully , therefore **this.elementRef** is accessible:

```
ngAfterViewInit(): void {
    this.webAccessibilityService.start({
    allowedKeysForNavigation: ['ArrowLeft', 'ArrowRight'], // <--- which keys should be listened to?
    allowedTags: ['BUTTON'], //<--- which tags are allowed for focusing? pass their nodeName as string here
    elementRef: this.elementRef?.nativeElement, // <-- the elment refrence you created earlier
    keyboardEventToListen: 'keydown', //<-- which one do you prefer? keyUp or keyDown?
    nextKey: 'ArrowRight', //<-- the button defined here, will consider as forward button.
    // classesToRestrictTo: ['btn'] //<-- restrict iteration to elements which have at least one of these provided className(s)
    });
}

```

**please note** that nextKey in above configuration, must be defined in **allowedKeysForNavigation** as well.

### Upcoming features

As I am working on this module, in my own projects, I will try to add needed features as well. perhaps i could provide a more clear roadmap for this purpose, but for now I believe this is enough to indicate that this module is under active maintainance

### Issues and Contribution:

in case faced with a issue, please open a issue in issues section; And if you want to contribute, please fork this project, then send me a pull requets and after reviewing your changes, i will accept your pull request. In this case, please make sure that you have proper comments in your code and propper explanation in your pull request.

### Coding guide

Simply create a workstation project, then clone this project inside of your workstation.
why this method? using this, we won't mess with each other's workstation for just a single project!

Besides, please make sure to **lint** the code before submission.
