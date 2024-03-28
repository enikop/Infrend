import { Component } from '@angular/core';
import { CenterListComponent } from '../center-list/center-list.component';
import { CenterAddComponent } from '../center-add/center-add.component';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [CenterListComponent, CenterAddComponent],
  templateUrl: './centers.component.html',
  styleUrl: './centers.component.css'
})
export class CentersComponent {

}
