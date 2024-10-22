import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TodoItem} from "../model/TodoItem";
import {StatusData} from "../model/StatusData";

@Injectable({providedIn: 'root'})
export class TodoService {

	private http = inject(HttpClient);
	private Ext = (window as any).Ext;

	private formatString(str: string, ...val: string[]) {
		for (let index = 0; index < val.length; index++) {
			str = str.replace(`{${index}}`, val[index]);
		}
		return str;
	}

	getList(contactId: string): Observable<TodoItem[]> {
		const url = this.formatString(environment.todoService.getList, contactId);
		return this.http.get<TodoItem[]>(url);
	}

	getStatuses(): Observable<StatusData[]> {
		const url = this.formatString(environment.todoService.getStatuses);
		return this.http.get<StatusData[]>(url);
	}

	addRecord(contactId: string, title: string) {
		let headers = (this.Ext) ? new HttpHeaders({"BPMCSRF": this.Ext.util.Cookies.get("BPMCSRF") || ""}) : new HttpHeaders();
		const body = {
			ownerId: contactId,
			title: title
		}
		return this.http.post<any>(environment.todoService.addRecord, body, {headers: headers});
	}

}
