import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    AddUserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
