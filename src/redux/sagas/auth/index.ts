import { toast } from "react-toastify";
import { put, takeLatest } from "redux-saga/effects";
import type { ForkEffect } from "redux-saga/effects";

import {
	forgetPasswordFailure,
	forgetPasswordRequest,
	forgetPasswordResponse,
	loginFailure,
	loginRequest,
	loginResponse,
	resetPasswordFailure,
	resetPasswordRequest,
	resetPasswordResponse,
	signUpFailure,
	signUpRequest,
	signUpResponse
} from "../../reducers";
import { apiCall, defaultHeader } from "src/utils/helpers/apiCall";
import { API } from "src/utils/constants/api-routes";

function* signup(requestDetails: any): Generator<any, void, any> {
	try {
		const headers = defaultHeader();
		const data = { payload: requestDetails.payload };
		const response = yield apiCall({ headers, data, ...API.signup });
		if (response.status === 201) {
			yield put(signUpResponse(response.data.response));
			toast("Signup successful", { type: "success" });
		} else {
			yield put(signUpFailure("Sign up failed"));
			toast("Sign up failed", { type: "error" });
		}
	} catch (error) {
		console.log(error);
	}
}

function* login(requestDetails: any): Generator<any, void, any> {
	try {
		const headers = defaultHeader();
		const payload = requestDetails.payload;
		const { isRememberMe, ...newPayload } = payload;
		const data = { payload: newPayload }
		const response = yield apiCall({ headers, data, ...API.login });
		if (response.status === 200) {
			if (payload.isRememberMe === true) {
				localStorage.setItem("userNameOrEmail", payload.username ?? payload.email ?? "");
				localStorage.setItem("password", payload.password ?? "");
			}
			yield put(loginResponse(response.data.response));
			toast("Login successful", { type: "success" });
		} else {
			yield put(loginFailure("Login failed"));
			toast("Login failed", { type: "error" });
		}
	} catch (error) {
		console.log(error);
	}
}

function* forgetPassword(requestDetails: any): Generator<any, void, any> {
	try {
		const headers = defaultHeader();
		const data = requestDetails.payload;
		const response = yield apiCall({ headers, data, ...API.forgetPassword });
		if (response.status === 200) {
			yield put(forgetPasswordResponse(response.data.message));
			toast(response.data.message, { type: "success" });
		} else {
			yield put(forgetPasswordFailure("Email sent failed"));
			toast(response.response.data.message, { type: "error" });
		}
	} catch (error) {
		console.log(error);
	}
}

function* resetPassword(requestDetails: any): Generator<any, void, any> {
	try {
		const headers = defaultHeader();
		const data = requestDetails.payload;
		const response = yield apiCall({ headers, data, ...API.resetPassword });
		if (response.status === 200) {
			yield put(resetPasswordResponse(response.data.message));
			toast(response.data.message, { type: "success" });
		} else {
			yield put(resetPasswordFailure("Reset password failed"));
			toast(response.response.data.message, { type: "error" });
		}
	} catch (error) {
		console.log(error);
	}
}


export function* takeAuthRequest(): Generator<ForkEffect<never>, void, unknown> {
	yield takeLatest(signUpRequest, signup);
	yield takeLatest(loginRequest, login);
	yield takeLatest(forgetPasswordRequest, forgetPassword);
	yield takeLatest(resetPasswordRequest, resetPassword);
}
