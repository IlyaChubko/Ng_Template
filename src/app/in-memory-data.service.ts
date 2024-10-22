import {inject, Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {TodoItem} from "./model/TodoItem";
import {Guid} from "guid-typescript";
import {CommonStore} from "./ngrx/CommonStore";
import {TodoItemFull} from "./model/TodoItemFull";
import {StatusData} from "./model/StatusData";

@Injectable({providedIn: 'root'})
export class InMemoryDataService implements InMemoryDbService {


	createDb() {
		const getRecords = <TodoItem[]>[
			{
				"id": Guid.create().toString(),
				"title": "Создание проекта",
				"startDate": "01.09.2024",
				"statusId": "394d4b84-58e6-df11-971b-001d60e938c6"
			},
			{
				"id": Guid.create().toString(),
				"title": "Отправить письмо на согласование",
				"startDate": "15.09.2024",
				"statusId": "394d4b84-58e6-df11-971b-001d60e938c6"
			},
			{
				"id": Guid.create().toString(),
				"title": "Согласовать проект с руководством",
				"startDate": "20.09.2024",
				"statusId": "4bdbb88f-58e6-df11-971b-001d60e938c6"
			},
			{
				"id": Guid.create().toString(),
				"title": "Запланировать командировку",
				"startDate": "21.09.2024",
				"statusId": "394d4b84-58e6-df11-971b-001d60e938c6"
			},
			{
				"id": Guid.create().toString(),
				"title": "Подписать приказ",
				"startDate": "28.09.2024",
				"statusId": "201cfba8-58e6-df11-971b-001d60e938c6"
			}
		]
		let getStatuses: StatusData[] = [
			{
				"id": "201cfba8-58e6-df11-971b-001d60e938c6",
				"name": "Отменена",
				"isFinal": true
			},
			{
				"id": "384d4b84-58e6-df11-971b-001d60e938c6",
				"name": "Не начата",
				"isFinal": false
			},
			{
				"id": "394d4b84-58e6-df11-971b-001d60e938c6",
				"name": "В работе",
				"isFinal": false
			},
			{
				"id": "4bdbb88f-58e6-df11-971b-001d60e938c6",
				"name": "Завершена",
				"isFinal": true
			}
		];
		const getRecord: TodoItemFull = {
			id: Guid.create().toString(),
			title: "Подписать приказ",
			startDate: "28.09.2024",
			endDate: "29.09.2024",
			statusId: "201cfba8-58e6-df11-971b-001d60e938c6",
			author: "Supervisor",
			category: "Выполнить"
		}
		const addRecord = ["addRecord"];
		const checkRecord = ["checkRecord"];
		return {getRecord, getRecords, getStatuses, addRecord, checkRecord};

	}

	genId(data: any): any {
		return [];
	}
}
