import API from "./api";

export interface SendOtpRequest {
  phone: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export const sendOtp = async (
  data: SendOtpRequest
): Promise<SendOtpResponse> => {
  try {
    const response = await API.post<SendOtpResponse>(
      "/auth/send-otp",
      data
    );

    return response.data;
  } catch (error: any) {
    console.log(
      "OTP ERROR:",
      error.response?.data || error.message
    );
    throw error;
  }
};