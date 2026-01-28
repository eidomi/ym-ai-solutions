# Lambda Warmup Guide

Keep your Lambda containers warm to eliminate cold start latency using CloudWatch EventBridge scheduled rules.

## Overview

| Service | Warmup Endpoint | Typical Cold Start |
|---------|-----------------|-------------------|
| ClientService | `GET /healthcheck/warmup` | 3-5 seconds |
| PdfService | `GET /health/warmup` | 5-10 seconds |
| DocumentWorkflowService | `GET /health/warmup` | 3-5 seconds |

## Quick Setup (AWS Console)

### Step 1: Open EventBridge

1. Go to **AWS Console** → **Amazon EventBridge** → **Rules**
2. Select your region: `eu-north-1`
3. Click **Create rule**

### Step 2: Create Rule for Each Service

#### Rule Configuration

| Field | Value |
|-------|-------|
| Name | `PdfService-Warmup` (or service name) |
| Description | Keep PdfService Lambda warm |
| Event bus | default |
| Rule type | **Schedule** |

#### Schedule Pattern

Select **A schedule that runs at a regular rate** and enter:

```
5 minutes
```

> **Tip**: Use 5 minutes for most cases. Use 1-3 minutes for latency-critical services.

### Step 3: Select Target

1. Target type: **AWS service**
2. Select a target: **Lambda function**
3. Function: Select your Lambda (e.g., `PdfService`)
4. Configure input: **Constant (JSON text)**

```json
{
  "httpMethod": "GET",
  "path": "/health/warmup",
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/health/warmup"
    }
  }
}
```

### Step 4: Review and Create

Click **Create rule**. Repeat for each service.

---

## CLI Setup (Faster)

### Create All Three Warmup Rules

```bash
# Set your AWS region
export AWS_REGION=eu-north-1

# Get Lambda ARNs (adjust function names as needed)
CLIENT_LAMBDA_ARN=$(aws lambda get-function --function-name ClientService --query 'Configuration.FunctionArn' --output text)
PDF_LAMBDA_ARN=$(aws lambda get-function --function-name PdfService --query 'Configuration.FunctionArn' --output text)
WORKFLOW_LAMBDA_ARN=$(aws lambda get-function --function-name DocumentWorkflowService --query 'Configuration.FunctionArn' --output text)
```

### 1. ClientService Warmup

```bash
# Create rule
aws events put-rule \
  --name "ClientService-Warmup" \
  --schedule-expression "rate(5 minutes)" \
  --description "Keep ClientService Lambda warm"

# Add Lambda target
aws events put-targets \
  --rule "ClientService-Warmup" \
  --targets '[{
    "Id": "1",
    "Arn": "'$CLIENT_LAMBDA_ARN'",
    "Input": "{\"httpMethod\":\"GET\",\"path\":\"/healthcheck/warmup\",\"requestContext\":{\"http\":{\"method\":\"GET\",\"path\":\"/healthcheck/warmup\"}}}"
  }]'

# Grant EventBridge permission to invoke Lambda
aws lambda add-permission \
  --function-name ClientService \
  --statement-id "EventBridge-ClientService-Warmup" \
  --action "lambda:InvokeFunction" \
  --principal events.amazonaws.com \
  --source-arn "arn:aws:events:$AWS_REGION:$(aws sts get-caller-identity --query Account --output text):rule/ClientService-Warmup"
```

### 2. PdfService Warmup

```bash
# Create rule
aws events put-rule \
  --name "PdfService-Warmup" \
  --schedule-expression "rate(5 minutes)" \
  --description "Keep PdfService Lambda warm"

# Add Lambda target
aws events put-targets \
  --rule "PdfService-Warmup" \
  --targets '[{
    "Id": "1",
    "Arn": "'$PDF_LAMBDA_ARN'",
    "Input": "{\"httpMethod\":\"GET\",\"path\":\"/health/warmup\",\"requestContext\":{\"http\":{\"method\":\"GET\",\"path\":\"/health/warmup\"}}}"
  }]'

# Grant permission
aws lambda add-permission \
  --function-name PdfService \
  --statement-id "EventBridge-PdfService-Warmup" \
  --action "lambda:InvokeFunction" \
  --principal events.amazonaws.com \
  --source-arn "arn:aws:events:$AWS_REGION:$(aws sts get-caller-identity --query Account --output text):rule/PdfService-Warmup"
```

