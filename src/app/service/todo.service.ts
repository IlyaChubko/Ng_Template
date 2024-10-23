import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TodoItem} from "../model/TodoItem";
import {StatusData} from "../model/StatusData";
import {TodoItemFull} from "../model/TodoItemFull";

@Injectable({providedIn: 'root'})
export class TodoService {

	private http = inject(HttpClient);
	private Ext = (window as any).Ext;

	public todoListChanged$ = new Subject<void>();

	private formatString(str: string, ...val: string[]) {
		for (let index = 0; index < val.length; index++) {
			str = str.replace(`{${index}}`, val[index]);
		}
		return str;
	}

	getRecords(contactId: string): Observable<TodoItem[]> {
		const url = this.formatString(environment.todoService.getRecords, contactId);
		return this.http.get<TodoItem[]>(url);
	}

	getRecord(recordId: string): Observable<TodoItemFull> {
		const url = this.formatString(environment.todoService.getRecord, recordId);
		return this.http.get<TodoItemFull>(url);
	}

	getStatuses(): Observable<StatusData[]> {
		const url = this.formatString(environment.todoService.getStatuses);
		return this.http.get<StatusData[]>(url);
	}

	addRecord(contactId: string, item: TodoItem) {
		let headers = (this.Ext) ? new HttpHeaders({"BPMCSRF": this.Ext.util.Cookies.get("BPMCSRF") || ""}) : new HttpHeaders();
		const body = {
			contactId: contactId,
			data: item
		}
		return this.http.post<any>(environment.todoService.addRecord, body, {headers: headers});
	}

	checkRecord(recordId: string, isChecked: boolean) {
		let headers = (this.Ext) ? new HttpHeaders({"BPMCSRF": this.Ext.util.Cookies.get("BPMCSRF") || ""}) : new HttpHeaders();
		const body = {
			activityId: recordId,
			isChecked: isChecked
		}
		return this.http.post<any>(environment.todoService.checkRecord, body, {headers: headers});
	}

}
