import { Request, Response } from 'express';

export const testRun = async (request: Request, response: Response) => {
  response.send({
    query: request.query,
    params: request.params.testid
  });
}