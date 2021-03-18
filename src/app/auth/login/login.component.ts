import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  hasError: boolean;

  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

  get email() { return this.loginForm.controls['email']; }

  get password() { return this.loginForm.controls['password']; }

  onSubmit() {
    this.isLoading = true;
    this.hasError = false;
    const email = this.loginForm.controls.email.value;
    const pass = this.loginForm.controls.password.value;
    this.authService.login(email, pass)
      .subscribe(() => {
        if (this.authService.currentUserValue) {
          this.router.navigate(['/my-tasks'], {relativeTo:this.route});
        } else {
          this.hasError = true;
        }
        this.isLoading = false;
      });
  }
}
