import {inject, Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {TodoItem} from "./model/TodoItem";
import {Guid} from "guid-typescript";
import {CommonStore} from "./ngrx/CommonStore";

@Injectable({providedIn: 'root'})
export class InMemoryDataService implements InMemoryDbService {


	createDb() {
		let getList = <TodoItem[]>[
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
		let getStatuses = [
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
		const addRecord = ["addRecord"];
		const checkRecord = ["checkRecord"];
		return {getList, getStatuses, addRecord, checkRecord};

	}

	genId(data: any): any {
		return [];
	}
}
