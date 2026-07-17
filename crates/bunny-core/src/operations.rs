#[derive(Debug, Clone, Copy, serde::Serialize)]
pub struct Operation {
    pub id: &'static str,
    pub group: &'static str,
    pub method: &'static str,
    pub path: &'static str,
    pub summary: &'static str,
    pub destructive: bool,
}

macro_rules! op {
    ($id:literal,$group:literal,$method:literal,$path:literal,$summary:literal) => {
        Operation {
            id: $id,
            group: $group,
            method: $method,
            path: $path,
            summary: $summary,
            destructive: false,
        }
    };
    ($id:literal,$group:literal,$method:literal,$path:literal,$summary:literal,danger) => {
        Operation {
            id: $id,
            group: $group,
            method: $method,
            path: $path,
            summary: $summary,
            destructive: true,
        }
    };
}

pub static OPERATIONS: &[Operation] = &[
    op!(
        "country.list",
        "country",
        "GET",
        "/country",
        "Get country list"
    ),
    op!("region.list", "region", "GET", "/region", "List regions"),
    op!("dns.zone.list", "dns", "GET", "/dnszone", "List DNS zones"),
    op!("dns.zone.create", "dns", "POST", "/dnszone", "Add DNS zone"),
    op!(
        "dns.zone.get",
        "dns",
        "GET",
        "/dnszone/{id}",
        "Get DNS zone"
    ),
    op!(
        "dns.zone.update",
        "dns",
        "POST",
        "/dnszone/{id}",
        "Update DNS zone"
    ),
    op!(
        "dns.zone.delete",
        "dns",
        "DELETE",
        "/dnszone/{id}",
        "Delete DNS zone",
        danger
    ),
    op!(
        "dns.zone.export",
        "dns",
        "GET",
        "/dnszone/{id}/export",
        "Export DNS zone"
    ),
    op!(
        "dns.zone.check-availability",
        "dns",
        "POST",
        "/dnszone/checkavailability",
        "Check DNS zone availability"
    ),
    op!(
        "dns.zone.issue-certificate",
        "dns",
        "POST",
        "/dnszone/{id}/certificate/issue",
        "Issue wildcard certificate"
    ),
    op!(
        "dns.zone.statistics",
        "dns",
        "GET",
        "/dnszone/{id}/statistics",
        "Get DNS query statistics"
    ),
    op!(
        "dns.zone.dnssec-enable",
        "dns",
        "POST",
        "/dnszone/{id}/dnssec",
        "Enable DNSSEC"
    ),
    op!(
        "dns.zone.dnssec-disable",
        "dns",
        "DELETE",
        "/dnszone/{id}/dnssec",
        "Disable DNSSEC",
        danger
    ),
    op!(
        "dns.record.list",
        "dns",
        "GET",
        "/dnszone/{zoneId}/records",
        "List DNS records"
    ),
    op!(
        "dns.record.create",
        "dns",
        "PUT",
        "/dnszone/{zoneId}/records",
        "Add DNS record"
    ),
    op!(
        "dns.record.update",
        "dns",
        "POST",
        "/dnszone/{zoneId}/records/{id}",
        "Update DNS record"
    ),
    op!(
        "dns.record.delete",
        "dns",
        "DELETE",
        "/dnszone/{zoneId}/records/{id}",
        "Delete DNS record",
        danger
    ),
    op!(
        "dns.record.import",
        "dns",
        "POST",
        "/dnszone/{zoneId}/import",
        "Import DNS records"
    ),
    op!(
        "dns.record.scan-start",
        "dns",
        "POST",
        "/dnszone/records/scan",
        "Start DNS record scan"
    ),
    op!(
        "dns.record.scan-get",
        "dns",
        "GET",
        "/dnszone/{zoneId}/records/scan",
        "Get DNS record scan"
    ),
    op!(
        "pull-zone.list",
        "pull-zone",
        "GET",
        "/pullzone",
        "List pull zones"
    ),
    op!(
        "pull-zone.create",
        "pull-zone",
        "POST",
        "/pullzone",
        "Add pull zone"
    ),
    op!(
        "pull-zone.count",
        "pull-zone",
        "GET",
        "/pullzone/count",
        "Count pull zones"
    ),
    op!(
        "pull-zone.get",
        "pull-zone",
        "GET",
        "/pullzone/{id}",
        "Get pull zone"
    ),
    op!(
        "pull-zone.update",
        "pull-zone",
        "POST",
        "/pullzone/{id}",
        "Update pull zone"
    ),
    op!(
        "pull-zone.delete",
        "pull-zone",
        "DELETE",
        "/pullzone/{id}",
        "Delete pull zone",
        danger
    ),
    op!(
        "pull-zone.check-availability",
        "pull-zone",
        "POST",
        "/pullzone/checkavailability",
        "Check pull zone availability"
    ),
    op!(
        "pull-zone.purge",
        "pull-zone",
        "POST",
        "/pullzone/{id}/purgeCache",
        "Purge pull zone cache",
        danger
    ),
    op!(
        "pull-zone.edge-rule-upsert",
        "pull-zone",
        "POST",
        "/pullzone/{pullZoneId}/edgerules/addOrUpdate",
        "Add or update edge rule"
    ),
    op!(
        "pull-zone.edge-rule-delete",
        "pull-zone",
        "DELETE",
        "/pullzone/{pullZoneId}/edgerules/{edgeRuleId}",
        "Delete edge rule",
        danger
    ),
    op!(
        "pull-zone.edge-rule-enable",
        "pull-zone",
        "POST",
        "/pullzone/{pullZoneId}/edgerules/{edgeRuleId}/setEdgeRuleEnabled",
        "Enable edge rule"
    ),
    op!(
        "pull-zone.certificate-free",
        "pull-zone",
        "GET",
        "/pullzone/loadFreeCertificate",
        "Load free certificate"
    ),
    op!(
        "pull-zone.external-dns-request",
        "pull-zone",
        "POST",
        "/pullzone/requestExternalDnsCertificate",
        "Request external DNS certificate"
    ),
    op!(
        "pull-zone.external-dns-complete",
        "pull-zone",
        "POST",
        "/pullzone/completeExternalDnsCertificate",
        "Complete external DNS certificate"
    ),
    op!(
        "pull-zone.external-http-request",
        "pull-zone",
        "POST",
        "/pullzone/requestExternalHttpCertificate",
        "Request external HTTP certificate"
    ),
    op!(
        "pull-zone.external-http-complete",
        "pull-zone",
        "POST",
        "/pullzone/completeExternalHttpCertificate",
        "Complete external HTTP certificate"
    ),
    op!(
        "pull-zone.certificate-add",
        "pull-zone",
        "POST",
        "/pullzone/{id}/addCertificate",
        "Add custom certificate"
    ),
    op!(
        "pull-zone.certificate-remove",
        "pull-zone",
        "DELETE",
        "/pullzone/{id}/removeCertificate",
        "Remove certificate",
        danger
    ),
    op!(
        "pull-zone.hostname-add",
        "pull-zone",
        "POST",
        "/pullzone/{id}/addHostname",
        "Add hostname"
    ),
    op!(
        "pull-zone.hostname-remove",
        "pull-zone",
        "DELETE",
        "/pullzone/{id}/removeHostname",
        "Remove hostname",
        danger
    ),
    op!(
        "pull-zone.force-ssl",
        "pull-zone",
        "POST",
        "/pullzone/{id}/setForceSSL",
        "Set force SSL"
    ),
    op!(
        "pull-zone.private-key-type",
        "pull-zone",
        "POST",
        "/pullzone/{id}/updatePrivateKeyType",
        "Change private key type"
    ),
    op!(
        "pull-zone.token-key-reset",
        "pull-zone",
        "POST",
        "/pullzone/{id}/resetSecurityKey",
        "Reset token key",
        danger
    ),
    op!(
        "pull-zone.allowed-referrer-add",
        "pull-zone",
        "POST",
        "/pullzone/{id}/addAllowedReferrer",
        "Add allowed referrer"
    ),
    op!(
        "pull-zone.allowed-referrer-remove",
        "pull-zone",
        "POST",
        "/pullzone/{id}/removeAllowedReferrer",
        "Remove allowed referrer",
        danger
    ),
    op!(
        "pull-zone.blocked-referrer-add",
        "pull-zone",
        "POST",
        "/pullzone/{id}/addBlockedReferrer",
        "Add blocked referrer"
    ),
    op!(
        "pull-zone.blocked-referrer-remove",
        "pull-zone",
        "POST",
        "/pullzone/{id}/removeBlockedReferrer",
        "Remove blocked referrer",
        danger
    ),
    op!(
        "pull-zone.blocked-ip-add",
        "pull-zone",
        "POST",
        "/pullzone/{id}/addBlockedIp",
        "Add blocked IP"
    ),
    op!(
        "pull-zone.blocked-ip-remove",
        "pull-zone",
        "POST",
        "/pullzone/{id}/removeBlockedIp",
        "Remove blocked IP",
        danger
    ),
    op!("purge.url", "purge", "POST", "/purge", "Purge URL", danger),
    op!(
        "storage-zone.list",
        "storage-zone",
        "GET",
        "/storagezone",
        "List storage zones"
    ),
    op!(
        "storage-zone.create",
        "storage-zone",
        "POST",
        "/storagezone",
        "Add storage zone"
    ),
    op!(
        "storage-zone.check-availability",
        "storage-zone",
        "POST",
        "/storagezone/checkavailability",
        "Check storage availability"
    ),
    op!(
        "storage-zone.get",
        "storage-zone",
        "GET",
        "/storagezone/{id}",
        "Get storage zone"
    ),
    op!(
        "storage-zone.update",
        "storage-zone",
        "POST",
        "/storagezone/{id}",
        "Update storage zone"
    ),
    op!(
        "storage-zone.delete",
        "storage-zone",
        "DELETE",
        "/storagezone/{id}",
        "Delete storage zone",
        danger
    ),
    op!(
        "storage-zone.password-reset",
        "storage-zone",
        "POST",
        "/storagezone/{id}/resetPassword",
        "Reset storage password",
        danger
    ),
    op!(
        "storage-zone.read-only-password-reset",
        "storage-zone",
        "POST",
        "/storagezone/resetReadOnlyPassword",
        "Reset read-only password",
        danger
    ),
    op!(
        "storage-zone.regions",
        "storage-zone",
        "GET",
        "/storagezone/regions",
        "Get storage regions"
    ),
    op!(
        "storage-zone.statistics",
        "storage-zone",
        "GET",
        "/storagezone/{id}/statistics",
        "Get storage statistics"
    ),
    op!(
        "storage-zone.egress-statistics",
        "storage-zone",
        "GET",
        "/storagezone/{id}/statistics/egress",
        "Get storage egress statistics"
    ),
    op!(
        "video-library.list",
        "video-library",
        "GET",
        "/videolibrary",
        "List video libraries"
    ),
    op!(
        "video-library.create",
        "video-library",
        "POST",
        "/videolibrary",
        "Add video library"
    ),
    op!(
        "video-library.get",
        "video-library",
        "GET",
        "/videolibrary/{id}",
        "Get video library"
    ),
    op!(
        "video-library.update",
        "video-library",
        "POST",
        "/videolibrary/{id}",
        "Update video library"
    ),
    op!(
        "video-library.delete",
        "video-library",
        "DELETE",
        "/videolibrary/{id}",
        "Delete video library",
        danger
    ),
    op!(
        "video-library.languages",
        "video-library",
        "GET",
        "/videolibrary/languages",
        "Get languages"
    ),
    op!(
        "video-library.allowed-referrer-add",
        "video-library",
        "POST",
        "/videolibrary/{id}/addAllowedReferrer",
        "Add allowed referrer"
    ),
    op!(
        "video-library.allowed-referrer-remove",
        "video-library",
        "POST",
        "/videolibrary/{id}/removeAllowedReferrer",
        "Remove allowed referrer",
        danger
    ),
    op!(
        "video-library.blocked-referrer-add",
        "video-library",
        "POST",
        "/videolibrary/{id}/addBlockedReferrer",
        "Add blocked referrer"
    ),
    op!(
        "video-library.blocked-referrer-remove",
        "video-library",
        "POST",
        "/videolibrary/{id}/removeBlockedReferrer",
        "Remove blocked referrer",
        danger
    ),
    op!(
        "video-library.watermark-add",
        "video-library",
        "PUT",
        "/videolibrary/{id}/watermark",
        "Add watermark"
    ),
    op!(
        "video-library.watermark-delete",
        "video-library",
        "DELETE",
        "/videolibrary/{id}/watermark",
        "Delete watermark",
        danger
    ),
    op!(
        "video-library.live-thumbnail-add",
        "video-library",
        "PUT",
        "/videolibrary/{id}/live/thumbnail",
        "Add live thumbnail"
    ),
    op!(
        "video-library.live-thumbnail-delete",
        "video-library",
        "DELETE",
        "/videolibrary/{id}/live/thumbnail",
        "Delete live thumbnail",
        danger
    ),
    op!(
        "video-library.live-watermark-add",
        "video-library",
        "PUT",
        "/videolibrary/{id}/live/watermark",
        "Add live watermark"
    ),
    op!(
        "video-library.live-watermark-delete",
        "video-library",
        "DELETE",
        "/videolibrary/{id}/live/watermark",
        "Delete live watermark",
        danger
    ),
    op!(
        "video-library.api-key-reset",
        "video-library",
        "POST",
        "/videolibrary/{id}/resetApiKey",
        "Reset library API key",
        danger
    ),
    op!(
        "video-library.read-only-api-key-reset",
        "video-library",
        "POST",
        "/videolibrary/{id}/resetReadOnlyApiKey",
        "Reset read-only API key",
        danger
    ),
    op!(
        "video-library.transcribing-statistics",
        "video-library",
        "GET",
        "/videolibrary/{id}/transcribing/statistics",
        "Get transcribing statistics"
    ),
    op!(
        "video-library.drm-statistics",
        "video-library",
        "GET",
        "/videolibrary/{id}/drm/statistics",
        "Get DRM statistics"
    ),
    op!(
        "statistics.get",
        "statistics",
        "GET",
        "/statistics",
        "Get statistics"
    ),
    op!(
        "statistics.optimizer",
        "statistics",
        "GET",
        "/pullzone/{pullZoneId}/optimizer/statistics",
        "Get optimizer statistics"
    ),
    op!(
        "statistics.origin-shield-queue",
        "statistics",
        "GET",
        "/pullzone/{pullZoneId}/originshield/queuestatistics",
        "Get Origin Shield queue statistics"
    ),
    op!(
        "statistics.safehop",
        "statistics",
        "GET",
        "/pullzone/{pullZoneId}/safehop/statistics",
        "Get SafeHop statistics"
    ),
    op!("search.global", "search", "GET", "/search", "Global search"),
    op!(
        "audit.list",
        "audit",
        "GET",
        "/user/audit/{date}",
        "Get user audit log"
    ),
    op!(
        "billing.details",
        "billing",
        "GET",
        "/billing",
        "Get billing details"
    ),
    op!(
        "billing.payment-requests",
        "billing",
        "GET",
        "/billing/payment-requests",
        "Get pending payment requests"
    ),
    op!(
        "billing.invoice",
        "billing",
        "GET",
        "/billing/payment-request-invoice/{id}/pdf",
        "Download invoice PDF"
    ),
    op!(
        "billing.summary",
        "billing",
        "GET",
        "/billing/summary",
        "Get billing summary"
    ),
    op!(
        "billing.summary-document",
        "billing",
        "GET",
        "/billing/summary/{billingRecordId}/pdf",
        "Download billing summary PDF"
    ),
    op!(
        "api-key.list",
        "api-key",
        "GET",
        "/apikey",
        "List account API keys"
    ),
    op!(
        "affiliate.get",
        "affiliate",
        "GET",
        "/billing/affiliate",
        "Get affiliate details"
    ),
    op!(
        "account.close",
        "account",
        "POST",
        "/user/closeaccount",
        "Close account",
        danger
    ),
];

pub fn operation(id: &str) -> Option<&'static Operation> {
    OPERATIONS.iter().find(|operation| operation.id == id)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashSet;

    #[test]
    fn registry_has_all_unique_core_operations() {
        assert_eq!(OPERATIONS.len(), 95);
        let ids: HashSet<_> = OPERATIONS.iter().map(|operation| operation.id).collect();
        assert_eq!(ids.len(), OPERATIONS.len());
    }
}
