export interface ResponseFormat<T = any> {
  status: number;
  message: string;
  data?: T;
  token?: string;
}

export function createResponse<T = any>(
  data: T | null,
  message: string,
  status: number,
  token?: string,
): ResponseFormat<T> {
  return {
    status,
    message,
    data: data || undefined,
    token: token || undefined,
  };
}
