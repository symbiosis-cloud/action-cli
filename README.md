# GitHub action for the Symbiosis CLI

This action installs the Symbiosis command-line `sym` and authorizes using an API key.

## Inputs

### `api-key`

**Required** The Symbiosis api-key used for authentication.

### `version`

**Optional** Version of the command-line to install, defaults to latest.

## Example usage

```yaml
uses: symbiosis-cloud/action-cli@v1
with:
  api-key: '<INSERT_API_KEY>'
  version: 'latest'
```
