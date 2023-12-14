export interface ISignUpPayload {
	username: string;
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	city: string;
	gender: string;
	birthdate: string;
	mobileno: string;
}

export interface ISignUpResponse {
	username: string;
	token: string;
	id?: number;
	password?: string;
	email?: string;
	firstname?: string;
	lastname?: string;
	city?: string;
	gender?: string;
	birthdate?: string;
	updatedAt?: string;
	createdAt?: string;
}


export interface ILoginPayload {
	password?: string;
	userName?: string;
	email?: string;
	token?: string;
	companyName?: string;
	isRememberMe?: boolean;
}
export interface IForgetPasswordPayload {
	email: string;
	organisationName?: string;
}

export interface IResetPasswordPayload {
	password: string;
	confirmPassword: string;
	token: string;
}

export interface IAuthReducer {
	currentUser: ISignUpResponse;
	userInfo: ILoginPayload;
	isMailSent: boolean;
	resetPasswordMessage: string;
	isFetching: boolean;
	isAuthenticated: boolean;
	error: string;
}

export interface IchatbotReducer {
	isFetching: boolean;
	error: string;
	data: any;
}