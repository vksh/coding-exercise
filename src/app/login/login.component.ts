import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInProcess: boolean;

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  model = {
    username: '',
    password: ''
  };
  emailRegex = /\.|\,|\\|\/|\$|\^|\s/;
  serverErrorMessages: string;
  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigateByUrl('/dashboard');
  }

  checkForValidation(event, formgroup) {
    let regex = RegExp(/\.|\,|\\|\/|\$|\^|\s/);
    if (regex.test(event.target.value)) {
      formgroup.control.setErrors({
        pattern: regex.test(event.target.value)
      })
    } else if (event.target.value) {
      formgroup.control.setErrors(null)
    }
  }
  onSubmit(form: NgForm) {
    this.loginInProcess = true;
    this.authService.login(form.value).subscribe(
      res => {
        this.loginInProcess = false;
        this.authService.setToken(res['token']);
        this.router.navigate(['dashboard']);
      },
      err => {
        this.loginInProcess = false;
        this.serverErrorMessages = err.error;
      }
    );
  }
  cancelClicked() {
    this.router.navigate(['/']);
  }
}
