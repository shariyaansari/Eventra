# Auto-unassign Stale Issues

This document explains the automated issue assignment management system implemented in this repository.

## Overview

The auto-unassignment workflow helps maintain project momentum by automatically unassigning contributors from issues when:
- The issue has been assigned for more than 7 days (configurable)
- No pull request has been opened to address the issue
- The issue is still open

## How It Works

### Schedule
- **Daily**: Runs automatically every day at 6:00 AM UTC
- **Manual**: Can be triggered manually via GitHub Actions with custom threshold

### Process
1. **Scan Issues**: Checks all open issues that have assignees
2. **Check Assignment Date**: Finds when each issue was last assigned
3. **Search for PRs**: Looks for any pull requests that reference the issue using:
   - Issue number mentions
   - Keywords like "fixes #123", "closes #123", "resolves #123"
4. **Evaluate**: If no PR is found and the assignment is older than the threshold
5. **Unassign**: Removes the assignee(s) and adds an explanatory comment
6. **Report**: Creates a summary issue when unassignments occur

### What Assignees Can Expect

#### Automatic Comment
When unassigned, contributors receive a comment explaining:
- Why the unassignment happened
- How to get reassigned if still working on it
- Guidance for future contributions

#### Timeline
- **Assignment**: Issue gets assigned to a contributor
- **7 Days**: Grace period for opening a PR (even draft)
- **Day 8+**: Eligible for auto-unassignment
- **Next Daily Run**: Gets unassigned and commented

## Avoiding Auto-unassignment

To keep your assignment:
1. **Open a Draft PR**: Even work-in-progress PRs prevent unassignment
2. **Reference the Issue**: Make sure your PR mentions the issue number
3. **Stay Active**: Comment on the issue if you need more time
4. **Ask for Reassignment**: If unassigned, simply ask to be reassigned

## Configuration

### Default Settings
- **Threshold**: 7 days
- **Schedule**: Daily at 6:00 AM UTC
- **Grace Period**: Issues assigned today won't be unassigned until day 8

### Manual Trigger
Repository maintainers can manually run the workflow with custom settings:
1. Go to Actions → Auto-unassign stale issues
2. Click "Run workflow"
3. Set custom threshold (default: 7 days)

## Benefits

### For Contributors
- **Clear Expectations**: Know the timeline for making progress
- **Fair Access**: Issues become available if not actively worked on
- **Guidance**: Receive helpful feedback and instructions

### For Maintainers
- **Automated Management**: No manual tracking of stale assignments
- **Project Momentum**: Issues don't get stuck with inactive contributors
- **Transparency**: Clear process and communication

### For the Community
- **Open Opportunities**: More issues available for new contributors
- **Active Project**: Demonstrates ongoing maintenance and activity
- **Predictable Process**: Consistent and fair assignment management

## Common Questions

**Q: I was just assigned yesterday, will I be unassigned?**
A: No, there's a 7-day grace period. You have plenty of time to start working.

**Q: I'm working on it but it's complex, what should I do?**
A: Open a draft PR or comment on the issue explaining your progress. This prevents auto-unassignment.

**Q: I was unassigned but still want to work on it?**
A: Comment on the issue asking to be reassigned. Maintainers will be happy to reassign active contributors.

**Q: Does this apply to maintainers too?**
A: The automation treats all assignees equally, but maintainers can easily reassign themselves or adjust settings as needed.

## Technical Details

The workflow uses GitHub's REST API to:
- List assigned issues
- Check assignment history via issue events
- Search for related pull requests
- Unassign users and add comments
- Create summary reports

The search for related PRs is comprehensive, checking for:
- Direct issue number references
- GitHub's closing keywords
- Manual keyword searches

## Monitoring

### Summary Reports
When issues are unassigned, a summary issue is automatically created with:
- Date and statistics
- List of processed issues
- Explanation of the automation

### Workflow Logs
Detailed logs are available in the GitHub Actions tab showing:
- Issues processed
- Assignment dates found
- PR search results
- Unassignment actions taken

This automation helps maintain an active, welcoming, and efficiently managed open-source project. 🚀