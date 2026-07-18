// Generated from bunny.net Core API OpenAPI. Do not edit by hand.
// Source: https://core-api-public-docs.b-cdn.net/docs/v3/public.json
import type { Operation, RequestBodySchema } from '../types'

const REQUEST_EXAMPLES: Record<string, string> = {
  "post /dnszone": "{\n  \"Domain\": \"example.com\",\n  \"Records\": []\n}",
  "post /dnszone/{}": "{\n  \"CustomNameserversEnabled\": false,\n  \"Nameserver1\": \"string\",\n  \"Nameserver2\": \"string\",\n  \"SoaEmail\": \"admin@example.com\",\n  \"LoggingEnabled\": false,\n  \"LogAnonymizationType\": 0,\n  \"CertificateKeyType\": 0,\n  \"LoggingIPAnonymizationEnabled\": false\n}",
  "post /dnszone/checkavailability": "{\n  \"Name\": \"example\"\n}",
  "put /dnszone/{}/records": "{\n  \"Type\": 0,\n  \"Ttl\": 0,\n  \"Value\": \"string\",\n  \"Name\": \"example\",\n  \"Weight\": 0,\n  \"Priority\": 0,\n  \"Flags\": 0,\n  \"Tag\": \"string\",\n  \"Port\": 0,\n  \"PullZoneId\": 0,\n  \"ScriptId\": 0,\n  \"Accelerated\": false,\n  \"MonitorType\": 0,\n  \"GeolocationLatitude\": 0,\n  \"GeolocationLongitude\": 0,\n  \"LatencyZone\": \"string\",\n  \"SmartRoutingType\": 0,\n  \"Disabled\": false,\n  \"EnviromentalVariables\": [],\n  \"Comment\": \"string\",\n  \"AutoSslIssuance\": false\n}",
  "post /dnszone/{}/records/{}": "{\n  \"Type\": 0,\n  \"Ttl\": 0,\n  \"Value\": \"string\",\n  \"Name\": \"example\",\n  \"Weight\": 0,\n  \"Priority\": 0,\n  \"Flags\": 0,\n  \"Tag\": \"string\",\n  \"Port\": 0,\n  \"PullZoneId\": 0,\n  \"ScriptId\": 0,\n  \"Accelerated\": false,\n  \"MonitorType\": 0,\n  \"GeolocationLatitude\": 0,\n  \"GeolocationLongitude\": 0,\n  \"LatencyZone\": \"string\",\n  \"SmartRoutingType\": 0,\n  \"Disabled\": false,\n  \"EnviromentalVariables\": [],\n  \"Comment\": \"string\",\n  \"AutoSslIssuance\": false,\n  \"Id\": 0\n}",
  "post /dnszone/{}/certificate/issue": "{\n  \"Domain\": \"example.com\"\n}",
  "post /pullzone": "{\n  \"OriginUrl\": \"https://example.com\",\n  \"AllowedReferrers\": [],\n  \"BlockedReferrers\": [],\n  \"BlockNoneReferrer\": false,\n  \"BlockedIps\": [],\n  \"EnableGeoZoneUS\": false,\n  \"EnableGeoZoneEU\": false,\n  \"EnableGeoZoneASIA\": false,\n  \"EnableGeoZoneSA\": false,\n  \"EnableGeoZoneAF\": false,\n  \"IpFamilyPolicy\": 0,\n  \"BlockRootPathAccess\": false,\n  \"BlockPostRequests\": false,\n  \"EnableQueryStringOrdering\": false,\n  \"EnableWebpVary\": false,\n  \"EnableAvifVary\": false,\n  \"EnableMobileVary\": false,\n  \"EnableCountryCodeVary\": false,\n  \"EnableCountryStateCodeVary\": false,\n  \"EnableHostnameVary\": false,\n  \"EnableCacheSlice\": false,\n  \"ZoneSecurityEnabled\": false,\n  \"ZoneSecurityIncludeHashRemoteIP\": false,\n  \"IgnoreQueryStrings\": false,\n  \"MonthlyBandwidthLimit\": 0,\n  \"AccessControlOriginHeaderExtensions\": [],\n  \"EnableAccessControlOriginHeader\": false,\n  \"DisableCookies\": false,\n  \"BudgetRedirectedCountries\": [],\n  \"BlockedCountries\": [],\n  \"CacheControlMaxAgeOverride\": 0,\n  \"CacheControlPublicMaxAgeOverride\": 0,\n  \"CacheControlBrowserMaxAgeOverride\": 0,\n  \"AddHostHeader\": false,\n  \"AddCanonicalHeader\": false,\n  \"EnableLogging\": false,\n  \"LoggingIPAnonymizationEnabled\": false,\n  \"PermaCacheStorageZoneId\": 0,\n  \"PermaCacheType\": 0,\n  \"AWSSigningEnabled\": false,\n  \"AWSSigningKey\": \"replace-me\",\n  \"AWSSigningRegionName\": \"string\",\n  \"AWSSigningSecret\": \"string\",\n  \"EnableOriginShield\": false,\n  \"OriginShieldZoneCode\": \"string\",\n  \"EnableTLS1\": false,\n  \"EnableTLS1_1\": false,\n  \"CacheErrorResponses\": false,\n  \"VerifyOriginSSL\": false,\n  \"LogForwardingEnabled\": false,\n  \"LogForwardingHostname\": \"cdn.example.com\",\n  \"LogForwardingPort\": 0,\n  \"LogForwardingToken\": \"replace-me\",\n  \"LogForwardingProtocol\": 0,\n  \"LoggingSaveToStorage\": false,\n  \"LoggingStorageZoneId\": 0,\n  \"FollowRedirects\": false,\n  \"ConnectionLimitPerIPCount\": 0,\n  \"RequestLimit\": 0,\n  \"LimitRateAfter\": 0,\n  \"LimitRatePerSecond\": 0,\n  \"BurstSize\": 0,\n  \"ErrorPageEnableCustomCode\": false,\n  \"ErrorPageCustomCode\": \"string\",\n  \"ErrorPageEnableStatuspageWidget\": false,\n  \"ErrorPageStatuspageCode\": \"string\",\n  \"ErrorPageWhitelabel\": false,\n  \"OptimizerEnabled\": false,\n  \"OptimizerTunnelEnabled\": false,\n  \"OptimizerDesktopMaxWidth\": 0,\n  \"OptimizerMobileMaxWidth\": 0,\n  \"OptimizerImageQuality\": 1,\n  \"OptimizerMobileImageQuality\": 1,\n  \"OptimizerEnableWebP\": false,\n  \"OptimizerPrerenderHtml\": false,\n  \"OptimizerEnableManipulationEngine\": false,\n  \"OptimizerMinifyCSS\": false,\n  \"OptimizerMinifyJavaScript\": false,\n  \"OptimizerWatermarkEnabled\": false,\n  \"OptimizerWatermarkUrl\": \"https://example.com\",\n  \"OptimizerWatermarkPosition\": 0,\n  \"OptimizerWatermarkOffset\": 0,\n  \"OptimizerWatermarkMinImageSize\": 0,\n  \"OptimizerAutomaticOptimizationEnabled\": false,\n  \"OptimizerClasses\": [],\n  \"OptimizerForceClasses\": false,\n  \"OptimizerStaticHtmlEnabled\": false,\n  \"OptimizerStaticHtmlWordPressPath\": \"string\",\n  \"OptimizerStaticHtmlWordPressBypassCookie\": \"string\",\n  \"Type\": 0,\n  \"OriginRetries\": 0,\n  \"OriginConnectTimeout\": 0,\n  \"OriginResponseTimeout\": 0,\n  \"UseStaleWhileUpdating\": false,\n  \"UseStaleWhileOffline\": false,\n  \"OriginRetry5XXResponses\": false,\n  \"OriginRetryConnectionTimeout\": false,\n  \"OriginRetryResponseTimeout\": false,\n  \"OriginRetryDelay\": 0,\n  \"DnsOriginPort\": 0,\n  \"DnsOriginScheme\": \"string\",\n  \"QueryStringVaryParameters\": [],\n  \"OriginShieldEnableConcurrencyLimit\": false,\n  \"OriginShieldMaxConcurrentRequests\": 1,\n  \"EnableCookieVary\": false,\n  \"CookieVaryParameters\": [],\n  \"EnableSafeHop\": false,\n  \"OriginShieldQueueMaxWaitTime\": 0,\n  \"OriginShieldMaxQueuedRequests\": 0,\n  \"UseBackgroundUpdate\": false,\n  \"EnableAutoSSL\": false,\n  \"LogAnonymizationType\": 0,\n  \"StorageZoneId\": 0,\n  \"EdgeScriptId\": 0,\n  \"MiddlewareScriptId\": 0,\n  \"EdgeScriptExecutionPhase\": 0,\n  \"OriginType\": 0,\n  \"MagicContainersAppId\": \"string\",\n  \"MagicContainersEndpointId\": \"string\",\n  \"LogFormat\": 0,\n  \"LogForwardingFormat\": 0,\n  \"ShieldDDosProtectionType\": 0,\n  \"ShieldDDosProtectionEnabled\": false,\n  \"OriginHostHeader\": \"string\",\n  \"EnableSmartCache\": false,\n  \"EnableRequestCoalescing\": false,\n  \"RequestCoalescingTimeout\": 0,\n  \"DisableLetsEncrypt\": false,\n  \"EnableBunnyImageAi\": false,\n  \"BunnyAiImageBlueprints\": [],\n  \"PreloadingScreenEnabled\": false,\n  \"PreloadingScreenCode\": \"string\",\n  \"PreloadingScreenLogoUrl\": \"https://example.com\",\n  \"PreloadingScreenShowOnFirstVisit\": false,\n  \"PreloadingScreenTheme\": 0,\n  \"PreloadingScreenCodeEnabled\": false,\n  \"PreloadingScreenDelay\": 0,\n  \"RoutingFilters\": [],\n  \"StickySessionType\": 0,\n  \"StickySessionCookieName\": \"string\",\n  \"StickySessionClientHeaders\": \"string\",\n  \"OptimizerEnableUpscaling\": false,\n  \"EnableWebSockets\": false,\n  \"MaxWebSocketConnections\": 0,\n  \"CacheKeyHeaders\": \"replace-me\",\n  \"Name\": \"example\"\n}",
  "post /pullzone/{}": "{\n  \"OriginUrl\": \"https://example.com\",\n  \"AllowedReferrers\": [],\n  \"BlockedReferrers\": [],\n  \"BlockNoneReferrer\": false,\n  \"BlockedIps\": [],\n  \"EnableGeoZoneUS\": false,\n  \"EnableGeoZoneEU\": false,\n  \"EnableGeoZoneASIA\": false,\n  \"EnableGeoZoneSA\": false,\n  \"EnableGeoZoneAF\": false,\n  \"IpFamilyPolicy\": 0,\n  \"BlockRootPathAccess\": false,\n  \"BlockPostRequests\": false,\n  \"EnableQueryStringOrdering\": false,\n  \"EnableWebpVary\": false,\n  \"EnableAvifVary\": false,\n  \"EnableMobileVary\": false,\n  \"EnableCountryCodeVary\": false,\n  \"EnableCountryStateCodeVary\": false,\n  \"EnableHostnameVary\": false,\n  \"EnableCacheSlice\": false,\n  \"ZoneSecurityEnabled\": false,\n  \"ZoneSecurityIncludeHashRemoteIP\": false,\n  \"IgnoreQueryStrings\": false,\n  \"MonthlyBandwidthLimit\": 0,\n  \"AccessControlOriginHeaderExtensions\": [],\n  \"EnableAccessControlOriginHeader\": false,\n  \"DisableCookies\": false,\n  \"BudgetRedirectedCountries\": [],\n  \"BlockedCountries\": [],\n  \"CacheControlMaxAgeOverride\": 0,\n  \"CacheControlPublicMaxAgeOverride\": 0,\n  \"CacheControlBrowserMaxAgeOverride\": 0,\n  \"AddHostHeader\": false,\n  \"AddCanonicalHeader\": false,\n  \"EnableLogging\": false,\n  \"LoggingIPAnonymizationEnabled\": false,\n  \"PermaCacheStorageZoneId\": 0,\n  \"PermaCacheType\": 0,\n  \"AWSSigningEnabled\": false,\n  \"AWSSigningKey\": \"replace-me\",\n  \"AWSSigningRegionName\": \"string\",\n  \"AWSSigningSecret\": \"string\",\n  \"EnableOriginShield\": false,\n  \"OriginShieldZoneCode\": \"string\",\n  \"EnableTLS1\": false,\n  \"EnableTLS1_1\": false,\n  \"CacheErrorResponses\": false,\n  \"VerifyOriginSSL\": false,\n  \"LogForwardingEnabled\": false,\n  \"LogForwardingHostname\": \"cdn.example.com\",\n  \"LogForwardingPort\": 0,\n  \"LogForwardingToken\": \"replace-me\",\n  \"LogForwardingProtocol\": 0,\n  \"LoggingSaveToStorage\": false,\n  \"LoggingStorageZoneId\": 0,\n  \"FollowRedirects\": false,\n  \"ConnectionLimitPerIPCount\": 0,\n  \"RequestLimit\": 0,\n  \"LimitRateAfter\": 0,\n  \"LimitRatePerSecond\": 0,\n  \"BurstSize\": 0,\n  \"ErrorPageEnableCustomCode\": false,\n  \"ErrorPageCustomCode\": \"string\",\n  \"ErrorPageEnableStatuspageWidget\": false,\n  \"ErrorPageStatuspageCode\": \"string\",\n  \"ErrorPageWhitelabel\": false,\n  \"OptimizerEnabled\": false,\n  \"OptimizerTunnelEnabled\": false,\n  \"OptimizerDesktopMaxWidth\": 0,\n  \"OptimizerMobileMaxWidth\": 0,\n  \"OptimizerImageQuality\": 1,\n  \"OptimizerMobileImageQuality\": 1,\n  \"OptimizerEnableWebP\": false,\n  \"OptimizerPrerenderHtml\": false,\n  \"OptimizerEnableManipulationEngine\": false,\n  \"OptimizerMinifyCSS\": false,\n  \"OptimizerMinifyJavaScript\": false,\n  \"OptimizerWatermarkEnabled\": false,\n  \"OptimizerWatermarkUrl\": \"https://example.com\",\n  \"OptimizerWatermarkPosition\": 0,\n  \"OptimizerWatermarkOffset\": 0,\n  \"OptimizerWatermarkMinImageSize\": 0,\n  \"OptimizerAutomaticOptimizationEnabled\": false,\n  \"OptimizerClasses\": [],\n  \"OptimizerForceClasses\": false,\n  \"OptimizerStaticHtmlEnabled\": false,\n  \"OptimizerStaticHtmlWordPressPath\": \"string\",\n  \"OptimizerStaticHtmlWordPressBypassCookie\": \"string\",\n  \"Type\": 0,\n  \"OriginRetries\": 0,\n  \"OriginConnectTimeout\": 0,\n  \"OriginResponseTimeout\": 0,\n  \"UseStaleWhileUpdating\": false,\n  \"UseStaleWhileOffline\": false,\n  \"OriginRetry5XXResponses\": false,\n  \"OriginRetryConnectionTimeout\": false,\n  \"OriginRetryResponseTimeout\": false,\n  \"OriginRetryDelay\": 0,\n  \"DnsOriginPort\": 0,\n  \"DnsOriginScheme\": \"string\",\n  \"QueryStringVaryParameters\": [],\n  \"OriginShieldEnableConcurrencyLimit\": false,\n  \"OriginShieldMaxConcurrentRequests\": 1,\n  \"EnableCookieVary\": false,\n  \"CookieVaryParameters\": [],\n  \"EnableSafeHop\": false,\n  \"OriginShieldQueueMaxWaitTime\": 0,\n  \"OriginShieldMaxQueuedRequests\": 0,\n  \"UseBackgroundUpdate\": false,\n  \"EnableAutoSSL\": false,\n  \"LogAnonymizationType\": 0,\n  \"StorageZoneId\": 0,\n  \"EdgeScriptId\": 0,\n  \"MiddlewareScriptId\": 0,\n  \"EdgeScriptExecutionPhase\": 0,\n  \"OriginType\": 0,\n  \"MagicContainersAppId\": \"string\",\n  \"MagicContainersEndpointId\": \"string\",\n  \"LogFormat\": 0,\n  \"LogForwardingFormat\": 0,\n  \"ShieldDDosProtectionType\": 0,\n  \"ShieldDDosProtectionEnabled\": false,\n  \"OriginHostHeader\": \"string\",\n  \"EnableSmartCache\": false,\n  \"EnableRequestCoalescing\": false,\n  \"RequestCoalescingTimeout\": 0,\n  \"DisableLetsEncrypt\": false,\n  \"EnableBunnyImageAi\": false,\n  \"BunnyAiImageBlueprints\": [],\n  \"PreloadingScreenEnabled\": false,\n  \"PreloadingScreenCode\": \"string\",\n  \"PreloadingScreenLogoUrl\": \"https://example.com\",\n  \"PreloadingScreenShowOnFirstVisit\": false,\n  \"PreloadingScreenTheme\": 0,\n  \"PreloadingScreenCodeEnabled\": false,\n  \"PreloadingScreenDelay\": 0,\n  \"RoutingFilters\": [],\n  \"StickySessionType\": 0,\n  \"StickySessionCookieName\": \"string\",\n  \"StickySessionClientHeaders\": \"string\",\n  \"OptimizerEnableUpscaling\": false,\n  \"EnableWebSockets\": false,\n  \"MaxWebSocketConnections\": 0,\n  \"CacheKeyHeaders\": \"replace-me\"\n}",
  "post /pullzone/{}/edgerules/addorupdate": "{\n  \"Guid\": \"string\",\n  \"ActionType\": 0,\n  \"ActionParameter1\": \"string\",\n  \"ActionParameter2\": \"string\",\n  \"ActionParameter3\": \"string\",\n  \"Triggers\": [],\n  \"ExtraActions\": [],\n  \"TriggerMatchingType\": 0,\n  \"Description\": \"203.0.113.10\",\n  \"Enabled\": false,\n  \"OrderIndex\": 0,\n  \"ReadOnly\": false\n}",
  "post /pullzone/{}/edgerules/{}/setedgeruleenabled": "{\n  \"Id\": 0,\n  \"Value\": false\n}",
  "post /pullzone/{}/updateprivatekeytype": "{\n  \"Hostname\": \"cdn.example.com\",\n  \"KeyType\": 0\n}",
  "post /pullzone/requestexternaldnscertificate": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /pullzone/completeexternaldnscertificate": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /pullzone/requestexternalhttpcertificate": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /pullzone/completeexternalhttpcertificate": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /pullzone/{}/purgecache": "{\n  \"CacheTag\": \"string\"\n}",
  "post /pullzone/checkavailability": "{\n  \"Name\": \"example\"\n}",
  "post /pullzone/{}/addcertificate": "{\n  \"Hostname\": \"cdn.example.com\",\n  \"Certificate\": \"string\",\n  \"CertificateKey\": \"replace-me\"\n}",
  "delete /pullzone/{}/removecertificate": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /pullzone/{}/addhostname": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "delete /pullzone/{}/removehostname": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /pullzone/{}/setforcessl": "{\n  \"Hostname\": \"cdn.example.com\",\n  \"ForceSSL\": false\n}",
  "post /pullzone/{}/resetsecuritykey": "{\n  \"SecurityKey\": \"replace-me\"\n}",
  "post /pullzone/{}/addallowedreferrer": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /pullzone/{}/removeallowedreferrer": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /pullzone/{}/addblockedreferrer": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /pullzone/{}/removeblockedreferrer": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /pullzone/{}/addblockedip": "{\n  \"BlockedIp\": \"203.0.113.10\"\n}",
  "post /pullzone/{}/removeblockedip": "{\n  \"BlockedIp\": \"203.0.113.10\"\n}",
  "post /storagezone": "{\n  \"Name\": \"example\",\n  \"Region\": \"string\",\n  \"ReplicationRegions\": [],\n  \"ZoneTier\": 0,\n  \"StorageZoneType\": 0\n}",
  "post /storagezone/checkavailability": "{\n  \"Name\": \"example\"\n}",
  "post /storagezone/{}": "{\n  \"ReplicationZones\": [],\n  \"OriginUrl\": \"https://example.com\",\n  \"Custom404FilePath\": \"string\",\n  \"Rewrite404To200\": false\n}",
  "post /videolibrary/{}/addallowedreferrer": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /videolibrary/{}/addblockedreferrer": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /videolibrary": "{\n  \"Name\": \"example\",\n  \"ReplicationRegions\": [],\n  \"PlayerVersion\": 0,\n  \"EncodingTier\": 0,\n  \"JitEncodingEnabled\": false,\n  \"OutputCodecs\": \"string\",\n  \"EnabledResolutions\": \"string\",\n  \"BlockNoneReferrer\": false,\n  \"EnableMP4Fallback\": false,\n  \"KeepOriginalFiles\": false,\n  \"AllowDirectPlay\": false,\n  \"EnableMultiAudioTrackSupport\": false,\n  \"EnableTranscribing\": false,\n  \"TranscribingCaptionLanguages\": [],\n  \"EnableTranscribingTitleGeneration\": false,\n  \"EnableTranscribingDescriptionGeneration\": false,\n  \"EnableTranscribingChaptersGeneration\": false,\n  \"EnableTranscribingMomentsGeneration\": false,\n  \"AllowEarlyPlay\": false\n}",
  "post /videolibrary/{}": "{\n  \"Name\": \"example\",\n  \"CustomHTML\": \"string\",\n  \"PlayerKeyColor\": \"replace-me\",\n  \"EnableTokenAuthentication\": false,\n  \"EnableTokenIPVerification\": false,\n  \"ResetToken\": false,\n  \"WatermarkPositionLeft\": 0,\n  \"WatermarkPositionTop\": 0,\n  \"WatermarkWidth\": 0,\n  \"WatermarkHeight\": 0,\n  \"EnabledResolutions\": \"string\",\n  \"ViAiPublisherId\": \"203.0.113.10\",\n  \"VastTagUrl\": \"https://example.com\",\n  \"WebhookUrl\": \"https://example.com\",\n  \"CaptionsFontSize\": 0,\n  \"CaptionsFontColor\": \"string\",\n  \"CaptionsBackground\": \"string\",\n  \"UILanguage\": \"string\",\n  \"AllowEarlyPlay\": false,\n  \"PlayerTokenAuthenticationEnabled\": false,\n  \"BlockNoneReferrer\": false,\n  \"EnableMP4Fallback\": false,\n  \"KeepOriginalFiles\": false,\n  \"AllowDirectPlay\": false,\n  \"EnableDRM\": false,\n  \"DrmVersion\": 0,\n  \"Controls\": \"string\",\n  \"PlaybackSpeeds\": \"string\",\n  \"Bitrate240p\": 0,\n  \"Bitrate360p\": 0,\n  \"Bitrate480p\": 0,\n  \"Bitrate720p\": 0,\n  \"Bitrate1080p\": 0,\n  \"Bitrate1440p\": 0,\n  \"Bitrate2160p\": 0,\n  \"ShowHeatmap\": false,\n  \"EnableContentTagging\": false,\n  \"FontFamily\": \"string\",\n  \"EnableTranscribing\": false,\n  \"EnableTranscribingTitleGeneration\": false,\n  \"EnableTranscribingDescriptionGeneration\": false,\n  \"EnableTranscribingChaptersGeneration\": false,\n  \"EnableTranscribingMomentsGeneration\": false,\n  \"TranscribingCaptionLanguages\": [],\n  \"EnableCaptionsInPlaylist\": false,\n  \"RememberPlayerPosition\": false,\n  \"EnableMultiAudioTrackSupport\": false,\n  \"UseSeparateAudioStream\": false,\n  \"JitEncodingEnabled\": false,\n  \"EncodingTier\": 0,\n  \"OutputCodecs\": \"string\",\n  \"AppleFairPlayDrm\": {\n    \"Enabled\": false\n  },\n  \"GoogleWidevineDrm\": {\n    \"Enabled\": false,\n    \"SdOnlyForL3\": false,\n    \"MinClientSecurityLevel\": 0\n  },\n  \"PlayerVersion\": 0,\n  \"RemoveMetadataFromFallbackVideos\": false,\n  \"ScaleVideoUsingBothDimensions\": false,\n  \"ExposeOriginals\": false,\n  \"ExposeVideoMetadata\": false,\n  \"EnableCompactControls\": false\n}",
  "post /videolibrary/{}/removeallowedreferrer": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /videolibrary/{}/removeblockedreferrer": "{\n  \"Hostname\": \"cdn.example.com\"\n}",
  "post /user/closeaccount": "{\n  \"Password\": \"change-me\",\n  \"Reason\": \"string\"\n}",
  "post /dnszone/records/scan": "{\n  \"ZoneId\": 0,\n  \"Domain\": \"example.com\"\n}"
}
const REQUEST_SCHEMAS: Record<string, RequestBodySchema> = {
  "post /dnszone": {
    "fields": [
      {
        "name": "Domain",
        "type": "string",
        "description": "The domain that will be added.",
        "required": true,
        "nullable": false
      },
      {
        "name": "Records",
        "type": "array",
        "description": "Optional array of DNS records to add when creating the zone.",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /dnszone/{}": {
    "fields": [
      {
        "name": "CustomNameserversEnabled",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "Nameserver1",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "Nameserver2",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "SoaEmail",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "LoggingEnabled",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogAnonymizationType",
        "type": "integer",
        "description": "Gets the log anonymization type for this zone",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "OneDigit"
          },
          {
            "value": 1,
            "label": "Drop"
          }
        ]
      },
      {
        "name": "CertificateKeyType",
        "type": "integer",
        "description": "Sets the certificate private key type for wildcard certificates for this zone",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Ecdsa"
          },
          {
            "value": 1,
            "label": "Rsa"
          }
        ]
      },
      {
        "name": "LoggingIPAnonymizationEnabled",
        "type": "boolean",
        "description": "Determines if the log anonoymization should be enabled",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /dnszone/checkavailability": {
    "fields": [
      {
        "name": "Name",
        "type": "string",
        "description": "Determines the name of the zone that we are checking",
        "required": false,
        "nullable": true
      }
    ]
  },
  "put /dnszone/{}/records": {
    "fields": [
      {
        "name": "Type",
        "type": "integer",
        "description": "0 = A\n1 = AAAA\n2 = CNAME\n3 = TXT\n4 = MX\n5 = Redirect\n6 = Flatten\n7 = PullZone\n8 = SRV\n9 = CAA\n10 = PTR\n11 = Script\n12 = NS\n13 = SVCB\n14 = HTTPS\n15 = TLSA",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "A"
          },
          {
            "value": 1,
            "label": "AAAA"
          },
          {
            "value": 2,
            "label": "CNAME"
          },
          {
            "value": 3,
            "label": "TXT"
          },
          {
            "value": 4,
            "label": "MX"
          },
          {
            "value": 5,
            "label": "Redirect"
          },
          {
            "value": 6,
            "label": "Flatten"
          },
          {
            "value": 7,
            "label": "PullZone"
          },
          {
            "value": 8,
            "label": "SRV"
          },
          {
            "value": 9,
            "label": "CAA"
          },
          {
            "value": 10,
            "label": "PTR"
          },
          {
            "value": 11,
            "label": "Script"
          },
          {
            "value": 12,
            "label": "NS"
          },
          {
            "value": 13,
            "label": "SVCB"
          },
          {
            "value": 14,
            "label": "HTTPS"
          },
          {
            "value": 15,
            "label": "TLSA"
          }
        ]
      },
      {
        "name": "Ttl",
        "type": "integer",
        "format": "int32",
        "required": false,
        "nullable": true
      },
      {
        "name": "Value",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "Name",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "Weight",
        "type": "integer",
        "format": "int32",
        "required": false,
        "nullable": true
      },
      {
        "name": "Priority",
        "type": "integer",
        "format": "int32",
        "required": false,
        "nullable": true
      },
      {
        "name": "Flags",
        "type": "integer",
        "format": "byte",
        "required": false,
        "nullable": true
      },
      {
        "name": "Tag",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "Port",
        "type": "integer",
        "format": "int32",
        "required": false,
        "nullable": true
      },
      {
        "name": "PullZoneId",
        "type": "integer",
        "format": "int64",
        "required": false,
        "nullable": true
      },
      {
        "name": "ScriptId",
        "type": "integer",
        "format": "int64",
        "required": false,
        "nullable": true
      },
      {
        "name": "Accelerated",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "MonitorType",
        "type": "integer",
        "description": "0 = None\n1 = Ping\n2 = Http\n3 = Monitor",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "None"
          },
          {
            "value": 1,
            "label": "Ping"
          },
          {
            "value": 2,
            "label": "Http"
          },
          {
            "value": 3,
            "label": "Monitor"
          }
        ]
      },
      {
        "name": "GeolocationLatitude",
        "type": "number",
        "format": "double",
        "required": false,
        "nullable": true
      },
      {
        "name": "GeolocationLongitude",
        "type": "number",
        "format": "double",
        "required": false,
        "nullable": true
      },
      {
        "name": "LatencyZone",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "SmartRoutingType",
        "type": "integer",
        "description": "0 = None\n1 = Latency\n2 = Geolocation",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "None"
          },
          {
            "value": 1,
            "label": "Latency"
          },
          {
            "value": 2,
            "label": "Geolocation"
          }
        ]
      },
      {
        "name": "Disabled",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnviromentalVariables",
        "type": "array",
        "required": false,
        "nullable": true
      },
      {
        "name": "Comment",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "AutoSslIssuance",
        "type": "boolean",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /dnszone/{}/records/{}": {
    "fields": [
      {
        "name": "Type",
        "type": "integer",
        "description": "0 = A\n1 = AAAA\n2 = CNAME\n3 = TXT\n4 = MX\n5 = Redirect\n6 = Flatten\n7 = PullZone\n8 = SRV\n9 = CAA\n10 = PTR\n11 = Script\n12 = NS\n13 = SVCB\n14 = HTTPS\n15 = TLSA",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "A"
          },
          {
            "value": 1,
            "label": "AAAA"
          },
          {
            "value": 2,
            "label": "CNAME"
          },
          {
            "value": 3,
            "label": "TXT"
          },
          {
            "value": 4,
            "label": "MX"
          },
          {
            "value": 5,
            "label": "Redirect"
          },
          {
            "value": 6,
            "label": "Flatten"
          },
          {
            "value": 7,
            "label": "PullZone"
          },
          {
            "value": 8,
            "label": "SRV"
          },
          {
            "value": 9,
            "label": "CAA"
          },
          {
            "value": 10,
            "label": "PTR"
          },
          {
            "value": 11,
            "label": "Script"
          },
          {
            "value": 12,
            "label": "NS"
          },
          {
            "value": 13,
            "label": "SVCB"
          },
          {
            "value": 14,
            "label": "HTTPS"
          },
          {
            "value": 15,
            "label": "TLSA"
          }
        ]
      },
      {
        "name": "Ttl",
        "type": "integer",
        "format": "int32",
        "required": false,
        "nullable": true
      },
      {
        "name": "Value",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "Name",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "Weight",
        "type": "integer",
        "format": "int32",
        "required": false,
        "nullable": true
      },
      {
        "name": "Priority",
        "type": "integer",
        "format": "int32",
        "required": false,
        "nullable": true
      },
      {
        "name": "Flags",
        "type": "integer",
        "format": "byte",
        "required": false,
        "nullable": true
      },
      {
        "name": "Tag",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "Port",
        "type": "integer",
        "format": "int32",
        "required": false,
        "nullable": true
      },
      {
        "name": "PullZoneId",
        "type": "integer",
        "format": "int64",
        "required": false,
        "nullable": true
      },
      {
        "name": "ScriptId",
        "type": "integer",
        "format": "int64",
        "required": false,
        "nullable": true
      },
      {
        "name": "Accelerated",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "MonitorType",
        "type": "integer",
        "description": "0 = None\n1 = Ping\n2 = Http\n3 = Monitor",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "None"
          },
          {
            "value": 1,
            "label": "Ping"
          },
          {
            "value": 2,
            "label": "Http"
          },
          {
            "value": 3,
            "label": "Monitor"
          }
        ]
      },
      {
        "name": "GeolocationLatitude",
        "type": "number",
        "format": "double",
        "required": false,
        "nullable": true
      },
      {
        "name": "GeolocationLongitude",
        "type": "number",
        "format": "double",
        "required": false,
        "nullable": true
      },
      {
        "name": "LatencyZone",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "SmartRoutingType",
        "type": "integer",
        "description": "0 = None\n1 = Latency\n2 = Geolocation",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "None"
          },
          {
            "value": 1,
            "label": "Latency"
          },
          {
            "value": 2,
            "label": "Geolocation"
          }
        ]
      },
      {
        "name": "Disabled",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnviromentalVariables",
        "type": "array",
        "required": false,
        "nullable": true
      },
      {
        "name": "Comment",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "AutoSslIssuance",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "Id",
        "type": "integer",
        "format": "int64",
        "required": false,
        "nullable": false
      }
    ]
  },
  "post /dnszone/{}/certificate/issue": {
    "fields": [
      {
        "name": "Domain",
        "type": "string",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /pullzone": {
    "fields": [
      {
        "name": "OriginUrl",
        "type": "string",
        "description": "Sets the origin URL of the Pull Zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "AllowedReferrers",
        "type": "array",
        "description": "Sets the list of referrer hostnames that are allowed to access the pull zone. Requests containing the header Referer: hostname that is not on the list will be rejected. If empty, all the referrers are allowed",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockedReferrers",
        "type": "array",
        "description": "Sets the list of referrer hostnames that are blocked from accessing the pull zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockNoneReferrer",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockedIps",
        "type": "array",
        "description": "Sets the list of IPs that are blocked from accessing the pull zone. Requests coming from the following IPs will be rejected. If empty, all the IPs will be allowed",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableGeoZoneUS",
        "type": "boolean",
        "description": "Determines if the delivery from the North America region should be enabled for this pull zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableGeoZoneEU",
        "type": "boolean",
        "description": "Determines if the delivery from the Europe region should be enabled for this pull zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableGeoZoneASIA",
        "type": "boolean",
        "description": "Determines if the delivery from the Asia / Oceania regions should be enabled for this pull zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableGeoZoneSA",
        "type": "boolean",
        "description": "Determines if the delivery from the South America region should be enabled for this pull zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableGeoZoneAF",
        "type": "boolean",
        "description": "Determines if the delivery from the Africa region should be enabled for this pull zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "IpFamilyPolicy",
        "type": "integer",
        "description": "Address-family policy: 0=IPv4Only, 1=DualStack (default, best latency and compatibility), 2=DualStackPreferIPv6, 3=IPv6Only.",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "IPv4Only"
          },
          {
            "value": 1,
            "label": "DualStack"
          },
          {
            "value": 2,
            "label": "DualStackPreferIPv6"
          },
          {
            "value": 3,
            "label": "IPv6Only"
          }
        ]
      },
      {
        "name": "BlockRootPathAccess",
        "type": "boolean",
        "description": "Determines if the zone should block requests to the root of the zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockPostRequests",
        "type": "boolean",
        "description": "Determines if the POST requests to this zone should be rejected.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableQueryStringOrdering",
        "type": "boolean",
        "description": "Determines if the query string ordering should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableWebpVary",
        "type": "boolean",
        "description": "Determines if the WebP Vary feature should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableAvifVary",
        "type": "boolean",
        "description": "Determines if the AVIF Vary feature should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableMobileVary",
        "type": "boolean",
        "description": "Determines if the Mobile Vary feature is enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableCountryCodeVary",
        "type": "boolean",
        "description": "Determines if the Country Code Vary feature should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableCountryStateCodeVary",
        "type": "boolean",
        "description": "Determines if the Country State Code Vary feature should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableHostnameVary",
        "type": "boolean",
        "description": "Determines if the Hostname Vary feature should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableCacheSlice",
        "type": "boolean",
        "description": "Determines if cache slicing (Optimize for video) should be enabled for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "ZoneSecurityEnabled",
        "type": "boolean",
        "description": "Determines if the zone token authentication security should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "ZoneSecurityIncludeHashRemoteIP",
        "type": "boolean",
        "description": "Determines if the token authentication IP validation should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "IgnoreQueryStrings",
        "type": "boolean",
        "description": "Determines if the Pull Zone should ignore query strings when serving cached objects (Vary by Query String)",
        "required": false,
        "nullable": true
      },
      {
        "name": "MonthlyBandwidthLimit",
        "type": "integer",
        "format": "int64",
        "description": "Sets the monthly limit of bandwidth in bytes that the pullzone is allowed to use",
        "required": false,
        "nullable": true
      },
      {
        "name": "AccessControlOriginHeaderExtensions",
        "type": "array",
        "description": "Sets the list of extensions that will return the CORS headers",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableAccessControlOriginHeader",
        "type": "boolean",
        "description": "Determines if CORS headers should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "DisableCookies",
        "type": "boolean",
        "description": "Determines if the Pull Zone should automatically remove cookies from the responses",
        "required": false,
        "nullable": true
      },
      {
        "name": "BudgetRedirectedCountries",
        "type": "array",
        "description": "Sets the list of two letter Alpha2 country codes that will be redirected to the cheapest possible region",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockedCountries",
        "type": "array",
        "description": "Sets the list of two letter Alpha2 country codes that will be blocked from accessing the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "CacheControlMaxAgeOverride",
        "type": "integer",
        "format": "int64",
        "description": "Sets the cache control override setting for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "CacheControlPublicMaxAgeOverride",
        "type": "integer",
        "format": "int64",
        "description": "Sets the browser cache control override setting for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "CacheControlBrowserMaxAgeOverride",
        "type": "integer",
        "format": "int64",
        "description": "(Deprecated) Sets the browser cache control override setting for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "AddHostHeader",
        "type": "boolean",
        "description": "Determines if the zone should forward the requested host header to the origin",
        "required": false,
        "nullable": true
      },
      {
        "name": "AddCanonicalHeader",
        "type": "boolean",
        "description": "Determines if the canonical header should be added by this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableLogging",
        "type": "boolean",
        "description": "Determines if the logging should be enabled for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LoggingIPAnonymizationEnabled",
        "type": "boolean",
        "description": "Determines if the log anonoymization should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "PermaCacheStorageZoneId",
        "type": "integer",
        "format": "int64",
        "description": "The ID of the storage zone that should be used as the Perma-Cache",
        "required": false,
        "nullable": true
      },
      {
        "name": "PermaCacheType",
        "type": "integer",
        "description": "Determines Perma-Cache behavior",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Automatic"
          },
          {
            "value": 1,
            "label": "Manual"
          }
        ]
      },
      {
        "name": "AWSSigningEnabled",
        "type": "boolean",
        "description": "Determines if the AWS signing should be enabled or not",
        "required": false,
        "nullable": true
      },
      {
        "name": "AWSSigningKey",
        "type": "string",
        "description": "Sets the AWS signing key",
        "required": false,
        "nullable": true
      },
      {
        "name": "AWSSigningRegionName",
        "type": "string",
        "description": "Sets the AWS signing region name",
        "required": false,
        "nullable": true
      },
      {
        "name": "AWSSigningSecret",
        "type": "string",
        "description": "Sets the AWS signing secret key",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableOriginShield",
        "type": "boolean",
        "description": "Determines if the origin shield should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginShieldZoneCode",
        "type": "string",
        "description": "Determines the zone code where the origin shield should be set up",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTLS1",
        "type": "boolean",
        "description": "Determines if the TLS 1 should be enabled on this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTLS1_1",
        "type": "boolean",
        "description": "Determines if the TLS 1.1 should be enabled on this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "CacheErrorResponses",
        "type": "boolean",
        "description": "Determines if the cache error responses should be enabled on the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "VerifyOriginSSL",
        "type": "boolean",
        "description": "Determines if the SSL certificate should be verified when connecting to the origin",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogForwardingEnabled",
        "type": "boolean",
        "description": "Sets the log forwarding token for the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogForwardingHostname",
        "type": "string",
        "description": "Sets the log forwarding destination hostname for the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogForwardingPort",
        "type": "integer",
        "format": "int32",
        "description": "Sets the log forwarding port for the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogForwardingToken",
        "type": "string",
        "description": "Sets the log forwarding token for the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogForwardingProtocol",
        "type": "integer",
        "description": "Sets the log forwarding protocol type",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "UDP"
          },
          {
            "value": 1,
            "label": "TCP"
          },
          {
            "value": 2,
            "label": "TCPEncrypted"
          },
          {
            "value": 3,
            "label": "DataDog"
          }
        ]
      },
      {
        "name": "LoggingSaveToStorage",
        "type": "boolean",
        "description": "Determines if the logging permanent storage should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "LoggingStorageZoneId",
        "type": "integer",
        "format": "int64",
        "description": "Sets the Storage Zone id that should contain the logs from this Pull Zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "FollowRedirects",
        "type": "boolean",
        "description": "Determines if the zone should follow redirects return by the oprigin and cache the response",
        "required": false,
        "nullable": true
      },
      {
        "name": "ConnectionLimitPerIPCount",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum number of connections per IP that will be allowed to connect to this Pull Zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "RequestLimit",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum number of requests per second that will be allowed to connect to this Pull Zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LimitRateAfter",
        "type": "number",
        "format": "double",
        "description": "Determines the amount of traffic transferred before the client is limited",
        "required": false,
        "nullable": true
      },
      {
        "name": "LimitRatePerSecond",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum number of requests per second coming from a single IP before it is blocked.",
        "required": false,
        "nullable": true
      },
      {
        "name": "BurstSize",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum burst requests before an IP is blocked",
        "required": false,
        "nullable": true
      },
      {
        "name": "ErrorPageEnableCustomCode",
        "type": "boolean",
        "description": "Determines if custom error page code should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "ErrorPageCustomCode",
        "type": "string",
        "description": "Contains the custom error page code that will be returned",
        "required": false,
        "nullable": true
      },
      {
        "name": "ErrorPageEnableStatuspageWidget",
        "type": "boolean",
        "description": "Determines if the statuspage widget should be displayed on the error pages",
        "required": false,
        "nullable": true
      },
      {
        "name": "ErrorPageStatuspageCode",
        "type": "string",
        "description": "The statuspage code that will be used to build the status widget",
        "required": false,
        "nullable": true
      },
      {
        "name": "ErrorPageWhitelabel",
        "type": "boolean",
        "description": "Determines if the error pages should be whitelabel or not",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerEnabled",
        "type": "boolean",
        "description": "Determines if the optimizer should be enabled for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerTunnelEnabled",
        "type": "boolean",
        "description": "Determines if the optimizer origin tunnel system should be enabled for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerDesktopMaxWidth",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum automatic image size for desktop clients",
        "required": false,
        "nullable": true,
        "minimum": 0,
        "maximum": 5000
      },
      {
        "name": "OptimizerMobileMaxWidth",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum automatic image size for mobile clients",
        "required": false,
        "nullable": true,
        "minimum": 0,
        "maximum": 5000
      },
      {
        "name": "OptimizerImageQuality",
        "type": "integer",
        "format": "int32",
        "description": "Determines the image quality for desktop clients",
        "required": false,
        "nullable": true,
        "minimum": 1,
        "maximum": 100
      },
      {
        "name": "OptimizerMobileImageQuality",
        "type": "integer",
        "format": "int32",
        "description": "Determines the image quality for mobile clients",
        "required": false,
        "nullable": true,
        "minimum": 1,
        "maximum": 100
      },
      {
        "name": "OptimizerEnableWebP",
        "type": "boolean",
        "description": "Determines if the WebP optimization should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerPrerenderHtml",
        "type": "boolean",
        "description": "Determines if the SEO HTML prerender should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerEnableManipulationEngine",
        "type": "boolean",
        "description": "Determines the image manipulation should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerMinifyCSS",
        "type": "boolean",
        "description": "Determines if the CSS minifcation should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerMinifyJavaScript",
        "type": "boolean",
        "description": "Determines if the JavaScript minifcation should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerWatermarkEnabled",
        "type": "boolean",
        "description": "Determines if image watermarking should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerWatermarkUrl",
        "type": "string",
        "description": "Sets the URL of the watermark image",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerWatermarkPosition",
        "type": "integer",
        "description": "Sets the position of the watermark image",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "BottomLeft"
          },
          {
            "value": 1,
            "label": "BottomRight"
          },
          {
            "value": 2,
            "label": "TopLeft"
          },
          {
            "value": 3,
            "label": "TopRight"
          },
          {
            "value": 4,
            "label": "Center"
          },
          {
            "value": 5,
            "label": "CenterStretch"
          }
        ]
      },
      {
        "name": "OptimizerWatermarkOffset",
        "type": "number",
        "format": "double",
        "description": "Sets the offset of the watermark image",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerWatermarkMinImageSize",
        "type": "integer",
        "format": "int32",
        "description": "Sets the minimum image size to which the watermark will be added",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerAutomaticOptimizationEnabled",
        "type": "boolean",
        "description": "Determines if the automatic image optimization should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerClasses",
        "type": "array",
        "description": "Determines the list of optimizer classes",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerForceClasses",
        "type": "boolean",
        "description": "Determines if the optimizer classes should be forced",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerStaticHtmlEnabled",
        "type": "boolean",
        "description": "Determines whether optimizer static html feature enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerStaticHtmlWordPressPath",
        "type": "string",
        "description": "Wordpress html path which should be bypassed by permacache in edge rule",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerStaticHtmlWordPressBypassCookie",
        "type": "string",
        "description": "Wordpress cookie which should be bypassed by permacache in edge rule",
        "required": false,
        "nullable": true
      },
      {
        "name": "Type",
        "type": "integer",
        "description": "The type of the pull zone. Premium = 0, Volume = 1",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Premium"
          },
          {
            "value": 1,
            "label": "Volume"
          }
        ]
      },
      {
        "name": "OriginRetries",
        "type": "integer",
        "format": "int32",
        "description": "The number of retries to the origin server",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginConnectTimeout",
        "type": "integer",
        "format": "int32",
        "description": "The amount of seconds to wait when connecting to the origin. Otherwise the request will fail or retry.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginResponseTimeout",
        "type": "integer",
        "format": "int32",
        "description": "The amount of seconds to wait when waiting for the origin reply. Otherwise the request will fail or retry.",
        "required": false,
        "nullable": true
      },
      {
        "name": "UseStaleWhileUpdating",
        "type": "boolean",
        "description": "Determines if we should use stale cache while cache is updating",
        "required": false,
        "nullable": true
      },
      {
        "name": "UseStaleWhileOffline",
        "type": "boolean",
        "description": "Determines if we should use stale cache while the origin is offline",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginRetry5XXResponses",
        "type": "boolean",
        "description": "Determines if we should retry the request in case of a 5XX response.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginRetryConnectionTimeout",
        "type": "boolean",
        "description": "Determines if we should retry the request in case of a connection timeout.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginRetryResponseTimeout",
        "type": "boolean",
        "description": "Determines if we should retry the request in case of a response timeout.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginRetryDelay",
        "type": "integer",
        "format": "int32",
        "description": "Determines the amount of time that the CDN should wait before retrying an origin request.",
        "required": false,
        "nullable": true
      },
      {
        "name": "DnsOriginPort",
        "type": "integer",
        "format": "int32",
        "description": "Determines the origin port of the pull zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "DnsOriginScheme",
        "type": "string",
        "description": "Determines the origin scheme of the pull zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "QueryStringVaryParameters",
        "type": "array",
        "description": "Contains the list of vary parameters that will be used for vary cache by query string. Only alphanumeric characters, dashes and underscores are allowed (values that contain other characters are ignorred). If empty, all parameters will be used to construct the key.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginShieldEnableConcurrencyLimit",
        "type": "boolean",
        "description": "Determines if the origin shield concurrency limit is enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginShieldMaxConcurrentRequests",
        "type": "integer",
        "format": "int32",
        "description": "Determines the number of maximum concurrent requests allowed to the origin.",
        "required": false,
        "nullable": true,
        "minimum": 1,
        "maximum": 10000
      },
      {
        "name": "EnableCookieVary",
        "type": "boolean",
        "description": "Determines if the Cookie Vary feature is enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "CookieVaryParameters",
        "type": "array",
        "description": "Contains the list of vary parameters that will be used for vary cache by cookie string.Only alphanumeric characters, dashes and underscores are allowed (values that contain other characters are ignorred). If empty, cookie vary will not be used.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableSafeHop",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginShieldQueueMaxWaitTime",
        "type": "integer",
        "format": "int32",
        "description": "Determines the max queue wait time",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginShieldMaxQueuedRequests",
        "type": "integer",
        "format": "int32",
        "description": "Determines the max number of origin requests that will remain in the queue",
        "required": false,
        "nullable": true,
        "minimum": 0,
        "maximum": 30000
      },
      {
        "name": "UseBackgroundUpdate",
        "type": "boolean",
        "description": "Determines if cache update is performed in the background.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableAutoSSL",
        "type": "boolean",
        "description": "If set to true, any hostnames added to this Pull Zone will automatically enable SSL.",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogAnonymizationType",
        "type": "integer",
        "description": "Sets the log anonymization type for this pull zone",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "OneDigit"
          },
          {
            "value": 1,
            "label": "Drop"
          }
        ]
      },
      {
        "name": "StorageZoneId",
        "type": "integer",
        "format": "int64",
        "description": "The ID of the storage zone that will be used as the origin",
        "required": false,
        "nullable": true
      },
      {
        "name": "EdgeScriptId",
        "type": "integer",
        "format": "int64",
        "description": "The ID of the edge script that will be used as the origin",
        "required": false,
        "nullable": true
      },
      {
        "name": "MiddlewareScriptId",
        "type": "integer",
        "format": "int64",
        "description": "The ID of the middleware script",
        "required": false,
        "nullable": true
      },
      {
        "name": "EdgeScriptExecutionPhase",
        "type": "integer",
        "description": "The execution phase of the edge script",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Cache"
          },
          {
            "value": 1,
            "label": "LoadBalancer"
          }
        ]
      },
      {
        "name": "OriginType",
        "type": "integer",
        "description": "Determine the type of the origin for this Pull Zone",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "OriginUrl"
          },
          {
            "value": 1,
            "label": "DnsAccelerate"
          },
          {
            "value": 2,
            "label": "StorageZone"
          },
          {
            "value": 3,
            "label": "LoadBalancer"
          },
          {
            "value": 4,
            "label": "EdgeScript"
          },
          {
            "value": 5,
            "label": "MagicContainers"
          },
          {
            "value": 6,
            "label": "PushZone"
          }
        ]
      },
      {
        "name": "MagicContainersAppId",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "MagicContainersEndpointId",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogFormat",
        "type": "integer",
        "description": "0 = Plain\n1 = JSON",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Plain"
          },
          {
            "value": 1,
            "label": "JSON"
          }
        ]
      },
      {
        "name": "LogForwardingFormat",
        "type": "integer",
        "description": "0 = Plain\n1 = JSON",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Plain"
          },
          {
            "value": 1,
            "label": "JSON"
          }
        ]
      },
      {
        "name": "ShieldDDosProtectionType",
        "type": "integer",
        "description": "0 = DetectOnly\n1 = ActiveStandard\n2 = ActiveAggressive",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "DetectOnly"
          },
          {
            "value": 1,
            "label": "ActiveStandard"
          },
          {
            "value": 2,
            "label": "ActiveAggressive"
          }
        ]
      },
      {
        "name": "ShieldDDosProtectionEnabled",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginHostHeader",
        "type": "string",
        "description": "Sets the host header that will be sent to the origin",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableSmartCache",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableRequestCoalescing",
        "type": "boolean",
        "description": "Determines if request coalescing is currently enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "RequestCoalescingTimeout",
        "type": "integer",
        "format": "int32",
        "description": "Determines the lock time for coalesced requests.",
        "required": false,
        "nullable": true
      },
      {
        "name": "DisableLetsEncrypt",
        "type": "boolean",
        "description": "If set to true, the built-in let's encrypt will be disabled and requests are passed to the origin.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableBunnyImageAi",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "BunnyAiImageBlueprints",
        "type": "array",
        "required": false,
        "nullable": true
      },
      {
        "name": "PreloadingScreenEnabled",
        "type": "boolean",
        "description": "Determines if the preloading screen is currently enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "PreloadingScreenCode",
        "type": "string",
        "description": "The custom preloading screen coed",
        "required": false,
        "nullable": true
      },
      {
        "name": "PreloadingScreenLogoUrl",
        "type": "string",
        "description": "The preloading screen logo URL",
        "required": false,
        "nullable": true
      },
      {
        "name": "PreloadingScreenShowOnFirstVisit",
        "type": "boolean",
        "description": "Determines if the preloading screen is shown on the first load from a user.",
        "required": false,
        "nullable": false
      },
      {
        "name": "PreloadingScreenTheme",
        "type": "integer",
        "description": "The currently configured preloading screem theme. (0 - Light, 1 - Dark)",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Light"
          },
          {
            "value": 1,
            "label": "Dark"
          }
        ]
      },
      {
        "name": "PreloadingScreenCodeEnabled",
        "type": "boolean",
        "description": "Determines if the custom preloader screen should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "PreloadingScreenDelay",
        "type": "integer",
        "format": "int32",
        "description": "The delay in miliseconds after which the preloading screen will be displayed (0 - 10000ms)",
        "required": false,
        "nullable": true,
        "minimum": 0,
        "maximum": 10000
      },
      {
        "name": "RoutingFilters",
        "type": "array",
        "description": "The list of routing filters enabled for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "StickySessionType",
        "type": "integer",
        "description": "Whether to use a Sticky Session mechanism for this pull zone",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Off"
          },
          {
            "value": 1,
            "label": "On"
          }
        ]
      },
      {
        "name": "StickySessionCookieName",
        "type": "string",
        "description": "Sticky Session Cookie Name",
        "required": false,
        "nullable": true
      },
      {
        "name": "StickySessionClientHeaders",
        "type": "string",
        "description": "A set of comma-separated header names used to identify clients",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerEnableUpscaling",
        "type": "boolean",
        "description": "Determines if Optimizer is allowed to upscale images",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableWebSockets",
        "type": "boolean",
        "description": "Determines if WebSocket connections are allowed for this Pull Zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "MaxWebSocketConnections",
        "type": "integer",
        "format": "int32",
        "description": "The maximum global simultaneous WebSocket connections allowed for this Pull Zone. Allowed tiers: 500, 1,000, 2,500, 5,000, 10,000, 25,000. If you send a non-tier value, the value is rounded up to the next tier. Values over 25,000 are rejected, please contact sales if required.",
        "required": false,
        "nullable": true
      },
      {
        "name": "CacheKeyHeaders",
        "type": "string",
        "description": "Vary Cache by Request Headers (comma delimited)",
        "required": false,
        "nullable": true
      },
      {
        "name": "Name",
        "type": "string",
        "description": "The name of the pull zone.",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}": {
    "fields": [
      {
        "name": "OriginUrl",
        "type": "string",
        "description": "Sets the origin URL of the Pull Zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "AllowedReferrers",
        "type": "array",
        "description": "Sets the list of referrer hostnames that are allowed to access the pull zone. Requests containing the header Referer: hostname that is not on the list will be rejected. If empty, all the referrers are allowed",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockedReferrers",
        "type": "array",
        "description": "Sets the list of referrer hostnames that are blocked from accessing the pull zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockNoneReferrer",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockedIps",
        "type": "array",
        "description": "Sets the list of IPs that are blocked from accessing the pull zone. Requests coming from the following IPs will be rejected. If empty, all the IPs will be allowed",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableGeoZoneUS",
        "type": "boolean",
        "description": "Determines if the delivery from the North America region should be enabled for this pull zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableGeoZoneEU",
        "type": "boolean",
        "description": "Determines if the delivery from the Europe region should be enabled for this pull zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableGeoZoneASIA",
        "type": "boolean",
        "description": "Determines if the delivery from the Asia / Oceania regions should be enabled for this pull zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableGeoZoneSA",
        "type": "boolean",
        "description": "Determines if the delivery from the South America region should be enabled for this pull zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableGeoZoneAF",
        "type": "boolean",
        "description": "Determines if the delivery from the Africa region should be enabled for this pull zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "IpFamilyPolicy",
        "type": "integer",
        "description": "Address-family policy: 0=IPv4Only, 1=DualStack (default, best latency and compatibility), 2=DualStackPreferIPv6, 3=IPv6Only.",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "IPv4Only"
          },
          {
            "value": 1,
            "label": "DualStack"
          },
          {
            "value": 2,
            "label": "DualStackPreferIPv6"
          },
          {
            "value": 3,
            "label": "IPv6Only"
          }
        ]
      },
      {
        "name": "BlockRootPathAccess",
        "type": "boolean",
        "description": "Determines if the zone should block requests to the root of the zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockPostRequests",
        "type": "boolean",
        "description": "Determines if the POST requests to this zone should be rejected.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableQueryStringOrdering",
        "type": "boolean",
        "description": "Determines if the query string ordering should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableWebpVary",
        "type": "boolean",
        "description": "Determines if the WebP Vary feature should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableAvifVary",
        "type": "boolean",
        "description": "Determines if the AVIF Vary feature should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableMobileVary",
        "type": "boolean",
        "description": "Determines if the Mobile Vary feature is enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableCountryCodeVary",
        "type": "boolean",
        "description": "Determines if the Country Code Vary feature should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableCountryStateCodeVary",
        "type": "boolean",
        "description": "Determines if the Country State Code Vary feature should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableHostnameVary",
        "type": "boolean",
        "description": "Determines if the Hostname Vary feature should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableCacheSlice",
        "type": "boolean",
        "description": "Determines if cache slicing (Optimize for video) should be enabled for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "ZoneSecurityEnabled",
        "type": "boolean",
        "description": "Determines if the zone token authentication security should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "ZoneSecurityIncludeHashRemoteIP",
        "type": "boolean",
        "description": "Determines if the token authentication IP validation should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "IgnoreQueryStrings",
        "type": "boolean",
        "description": "Determines if the Pull Zone should ignore query strings when serving cached objects (Vary by Query String)",
        "required": false,
        "nullable": true
      },
      {
        "name": "MonthlyBandwidthLimit",
        "type": "integer",
        "format": "int64",
        "description": "Sets the monthly limit of bandwidth in bytes that the pullzone is allowed to use",
        "required": false,
        "nullable": true
      },
      {
        "name": "AccessControlOriginHeaderExtensions",
        "type": "array",
        "description": "Sets the list of extensions that will return the CORS headers",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableAccessControlOriginHeader",
        "type": "boolean",
        "description": "Determines if CORS headers should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "DisableCookies",
        "type": "boolean",
        "description": "Determines if the Pull Zone should automatically remove cookies from the responses",
        "required": false,
        "nullable": true
      },
      {
        "name": "BudgetRedirectedCountries",
        "type": "array",
        "description": "Sets the list of two letter Alpha2 country codes that will be redirected to the cheapest possible region",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockedCountries",
        "type": "array",
        "description": "Sets the list of two letter Alpha2 country codes that will be blocked from accessing the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "CacheControlMaxAgeOverride",
        "type": "integer",
        "format": "int64",
        "description": "Sets the cache control override setting for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "CacheControlPublicMaxAgeOverride",
        "type": "integer",
        "format": "int64",
        "description": "Sets the browser cache control override setting for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "CacheControlBrowserMaxAgeOverride",
        "type": "integer",
        "format": "int64",
        "description": "(Deprecated) Sets the browser cache control override setting for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "AddHostHeader",
        "type": "boolean",
        "description": "Determines if the zone should forward the requested host header to the origin",
        "required": false,
        "nullable": true
      },
      {
        "name": "AddCanonicalHeader",
        "type": "boolean",
        "description": "Determines if the canonical header should be added by this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableLogging",
        "type": "boolean",
        "description": "Determines if the logging should be enabled for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LoggingIPAnonymizationEnabled",
        "type": "boolean",
        "description": "Determines if the log anonoymization should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "PermaCacheStorageZoneId",
        "type": "integer",
        "format": "int64",
        "description": "The ID of the storage zone that should be used as the Perma-Cache",
        "required": false,
        "nullable": true
      },
      {
        "name": "PermaCacheType",
        "type": "integer",
        "description": "Determines Perma-Cache behavior",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Automatic"
          },
          {
            "value": 1,
            "label": "Manual"
          }
        ]
      },
      {
        "name": "AWSSigningEnabled",
        "type": "boolean",
        "description": "Determines if the AWS signing should be enabled or not",
        "required": false,
        "nullable": true
      },
      {
        "name": "AWSSigningKey",
        "type": "string",
        "description": "Sets the AWS signing key",
        "required": false,
        "nullable": true
      },
      {
        "name": "AWSSigningRegionName",
        "type": "string",
        "description": "Sets the AWS signing region name",
        "required": false,
        "nullable": true
      },
      {
        "name": "AWSSigningSecret",
        "type": "string",
        "description": "Sets the AWS signing secret key",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableOriginShield",
        "type": "boolean",
        "description": "Determines if the origin shield should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginShieldZoneCode",
        "type": "string",
        "description": "Determines the zone code where the origin shield should be set up",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTLS1",
        "type": "boolean",
        "description": "Determines if the TLS 1 should be enabled on this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTLS1_1",
        "type": "boolean",
        "description": "Determines if the TLS 1.1 should be enabled on this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "CacheErrorResponses",
        "type": "boolean",
        "description": "Determines if the cache error responses should be enabled on the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "VerifyOriginSSL",
        "type": "boolean",
        "description": "Determines if the SSL certificate should be verified when connecting to the origin",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogForwardingEnabled",
        "type": "boolean",
        "description": "Sets the log forwarding token for the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogForwardingHostname",
        "type": "string",
        "description": "Sets the log forwarding destination hostname for the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogForwardingPort",
        "type": "integer",
        "format": "int32",
        "description": "Sets the log forwarding port for the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogForwardingToken",
        "type": "string",
        "description": "Sets the log forwarding token for the zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogForwardingProtocol",
        "type": "integer",
        "description": "Sets the log forwarding protocol type",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "UDP"
          },
          {
            "value": 1,
            "label": "TCP"
          },
          {
            "value": 2,
            "label": "TCPEncrypted"
          },
          {
            "value": 3,
            "label": "DataDog"
          }
        ]
      },
      {
        "name": "LoggingSaveToStorage",
        "type": "boolean",
        "description": "Determines if the logging permanent storage should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "LoggingStorageZoneId",
        "type": "integer",
        "format": "int64",
        "description": "Sets the Storage Zone id that should contain the logs from this Pull Zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "FollowRedirects",
        "type": "boolean",
        "description": "Determines if the zone should follow redirects return by the oprigin and cache the response",
        "required": false,
        "nullable": true
      },
      {
        "name": "ConnectionLimitPerIPCount",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum number of connections per IP that will be allowed to connect to this Pull Zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "RequestLimit",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum number of requests per second that will be allowed to connect to this Pull Zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "LimitRateAfter",
        "type": "number",
        "format": "double",
        "description": "Determines the amount of traffic transferred before the client is limited",
        "required": false,
        "nullable": true
      },
      {
        "name": "LimitRatePerSecond",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum number of requests per second coming from a single IP before it is blocked.",
        "required": false,
        "nullable": true
      },
      {
        "name": "BurstSize",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum burst requests before an IP is blocked",
        "required": false,
        "nullable": true
      },
      {
        "name": "ErrorPageEnableCustomCode",
        "type": "boolean",
        "description": "Determines if custom error page code should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "ErrorPageCustomCode",
        "type": "string",
        "description": "Contains the custom error page code that will be returned",
        "required": false,
        "nullable": true
      },
      {
        "name": "ErrorPageEnableStatuspageWidget",
        "type": "boolean",
        "description": "Determines if the statuspage widget should be displayed on the error pages",
        "required": false,
        "nullable": true
      },
      {
        "name": "ErrorPageStatuspageCode",
        "type": "string",
        "description": "The statuspage code that will be used to build the status widget",
        "required": false,
        "nullable": true
      },
      {
        "name": "ErrorPageWhitelabel",
        "type": "boolean",
        "description": "Determines if the error pages should be whitelabel or not",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerEnabled",
        "type": "boolean",
        "description": "Determines if the optimizer should be enabled for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerTunnelEnabled",
        "type": "boolean",
        "description": "Determines if the optimizer origin tunnel system should be enabled for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerDesktopMaxWidth",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum automatic image size for desktop clients",
        "required": false,
        "nullable": true,
        "minimum": 0,
        "maximum": 5000
      },
      {
        "name": "OptimizerMobileMaxWidth",
        "type": "integer",
        "format": "int32",
        "description": "Determines the maximum automatic image size for mobile clients",
        "required": false,
        "nullable": true,
        "minimum": 0,
        "maximum": 5000
      },
      {
        "name": "OptimizerImageQuality",
        "type": "integer",
        "format": "int32",
        "description": "Determines the image quality for desktop clients",
        "required": false,
        "nullable": true,
        "minimum": 1,
        "maximum": 100
      },
      {
        "name": "OptimizerMobileImageQuality",
        "type": "integer",
        "format": "int32",
        "description": "Determines the image quality for mobile clients",
        "required": false,
        "nullable": true,
        "minimum": 1,
        "maximum": 100
      },
      {
        "name": "OptimizerEnableWebP",
        "type": "boolean",
        "description": "Determines if the WebP optimization should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerPrerenderHtml",
        "type": "boolean",
        "description": "Determines if the SEO HTML prerender should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerEnableManipulationEngine",
        "type": "boolean",
        "description": "Determines the image manipulation should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerMinifyCSS",
        "type": "boolean",
        "description": "Determines if the CSS minifcation should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerMinifyJavaScript",
        "type": "boolean",
        "description": "Determines if the JavaScript minifcation should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerWatermarkEnabled",
        "type": "boolean",
        "description": "Determines if image watermarking should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerWatermarkUrl",
        "type": "string",
        "description": "Sets the URL of the watermark image",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerWatermarkPosition",
        "type": "integer",
        "description": "Sets the position of the watermark image",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "BottomLeft"
          },
          {
            "value": 1,
            "label": "BottomRight"
          },
          {
            "value": 2,
            "label": "TopLeft"
          },
          {
            "value": 3,
            "label": "TopRight"
          },
          {
            "value": 4,
            "label": "Center"
          },
          {
            "value": 5,
            "label": "CenterStretch"
          }
        ]
      },
      {
        "name": "OptimizerWatermarkOffset",
        "type": "number",
        "format": "double",
        "description": "Sets the offset of the watermark image",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerWatermarkMinImageSize",
        "type": "integer",
        "format": "int32",
        "description": "Sets the minimum image size to which the watermark will be added",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerAutomaticOptimizationEnabled",
        "type": "boolean",
        "description": "Determines if the automatic image optimization should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerClasses",
        "type": "array",
        "description": "Determines the list of optimizer classes",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerForceClasses",
        "type": "boolean",
        "description": "Determines if the optimizer classes should be forced",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerStaticHtmlEnabled",
        "type": "boolean",
        "description": "Determines whether optimizer static html feature enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerStaticHtmlWordPressPath",
        "type": "string",
        "description": "Wordpress html path which should be bypassed by permacache in edge rule",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerStaticHtmlWordPressBypassCookie",
        "type": "string",
        "description": "Wordpress cookie which should be bypassed by permacache in edge rule",
        "required": false,
        "nullable": true
      },
      {
        "name": "Type",
        "type": "integer",
        "description": "The type of the pull zone. Premium = 0, Volume = 1",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Premium"
          },
          {
            "value": 1,
            "label": "Volume"
          }
        ]
      },
      {
        "name": "OriginRetries",
        "type": "integer",
        "format": "int32",
        "description": "The number of retries to the origin server",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginConnectTimeout",
        "type": "integer",
        "format": "int32",
        "description": "The amount of seconds to wait when connecting to the origin. Otherwise the request will fail or retry.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginResponseTimeout",
        "type": "integer",
        "format": "int32",
        "description": "The amount of seconds to wait when waiting for the origin reply. Otherwise the request will fail or retry.",
        "required": false,
        "nullable": true
      },
      {
        "name": "UseStaleWhileUpdating",
        "type": "boolean",
        "description": "Determines if we should use stale cache while cache is updating",
        "required": false,
        "nullable": true
      },
      {
        "name": "UseStaleWhileOffline",
        "type": "boolean",
        "description": "Determines if we should use stale cache while the origin is offline",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginRetry5XXResponses",
        "type": "boolean",
        "description": "Determines if we should retry the request in case of a 5XX response.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginRetryConnectionTimeout",
        "type": "boolean",
        "description": "Determines if we should retry the request in case of a connection timeout.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginRetryResponseTimeout",
        "type": "boolean",
        "description": "Determines if we should retry the request in case of a response timeout.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginRetryDelay",
        "type": "integer",
        "format": "int32",
        "description": "Determines the amount of time that the CDN should wait before retrying an origin request.",
        "required": false,
        "nullable": true
      },
      {
        "name": "DnsOriginPort",
        "type": "integer",
        "format": "int32",
        "description": "Determines the origin port of the pull zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "DnsOriginScheme",
        "type": "string",
        "description": "Determines the origin scheme of the pull zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "QueryStringVaryParameters",
        "type": "array",
        "description": "Contains the list of vary parameters that will be used for vary cache by query string. Only alphanumeric characters, dashes and underscores are allowed (values that contain other characters are ignorred). If empty, all parameters will be used to construct the key.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginShieldEnableConcurrencyLimit",
        "type": "boolean",
        "description": "Determines if the origin shield concurrency limit is enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginShieldMaxConcurrentRequests",
        "type": "integer",
        "format": "int32",
        "description": "Determines the number of maximum concurrent requests allowed to the origin.",
        "required": false,
        "nullable": true,
        "minimum": 1,
        "maximum": 10000
      },
      {
        "name": "EnableCookieVary",
        "type": "boolean",
        "description": "Determines if the Cookie Vary feature is enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "CookieVaryParameters",
        "type": "array",
        "description": "Contains the list of vary parameters that will be used for vary cache by cookie string.Only alphanumeric characters, dashes and underscores are allowed (values that contain other characters are ignorred). If empty, cookie vary will not be used.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableSafeHop",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginShieldQueueMaxWaitTime",
        "type": "integer",
        "format": "int32",
        "description": "Determines the max queue wait time",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginShieldMaxQueuedRequests",
        "type": "integer",
        "format": "int32",
        "description": "Determines the max number of origin requests that will remain in the queue",
        "required": false,
        "nullable": true,
        "minimum": 0,
        "maximum": 30000
      },
      {
        "name": "UseBackgroundUpdate",
        "type": "boolean",
        "description": "Determines if cache update is performed in the background.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableAutoSSL",
        "type": "boolean",
        "description": "If set to true, any hostnames added to this Pull Zone will automatically enable SSL.",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogAnonymizationType",
        "type": "integer",
        "description": "Sets the log anonymization type for this pull zone",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "OneDigit"
          },
          {
            "value": 1,
            "label": "Drop"
          }
        ]
      },
      {
        "name": "StorageZoneId",
        "type": "integer",
        "format": "int64",
        "description": "The ID of the storage zone that will be used as the origin",
        "required": false,
        "nullable": true
      },
      {
        "name": "EdgeScriptId",
        "type": "integer",
        "format": "int64",
        "description": "The ID of the edge script that will be used as the origin",
        "required": false,
        "nullable": true
      },
      {
        "name": "MiddlewareScriptId",
        "type": "integer",
        "format": "int64",
        "description": "The ID of the middleware script",
        "required": false,
        "nullable": true
      },
      {
        "name": "EdgeScriptExecutionPhase",
        "type": "integer",
        "description": "The execution phase of the edge script",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Cache"
          },
          {
            "value": 1,
            "label": "LoadBalancer"
          }
        ]
      },
      {
        "name": "OriginType",
        "type": "integer",
        "description": "Determine the type of the origin for this Pull Zone",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "OriginUrl"
          },
          {
            "value": 1,
            "label": "DnsAccelerate"
          },
          {
            "value": 2,
            "label": "StorageZone"
          },
          {
            "value": 3,
            "label": "LoadBalancer"
          },
          {
            "value": 4,
            "label": "EdgeScript"
          },
          {
            "value": 5,
            "label": "MagicContainers"
          },
          {
            "value": 6,
            "label": "PushZone"
          }
        ]
      },
      {
        "name": "MagicContainersAppId",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "MagicContainersEndpointId",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "LogFormat",
        "type": "integer",
        "description": "0 = Plain\n1 = JSON",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Plain"
          },
          {
            "value": 1,
            "label": "JSON"
          }
        ]
      },
      {
        "name": "LogForwardingFormat",
        "type": "integer",
        "description": "0 = Plain\n1 = JSON",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Plain"
          },
          {
            "value": 1,
            "label": "JSON"
          }
        ]
      },
      {
        "name": "ShieldDDosProtectionType",
        "type": "integer",
        "description": "0 = DetectOnly\n1 = ActiveStandard\n2 = ActiveAggressive",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "DetectOnly"
          },
          {
            "value": 1,
            "label": "ActiveStandard"
          },
          {
            "value": 2,
            "label": "ActiveAggressive"
          }
        ]
      },
      {
        "name": "ShieldDDosProtectionEnabled",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginHostHeader",
        "type": "string",
        "description": "Sets the host header that will be sent to the origin",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableSmartCache",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableRequestCoalescing",
        "type": "boolean",
        "description": "Determines if request coalescing is currently enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "RequestCoalescingTimeout",
        "type": "integer",
        "format": "int32",
        "description": "Determines the lock time for coalesced requests.",
        "required": false,
        "nullable": true
      },
      {
        "name": "DisableLetsEncrypt",
        "type": "boolean",
        "description": "If set to true, the built-in let's encrypt will be disabled and requests are passed to the origin.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableBunnyImageAi",
        "type": "boolean",
        "required": false,
        "nullable": true
      },
      {
        "name": "BunnyAiImageBlueprints",
        "type": "array",
        "required": false,
        "nullable": true
      },
      {
        "name": "PreloadingScreenEnabled",
        "type": "boolean",
        "description": "Determines if the preloading screen is currently enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "PreloadingScreenCode",
        "type": "string",
        "description": "The custom preloading screen coed",
        "required": false,
        "nullable": true
      },
      {
        "name": "PreloadingScreenLogoUrl",
        "type": "string",
        "description": "The preloading screen logo URL",
        "required": false,
        "nullable": true
      },
      {
        "name": "PreloadingScreenShowOnFirstVisit",
        "type": "boolean",
        "description": "Determines if the preloading screen is shown on the first load from a user.",
        "required": false,
        "nullable": false
      },
      {
        "name": "PreloadingScreenTheme",
        "type": "integer",
        "description": "The currently configured preloading screem theme. (0 - Light, 1 - Dark)",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Light"
          },
          {
            "value": 1,
            "label": "Dark"
          }
        ]
      },
      {
        "name": "PreloadingScreenCodeEnabled",
        "type": "boolean",
        "description": "Determines if the custom preloader screen should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "PreloadingScreenDelay",
        "type": "integer",
        "format": "int32",
        "description": "The delay in miliseconds after which the preloading screen will be displayed (0 - 10000ms)",
        "required": false,
        "nullable": true,
        "minimum": 0,
        "maximum": 10000
      },
      {
        "name": "RoutingFilters",
        "type": "array",
        "description": "The list of routing filters enabled for this zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "StickySessionType",
        "type": "integer",
        "description": "Whether to use a Sticky Session mechanism for this pull zone",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Off"
          },
          {
            "value": 1,
            "label": "On"
          }
        ]
      },
      {
        "name": "StickySessionCookieName",
        "type": "string",
        "description": "Sticky Session Cookie Name",
        "required": false,
        "nullable": true
      },
      {
        "name": "StickySessionClientHeaders",
        "type": "string",
        "description": "A set of comma-separated header names used to identify clients",
        "required": false,
        "nullable": true
      },
      {
        "name": "OptimizerEnableUpscaling",
        "type": "boolean",
        "description": "Determines if Optimizer is allowed to upscale images",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableWebSockets",
        "type": "boolean",
        "description": "Determines if WebSocket connections are allowed for this Pull Zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "MaxWebSocketConnections",
        "type": "integer",
        "format": "int32",
        "description": "The maximum global simultaneous WebSocket connections allowed for this Pull Zone. Allowed tiers: 500, 1,000, 2,500, 5,000, 10,000, 25,000. If you send a non-tier value, the value is rounded up to the next tier. Values over 25,000 are rejected, please contact sales if required.",
        "required": false,
        "nullable": true
      },
      {
        "name": "CacheKeyHeaders",
        "type": "string",
        "description": "Vary Cache by Request Headers (comma delimited)",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /pullzone/{}/edgerules/addorupdate": {
    "fields": [
      {
        "name": "Guid",
        "type": "string",
        "description": "The unique GUID of the edge rule",
        "required": false,
        "nullable": true
      },
      {
        "name": "ActionType",
        "type": "integer",
        "description": "The action type of the edge rule. ForceSSL = 0, Redirect = 1, OriginUrl = 2, OverrideCacheTime = 3, BlockRequest = 4, SetResponseHeader = 5, SetRequestHeader = 6, ForceDownload = 7, DisableTokenAuthentication = 8, EnableTokenAuthentication = 9, OverrideCacheTimePublic = 10, IgnoreQueryString = 11, DisableOptimizer = 12, ForceCompression = 13, SetStatusCode = 14, BypassPermaCache = 15, OverrideBrowserCacheTime = 16",
        "required": false,
        "nullable": false,
        "options": [
          {
            "value": 0,
            "label": "ForceSSL"
          },
          {
            "value": 1,
            "label": "Redirect"
          },
          {
            "value": 2,
            "label": "OriginUrl"
          },
          {
            "value": 3,
            "label": "OverrideCacheTime"
          },
          {
            "value": 4,
            "label": "BlockRequest"
          },
          {
            "value": 5,
            "label": "SetResponseHeader"
          },
          {
            "value": 6,
            "label": "SetRequestHeader"
          },
          {
            "value": 7,
            "label": "ForceDownload"
          },
          {
            "value": 8,
            "label": "DisableTokenAuthentication"
          },
          {
            "value": 9,
            "label": "EnableTokenAuthentication"
          },
          {
            "value": 10,
            "label": "OverrideCacheTimePublic"
          },
          {
            "value": 11,
            "label": "IgnoreQueryString"
          },
          {
            "value": 12,
            "label": "DisableOptimizer"
          },
          {
            "value": 13,
            "label": "ForceCompression"
          },
          {
            "value": 14,
            "label": "SetStatusCode"
          },
          {
            "value": 15,
            "label": "BypassPermaCache"
          },
          {
            "value": 16,
            "label": "OverrideBrowserCacheTime"
          },
          {
            "value": 17,
            "label": "OriginStorage"
          },
          {
            "value": 18,
            "label": "SetNetworkRateLimit"
          },
          {
            "value": 19,
            "label": "SetConnectionLimit"
          },
          {
            "value": 20,
            "label": "SetRequestsPerSecondLimit"
          },
          {
            "value": 21,
            "label": "RunEdgeScript"
          },
          {
            "value": 22,
            "label": "OriginMagicContainers"
          },
          {
            "value": 23,
            "label": "DisableWAF"
          },
          {
            "value": 24,
            "label": "RetryOrigin"
          },
          {
            "value": 25,
            "label": "OverrideBrowserCacheResponseHeader"
          },
          {
            "value": 26,
            "label": "RemoveBrowserCacheResponseHeader"
          },
          {
            "value": 27,
            "label": "DisableShieldChallenge"
          },
          {
            "value": 28,
            "label": "DisableShield"
          },
          {
            "value": 29,
            "label": "DisableShieldBotDetection"
          },
          {
            "value": 30,
            "label": "BypassAwsS3Authentication"
          },
          {
            "value": 31,
            "label": "DisableShieldAccessLists"
          },
          {
            "value": 32,
            "label": "DisableShieldRateLimiting"
          },
          {
            "value": 33,
            "label": "EnableRequestCoalescing"
          },
          {
            "value": 34,
            "label": "DisableRequestCoalescing"
          },
          {
            "value": 37,
            "label": "StripCookiesClientToOrigin"
          }
        ]
      },
      {
        "name": "ActionParameter1",
        "type": "string",
        "description": "The Action parameter 1. The value depends on other parameters of the edge rule.",
        "required": false,
        "nullable": true
      },
      {
        "name": "ActionParameter2",
        "type": "string",
        "description": "The Action parameter 2. The value depends on other parameters of the edge rule.",
        "required": false,
        "nullable": true
      },
      {
        "name": "ActionParameter3",
        "type": "string",
        "description": "The Action parameter 3. The value depends on other parameters of the edge rule.",
        "required": false,
        "nullable": true
      },
      {
        "name": "Triggers",
        "type": "array",
        "required": false,
        "nullable": true
      },
      {
        "name": "ExtraActions",
        "type": "array",
        "required": false,
        "nullable": true
      },
      {
        "name": "TriggerMatchingType",
        "type": "integer",
        "description": "The trigger matching type. MatchAny = 0, MatchAll = 1, MatchNone = 2",
        "required": false,
        "nullable": false,
        "options": [
          {
            "value": 0,
            "label": "MatchAny"
          },
          {
            "value": 1,
            "label": "MatchAll"
          },
          {
            "value": 2,
            "label": "MatchNone"
          }
        ]
      },
      {
        "name": "Description",
        "type": "string",
        "description": "The description of the edge rule",
        "required": false,
        "nullable": true
      },
      {
        "name": "Enabled",
        "type": "boolean",
        "description": "Determines if the edge rule is currently enabled or not",
        "required": false,
        "nullable": false
      },
      {
        "name": "OrderIndex",
        "type": "integer",
        "format": "int32",
        "description": "The index of the edge rule in the list of execution priority",
        "required": false,
        "nullable": false
      },
      {
        "name": "ReadOnly",
        "type": "boolean",
        "description": "Determines if the edge rule is read-only and cannot be modified or deleted",
        "required": false,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/edgerules/{}/setedgeruleenabled": {
    "fields": [
      {
        "name": "Id",
        "type": "integer",
        "format": "int64",
        "required": false,
        "nullable": false
      },
      {
        "name": "Value",
        "type": "boolean",
        "required": false,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/updateprivatekeytype": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "required": true,
        "nullable": false
      },
      {
        "name": "KeyType",
        "type": "integer",
        "description": "0 = Ecdsa\n1 = Rsa",
        "required": true,
        "nullable": false,
        "options": [
          {
            "value": 0,
            "label": "Ecdsa"
          },
          {
            "value": 1,
            "label": "Rsa"
          }
        ]
      }
    ]
  },
  "post /pullzone/requestexternaldnscertificate": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/completeexternaldnscertificate": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/requestexternalhttpcertificate": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/completeexternalhttpcertificate": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/purgecache": {
    "fields": [
      {
        "name": "CacheTag",
        "type": "string",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /pullzone/checkavailability": {
    "fields": [
      {
        "name": "Name",
        "type": "string",
        "description": "Determines the name of the zone that we are checking",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /pullzone/{}/addcertificate": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname to which the hostname will be added",
        "required": true,
        "nullable": false
      },
      {
        "name": "Certificate",
        "type": "string",
        "description": "The Base64 encoded binary data of the certificate file",
        "required": true,
        "nullable": false
      },
      {
        "name": "CertificateKey",
        "type": "string",
        "description": "The Base64 encoded binary data of the certificate key file",
        "required": true,
        "nullable": false
      }
    ]
  },
  "delete /pullzone/{}/removecertificate": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname from which the certificate will be removed",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/addhostname": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be added",
        "required": true,
        "nullable": false
      }
    ]
  },
  "delete /pullzone/{}/removehostname": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be removed",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/setforcessl": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be updated",
        "required": true,
        "nullable": false
      },
      {
        "name": "ForceSSL",
        "type": "boolean",
        "description": "Set to true to force SSL on the given pull zone hostname",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/resetsecuritykey": {
    "fields": [
      {
        "name": "SecurityKey",
        "type": "string",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /pullzone/{}/addallowedreferrer": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be added as an allowed referer",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/removeallowedreferrer": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be removed as an allowed referer",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/addblockedreferrer": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be added as a blocked referer",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/removeblockedreferrer": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be removed as an allowed referer",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/addblockedip": {
    "fields": [
      {
        "name": "BlockedIp",
        "type": "string",
        "description": "The IP that will be blocked from accessing the pull zone",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /pullzone/{}/removeblockedip": {
    "fields": [
      {
        "name": "BlockedIp",
        "type": "string",
        "description": "The IP that will be removed fromt he block list",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /storagezone": {
    "fields": [
      {
        "name": "Name",
        "type": "string",
        "description": "The name of the storage zone",
        "required": true,
        "nullable": false
      },
      {
        "name": "Region",
        "type": "string",
        "description": "The code of the main storage zone region (Possible values: DE, NY, LA, SG)",
        "required": true,
        "nullable": false
      },
      {
        "name": "ReplicationRegions",
        "type": "array",
        "description": "The code of the main storage zone region (Possible values: DE, NY, LA, SG, SYD)",
        "required": false,
        "nullable": true
      },
      {
        "name": "ZoneTier",
        "type": "integer",
        "description": "Determines the storage zone tier that will be storing the data",
        "required": false,
        "nullable": false,
        "options": [
          {
            "value": 0,
            "label": "Standard"
          },
          {
            "value": 1,
            "label": "Edge"
          }
        ]
      },
      {
        "name": "StorageZoneType",
        "type": "integer",
        "description": "The Storage Zone S3 support type",
        "required": false,
        "nullable": false,
        "options": [
          {
            "value": 0,
            "label": "NotSupported"
          },
          {
            "value": 1,
            "label": "Supported"
          }
        ]
      }
    ]
  },
  "post /storagezone/checkavailability": {
    "fields": [
      {
        "name": "Name",
        "type": "string",
        "description": "Determines the name of the zone that we are checking",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /storagezone/{}": {
    "fields": [
      {
        "name": "ReplicationZones",
        "type": "array",
        "description": "The list of replication zones enabld for the storage zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "OriginUrl",
        "type": "string",
        "description": "The origin URL of the storage zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "Custom404FilePath",
        "type": "string",
        "description": "The path to the custom file that will be returned in a case of 404",
        "required": false,
        "nullable": true
      },
      {
        "name": "Rewrite404To200",
        "type": "boolean",
        "description": "Rewrite 404 status code to 200 for URLs without extension",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /videolibrary/{}/addallowedreferrer": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be added as an allowed referer",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /videolibrary/{}/addblockedreferrer": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be added as a blocked referer",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /videolibrary": {
    "fields": [
      {
        "name": "Name",
        "type": "string",
        "description": "The name of the Video Library.",
        "required": true,
        "nullable": false
      },
      {
        "name": "ReplicationRegions",
        "type": "array",
        "description": "The geo-replication regions of the underlying storage zone",
        "required": false,
        "nullable": true
      },
      {
        "name": "PlayerVersion",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) Sets player version used for this library",
        "required": false,
        "nullable": true
      },
      {
        "name": "EncodingTier",
        "type": "integer",
        "description": "(Optional) Defines encoding tier. Premium is a paid tier that offers prioritized encoding and extra codec support.",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Free"
          },
          {
            "value": 1,
            "label": "Premium"
          }
        ]
      },
      {
        "name": "JitEncodingEnabled",
        "type": "boolean",
        "description": "(Optional) Determines whether JIT encoding should be used for the library. Supported in premium encoding only.",
        "required": false,
        "nullable": true
      },
      {
        "name": "OutputCodecs",
        "type": "string",
        "description": "(Optional) Specifies which video codecs are used for encoding, provided as a comma-separated (CSV) string. Free encoding tier supports only x264. A premium encoding tier adds support for vp9, hevc, and av1.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnabledResolutions",
        "type": "string",
        "description": "(Optional) Sets the enabled resolutions for the transcoding. At least one resolution should be enabled. Possible values: 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockNoneReferrer",
        "type": "boolean",
        "description": "(Optional) Determines if requests without a referer should be blocked.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableMP4Fallback",
        "type": "boolean",
        "description": "(Optional) Determines if MP4 fallback should be enabled for this library.",
        "required": false,
        "nullable": true
      },
      {
        "name": "KeepOriginalFiles",
        "type": "boolean",
        "description": "(Optional) Determines if the original file should be kept after the video is processed.",
        "required": false,
        "nullable": true
      },
      {
        "name": "AllowDirectPlay",
        "type": "boolean",
        "description": "(Optional) Determines if direct play URLs should be enabled for the library",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableMultiAudioTrackSupport",
        "type": "boolean",
        "description": "(Optional) Determines if multiple output audio track support is enabled on video library.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTranscribing",
        "type": "boolean",
        "description": "(Optional) Enables automatic audio transcribing for this library.",
        "required": false,
        "nullable": true
      },
      {
        "name": "TranscribingCaptionLanguages",
        "type": "array",
        "description": "(Optional) Languages that captions will be automatically transcribed to.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTranscribingTitleGeneration",
        "type": "boolean",
        "description": "(Optional) Determines if automatic transcribing title generation is enabled for this library. Enabling any smart generation feature turns on transcribing automatically.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTranscribingDescriptionGeneration",
        "type": "boolean",
        "description": "(Optional) Determines if automatic transcribing description generation is enabled for this library. Enabling any smart generation feature turns on transcribing automatically.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTranscribingChaptersGeneration",
        "type": "boolean",
        "description": "(Optional) Determines if automatic transcribing chapters generation is enabled for this library. Enabling any smart generation feature turns on transcribing automatically.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTranscribingMomentsGeneration",
        "type": "boolean",
        "description": "(Optional) Determines if automatic transcribing moments generation is enabled for this library. Enabling any smart generation feature turns on transcribing automatically.",
        "required": false,
        "nullable": true
      },
      {
        "name": "AllowEarlyPlay",
        "type": "boolean",
        "description": "(Optional) Enables Early Play. Enabling this also exposes originals via CDN settings consistent with the video library update API.",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /videolibrary/{}": {
    "fields": [
      {
        "name": "Name",
        "type": "string",
        "description": "(Optional) Sets name of the video library",
        "required": false,
        "nullable": true
      },
      {
        "name": "CustomHTML",
        "type": "string",
        "description": "(Optional) Sets the player custom HTML code",
        "required": false,
        "nullable": true
      },
      {
        "name": "PlayerKeyColor",
        "type": "string",
        "description": "(Optional) Sets the player key control color",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTokenAuthentication",
        "type": "boolean",
        "description": "(Optional) Determines if the token authentication should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTokenIPVerification",
        "type": "boolean",
        "description": "(Optional) Determines if the token IP verification should be enabled",
        "required": false,
        "nullable": true
      },
      {
        "name": "ResetToken",
        "type": "boolean",
        "description": "(Optional) Set to true to reset the CDN and embed view token key",
        "required": false,
        "nullable": true
      },
      {
        "name": "WatermarkPositionLeft",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) Sets the left offset of the watermark position (in %)",
        "required": false,
        "nullable": true
      },
      {
        "name": "WatermarkPositionTop",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) Sets the top offset of the watermark position (in %)",
        "required": false,
        "nullable": true
      },
      {
        "name": "WatermarkWidth",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) Sets the width of the watermark (in %)",
        "required": false,
        "nullable": true
      },
      {
        "name": "WatermarkHeight",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) Sets the height of the watermark (in %)",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnabledResolutions",
        "type": "string",
        "description": "(Optional) Sets the enabled resolutions for the transcoding. At least one resolution should be enabled. Possible values: 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p",
        "required": false,
        "nullable": true
      },
      {
        "name": "ViAiPublisherId",
        "type": "string",
        "description": "(Optional) Sets the vi.ai publisher ID",
        "required": false,
        "nullable": true
      },
      {
        "name": "VastTagUrl",
        "type": "string",
        "description": "(Optional) Sets the Vast tag URL",
        "required": false,
        "nullable": true
      },
      {
        "name": "WebhookUrl",
        "type": "string",
        "description": "(Optional) Sets the webhook API url",
        "required": false,
        "nullable": true
      },
      {
        "name": "CaptionsFontSize",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) Sets the captions display font size",
        "required": false,
        "nullable": true
      },
      {
        "name": "CaptionsFontColor",
        "type": "string",
        "description": "(Optional) Sets the captions display font color",
        "required": false,
        "nullable": true
      },
      {
        "name": "CaptionsBackground",
        "type": "string",
        "description": "(Optional) Sets the captions display background color",
        "required": false,
        "nullable": true
      },
      {
        "name": "UILanguage",
        "type": "string",
        "description": "(Optional) Sets the UI language of the video player.",
        "required": false,
        "nullable": true
      },
      {
        "name": "AllowEarlyPlay",
        "type": "boolean",
        "description": "(Optional) Determines if the Early-Play feature should be enabled. Enabling this will enable Expose Originals.",
        "required": false,
        "nullable": true
      },
      {
        "name": "PlayerTokenAuthenticationEnabled",
        "type": "boolean",
        "description": "(Optional) Determines if the token authentication should be enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "BlockNoneReferrer",
        "type": "boolean",
        "description": "(Optional) Determines if requests without a referer should be blocked.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableMP4Fallback",
        "type": "boolean",
        "description": "(Optional) Determines if MP4 fallback should be enabled for this library.",
        "required": false,
        "nullable": true
      },
      {
        "name": "KeepOriginalFiles",
        "type": "boolean",
        "description": "(Optional) Determines if the original file should be kept after the video is processed.",
        "required": false,
        "nullable": true
      },
      {
        "name": "AllowDirectPlay",
        "type": "boolean",
        "description": "(Optional) Determines if direct play URLs should be enabled for the library",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableDRM",
        "type": "boolean",
        "description": "(Optional) Determines if MediaCage DRM should be enabled for this library",
        "required": false,
        "nullable": true
      },
      {
        "name": "DrmVersion",
        "type": "integer",
        "description": "(Optional) Determines MediaCage DRM version to be used for this library",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Basic"
          },
          {
            "value": 1,
            "label": "Enterprise"
          },
          {
            "value": 2,
            "label": "BasicV2"
          }
        ]
      },
      {
        "name": "Controls",
        "type": "string",
        "description": "(Optional) The comma separated list of controls that will be displayed in the video player. Possible values: play-large, play, progress, current-time, mute, volume, captions, settings, pip, airplay, fullscreen.",
        "required": false,
        "nullable": true
      },
      {
        "name": "PlaybackSpeeds",
        "type": "string",
        "description": "(Optional) The comma separated list of playback speeds that will be available in the video player. Possible values: 0.25,0.5,0.75,1.0,1.25,1.5,1.75,2.0,2.5,3,3.5,4",
        "required": false,
        "nullable": true
      },
      {
        "name": "Bitrate240p",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) The bitrate used for encoding 240p videos",
        "required": false,
        "nullable": true
      },
      {
        "name": "Bitrate360p",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) The bitrate used for encoding 360p videos",
        "required": false,
        "nullable": true
      },
      {
        "name": "Bitrate480p",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) The bitrate used for encoding 480p videos",
        "required": false,
        "nullable": true
      },
      {
        "name": "Bitrate720p",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) The bitrate used for encoding 720p videos",
        "required": false,
        "nullable": true
      },
      {
        "name": "Bitrate1080p",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) The bitrate used for encoding 1080p videos",
        "required": false,
        "nullable": true
      },
      {
        "name": "Bitrate1440p",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) The bitrate used for encoding 1440p videos",
        "required": false,
        "nullable": true
      },
      {
        "name": "Bitrate2160p",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) The bitrate used for encoding 2160p videos",
        "required": false,
        "nullable": true
      },
      {
        "name": "ShowHeatmap",
        "type": "boolean",
        "description": "(Optional) Determines if the video watch heatmap should be displayed in the player.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableContentTagging",
        "type": "boolean",
        "description": "(Optional) Determines if content tagging should be enabled for this library.",
        "required": false,
        "nullable": true
      },
      {
        "name": "FontFamily",
        "type": "string",
        "description": "(Optional) The captions font family.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTranscribing",
        "type": "boolean",
        "description": "(Optional) Determines if the automatic audio transcribing is currently enabled for this zone.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTranscribingTitleGeneration",
        "type": "boolean",
        "description": "(Optional) Determines if automatic transcribing title generation is currently enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTranscribingDescriptionGeneration",
        "type": "boolean",
        "description": "(Optional) Determines if automatic transcribing description generation is currently enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTranscribingChaptersGeneration",
        "type": "boolean",
        "description": "(Optional) Determines if automatic transcribing chapters generation is currently enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableTranscribingMomentsGeneration",
        "type": "boolean",
        "description": "(Optional) Determines if automatic transcribing moments generation is currently enabled.",
        "required": false,
        "nullable": true
      },
      {
        "name": "TranscribingCaptionLanguages",
        "type": "array",
        "description": "(Optional) The list of languages that the captions will be automatically transcribed to.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableCaptionsInPlaylist",
        "type": "boolean",
        "description": "(Optional) Determines if any associated captions will be automatically signaled in the HLS master playlist via EXT-X-MEDIA tags, allowing client players to show captions.",
        "required": false,
        "nullable": true
      },
      {
        "name": "RememberPlayerPosition",
        "type": "boolean",
        "description": "(Optional) Determines if the player will automatically remember the playback position.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableMultiAudioTrackSupport",
        "type": "boolean",
        "description": "(Optional) Determines if multiple output audio track support is enabled on video library.",
        "required": false,
        "nullable": true
      },
      {
        "name": "UseSeparateAudioStream",
        "type": "boolean",
        "description": "(Optional) Determines whether output audio stream should be split from video stream segments.",
        "required": false,
        "nullable": true
      },
      {
        "name": "JitEncodingEnabled",
        "type": "boolean",
        "description": "(Optional) Determines whether JIT encoding should be used for the library. Supported in premium encoding only.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EncodingTier",
        "type": "integer",
        "description": "(Optional) Defines encoding tier to be used with video library. premium is a paid tier that offers either JIT encoding or prioritized encoding and extra codec support.",
        "required": false,
        "nullable": true,
        "options": [
          {
            "value": 0,
            "label": "Free"
          },
          {
            "value": 1,
            "label": "Premium"
          }
        ]
      },
      {
        "name": "OutputCodecs",
        "type": "string",
        "description": "(Optional) Specifies which video codecs are used for encoding, provided as a comma-separated (CSV) string. Free encoding tier supports only x264. A premium encoding tier adds support for vp9, hevc, and av1.",
        "required": false,
        "nullable": true
      },
      {
        "name": "AppleFairPlayDrm",
        "type": "object",
        "description": "(Optional) Configure Apple FairPlay DRM. Works only if Enterprise DRM is set up.",
        "required": false,
        "nullable": true
      },
      {
        "name": "GoogleWidevineDrm",
        "type": "object",
        "description": "(Optional) Configure Google Widevine DRM. Works only if Enterprise DRM is set up.",
        "required": false,
        "nullable": true
      },
      {
        "name": "PlayerVersion",
        "type": "integer",
        "format": "int32",
        "description": "(Optional) Sets player version used for this library",
        "required": false,
        "nullable": true
      },
      {
        "name": "RemoveMetadataFromFallbackVideos",
        "type": "boolean",
        "description": "(Optional) Marks whether all potential video metadata should be removed from the fallback files",
        "required": false,
        "nullable": true
      },
      {
        "name": "ScaleVideoUsingBothDimensions",
        "type": "boolean",
        "description": "(Optional) Marks whether videos should be scaled using both dimensions. Prevents videos being upscaled or unexpected aspect ratio changes.",
        "required": false,
        "nullable": true
      },
      {
        "name": "ExposeOriginals",
        "type": "boolean",
        "description": "(Optional) Marks whether original video files should be exposed via CDN. Originals are not protected by DRM. Enabling Early-Play will enable this.",
        "required": false,
        "nullable": true
      },
      {
        "name": "ExposeVideoMetadata",
        "type": "boolean",
        "description": "(Optional) Marks whether video metadata in form of schema meta tags and LD+JSON should be exposed.",
        "required": false,
        "nullable": true
      },
      {
        "name": "EnableCompactControls",
        "type": "boolean",
        "description": "(Optional) Marks whether compact controls should be enabled for the player.",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /videolibrary/{}/removeallowedreferrer": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be removed as an allowed referer",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /videolibrary/{}/removeblockedreferrer": {
    "fields": [
      {
        "name": "Hostname",
        "type": "string",
        "description": "The hostname that will be removed as a blocked referer",
        "required": true,
        "nullable": false
      }
    ]
  },
  "post /user/closeaccount": {
    "fields": [
      {
        "name": "Password",
        "type": "string",
        "required": false,
        "nullable": true
      },
      {
        "name": "Reason",
        "type": "string",
        "required": false,
        "nullable": true
      }
    ]
  },
  "post /dnszone/records/scan": {
    "fields": [
      {
        "name": "ZoneId",
        "type": "integer",
        "format": "int64",
        "description": "The ID of the DNS Zone to scan. Either ZoneId or Domain must be provided, but not both.",
        "required": false,
        "nullable": true
      },
      {
        "name": "Domain",
        "type": "string",
        "description": "The domain name to scan. Either ZoneId or Domain must be provided, but not both. Can be used even before creating the DNS zone.",
        "required": false,
        "nullable": true
      }
    ]
  }
}

function operationSignature(operation: Operation) {
  const signature = `${operation.method} ${operation.path}`
    .toLowerCase()
    .replace(/\{[^}]+\}/g, '{}')
  return signature
}

export function requestBodyExample(operation: Operation): string | null {
  return REQUEST_EXAMPLES[operationSignature(operation)] ?? null
}

export function requestBodySchema(operation: Operation): RequestBodySchema | null {
  return REQUEST_SCHEMAS[operationSignature(operation)] ?? null
}
