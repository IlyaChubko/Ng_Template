import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularAppComponent} from "./component/angular-app/angular-app.component";
import {provideHttpClient} from "@angular/common/http";

@NgModule({
	imports: [
		BrowserModule,
		AngularAppComponent,
		BrowserAnimationsModule
	],
	providers: [
		provideHttpClient()
	]
})
export class ElementModule implements DoBootstrap {

	constructor(private injector: Injector) {
	}

	ngDoBootstrap(appRef: ApplicationRef) {
		if (!customElements.get('ng-todo')) {
			const elementComponent = createCustomElement(AngularAppComponent, {
				injector: this.injector,    // This injector is used to load the component's factory
			});
			customElements.define('ng-todo', elementComponent);
		}
	}
}
