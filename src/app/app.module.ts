import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIModule } from 'ng-block-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { ItemsComponent } from './admin/items/items.component';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { EditItemComponent } from './admin/edit-item/edit-item.component';
import { AppConfig } from './app-config';
import { SearchValuePipe } from './shared/pipes/search-value.pipe';
import { SortListPipe } from './shared/pipes/sort-list.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogComponent } from './shared/ui-components/confirm-dialog/confirm-dialog.component';

export function initializeApp(appConfig: AppConfig): any {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ErrorComponent,
    ItemsComponent,
    AddItemComponent,
    EditItemComponent,
    SearchValuePipe,
    SortListPipe,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatIconModule,
    BlockUIHttpModule.forRoot(),
    BlockUIModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
