const a={"post /dnszone":`{
  "Domain": "example.com",
  "Records": []
}`,"post /dnszone/{}":`{
  "CustomNameserversEnabled": false,
  "Nameserver1": "string",
  "Nameserver2": "string",
  "SoaEmail": "admin@example.com",
  "LoggingEnabled": false,
  "LogAnonymizationType": 0,
  "CertificateKeyType": 0,
  "LoggingIPAnonymizationEnabled": false
}`,"post /dnszone/checkavailability":`{
  "Name": "example"
}`,"put /dnszone/{}/records":`{
  "Type": 0,
  "Ttl": 0,
  "Value": "string",
  "Name": "example",
  "Weight": 0,
  "Priority": 0,
  "Flags": 0,
  "Tag": "string",
  "Port": 0,
  "PullZoneId": 0,
  "ScriptId": 0,
  "Accelerated": false,
  "MonitorType": 0,
  "GeolocationLatitude": 0,
  "GeolocationLongitude": 0,
  "LatencyZone": "string",
  "SmartRoutingType": 0,
  "Disabled": false,
  "EnviromentalVariables": [],
  "Comment": "string",
  "AutoSslIssuance": false
}`,"post /dnszone/{}/records/{}":`{
  "Type": 0,
  "Ttl": 0,
  "Value": "string",
  "Name": "example",
  "Weight": 0,
  "Priority": 0,
  "Flags": 0,
  "Tag": "string",
  "Port": 0,
  "PullZoneId": 0,
  "ScriptId": 0,
  "Accelerated": false,
  "MonitorType": 0,
  "GeolocationLatitude": 0,
  "GeolocationLongitude": 0,
  "LatencyZone": "string",
  "SmartRoutingType": 0,
  "Disabled": false,
  "EnviromentalVariables": [],
  "Comment": "string",
  "AutoSslIssuance": false,
  "Id": 0
}`,"post /dnszone/{}/certificate/issue":`{
  "Domain": "example.com"
}`,"post /pullzone":`{
  "OriginUrl": "https://example.com",
  "AllowedReferrers": [],
  "BlockedReferrers": [],
  "BlockNoneReferrer": false,
  "BlockedIps": [],
  "EnableGeoZoneUS": false,
  "EnableGeoZoneEU": false,
  "EnableGeoZoneASIA": false,
  "EnableGeoZoneSA": false,
  "EnableGeoZoneAF": false,
  "IpFamilyPolicy": 0,
  "BlockRootPathAccess": false,
  "BlockPostRequests": false,
  "EnableQueryStringOrdering": false,
  "EnableWebpVary": false,
  "EnableAvifVary": false,
  "EnableMobileVary": false,
  "EnableCountryCodeVary": false,
  "EnableCountryStateCodeVary": false,
  "EnableHostnameVary": false,
  "EnableCacheSlice": false,
  "ZoneSecurityEnabled": false,
  "ZoneSecurityIncludeHashRemoteIP": false,
  "IgnoreQueryStrings": false,
  "MonthlyBandwidthLimit": 0,
  "AccessControlOriginHeaderExtensions": [],
  "EnableAccessControlOriginHeader": false,
  "DisableCookies": false,
  "BudgetRedirectedCountries": [],
  "BlockedCountries": [],
  "CacheControlMaxAgeOverride": 0,
  "CacheControlPublicMaxAgeOverride": 0,
  "CacheControlBrowserMaxAgeOverride": 0,
  "AddHostHeader": false,
  "AddCanonicalHeader": false,
  "EnableLogging": false,
  "LoggingIPAnonymizationEnabled": false,
  "PermaCacheStorageZoneId": 0,
  "PermaCacheType": 0,
  "AWSSigningEnabled": false,
  "AWSSigningKey": "replace-me",
  "AWSSigningRegionName": "string",
  "AWSSigningSecret": "string",
  "EnableOriginShield": false,
  "OriginShieldZoneCode": "string",
  "EnableTLS1": false,
  "EnableTLS1_1": false,
  "CacheErrorResponses": false,
  "VerifyOriginSSL": false,
  "LogForwardingEnabled": false,
  "LogForwardingHostname": "cdn.example.com",
  "LogForwardingPort": 0,
  "LogForwardingToken": "replace-me",
  "LogForwardingProtocol": 0,
  "LoggingSaveToStorage": false,
  "LoggingStorageZoneId": 0,
  "FollowRedirects": false,
  "ConnectionLimitPerIPCount": 0,
  "RequestLimit": 0,
  "LimitRateAfter": 0,
  "LimitRatePerSecond": 0,
  "BurstSize": 0,
  "ErrorPageEnableCustomCode": false,
  "ErrorPageCustomCode": "string",
  "ErrorPageEnableStatuspageWidget": false,
  "ErrorPageStatuspageCode": "string",
  "ErrorPageWhitelabel": false,
  "OptimizerEnabled": false,
  "OptimizerTunnelEnabled": false,
  "OptimizerDesktopMaxWidth": 0,
  "OptimizerMobileMaxWidth": 0,
  "OptimizerImageQuality": 1,
  "OptimizerMobileImageQuality": 1,
  "OptimizerEnableWebP": false,
  "OptimizerPrerenderHtml": false,
  "OptimizerEnableManipulationEngine": false,
  "OptimizerMinifyCSS": false,
  "OptimizerMinifyJavaScript": false,
  "OptimizerWatermarkEnabled": false,
  "OptimizerWatermarkUrl": "https://example.com",
  "OptimizerWatermarkPosition": 0,
  "OptimizerWatermarkOffset": 0,
  "OptimizerWatermarkMinImageSize": 0,
  "OptimizerAutomaticOptimizationEnabled": false,
  "OptimizerClasses": [],
  "OptimizerForceClasses": false,
  "OptimizerStaticHtmlEnabled": false,
  "OptimizerStaticHtmlWordPressPath": "string",
  "OptimizerStaticHtmlWordPressBypassCookie": "string",
  "Type": 0,
  "OriginRetries": 0,
  "OriginConnectTimeout": 0,
  "OriginResponseTimeout": 0,
  "UseStaleWhileUpdating": false,
  "UseStaleWhileOffline": false,
  "OriginRetry5XXResponses": false,
  "OriginRetryConnectionTimeout": false,
  "OriginRetryResponseTimeout": false,
  "OriginRetryDelay": 0,
  "DnsOriginPort": 0,
  "DnsOriginScheme": "string",
  "QueryStringVaryParameters": [],
  "OriginShieldEnableConcurrencyLimit": false,
  "OriginShieldMaxConcurrentRequests": 1,
  "EnableCookieVary": false,
  "CookieVaryParameters": [],
  "EnableSafeHop": false,
  "OriginShieldQueueMaxWaitTime": 0,
  "OriginShieldMaxQueuedRequests": 0,
  "UseBackgroundUpdate": false,
  "EnableAutoSSL": false,
  "LogAnonymizationType": 0,
  "StorageZoneId": 0,
  "EdgeScriptId": 0,
  "MiddlewareScriptId": 0,
  "EdgeScriptExecutionPhase": 0,
  "OriginType": 0,
  "MagicContainersAppId": "string",
  "MagicContainersEndpointId": "string",
  "LogFormat": 0,
  "LogForwardingFormat": 0,
  "ShieldDDosProtectionType": 0,
  "ShieldDDosProtectionEnabled": false,
  "OriginHostHeader": "string",
  "EnableSmartCache": false,
  "EnableRequestCoalescing": false,
  "RequestCoalescingTimeout": 0,
  "DisableLetsEncrypt": false,
  "EnableBunnyImageAi": false,
  "BunnyAiImageBlueprints": [],
  "PreloadingScreenEnabled": false,
  "PreloadingScreenCode": "string",
  "PreloadingScreenLogoUrl": "https://example.com",
  "PreloadingScreenShowOnFirstVisit": false,
  "PreloadingScreenTheme": 0,
  "PreloadingScreenCodeEnabled": false,
  "PreloadingScreenDelay": 0,
  "RoutingFilters": [],
  "StickySessionType": 0,
  "StickySessionCookieName": "string",
  "StickySessionClientHeaders": "string",
  "OptimizerEnableUpscaling": false,
  "EnableWebSockets": false,
  "MaxWebSocketConnections": 0,
  "CacheKeyHeaders": "replace-me",
  "Name": "example"
}`,"post /pullzone/{}":`{
  "OriginUrl": "https://example.com",
  "AllowedReferrers": [],
  "BlockedReferrers": [],
  "BlockNoneReferrer": false,
  "BlockedIps": [],
  "EnableGeoZoneUS": false,
  "EnableGeoZoneEU": false,
  "EnableGeoZoneASIA": false,
  "EnableGeoZoneSA": false,
  "EnableGeoZoneAF": false,
  "IpFamilyPolicy": 0,
  "BlockRootPathAccess": false,
  "BlockPostRequests": false,
  "EnableQueryStringOrdering": false,
  "EnableWebpVary": false,
  "EnableAvifVary": false,
  "EnableMobileVary": false,
  "EnableCountryCodeVary": false,
  "EnableCountryStateCodeVary": false,
  "EnableHostnameVary": false,
  "EnableCacheSlice": false,
  "ZoneSecurityEnabled": false,
  "ZoneSecurityIncludeHashRemoteIP": false,
  "IgnoreQueryStrings": false,
  "MonthlyBandwidthLimit": 0,
  "AccessControlOriginHeaderExtensions": [],
  "EnableAccessControlOriginHeader": false,
  "DisableCookies": false,
  "BudgetRedirectedCountries": [],
  "BlockedCountries": [],
  "CacheControlMaxAgeOverride": 0,
  "CacheControlPublicMaxAgeOverride": 0,
  "CacheControlBrowserMaxAgeOverride": 0,
  "AddHostHeader": false,
  "AddCanonicalHeader": false,
  "EnableLogging": false,
  "LoggingIPAnonymizationEnabled": false,
  "PermaCacheStorageZoneId": 0,
  "PermaCacheType": 0,
  "AWSSigningEnabled": false,
  "AWSSigningKey": "replace-me",
  "AWSSigningRegionName": "string",
  "AWSSigningSecret": "string",
  "EnableOriginShield": false,
  "OriginShieldZoneCode": "string",
  "EnableTLS1": false,
  "EnableTLS1_1": false,
  "CacheErrorResponses": false,
  "VerifyOriginSSL": false,
  "LogForwardingEnabled": false,
  "LogForwardingHostname": "cdn.example.com",
  "LogForwardingPort": 0,
  "LogForwardingToken": "replace-me",
  "LogForwardingProtocol": 0,
  "LoggingSaveToStorage": false,
  "LoggingStorageZoneId": 0,
  "FollowRedirects": false,
  "ConnectionLimitPerIPCount": 0,
  "RequestLimit": 0,
  "LimitRateAfter": 0,
  "LimitRatePerSecond": 0,
  "BurstSize": 0,
  "ErrorPageEnableCustomCode": false,
  "ErrorPageCustomCode": "string",
  "ErrorPageEnableStatuspageWidget": false,
  "ErrorPageStatuspageCode": "string",
  "ErrorPageWhitelabel": false,
  "OptimizerEnabled": false,
  "OptimizerTunnelEnabled": false,
  "OptimizerDesktopMaxWidth": 0,
  "OptimizerMobileMaxWidth": 0,
  "OptimizerImageQuality": 1,
  "OptimizerMobileImageQuality": 1,
  "OptimizerEnableWebP": false,
  "OptimizerPrerenderHtml": false,
  "OptimizerEnableManipulationEngine": false,
  "OptimizerMinifyCSS": false,
  "OptimizerMinifyJavaScript": false,
  "OptimizerWatermarkEnabled": false,
  "OptimizerWatermarkUrl": "https://example.com",
  "OptimizerWatermarkPosition": 0,
  "OptimizerWatermarkOffset": 0,
  "OptimizerWatermarkMinImageSize": 0,
  "OptimizerAutomaticOptimizationEnabled": false,
  "OptimizerClasses": [],
  "OptimizerForceClasses": false,
  "OptimizerStaticHtmlEnabled": false,
  "OptimizerStaticHtmlWordPressPath": "string",
  "OptimizerStaticHtmlWordPressBypassCookie": "string",
  "Type": 0,
  "OriginRetries": 0,
  "OriginConnectTimeout": 0,
  "OriginResponseTimeout": 0,
  "UseStaleWhileUpdating": false,
  "UseStaleWhileOffline": false,
  "OriginRetry5XXResponses": false,
  "OriginRetryConnectionTimeout": false,
  "OriginRetryResponseTimeout": false,
  "OriginRetryDelay": 0,
  "DnsOriginPort": 0,
  "DnsOriginScheme": "string",
  "QueryStringVaryParameters": [],
  "OriginShieldEnableConcurrencyLimit": false,
  "OriginShieldMaxConcurrentRequests": 1,
  "EnableCookieVary": false,
  "CookieVaryParameters": [],
  "EnableSafeHop": false,
  "OriginShieldQueueMaxWaitTime": 0,
  "OriginShieldMaxQueuedRequests": 0,
  "UseBackgroundUpdate": false,
  "EnableAutoSSL": false,
  "LogAnonymizationType": 0,
  "StorageZoneId": 0,
  "EdgeScriptId": 0,
  "MiddlewareScriptId": 0,
  "EdgeScriptExecutionPhase": 0,
  "OriginType": 0,
  "MagicContainersAppId": "string",
  "MagicContainersEndpointId": "string",
  "LogFormat": 0,
  "LogForwardingFormat": 0,
  "ShieldDDosProtectionType": 0,
  "ShieldDDosProtectionEnabled": false,
  "OriginHostHeader": "string",
  "EnableSmartCache": false,
  "EnableRequestCoalescing": false,
  "RequestCoalescingTimeout": 0,
  "DisableLetsEncrypt": false,
  "EnableBunnyImageAi": false,
  "BunnyAiImageBlueprints": [],
  "PreloadingScreenEnabled": false,
  "PreloadingScreenCode": "string",
  "PreloadingScreenLogoUrl": "https://example.com",
  "PreloadingScreenShowOnFirstVisit": false,
  "PreloadingScreenTheme": 0,
  "PreloadingScreenCodeEnabled": false,
  "PreloadingScreenDelay": 0,
  "RoutingFilters": [],
  "StickySessionType": 0,
  "StickySessionCookieName": "string",
  "StickySessionClientHeaders": "string",
  "OptimizerEnableUpscaling": false,
  "EnableWebSockets": false,
  "MaxWebSocketConnections": 0,
  "CacheKeyHeaders": "replace-me"
}`,"post /pullzone/{}/edgerules/addorupdate":`{
  "Guid": "string",
  "ActionType": 0,
  "ActionParameter1": "string",
  "ActionParameter2": "string",
  "ActionParameter3": "string",
  "Triggers": [],
  "ExtraActions": [],
  "TriggerMatchingType": 0,
  "Description": "203.0.113.10",
  "Enabled": false,
  "OrderIndex": 0,
  "ReadOnly": false
}`,"post /pullzone/{}/edgerules/{}/setedgeruleenabled":`{
  "Id": 0,
  "Value": false
}`,"post /pullzone/{}/updateprivatekeytype":`{
  "Hostname": "cdn.example.com",
  "KeyType": 0
}`,"post /pullzone/requestexternaldnscertificate":`{
  "Hostname": "cdn.example.com"
}`,"post /pullzone/completeexternaldnscertificate":`{
  "Hostname": "cdn.example.com"
}`,"post /pullzone/requestexternalhttpcertificate":`{
  "Hostname": "cdn.example.com"
}`,"post /pullzone/completeexternalhttpcertificate":`{
  "Hostname": "cdn.example.com"
}`,"post /pullzone/{}/purgecache":`{
  "CacheTag": "string"
}`,"post /pullzone/checkavailability":`{
  "Name": "example"
}`,"post /pullzone/{}/addcertificate":`{
  "Hostname": "cdn.example.com",
  "Certificate": "string",
  "CertificateKey": "replace-me"
}`,"delete /pullzone/{}/removecertificate":`{
  "Hostname": "cdn.example.com"
}`,"post /pullzone/{}/addhostname":`{
  "Hostname": "cdn.example.com"
}`,"delete /pullzone/{}/removehostname":`{
  "Hostname": "cdn.example.com"
}`,"post /pullzone/{}/setforcessl":`{
  "Hostname": "cdn.example.com",
  "ForceSSL": false
}`,"post /pullzone/{}/resetsecuritykey":`{
  "SecurityKey": "replace-me"
}`,"post /pullzone/{}/addallowedreferrer":`{
  "Hostname": "cdn.example.com"
}`,"post /pullzone/{}/removeallowedreferrer":`{
  "Hostname": "cdn.example.com"
}`,"post /pullzone/{}/addblockedreferrer":`{
  "Hostname": "cdn.example.com"
}`,"post /pullzone/{}/removeblockedreferrer":`{
  "Hostname": "cdn.example.com"
}`,"post /pullzone/{}/addblockedip":`{
  "BlockedIp": "203.0.113.10"
}`,"post /pullzone/{}/removeblockedip":`{
  "BlockedIp": "203.0.113.10"
}`,"post /storagezone":`{
  "Name": "example",
  "Region": "string",
  "ReplicationRegions": [],
  "ZoneTier": 0,
  "StorageZoneType": 0
}`,"post /storagezone/checkavailability":`{
  "Name": "example"
}`,"post /storagezone/{}":`{
  "ReplicationZones": [],
  "OriginUrl": "https://example.com",
  "Custom404FilePath": "string",
  "Rewrite404To200": false
}`,"post /videolibrary/{}/addallowedreferrer":`{
  "Hostname": "cdn.example.com"
}`,"post /videolibrary/{}/addblockedreferrer":`{
  "Hostname": "cdn.example.com"
}`,"post /videolibrary":`{
  "Name": "example",
  "ReplicationRegions": [],
  "PlayerVersion": 0,
  "EncodingTier": 0,
  "JitEncodingEnabled": false,
  "OutputCodecs": "string",
  "EnabledResolutions": "string",
  "BlockNoneReferrer": false,
  "EnableMP4Fallback": false,
  "KeepOriginalFiles": false,
  "AllowDirectPlay": false,
  "EnableMultiAudioTrackSupport": false,
  "EnableTranscribing": false,
  "TranscribingCaptionLanguages": [],
  "EnableTranscribingTitleGeneration": false,
  "EnableTranscribingDescriptionGeneration": false,
  "EnableTranscribingChaptersGeneration": false,
  "EnableTranscribingMomentsGeneration": false,
  "AllowEarlyPlay": false
}`,"post /videolibrary/{}":`{
  "Name": "example",
  "CustomHTML": "string",
  "PlayerKeyColor": "replace-me",
  "EnableTokenAuthentication": false,
  "EnableTokenIPVerification": false,
  "ResetToken": false,
  "WatermarkPositionLeft": 0,
  "WatermarkPositionTop": 0,
  "WatermarkWidth": 0,
  "WatermarkHeight": 0,
  "EnabledResolutions": "string",
  "ViAiPublisherId": "203.0.113.10",
  "VastTagUrl": "https://example.com",
  "WebhookUrl": "https://example.com",
  "CaptionsFontSize": 0,
  "CaptionsFontColor": "string",
  "CaptionsBackground": "string",
  "UILanguage": "string",
  "AllowEarlyPlay": false,
  "PlayerTokenAuthenticationEnabled": false,
  "BlockNoneReferrer": false,
  "EnableMP4Fallback": false,
  "KeepOriginalFiles": false,
  "AllowDirectPlay": false,
  "EnableDRM": false,
  "DrmVersion": 0,
  "Controls": "string",
  "PlaybackSpeeds": "string",
  "Bitrate240p": 0,
  "Bitrate360p": 0,
  "Bitrate480p": 0,
  "Bitrate720p": 0,
  "Bitrate1080p": 0,
  "Bitrate1440p": 0,
  "Bitrate2160p": 0,
  "ShowHeatmap": false,
  "EnableContentTagging": false,
  "FontFamily": "string",
  "EnableTranscribing": false,
  "EnableTranscribingTitleGeneration": false,
  "EnableTranscribingDescriptionGeneration": false,
  "EnableTranscribingChaptersGeneration": false,
  "EnableTranscribingMomentsGeneration": false,
  "TranscribingCaptionLanguages": [],
  "EnableCaptionsInPlaylist": false,
  "RememberPlayerPosition": false,
  "EnableMultiAudioTrackSupport": false,
  "UseSeparateAudioStream": false,
  "JitEncodingEnabled": false,
  "EncodingTier": 0,
  "OutputCodecs": "string",
  "AppleFairPlayDrm": {
    "Enabled": false
  },
  "GoogleWidevineDrm": {
    "Enabled": false,
    "SdOnlyForL3": false,
    "MinClientSecurityLevel": 0
  },
  "PlayerVersion": 0,
  "RemoveMetadataFromFallbackVideos": false,
  "ScaleVideoUsingBothDimensions": false,
  "ExposeOriginals": false,
  "ExposeVideoMetadata": false,
  "EnableCompactControls": false
}`,"post /videolibrary/{}/removeallowedreferrer":`{
  "Hostname": "cdn.example.com"
}`,"post /videolibrary/{}/removeblockedreferrer":`{
  "Hostname": "cdn.example.com"
}`,"post /user/closeaccount":`{
  "Password": "change-me",
  "Reason": "string"
}`,"post /dnszone/records/scan":`{
  "ZoneId": 0,
  "Domain": "example.com"
}`},t={"post /dnszone":{fields:[{name:"Domain",type:"string",description:"The domain that will be added.",required:!0,nullable:!1},{name:"Records",type:"array",description:"Optional array of DNS records to add when creating the zone.",required:!1,nullable:!0}]},"post /dnszone/{}":{fields:[{name:"CustomNameserversEnabled",type:"boolean",required:!1,nullable:!0},{name:"Nameserver1",type:"string",required:!1,nullable:!0},{name:"Nameserver2",type:"string",required:!1,nullable:!0},{name:"SoaEmail",type:"string",required:!1,nullable:!0},{name:"LoggingEnabled",type:"boolean",required:!1,nullable:!0},{name:"LogAnonymizationType",type:"integer",description:"Gets the log anonymization type for this zone",required:!1,nullable:!0,options:[{value:0,label:"OneDigit"},{value:1,label:"Drop"}]},{name:"CertificateKeyType",type:"integer",description:"Sets the certificate private key type for wildcard certificates for this zone",required:!1,nullable:!0,options:[{value:0,label:"Ecdsa"},{value:1,label:"Rsa"}]},{name:"LoggingIPAnonymizationEnabled",type:"boolean",description:"Determines if the log anonoymization should be enabled",required:!1,nullable:!0}]},"post /dnszone/checkavailability":{fields:[{name:"Name",type:"string",description:"Determines the name of the zone that we are checking",required:!1,nullable:!0}]},"put /dnszone/{}/records":{fields:[{name:"Type",type:"integer",description:`0 = A
1 = AAAA
2 = CNAME
3 = TXT
4 = MX
5 = Redirect
6 = Flatten
7 = PullZone
8 = SRV
9 = CAA
10 = PTR
11 = Script
12 = NS
13 = SVCB
14 = HTTPS
15 = TLSA`,required:!1,nullable:!0,options:[{value:0,label:"A"},{value:1,label:"AAAA"},{value:2,label:"CNAME"},{value:3,label:"TXT"},{value:4,label:"MX"},{value:5,label:"Redirect"},{value:6,label:"Flatten"},{value:7,label:"PullZone"},{value:8,label:"SRV"},{value:9,label:"CAA"},{value:10,label:"PTR"},{value:11,label:"Script"},{value:12,label:"NS"},{value:13,label:"SVCB"},{value:14,label:"HTTPS"},{value:15,label:"TLSA"}]},{name:"Ttl",type:"integer",format:"int32",required:!1,nullable:!0},{name:"Value",type:"string",required:!1,nullable:!0},{name:"Name",type:"string",required:!1,nullable:!0},{name:"Weight",type:"integer",format:"int32",required:!1,nullable:!0},{name:"Priority",type:"integer",format:"int32",required:!1,nullable:!0},{name:"Flags",type:"integer",format:"byte",required:!1,nullable:!0},{name:"Tag",type:"string",required:!1,nullable:!0},{name:"Port",type:"integer",format:"int32",required:!1,nullable:!0},{name:"PullZoneId",type:"integer",format:"int64",required:!1,nullable:!0},{name:"ScriptId",type:"integer",format:"int64",required:!1,nullable:!0},{name:"Accelerated",type:"boolean",required:!1,nullable:!0},{name:"MonitorType",type:"integer",description:`0 = None
1 = Ping
2 = Http
3 = Monitor`,required:!1,nullable:!0,options:[{value:0,label:"None"},{value:1,label:"Ping"},{value:2,label:"Http"},{value:3,label:"Monitor"}]},{name:"GeolocationLatitude",type:"number",format:"double",required:!1,nullable:!0},{name:"GeolocationLongitude",type:"number",format:"double",required:!1,nullable:!0},{name:"LatencyZone",type:"string",required:!1,nullable:!0},{name:"SmartRoutingType",type:"integer",description:`0 = None
1 = Latency
2 = Geolocation`,required:!1,nullable:!0,options:[{value:0,label:"None"},{value:1,label:"Latency"},{value:2,label:"Geolocation"}]},{name:"Disabled",type:"boolean",required:!1,nullable:!0},{name:"EnviromentalVariables",type:"array",required:!1,nullable:!0},{name:"Comment",type:"string",required:!1,nullable:!0},{name:"AutoSslIssuance",type:"boolean",required:!1,nullable:!0}]},"post /dnszone/{}/records/{}":{fields:[{name:"Type",type:"integer",description:`0 = A
1 = AAAA
2 = CNAME
3 = TXT
4 = MX
5 = Redirect
6 = Flatten
7 = PullZone
8 = SRV
9 = CAA
10 = PTR
11 = Script
12 = NS
13 = SVCB
14 = HTTPS
15 = TLSA`,required:!1,nullable:!0,options:[{value:0,label:"A"},{value:1,label:"AAAA"},{value:2,label:"CNAME"},{value:3,label:"TXT"},{value:4,label:"MX"},{value:5,label:"Redirect"},{value:6,label:"Flatten"},{value:7,label:"PullZone"},{value:8,label:"SRV"},{value:9,label:"CAA"},{value:10,label:"PTR"},{value:11,label:"Script"},{value:12,label:"NS"},{value:13,label:"SVCB"},{value:14,label:"HTTPS"},{value:15,label:"TLSA"}]},{name:"Ttl",type:"integer",format:"int32",required:!1,nullable:!0},{name:"Value",type:"string",required:!1,nullable:!0},{name:"Name",type:"string",required:!1,nullable:!0},{name:"Weight",type:"integer",format:"int32",required:!1,nullable:!0},{name:"Priority",type:"integer",format:"int32",required:!1,nullable:!0},{name:"Flags",type:"integer",format:"byte",required:!1,nullable:!0},{name:"Tag",type:"string",required:!1,nullable:!0},{name:"Port",type:"integer",format:"int32",required:!1,nullable:!0},{name:"PullZoneId",type:"integer",format:"int64",required:!1,nullable:!0},{name:"ScriptId",type:"integer",format:"int64",required:!1,nullable:!0},{name:"Accelerated",type:"boolean",required:!1,nullable:!0},{name:"MonitorType",type:"integer",description:`0 = None
1 = Ping
2 = Http
3 = Monitor`,required:!1,nullable:!0,options:[{value:0,label:"None"},{value:1,label:"Ping"},{value:2,label:"Http"},{value:3,label:"Monitor"}]},{name:"GeolocationLatitude",type:"number",format:"double",required:!1,nullable:!0},{name:"GeolocationLongitude",type:"number",format:"double",required:!1,nullable:!0},{name:"LatencyZone",type:"string",required:!1,nullable:!0},{name:"SmartRoutingType",type:"integer",description:`0 = None
1 = Latency
2 = Geolocation`,required:!1,nullable:!0,options:[{value:0,label:"None"},{value:1,label:"Latency"},{value:2,label:"Geolocation"}]},{name:"Disabled",type:"boolean",required:!1,nullable:!0},{name:"EnviromentalVariables",type:"array",required:!1,nullable:!0},{name:"Comment",type:"string",required:!1,nullable:!0},{name:"AutoSslIssuance",type:"boolean",required:!1,nullable:!0},{name:"Id",type:"integer",format:"int64",required:!1,nullable:!1}]},"post /dnszone/{}/certificate/issue":{fields:[{name:"Domain",type:"string",required:!1,nullable:!0}]},"post /pullzone":{fields:[{name:"OriginUrl",type:"string",description:"Sets the origin URL of the Pull Zone",required:!1,nullable:!0},{name:"AllowedReferrers",type:"array",description:"Sets the list of referrer hostnames that are allowed to access the pull zone. Requests containing the header Referer: hostname that is not on the list will be rejected. If empty, all the referrers are allowed",required:!1,nullable:!0},{name:"BlockedReferrers",type:"array",description:"Sets the list of referrer hostnames that are blocked from accessing the pull zone.",required:!1,nullable:!0},{name:"BlockNoneReferrer",type:"boolean",required:!1,nullable:!0},{name:"BlockedIps",type:"array",description:"Sets the list of IPs that are blocked from accessing the pull zone. Requests coming from the following IPs will be rejected. If empty, all the IPs will be allowed",required:!1,nullable:!0},{name:"EnableGeoZoneUS",type:"boolean",description:"Determines if the delivery from the North America region should be enabled for this pull zone",required:!1,nullable:!0},{name:"EnableGeoZoneEU",type:"boolean",description:"Determines if the delivery from the Europe region should be enabled for this pull zone",required:!1,nullable:!0},{name:"EnableGeoZoneASIA",type:"boolean",description:"Determines if the delivery from the Asia / Oceania regions should be enabled for this pull zone",required:!1,nullable:!0},{name:"EnableGeoZoneSA",type:"boolean",description:"Determines if the delivery from the South America region should be enabled for this pull zone",required:!1,nullable:!0},{name:"EnableGeoZoneAF",type:"boolean",description:"Determines if the delivery from the Africa region should be enabled for this pull zone",required:!1,nullable:!0},{name:"IpFamilyPolicy",type:"integer",description:"Address-family policy: 0=IPv4Only, 1=DualStack (default, best latency and compatibility), 2=DualStackPreferIPv6, 3=IPv6Only.",required:!1,nullable:!0,options:[{value:0,label:"IPv4Only"},{value:1,label:"DualStack"},{value:2,label:"DualStackPreferIPv6"},{value:3,label:"IPv6Only"}]},{name:"BlockRootPathAccess",type:"boolean",description:"Determines if the zone should block requests to the root of the zone.",required:!1,nullable:!0},{name:"BlockPostRequests",type:"boolean",description:"Determines if the POST requests to this zone should be rejected.",required:!1,nullable:!0},{name:"EnableQueryStringOrdering",type:"boolean",description:"Determines if the query string ordering should be enabled.",required:!1,nullable:!0},{name:"EnableWebpVary",type:"boolean",description:"Determines if the WebP Vary feature should be enabled.",required:!1,nullable:!0},{name:"EnableAvifVary",type:"boolean",description:"Determines if the AVIF Vary feature should be enabled.",required:!1,nullable:!0},{name:"EnableMobileVary",type:"boolean",description:"Determines if the Mobile Vary feature is enabled.",required:!1,nullable:!0},{name:"EnableCountryCodeVary",type:"boolean",description:"Determines if the Country Code Vary feature should be enabled.",required:!1,nullable:!0},{name:"EnableCountryStateCodeVary",type:"boolean",description:"Determines if the Country State Code Vary feature should be enabled.",required:!1,nullable:!0},{name:"EnableHostnameVary",type:"boolean",description:"Determines if the Hostname Vary feature should be enabled.",required:!1,nullable:!0},{name:"EnableCacheSlice",type:"boolean",description:"Determines if cache slicing (Optimize for video) should be enabled for this zone",required:!1,nullable:!0},{name:"ZoneSecurityEnabled",type:"boolean",description:"Determines if the zone token authentication security should be enabled",required:!1,nullable:!0},{name:"ZoneSecurityIncludeHashRemoteIP",type:"boolean",description:"Determines if the token authentication IP validation should be enabled",required:!1,nullable:!0},{name:"IgnoreQueryStrings",type:"boolean",description:"Determines if the Pull Zone should ignore query strings when serving cached objects (Vary by Query String)",required:!1,nullable:!0},{name:"MonthlyBandwidthLimit",type:"integer",format:"int64",description:"Sets the monthly limit of bandwidth in bytes that the pullzone is allowed to use",required:!1,nullable:!0},{name:"AccessControlOriginHeaderExtensions",type:"array",description:"Sets the list of extensions that will return the CORS headers",required:!1,nullable:!0},{name:"EnableAccessControlOriginHeader",type:"boolean",description:"Determines if CORS headers should be enabled",required:!1,nullable:!0},{name:"DisableCookies",type:"boolean",description:"Determines if the Pull Zone should automatically remove cookies from the responses",required:!1,nullable:!0},{name:"BudgetRedirectedCountries",type:"array",description:"Sets the list of two letter Alpha2 country codes that will be redirected to the cheapest possible region",required:!1,nullable:!0},{name:"BlockedCountries",type:"array",description:"Sets the list of two letter Alpha2 country codes that will be blocked from accessing the zone",required:!1,nullable:!0},{name:"CacheControlMaxAgeOverride",type:"integer",format:"int64",description:"Sets the cache control override setting for this zone",required:!1,nullable:!0},{name:"CacheControlPublicMaxAgeOverride",type:"integer",format:"int64",description:"Sets the browser cache control override setting for this zone",required:!1,nullable:!0},{name:"CacheControlBrowserMaxAgeOverride",type:"integer",format:"int64",description:"(Deprecated) Sets the browser cache control override setting for this zone",required:!1,nullable:!0},{name:"AddHostHeader",type:"boolean",description:"Determines if the zone should forward the requested host header to the origin",required:!1,nullable:!0},{name:"AddCanonicalHeader",type:"boolean",description:"Determines if the canonical header should be added by this zone",required:!1,nullable:!0},{name:"EnableLogging",type:"boolean",description:"Determines if the logging should be enabled for this zone",required:!1,nullable:!0},{name:"LoggingIPAnonymizationEnabled",type:"boolean",description:"Determines if the log anonoymization should be enabled",required:!1,nullable:!0},{name:"PermaCacheStorageZoneId",type:"integer",format:"int64",description:"The ID of the storage zone that should be used as the Perma-Cache",required:!1,nullable:!0},{name:"PermaCacheType",type:"integer",description:"Determines Perma-Cache behavior",required:!1,nullable:!0,options:[{value:0,label:"Automatic"},{value:1,label:"Manual"}]},{name:"AWSSigningEnabled",type:"boolean",description:"Determines if the AWS signing should be enabled or not",required:!1,nullable:!0},{name:"AWSSigningKey",type:"string",description:"Sets the AWS signing key",required:!1,nullable:!0},{name:"AWSSigningRegionName",type:"string",description:"Sets the AWS signing region name",required:!1,nullable:!0},{name:"AWSSigningSecret",type:"string",description:"Sets the AWS signing secret key",required:!1,nullable:!0},{name:"EnableOriginShield",type:"boolean",description:"Determines if the origin shield should be enabled",required:!1,nullable:!0},{name:"OriginShieldZoneCode",type:"string",description:"Determines the zone code where the origin shield should be set up",required:!1,nullable:!0},{name:"EnableTLS1",type:"boolean",description:"Determines if the TLS 1 should be enabled on this zone",required:!1,nullable:!0},{name:"EnableTLS1_1",type:"boolean",description:"Determines if the TLS 1.1 should be enabled on this zone",required:!1,nullable:!0},{name:"CacheErrorResponses",type:"boolean",description:"Determines if the cache error responses should be enabled on the zone",required:!1,nullable:!0},{name:"VerifyOriginSSL",type:"boolean",description:"Determines if the SSL certificate should be verified when connecting to the origin",required:!1,nullable:!0},{name:"LogForwardingEnabled",type:"boolean",description:"Sets the log forwarding token for the zone",required:!1,nullable:!0},{name:"LogForwardingHostname",type:"string",description:"Sets the log forwarding destination hostname for the zone",required:!1,nullable:!0},{name:"LogForwardingPort",type:"integer",format:"int32",description:"Sets the log forwarding port for the zone",required:!1,nullable:!0},{name:"LogForwardingToken",type:"string",description:"Sets the log forwarding token for the zone",required:!1,nullable:!0},{name:"LogForwardingProtocol",type:"integer",description:"Sets the log forwarding protocol type",required:!1,nullable:!0,options:[{value:0,label:"UDP"},{value:1,label:"TCP"},{value:2,label:"TCPEncrypted"},{value:3,label:"DataDog"}]},{name:"LoggingSaveToStorage",type:"boolean",description:"Determines if the logging permanent storage should be enabled",required:!1,nullable:!0},{name:"LoggingStorageZoneId",type:"integer",format:"int64",description:"Sets the Storage Zone id that should contain the logs from this Pull Zone",required:!1,nullable:!0},{name:"FollowRedirects",type:"boolean",description:"Determines if the zone should follow redirects return by the oprigin and cache the response",required:!1,nullable:!0},{name:"ConnectionLimitPerIPCount",type:"integer",format:"int32",description:"Determines the maximum number of connections per IP that will be allowed to connect to this Pull Zone",required:!1,nullable:!0},{name:"RequestLimit",type:"integer",format:"int32",description:"Determines the maximum number of requests per second that will be allowed to connect to this Pull Zone",required:!1,nullable:!0},{name:"LimitRateAfter",type:"number",format:"double",description:"Determines the amount of traffic transferred before the client is limited",required:!1,nullable:!0},{name:"LimitRatePerSecond",type:"integer",format:"int32",description:"Determines the maximum number of requests per second coming from a single IP before it is blocked.",required:!1,nullable:!0},{name:"BurstSize",type:"integer",format:"int32",description:"Determines the maximum burst requests before an IP is blocked",required:!1,nullable:!0},{name:"ErrorPageEnableCustomCode",type:"boolean",description:"Determines if custom error page code should be enabled.",required:!1,nullable:!0},{name:"ErrorPageCustomCode",type:"string",description:"Contains the custom error page code that will be returned",required:!1,nullable:!0},{name:"ErrorPageEnableStatuspageWidget",type:"boolean",description:"Determines if the statuspage widget should be displayed on the error pages",required:!1,nullable:!0},{name:"ErrorPageStatuspageCode",type:"string",description:"The statuspage code that will be used to build the status widget",required:!1,nullable:!0},{name:"ErrorPageWhitelabel",type:"boolean",description:"Determines if the error pages should be whitelabel or not",required:!1,nullable:!0},{name:"OptimizerEnabled",type:"boolean",description:"Determines if the optimizer should be enabled for this zone",required:!1,nullable:!0},{name:"OptimizerTunnelEnabled",type:"boolean",description:"Determines if the optimizer origin tunnel system should be enabled for this zone",required:!1,nullable:!0},{name:"OptimizerDesktopMaxWidth",type:"integer",format:"int32",description:"Determines the maximum automatic image size for desktop clients",required:!1,nullable:!0,minimum:0,maximum:5e3},{name:"OptimizerMobileMaxWidth",type:"integer",format:"int32",description:"Determines the maximum automatic image size for mobile clients",required:!1,nullable:!0,minimum:0,maximum:5e3},{name:"OptimizerImageQuality",type:"integer",format:"int32",description:"Determines the image quality for desktop clients",required:!1,nullable:!0,minimum:1,maximum:100},{name:"OptimizerMobileImageQuality",type:"integer",format:"int32",description:"Determines the image quality for mobile clients",required:!1,nullable:!0,minimum:1,maximum:100},{name:"OptimizerEnableWebP",type:"boolean",description:"Determines if the WebP optimization should be enabled",required:!1,nullable:!0},{name:"OptimizerPrerenderHtml",type:"boolean",description:"Determines if the SEO HTML prerender should be enabled",required:!1,nullable:!0},{name:"OptimizerEnableManipulationEngine",type:"boolean",description:"Determines the image manipulation should be enabled",required:!1,nullable:!0},{name:"OptimizerMinifyCSS",type:"boolean",description:"Determines if the CSS minifcation should be enabled",required:!1,nullable:!0},{name:"OptimizerMinifyJavaScript",type:"boolean",description:"Determines if the JavaScript minifcation should be enabled",required:!1,nullable:!0},{name:"OptimizerWatermarkEnabled",type:"boolean",description:"Determines if image watermarking should be enabled",required:!1,nullable:!0},{name:"OptimizerWatermarkUrl",type:"string",description:"Sets the URL of the watermark image",required:!1,nullable:!0},{name:"OptimizerWatermarkPosition",type:"integer",description:"Sets the position of the watermark image",required:!1,nullable:!0,options:[{value:0,label:"BottomLeft"},{value:1,label:"BottomRight"},{value:2,label:"TopLeft"},{value:3,label:"TopRight"},{value:4,label:"Center"},{value:5,label:"CenterStretch"}]},{name:"OptimizerWatermarkOffset",type:"number",format:"double",description:"Sets the offset of the watermark image",required:!1,nullable:!0},{name:"OptimizerWatermarkMinImageSize",type:"integer",format:"int32",description:"Sets the minimum image size to which the watermark will be added",required:!1,nullable:!0},{name:"OptimizerAutomaticOptimizationEnabled",type:"boolean",description:"Determines if the automatic image optimization should be enabled",required:!1,nullable:!0},{name:"OptimizerClasses",type:"array",description:"Determines the list of optimizer classes",required:!1,nullable:!0},{name:"OptimizerForceClasses",type:"boolean",description:"Determines if the optimizer classes should be forced",required:!1,nullable:!0},{name:"OptimizerStaticHtmlEnabled",type:"boolean",description:"Determines whether optimizer static html feature enabled",required:!1,nullable:!0},{name:"OptimizerStaticHtmlWordPressPath",type:"string",description:"Wordpress html path which should be bypassed by permacache in edge rule",required:!1,nullable:!0},{name:"OptimizerStaticHtmlWordPressBypassCookie",type:"string",description:"Wordpress cookie which should be bypassed by permacache in edge rule",required:!1,nullable:!0},{name:"Type",type:"integer",description:"The type of the pull zone. Premium = 0, Volume = 1",required:!1,nullable:!0,options:[{value:0,label:"Premium"},{value:1,label:"Volume"}]},{name:"OriginRetries",type:"integer",format:"int32",description:"The number of retries to the origin server",required:!1,nullable:!0},{name:"OriginConnectTimeout",type:"integer",format:"int32",description:"The amount of seconds to wait when connecting to the origin. Otherwise the request will fail or retry.",required:!1,nullable:!0},{name:"OriginResponseTimeout",type:"integer",format:"int32",description:"The amount of seconds to wait when waiting for the origin reply. Otherwise the request will fail or retry.",required:!1,nullable:!0},{name:"UseStaleWhileUpdating",type:"boolean",description:"Determines if we should use stale cache while cache is updating",required:!1,nullable:!0},{name:"UseStaleWhileOffline",type:"boolean",description:"Determines if we should use stale cache while the origin is offline",required:!1,nullable:!0},{name:"OriginRetry5XXResponses",type:"boolean",description:"Determines if we should retry the request in case of a 5XX response.",required:!1,nullable:!0},{name:"OriginRetryConnectionTimeout",type:"boolean",description:"Determines if we should retry the request in case of a connection timeout.",required:!1,nullable:!0},{name:"OriginRetryResponseTimeout",type:"boolean",description:"Determines if we should retry the request in case of a response timeout.",required:!1,nullable:!0},{name:"OriginRetryDelay",type:"integer",format:"int32",description:"Determines the amount of time that the CDN should wait before retrying an origin request.",required:!1,nullable:!0},{name:"DnsOriginPort",type:"integer",format:"int32",description:"Determines the origin port of the pull zone.",required:!1,nullable:!0},{name:"DnsOriginScheme",type:"string",description:"Determines the origin scheme of the pull zone.",required:!1,nullable:!0},{name:"QueryStringVaryParameters",type:"array",description:"Contains the list of vary parameters that will be used for vary cache by query string. Only alphanumeric characters, dashes and underscores are allowed (values that contain other characters are ignorred). If empty, all parameters will be used to construct the key.",required:!1,nullable:!0},{name:"OriginShieldEnableConcurrencyLimit",type:"boolean",description:"Determines if the origin shield concurrency limit is enabled.",required:!1,nullable:!0},{name:"OriginShieldMaxConcurrentRequests",type:"integer",format:"int32",description:"Determines the number of maximum concurrent requests allowed to the origin.",required:!1,nullable:!0,minimum:1,maximum:1e4},{name:"EnableCookieVary",type:"boolean",description:"Determines if the Cookie Vary feature is enabled.",required:!1,nullable:!0},{name:"CookieVaryParameters",type:"array",description:"Contains the list of vary parameters that will be used for vary cache by cookie string.Only alphanumeric characters, dashes and underscores are allowed (values that contain other characters are ignorred). If empty, cookie vary will not be used.",required:!1,nullable:!0},{name:"EnableSafeHop",type:"boolean",required:!1,nullable:!0},{name:"OriginShieldQueueMaxWaitTime",type:"integer",format:"int32",description:"Determines the max queue wait time",required:!1,nullable:!0},{name:"OriginShieldMaxQueuedRequests",type:"integer",format:"int32",description:"Determines the max number of origin requests that will remain in the queue",required:!1,nullable:!0,minimum:0,maximum:3e4},{name:"UseBackgroundUpdate",type:"boolean",description:"Determines if cache update is performed in the background.",required:!1,nullable:!0},{name:"EnableAutoSSL",type:"boolean",description:"If set to true, any hostnames added to this Pull Zone will automatically enable SSL.",required:!1,nullable:!0},{name:"LogAnonymizationType",type:"integer",description:"Sets the log anonymization type for this pull zone",required:!1,nullable:!0,options:[{value:0,label:"OneDigit"},{value:1,label:"Drop"}]},{name:"StorageZoneId",type:"integer",format:"int64",description:"The ID of the storage zone that will be used as the origin",required:!1,nullable:!0},{name:"EdgeScriptId",type:"integer",format:"int64",description:"The ID of the edge script that will be used as the origin",required:!1,nullable:!0},{name:"MiddlewareScriptId",type:"integer",format:"int64",description:"The ID of the middleware script",required:!1,nullable:!0},{name:"EdgeScriptExecutionPhase",type:"integer",description:"The execution phase of the edge script",required:!1,nullable:!0,options:[{value:0,label:"Cache"},{value:1,label:"LoadBalancer"}]},{name:"OriginType",type:"integer",description:"Determine the type of the origin for this Pull Zone",required:!1,nullable:!0,options:[{value:0,label:"OriginUrl"},{value:1,label:"DnsAccelerate"},{value:2,label:"StorageZone"},{value:3,label:"LoadBalancer"},{value:4,label:"EdgeScript"},{value:5,label:"MagicContainers"},{value:6,label:"PushZone"}]},{name:"MagicContainersAppId",type:"string",required:!1,nullable:!0},{name:"MagicContainersEndpointId",type:"string",required:!1,nullable:!0},{name:"LogFormat",type:"integer",description:`0 = Plain
1 = JSON`,required:!1,nullable:!0,options:[{value:0,label:"Plain"},{value:1,label:"JSON"}]},{name:"LogForwardingFormat",type:"integer",description:`0 = Plain
1 = JSON`,required:!1,nullable:!0,options:[{value:0,label:"Plain"},{value:1,label:"JSON"}]},{name:"ShieldDDosProtectionType",type:"integer",description:`0 = DetectOnly
1 = ActiveStandard
2 = ActiveAggressive`,required:!1,nullable:!0,options:[{value:0,label:"DetectOnly"},{value:1,label:"ActiveStandard"},{value:2,label:"ActiveAggressive"}]},{name:"ShieldDDosProtectionEnabled",type:"boolean",required:!1,nullable:!0},{name:"OriginHostHeader",type:"string",description:"Sets the host header that will be sent to the origin",required:!1,nullable:!0},{name:"EnableSmartCache",type:"boolean",required:!1,nullable:!0},{name:"EnableRequestCoalescing",type:"boolean",description:"Determines if request coalescing is currently enabled.",required:!1,nullable:!0},{name:"RequestCoalescingTimeout",type:"integer",format:"int32",description:"Determines the lock time for coalesced requests.",required:!1,nullable:!0},{name:"DisableLetsEncrypt",type:"boolean",description:"If set to true, the built-in let's encrypt will be disabled and requests are passed to the origin.",required:!1,nullable:!0},{name:"EnableBunnyImageAi",type:"boolean",required:!1,nullable:!0},{name:"BunnyAiImageBlueprints",type:"array",required:!1,nullable:!0},{name:"PreloadingScreenEnabled",type:"boolean",description:"Determines if the preloading screen is currently enabled",required:!1,nullable:!0},{name:"PreloadingScreenCode",type:"string",description:"The custom preloading screen coed",required:!1,nullable:!0},{name:"PreloadingScreenLogoUrl",type:"string",description:"The preloading screen logo URL",required:!1,nullable:!0},{name:"PreloadingScreenShowOnFirstVisit",type:"boolean",description:"Determines if the preloading screen is shown on the first load from a user.",required:!1,nullable:!1},{name:"PreloadingScreenTheme",type:"integer",description:"The currently configured preloading screem theme. (0 - Light, 1 - Dark)",required:!1,nullable:!0,options:[{value:0,label:"Light"},{value:1,label:"Dark"}]},{name:"PreloadingScreenCodeEnabled",type:"boolean",description:"Determines if the custom preloader screen should be enabled",required:!1,nullable:!0},{name:"PreloadingScreenDelay",type:"integer",format:"int32",description:"The delay in miliseconds after which the preloading screen will be displayed (0 - 10000ms)",required:!1,nullable:!0,minimum:0,maximum:1e4},{name:"RoutingFilters",type:"array",description:"The list of routing filters enabled for this zone",required:!1,nullable:!0},{name:"StickySessionType",type:"integer",description:"Whether to use a Sticky Session mechanism for this pull zone",required:!1,nullable:!0,options:[{value:0,label:"Off"},{value:1,label:"On"}]},{name:"StickySessionCookieName",type:"string",description:"Sticky Session Cookie Name",required:!1,nullable:!0},{name:"StickySessionClientHeaders",type:"string",description:"A set of comma-separated header names used to identify clients",required:!1,nullable:!0},{name:"OptimizerEnableUpscaling",type:"boolean",description:"Determines if Optimizer is allowed to upscale images",required:!1,nullable:!0},{name:"EnableWebSockets",type:"boolean",description:"Determines if WebSocket connections are allowed for this Pull Zone.",required:!1,nullable:!0},{name:"MaxWebSocketConnections",type:"integer",format:"int32",description:"The maximum global simultaneous WebSocket connections allowed for this Pull Zone. Allowed tiers: 500, 1,000, 2,500, 5,000, 10,000, 25,000. If you send a non-tier value, the value is rounded up to the next tier. Values over 25,000 are rejected, please contact sales if required.",required:!1,nullable:!0},{name:"CacheKeyHeaders",type:"string",description:"Vary Cache by Request Headers (comma delimited)",required:!1,nullable:!0},{name:"Name",type:"string",description:"The name of the pull zone.",required:!0,nullable:!1}]},"post /pullzone/{}":{fields:[{name:"OriginUrl",type:"string",description:"Sets the origin URL of the Pull Zone",required:!1,nullable:!0},{name:"AllowedReferrers",type:"array",description:"Sets the list of referrer hostnames that are allowed to access the pull zone. Requests containing the header Referer: hostname that is not on the list will be rejected. If empty, all the referrers are allowed",required:!1,nullable:!0},{name:"BlockedReferrers",type:"array",description:"Sets the list of referrer hostnames that are blocked from accessing the pull zone.",required:!1,nullable:!0},{name:"BlockNoneReferrer",type:"boolean",required:!1,nullable:!0},{name:"BlockedIps",type:"array",description:"Sets the list of IPs that are blocked from accessing the pull zone. Requests coming from the following IPs will be rejected. If empty, all the IPs will be allowed",required:!1,nullable:!0},{name:"EnableGeoZoneUS",type:"boolean",description:"Determines if the delivery from the North America region should be enabled for this pull zone",required:!1,nullable:!0},{name:"EnableGeoZoneEU",type:"boolean",description:"Determines if the delivery from the Europe region should be enabled for this pull zone",required:!1,nullable:!0},{name:"EnableGeoZoneASIA",type:"boolean",description:"Determines if the delivery from the Asia / Oceania regions should be enabled for this pull zone",required:!1,nullable:!0},{name:"EnableGeoZoneSA",type:"boolean",description:"Determines if the delivery from the South America region should be enabled for this pull zone",required:!1,nullable:!0},{name:"EnableGeoZoneAF",type:"boolean",description:"Determines if the delivery from the Africa region should be enabled for this pull zone",required:!1,nullable:!0},{name:"IpFamilyPolicy",type:"integer",description:"Address-family policy: 0=IPv4Only, 1=DualStack (default, best latency and compatibility), 2=DualStackPreferIPv6, 3=IPv6Only.",required:!1,nullable:!0,options:[{value:0,label:"IPv4Only"},{value:1,label:"DualStack"},{value:2,label:"DualStackPreferIPv6"},{value:3,label:"IPv6Only"}]},{name:"BlockRootPathAccess",type:"boolean",description:"Determines if the zone should block requests to the root of the zone.",required:!1,nullable:!0},{name:"BlockPostRequests",type:"boolean",description:"Determines if the POST requests to this zone should be rejected.",required:!1,nullable:!0},{name:"EnableQueryStringOrdering",type:"boolean",description:"Determines if the query string ordering should be enabled.",required:!1,nullable:!0},{name:"EnableWebpVary",type:"boolean",description:"Determines if the WebP Vary feature should be enabled.",required:!1,nullable:!0},{name:"EnableAvifVary",type:"boolean",description:"Determines if the AVIF Vary feature should be enabled.",required:!1,nullable:!0},{name:"EnableMobileVary",type:"boolean",description:"Determines if the Mobile Vary feature is enabled.",required:!1,nullable:!0},{name:"EnableCountryCodeVary",type:"boolean",description:"Determines if the Country Code Vary feature should be enabled.",required:!1,nullable:!0},{name:"EnableCountryStateCodeVary",type:"boolean",description:"Determines if the Country State Code Vary feature should be enabled.",required:!1,nullable:!0},{name:"EnableHostnameVary",type:"boolean",description:"Determines if the Hostname Vary feature should be enabled.",required:!1,nullable:!0},{name:"EnableCacheSlice",type:"boolean",description:"Determines if cache slicing (Optimize for video) should be enabled for this zone",required:!1,nullable:!0},{name:"ZoneSecurityEnabled",type:"boolean",description:"Determines if the zone token authentication security should be enabled",required:!1,nullable:!0},{name:"ZoneSecurityIncludeHashRemoteIP",type:"boolean",description:"Determines if the token authentication IP validation should be enabled",required:!1,nullable:!0},{name:"IgnoreQueryStrings",type:"boolean",description:"Determines if the Pull Zone should ignore query strings when serving cached objects (Vary by Query String)",required:!1,nullable:!0},{name:"MonthlyBandwidthLimit",type:"integer",format:"int64",description:"Sets the monthly limit of bandwidth in bytes that the pullzone is allowed to use",required:!1,nullable:!0},{name:"AccessControlOriginHeaderExtensions",type:"array",description:"Sets the list of extensions that will return the CORS headers",required:!1,nullable:!0},{name:"EnableAccessControlOriginHeader",type:"boolean",description:"Determines if CORS headers should be enabled",required:!1,nullable:!0},{name:"DisableCookies",type:"boolean",description:"Determines if the Pull Zone should automatically remove cookies from the responses",required:!1,nullable:!0},{name:"BudgetRedirectedCountries",type:"array",description:"Sets the list of two letter Alpha2 country codes that will be redirected to the cheapest possible region",required:!1,nullable:!0},{name:"BlockedCountries",type:"array",description:"Sets the list of two letter Alpha2 country codes that will be blocked from accessing the zone",required:!1,nullable:!0},{name:"CacheControlMaxAgeOverride",type:"integer",format:"int64",description:"Sets the cache control override setting for this zone",required:!1,nullable:!0},{name:"CacheControlPublicMaxAgeOverride",type:"integer",format:"int64",description:"Sets the browser cache control override setting for this zone",required:!1,nullable:!0},{name:"CacheControlBrowserMaxAgeOverride",type:"integer",format:"int64",description:"(Deprecated) Sets the browser cache control override setting for this zone",required:!1,nullable:!0},{name:"AddHostHeader",type:"boolean",description:"Determines if the zone should forward the requested host header to the origin",required:!1,nullable:!0},{name:"AddCanonicalHeader",type:"boolean",description:"Determines if the canonical header should be added by this zone",required:!1,nullable:!0},{name:"EnableLogging",type:"boolean",description:"Determines if the logging should be enabled for this zone",required:!1,nullable:!0},{name:"LoggingIPAnonymizationEnabled",type:"boolean",description:"Determines if the log anonoymization should be enabled",required:!1,nullable:!0},{name:"PermaCacheStorageZoneId",type:"integer",format:"int64",description:"The ID of the storage zone that should be used as the Perma-Cache",required:!1,nullable:!0},{name:"PermaCacheType",type:"integer",description:"Determines Perma-Cache behavior",required:!1,nullable:!0,options:[{value:0,label:"Automatic"},{value:1,label:"Manual"}]},{name:"AWSSigningEnabled",type:"boolean",description:"Determines if the AWS signing should be enabled or not",required:!1,nullable:!0},{name:"AWSSigningKey",type:"string",description:"Sets the AWS signing key",required:!1,nullable:!0},{name:"AWSSigningRegionName",type:"string",description:"Sets the AWS signing region name",required:!1,nullable:!0},{name:"AWSSigningSecret",type:"string",description:"Sets the AWS signing secret key",required:!1,nullable:!0},{name:"EnableOriginShield",type:"boolean",description:"Determines if the origin shield should be enabled",required:!1,nullable:!0},{name:"OriginShieldZoneCode",type:"string",description:"Determines the zone code where the origin shield should be set up",required:!1,nullable:!0},{name:"EnableTLS1",type:"boolean",description:"Determines if the TLS 1 should be enabled on this zone",required:!1,nullable:!0},{name:"EnableTLS1_1",type:"boolean",description:"Determines if the TLS 1.1 should be enabled on this zone",required:!1,nullable:!0},{name:"CacheErrorResponses",type:"boolean",description:"Determines if the cache error responses should be enabled on the zone",required:!1,nullable:!0},{name:"VerifyOriginSSL",type:"boolean",description:"Determines if the SSL certificate should be verified when connecting to the origin",required:!1,nullable:!0},{name:"LogForwardingEnabled",type:"boolean",description:"Sets the log forwarding token for the zone",required:!1,nullable:!0},{name:"LogForwardingHostname",type:"string",description:"Sets the log forwarding destination hostname for the zone",required:!1,nullable:!0},{name:"LogForwardingPort",type:"integer",format:"int32",description:"Sets the log forwarding port for the zone",required:!1,nullable:!0},{name:"LogForwardingToken",type:"string",description:"Sets the log forwarding token for the zone",required:!1,nullable:!0},{name:"LogForwardingProtocol",type:"integer",description:"Sets the log forwarding protocol type",required:!1,nullable:!0,options:[{value:0,label:"UDP"},{value:1,label:"TCP"},{value:2,label:"TCPEncrypted"},{value:3,label:"DataDog"}]},{name:"LoggingSaveToStorage",type:"boolean",description:"Determines if the logging permanent storage should be enabled",required:!1,nullable:!0},{name:"LoggingStorageZoneId",type:"integer",format:"int64",description:"Sets the Storage Zone id that should contain the logs from this Pull Zone",required:!1,nullable:!0},{name:"FollowRedirects",type:"boolean",description:"Determines if the zone should follow redirects return by the oprigin and cache the response",required:!1,nullable:!0},{name:"ConnectionLimitPerIPCount",type:"integer",format:"int32",description:"Determines the maximum number of connections per IP that will be allowed to connect to this Pull Zone",required:!1,nullable:!0},{name:"RequestLimit",type:"integer",format:"int32",description:"Determines the maximum number of requests per second that will be allowed to connect to this Pull Zone",required:!1,nullable:!0},{name:"LimitRateAfter",type:"number",format:"double",description:"Determines the amount of traffic transferred before the client is limited",required:!1,nullable:!0},{name:"LimitRatePerSecond",type:"integer",format:"int32",description:"Determines the maximum number of requests per second coming from a single IP before it is blocked.",required:!1,nullable:!0},{name:"BurstSize",type:"integer",format:"int32",description:"Determines the maximum burst requests before an IP is blocked",required:!1,nullable:!0},{name:"ErrorPageEnableCustomCode",type:"boolean",description:"Determines if custom error page code should be enabled.",required:!1,nullable:!0},{name:"ErrorPageCustomCode",type:"string",description:"Contains the custom error page code that will be returned",required:!1,nullable:!0},{name:"ErrorPageEnableStatuspageWidget",type:"boolean",description:"Determines if the statuspage widget should be displayed on the error pages",required:!1,nullable:!0},{name:"ErrorPageStatuspageCode",type:"string",description:"The statuspage code that will be used to build the status widget",required:!1,nullable:!0},{name:"ErrorPageWhitelabel",type:"boolean",description:"Determines if the error pages should be whitelabel or not",required:!1,nullable:!0},{name:"OptimizerEnabled",type:"boolean",description:"Determines if the optimizer should be enabled for this zone",required:!1,nullable:!0},{name:"OptimizerTunnelEnabled",type:"boolean",description:"Determines if the optimizer origin tunnel system should be enabled for this zone",required:!1,nullable:!0},{name:"OptimizerDesktopMaxWidth",type:"integer",format:"int32",description:"Determines the maximum automatic image size for desktop clients",required:!1,nullable:!0,minimum:0,maximum:5e3},{name:"OptimizerMobileMaxWidth",type:"integer",format:"int32",description:"Determines the maximum automatic image size for mobile clients",required:!1,nullable:!0,minimum:0,maximum:5e3},{name:"OptimizerImageQuality",type:"integer",format:"int32",description:"Determines the image quality for desktop clients",required:!1,nullable:!0,minimum:1,maximum:100},{name:"OptimizerMobileImageQuality",type:"integer",format:"int32",description:"Determines the image quality for mobile clients",required:!1,nullable:!0,minimum:1,maximum:100},{name:"OptimizerEnableWebP",type:"boolean",description:"Determines if the WebP optimization should be enabled",required:!1,nullable:!0},{name:"OptimizerPrerenderHtml",type:"boolean",description:"Determines if the SEO HTML prerender should be enabled",required:!1,nullable:!0},{name:"OptimizerEnableManipulationEngine",type:"boolean",description:"Determines the image manipulation should be enabled",required:!1,nullable:!0},{name:"OptimizerMinifyCSS",type:"boolean",description:"Determines if the CSS minifcation should be enabled",required:!1,nullable:!0},{name:"OptimizerMinifyJavaScript",type:"boolean",description:"Determines if the JavaScript minifcation should be enabled",required:!1,nullable:!0},{name:"OptimizerWatermarkEnabled",type:"boolean",description:"Determines if image watermarking should be enabled",required:!1,nullable:!0},{name:"OptimizerWatermarkUrl",type:"string",description:"Sets the URL of the watermark image",required:!1,nullable:!0},{name:"OptimizerWatermarkPosition",type:"integer",description:"Sets the position of the watermark image",required:!1,nullable:!0,options:[{value:0,label:"BottomLeft"},{value:1,label:"BottomRight"},{value:2,label:"TopLeft"},{value:3,label:"TopRight"},{value:4,label:"Center"},{value:5,label:"CenterStretch"}]},{name:"OptimizerWatermarkOffset",type:"number",format:"double",description:"Sets the offset of the watermark image",required:!1,nullable:!0},{name:"OptimizerWatermarkMinImageSize",type:"integer",format:"int32",description:"Sets the minimum image size to which the watermark will be added",required:!1,nullable:!0},{name:"OptimizerAutomaticOptimizationEnabled",type:"boolean",description:"Determines if the automatic image optimization should be enabled",required:!1,nullable:!0},{name:"OptimizerClasses",type:"array",description:"Determines the list of optimizer classes",required:!1,nullable:!0},{name:"OptimizerForceClasses",type:"boolean",description:"Determines if the optimizer classes should be forced",required:!1,nullable:!0},{name:"OptimizerStaticHtmlEnabled",type:"boolean",description:"Determines whether optimizer static html feature enabled",required:!1,nullable:!0},{name:"OptimizerStaticHtmlWordPressPath",type:"string",description:"Wordpress html path which should be bypassed by permacache in edge rule",required:!1,nullable:!0},{name:"OptimizerStaticHtmlWordPressBypassCookie",type:"string",description:"Wordpress cookie which should be bypassed by permacache in edge rule",required:!1,nullable:!0},{name:"Type",type:"integer",description:"The type of the pull zone. Premium = 0, Volume = 1",required:!1,nullable:!0,options:[{value:0,label:"Premium"},{value:1,label:"Volume"}]},{name:"OriginRetries",type:"integer",format:"int32",description:"The number of retries to the origin server",required:!1,nullable:!0},{name:"OriginConnectTimeout",type:"integer",format:"int32",description:"The amount of seconds to wait when connecting to the origin. Otherwise the request will fail or retry.",required:!1,nullable:!0},{name:"OriginResponseTimeout",type:"integer",format:"int32",description:"The amount of seconds to wait when waiting for the origin reply. Otherwise the request will fail or retry.",required:!1,nullable:!0},{name:"UseStaleWhileUpdating",type:"boolean",description:"Determines if we should use stale cache while cache is updating",required:!1,nullable:!0},{name:"UseStaleWhileOffline",type:"boolean",description:"Determines if we should use stale cache while the origin is offline",required:!1,nullable:!0},{name:"OriginRetry5XXResponses",type:"boolean",description:"Determines if we should retry the request in case of a 5XX response.",required:!1,nullable:!0},{name:"OriginRetryConnectionTimeout",type:"boolean",description:"Determines if we should retry the request in case of a connection timeout.",required:!1,nullable:!0},{name:"OriginRetryResponseTimeout",type:"boolean",description:"Determines if we should retry the request in case of a response timeout.",required:!1,nullable:!0},{name:"OriginRetryDelay",type:"integer",format:"int32",description:"Determines the amount of time that the CDN should wait before retrying an origin request.",required:!1,nullable:!0},{name:"DnsOriginPort",type:"integer",format:"int32",description:"Determines the origin port of the pull zone.",required:!1,nullable:!0},{name:"DnsOriginScheme",type:"string",description:"Determines the origin scheme of the pull zone.",required:!1,nullable:!0},{name:"QueryStringVaryParameters",type:"array",description:"Contains the list of vary parameters that will be used for vary cache by query string. Only alphanumeric characters, dashes and underscores are allowed (values that contain other characters are ignorred). If empty, all parameters will be used to construct the key.",required:!1,nullable:!0},{name:"OriginShieldEnableConcurrencyLimit",type:"boolean",description:"Determines if the origin shield concurrency limit is enabled.",required:!1,nullable:!0},{name:"OriginShieldMaxConcurrentRequests",type:"integer",format:"int32",description:"Determines the number of maximum concurrent requests allowed to the origin.",required:!1,nullable:!0,minimum:1,maximum:1e4},{name:"EnableCookieVary",type:"boolean",description:"Determines if the Cookie Vary feature is enabled.",required:!1,nullable:!0},{name:"CookieVaryParameters",type:"array",description:"Contains the list of vary parameters that will be used for vary cache by cookie string.Only alphanumeric characters, dashes and underscores are allowed (values that contain other characters are ignorred). If empty, cookie vary will not be used.",required:!1,nullable:!0},{name:"EnableSafeHop",type:"boolean",required:!1,nullable:!0},{name:"OriginShieldQueueMaxWaitTime",type:"integer",format:"int32",description:"Determines the max queue wait time",required:!1,nullable:!0},{name:"OriginShieldMaxQueuedRequests",type:"integer",format:"int32",description:"Determines the max number of origin requests that will remain in the queue",required:!1,nullable:!0,minimum:0,maximum:3e4},{name:"UseBackgroundUpdate",type:"boolean",description:"Determines if cache update is performed in the background.",required:!1,nullable:!0},{name:"EnableAutoSSL",type:"boolean",description:"If set to true, any hostnames added to this Pull Zone will automatically enable SSL.",required:!1,nullable:!0},{name:"LogAnonymizationType",type:"integer",description:"Sets the log anonymization type for this pull zone",required:!1,nullable:!0,options:[{value:0,label:"OneDigit"},{value:1,label:"Drop"}]},{name:"StorageZoneId",type:"integer",format:"int64",description:"The ID of the storage zone that will be used as the origin",required:!1,nullable:!0},{name:"EdgeScriptId",type:"integer",format:"int64",description:"The ID of the edge script that will be used as the origin",required:!1,nullable:!0},{name:"MiddlewareScriptId",type:"integer",format:"int64",description:"The ID of the middleware script",required:!1,nullable:!0},{name:"EdgeScriptExecutionPhase",type:"integer",description:"The execution phase of the edge script",required:!1,nullable:!0,options:[{value:0,label:"Cache"},{value:1,label:"LoadBalancer"}]},{name:"OriginType",type:"integer",description:"Determine the type of the origin for this Pull Zone",required:!1,nullable:!0,options:[{value:0,label:"OriginUrl"},{value:1,label:"DnsAccelerate"},{value:2,label:"StorageZone"},{value:3,label:"LoadBalancer"},{value:4,label:"EdgeScript"},{value:5,label:"MagicContainers"},{value:6,label:"PushZone"}]},{name:"MagicContainersAppId",type:"string",required:!1,nullable:!0},{name:"MagicContainersEndpointId",type:"string",required:!1,nullable:!0},{name:"LogFormat",type:"integer",description:`0 = Plain
1 = JSON`,required:!1,nullable:!0,options:[{value:0,label:"Plain"},{value:1,label:"JSON"}]},{name:"LogForwardingFormat",type:"integer",description:`0 = Plain
1 = JSON`,required:!1,nullable:!0,options:[{value:0,label:"Plain"},{value:1,label:"JSON"}]},{name:"ShieldDDosProtectionType",type:"integer",description:`0 = DetectOnly
1 = ActiveStandard
2 = ActiveAggressive`,required:!1,nullable:!0,options:[{value:0,label:"DetectOnly"},{value:1,label:"ActiveStandard"},{value:2,label:"ActiveAggressive"}]},{name:"ShieldDDosProtectionEnabled",type:"boolean",required:!1,nullable:!0},{name:"OriginHostHeader",type:"string",description:"Sets the host header that will be sent to the origin",required:!1,nullable:!0},{name:"EnableSmartCache",type:"boolean",required:!1,nullable:!0},{name:"EnableRequestCoalescing",type:"boolean",description:"Determines if request coalescing is currently enabled.",required:!1,nullable:!0},{name:"RequestCoalescingTimeout",type:"integer",format:"int32",description:"Determines the lock time for coalesced requests.",required:!1,nullable:!0},{name:"DisableLetsEncrypt",type:"boolean",description:"If set to true, the built-in let's encrypt will be disabled and requests are passed to the origin.",required:!1,nullable:!0},{name:"EnableBunnyImageAi",type:"boolean",required:!1,nullable:!0},{name:"BunnyAiImageBlueprints",type:"array",required:!1,nullable:!0},{name:"PreloadingScreenEnabled",type:"boolean",description:"Determines if the preloading screen is currently enabled",required:!1,nullable:!0},{name:"PreloadingScreenCode",type:"string",description:"The custom preloading screen coed",required:!1,nullable:!0},{name:"PreloadingScreenLogoUrl",type:"string",description:"The preloading screen logo URL",required:!1,nullable:!0},{name:"PreloadingScreenShowOnFirstVisit",type:"boolean",description:"Determines if the preloading screen is shown on the first load from a user.",required:!1,nullable:!1},{name:"PreloadingScreenTheme",type:"integer",description:"The currently configured preloading screem theme. (0 - Light, 1 - Dark)",required:!1,nullable:!0,options:[{value:0,label:"Light"},{value:1,label:"Dark"}]},{name:"PreloadingScreenCodeEnabled",type:"boolean",description:"Determines if the custom preloader screen should be enabled",required:!1,nullable:!0},{name:"PreloadingScreenDelay",type:"integer",format:"int32",description:"The delay in miliseconds after which the preloading screen will be displayed (0 - 10000ms)",required:!1,nullable:!0,minimum:0,maximum:1e4},{name:"RoutingFilters",type:"array",description:"The list of routing filters enabled for this zone",required:!1,nullable:!0},{name:"StickySessionType",type:"integer",description:"Whether to use a Sticky Session mechanism for this pull zone",required:!1,nullable:!0,options:[{value:0,label:"Off"},{value:1,label:"On"}]},{name:"StickySessionCookieName",type:"string",description:"Sticky Session Cookie Name",required:!1,nullable:!0},{name:"StickySessionClientHeaders",type:"string",description:"A set of comma-separated header names used to identify clients",required:!1,nullable:!0},{name:"OptimizerEnableUpscaling",type:"boolean",description:"Determines if Optimizer is allowed to upscale images",required:!1,nullable:!0},{name:"EnableWebSockets",type:"boolean",description:"Determines if WebSocket connections are allowed for this Pull Zone.",required:!1,nullable:!0},{name:"MaxWebSocketConnections",type:"integer",format:"int32",description:"The maximum global simultaneous WebSocket connections allowed for this Pull Zone. Allowed tiers: 500, 1,000, 2,500, 5,000, 10,000, 25,000. If you send a non-tier value, the value is rounded up to the next tier. Values over 25,000 are rejected, please contact sales if required.",required:!1,nullable:!0},{name:"CacheKeyHeaders",type:"string",description:"Vary Cache by Request Headers (comma delimited)",required:!1,nullable:!0}]},"post /pullzone/{}/edgerules/addorupdate":{fields:[{name:"Guid",type:"string",description:"The unique GUID of the edge rule",required:!1,nullable:!0},{name:"ActionType",type:"integer",description:"The action type of the edge rule. ForceSSL = 0, Redirect = 1, OriginUrl = 2, OverrideCacheTime = 3, BlockRequest = 4, SetResponseHeader = 5, SetRequestHeader = 6, ForceDownload = 7, DisableTokenAuthentication = 8, EnableTokenAuthentication = 9, OverrideCacheTimePublic = 10, IgnoreQueryString = 11, DisableOptimizer = 12, ForceCompression = 13, SetStatusCode = 14, BypassPermaCache = 15, OverrideBrowserCacheTime = 16",required:!1,nullable:!1,options:[{value:0,label:"ForceSSL"},{value:1,label:"Redirect"},{value:2,label:"OriginUrl"},{value:3,label:"OverrideCacheTime"},{value:4,label:"BlockRequest"},{value:5,label:"SetResponseHeader"},{value:6,label:"SetRequestHeader"},{value:7,label:"ForceDownload"},{value:8,label:"DisableTokenAuthentication"},{value:9,label:"EnableTokenAuthentication"},{value:10,label:"OverrideCacheTimePublic"},{value:11,label:"IgnoreQueryString"},{value:12,label:"DisableOptimizer"},{value:13,label:"ForceCompression"},{value:14,label:"SetStatusCode"},{value:15,label:"BypassPermaCache"},{value:16,label:"OverrideBrowserCacheTime"},{value:17,label:"OriginStorage"},{value:18,label:"SetNetworkRateLimit"},{value:19,label:"SetConnectionLimit"},{value:20,label:"SetRequestsPerSecondLimit"},{value:21,label:"RunEdgeScript"},{value:22,label:"OriginMagicContainers"},{value:23,label:"DisableWAF"},{value:24,label:"RetryOrigin"},{value:25,label:"OverrideBrowserCacheResponseHeader"},{value:26,label:"RemoveBrowserCacheResponseHeader"},{value:27,label:"DisableShieldChallenge"},{value:28,label:"DisableShield"},{value:29,label:"DisableShieldBotDetection"},{value:30,label:"BypassAwsS3Authentication"},{value:31,label:"DisableShieldAccessLists"},{value:32,label:"DisableShieldRateLimiting"},{value:33,label:"EnableRequestCoalescing"},{value:34,label:"DisableRequestCoalescing"},{value:37,label:"StripCookiesClientToOrigin"}]},{name:"ActionParameter1",type:"string",description:"The Action parameter 1. The value depends on other parameters of the edge rule.",required:!1,nullable:!0},{name:"ActionParameter2",type:"string",description:"The Action parameter 2. The value depends on other parameters of the edge rule.",required:!1,nullable:!0},{name:"ActionParameter3",type:"string",description:"The Action parameter 3. The value depends on other parameters of the edge rule.",required:!1,nullable:!0},{name:"Triggers",type:"array",required:!1,nullable:!0},{name:"ExtraActions",type:"array",required:!1,nullable:!0},{name:"TriggerMatchingType",type:"integer",description:"The trigger matching type. MatchAny = 0, MatchAll = 1, MatchNone = 2",required:!1,nullable:!1,options:[{value:0,label:"MatchAny"},{value:1,label:"MatchAll"},{value:2,label:"MatchNone"}]},{name:"Description",type:"string",description:"The description of the edge rule",required:!1,nullable:!0},{name:"Enabled",type:"boolean",description:"Determines if the edge rule is currently enabled or not",required:!1,nullable:!1},{name:"OrderIndex",type:"integer",format:"int32",description:"The index of the edge rule in the list of execution priority",required:!1,nullable:!1},{name:"ReadOnly",type:"boolean",description:"Determines if the edge rule is read-only and cannot be modified or deleted",required:!1,nullable:!1}]},"post /pullzone/{}/edgerules/{}/setedgeruleenabled":{fields:[{name:"Id",type:"integer",format:"int64",required:!1,nullable:!1},{name:"Value",type:"boolean",required:!1,nullable:!1}]},"post /pullzone/{}/updateprivatekeytype":{fields:[{name:"Hostname",type:"string",required:!0,nullable:!1},{name:"KeyType",type:"integer",description:`0 = Ecdsa
1 = Rsa`,required:!0,nullable:!1,options:[{value:0,label:"Ecdsa"},{value:1,label:"Rsa"}]}]},"post /pullzone/requestexternaldnscertificate":{fields:[{name:"Hostname",type:"string",required:!0,nullable:!1}]},"post /pullzone/completeexternaldnscertificate":{fields:[{name:"Hostname",type:"string",required:!0,nullable:!1}]},"post /pullzone/requestexternalhttpcertificate":{fields:[{name:"Hostname",type:"string",required:!0,nullable:!1}]},"post /pullzone/completeexternalhttpcertificate":{fields:[{name:"Hostname",type:"string",required:!0,nullable:!1}]},"post /pullzone/{}/purgecache":{fields:[{name:"CacheTag",type:"string",required:!1,nullable:!0}]},"post /pullzone/checkavailability":{fields:[{name:"Name",type:"string",description:"Determines the name of the zone that we are checking",required:!1,nullable:!0}]},"post /pullzone/{}/addcertificate":{fields:[{name:"Hostname",type:"string",description:"The hostname to which the hostname will be added",required:!0,nullable:!1},{name:"Certificate",type:"string",description:"The Base64 encoded binary data of the certificate file",required:!0,nullable:!1},{name:"CertificateKey",type:"string",description:"The Base64 encoded binary data of the certificate key file",required:!0,nullable:!1}]},"delete /pullzone/{}/removecertificate":{fields:[{name:"Hostname",type:"string",description:"The hostname from which the certificate will be removed",required:!0,nullable:!1}]},"post /pullzone/{}/addhostname":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be added",required:!0,nullable:!1}]},"delete /pullzone/{}/removehostname":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be removed",required:!0,nullable:!1}]},"post /pullzone/{}/setforcessl":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be updated",required:!0,nullable:!1},{name:"ForceSSL",type:"boolean",description:"Set to true to force SSL on the given pull zone hostname",required:!0,nullable:!1}]},"post /pullzone/{}/resetsecuritykey":{fields:[{name:"SecurityKey",type:"string",required:!1,nullable:!0}]},"post /pullzone/{}/addallowedreferrer":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be added as an allowed referer",required:!0,nullable:!1}]},"post /pullzone/{}/removeallowedreferrer":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be removed as an allowed referer",required:!0,nullable:!1}]},"post /pullzone/{}/addblockedreferrer":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be added as a blocked referer",required:!0,nullable:!1}]},"post /pullzone/{}/removeblockedreferrer":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be removed as an allowed referer",required:!0,nullable:!1}]},"post /pullzone/{}/addblockedip":{fields:[{name:"BlockedIp",type:"string",description:"The IP that will be blocked from accessing the pull zone",required:!0,nullable:!1}]},"post /pullzone/{}/removeblockedip":{fields:[{name:"BlockedIp",type:"string",description:"The IP that will be removed fromt he block list",required:!0,nullable:!1}]},"post /storagezone":{fields:[{name:"Name",type:"string",description:"The name of the storage zone",required:!0,nullable:!1},{name:"Region",type:"string",description:"The code of the main storage zone region (Possible values: DE, NY, LA, SG)",required:!0,nullable:!1},{name:"ReplicationRegions",type:"array",description:"The code of the main storage zone region (Possible values: DE, NY, LA, SG, SYD)",required:!1,nullable:!0},{name:"ZoneTier",type:"integer",description:"Determines the storage zone tier that will be storing the data",required:!1,nullable:!1,options:[{value:0,label:"Standard"},{value:1,label:"Edge"}]},{name:"StorageZoneType",type:"integer",description:"The Storage Zone S3 support type",required:!1,nullable:!1,options:[{value:0,label:"NotSupported"},{value:1,label:"Supported"}]}]},"post /storagezone/checkavailability":{fields:[{name:"Name",type:"string",description:"Determines the name of the zone that we are checking",required:!1,nullable:!0}]},"post /storagezone/{}":{fields:[{name:"ReplicationZones",type:"array",description:"The list of replication zones enabld for the storage zone",required:!1,nullable:!0},{name:"OriginUrl",type:"string",description:"The origin URL of the storage zone",required:!1,nullable:!0},{name:"Custom404FilePath",type:"string",description:"The path to the custom file that will be returned in a case of 404",required:!1,nullable:!0},{name:"Rewrite404To200",type:"boolean",description:"Rewrite 404 status code to 200 for URLs without extension",required:!1,nullable:!0}]},"post /videolibrary/{}/addallowedreferrer":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be added as an allowed referer",required:!0,nullable:!1}]},"post /videolibrary/{}/addblockedreferrer":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be added as a blocked referer",required:!0,nullable:!1}]},"post /videolibrary":{fields:[{name:"Name",type:"string",description:"The name of the Video Library.",required:!0,nullable:!1},{name:"ReplicationRegions",type:"array",description:"The geo-replication regions of the underlying storage zone",required:!1,nullable:!0},{name:"PlayerVersion",type:"integer",format:"int32",description:"(Optional) Sets player version used for this library",required:!1,nullable:!0},{name:"EncodingTier",type:"integer",description:"(Optional) Defines encoding tier. Premium is a paid tier that offers prioritized encoding and extra codec support.",required:!1,nullable:!0,options:[{value:0,label:"Free"},{value:1,label:"Premium"}]},{name:"JitEncodingEnabled",type:"boolean",description:"(Optional) Determines whether JIT encoding should be used for the library. Supported in premium encoding only.",required:!1,nullable:!0},{name:"OutputCodecs",type:"string",description:"(Optional) Specifies which video codecs are used for encoding, provided as a comma-separated (CSV) string. Free encoding tier supports only x264. A premium encoding tier adds support for vp9, hevc, and av1.",required:!1,nullable:!0},{name:"EnabledResolutions",type:"string",description:"(Optional) Sets the enabled resolutions for the transcoding. At least one resolution should be enabled. Possible values: 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p",required:!1,nullable:!0},{name:"BlockNoneReferrer",type:"boolean",description:"(Optional) Determines if requests without a referer should be blocked.",required:!1,nullable:!0},{name:"EnableMP4Fallback",type:"boolean",description:"(Optional) Determines if MP4 fallback should be enabled for this library.",required:!1,nullable:!0},{name:"KeepOriginalFiles",type:"boolean",description:"(Optional) Determines if the original file should be kept after the video is processed.",required:!1,nullable:!0},{name:"AllowDirectPlay",type:"boolean",description:"(Optional) Determines if direct play URLs should be enabled for the library",required:!1,nullable:!0},{name:"EnableMultiAudioTrackSupport",type:"boolean",description:"(Optional) Determines if multiple output audio track support is enabled on video library.",required:!1,nullable:!0},{name:"EnableTranscribing",type:"boolean",description:"(Optional) Enables automatic audio transcribing for this library.",required:!1,nullable:!0},{name:"TranscribingCaptionLanguages",type:"array",description:"(Optional) Languages that captions will be automatically transcribed to.",required:!1,nullable:!0},{name:"EnableTranscribingTitleGeneration",type:"boolean",description:"(Optional) Determines if automatic transcribing title generation is enabled for this library. Enabling any smart generation feature turns on transcribing automatically.",required:!1,nullable:!0},{name:"EnableTranscribingDescriptionGeneration",type:"boolean",description:"(Optional) Determines if automatic transcribing description generation is enabled for this library. Enabling any smart generation feature turns on transcribing automatically.",required:!1,nullable:!0},{name:"EnableTranscribingChaptersGeneration",type:"boolean",description:"(Optional) Determines if automatic transcribing chapters generation is enabled for this library. Enabling any smart generation feature turns on transcribing automatically.",required:!1,nullable:!0},{name:"EnableTranscribingMomentsGeneration",type:"boolean",description:"(Optional) Determines if automatic transcribing moments generation is enabled for this library. Enabling any smart generation feature turns on transcribing automatically.",required:!1,nullable:!0},{name:"AllowEarlyPlay",type:"boolean",description:"(Optional) Enables Early Play. Enabling this also exposes originals via CDN settings consistent with the video library update API.",required:!1,nullable:!0}]},"post /videolibrary/{}":{fields:[{name:"Name",type:"string",description:"(Optional) Sets name of the video library",required:!1,nullable:!0},{name:"CustomHTML",type:"string",description:"(Optional) Sets the player custom HTML code",required:!1,nullable:!0},{name:"PlayerKeyColor",type:"string",description:"(Optional) Sets the player key control color",required:!1,nullable:!0},{name:"EnableTokenAuthentication",type:"boolean",description:"(Optional) Determines if the token authentication should be enabled",required:!1,nullable:!0},{name:"EnableTokenIPVerification",type:"boolean",description:"(Optional) Determines if the token IP verification should be enabled",required:!1,nullable:!0},{name:"ResetToken",type:"boolean",description:"(Optional) Set to true to reset the CDN and embed view token key",required:!1,nullable:!0},{name:"WatermarkPositionLeft",type:"integer",format:"int32",description:"(Optional) Sets the left offset of the watermark position (in %)",required:!1,nullable:!0},{name:"WatermarkPositionTop",type:"integer",format:"int32",description:"(Optional) Sets the top offset of the watermark position (in %)",required:!1,nullable:!0},{name:"WatermarkWidth",type:"integer",format:"int32",description:"(Optional) Sets the width of the watermark (in %)",required:!1,nullable:!0},{name:"WatermarkHeight",type:"integer",format:"int32",description:"(Optional) Sets the height of the watermark (in %)",required:!1,nullable:!0},{name:"EnabledResolutions",type:"string",description:"(Optional) Sets the enabled resolutions for the transcoding. At least one resolution should be enabled. Possible values: 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p",required:!1,nullable:!0},{name:"ViAiPublisherId",type:"string",description:"(Optional) Sets the vi.ai publisher ID",required:!1,nullable:!0},{name:"VastTagUrl",type:"string",description:"(Optional) Sets the Vast tag URL",required:!1,nullable:!0},{name:"WebhookUrl",type:"string",description:"(Optional) Sets the webhook API url",required:!1,nullable:!0},{name:"CaptionsFontSize",type:"integer",format:"int32",description:"(Optional) Sets the captions display font size",required:!1,nullable:!0},{name:"CaptionsFontColor",type:"string",description:"(Optional) Sets the captions display font color",required:!1,nullable:!0},{name:"CaptionsBackground",type:"string",description:"(Optional) Sets the captions display background color",required:!1,nullable:!0},{name:"UILanguage",type:"string",description:"(Optional) Sets the UI language of the video player.",required:!1,nullable:!0},{name:"AllowEarlyPlay",type:"boolean",description:"(Optional) Determines if the Early-Play feature should be enabled. Enabling this will enable Expose Originals.",required:!1,nullable:!0},{name:"PlayerTokenAuthenticationEnabled",type:"boolean",description:"(Optional) Determines if the token authentication should be enabled.",required:!1,nullable:!0},{name:"BlockNoneReferrer",type:"boolean",description:"(Optional) Determines if requests without a referer should be blocked.",required:!1,nullable:!0},{name:"EnableMP4Fallback",type:"boolean",description:"(Optional) Determines if MP4 fallback should be enabled for this library.",required:!1,nullable:!0},{name:"KeepOriginalFiles",type:"boolean",description:"(Optional) Determines if the original file should be kept after the video is processed.",required:!1,nullable:!0},{name:"AllowDirectPlay",type:"boolean",description:"(Optional) Determines if direct play URLs should be enabled for the library",required:!1,nullable:!0},{name:"EnableDRM",type:"boolean",description:"(Optional) Determines if MediaCage DRM should be enabled for this library",required:!1,nullable:!0},{name:"DrmVersion",type:"integer",description:"(Optional) Determines MediaCage DRM version to be used for this library",required:!1,nullable:!0,options:[{value:0,label:"Basic"},{value:1,label:"Enterprise"},{value:2,label:"BasicV2"}]},{name:"Controls",type:"string",description:"(Optional) The comma separated list of controls that will be displayed in the video player. Possible values: play-large, play, progress, current-time, mute, volume, captions, settings, pip, airplay, fullscreen.",required:!1,nullable:!0},{name:"PlaybackSpeeds",type:"string",description:"(Optional) The comma separated list of playback speeds that will be available in the video player. Possible values: 0.25,0.5,0.75,1.0,1.25,1.5,1.75,2.0,2.5,3,3.5,4",required:!1,nullable:!0},{name:"Bitrate240p",type:"integer",format:"int32",description:"(Optional) The bitrate used for encoding 240p videos",required:!1,nullable:!0},{name:"Bitrate360p",type:"integer",format:"int32",description:"(Optional) The bitrate used for encoding 360p videos",required:!1,nullable:!0},{name:"Bitrate480p",type:"integer",format:"int32",description:"(Optional) The bitrate used for encoding 480p videos",required:!1,nullable:!0},{name:"Bitrate720p",type:"integer",format:"int32",description:"(Optional) The bitrate used for encoding 720p videos",required:!1,nullable:!0},{name:"Bitrate1080p",type:"integer",format:"int32",description:"(Optional) The bitrate used for encoding 1080p videos",required:!1,nullable:!0},{name:"Bitrate1440p",type:"integer",format:"int32",description:"(Optional) The bitrate used for encoding 1440p videos",required:!1,nullable:!0},{name:"Bitrate2160p",type:"integer",format:"int32",description:"(Optional) The bitrate used for encoding 2160p videos",required:!1,nullable:!0},{name:"ShowHeatmap",type:"boolean",description:"(Optional) Determines if the video watch heatmap should be displayed in the player.",required:!1,nullable:!0},{name:"EnableContentTagging",type:"boolean",description:"(Optional) Determines if content tagging should be enabled for this library.",required:!1,nullable:!0},{name:"FontFamily",type:"string",description:"(Optional) The captions font family.",required:!1,nullable:!0},{name:"EnableTranscribing",type:"boolean",description:"(Optional) Determines if the automatic audio transcribing is currently enabled for this zone.",required:!1,nullable:!0},{name:"EnableTranscribingTitleGeneration",type:"boolean",description:"(Optional) Determines if automatic transcribing title generation is currently enabled.",required:!1,nullable:!0},{name:"EnableTranscribingDescriptionGeneration",type:"boolean",description:"(Optional) Determines if automatic transcribing description generation is currently enabled.",required:!1,nullable:!0},{name:"EnableTranscribingChaptersGeneration",type:"boolean",description:"(Optional) Determines if automatic transcribing chapters generation is currently enabled.",required:!1,nullable:!0},{name:"EnableTranscribingMomentsGeneration",type:"boolean",description:"(Optional) Determines if automatic transcribing moments generation is currently enabled.",required:!1,nullable:!0},{name:"TranscribingCaptionLanguages",type:"array",description:"(Optional) The list of languages that the captions will be automatically transcribed to.",required:!1,nullable:!0},{name:"EnableCaptionsInPlaylist",type:"boolean",description:"(Optional) Determines if any associated captions will be automatically signaled in the HLS master playlist via EXT-X-MEDIA tags, allowing client players to show captions.",required:!1,nullable:!0},{name:"RememberPlayerPosition",type:"boolean",description:"(Optional) Determines if the player will automatically remember the playback position.",required:!1,nullable:!0},{name:"EnableMultiAudioTrackSupport",type:"boolean",description:"(Optional) Determines if multiple output audio track support is enabled on video library.",required:!1,nullable:!0},{name:"UseSeparateAudioStream",type:"boolean",description:"(Optional) Determines whether output audio stream should be split from video stream segments.",required:!1,nullable:!0},{name:"JitEncodingEnabled",type:"boolean",description:"(Optional) Determines whether JIT encoding should be used for the library. Supported in premium encoding only.",required:!1,nullable:!0},{name:"EncodingTier",type:"integer",description:"(Optional) Defines encoding tier to be used with video library. premium is a paid tier that offers either JIT encoding or prioritized encoding and extra codec support.",required:!1,nullable:!0,options:[{value:0,label:"Free"},{value:1,label:"Premium"}]},{name:"OutputCodecs",type:"string",description:"(Optional) Specifies which video codecs are used for encoding, provided as a comma-separated (CSV) string. Free encoding tier supports only x264. A premium encoding tier adds support for vp9, hevc, and av1.",required:!1,nullable:!0},{name:"AppleFairPlayDrm",type:"object",description:"(Optional) Configure Apple FairPlay DRM. Works only if Enterprise DRM is set up.",required:!1,nullable:!0},{name:"GoogleWidevineDrm",type:"object",description:"(Optional) Configure Google Widevine DRM. Works only if Enterprise DRM is set up.",required:!1,nullable:!0},{name:"PlayerVersion",type:"integer",format:"int32",description:"(Optional) Sets player version used for this library",required:!1,nullable:!0},{name:"RemoveMetadataFromFallbackVideos",type:"boolean",description:"(Optional) Marks whether all potential video metadata should be removed from the fallback files",required:!1,nullable:!0},{name:"ScaleVideoUsingBothDimensions",type:"boolean",description:"(Optional) Marks whether videos should be scaled using both dimensions. Prevents videos being upscaled or unexpected aspect ratio changes.",required:!1,nullable:!0},{name:"ExposeOriginals",type:"boolean",description:"(Optional) Marks whether original video files should be exposed via CDN. Originals are not protected by DRM. Enabling Early-Play will enable this.",required:!1,nullable:!0},{name:"ExposeVideoMetadata",type:"boolean",description:"(Optional) Marks whether video metadata in form of schema meta tags and LD+JSON should be exposed.",required:!1,nullable:!0},{name:"EnableCompactControls",type:"boolean",description:"(Optional) Marks whether compact controls should be enabled for the player.",required:!1,nullable:!0}]},"post /videolibrary/{}/removeallowedreferrer":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be removed as an allowed referer",required:!0,nullable:!1}]},"post /videolibrary/{}/removeblockedreferrer":{fields:[{name:"Hostname",type:"string",description:"The hostname that will be removed as a blocked referer",required:!0,nullable:!1}]},"post /user/closeaccount":{fields:[{name:"Password",type:"string",required:!1,nullable:!0},{name:"Reason",type:"string",required:!1,nullable:!0}]},"post /dnszone/records/scan":{fields:[{name:"ZoneId",type:"integer",format:"int64",description:"The ID of the DNS Zone to scan. Either ZoneId or Domain must be provided, but not both.",required:!1,nullable:!0},{name:"Domain",type:"string",description:"The domain name to scan. Either ZoneId or Domain must be provided, but not both. Can be used even before creating the DNS zone.",required:!1,nullable:!0}]}},l={"get /dnszone":{fields:[{name:"page",type:"integer",format:"int32",required:!1,nullable:!1,minimum:1,maximum:2147483647,defaultValue:1},{name:"perPage",type:"integer",format:"int32",required:!1,nullable:!1,minimum:5,maximum:1e3,defaultValue:1e3},{name:"search",type:"string",required:!1,nullable:!0},{name:"view",type:"integer",description:`0 = Full
1 = Lite`,required:!1,nullable:!1,defaultValue:0,options:[{value:0,label:"Full"},{value:1,label:"Lite"}]}]},"get /dnszone/{}":{fields:[{name:"view",type:"integer",description:`0 = Full
1 = Lite`,required:!1,nullable:!1,defaultValue:0,options:[{value:0,label:"Full"},{value:1,label:"Lite"}]}]},"get /dnszone/{}/records":{fields:[{name:"page",type:"integer",format:"int32",required:!1,nullable:!1,minimum:1,maximum:2147483647,defaultValue:1},{name:"perPage",type:"integer",format:"int32",required:!1,nullable:!1,minimum:5,maximum:1e3,defaultValue:1e3},{name:"type",type:"integer",description:`0 = A
1 = AAAA
2 = CNAME
3 = TXT
4 = MX
5 = Redirect
6 = Flatten
7 = PullZone
8 = SRV
9 = CAA
10 = PTR
11 = Script
12 = NS
13 = SVCB
14 = HTTPS
15 = TLSA`,required:!1,nullable:!1,options:[{value:0,label:"A"},{value:1,label:"AAAA"},{value:2,label:"CNAME"},{value:3,label:"TXT"},{value:4,label:"MX"},{value:5,label:"Redirect"},{value:6,label:"Flatten"},{value:7,label:"PullZone"},{value:8,label:"SRV"},{value:9,label:"CAA"},{value:10,label:"PTR"},{value:11,label:"Script"},{value:12,label:"NS"},{value:13,label:"SVCB"},{value:14,label:"HTTPS"},{value:15,label:"TLSA"}]},{name:"search",type:"string",required:!1,nullable:!0}]},"get /pullzone":{fields:[{name:"page",type:"integer",format:"int32",required:!1,nullable:!1,minimum:1,maximum:2147483647,defaultValue:0},{name:"perPage",type:"integer",format:"int32",required:!1,nullable:!1,minimum:5,maximum:1e3,defaultValue:1e3},{name:"search",type:"string",required:!1,nullable:!0},{name:"includeCertificate",type:"boolean",required:!1,nullable:!1,defaultValue:!1}]},"get /pullzone/{}":{fields:[{name:"includeCertificate",type:"boolean",required:!1,nullable:!1,defaultValue:!1}]},"get /pullzone/loadfreecertificate":{fields:[{name:"hostname",type:"string",required:!0,nullable:!0},{name:"useOnlyHttp01",type:"boolean",required:!1,nullable:!1,defaultValue:!0}]},"post /purge":{fields:[{name:"url",type:"string",required:!0,nullable:!0},{name:"async",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"exactPath",type:"boolean",required:!1,nullable:!1,defaultValue:!1}]},"get /storagezone":{fields:[{name:"page",type:"integer",format:"int32",required:!1,nullable:!1,minimum:1,maximum:2147483647,defaultValue:0},{name:"perPage",type:"integer",format:"int32",required:!1,nullable:!1,minimum:5,maximum:1e3,defaultValue:1e3},{name:"includeDeleted",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"search",type:"string",required:!1,nullable:!0}]},"delete /storagezone/{}":{fields:[{name:"deleteLinkedPullZones",type:"boolean",required:!1,nullable:!1,defaultValue:!0}]},"post /storagezone/resetreadonlypassword":{fields:[{name:"id",type:"integer",format:"int64",required:!0,nullable:!1}]},"get /videolibrary":{fields:[{name:"page",type:"integer",format:"int32",required:!1,nullable:!1,minimum:1,maximum:2147483647,defaultValue:0},{name:"perPage",type:"integer",format:"int32",required:!1,nullable:!1,minimum:5,maximum:1e3,defaultValue:1e3},{name:"search",type:"string",required:!1,nullable:!0}]},"get /videolibrary/{}/transcribing/statistics":{fields:[{name:"dateFrom",type:"string",format:"date-time",required:!1,nullable:!0},{name:"dateTo",type:"string",format:"date-time",required:!1,nullable:!0}]},"get /videolibrary/{}/drm/statistics":{fields:[{name:"dateFrom",type:"string",format:"date-time",required:!1,nullable:!0},{name:"dateTo",type:"string",format:"date-time",required:!1,nullable:!0}]},"get /user/audit/{}":{fields:[{name:"Product",type:"array",required:!1,nullable:!0},{name:"ResourceType",type:"array",required:!1,nullable:!0},{name:"ResourceId",type:"array",required:!1,nullable:!0},{name:"ActorId",type:"array",required:!1,nullable:!0},{name:"Order",type:"string",required:!1,nullable:!1,options:[{value:"Ascending",label:"Ascending"},{value:"Descending",label:"Descending"}]},{name:"ContinuationToken",type:"string",required:!1,nullable:!0},{name:"Limit",type:"integer",format:"int32",required:!1,nullable:!1,minimum:1,maximum:1e4}]},"get /storagezone/{}/statistics/egress":{fields:[{name:"dateFrom",type:"string",format:"date-time",required:!1,nullable:!0},{name:"dateTo",type:"string",format:"date-time",required:!1,nullable:!0},{name:"hourly",type:"boolean",required:!1,nullable:!1,defaultValue:!1}]},"get /storagezone/{}/statistics":{fields:[{name:"dateFrom",type:"string",format:"date-time",required:!1,nullable:!0},{name:"dateTo",type:"string",format:"date-time",required:!1,nullable:!0}]},"get /pullzone/{}/optimizer/statistics":{fields:[{name:"dateFrom",type:"string",format:"date-time",required:!1,nullable:!0},{name:"dateTo",type:"string",format:"date-time",required:!1,nullable:!0},{name:"hourly",type:"boolean",required:!1,nullable:!1,defaultValue:!1}]},"get /pullzone/{}/originshield/queuestatistics":{fields:[{name:"dateFrom",type:"string",format:"date-time",required:!1,nullable:!0},{name:"dateTo",type:"string",format:"date-time",required:!1,nullable:!0},{name:"hourly",type:"boolean",required:!1,nullable:!1,defaultValue:!1}]},"get /pullzone/{}/safehop/statistics":{fields:[{name:"dateFrom",type:"string",format:"date-time",required:!1,nullable:!0},{name:"dateTo",type:"string",format:"date-time",required:!1,nullable:!0},{name:"hourly",type:"boolean",required:!1,nullable:!1,defaultValue:!1}]},"get /statistics":{fields:[{name:"dateFrom",type:"string",format:"date-time",required:!1,nullable:!0},{name:"dateTo",type:"string",format:"date-time",required:!1,nullable:!0},{name:"pullZone",type:"integer",format:"int64",required:!1,nullable:!1,defaultValue:-1},{name:"serverZoneId",type:"integer",format:"int64",required:!1,nullable:!1,defaultValue:-1},{name:"loadErrors",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"hourly",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"exactRange",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"loadOriginResponseTimes",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"loadOriginTraffic",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"loadRequestsServed",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"loadBandwidthUsed",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"loadOriginShieldBandwidth",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"loadGeographicTrafficDistribution",type:"boolean",required:!1,nullable:!1,defaultValue:!1},{name:"loadUserBalanceHistory",type:"boolean",required:!1,nullable:!1,defaultValue:!1}]},"get /search":{fields:[{name:"search",type:"string",required:!1,nullable:!0},{name:"from",type:"integer",format:"int32",required:!1,nullable:!1,defaultValue:0},{name:"size",type:"integer",format:"int32",required:!1,nullable:!1,defaultValue:20}]},"get /dnszone/{}/statistics":{fields:[{name:"dateFrom",type:"string",format:"date-time",required:!1,nullable:!0},{name:"dateTo",type:"string",format:"date-time",required:!1,nullable:!0}]},"get /apikey":{fields:[{name:"page",type:"integer",format:"int32",required:!1,nullable:!1,minimum:1,maximum:2147483647,defaultValue:1},{name:"perPage",type:"integer",format:"int32",required:!1,nullable:!1,minimum:5,maximum:1e3,defaultValue:1e3}]}};function n(e){return`${e.method} ${e.path}`.toLowerCase().replace(/\{[^}]+\}/g,"{}")}function i(e){return a[n(e)]??null}function o(e){return t[n(e)]??null}function s(e){return l[n(e)]??null}export{i as requestBodyExample,o as requestBodySchema,s as requestQuerySchema};
