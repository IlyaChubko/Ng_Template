import {Directive, HostListener} from '@angular/core';

@Directive({
	standalone: true,
	selector: '[stop-propagation]'
})
export class StopPropagationDirective {

	constructor() {
	}

	@HostListener('click', ['$event']) onClick($event: Event) {
		$event.stopPropagation();
		return false;
	}

}
