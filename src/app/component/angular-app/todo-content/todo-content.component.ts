import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {TodoListComponent} from "./todo-list/todo-list.component";

@Component({
	selector: 'app-todo-content',
	standalone: true,
	imports: [
		Button,
		InputTextModule,
		PaginatorModule,
		TodoListComponent
	],
	templateUrl: './todo-content.component.html',
	styleUrl: './todo-content.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoContentComponent {
	newItemValue: string;

	onAddRecord() {

	}
}
