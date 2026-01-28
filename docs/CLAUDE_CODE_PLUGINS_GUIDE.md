# Claude Code Plugins: Comprehensive Guide with Example Prompts

> A complete reference for all Claude Code plugins with practical prompts and best practices.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Plugin Commands Reference](#plugin-commands-reference)
3. [Documentation Plugins](#documentation-plugins)
4. [Code Intelligence (LSP) Plugins](#code-intelligence-lsp-plugins)
5. [Git & Version Control Plugins](#git--version-control-plugins)
6. [Project Management Plugins](#project-management-plugins)
7. [Design & UI Plugins](#design--ui-plugins)
8. [Infrastructure & Deployment Plugins](#infrastructure--deployment-plugins)
9. [Monitoring & Debugging Plugins](#monitoring--debugging-plugins)
10. [Communication Plugins](#communication-plugins)
11. [Creating Custom Plugins](#creating-custom-plugins)
12. [Best Practices & Lessons Learned](#best-practices--lessons-learned)
13. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Install Your First Plugin

```bash
# Open interactive plugin manager
/plugin

# Or install directly
/plugin install context7@claude-plugins-official
```

### Essential Commands

| Command | Purpose |
|---------|---------|
| `/plugin` | Open interactive plugin manager |
| `/plugin install <name>` | Install a plugin |
| `/plugin marketplace add <source>` | Add a plugin source |
| `/plugin-name:command` | Run a plugin command |

### After Installation

**Always restart Claude Code** to load new plugins:
```bash
# Exit (Ctrl+C), then restart
claude
```

---

## Plugin Commands Reference

```
┌─────────────────────────────────────────────────────────────┐
│  CLAUDE CODE PLUGINS CHEAT SHEET                            │
├─────────────────────────────────────────────────────────────┤
│  /plugin                         → Plugin manager           │
│  /plugin install <name>          → Install plugin           │
│  /plugin marketplace add <src>   → Add marketplace          │
│  /plugin-name:command [args]     → Run plugin skill         │
├─────────────────────────────────────────────────────────────┤
│  SCOPES:                                                    │
│  • user    - Available in all projects (default)            │
│  • project - Shared with team (.claude/settings.json)       │
│  • local   - Personal to your project only                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Documentation Plugins

### Context7

**Purpose:** Fetches real-time, version-specific documentation from official sources.

**Installation:**
```bash
/plugin install context7@claude-plugins-official
```

**How It Works:**
- Automatically activates when you ask about libraries/APIs
- Injects documentation directly into Claude's context
- Eliminates hallucinated APIs and outdated methods

#### Example Prompts

**Basic Documentation Lookup:**
```
Create a Next.js middleware that checks for a valid JWT in cookies
and redirects unauthenticated users to /login. use context7
```

**Framework Setup:**
```
Create a basic Next.js project with app router. use context7
```

**API Reference:**
```
Show me how to use Prisma's createMany with transactions. use context7
```

**Configuration Help:**
```
Configure a Cloudflare Worker script to cache JSON API responses
for five minutes. use context7
```

**Direct Library Lookup (Skip Search):**
```
Implement basic authentication with Supabase.
use library /supabase/supabase for API and docs.
```

**Auto-Invoke Rule (Add to CLAUDE.md):**
```markdown
Always use Context7 MCP when I need library/API documentation,
code generation, setup or configuration steps without me having
to explicitly ask.
```

#### Pro Tips
- Add `use context7` to any prompt needing library docs
- Use `/library-id` syntax when you know the exact library
- Context7 reduces token usage by loading docs on-demand

**Source:** [Context7 MCP Documentation](https://upstash.com/blog/context7-mcp)

---

## Code Intelligence (LSP) Plugins

### TypeScript LSP

**Purpose:** Real-time type checking, diagnostics, and code navigation.

**Installation:**
```bash
# Install the language server first
npm install -g @vtsls/language-server typescript

# Then install the plugin
/plugin install vtsls@claude-code-lsps
```

**Capabilities:**
- Automatic diagnostics after edits (type errors, missing imports)
- Go-to-definition and find-references
- Hover information for types
- No configuration needed beyond installation

#### Example Prompts

**Fix Type Errors:**
```
Check the TypeScript diagnostics for src/api/client.ts
and fix any type errors.
```

**Navigate Codebase:**
```
Find all references to the UserService class
and show me where it's instantiated.
```

**Understand Types:**
```
Show me the type definition for the AuthContext
and explain how it's structured.
```

**Refactor with Confidence:**
```
Rename the 'handleSubmit' function to 'onFormSubmit'
across all files that reference it.
```

### Available LSP Plugins

| Language | Plugin | Install Command |
|----------|--------|-----------------|
| TypeScript/JS | vtsls | `/plugin install vtsls@claude-code-lsps` |
| Python | pyright | `/plugin install pyright@claude-code-lsps` |
| Rust | rust-analyzer | `/plugin install rust-analyzer@claude-code-lsps` |
| Go | gopls | `/plugin install gopls@claude-code-lsps` |
| Java | jdtls | `/plugin install jdtls@claude-code-lsps` |
| C# | csharp | `/plugin install csharp@claude-code-lsps` |
| C/C++ | clangd | `/plugin install clangd@claude-code-lsps` |
| PHP | intelephense | `/plugin install intelephense@claude-code-lsps` |
| Ruby | solargraph | `/plugin install solargraph@claude-code-lsps` |

#### Example Prompts (Multi-Language)

**Python:**
```
Run pyright diagnostics on the data_pipeline module
and fix any type annotation issues.
```

**Rust:**
```
Check for borrow checker errors in src/lib.rs
and explain how to fix them.
```

**Go:**
```
Find all implementations of the Handler interface
and show their method signatures.
```

**Source:** [Claude Code LSP Guide](https://www.aifreeapi.com/en/posts/claude-code-lsp)

---

## Git & Version Control Plugins

### Commit Commands Plugin

**Purpose:** Automates git workflows with intelligent commit messages.

**Installation:**
```bash
/plugin install commit-commands@claude-plugins-official
```

#### Available Commands

| Command | Description |
|---------|-------------|
| `/commit` | Create commit with auto-generated message |
| `/commit-push-pr` | Commit, push, and create PR in one step |

#### Example Prompts

**Basic Commit:**
```
/commit
```
Claude analyzes your changes and generates a conventional commit message.

**Full Workflow:**
```
/commit-push-pr
```
Creates branch (if needed), commits, pushes, opens PR with summary.

**Custom Commit Message:**
```
/commit "feat(auth): add JWT token refresh mechanism"
```

### Code Review Plugin

**Purpose:** AI-powered code review with confidence scoring.

**Installation:**
```bash
/plugin install code-review@claude-plugins-official
```

#### Example Prompts

**Review to Terminal:**
```
/code-review
```

**Review as PR Comment:**
```
/code-review --comment
```

**Review Specific Files:**
```
Review the changes in src/services/auth.ts for security issues
and potential bugs. Focus on authentication logic.
```

### GitHub Plugin

**Purpose:** Full GitHub integration for issues, PRs, and repositories.

**Installation:**
```bash
/plugin install github@claude-plugins-official
```

#### Example Prompts

**PR Operations:**
```
Create a pull request for this branch with a summary of all changes
since we branched from main.
```

```
Review PR #123 and provide feedback on code quality,
potential bugs, and adherence to our coding standards.
```

**Issue Management:**
```
Create a GitHub issue for the bug we just discussed.
Include reproduction steps and the error stack trace.
```

```
List all open issues labeled 'bug' in this repository
and prioritize them by severity.
```

**Repository Exploration:**
```
Show me the recent commits on the main branch
and summarize what changed in each.
```

**Source:** [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions)

---

## Project Management Plugins

### Atlassian (Jira & Confluence)

**Purpose:** Integrate with Jira tickets and Confluence documentation.

**Installation:**
```bash
/plugin install atlassian@claude-plugins-official
```

#### Jira Example Prompts

**Query Issues:**
```
Summarize all Jira issues assigned to me in the 'Q3 Planning' project
that are still marked as 'In Progress'.
```

```
Show me the highest priority bugs in the Mobile App project
that were created this week.
```

**Create Issues:**
```
Create five Jira issues in the 'Mobile App' project for:
1. Fix login bug
2. Update onboarding flow
3. Test Android push notifications
4. Redesign settings page
5. Review user analytics dashboard
```

**Update Issues:**
```
Move ticket PROJ-123 to 'In Review' and add a comment
summarizing the implementation approach.
```

**Sprint Management:**
```
What's the burndown status for the current sprint?
List any blocked tickets.
```

#### Confluence Example Prompts

**Create Documentation:**
```
Create a new Confluence page titled 'Post-Mortem: Sprint 24'
in the 'Engineering/Incidents' space. Include a summary of
key takeaways and assign action items to team members.
```

```
Analyze this codebase and create a comprehensive Confluence page
documenting how OpenTelemetry is used throughout the project.
Include code examples, configuration details, and best practices.
```

**Search Documentation:**
```
Search Confluence for our API authentication documentation
and summarize the OAuth flow.
```

#### Cross-Platform Workflows

```
Read the spec from Confluence page 'Product Requirements/Feature X'
and create Jira tickets for each acceptance criterion.
```

```
Generate a project status report from this week's Jira activity
and publish it to Confluence.
```

**Source:** [Atlassian MCP Integration](https://ivandachev.com/blog/claude-code-mcp-atlassian-integration)

### Linear

**Purpose:** Modern issue tracking integration.

**Installation:**
```bash
# Add MCP configuration
claude mcp add linear
```

#### Example Prompts

**Read & Implement:**
```
Read ticket LIN-456, implement the feature,
then update the ticket status to 'In Review'.
```

**Create Issues:**
```
Create a Linear issue for the performance regression
we discovered in the checkout flow.
```

**Query Backlog:**
```
Show me all unassigned issues in the Backend team's backlog
sorted by priority.
```

### Notion

**Purpose:** Connect to Notion workspaces for documentation and notes.

**Installation:**
```bash
# Add via MCP
claude mcp add notion
```

#### Example Prompts

**Search & Reference:**
```
Search Notion for our deployment runbook
and summarize the steps for production deploys.
```

**Create Pages:**
```
Create a Notion page documenting this new API endpoint
with request/response examples.
```

**Cross-Tool Search:**
```
Find documents in Google Drive related to the authentication project
using Notion's connected integrations.
```

**Source:** [Notion MCP Help Center](https://www.notion.com/help/notion-mcp)

---

## Design & UI Plugins

### Figma

**Purpose:** Convert Figma designs to production code.

**Installation:**
```bash
/plugin install figma@claude-plugins-official
```

#### Example Prompts

**Design to Code:**
```
Convert this Figma design to code using HTML and Tailwind CSS.
The frame I want you to focus on is titled 'Card'.
Please provide HTML with Tailwind classes that:
- Utilizes design tokens from my config (colors, spacing, typography)
- Includes placeholder divs with gray background for images
- Uses semantic HTML elements
- Is ready to paste into a Tailwind environment
```

**Selection-Based:**
```
[Select a frame in Figma]
Add a button to this card component.
```

**Link-Based:**
```
Convert this sign-up card design to React components:
https://figma.com/file/xxx/Design?node-id=123
```

**Component Implementation:**
```
Implement the navigation bar from my Figma file as a React component
with responsive behavior for mobile and desktop.
```

**Extract Design Tokens:**
```
Extract the color palette and typography scale from my Figma file
and generate a Tailwind config.
```

#### Advanced Figma Workflows

**Design System:**
```
Analyze my Figma design system and create corresponding
React components with proper prop interfaces.
```

**Responsive Implementation:**
```
Convert the mobile and desktop variants of this Figma layout
to a responsive React component using CSS Grid.
```

**Source:** [Claude Code + Figma MCP Server](https://www.builder.io/blog/claude-code-figma-mcp-server)

---

## Infrastructure & Deployment Plugins

### Vercel

**Purpose:** Deploy to Vercel directly from Claude Code.

**Installation:**
```bash
/plugin install vercel@claude-plugins-official
```

#### Example Prompts

**Deploy:**
```
Deploy the current project to Vercel with production settings.
```

**Environment Variables:**
```
Set up the environment variables for our Vercel deployment
based on .env.example.
```

**Preview Deployments:**
```
Create a preview deployment for this feature branch
and share the URL.
```

### Supabase

**Purpose:** Manage Supabase projects, database, auth, and storage.

**Installation:**
```bash
/plugin install supabase@claude-plugins-official
```

#### Example Prompts

**Database Operations:**
```
Create a new table in Supabase for storing user preferences
with columns for theme, notifications, and language.
```

```
Write a Supabase query to fetch all users who signed up
in the last 30 days with their associated profiles.
```

**Authentication:**
```
Set up Supabase authentication with email/password
and Google OAuth providers.
```

**Row Level Security:**
```
Create RLS policies for the documents table so users
can only access their own documents.
```

**Edge Functions:**
```
Create a Supabase Edge Function that processes webhook events
from Stripe and updates user subscription status.
```

**Schema Sync:**
```
Analyze my TypeScript types and generate matching
Supabase database schema migrations.
```

**Source:** [Claude Code + Supabase Guide](https://medium.com/@dan.avila7/claude-code-supabase-integration-complete-guide-with-agents-commands-and-mcp-427613d9051e)

### Firebase

**Purpose:** Google's mobile/web backend with Firestore, auth, and functions.

**Installation:**
```bash
/plugin install firebase@claude-plugins-official
```

#### Example Prompts

**Firestore:**
```
Create Firestore security rules that allow authenticated users
to read all posts but only write to their own.
```

**Cloud Functions:**
```
Create a Firebase Cloud Function that triggers on new user signup
and sends a welcome email.
```

**Authentication:**
```
Set up Firebase Authentication with phone number verification.
```

---

## Monitoring & Debugging Plugins

### Sentry

**Purpose:** Error monitoring, debugging, and performance tracking.

**Installation:**
```bash
# Add via MCP
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

#### Example Prompts

**Error Analysis:**
```
What are the top errors in the last 24 hours?
```

```
Show me the stack trace for error ID abc123
and suggest a fix.
```

```
Which deployment introduced these new errors?
```

**Issue Investigation:**
```
/seer What are the top errors today?
```

```
/seer Show critical issues in web-app
```

```
/seer Which issues have the most user impact?
```

**Performance:**
```
/seer Show me database performance for backend project
```

```
/seer What's the request latency for api-gateway?
```

**Root Cause Analysis:**
```
Analyze the most frequent error in production this week,
identify the root cause, and suggest a code fix.
```

**Source:** [Sentry MCP Server Documentation](https://docs.sentry.io/product/sentry-mcp/)

---

## Communication Plugins

### Slack

**Purpose:** Route coding tasks from Slack to Claude Code.

**Setup:**
- Claude Owner must enable Claude Code on the web in Admin settings
- Individual users must have access to Claude Code on the web
- Mention @Claude in Slack for coding tasks

#### Example Workflows

**Bug Investigation:**
```
@Claude investigate the login bug reported in #engineering
and create a fix.
```

**Code Review:**
```
@Claude review the changes in PR #456
and post feedback.
```

**Collaborative Debugging:**
```
@Claude help debug the issue we're discussing -
the payment flow is failing for some users.
```

**Source:** [Claude Code in Slack](https://code.claude.com/docs/en/slack)

---

## Creating Custom Plugins

### Plugin Structure

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json              # Required manifest
├── skills/
│   └── skill-name/
│       └── SKILL.md             # Skill definition
├── agents/                       # Optional
├── commands/                     # Optional
├── hooks/
│   └── hooks.json               # Optional
└── .mcp.json                    # MCP configurations (optional)
```

### Minimal Plugin Example

**.claude-plugin/plugin.json:**
```json
{
  "name": "my-first-plugin",
  "description": "A greeting plugin to learn the basics",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  }
}
```

**skills/hello/SKILL.md:**
```markdown
---
description: Greet the user with a friendly message
disable-model-invocation: true
---

Greet the user warmly and ask how you can help them today.
```

### Testing Your Plugin

```bash
# Load plugin during development
claude --plugin-dir ./my-plugin

# Test your command
/my-plugin:hello
```

### Custom Slash Commands

Create `.claude/commands/commit.md`:
```markdown
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit with a conventional message
---

Analyze staged changes and create a commit with a conventional commit message.
Look at recent commits to match the project's style.
```

**Source:** [Claude Code Plugins Documentation](https://code.claude.com/docs/en/plugins)

---

## Best Practices & Lessons Learned

### Prompt Engineering Tips

**Be Specific:**
```
# Good
"Create a React component for user authentication
with email/password inputs, validation, and error states"

# Vague (but useful for exploration)
"What would you improve in this file?"
```

**Interview-Driven Development:**
```
I want to add a caching layer to our API.
Please interview me to understand the requirements better
before suggesting an implementation.
```

**Avoid Over-Engineering:**
Add to your CLAUDE.md:
```markdown
Avoid over-engineering. Only make changes that are directly requested
or clearly necessary. Keep solutions simple and focused.
```

### Plugin-Specific Best Practices

**Context7:**
- Always add `use context7` when asking about libraries
- Use `/library-id` syntax to skip the search step
- Add auto-invoke rule to your CLAUDE.md

**LSP Plugins:**
- Install language servers globally before the plugin
- Check `Errors` tab in `/plugin` if diagnostics aren't working
- May show false positives in monorepos

**Git Plugins:**
- Use `disable-model-invocation: true` for commands with side effects
- Let Claude analyze recent commits to match your style
- Review auto-generated PR descriptions before merging

**Project Management:**
- Keep Jira/Linear in sync with code changes
- Use cross-platform workflows for automation
- Document decisions in Confluence during implementation

### Performance Optimization

1. **Use Skills Over Hooks:** Skills load on-demand, reducing token usage
2. **Namespace Commands:** Prevents conflicts between plugins
3. **Leverage Caching:** Context7 caches documentation lookups
4. **Parallel Operations:** Launch multiple independent tasks together

**Sources:**
- [Best Practices for Claude Code](https://code.claude.com/docs/en/best-practices)
- [Claude Code Best Practices (Anthropic)](https://www.anthropic.com/engineering/claude-code-best-practices)
- [CLAUDE.md Best Practices](https://arize.com/blog/claude-md-best-practices-learned-from-optimizing-claude-code-with-prompt-learning/)

---

## Troubleshooting

### Plugin Not Loading

```bash
# Check for errors
/plugin
# Navigate to "Errors" tab

# Verify installation
/plugin
# Navigate to "Installed" tab
```

### LSP Not Working

1. Verify language server is installed globally
2. Check `PATH` includes the language server binary
3. Restart Claude Code after installation
4. Check for monorepo configuration issues

### MCP Connection Issues

```bash
# List MCP servers
claude mcp list

# Check server status
claude mcp status <server-name>

# Re-authenticate if needed
claude mcp add <server-name>
```

### Common Error Messages

| Error | Solution |
|-------|----------|
| "No LSP server available" | Install language server + restart |
| "MCP authentication failed" | Re-run OAuth flow |
| "Plugin namespace conflict" | Check for duplicate plugin names |
| "Skill not found" | Verify plugin is enabled + restart |

---

## Resources

- [Official Claude Code Docs](https://code.claude.com/docs)
- [Plugin Marketplace](https://code.claude.com/docs/en/discover-plugins)
- [GitHub: Claude Code](https://github.com/anthropics/claude-code)
- [GitHub: Awesome Claude Code](https://github.com/hesreallyhim/awesome-claude-code)
- [Claude Code Showcase](https://github.com/ChrisWiles/claude-code-showcase)

---

*Last updated: January 2026*
