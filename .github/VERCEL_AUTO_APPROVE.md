# Vercel Auto-Approval Automation

This automation automatically approves Vercel deployment checks for trusted users, helping to streamline the development process while maintaining security.

## How It Works

The automation triggers on two events:
1. **Deployment Status Events**: When Vercel creates deployment status checks
2. **Pull Request Events**: When PRs are opened/updated to identify trusted users

### Trusted User Criteria

Users are considered "trusted" based on their contribution activity and GitHub profile:

#### Explicit Trusted Users
- Project maintainers and leads (defined in configuration)
- Currently includes: `sandeepvashishtha` (Project Lead)

#### Contribution-Based Trust Levels

1. **Core Maintainer**
   - Minimum 100+ contributions to the repository
   - Minimum 50+ GitHub followers
   - Auto-approval: ✅ Enabled

2. **Senior Developer**
   - Minimum 50+ contributions to the repository
   - Minimum 20+ GitHub followers
   - Auto-approval: ✅ Enabled

3. **Active Contributor**
   - Minimum 20+ contributions to the repository
   - Any number of followers
   - Auto-approval: ✅ Enabled

4. **Regular Contributor**
   - Minimum 10+ contributions to the repository
   - Auto-approval: ❌ Requires manual approval

## What Gets Auto-Approved

- ✅ Vercel deployments from `vercel.app` domains
- ✅ Vercel preview deployments
- ✅ Only deployments in "pending" status
- ✅ Maximum 5 auto-approvals per PR (configurable)

## Configuration

The automation is configured via `.github/vercel-auto-approve-config.yml`:

```yaml
# Explicit trusted users
trusted_users:
  - sandeepvashishtha

# Contribution thresholds
criteria:
  core_maintainer:
    min_contributions: 100
    min_followers: 50
    auto_approve: true

# Settings
settings:
  comment_on_approval: true
  notify_trusted_status: true
  max_auto_approvals_per_pr: 5
```

## Notifications

The automation provides clear feedback through PR comments:

- 🤖 **Trusted User Detected**: When a trusted user opens a PR
- 🤖 **Vercel Deployment Auto-Approved**: When a deployment is auto-approved
- 🤖 **Auto-Approval Failed**: If the automation encounters an error

## Security Features

1. **Transparent Logging**: All actions are logged in GitHub Actions
2. **Audit Trail**: Comments provide clear reasoning for auto-approvals
3. **Configurable Limits**: Maximum approvals per PR prevent abuse
4. **Environment Restrictions**: Only approved Vercel environments are auto-approved
5. **Fallback to Manual**: Failed auto-approvals fall back to manual review

## Benefits

- ⚡ **Faster Deployments**: Trusted users can deploy without waiting for manual approval
- 🔒 **Maintained Security**: Only established contributors get auto-approval
- 📊 **Clear Criteria**: Transparent, merit-based trust system
- 🎯 **Configurable**: Easy to adjust criteria as the project evolves
- 📝 **Audit Trail**: Complete history of all auto-approval decisions

## Monitoring

To monitor the automation:

1. Check GitHub Actions tab for workflow runs
2. Look for PR comments indicating auto-approval activities
3. Review the configuration file to adjust criteria as needed

## Troubleshooting

### Common Issues

1. **Deployment Not Auto-Approved**
   - Check if user meets trusted criteria
   - Verify deployment is from approved Vercel environment
   - Check GitHub Actions logs for error messages

2. **Configuration Not Loading**
   - Ensure `.github/vercel-auto-approve-config.yml` has valid YAML syntax
   - Check GitHub Actions logs for configuration errors

3. **API Rate Limits**
   - The automation includes delays to prevent rate limiting
   - Multiple rapid deployments may need manual approval

### Disabling Auto-Approval

To temporarily disable auto-approval, set all `auto_approve` values to `false` in the configuration file, or disable the GitHub Action workflow.

## Contributing to This Automation

When contributing improvements to this automation:

1. Test changes thoroughly in a fork first
2. Update this documentation for any new features
3. Ensure backward compatibility with existing configuration
4. Add appropriate logging for debugging

---

*This automation helps balance development velocity with security by automatically approving deployments from established, trusted contributors.*