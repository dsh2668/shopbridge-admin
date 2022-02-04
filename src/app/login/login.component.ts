import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  formLogin = new FormGroup({
    userPin: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  ngAfterViewInit(): void {
      document.getElementById('pin').focus();
  }

  onLogin(): void {
    if (this.formLogin.valid) {
      sessionStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/admin']);
    }
  }

}
