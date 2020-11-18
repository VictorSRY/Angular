import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AppBlogComponent } from './app-blog/app-blog.component';
import { AppSignInComponent } from './app-sign-in/app-sign-in.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { SideNavComponent } from './home/side-nav/side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    AppSignInComponent,
    ProfileComponent,
    AppBlogComponent,
    HomeComponent,
    HeaderComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
