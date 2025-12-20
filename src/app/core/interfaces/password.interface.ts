export interface forgotPassword {
    email: string
}

export interface forgotPasswordResponse {
    message: string;
    info: string
}
export interface verifyOtp {
    resetCode: string;
}
export interface verifyOtpResponse {
       status: string;

}

export interface reset {
    email: string;
    newPassword: string;
 }
 export interface resetResponse {
    message: string;
    token: string;
 }
 
