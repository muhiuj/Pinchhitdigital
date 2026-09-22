#!/usr/bin/env bash
# Build It Live registration smoke test.
#
# Sends a REAL registration through the full pipeline:
#   /api/webinar-register -> Notion Webinar Signups row -> production n8n
#   WF1 -> confirmation email (+ notify email to Jeremy).
#
# Usage:
#   ./scripts/test-webinar-registration.sh                # local dev server
#   ./scripts/test-webinar-registration.sh https://www.pinchhitdigital.com
#   TEST_EMAIL=muhiuj+whatever@gmail.com ./scripts/test-webinar-registration.sh
#
# Defaults to a plus-tagged address so the test creates its OWN Notion row
# instead of touching your real registration. Plus-tagged mail still lands
# in the muhiuj@gmail.com inbox.
#
# ⚠️ CLEANUP: a test row left as Status=Registered WILL receive the real
# reminder emails on Sep 28-29. After verifying, set the test row's Status
# to "No-show" in Notion (or delete the row).
#
# The email-only path is the only one a script can drive. The SMS path
# requires the on-page OTP step: test it by registering in the browser
# with your mobile and the consent box checked.

set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
TEST_EMAIL="${TEST_EMAIL:-muhiuj+test002@gmail.com}"
TEST_NAME="${TEST_NAME:-QA Test}"

echo "→ Registering ${TEST_NAME} <${TEST_EMAIL}> at ${BASE_URL}/api/webinar-register"

HTTP_CODE=$(curl -sS -o /tmp/bil-register-response.json -w "%{http_code}" \
  -X POST "${BASE_URL}/api/webinar-register" \
  -H "Content-Type: application/json" \
  -d "{
    \"first_name\": \"${TEST_NAME}\",
    \"email\": \"${TEST_EMAIL}\",
    \"restaurant\": \"QA Test Co (safe to delete)\",
    \"website\": \"\",
    \"sms_consent\": false,
    \"phone_verified\": false
  }")

echo "→ HTTP ${HTTP_CODE}"
echo "→ Response body:"
cat /tmp/bil-register-response.json
echo

if [ "${HTTP_CODE}" != "200" ]; then
  echo "✗ FAIL: expected HTTP 200. Check the dev server logs."
  exit 1
fi

echo "→ Checking /api/webinar-join (should report the window is closed until Sep 29)"
curl -sS "${BASE_URL}/api/webinar-join"
echo
echo
echo "✓ Request accepted. Now verify each hop:"
echo "  1. INBOX  muhiuj@gmail.com: confirmation email 'You're in. Sep 29,"
echo "     11:30 AM Central.' Check: topic says 'Build Your Own AI"
echo "     Assistant', .ics attached, Google Calendar link works, and the"
echo "     replay/kit line reads the new replay-only wording."
echo "  2. INBOX  jeremy.muhiu@pinchhitdigital.com: 'New Build It Live"
echo "     registrant: ${TEST_NAME} (QA Test Co...)' notify email."
echo "  3. NOTION Webinar Signups DB: new row for ${TEST_EMAIL},"
echo "     Session=2026-09, Status=Registered."
echo "  4. N8N    muhiuj.app.n8n.cloud -> WF1 Registration Intake ->"
echo "     Executions: newest run green."
echo "  5. CLEANUP: set the test row's Status to No-show (or delete it) so"
echo "     it does not receive the real Sep 28-29 reminder touches."
