# Logging Configuration Guide

## Overview

This project uses Python's built-in `logging` module instead of `print` statements for better control over output, debugging capabilities, and production readiness.

## Benefits of Using Logging

### Professional Code Quality
- **Structured Output**: Consistent formatting with timestamps, log levels, and module names
- **Configurable**: Easy to adjust verbosity without changing code
- **Production Ready**: Can redirect to files, syslog, or external services
- **Better Debugging**: Log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL) help identify issues

### Example Output
```
2025-11-04 03:09:10 - __main__ - INFO - Running Financial Analysis...
2025-11-04 03:09:10 - __main__ - INFO -   GCP Score: 83.00/100
2025-11-04 03:09:10 - __main__ - INFO -   AWS Score: 81.00/100
```

## Architecture

### Centralized Configuration

The project includes two logger configuration modules:

1. **`analysis/logger_config.py`** - For analysis modules
2. **`collectors/logger_config.py`** - For data collectors

Both provide consistent logging setup across the platform.

## Usage

### In Analysis Modules

```python
from logger_config import setup_logger

# Set up logger
logger = setup_logger(__name__)

# Use logger instead of print
logger.info("Starting analysis...")
logger.warning("This is a warning")
logger.error("This is an error")
```

### In Data Collectors

```python
from logger_config import setup_collector_logger

# Set up logger
logger = setup_collector_logger(__name__)

# Use logger
logger.info("Data collected successfully")
```

## Log Levels

The logging module supports different severity levels:

| Level | Use Case | Example |
|-------|----------|---------|
| `DEBUG` | Detailed diagnostic information | `logger.debug(f"Processing item {i}")` |
| `INFO` | General informational messages | `logger.info("Analysis complete")` |
| `WARNING` | Indicates something unexpected | `logger.warning("Using default value")` |
| `ERROR` | Error that doesn't stop execution | `logger.error("Failed to load config")` |
| `CRITICAL` | Serious error, program may exit | `logger.critical("Database unavailable")` |

## Configuration Options

### Change Log Level

To see more detailed output, adjust the log level:

```python
# In your code
logger = setup_logger(__name__, level=logging.DEBUG)
```

Or via environment variable:
```bash
export LOG_LEVEL=DEBUG
python run_comparison.py
```

### Log to File

Use `setup_file_logger` to write logs to both console and file:

```python
from logger_config import setup_file_logger

logger = setup_file_logger(__name__, 'analysis.log')
```

### Simple Output

For scripts where you want clean output without timestamps:

```python
from logger_config import setup_simple_logger

logger = setup_simple_logger(__name__)
logger.info("This appears without timestamp")
# Output: This appears without timestamp
```

## Best Practices

### 1. Use Appropriate Log Levels

```python
# Good
logger.info("Starting data collection")
logger.error(f"Failed to connect: {e}")

# Avoid
logger.info("CRITICAL ERROR")  # Use logger.critical() instead
```

### 2. Include Context

```python
# Good
logger.info(f"Processing {filename} with {len(data)} records")

# Less helpful
logger.info("Processing file")
```

### 3. Use Exception Logging

```python
try:
    process_data()
except Exception as e:
    logger.error(f"Failed to process data: {e}", exc_info=True)
    # exc_info=True includes full stack trace
```

### 4. Don't Log Sensitive Data

```python
# Bad
logger.info(f"API key: {api_key}")

# Good
logger.info("API authentication successful")
```

## Migration from Print

### Before (using print)
```python
print("Starting analysis...")
print(f"Score: {score}")
```

### After (using logging)
```python
logger.info("Starting analysis...")
logger.info(f"Score: {score}")
```

## Advanced Features

### Multiple Handlers

Log to both console and file:

```python
import logging

logger = logging.getLogger(__name__)

# Console handler
console = logging.StreamHandler()
console.setLevel(logging.INFO)

# File handler
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.DEBUG)

logger.addHandler(console)
logger.addHandler(file_handler)
```

### Custom Formatting

```python
from logger_config import setup_logger

logger = setup_logger(
    __name__,
    format_string='%(levelname)s - %(message)s'
)
```

### Conditional Logging

```python
if logger.isEnabledFor(logging.DEBUG):
    expensive_debug_info = generate_debug_data()
    logger.debug(f"Debug info: {expensive_debug_info}")
```

## Testing with Logging

When writing tests, you can capture log output:

```python
import logging
from io import StringIO

def test_analysis():
    # Capture logs
    log_stream = StringIO()
    handler = logging.StreamHandler(log_stream)
    logger = logging.getLogger('analysis')
    logger.addHandler(handler)
    
    # Run code
    run_analysis()
    
    # Check logs
    log_output = log_stream.getvalue()
    assert "Analysis complete" in log_output
```

## Performance Considerations

Logging has minimal performance impact, but for very high-frequency operations:

```python
# Check if debug is enabled before expensive operations
if logger.isEnabledFor(logging.DEBUG):
    logger.debug(f"Details: {expensive_operation()}")
```

## Environment-Specific Configuration

### Development
```python
logger = setup_logger(__name__, level=logging.DEBUG)
```

### Production
```python
logger = setup_logger(__name__, level=logging.WARNING)
# Or use environment variable
```

## Troubleshooting

### Duplicate Log Messages

If you see duplicate messages, check for multiple handler additions:

```python
# Avoid this pattern
logger.addHandler(handler)
logger.addHandler(handler)  # Duplicate!

# Use this instead
if not logger.handlers:
    logger.addHandler(handler)
```

### Logs Not Appearing

Check the log level:

```python
# This won't show if level is INFO
logger.debug("Debug message")

# Set appropriate level
logger.setLevel(logging.DEBUG)
```

## References

- [Python Logging Documentation](https://docs.python.org/3/library/logging.html)
- [Logging HOWTO](https://docs.python.org/3/howto/logging.html)
- [Logging Cookbook](https://docs.python.org/3/howto/logging-cookbook.html)

---

**Last Updated**: 2025-11-04
