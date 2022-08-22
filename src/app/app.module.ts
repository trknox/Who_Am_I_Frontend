import { HintService } from './service/hint.service';
import { HttpClient, HttpClientModule, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { routing } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './service/auth.service';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { HintsComponent } from './home/hints/hints.component';
import { GuessComponent } from './home/guess/guess.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    routing,
    NotFoundComponent,
    SignUpComponent,
    HomeComponent,
    HeaderComponent,
    HintsComponent,
    GuessComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [HttpClient, AuthService, HintService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
