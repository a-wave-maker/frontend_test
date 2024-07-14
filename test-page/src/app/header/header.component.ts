import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameService } from '../name.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  nameVisible = false;

  constructor(private nameService: NameService) {}

  ngOnInit(): void {
    this.nameService.nameVisibilityChange.subscribe(() => {
      this.toggleNameVisibility();
    });
  }

  toggleNameVisibility(): void {
    this.nameVisible = !this.nameVisible;
  }
}
