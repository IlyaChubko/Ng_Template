import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {TodoItem} from "../../../../../model/TodoItem";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {IsCheckedPipe} from "../../../../../pipes/is-checked.pipe";
import {CommonStore} from "../../../../../ngrx/CommonStore";
import {Button} from "primeng/button";
import {GetStatusCaptionPipe} from "../../../../../pipes/get-status-caption.pipe";
import {GetStatusColorPipe} from "../../../../../pipes/get-status-color.pipe";
import {TodoService} from "../../../../../service/todo.service";
import {switchMap, take, tap} from "rxjs";

@Component({
	selector: 'app-todo-item',
	standalone: true,
	imports: [
		FormsModule,
		CheckboxModule,
		IsCheckedPipe,
		Button,
		GetStatusCaptionPipe,
		GetStatusColorPipe
	],
	templateUrl: './todo-item.component.html',
	styleUrl: './todo-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
	@Input() todoItem: TodoItem;
	readonly store = inject(CommonStore);
	todoService = inject(TodoService)

	onSelectRecord() {
		this.store.selectRecord(this.todoItem.id);
	}

	onCheckRecord(checked: any) {
		this.todoService.checkRecord(this.todoItem.id, checked).pipe(
			take(1),
			switchMap(_ => this.todoService.getRecord(this.todoItem.id).pipe(take(1))),
			tap((value) => {
				this.store.setTodoItem(value);
				this.todoService.todoListChanged$.next();
			}),
		).subscribe();
	}
}
