import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
	selector: 'app-property-item',
	standalone: true,
	imports: [],
	templateUrl: './property-item.component.html',
	styleUrl: './property-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyItemComponent {
	@Input() caption: string;
	@Input() value: string;
}
