import {Pipe, PipeTransform} from '@angular/core';
import {environment} from "../../environments/environment";

@Pipe({
	name: 'imageUrl',
	standalone: true
})
export class ImageUrlPipe implements PipeTransform {

	transform(image: string): string {
		return `${environment.assert}/img/${image}`
	}

}
