import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-notifications-button',
  imports: [],
  templateUrl: './notifications-button.html',
  styleUrl: './notifications-button.css',
})
export class NotificationsButton {
  readonly isOpen = signal(false);

  togglePanel() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
