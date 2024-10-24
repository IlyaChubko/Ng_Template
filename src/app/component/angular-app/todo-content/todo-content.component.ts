import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {CommonStore} from "../../../ngrx/CommonStore";
import {TodoItem} from "../../../model/TodoItem";
import {Guid} from "guid-typescript";
import {formatDate} from "@angular/common";
import {ImageUrlPipe} from "../../../pipes/image-url.pipe";

@Component({
	selector: 'app-todo-content',
	standalone: true,
	imports: [
		Button,
		InputTextModule,
		PaginatorModule,
		TodoListComponent,
		ImageUrlPipe
	],
	templateUrl: './todo-content.component.html',
	styleUrl: './todo-content.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoContentComponent {
	newItemValue: string;
	readonly store = inject(CommonStore);

	onAddRecord() {
		let item: TodoItem = {
			id: Guid.create().toString(),
			title: this.newItemValue,
			startDate: formatDate(Date.now(),'dd.MM.yyyy','en-US'),
			statusId: "384d4b84-58e6-df11-971b-001d60e938c6"
		}
		this.store.addTodoItemQuery(item);
		//this.store.addTodoItem(item);
		this.newItemValue = "";
	}
}
