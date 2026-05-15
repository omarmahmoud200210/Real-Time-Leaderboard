import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { TopReportQueryDto } from './dto/top-report-query.dto';
import { ReportEntry, ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('top')
  @Public()
  async getTop(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: TopReportQueryDto,
  ): Promise<ReportEntry[]> {
    return await this.reportsService.getTopByDateRange(
      query.start,
      query.end,
      query.top ?? 10,
    );
  }
}
