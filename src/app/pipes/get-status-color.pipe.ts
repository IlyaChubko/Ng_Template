import {Pipe, PipeTransform} from '@angular/core';
import {StatusData} from "../model/StatusData";
import {ConstJs} from "../model/ConstJs";

@Pipe({
	name: 'getStatusColor',
	standalone: true
})
export class GetStatusColorPipe implements PipeTransform {

	transform(statusId: string): string {
		let color = "#ffffff";
		if (statusId === ConstJs.Status.SuccessStatus) color = "#00d100";
		else if (statusId === ConstJs.Status.CanceledStatus) color = "#ff6767";
		return color;
	}

}
