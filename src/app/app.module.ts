import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { LoginComponent } from './loginPage/login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#00ACC1',
  fgsColor: '#00ACC1',
  pbColor: '#00ACC1',
  bgsPosition: 'bottom-right',
  bgsSize: 40,
  bgsType: 'ball-spin-clockwise', // background spinner type
  fgsType: 'rectangle-bounce', // foreground spinner type
  pbDirection: 'ltr', // progress bar direction
  pbThickness: 5 // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatSidenavModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    MatInputModule,

    MatFormFieldModule,
    MatChipsModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot()
  ],
  providers: [
    provideAnimationsAsync(),
    MatSnackBar,
    DatePipe,
    DecimalPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
