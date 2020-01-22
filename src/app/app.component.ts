import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './modules/loader/loader/loader.service';
import { LoaderType } from './modules/loader/loader/loader.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'ngx-loader';
  public url = 'https://www.mocky.io/v2/5ab2663b2e00003d044cc144';
  public mode: LoaderType;
  public loaderType = LoaderType;
  public response   = [];
  constructor(private http: HttpClient, public loaderService: LoaderService) {
    this.mode = this.loaderService.ISAUTOMODE ? LoaderType.AUTO : LoaderType.MANUAL;
  }

  public load() {
    this.response = [];
    this.http.get(`${this.url}?mocky-delay=1000ms`)
      .subscribe(data => {
        this.response.push('call 1');
      });
    this.http.get(`${this.url}?mocky-delay=2000ms`)
      .subscribe(data => {
        this.response.push('call 2');
      });
    this.http.get(`${this.url}?mocky-delay=3000ms`)
      .subscribe(data => {
        this.response.push('call 3');
      });
    this.http.get(`${this.url}?mocky-delay=5000ms`)
      .subscribe(data => {
        this.response.push('call 4');
      });
  }

  public toggleMode() {
    this.mode = (this.mode === LoaderType.MANUAL) ? LoaderType.AUTO : LoaderType.MANUAL;
    this.loaderService.setloaderType(this.mode);
  }

  public showLoader(visibility: boolean) {
    visibility ? this.loaderService.show() : this.loaderService.hide();
  }
}
