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
photoUrl: string;

  constructor(public authservice: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authservice.currentPhotoUrl.subscribe(photoUrl =>{
      console.log('in nav subscribe');

      this.photoUrl = photoUrl;
    });
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
    localStorage.removeItem('user');
    this.authservice.decodedToken = null;
    this.authservice.currentUser = null;

    this.alertify.message('Logged out');
    this.router.navigate(['/']);
  }

}
