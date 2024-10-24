import {ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {TodoListComponent} from "../todo-content/todo-list/todo-list.component";
import {PropertyItemComponent} from "./property-item/property-item.component";
import {TodoItem} from "../../../model/TodoItem";
import {TodoItemFull} from "../../../model/TodoItemFull";
import {TodoService} from "../../../service/todo.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {SkeletonModule} from "primeng/skeleton";
import {GetStatusCaptionPipe} from "../../../pipes/get-status-caption.pipe";
import {CommonStore} from "../../../ngrx/CommonStore";
import {ImageUrlPipe} from "../../../pipes/image-url.pipe";

@Component({
	selector: 'app-todo-property',
	standalone: true,
	imports: [
		Button,
		InputTextModule,
		ReactiveFormsModule,
		TodoListComponent,
		PropertyItemComponent,
		AsyncPipe,
		SkeletonModule,
		GetStatusCaptionPipe,
		ImageUrlPipe
	],
	templateUrl: './todo-property.component.html',
	styleUrl: './todo-property.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPropertyComponent implements OnChanges {
	@Input() recordId: string;
	readonly store = inject(CommonStore);
	todoService = inject(TodoService)
	todoItem$: Observable<TodoItemFull>

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["recordId"]) {
			this.todoItem$ = this.todoService.getRecord(this.recordId);
		}
	}

}
