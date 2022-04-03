export const loggerConfig = {
  appenders: {
    access: {
      type: 'dateFile',
      filename: 'log/access.log',
      pattern: '-yyyy-MM-dd',
      category: 'http',
    },
    app: {
      type: 'file',
      filename: 'log/app.log',
      maxLogSize: 10485760,
      numBackups: 3,
    },
    errorFile: {
      type: 'file',
      filename: 'log/errors.log',
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
    errorStack: {
      type: 'dateFile',
      filename: 'log/errorsStack.log',
      pattern: '-yyyy-MM-dd',
      category: 'http',
    },
  },
  categories: {
    default: { appenders: ['app', 'errors'], level: 'DEBUG' },
    http: { appenders: ['access'], level: 'DEBUG' },
    errorStack: { appenders: ['errorStack'], level: 'DEBUG' },
  },
};
