import { toast } from "react-toastify";
import { put, takeLatest } from "redux-saga/effects";
import type { ForkEffect } from "redux-saga/effects";

import { apiCall, defaultHeader } from "src/utils/helpers/apiCall";
import { API } from "src/utils/constants/api-routes";
import { conversationChatbotFailure, conversationChatbotRequest, conversationChatbotResponse } from "src/redux/reducers";


function* conversationChatbot(requestDetails: any): Generator<any, void, any> {
	try {
		const headers = defaultHeader();
		const data = requestDetails.payload.message;
		const response = yield apiCall({ headers, data, ...API.conversationChatbot });
		if (response.status === 200) {
			yield put(conversationChatbotResponse(response.data));
			toast(response.data.message, { type: "success" });
		} else {
			yield put(conversationChatbotFailure("Reset password failed"));
			toast(response.response.data.message, { type: "error" });
		}
	} catch (error) {
		console.log(error);
	}
}

export function* takeChatbotRequest(): Generator<ForkEffect<never>, void, unknown> {
	yield takeLatest(conversationChatbotRequest, conversationChatbot);

}
