import { Response } from 'express';

export const successResponse = (
  res: Response<any, Record<string, any>>,
  data: any,
  others: {} = {}
) => res.json({ status: 'success', result: data, ...others });

export const errorResponse = (
  res: Response<any, Record<string, any>>,
  error: any,
  ...rest: any
) => res.json({ status: 'failed', error, ...rest });
