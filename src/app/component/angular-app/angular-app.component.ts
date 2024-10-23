import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	inject,
	Input, OnDestroy,
	OnInit,
	Output,
	ViewEncapsulation
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ImageUrlPipe} from "../../pipes/image-url.pipe";
import {DividerModule} from "primeng/divider";
import {TodoContentComponent} from "./todo-content/todo-content.component";
import {TodoPropertyComponent} from "./todo-property/todo-property.component";
import {CommonStore} from "../../ngrx/CommonStore";
import {TodoItemFull} from "../../model/TodoItemFull";
import {environment} from "../../../environments/environment";
import {TodoService} from "../../service/todo.service";
import {debounceTime, Subscription} from "rxjs";

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

export class AngularAppComponent implements OnInit, OnDestroy {

	@Input("contactId") contactId!: string;
	@Input() sandbox!: any;
	@Output() TodoListChanged = new EventEmitter<any>();

	todoService = inject(TodoService)
	readonly store = inject(CommonStore);
	todoListChangedSub: Subscription;
	protected readonly environment = environment;

	ngOnInit(): void {
		this.store.saveContact(this.contactId);
		this.store.loadTodoData();
		this.todoListChangedSub = this.todoService.todoListChanged$.pipe(
			debounceTime(400)
		).subscribe(() => this.TodoListChanged.emit());
		if (this.sandbox) this.sandbox.subscribe("OnChangeDashboardTab", () => {
			this.store.loadTodoData();
		}, this, [this.sandbox.id]);
	}

	ngOnDestroy(): void {
		this.todoListChangedSub.unsubscribe();
	}


}
