import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {TodoItem} from "../../../../../model/TodoItem";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {IsCheckedPipe} from "../../../../../pipes/is-checked.pipe";
import {CommonStore} from "../../../../../ngrx/CommonStore";
import {Button} from "primeng/button";
import {GetStatusCaptionPipe} from "../../../../../pipes/get-status-caption.pipe";
import {GetStatusColorPipe} from "../../../../../pipes/get-status-color.pipe";

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

	onSelectRecord() {
		this.store.selectRecord(this.todoItem.id);
	}

	onCheckRecord() {
		this.store.checkRecord(this.todoItem.id);
	}
}
