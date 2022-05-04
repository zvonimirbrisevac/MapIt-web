import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dna-animation',
  templateUrl: './dna-animation.component.html',
  styleUrls: ['./dna-animation.component.css']
})
export class DnaAnimationComponent implements OnInit {
  @Input() numOfBalls!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
