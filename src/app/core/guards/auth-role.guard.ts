import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number;
  realm_access?: {
    roles: string[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('access_token');
    const expectedRoles: string[] = route.data['roles'] || [];

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);

      // 🔒 Token expiration check
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        console.warn('❌ Token expired');
        this.router.navigate(['/login']);
        return false;
      }

      // ✅ Extract role(s) from realm_access
      const userRoles = decoded.realm_access?.roles || [];

      const hasAccess = expectedRoles.some(role => userRoles.includes(role));

      if (!hasAccess) {
        this.router.navigate(['/unauthorized']);
        return false;
      }

      return true;
    } catch (e) {
      console.error('❌ Invalid JWT:', e);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
