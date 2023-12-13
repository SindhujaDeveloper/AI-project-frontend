import { all, fork } from "redux-saga/effects";

import type { AllEffect, ForkEffect } from "redux-saga/effects";
import { takeAuthRequest, takeChatbotRequest } from "../redux/sagas";


function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([
    fork(takeAuthRequest),
    fork(takeChatbotRequest)
  ]);
}

export { rootSaga };
