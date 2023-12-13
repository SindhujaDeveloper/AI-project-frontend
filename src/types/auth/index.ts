export interface ISignUpPayload {
	name: string;
	userName: string;
	email: string;
	password: string;
	confirmPassword: string;
	companyName?: string;
	companyUrl?: string;
	isOrganisation?: boolean;
	isTermsAccepted: boolean;
}

export interface ISignUpResponse {
	token: string;
	siteUrl?: string;
	id?: number;
	name?: string;
	email: string;
	role?: string;
	role_id?: number;
	userName?: string;
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