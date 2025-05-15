// Log levels
enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class LoggerServiceClass {
  private readonly isProduction = process.env.NODE_ENV === 'production';
  private readonly enableRemoteLogging = false; // Set this to true to enable remote logging

  /**
   * Debug level log
   */
  public debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Info level log
   */
  public info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Warning level log
   */
  public warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Error level log
   */
  public error(message: string, error?: any): void {
    this.log(LogLevel.ERROR, message, error);
    
    // In production, you might want to send errors to a monitoring service like Sentry
    if (this.isProduction && this.enableRemoteLogging) {
      this.sendToRemoteLogging(message, error);
    }
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}]: ${message}`;
    
    // Skip debug logs in production unless explicitly enabled
    if (this.isProduction && level === LogLevel.DEBUG) {
      return;
    }

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage, data || '');
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, data || '');
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, data || '');
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage, data || '');
        break;
      default:
        console.log(formattedMessage, data || '');
    }
  }

  /**
   * Send logs to remote logging service
   * This is a placeholder for integration with services like Sentry, LogRocket, etc.
   */
  private sendToRemoteLogging(message: string, data?: any): void {
    // Implementation would depend on the actual service used
    // Example for Sentry:
    // Sentry.captureException(data, {
    //   extra: {
    //     message,
    //   },
    // });
  }
}

// Create singleton instance
export const LoggerService = new LoggerServiceClass();