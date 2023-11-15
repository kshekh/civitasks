import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, string | number | bigint, string | number | bigint>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Numeric = ColumnType<string, string | number, string | number>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface HackathonRegistrations {
  id: Generated<number>;
  hackathon_id: number;
  user_id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  country: string | null;
  city: string | null;
  languages: Json | null;
  about: string | null;
  current_position: string | null;
  telegram_handle: string | null;
  discord_handle: string | null;
  twitter_handle: string | null;
  github_handle: string | null;
  interested_tracks: Json | null;
  your_roles: Json | null;
  your_skills: Json | null;
  roles_looking_for: Json | null;
  looking_to_build: string | null;
  has_team: boolean | null;
  looking_for_collab: boolean | null;
  is_university_student: boolean | null;
  referral_code: string | null;
  agreed_to_terms: boolean | null;
  created_at: Generated<Timestamp>;
}

export interface Hackathons {
  id: Generated<number>;
  name: string;
  description: string;
  start_date: Timestamp;
  end_date: Timestamp;
  created_at: Generated<Timestamp>;
}

export interface HackathonsTracks {
  id: Generated<number>;
  hackathon_id: number;
  track_id: number;
  created_at: Generated<Timestamp>;
}

export interface HyperdriveProjects {
  id: Generated<number>;
  hackathon_id: number;
  user_id: number;
  name: string;
  description: string;
  tracks: Json;
  repo_link: string;
  country: string;
  team_details: string;
  presentation_link: string;
  twitter_handle: string | null;
  looking_to_raise: boolean;
  solana_developer_experience: Numeric;
  how_did_you_hear: Json;
  other_sources: Json | null;
  attended_workshop: boolean;
  additional_info: string | null;
  referral_code: string | null;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  is_junk: Generated<boolean>;
  is_reviewed: Generated<boolean>;
}

