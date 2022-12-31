import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@nx-nest-postgre-manager/loading';

@Component({
  selector: 'nx-nest-postgre-manager-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  constructor(public loader: LoadingService) {}
}
