import { Module, Logger } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppDbModule, AuthModule, MailModule, HttpApiModule } from '@modules/.';
import { MessengerService, Message } from '@modules/messenger';
import { AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController, AiController } from './controllers';
import { NftConfigModule } from '@modules/config';
import { getEnv } from '@common/helpers';
import { Worker } from 'worker_threads';
import { join } from 'path';

const workerDirPath = join(__dirname, 'workers');

@Module({
  imports: [AppDbModule, AuthModule, MailModule, NftConfigModule, HttpApiModule, NestjsFormDataModule],
  controllers: [AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController, AiController],
})
export class MainModule {

  private readonly logger = new Logger(MainModule.name)

  constructor(private messenger: MessengerService) {
  }

  async onModuleInit() {
    if (getEnv() === "test")
      return;
    this.createWorker('ai-sync.worker.js');
    this.createWorker('static-image-sync.worker.js');
  }

  private createWorker(filename: string) {
    const worker = new Worker(join(workerDirPath, filename));
    const sub = this.messenger.onMessage.subscribe(msg => {
      worker.postMessage(msg);
    });
    worker.on('exit', () => {
      sub.unsubscribe();
    });
    worker.on('error', (error) => {
      this.logger.error(error, error.stack);
      worker.terminate();
    });
    worker.on('message', (msg: Message) => {
      if (typeof msg === 'object') {
        this.messenger.sendMessage(msg);
      }
    });
    return worker;
  }

}
