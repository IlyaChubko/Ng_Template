import {Directive, Host, Optional, Self} from '@angular/core';
import {AutoComplete} from 'primeng/autocomplete';

@Directive({
	selector: '[psdAutoComplete]',
	standalone: true
})
export class psdAutoCompleteDirective {
	constructor(
		@Host() @Self() @Optional() private readonly hostEl: AutoComplete
	) {
		hostEl.show = (event?: Event) => {
			if (hostEl.multiInputEl || hostEl.inputEL) {
				const el = hostEl.multiple ? hostEl.multiInputEl!.nativeElement : hostEl.inputEL!.nativeElement
				const activeEl = el.getRootNode().activeElement
				const hasFocus = activeEl === el

				if (!hostEl.overlayVisible && hasFocus) {
					hostEl.overlayVisible = true;
				}
			}

			hostEl.onShow.emit(event)
			hostEl.cd.markForCheck()
		};
	}
}
