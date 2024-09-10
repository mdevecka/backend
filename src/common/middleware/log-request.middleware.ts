import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {

  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('close', () => {
      const duration = Date.now() - start;
      this.logger.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
    });
    next();
  }
}
