import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private unusedTexts: string[] = [];
  private usedTexts: string[] = [];

  constructor(private http: HttpClient) {
    this.loadTexts();
  }

  resetStorage(): void {
    this.unusedTexts = [];
    this.usedTexts = [];
    localStorage.removeItem('unusedTexts');
    localStorage.removeItem('usedTexts');
    this.loadTexts();
  }

  private loadTexts(): void {
    const storedUnusedTexts = localStorage.getItem('unusedTexts');
    const storedUsedTexts = localStorage.getItem('usedTexts');
    if (storedUnusedTexts) {
      this.unusedTexts = JSON.parse(storedUnusedTexts);
    } else {
      this.http.get<{ texts: string[] }>('/assets/texts.json')
        .pipe(
          tap(response => {
            this.unusedTexts = response.texts;
            console.log(response.texts);
            localStorage.setItem('unusedTexts', JSON.stringify(this.unusedTexts));
          })
        )
        .subscribe();
    }
    if (storedUsedTexts) {
      this.usedTexts = JSON.parse(storedUsedTexts);
    }
  }

  getInitialContent(): string {
    const storedUsedTexts = localStorage.getItem('usedTexts');
    if (storedUsedTexts) {
      return JSON.parse(storedUsedTexts).join(' ');
    } else {
      return '';
    }
  }

  resetData(): void {
    this.unusedTexts.push(...this.usedTexts);
    this.usedTexts = [];
    localStorage.setItem('unusedTexts', JSON.stringify(this.unusedTexts));
    localStorage.setItem('usedTexts', JSON.stringify(this.usedTexts));
  }

  getText(index: number, replace: boolean): string {
    if (replace) {
      this.resetData();
    }
    if (this.unusedTexts.length === 0) {
      alert("No more unique texts available.");
      return "";
    }
    else if (this.unusedTexts.length === 1) {
      const selectedText = this.unusedTexts[0];
      this.unusedTexts = [];
      this.usedTexts.push(selectedText);

      localStorage.setItem('unusedTexts', JSON.stringify(this.unusedTexts));
    localStorage.setItem('usedTexts', JSON.stringify(this.usedTexts));

      return selectedText;
    }
    const selectedText = this.unusedTexts[index];
    this.unusedTexts = this.unusedTexts.filter(text => text !== selectedText);
    this.usedTexts.push(selectedText);

    console.log(this.unusedTexts);
    console.log(index);
    console.log(selectedText);

    localStorage.setItem('unusedTexts', JSON.stringify(this.unusedTexts));
    localStorage.setItem('usedTexts', JSON.stringify(this.usedTexts));

    return selectedText;
  }

  getRandomText(currentTexts: string[], replace: boolean): string {
    if (this.unusedTexts.length === 0 && !replace) {
      alert("No more unique texts available.");
      return "";
    }
    if (replace) {
      this.resetData();
    }
    
    const randomIndex = Math.floor(Math.random() * this.unusedTexts.length);

    const selectedText = this.unusedTexts[randomIndex];

    console.log(this.unusedTexts);
    console.log(randomIndex);
    console.log(selectedText);

    this.unusedTexts = this.unusedTexts.filter(text => text !== selectedText);
    this.usedTexts.push(selectedText);

    localStorage.setItem('unusedTexts', JSON.stringify(this.unusedTexts));
    localStorage.setItem('usedTexts', JSON.stringify(this.usedTexts));

    return selectedText;
  }
}