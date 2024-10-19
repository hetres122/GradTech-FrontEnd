interface BaseAuthRequest {
  email: string;
}

export interface RegisterRequest extends BaseAuthRequest {
  password: string;
}

export interface ResetPasswordRequest extends BaseAuthRequest {
}

export interface LoginRequest extends BaseAuthRequest {
  password: string;
}

interface ApiBaseResponse {
  email: string;
}

interface ApiSuccessResponse extends ApiBaseResponse {
}

interface ApiErrorResponse extends ApiBaseResponse {
  message: string
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;
