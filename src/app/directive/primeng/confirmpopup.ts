import {Directive, Host, Optional, Self} from "@angular/core";
import {ConfirmPopup} from "primeng/confirmpopup";
import {DomHandler} from "primeng/dom";

@Directive({
	selector: '[psdConfirmPopup]',
	standalone: true
})
export class psdConfirmPopupDirective {
	constructor(
		@Host() @Self() @Optional() private readonly hostEl: ConfirmPopup
	) {

		hostEl.onAnimationStart = (event) => {
			if (event.toState === 'open') {
				this.hostEl.container = event.element;
				// document.body.appendChild(this.container);
				this.hostEl.align();
				//this.hostEl.bindListeners();
			}
		}

		hostEl.bindDocumentClickListener = () => {
			if (!hostEl.documentClickListener) {
				let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
				const documentTarget: any = hostEl.el ? hostEl.el.nativeElement.ownerDocument : document;

				hostEl.documentClickListener = hostEl.renderer.listen(documentTarget, documentEvent, (event) => {
					let targetElement = <HTMLElement>hostEl.confirmation!.target;
					const path = event.path || (event.composedPath && event.composedPath());
					const target = event.target.shadowRoot ? path[0] : event.target
					if (hostEl.container !== target && !hostEl.container!.contains(target) &&
						targetElement !== target && !targetElement.contains(target)) {
						hostEl.hide();
					}
				});
			}
		}
	}
}
