/**
 * Centralized error logging utility
 *
 * TODO: Integrate with a production error tracking service like:
 * - Sentry (recommended): https://sentry.io
 * - Rollbar: https://rollbar.com
 * - LogRocket: https://logrocket.com
 * - Datadog: https://www.datadoghq.com
 *
 * For now, this provides structured logging to the console with the option
 * to easily swap in a third-party service later.
 */

interface LogContext {
  [key: string]: unknown
}

export class Logger {
  private static instance: Logger
  private environment: string

  private constructor() {
    this.environment = process.env.NODE_ENV || 'development'
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  /**
   * Log an error
   */
  public error(error: Error | string, context?: LogContext): void {
    const errorData = {
      timestamp: new Date().toISOString(),
      environment: this.environment,
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? undefined : error.stack,
      context,
    }

    // Console logging for all environments
    console.error('ERROR:', errorData)

    // TODO: Send to error tracking service in production
    if (this.environment === 'production') {
      // Example for Sentry:
      // Sentry.captureException(error, { contexts: { custom: context } })

      // Example for Rollbar:
      // rollbar.error(error, context)

      // Example for LogRocket:
      // LogRocket.captureException(error, { tags: context })
    }
  }

  /**
   * Log a warning
   */
  public warn(message: string, context?: LogContext): void {
    const warnData = {
      timestamp: new Date().toISOString(),
      environment: this.environment,
      message,
      context,
    }

    console.warn('WARNING:', warnData)

    // TODO: Send to logging service if needed
    if (this.environment === 'production') {
      // Sentry.captureMessage(message, 'warning')
    }
  }

  /**
   * Log general information
   */
  public info(message: string, context?: LogContext): void {
    const infoData = {
      timestamp: new Date().toISOString(),
      environment: this.environment,
      message,
      context,
    }

    if (this.environment !== 'production') {
      console.info('INFO:', infoData)
    }

    // TODO: Send to logging service if needed
  }

  /**
   * Log debug information (development only)
   */
  public debug(message: string, context?: LogContext): void {
    if (this.environment === 'development') {
      console.debug('DEBUG:', {
        timestamp: new Date().toISOString(),
        message,
        context,
      })
    }
  }

  /**
   * Track a custom event or metric
   */
  public track(eventName: string, properties?: LogContext): void {
    const eventData = {
      timestamp: new Date().toISOString(),
      environment: this.environment,
      event: eventName,
      properties,
    }

    if (this.environment !== 'production') {
      console.log('TRACK:', eventData)
    }

    // TODO: Send to analytics/logging service
    // Example: analytics.track(eventName, properties)
  }
}

// Export singleton instance
export const logger = Logger.getInstance()

/**
 * Error boundary helper for async functions
 * Wraps async functions with automatic error logging
 */
export function withErrorLogging<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  context?: LogContext
): T {
  return (async (...args: unknown[]) => {
    try {
      return await fn(...args)
    } catch (error) {
      logger.error(error as Error, {
        ...context,
        functionName: fn.name,
        args,
      })
      throw error
    }
  }) as T
}
