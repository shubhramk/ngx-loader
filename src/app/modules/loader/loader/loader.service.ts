import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoaderType } from './loader.enum';

@Injectable()
export class LoaderService {

    private loaderType = new BehaviorSubject<LoaderType>(LoaderType.AUTO);
    private isLoading = new BehaviorSubject(false);
    constructor() { }

    /**
     * Show Loader
     */
    public show() {
        this.isLoading.next(true);
    }
    /**
     * Hide Loader
     */
    public hide() {
        this.isLoading.next(false);
    }

    /**
     * Check Loader is manual mode
     * @returns- {boolean}
     *
     */
    public get ISMANUALMODE(): boolean {
        let isManual = false;
        const type = this.loaderType.getValue();
        isManual = (type === LoaderType.MANUAL) ? true : false;
        return isManual;
    }

    /**
     * Check Loader is Auto mode
     * @returns- {boolean}
     *
     */
    public get ISAUTOMODE(): boolean {
        let isAuto = false;
        const type = this.loaderType.getValue();
        isAuto = (type === LoaderType.AUTO) ? true : false;
        return isAuto;
    }

    /**
     * Get Loading status
     * @returns- Obervable{boolean}
     *
     */
    public get ISLOADING(): Observable<boolean> {
        return this.isLoading;
    }

    /**
     * Set Loader Type i.e Manual / Auto
     *
     */
    public setloaderType(type: LoaderType) {
        this.loaderType.next(type);
    }
}
