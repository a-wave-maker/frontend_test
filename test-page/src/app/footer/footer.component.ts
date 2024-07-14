import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameService } from '../name.service';
import { ContentService } from '../content.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  frameVisible = false;
  buttonActive = false;

  constructor(private nameService: NameService, private contentService: ContentService) {}

  resetPage(): void {
    this.contentService.resetStorage();
    window.location.reload();
  }

  appendName(): void {
    this.nameService.toggleNameVisibility();
  }

  toggleButton(): void {
    this.buttonActive = !this.buttonActive;
    this.frameVisible = !this.frameVisible;
  }
}
