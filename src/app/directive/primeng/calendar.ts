import {Directive, Host, Optional, Self} from "@angular/core";
import {Calendar} from "primeng/calendar";
import {ConnectedOverlayScrollHandler} from "primeng/dom";

@Directive({
	selector: '[psdCalendar]', // psd = PRIMENG ShadowDOM Directive
	standalone: true
})
export class psdCalendarDirective {
	constructor(
		@Host() @Self() @Optional() private readonly hostEl: Calendar
	) {
		hostEl.isOutsideClicked = (event: any) => {
			const path = event.path || (event.composedPath && event.composedPath());
			const target = event.target.shadowRoot ? path[0] : event.target
			return !(this.hostEl.el.nativeElement.isSameNode(target) || this.hostEl.el.nativeElement.contains(target) || (this.hostEl.overlay && this.hostEl.overlay.contains(<Node>target)));
		}

		hostEl.isYearSelected = (year: number) => {
			if (!hostEl.value || hostEl.value.length === 0) return false;
			if (hostEl.isComparable()) {
				let value = hostEl.isRangeSelection() ? hostEl.value[0] : hostEl.value;
				return !hostEl.isMultipleSelection() ? value.getFullYear() === year : false;
			}
			return false;
		}

		if (!hostEl.scrollHandler) {
			hostEl.scrollHandler = <ConnectedOverlayScrollHandler>{
				element: hostEl.el,
				listener: (event: any) => {},
				bindScrollListener: () => {},
				unbindScrollListener: () => {},
				scrollableParents: [],
				destroy: () => {}
			}
		}

	}
}
