import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { UserModel } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading: boolean;

  registerForm = this.fb.group({
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

  get email() { return this.registerForm.controls['email']; }

  get password() { return this.registerForm.controls['password']; }

  onSubmit() {
    this.isLoading = true;
    const email = this.registerForm.controls.email.value;
    const pass = this.registerForm.controls.password.value;
    this.authService.register(email, pass)
      .subscribe(() => {
        if (this.authService.currentUserValue) {
          this.isLoading = false;
          this.router.navigate(['/my-tasks'], {relativeTo:this.route});
        }
      });
  }
}
