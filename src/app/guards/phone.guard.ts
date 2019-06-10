import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { PhonesService } from '../services/phones.service';

@Injectable({
  providedIn: 'root'
})
export class PhoneGuard implements CanLoad  {

  constructor( private phonesService: PhonesService ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.phonesService.validaPhone();
  }
}
