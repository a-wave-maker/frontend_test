import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {
  selectedOption: string | null = null;
  contentTexts: string[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentTexts = [this.contentService.getInitialContent()];
  }

  updateContent(action: string): void {
    let newText;
    if (this.selectedOption === 'first') {
      newText = this.contentService.getText(0, action === 'replace');
    } else if (this.selectedOption === 'second') {
      newText = this.contentService.getText(1, action === 'replace');
    } else if (this.selectedOption === 'random') {
      newText = this.contentService.getRandomText(this.contentTexts, action === 'replace');
    } else {
      return;
    }

    if (action === 'replace') {
      this.contentTexts = [newText];
    } else {
      if (this.contentTexts.length === 0) {
        this.contentTexts = [newText];
      } else {
        this.contentTexts.push(newText);
        this.contentTexts = [...new Set(this.contentTexts)].sort();
      }
    }
  }
}
