import type { Request, Response, NextFunction } from "express";

function log(entry: Record<string, unknown>) {
  const payload = { timestamp: new Date().toISOString(), ...entry };
  console.log(JSON.stringify(payload));
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startedAt = Date.now();

  res.on("finish", () => {
    log({
      level: "info",
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      ip: req.ip,
    });
  });

  next();
}

export function logError(error: unknown) {
  if (error instanceof Error) {
    log({
      level: "error",
      message: error.message,
      stack: error.stack,
    });
    return;
  }

  log({
    level: "error",
    message: "Unknown error",
    error,
  });
}
