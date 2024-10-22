import {TodoItem} from "./TodoItem";

export interface TodoItemFull extends TodoItem {
	endDate: string;
	author: string;
	category: string;
}
