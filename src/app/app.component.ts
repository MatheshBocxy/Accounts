import { Component, HostListener } from '@angular/core';
import { AthuServiceService } from './athuService/athu-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private authService: AthuServiceService) {

  }
  title = 'financeAccount';

  // @HostListener('window:beforeunload', ['$event'])
  // handleBeforeUnload(event: Event) {
  //   const confirmationMessage = 'You are about to leave without logging out. Are you sure?';
  //   (event as BeforeUnloadEvent).returnValue = confirmationMessage;
  //   return confirmationMessage;
  // }

  // @HostListener('window:unload', ['$event'])
  // clearTokenOnUnload(event: Event) {
  //   this.authService.logout();
  // }
}
