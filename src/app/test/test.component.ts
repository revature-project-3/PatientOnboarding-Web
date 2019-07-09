import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(public aS: AuthenticationService) { }

  ngOnInit() {
  }
  clickme() {
    console.log('in clickme');
    this.aS.test().subscribe(
      data => {

      },
      error => {
          if (error.status === 200) {
            error = '';
          }
      }
  );
  }
}
