import {importProvidersFrom, NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from "./app.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";
import {AngularAppComponent} from "./component/angular-app/angular-app.component";

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent],
	imports: [
		BrowserModule,
        BrowserAnimationsModule,
        AngularAppComponent
	],
	providers: [
		provideHttpClient(),
		importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
			post204: true,
			delay: 2000,
			dataEncapsulation: false
		}))
	]
})
export class AppModule {}
