import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowPersonComponent } from './show-person/show-person.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LandingpageComponent,
    AddProfileComponent,
    ShowProfileComponent,
    ShowPersonComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
