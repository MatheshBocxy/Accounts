import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnDestroy, OnInit {


  userDivision: any;
  division: any;
  mobileQuery: MediaQueryList;
  isCorrectLogin: boolean
  loginRole: any;

  private _mobileQueryListener: () => void;
  role: string;
  forNow: boolean = false;
  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.userDivision = sessionStorage.getItem('division');
    this.role = sessionStorage.getItem('username');
    console.log(this.userDivision);

    this.loginRole = sessionStorage.getItem('role');

    if (this.loginRole == "AO" || this.loginRole == "DCAO" || this.loginRole == "FA" || this.loginRole == "MD") {
      this.isCorrectLogin = true
    }

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  isReceiptLogin(): boolean {
    const login = ['DA_Division', 'EE_Division', 'DA', 'DCAO', 'AO', 'FA']
    return login.includes(this.loginRole);
  }

}