### 3. DocumentWorkflowService Warmup

```bash
# Create rule
aws events put-rule \
  --name "DocumentWorkflowService-Warmup" \
  --schedule-expression "rate(5 minutes)" \
  --description "Keep DocumentWorkflowService Lambda warm"

# Add Lambda target
aws events put-targets \
  --rule "DocumentWorkflowService-Warmup" \
  --targets '[{
    "Id": "1",
    "Arn": "'$WORKFLOW_LAMBDA_ARN'",
    "Input": "{\"httpMethod\":\"GET\",\"path\":\"/health/warmup\",\"requestContext\":{\"http\":{\"method\":\"GET\",\"path\":\"/health/warmup\"}}}"
  }]'

# Grant permission
aws lambda add-permission \
  --function-name DocumentWorkflowService \
  --statement-id "EventBridge-DocumentWorkflowService-Warmup" \
  --action "lambda:InvokeFunction" \
  --principal events.amazonaws.com \
  --source-arn "arn:aws:events:$AWS_REGION:$(aws sts get-caller-identity --query Account --output text):rule/DocumentWorkflowService-Warmup"
```

---

## Verify Setup

### Check Rules Exist

```bash
aws events list-rules --name-prefix "ClientService-Warmup"
aws events list-rules --name-prefix "PdfService-Warmup"
aws events list-rules --name-prefix "DocumentWorkflowService-Warmup"
```

### Test Manually

```bash
# Invoke warmup directly
curl https://api.forminue.com/clients/client/healthcheck/warmup
curl https://api.forminue.com/pdf/health/warmup
curl https://api.forminue.com/documentworkflow/health/warmup
```

Expected response:

```json
{
  "status": "Warmed",
  "timestamp": "2026-01-18T12:00:00Z",
  "databaseWarmedUp": true,
  "durationMs": 45,
  "message": "Lambda warmed up in 45ms"
}
```

### Check CloudWatch Logs

After 5 minutes, verify invocations in CloudWatch Logs:

```bash
# View recent warmup logs
aws logs filter-log-events \
  --log-group-name "/aws/lambda/PdfService" \
  --filter-pattern "warmup" \
  --limit 5
```

---

## Schedule Recommendations

| Use Case | Schedule | Cost/Month (approx) |
|----------|----------|---------------------|
| Development | `rate(15 minutes)` | ~$0.10 |
| Production (standard) | `rate(5 minutes)` | ~$0.30 |
| Production (low latency) | `rate(2 minutes)` | ~$0.75 |
| Production (critical) | `rate(1 minute)` | ~$1.50 |

> Costs based on Lambda invocation pricing. Warmup invocations are very fast (~50-200ms).

---

## Disable/Enable Rules

```bash
# Disable (pause warmup)
aws events disable-rule --name "PdfService-Warmup"

# Enable (resume warmup)
aws events enable-rule --name "PdfService-Warmup"

# Delete rule completely
aws events remove-targets --rule "PdfService-Warmup" --ids "1"
aws events delete-rule --name "PdfService-Warmup"
```

---

## Troubleshooting

### Warmup Not Working

1. **Check rule is enabled**:
   ```bash
   aws events describe-rule --name "PdfService-Warmup"
   ```
   Verify `State` is `ENABLED`

2. **Check Lambda permission**:
   ```bash
   aws lambda get-policy --function-name PdfService
   ```
   Verify EventBridge has `lambda:InvokeFunction` permission

3. **Check CloudWatch Logs** for errors in the Lambda function

### High Latency Despite Warmup

- Increase warmup frequency to `rate(2 minutes)` or `rate(1 minute)`
- Check if you have multiple Lambda instances (Provisioned Concurrency may be needed for high traffic)

### Cost Concerns

- Use `rate(10 minutes)` or `rate(15 minutes)` for non-critical services
- Disable warmup during known low-traffic periods (nights/weekends) using EventBridge schedules with cron expressions:
  ```
  cron(0/5 8-20 ? * MON-FRI *)  # Every 5 min, 8am-8pm, Mon-Fri
  ```
