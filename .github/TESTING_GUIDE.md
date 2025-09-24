# Manual Testing Guide for Auto-unassign Workflow

This guide helps repository maintainers test the auto-unassignment workflow before it runs automatically.

## Quick Test

### Option 1: Manual Workflow Dispatch (Recommended)
1. Go to **Actions** → **Auto-unassign stale issues**
2. Click **"Run workflow"**
3. Set `days_threshold` to a small value (e.g., `1`) for testing
4. Click **"Run workflow"** button
5. Monitor the workflow logs for results

### Option 2: GitHub CLI (if available)
```bash
# Trigger with default 7-day threshold
gh workflow run auto-unassign-stale-issues.yml

# Trigger with custom threshold for testing
gh workflow run auto-unassign-stale-issues.yml -f days_threshold=1
```

## Test Scenarios

### Scenario 1: Recent Assignment (Should NOT be unassigned)
1. Assign yourself to a test issue today
2. Run workflow with `days_threshold=7`
3. Verify: Issue remains assigned

### Scenario 2: Old Assignment (Should be unassigned)
1. Find an issue assigned >7 days ago without a PR
2. Run workflow with default settings
3. Verify: Issue gets unassigned and comment is added

### Scenario 3: Issue with PR (Should NOT be unassigned)
1. Find an old assigned issue that has a related PR
2. Run workflow
3. Verify: Issue remains assigned

## What to Look For

### Successful Run Indicators
✅ **Workflow completes without errors**
✅ **Console logs show processed issues**
✅ **Appropriate issues are unassigned**
✅ **Comments are added to unassigned issues**
✅ **Summary issue is created (if any unassignments)**

### Expected Logs
```
🔍 Checking for issues assigned more than 7 days ago without PRs...
📋 Found X assigned open issues to check
📝 Processing issue #123: "Issue title"
📅 Issue #123 assigned Y days ago to @username
✅ Issue #123 is within the 7-day threshold
```

### Error Scenarios
❌ **Rate limiting errors** (workflow will retry)
❌ **Permission errors** (check workflow permissions)
❌ **API errors** (temporary GitHub API issues)

## Monitoring

### After Running
1. Check **Actions** tab for workflow run status
2. Look for **summary issues** created by the workflow
3. Verify **unassigned issues** have explanatory comments
4. Check that **recent assignments** are preserved

### Regular Monitoring
- Weekly review of auto-unassignment summary issues
- Monitor contributor feedback on unassignments
- Adjust threshold if needed (current: 7 days)

## Troubleshooting

### Common Issues
| Problem | Solution |
|---------|----------|
| Workflow doesn't run | Check permissions and triggers |
| No issues processed | Verify there are assigned issues |
| Rate limiting | Workflow includes delays, will retry |
| Wrong issues unassigned | Review search queries and logic |

### Debug Steps
1. Check workflow permissions
2. Review recent workflow runs in Actions
3. Examine individual issue events and PRs
4. Test with a longer threshold initially

## Customization

### Adjusting the Threshold
- **Default**: 7 days (good balance)
- **Conservative**: 10-14 days (for slower-moving projects)
- **Aggressive**: 3-5 days (for fast-moving projects)

### Modifying Search Queries
The workflow searches for PRs using these patterns:
- Direct issue mentions: `#123`
- Closing keywords: `fixes #123`, `closes #123`, `resolves #123`

Add more patterns if needed in the workflow file.

## Best Practices

### Before Deployment
1. Test with a longer threshold first (e.g., 14 days)
2. Run a few manual tests with different scenarios
3. Announce the new policy to contributors
4. Monitor first few runs closely

### Ongoing Management
- Review summary issues regularly
- Be responsive to contributor feedback
- Consider seasonal adjustments (holidays, etc.)
- Keep documentation updated

## Emergency Procedures

### Disable Workflow
1. Go to **.github/workflows/auto-unassign-stale-issues.yml**
2. Comment out the `schedule` trigger
3. Commit and push

### Mass Reassignment (if needed)
If the workflow unassigns too many issues incorrectly:
1. Disable the workflow first
2. Manually reassign issues as needed
3. Review and fix the workflow logic
4. Re-enable with careful testing

Remember: The workflow is designed to be helpful, not disruptive. Regular monitoring and adjustment ensure it serves the community well!