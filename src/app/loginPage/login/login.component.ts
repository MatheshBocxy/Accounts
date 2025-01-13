import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup
  logInValues: string;

  constructor(private fb: FormBuilder,
    private apiCall: ApiservicesService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logIn() {
    let data = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }
    console.log(this.loginForm.get('username').value);
    console.log(this.loginForm.get('password').value);


    this.apiCall.apiPostCall('api/auth/signIn', data).subscribe(
      (response) => {

        this.logInValues = response
        sessionStorage.setItem('username', response.responseObject.jwtResponse.username);
        sessionStorage.setItem('token', response.responseObject.jwtResponse.token);
        sessionStorage.setItem('division', response.responseObject.jwtResponse.division);
        sessionStorage.setItem('role', response.responseObject.jwtResponse.role);

        console.log("log In Responce === ", this.logInValues);
        console.log("log In Responce === ", response.username);
        console.log("log In Responce === ", response.token);

        console.log(sessionStorage.getItem('username'));
        console.log(sessionStorage.getItem('token'));
        let username = sessionStorage.getItem('username');
        let division = sessionStorage.getItem('division');
        console.log(username, 'username');

        if (division != 'Head_office') {
          this.router.navigate(["/famodule/home/budget"]);
        }
        else {
          this.router.navigate(["/famodule/home/budget-list"]);
        }

      },
      (error) => {
        console.log(error);

      });
  }

}
