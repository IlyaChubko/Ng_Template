import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {CommonStore} from "../../../../ngrx/CommonStore";
import {TodoItemComponent} from "./todo-item/todo-item.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [
		FormsModule,
		InputTextModule,
		Button,
		TodoItemComponent,
		ProgressSpinnerModule
	],
	templateUrl: './todo-list.component.html',
	styleUrl: './todo-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
	readonly store = inject(CommonStore);
}
