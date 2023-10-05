import { Response } from 'express';

export const successResponse = (res: Response<any, Record<string, any>>, data: any, others: {} = {}) =>
  res.json({ status: 'success', result: data, ...others });

export const errorResponse = (res: Response<any, Record<string, any>>, error: any, status: number = 500, ...rest: any) =>
  res.status(status).json({ status: 'failed', error: error || 'Internal server error', ...rest });
