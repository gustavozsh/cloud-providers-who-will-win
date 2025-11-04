"""
Logging configuration for the cloud comparison platform.

This module provides a centralized logging configuration that can be used
across all analysis and collector modules. It supports different log levels,
formats, and can be easily extended to include file logging or other handlers.
"""
import logging
import sys
from typing import Optional


def setup_logger(
    name: str,
    level: int = logging.INFO,
    format_string: Optional[str] = None
) -> logging.Logger:
    """
    Set up and configure a logger with standard formatting.
    
    Args:
        name: Name of the logger (typically __name__)
        level: Logging level (default: INFO)
        format_string: Custom format string (optional)
    
    Returns:
        Configured logger instance
    
    Example:
        >>> from analysis.logger_config import setup_logger
        >>> logger = setup_logger(__name__)
        >>> logger.info("Analysis starting...")
    """
    if format_string is None:
        format_string = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    
    # Create logger
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    # Avoid adding multiple handlers if logger already configured
    if not logger.handlers:
        # Create console handler
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(level)
        
        # Create formatter
        formatter = logging.Formatter(
            format_string,
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        handler.setFormatter(formatter)
        
        # Add handler to logger
        logger.addHandler(handler)
    
    return logger


def setup_simple_logger(name: str, level: int = logging.INFO) -> logging.Logger:
    """
    Set up a logger with simplified output (no timestamps, just messages).
    Useful for scripts where clean output is preferred.
    
    Args:
        name: Name of the logger
        level: Logging level (default: INFO)
    
    Returns:
        Configured logger instance
    """
    return setup_logger(
        name,
        level=level,
        format_string='%(message)s'
    )


def setup_file_logger(
    name: str,
    filename: str,
    level: int = logging.INFO
) -> logging.Logger:
    """
    Set up a logger that writes to both console and file.
    
    Args:
        name: Name of the logger
        filename: Path to log file
        level: Logging level (default: INFO)
    
    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    # Console handler
    if not any(isinstance(h, logging.StreamHandler) for h in logger.handlers):
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(level)
        console_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        console_handler.setFormatter(console_formatter)
        logger.addHandler(console_handler)
    
    # File handler
    if not any(isinstance(h, logging.FileHandler) for h in logger.handlers):
        file_handler = logging.FileHandler(filename)
        file_handler.setLevel(level)
        file_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        file_handler.setFormatter(file_formatter)
        logger.addHandler(file_handler)
    
    return logger