export interface ProjectImages {
  id: Generated<number>;
  project_id: number | null;
  url: string;
  state: string;
  size: number;
  original_name: string;
  mimetype: string;
  hash: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface RegistrationsSources {
  id: Generated<number>;
  registration_id: number;
  source_id: number;
  is_initial_source: Generated<boolean>;
  other: string | null;
  created_at: Generated<Timestamp>;
}

export interface Roles {
  id: Generated<number>;
  name: string;
  created_at: Generated<Timestamp>;
}

export interface Skills {
  id: Generated<number>;
  name: string;
  created_at: Generated<Timestamp>;
}

export interface Sources {
  id: Generated<number>;
  name: string;
  created_at: Generated<Timestamp>;
}

export interface StAllAuthRecipeUsers {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  user_id: string;
  recipe_id: string;
  time_joined: Int8;
}

export interface StAppIdToUserId {
  app_id: Generated<string>;
  user_id: string;
  recipe_id: string;
}

export interface StApps {
  app_id: Generated<string>;
  created_at_time: Int8 | null;
}

export interface StDashboardUsers {
  app_id: Generated<string>;
  user_id: string;
  email: string;
  password_hash: string;
  time_joined: Int8;
}

export interface StDashboardUserSessions {
  app_id: Generated<string>;
  session_id: string;
  user_id: string;
  time_created: Int8;
  expiry: Int8;
}

export interface StEmailpasswordPswdResetTokens {
  app_id: Generated<string>;
  user_id: string;
  token: string;
  token_expiry: Int8;
}

export interface StEmailpasswordUsers {
  app_id: Generated<string>;
  user_id: string;
  email: string;
  password_hash: string;
  time_joined: Int8;
}

export interface StEmailpasswordUserToTenant {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  user_id: string;
  email: string;
}

export interface StEmailverificationTokens {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  user_id: string;
  email: string;
  token: string;
  token_expiry: Int8;
}

export interface StEmailverificationVerifiedEmails {
  app_id: Generated<string>;
  user_id: string;
  email: string;
}

export interface StJwtSigningKeys {
  app_id: Generated<string>;
  key_id: string;
  key_string: string;
  algorithm: string;
  created_at: Int8 | null;
}

export interface StKeyValue {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  name: string;
  value: string | null;
  created_at_time: Int8 | null;
}

export interface StPasswordlessCodes {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  code_id: string;
  device_id_hash: string;
  link_code_hash: string;
  created_at: Int8;
}

export interface StPasswordlessDevices {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  device_id_hash: string;
  email: string | null;
  phone_number: string | null;
  link_code_salt: string;
  failed_attempts: number;
}

export interface StPasswordlessUsers {
  app_id: Generated<string>;
  user_id: string;
  email: string | null;
  phone_number: string | null;
  time_joined: Int8;
}

export interface StPasswordlessUserToTenant {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  user_id: string;
  email: string | null;
  phone_number: string | null;
}

export interface StRolePermissions {
  app_id: Generated<string>;
  role: string;
  permission: string;
}

export interface StRoles {
  app_id: Generated<string>;
  role: string;
}

export interface StSessionAccessTokenSigningKeys {
  app_id: Generated<string>;
  created_at_time: Int8;
  value: string | null;
}

export interface StSessionInfo {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  session_handle: string;
  user_id: string;
  refresh_token_hash_2: string;
  session_data: string | null;
  expires_at: Int8;
  created_at_time: Int8;
  jwt_user_payload: string | null;
  use_static_key: boolean;
}

export interface StTenantConfigs {
  connection_uri_domain: Generated<string>;
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  core_config: string | null;
  email_password_enabled: boolean | null;
  passwordless_enabled: boolean | null;
  third_party_enabled: boolean | null;
}

export interface StTenants {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  created_at_time: Int8 | null;
}

export interface StTenantThirdpartyProviderClients {
  connection_uri_domain: Generated<string>;
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  third_party_id: string;
  client_type: Generated<string>;
  client_id: string;
  client_secret: string | null;
  scope: string[] | null;
  force_pkce: boolean | null;
  additional_config: string | null;
}

export interface StTenantThirdpartyProviders {
  connection_uri_domain: Generated<string>;
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  third_party_id: string;
  name: string | null;
  authorization_endpoint: string | null;
  authorization_endpoint_query_params: string | null;
  token_endpoint: string | null;
  token_endpoint_body_params: string | null;
  user_info_endpoint: string | null;
  user_info_endpoint_query_params: string | null;
  user_info_endpoint_headers: string | null;
  jwks_uri: string | null;
  oidc_discovery_endpoint: string | null;
  require_email: boolean | null;
  user_info_map_from_id_token_payload_user_id: string | null;
  user_info_map_from_id_token_payload_email: string | null;
  user_info_map_from_id_token_payload_email_verified: string | null;
  user_info_map_from_user_info_endpoint_user_id: string | null;
  user_info_map_from_user_info_endpoint_email: string | null;
  user_info_map_from_user_info_endpoint_email_verified: string | null;
}

export interface StThirdpartyUsers {
  app_id: Generated<string>;
  third_party_id: string;
  third_party_user_id: string;
  user_id: string;
  email: string;
  time_joined: Int8;
}

export interface StThirdpartyUserToTenant {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  user_id: string;
  third_party_id: string;
  third_party_user_id: string;
}

export interface StTotpUsedCodes {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  user_id: string;
  code: string;
  is_valid: boolean;
  expiry_time_ms: Int8;
  created_time_ms: Int8;
}

export interface StTotpUserDevices {
  app_id: Generated<string>;
  user_id: string;
  device_name: string;
  secret_key: string;
  period: number;
  skew: number;
  verified: boolean;
}

export interface StTotpUsers {
  app_id: Generated<string>;
  user_id: string;
}

export interface StUseridMapping {
  app_id: Generated<string>;
  supertokens_user_id: string;
  external_user_id: string;
  external_user_id_info: string | null;
}

export interface StUserLastActive {
  app_id: Generated<string>;
  user_id: string;
  last_active_time: Int8 | null;
}

export interface StUserMetadata {
  app_id: Generated<string>;
  user_id: string;
  user_metadata: string;
}

export interface StUserRoles {
  app_id: Generated<string>;
  tenant_id: Generated<string>;
  user_id: string;
  role: string;
}

export interface Tracks {
  id: Generated<number>;
  name: string;
  created_at: Generated<Timestamp>;
}

export interface Users {
  id: Generated<number>;
  auth_id: string;
  url_slug: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  country: string | null;
  city: string | null;
  languages: Json | null;
  telegram_handle: string | null;
  discord_handle: string | null;
  twitter_handle: string | null;
  github_handle: string | null;
  about: string | null;
  current_position: string | null;
  is_university_student: boolean | null;
  looking_for_collab: Generated<boolean>;
  looking_to_build: string | null;
  onboarding_complete: Generated<boolean>;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface UsersInterestedTracks {
  id: Generated<number>;
  user_id: number;
  track_id: number;
  track_name: string;
  created_at: Generated<Timestamp>;
}

export interface UsersLookingForRoles {
  id: Generated<number>;
  user_id: number;
  role_id: number;
  role_name: string;
  created_at: Generated<Timestamp>;
}

export interface UsersRoles {
  id: Generated<number>;
  user_id: number;
  role_id: number;
  role_name: string;
  created_at: Generated<Timestamp>;
}

export interface UsersSkills {
  id: Generated<number>;
  user_id: number;
  skill_id: number;
  skill_name: string;
  created_at: Generated<Timestamp>;
}

export interface DB {
  hackathon_registrations: HackathonRegistrations;
  hackathons: Hackathons;
  hackathons_tracks: HackathonsTracks;
  hyperdrive_projects: HyperdriveProjects;
  project_images: ProjectImages;
  registrations_sources: RegistrationsSources;
  roles: Roles;
  skills: Skills;
  sources: Sources;
  st_all_auth_recipe_users: StAllAuthRecipeUsers;
  st_app_id_to_user_id: StAppIdToUserId;
  st_apps: StApps;
  st_dashboard_user_sessions: StDashboardUserSessions;
  st_dashboard_users: StDashboardUsers;
  st_emailpassword_pswd_reset_tokens: StEmailpasswordPswdResetTokens;
  st_emailpassword_user_to_tenant: StEmailpasswordUserToTenant;
  st_emailpassword_users: StEmailpasswordUsers;
  st_emailverification_tokens: StEmailverificationTokens;
  st_emailverification_verified_emails: StEmailverificationVerifiedEmails;
  st_jwt_signing_keys: StJwtSigningKeys;
  st_key_value: StKeyValue;
  st_passwordless_codes: StPasswordlessCodes;
  st_passwordless_devices: StPasswordlessDevices;
  st_passwordless_user_to_tenant: StPasswordlessUserToTenant;
  st_passwordless_users: StPasswordlessUsers;
  st_role_permissions: StRolePermissions;
  st_roles: StRoles;
  st_session_access_token_signing_keys: StSessionAccessTokenSigningKeys;
  st_session_info: StSessionInfo;
  st_tenant_configs: StTenantConfigs;
  st_tenant_thirdparty_provider_clients: StTenantThirdpartyProviderClients;
  st_tenant_thirdparty_providers: StTenantThirdpartyProviders;
  st_tenants: StTenants;
  st_thirdparty_user_to_tenant: StThirdpartyUserToTenant;
  st_thirdparty_users: StThirdpartyUsers;
  st_totp_used_codes: StTotpUsedCodes;
  st_totp_user_devices: StTotpUserDevices;
  st_totp_users: StTotpUsers;
  st_user_last_active: StUserLastActive;
  st_user_metadata: StUserMetadata;
  st_user_roles: StUserRoles;
  st_userid_mapping: StUseridMapping;
  tracks: Tracks;
  users: Users;
  users_interested_tracks: UsersInterestedTracks;
  users_looking_for_roles: UsersLookingForRoles;
  users_roles: UsersRoles;
  users_skills: UsersSkills;
}
