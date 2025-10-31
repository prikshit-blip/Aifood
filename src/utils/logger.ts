/**
 * Logging Utility
 * Centralized logging with support for different log levels
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogData {
  [key: string]: any;
}

class Logger {
  private isDevelopment = __DEV__;
  
  /**
   * Debug log (only in development)
   */
  debug(message: string, data?: LogData): void {
    if (this.isDevelopment) {
      console.log(`🐛 [DEBUG] ${message}`, data || '');
    }
  }
  
  /**
   * Info log
   */
  info(message: string, data?: LogData): void {
    if (this.isDevelopment) {
      console.log(`ℹ️  [INFO] ${message}`, data || '');
    }
  }
  
  /**
   * Warning log
   */
  warn(message: string, data?: LogData): void {
    console.warn(`⚠️  [WARN] ${message}`, data || '');
  }
  
  /**
   * Error log
   */
  error(message: string, error?: any): void {
    console.error(`❌ [ERROR] ${message}`, error || '');
    // TODO: Send to error tracking service (Sentry, Firebase Crashlytics)
  }
  
  /**
   * Log user event (for analytics)
   */
  event(eventName: string, params?: LogData): void {
    if (this.isDevelopment) {
      console.log(`📊 [EVENT] ${eventName}`, params || '');
    }
    // TODO: Send to analytics service (Firebase Analytics, Mixpanel)
  }
  
  /**
   * Log API call
   */
  api(method: string, url: string, data?: LogData): void {
    if (this.isDevelopment) {
      console.log(`🌐 [API] ${method} ${url}`, data || '');
    }
  }
  
  /**
   * Log store action
   */
  store(storeName: string, action: string, data?: LogData): void {
    if (this.isDevelopment) {
      console.log(`🏪 [STORE] ${storeName}.${action}`, data || '');
    }
  }
  
  /**
   * Log navigation
   */
  navigation(from: string, to: string): void {
    if (this.isDevelopment) {
      console.log(`🧭 [NAV] ${from} → ${to}`);
    }
  }
}

export const logger = new Logger();

