import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};

constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log('model', this.model);
    this.authservice.login(this.model).subscribe(next => {
      console.log('Logged in successfully');      
    }, error => {
      console.log(error);
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token; //if token has a value return true else false
  }

  loggout() {
    localStorage.removeItem('token');
    console.log('logged out');
    
  }

}
