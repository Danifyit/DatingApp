import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;//Med Partial<EnKlass> gör vi alla required props i klassen BsDatepickerConfig optional
  @Input() valuesFromHome: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRigisterForm();

    //using reactive forms
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', [Validators.required] )
    // }, this.passwordMatchValidator);
    // this.registerForm.addControl('dynamic', new FormControl('', [Validators.required, Validators.pattern('^[a-c]+$')]));
  }

  //using form buileer
  createRigisterForm() {
    this.registerForm = this.formBuilder.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator})
  }

  passwordMatchValidator(formGroup: FormGroup) {
    //om vi returnerar null så har validatorn gått grönt
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : {'mismatch': true};
  }


  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      console.log(this.user);

      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }

    // this.authService.register(this.model).subscribe(next => {
    // this.alertify.success('registration successful');
    // }, error => {
    //   this.alertify.error(error);
    // });
    console.log(this.registerForm.value);

  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
