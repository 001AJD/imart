import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartTotalItem();
  }

  googleLogin(): void {
    this.authService.googleSignIn();
  }
  logout(): void {
    this.authService.logout();
  }
}
