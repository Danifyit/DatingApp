import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};

  constructor(public authservice: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log('model', this.model);
    this.authservice.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error('Username or password does not match');
    }, () => this.router.navigate(['/members']));
  }

  loggedIn() {
    return this.authservice.loggedIn();
  }

  loggout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');    
    this.router.navigate(['/']);
  }

}
