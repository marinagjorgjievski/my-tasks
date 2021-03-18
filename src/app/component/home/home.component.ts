import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private currentUserSub: Subscription;
  signedInUser: UserModel;
  
  constructor(private router: Router,private authService: AuthService) { 
    this.signedInUser = this.authService.currentUserValue;
    this.currentUserSub = this.authService.currentUser$.subscribe((user) => {
      this.signedInUser = user;
    });
    if (this.signedInUser) {
      this.router.navigate(['/my-tasks']);
    }
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }
}
