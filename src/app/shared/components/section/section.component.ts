import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input()
  public titlePrimary: string;

  @Input()
  public titleSecondary: string;

  constructor() { }

  ngOnInit() {
  }

}
