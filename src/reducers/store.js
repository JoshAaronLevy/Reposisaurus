import { createStore } from "redux";
import { rootReducer } from "./rootreducer";

let store = null;

export function getStore() {
	return store;
}

export function initializeStore(initialState) {
	store = createStore(rootReducer, initialState);
	store.subscribe(() => console.log(store.getState()));
	return store;
}
