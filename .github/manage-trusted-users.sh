#!/bin/bash

# Vercel Auto-Approve Management Script
# This script helps manage and test the Vercel auto-approval automation

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/vercel-auto-approve-config.yml"
REPO_OWNER="SandeepVashishtha"
REPO_NAME="Eventra"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}===========================================${NC}"
    echo -e "${BLUE}  Vercel Auto-Approve Management Tool${NC}"
    echo -e "${BLUE}===========================================${NC}"
    echo ""
}

check_user() {
    local username="$1"
    
    if [ -z "$username" ]; then
        echo -e "${RED}Error: Username is required${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}Checking user: $username${NC}"
    
    # Get user info from GitHub API
    if ! user_info=$(curl -s "https://api.github.com/users/$username" 2>/dev/null); then
        echo -e "${RED}Error: Failed to fetch user information${NC}"
        return 1
    fi
    
    # Check if user exists
    if echo "$user_info" | grep -q '"message": "Not Found"'; then
        echo -e "${RED}Error: User '$username' not found${NC}"
        return 1
    fi
    
    # Get contributor info
    if ! contributors=$(curl -s "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/contributors" 2>/dev/null); then
        echo -e "${RED}Error: Failed to fetch contributors${NC}"
        return 1
    fi
    
    # Parse user data
    followers=$(echo "$user_info" | grep '"followers"' | sed 's/.*: \([0-9]*\).*/\1/' | head -1 || echo "0")
    public_repos=$(echo "$user_info" | grep '"public_repos"' | sed 's/.*: \([0-9]*\).*/\1/' | head -1 || echo "0")
    
    # Find contribution count
    contributions=$(echo "$contributors" | grep -A 20 "\"login\": \"$username\"" | grep '"contributions"' | head -1 | sed 's/.*: \([0-9]*\).*/\1/' || echo "0")
    
    # Set defaults if parsing failed
    [ -z "$followers" ] && followers="0"
    [ -z "$public_repos" ] && public_repos="0"
    [ -z "$contributions" ] && contributions="0"
    
    echo ""
    echo -e "${BLUE}User Profile:${NC}"
    echo -e "  Username: $username"
    echo -e "  Followers: $followers"
    echo -e "  Public Repos: $public_repos"
    echo -e "  Contributions to $REPO_NAME: $contributions"
    echo ""
    
    # Determine trust level
    trust_level="none"
    auto_approve="false"
    
    if [ "$contributions" -ge 100 ] && [ "$followers" -ge 50 ]; then
        trust_level="core-maintainer"
        auto_approve="true"
    elif [ "$contributions" -ge 50 ] && [ "$followers" -ge 20 ]; then
        trust_level="senior-dev"
        auto_approve="true"
    elif [ "$contributions" -ge 20 ]; then
        trust_level="active-contributor"
        auto_approve="true"
    elif [ "$contributions" -ge 10 ]; then
        trust_level="regular-contributor"
        auto_approve="false"
    fi
    
    echo -e "${BLUE}Trust Assessment:${NC}"
    echo -e "  Trust Level: $trust_level"
    if [ "$auto_approve" = "true" ]; then
        echo -e "  Auto-Approval: ${GREEN}✅ Enabled${NC}"
    else
        echo -e "  Auto-Approval: ${RED}❌ Disabled${NC}"
    fi
    
    # Check if explicitly trusted
    if grep -q "- $username" "$CONFIG_FILE" 2>/dev/null; then
        echo -e "  Explicit Trust: ${GREEN}✅ Listed in config${NC}"
    else
        echo -e "  Explicit Trust: ${YELLOW}⚠️ Not explicitly listed${NC}"
    fi
    
    echo ""
}

list_trusted_users() {
    echo -e "${YELLOW}Trusted Users Configuration:${NC}"
    echo ""
    
    if [ -f "$CONFIG_FILE" ]; then
        echo -e "${BLUE}Explicit Trusted Users:${NC}"
        grep -A 10 "trusted_users:" "$CONFIG_FILE" | grep "  -" | sed 's/  - /  • /' || echo "  (none)"
        echo ""
        
        echo -e "${BLUE}Current Criteria:${NC}"
        echo -e "  Core Maintainer: 100+ contributions, 50+ followers"
        echo -e "  Senior Dev: 50+ contributions, 20+ followers"
        echo -e "  Active Contributor: 20+ contributions"
        echo -e "  Regular Contributor: 10+ contributions (manual approval)"
    else
        echo -e "${RED}Configuration file not found: $CONFIG_FILE${NC}"
    fi
    echo ""
}

show_help() {
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  check <username>    Check if a user would be considered trusted"
    echo "  list               List current trusted users and criteria"
    echo "  help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 check sandeepvashishtha"
    echo "  $0 list"
    echo ""
}

main() {
    print_header
    
    case "${1:-help}" in
        "check")
            check_user "$2"
            ;;
        "list")
            list_trusted_users
            ;;
        "help"|"-h"|"--help"|"")
            show_help
            ;;
        *)
            echo -e "${RED}Error: Unknown command '$1'${NC}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

main "$@"