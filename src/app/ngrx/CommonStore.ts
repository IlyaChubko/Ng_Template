import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {TodoItem} from "../model/TodoItem";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {exhaustMap, forkJoin, mergeMap, pipe, switchMap, tap} from "rxjs";
import {computed, inject} from "@angular/core";
import {TodoService} from "../service/todo.service";
import {StatusData} from "../model/StatusData";

export type CommonState = {
	_contactId: string;
	loading: boolean;
	todoItems: TodoItem[];
	statuses: StatusData[];
	selectedId: string;
}

export const CommonStore = signalStore(
	{providedIn: 'root'},
	withState<CommonState>({
		_contactId: "",
		loading: false,
		todoItems: [],
		statuses: [],
		selectedId: ""
	}),
	withMethods((store, todoService = inject(TodoService)) => ({
		saveContact(id: string) {
			patchState(store, { _contactId: id });
		},
		loadTodoData: rxMethod<void>(pipe(
			tap(() => { patchState(store, { loading: true })}),
			mergeMap(() => {
				return forkJoin([todoService.getStatuses(), todoService.getList(store._contactId())]);
			}),
			tap(([statuses, todoItems]) => {
				patchState(store, { statuses: statuses, todoItems: todoItems, loading: false });
			})
		)),
		addTodoData(item: TodoItem) {
			patchState(store, { todoItems: [...store.todoItems(), item] });
		},
		addTodoDataQuery: rxMethod<TodoItem>(pipe(
			exhaustMap((item) => todoService.addRecord(store._contactId(), item)),
		)),
		checkRecord: rxMethod<string>(pipe(
			exhaustMap((recordId) => todoService.checkRecord(recordId)),
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
