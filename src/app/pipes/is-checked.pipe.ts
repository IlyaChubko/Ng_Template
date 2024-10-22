import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'isChecked',
	standalone: true
})
export class IsCheckedPipe implements PipeTransform {

	transform(checkList: string[], id: string): boolean {
		return checkList.some(x=>x === id);
	}

}
