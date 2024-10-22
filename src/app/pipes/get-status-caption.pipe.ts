import {Pipe, PipeTransform} from '@angular/core';
import {StatusData} from "../model/StatusData";

@Pipe({
	name: 'getStatusCaption',
	standalone: true
})
export class GetStatusCaptionPipe implements PipeTransform {

	transform(statuses: StatusData[], statusId: string): string {
		return statuses.some(x=>x.id === statusId) ? statuses.filter(x=>x.id === statusId)[0].name : "";
	}

}
