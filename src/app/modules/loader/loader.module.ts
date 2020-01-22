import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './loader/loader.interceptor';



@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
})
export class LoaderModule {
  public static forRoot() {
    return {
      ngModule: LoaderModule
    };
  }
  public static forChild() {
    return {
      ngModule: LoaderModule
    };
  }
 }
