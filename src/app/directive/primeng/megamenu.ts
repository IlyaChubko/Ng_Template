import {isPlatformBrowser} from '@angular/common';
import {Directive, Host, Inject, Optional, PLATFORM_ID, Self,} from '@angular/core';
import {MegaMenu} from 'primeng/megamenu';

@Directive({
	selector: '[psdMegaMenu]',
	standalone: true
})
export class psdMegaMenuDirective {
	constructor(
		@Host() @Self() @Optional() private readonly hostEl: MegaMenu,
		@Inject(PLATFORM_ID) private platformId: any
	) {
		hostEl.bindOutsideClickListener = () => {
			if (isPlatformBrowser(platformId)) {
				if (!hostEl.outsideClickListener) {
					hostEl.outsideClickListener = hostEl.renderer.listen(
						document,
						'click',
						(event) => {
							const path =
								event.path || (event.composedPath && event.composedPath());
							const target = event.target.shadowRoot ? path[0] : event.target;

							const isOutsideContainer =
								hostEl.rootmenu?.el.nativeElement !== target &&
								!hostEl.rootmenu?.el.nativeElement.contains(target);

							if (isOutsideContainer) {
								hostEl.hide();
							}
						}
					);
				}
			}
		};
	}
}
