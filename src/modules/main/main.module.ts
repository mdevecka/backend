import { Module, Logger } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppDbModule, AuthModule, MailModule, HttpApiModule } from '@modules/.';
import { AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController, AiController } from './controllers';
import { NftConfigModule } from '@modules/config';
import { Worker } from 'worker_threads';
import { join } from 'path';

const workerDirPath = join(__dirname, 'workers');

@Module({
  imports: [AppDbModule, AuthModule, MailModule, NftConfigModule, HttpApiModule, NestjsFormDataModule],
  controllers: [AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController, AiController],
})
export class MainModule {

  private readonly logger = new Logger(MainModule.name)

  async onModuleInit() {
    const worker = new Worker(join(workerDirPath, 'ai-sync.worker.js'));
    worker.on('error', (error) => {
      this.logger.error(error, error.stack);
      worker.terminate();
    });
  }

}
