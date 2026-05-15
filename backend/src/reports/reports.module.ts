import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsRepo } from './reports.repo';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepo],
})
export class ReportsModule {}
