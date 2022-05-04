import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule} from "@angular/router";
import { AlignFormComponent } from './components/align-form/align-form.component';
import { MappingFormComponent } from './components/mapping-form/mapping-form.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from "@angular/material/button";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { HomePageComponent } from './components/home-page/home-page.component';
import { DnaAnimationComponent } from './components/dna-animation/dna-animation.component';


const appRoutes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'align', component: AlignFormComponent },
  { path: 'mapping', component: MappingFormComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlignFormComponent,
    MappingFormComponent,
    HomePageComponent,
    DnaAnimationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    AngularFileUploaderModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
