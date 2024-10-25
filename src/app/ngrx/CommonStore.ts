import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {TodoItem} from "../model/TodoItem";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {exhaustMap, forkJoin, mergeMap, pipe, tap} from "rxjs";
import {computed, inject} from "@angular/core";
import {TodoService} from "../service/todo.service";
import {StatusData} from "../model/StatusData";
import {withTodoItems} from "./features/TodoListStore";
import {tapResponse} from "@ngrx/operators";

export type CommonState = {
	_contactId: string;
	loading: boolean;
	statuses: StatusData[];
	selectedId: string;
}

export const CommonStore = signalStore(
	{providedIn: 'root'},
	withState<CommonState>({
		_contactId: "",
		loading: false,
		statuses: [],
		selectedId: ""
	}),
	withTodoItems(),
	withMethods((store, todoService = inject(TodoService)) => ({
		saveContact(id: string) {
			patchState(store, { _contactId: id });
		},
		loadTodoData: rxMethod<void>(pipe(
			tap(() => { patchState(store, { loading: true })}),
			mergeMap(() => {
				return forkJoin([todoService.getStatuses(), todoService.getRecords(store._contactId())]);
			}),
			tap(([statuses, todoItems]) => {
				patchState(store, { statuses: statuses, loading: false });
				store.setTodoData(todoItems);
			})
		)),
		addTodoItemQuery: rxMethod<TodoItem>(pipe(
			exhaustMap((item) => todoService.addRecord(store._contactId(), item).pipe(
				tapResponse({
					next: () => {
						store.addTodoItem(item);
						todoService.todoListChanged$.next();
					},
					error: () => {},
					finalize: () => {}
				}),
			))
		)),
		selectRecord(value: string) {
			patchState(store, { selectedId: value });
		}
	})),
	withComputed((store) => ({
		checkList: computed(() => {
			return store.todoItems().filter(todoItem => store.statuses().some(status => status.isFinal && status.id === todoItem.statusId)).map(x=>x.id)
		}),
	}))
);
