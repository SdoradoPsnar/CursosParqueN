import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMenu = false;
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const isAuthenticated = await this.authService.isLoggedIn();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const isLoginRoute = this.router.url === '/login';
        this.showMenu = isAuthenticated && !isLoginRoute;
      }
    });

    this.menuItems = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: ['/home'] },
      { label: 'Usuarios', icon: 'pi pi-users', routerLink: ['/user/list'] },
      { label: 'Categorias de cursos', icon: 'pi pi-tags', routerLink: ['/categories/list'] },
      { label: 'Configuración', icon: 'pi pi-cog', routerLink: ['/settings'] },
      { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
