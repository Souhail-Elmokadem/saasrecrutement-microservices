import { KeycloakOnLoad } from 'keycloak-js';
import { environment } from '../environments/environment';

export const keycloakConfig = {
  config: {
    url: environment.keycloak.url,
    realm: environment.keycloak.realm,
    clientId: environment.keycloak.clientId
  },
  initOptions: {
    onLoad: 'check-sso' as KeycloakOnLoad, 
    
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  }
};
