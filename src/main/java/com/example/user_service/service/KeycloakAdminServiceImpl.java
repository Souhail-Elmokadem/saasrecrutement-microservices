package com.example.user_service.service;

import com.example.user_service.dtos.RegisterDto;
import jakarta.ws.rs.core.Response;
import org.keycloak.OAuth2Constants;
import org.springframework.beans.factory.annotation.Value;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.UserRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class KeycloakAdminServiceImpl implements KeycloakAdminService {

    @Value("${keycloak.auth-server-url}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak-admin.username}")
    private String adminUsername;

    @Value("${keycloak-admin.password}")
    private String adminPassword;

    @Value("${keycloak.credentials.secret}") // clientSecret
    private String clientSecret;

    private final RestTemplate restTemplate = new RestTemplate();


    @Override
    public String getToken(String username, String password) {
        String tokenUrl = keycloakServerUrl + "/realms/" + realm + "/protocol/openid-connect/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "password");
        formData.add("client_id", "auth-service");
        formData.add("client_secret", clientSecret);
        formData.add("username", username);
        formData.add("password", password);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(formData, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, entity, Map.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return (String) response.getBody().get("access_token");
            } else {
                throw new RuntimeException("Login failed");
            }
        } catch (Exception ex) {
            throw new RuntimeException("Keycloak login failed", ex);
        }
    }

    @Override
    public String createUser(RegisterDto dto) {
        Keycloak keycloak = getKeycloakAdminClient();

        UserRepresentation user = new UserRepresentation();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEnabled(true);



        // Create user

        try
        {
            Response response = keycloak.realm(realm).users().create(user);
            if (response.getStatus() != 201) {
                throw new RuntimeException("Keycloak user creation failed: " + response.getStatus());
            }

            String userId = extractUserIdFromResponse(response);
            resetPassword(userId, dto.getPassword());
            assignRole(userId, dto.getRole());
            return userId;

        }catch (Exception e){
            throw new RuntimeException("Keycloak user already created: " + e.getMessage());

        }

    }

    @Override
    public void deleteUser(String userId) {
        getKeycloakAdminClient().realm(realm).users().delete(userId);
    }

    @Override
    public void assignRole(String userId, String role) {
        Keycloak keycloak = getKeycloakAdminClient();
        RoleRepresentation roleRep = keycloak.realm(realm).roles().get(role).toRepresentation();
        keycloak.realm(realm).users().get(userId).roles().realmLevel().add(List.of(roleRep));
    }

    @Override
    public void resetPassword(String userId, String newPassword) {
        CredentialRepresentation cred = new CredentialRepresentation();
        cred.setTemporary(false);
        cred.setType(CredentialRepresentation.PASSWORD);
        cred.setValue(newPassword);

        getKeycloakAdminClient().realm(realm).users().get(userId).resetPassword(cred);
    }

    private String extractUserIdFromResponse(Response response) {
        String location = response.getLocation().toString();
        return location.substring(location.lastIndexOf("/") + 1);
    }

    private Keycloak getKeycloakAdminClient() {
        return KeycloakBuilder.builder()
                .serverUrl(keycloakServerUrl)
                .realm(realm) // login realm
                .username(adminUsername)
                .password(adminPassword)
                .clientId("auth-service")
                .grantType(OAuth2Constants.PASSWORD)
                .clientSecret("rWzD2BWeXqBmDZokUj6eFsN0O0BETneN")
                .build();
    }
}
