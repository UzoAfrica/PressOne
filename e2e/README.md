# E2E Testing Strategy

## Handling Flakiness

1. **Explicit Waiting**
   - Using `expect().toBeVisible()` instead of arbitrary timeouts
   - Waiting for elements to be present before interacting
   - Verifying state changes after actions

2. **Retry Logic**
   - Leveraging Playwright's built-in auto-retry mechanism
   - Using test retry configuration in `playwright.config.ts`
   - Implementing soft assertions where appropriate

## Test Failure Reporting

1. **Automatic Artifacts**
   - Screenshots on failure
   - Video recordings of failed tests
   - Detailed error logs with stack traces

2. **CI Integration**
   - Test results published as CI artifacts
   - Failed test summary in PR comments
   - Test history tracking for flakiness detection

## CI Integration

Our E2E testing strategy fits into CI through:

1. **Pipeline Configuration**
   - Running tests in parallel across browsers
   - Retrying failed tests automatically
   - Caching browser binaries for faster runs

2. **Environment Setup**
   - Using CI-specific environment variables
   - Running against isolated test databases
   - Clean state for each test run

3. **Performance**
   - Headless browser execution
   - Test sharding for faster completion
   - Selective test execution based on changes