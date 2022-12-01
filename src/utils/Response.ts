interface ResponseData {
  code: number;
  data?: any;
  message?: string;
}

class BaseResponse {
  public code!: number;
  public data: any;
  public message!: string;
  constructor({ code, data, message }: ResponseData) {
    this.code = code;
    if (data) this.data = data;
    if (message) this.message = message;
  }
}

// new SuccessResponse({ token: 'xxx' }, '登录成功')
export class SuccessResponse extends BaseResponse {
  constructor(data: any, message?: string) {
    super({
      code: 0,
      data,
      message,
    });
  }
}

// new SuccessResponse(10004, '登录失败')
export class ErrorResponse extends BaseResponse {
  constructor(code: number, message: string) {
    super({
      code,
      message,
    });
  }
}

interface ErrorInfo {
  code: number;
  message: string;
}

// createErrorResponse({ code: 10004, message: '登录失败' })
export const createErrorResponse = (errorInfo: ErrorInfo) => {
  const { code, message } = errorInfo;
  return new ErrorResponse(code, message);
};
