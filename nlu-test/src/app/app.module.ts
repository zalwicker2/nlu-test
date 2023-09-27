import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DropdownBtnComponent } from './components/navbar/dropdown-btn/dropdown-btn.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { FlavorsComponent } from './pages/flavors/flavors.component';
import { FlavorDetailComponent } from './pages/flavor-detail/flavor-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    FooterComponent,
    QuoteFormComponent,
    HomepageComponent,
    DropdownBtnComponent,
    FlavorsComponent,
    FlavorDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
