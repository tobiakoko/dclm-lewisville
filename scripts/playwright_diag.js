const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const url = process.env.URL || 'http://localhost:3000';
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleMessages = [];
  page.on('console', (msg) => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  const pageErrors = [];
  page.on('pageerror', (err) => {
    pageErrors.push(String(err));
  });

  const requestFailures = [];
  page.on('requestfailed', (req) => {
    const failure = req.failure ? req.failure() : null;
    requestFailures.push({ url: req.url(), method: req.method(), failure: failure ? failure.errorText || failure : null });
  });

  try {
    console.log('Navigating to', url);
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(e => { console.error('goto error', e && e.message); return null; });
    if (resp) console.log('Response status:', resp.status());

    // wait a bit for client-side runtime logs
    await page.waitForTimeout(1500);

    const html = await page.content();
    fs.writeFileSync('/tmp/diag_page.html', html);

    const screenshotPath = '/tmp/diag_home.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });

    console.log('\n=== CONSOLE MESSAGES ===');
    console.log(JSON.stringify(consoleMessages, null, 2));

    console.log('\n=== PAGE ERRORS ===');
    console.log(JSON.stringify(pageErrors, null, 2));

    console.log('\n=== REQUEST FAILURES ===');
    console.log(JSON.stringify(requestFailures, null, 2));

    console.log('\nSaved screenshot to', screenshotPath);
    console.log('Saved HTML to /tmp/diag_page.html');
  } catch (err) {
    console.error('Diagnostic script error:', err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();
