import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserInfoService } from '../services/user-info.service';
import { TABLE_DATA } from '../constants/table-data.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loginOutProcess = false;
  userInfo = null;
  isLoading: boolean;
  tableData: { name: string; rank: string; points: number; goalScored: number; }[];
  constructor(private router: Router,
    private authService: AuthenticationService,
    private userService: UserInfoService) {
    this.tableData = TABLE_DATA
  }

  ngOnInit() {
    this.isLoading = true;
    this.userService.fetchUserDetails().subscribe(
      res => {
        this.userInfo = res['user'];
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.authService.deleteToken();
        this.router.navigate(['/']);
      }
    );
  }
  logoutClicked() {
    this.loginOutProcess = true;
    this.authService.deleteToken();
    this.router.navigate(['/']);
  }
}
