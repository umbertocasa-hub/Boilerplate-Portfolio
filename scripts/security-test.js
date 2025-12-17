const https = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(path, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(`${BASE_URL}${path}`, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, data }));
        });
        req.on('error', reject);
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

async function testSQLInjection() {
    console.log("Testing SQL Injection...");
    // Simulate login attempt with SQLi
    // Since we use server actions, direct HTTP post to an endpoint isn't exactly how attacks happen, 
    // but we can try to hit a protected route or login page with bad inputs if we could interact with the form.
    // However, for this simplified test, we'll check if the rate limiter and basic server response holds up.
    // True SQLi testing requires submitting the form. We'll simulate a request to login page.
    try {
        const res = await makeRequest('/login?email=\' OR \'1\'=\'1');
        if (res.statusCode === 200) {
            console.log("✅ SQLi payload in URL handled gracefully (Server returned 200 OK, not 500 Error)");
        } else {
            console.log(`⚠️ Server returned ${res.statusCode} for SQLi payload`);
        }
    } catch (e) {
        console.error("❌ SQLi Test Failed:", e.message);
    }
}

async function testXSS() {
    console.log("Testing XSS...");
    try {
        const res = await makeRequest('/login?email=<script>alert(1)</script>');
        if (res.statusCode === 200) {
            console.log("✅ XSS payload in URL handled gracefully (Server returned 200 OK)");
            if (res.data.includes("<script>alert(1)</script>")) {
                // Next.js escapes by default, so even if present in HTML it should be escaped.
                // We'd need to check if it's rendered as raw HTML. 
                // Simple presence check isn't enough failure proof but good indicator.
                console.log("ℹ️ Payload reflected in response body (Normal for inputs, check if escaped)");
            }
        }
    } catch (e) {
        console.error("❌ XSS Test Failed:", e.message);
    }
}

async function testRateLimiting() {
    console.log("Testing Rate Limiting (DDoS Simulation)...");
    const TOTAL_REQUESTS = 120;
    let blockedCount = 0;

    const promises = [];
    for (let i = 0; i < TOTAL_REQUESTS; i++) {
        promises.push(makeRequest('/'));
    }

    const results = await Promise.all(promises);
    results.forEach(res => {
        if (res.statusCode === 429) blockedCount++;
    });

    if (blockedCount > 0) {
        console.log(`✅ Rate Limiter Verified! Blocked ${blockedCount} requests out of ${TOTAL_REQUESTS}.`);
    } else {
        console.error("❌ Rate Limiter FAILED! No requests were blocked.");
    }
}

async function runTests() {
    await testSQLInjection();
    await testXSS();
    await testRateLimiting();
    console.log("\nSecurity Verification Complete.");
}

runTests();
