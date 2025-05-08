import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

export const canActivateAuthRole: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree> => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  const isLoggedIn = await keycloak.isLoggedIn();
  const userRoles = keycloak.getUserRoles(); // Get roles from token
  const requiredRole = route.data['role'];

  console.log('👤 Authenticated:', isLoggedIn);
  console.log('🎭 Required Role:', requiredRole);
  console.log('📜 Roles:', userRoles);

  if (isLoggedIn && userRoles.includes(requiredRole)) {
    return true;
  }

  return router.parseUrl('/forbidden');
};
