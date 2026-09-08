import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsButton } from '../../ui/notifications-button/notifications-button';
import { UserMenu } from '../../ui/user-menu/user-menu';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    NotificationsButton,
    UserMenu
  ],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
})
export class AppLayout {}
