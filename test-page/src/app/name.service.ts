import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  nameVisibilityChange: EventEmitter<boolean> = new EventEmitter();

  toggleNameVisibility() {
    this.nameVisibilityChange.emit(true);
  }
}