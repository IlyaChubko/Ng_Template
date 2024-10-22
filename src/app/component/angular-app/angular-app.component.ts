import {ChangeDetectionStrategy, Component, inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ImageUrlPipe} from "../../pipes/image-url.pipe";
import {DividerModule} from "primeng/divider";
import {TodoContentComponent} from "./todo-content/todo-content.component";
import {TodoPropertyComponent} from "./todo-property/todo-property.component";
import {CommonStore} from "../../ngrx/CommonStore";
import {TodoItemFull} from "../../model/TodoItemFull";
import {environment} from "../../../environments/environment";

@Component({
	selector: 'angular-app',
	templateUrl: './angular-app.component.html',
	styleUrls: [
		'./angular-app.component.scss',
		'../../../styles.scss',
		'../../../../node_modules/primeng/resources/themes/lara-light-blue/theme.css',
		'../../../../node_modules/primeng/resources/primeng.min.css',
		'../../../../node_modules/primeflex/primeflex.scss',
		'../../../theme/theme.css'
	],
	encapsulation: ViewEncapsulation.ShadowDom,
	imports: [
		FormsModule,
		CommonModule,
		ImageUrlPipe,
		DividerModule,
		TodoContentComponent,
		TodoPropertyComponent
	],
	providers: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true
})

export class AngularAppComponent implements OnInit {
	@Input("contactId") contactId!: string;
	readonly store = inject(CommonStore);

	ngOnInit(): void {
		this.store.saveContact(this.contactId);
		this.store.loadTodoData();
	}

	protected readonly environment = environment;
}
