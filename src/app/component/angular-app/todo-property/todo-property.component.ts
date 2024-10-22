import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'app-todo-property',
	standalone: true,
	imports: [],
	templateUrl: './todo-property.component.html',
	styleUrl: './todo-property.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPropertyComponent {

}
