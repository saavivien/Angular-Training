import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated$!:Observable<boolean>;
  constructor(
    private router: Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  openNewSnap():void{
    this.router.navigateByUrl('facesnaps/new')
  }
  logout():void{
    this.authService.logout();
    this.router.navigateByUrl('/auth/login')
  }

}
