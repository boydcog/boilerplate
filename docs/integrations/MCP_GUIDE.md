# MCP (Model Context Protocol) Integration Guide

This guide explains how to integrate external services using MCP (Model Context Protocol) with this boilerplate.

## Overview

MCP enables secure integration with external services like Figma, ClickUp, and Google Drive. This boilerplate is pre-configured to support these integrations with proper security and approval workflows.

## Supported Integrations

### 1. Figma Integration
Access design systems, components, and assets directly from Figma.

**Use Cases:**
- Sync design tokens and components
- Generate code from Figma designs
- Maintain design-development consistency

**Required Environment Variables:**
```bash
FIGMA_ACCESS_TOKEN=your_figma_token
FIGMA_FILE_ID=your_file_id
FIGMA_TEAM_ID=your_team_id  # optional
```

**Setup Steps:**
1. Get Figma access token from [Figma Developer Settings](https://www.figma.com/developers/api#access-tokens)
2. Find your file ID from the Figma URL: `figma.com/file/FILE_ID/...`
3. Update `.env` with your credentials
4. Enable MCP: `MCP_ENABLED=true`

### 2. ClickUp Integration
Sync project management data and automate workflows.

**Use Cases:**
- Create tasks from code comments
- Update task status based on deployment
- Generate reports from development metrics

**Required Environment Variables:**
```bash
CLICKUP_API_TOKEN=your_clickup_token
CLICKUP_WORKSPACE_ID=your_workspace_id
CLICKUP_TEAM_ID=your_team_id
```

**Setup Steps:**
1. Generate API token in [ClickUp Settings > Apps](https://app.clickup.com/settings/apps)
2. Find workspace and team IDs from ClickUp URLs
3. Update `.env` with your credentials
4. Enable MCP: `MCP_ENABLED=true`

### 3. Google Drive Integration
Access documents, spreadsheets, and collaborate on files.

**Use Cases:**
- Import requirements from Google Docs
- Export reports to Google Sheets
- Sync documentation with Google Drive

**Required Environment Variables:**

**Option 1: Service Account (Recommended)**
```bash
GDRIVE_SERVICE_ACCOUNT_PATH=./credentials/google-service-account.json
GDRIVE_FOLDER_ID=your_folder_id
```

**Option 2: OAuth Credentials**
```bash
GDRIVE_CLIENT_ID=your_client_id
GDRIVE_CLIENT_SECRET=your_client_secret
GDRIVE_REFRESH_TOKEN=your_refresh_token
GDRIVE_ACCESS_TOKEN=your_access_token
GDRIVE_FOLDER_ID=your_folder_id
```

**Setup Steps:**
1. Create a Google Cloud Project
2. Enable Google Drive API
3. Create service account credentials
4. Download JSON key file to `./credentials/`
5. Share target folder with service account email
6. Update `.env` with file path and folder ID

## Security Guidelines

### Environment Variables
- **Never commit `.env`** - only `.env.example` is allowed in git
- Use strong, unique tokens for all services
- Rotate credentials regularly
- Use service accounts when possible (Google Drive)

### MCP Approval Workflow
Before any external integration is used:

1. **Agent must ask for user approval**
2. **User must confirm `.env` is properly configured**
3. **Only then can integration proceed**

This prevents unauthorized external API calls and ensures proper credential setup.

### Credential Storage
- Store credentials in `.env` file (never committed)
- Use environment-specific credentials (dev/staging/prod)
- Consider using secret management services in production
- Document all required variables in `.env.example`

## Implementation Examples

### Backend Integration
```python
# app/services/figma_service.py
import os
from typing import Optional

class FigmaService:
    def __init__(self):
        self.token = os.getenv("FIGMA_ACCESS_TOKEN")
        self.file_id = os.getenv("FIGMA_FILE_ID")
        
    def get_design_tokens(self) -> Optional[dict]:
        if not self.token or not self.file_id:
            raise ValueError("Figma credentials not configured")
        
        # Implementation here
        pass
```

### Frontend Integration
```typescript
// src/services/mcp.ts
interface MCPConfig {
  enabled: boolean;
  figmaToken?: string;
  clickupToken?: string;
}

export const mcpConfig: MCPConfig = {
  enabled: import.meta.env.VITE_MCP_ENABLED === 'true',
  figmaToken: import.meta.env.VITE_FIGMA_ACCESS_TOKEN,
  clickupToken: import.meta.env.VITE_CLICKUP_API_TOKEN,
};
```

## Development Workflow

### Adding New Integration
1. Update `.env.example` with required variables
2. Add service class in `backend/app/services/`
3. Create API endpoints if needed
4. Add frontend service in `frontend/src/services/`
5. Update this documentation
6. Test integration thoroughly

### Testing Integrations
```bash
# Test with mock data first
make test

# Test with real credentials (in development)
MCP_ENABLED=true make dev
```

### Debugging
- Check `.env` file exists and has correct values
- Verify API tokens are valid and not expired
- Check network connectivity to external services
- Review logs for authentication errors

## Best Practices

1. **Fail Gracefully**: Handle API failures without breaking the app
2. **Cache Responses**: Avoid unnecessary API calls
3. **Rate Limiting**: Respect external service rate limits
4. **Error Handling**: Provide meaningful error messages
5. **Monitoring**: Log integration usage and errors
6. **Documentation**: Keep integration docs up to date

## Troubleshooting

### Common Issues

**"MCP not enabled" Error**
- Check `MCP_ENABLED=true` in `.env`
- Verify `.env` file is loaded correctly

**Authentication Errors**
- Verify tokens are valid and not expired
- Check token permissions/scopes
- Ensure service account has proper access (Google Drive)

**Network Errors**
- Check internet connectivity
- Verify firewall settings
- Test API endpoints manually

**File Not Found (Google Drive)**
- Verify folder ID is correct
- Check service account has access to folder
- Ensure folder is shared with service account email

### Getting Help

1. Check service-specific documentation
2. Review API response errors
3. Test credentials with official tools
4. Check this project's GitHub issues
5. Contact the development team

## Future Integrations

This boilerplate can be extended to support additional services:
- Slack/Discord for notifications
- GitHub/GitLab for repository management
- Jira for issue tracking
- AWS/GCP for cloud services
- Stripe for payments

Follow the same pattern: environment variables, service classes, proper security, and documentation.