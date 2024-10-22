import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularAppComponent} from "./component/angular-app/angular-app.component";

@NgModule({
	imports: [
		BrowserModule,
		AngularAppComponent,
		BrowserAnimationsModule
	],
	providers: []
})
export class ElementModule implements DoBootstrap {

	constructor(private injector: Injector) {
	}

	ngDoBootstrap(appRef: ApplicationRef) {
		if (!customElements.get('ng-template')) {
			const elementComponent = createCustomElement(AngularAppComponent, {
				injector: this.injector,    // This injector is used to load the component's factory
			});
			customElements.define('ng-template', elementComponent);
		}
	}
}
