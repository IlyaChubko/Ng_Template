import {patchState, signalStoreFeature, type, withComputed, withMethods} from "@ngrx/signals";
import {addEntity, setEntities, setEntity, updateEntity, withEntities} from "@ngrx/signals/entities";
import {TodoItem} from "../../model/TodoItem";

export function withTodoItems() {
	return signalStoreFeature(
		withEntities({
			entity: type<TodoItem>(),
			collection: 'todo'
		}),
		withMethods((store) => ({
			setTodoData(items: TodoItem[]): void {
				patchState(store, setEntities(items, { collection: 'todo' }));
			},
			addTodoItem(item: TodoItem): void {
				patchState(store, addEntity(item, { collection: 'todo' }));
			},
			setTodoItem(item: TodoItem): void {
				patchState(store, setEntity(item, { collection: 'todo' }));
			},
		})),
		withComputed(({ todoEntities }) => ({
			todoItems: todoEntities,
		}))
	);
}
