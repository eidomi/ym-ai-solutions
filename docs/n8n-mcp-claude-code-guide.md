# n8n MCP + Claude Code Automation Guide

Quick reference for building workflow automations using n8n MCP servers with Claude Code.

## Setup

### Environment Variables
```bash
N8N_API_URL=https://your-n8n-instance.com
N8N_API_KEY=your-api-key
```

### Claude Code MCP Config (`.mcp.json`)
```json
{
  "mcpServers": {
    "n8n": {
      "command": "npx",
      "args": ["-y", "@leonardsellem/n8n-mcp-server"],
      "env": {
        "N8N_API_URL": "https://your-n8n.com",
        "N8N_API_KEY": "your-key"
      }
    }
  }
}
```

## Core MCP Tools

| Tool | Purpose |
|------|---------|
| `search_workflows` | Find workflows by name/description |
| `get_workflow_details` | Get full workflow JSON + trigger info |
| `execute_workflow` | Run workflow with input data |
| `n8n_create_workflow` | Create new workflow |
| `n8n_update_partial_workflow` | Diff-based updates (token-efficient) |
| `n8n_delete_workflow` | Remove workflow |
| `execution_list` | List workflow runs |
| `execution_get` | Get execution details |

## Workflow Execution

### Form Trigger
```json
{
  "workflowId": "abc123",
  "inputs": {
    "type": "form",
    "formData": {
      "Brand Name": "Acme Corp",
      "Email": "user@example.com"
    }
  }
}
```

### Webhook Trigger
```json
{
  "workflowId": "abc123",
  "inputs": {
    "type": "webhook",
    "webhookData": {
      "method": "POST",
      "body": { "key": "value" },
      "headers": { "Authorization": "Bearer token" }
    }
  }
}
```

### Chat Trigger
```json
{
  "workflowId": "abc123",
  "inputs": {
    "type": "chat",
    "chatInput": "Hello, process this message"
  }
}
```

## n8n Expression Patterns

### Reference Source Nodes (Critical for AI Agents)
```javascript
// Get data from specific node
{{ $('Node Name').first().json.fieldName }}

// Get all items from node
{{ $('Node Name').all() }}

// Map multiple items
{{ $('Node Name').all().map(item => item.json.field).join(', ') }}

// Access form fields
{{ $('Form Trigger').first().json['Field Name'] }}
```

### Data Transformation
```javascript
// Conditional
{{ $json.status === 'active' ? 'Yes' : 'No' }}

// String manipulation
{{ $json.name.toUpperCase() }}

// Math
{{ $json.price * 1.1 }}

// Date (Luxon)
{{ DateTime.now().toISO() }}
{{ DateTime.fromISO($json.date).plus({ days: 7 }).toFormat('yyyy-MM-dd') }}
```

### Workflow Metadata
```javascript
{{ $workflow.name }}
{{ $workflow.id }}
{{ $execution.id }}
{{ $execution.mode }}
```

## Common Patterns

### Fix AI Agent Data Flow Issue
When Merge node breaks data references:

**Problem:**
```javascript
// Broken - $json.brand_data is undefined after Merge
{{ $json.brand_data }}
```

**Solution:**
```javascript
// Reference source nodes directly
{{ $('Form Trigger').first().json['Brand Name'] }}
{{ $('Get Brand Results').first().json }}
{{ $('Get Competitor Results').all().map(i => JSON.stringify(i.json)).join('\n') }}
```

### Diff-Based Workflow Updates
Token-efficient partial updates:
```typescript
{
  name: 'n8n_update_partial_workflow',
  arguments: {
    id: 'workflow-id',
    operations: [
      {
        type: 'updateNode',
        nodeId: 'node-id',
        changes: { parameters: { text: 'New value' } }
      },
      {
        type: 'addConnection',
        source: 'node-1',
        target: 'node-2',
        sourcePort: 'main',
        targetPort: 'main'
      }
    ]
  }
}
```

**Operation Types:**
- `updateNode` - Modify node parameters
- `addNode` - Insert new node
- `removeNode` - Delete node
- `addConnection` - Link nodes
- `removeConnection` - Unlink nodes
- `updateSettings` - Change workflow settings

## Code Node Templates

### JavaScript (Run Once for All Items)
```javascript
const items = $input.all();

return items.map(item => ({
  json: {
    original: item.json.name,
    processed: item.json.name.toUpperCase(),
    timestamp: new Date().toISOString()
  }
}));
```

### JavaScript (Run Once per Item)
```javascript
const data = $json;

return {
  json: {
    ...data,
    processed: true,
    total: data.price * data.quantity
  }
};
```

### Access Other Nodes in Code
```javascript
const formData = $('Form Trigger').first().json;
const allResults = $('HTTP Request').all();
const apiUrl = $vars.API_BASE_URL;
const secret = $env.MY_SECRET;
```

## Debugging Workflows

### Check Execution Status
```javascript
// List recent executions
const executions = await execution_list({
  workflowId: "abc123",
  limit: 5,
  status: "error" // filter: success, error, running, waiting
});

// Get execution details
const details = await execution_get({
  executionId: "exec789"
});
```

### Validate Workflow
```javascript
await n8n_validate_workflow({ workflowId: "abc123" });
await n8n_autofix_workflow({ workflowId: "abc123" });
```

## Best Practices

1. **Always reference source nodes** in AI Agent prompts - never rely on merged/transformed data
2. **Use diff-based updates** for token efficiency when modifying workflows
3. **Test with `execute_workflow`** before activating
4. **Check trigger type** before execution (form/webhook/chat require different input formats)
5. **Use `get_workflow_details`** to understand node names before referencing them
6. **Validate after changes** with `n8n_validate_workflow`

## Quick Debugging Checklist

- [ ] Workflow is active (`active: true`)
- [ ] Correct trigger type identified
- [ ] Node names match exactly (case-sensitive)
- [ ] Expressions use `$('Node Name')` syntax for cross-node references
- [ ] Required credentials configured
- [ ] API key has sufficient permissions
