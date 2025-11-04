"""
Logging configuration for data collectors.

This module provides centralized logging configuration for GCP and AWS
data collectors, maintaining consistency across the platform.
"""
import logging
import sys
from typing import Optional


def setup_collector_logger(
    name: str,
    level: int = logging.INFO
) -> logging.Logger:
    """
    Set up and configure a logger for data collectors.
    
    Args:
        name: Name of the logger (typically __name__)
        level: Logging level (default: INFO)
    
    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    # Avoid adding multiple handlers
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(level)
        
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    
    return logger
