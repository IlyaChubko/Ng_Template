import {AfterViewInit, Directive, ElementRef, Host, Optional, Self} from '@angular/core';
import {Tooltip} from 'primeng/tooltip';

@Directive({
	selector: '[psdTooltip]',
	standalone: true
})

export class psdDasTooltipDirective implements AfterViewInit {
	constructor(private elementRef: ElementRef, @Host() @Self() @Optional() private readonly tooltipEl: Tooltip) {
	}

	ngAfterViewInit(): void {
		const ttHost = document.createElement('div');
		const shadowRoot: ParentNode = this.elementRef.nativeElement.getRootNode();
		shadowRoot.append(ttHost);
		this.tooltipEl._tooltipOptions.appendTo = ttHost;

		const align = this.tooltipEl.align;

		this.tooltipEl.align = () => {
			this.positionTooltip(this.tooltipEl, this.elementRef.nativeElement);
			align.call(this.tooltipEl);
		};
	}

	private positionTooltip(tooltip: Tooltip, target: HTMLElement) {
		// const targetHeight = target.offsetHeight;
		// const targetWidth = target.offsetWidth;
		const targetOffset = target.getBoundingClientRect();
		const yScrollOffset = (target.getRootNode() as any).host.getRootNode().scrollingElement.scrollTop;

		const top = targetOffset.top + yScrollOffset;
		const left = targetOffset.left;

		tooltip._tooltipOptions.positionTop = top;
		tooltip._tooltipOptions.positionLeft = left;
	}
}
