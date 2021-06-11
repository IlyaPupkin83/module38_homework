import {
	BaseModel
} from "./BaseModel";
import {
	getFromStorage,
	addToStorage
} from "../utils";

export class User extends BaseModel {
	constructor(login, password, isAdmin) {
		super();
		this.login = login;
		this.password = password;
		this.storageKey = "users";
		this.isAdmin = isAdmin;
	}
	get hasAccess() {
		let users = getFromStorage(this.storageKey);
		if (users.length == 0) return false;
		for (let user of users) {
			if (user.login == this.login && user.password == this.password) {
				this.updateUid(user.id);
				return true;
			}
		}
		return false;
	}

	isAdmin() {
		return this.isAdmin;
	}

	static save(user) {
		try {
			JSON.stringify(user);
			addToStorage(user, user.storageKey);
			return true;
		} catch (event) {
			throw new Error(event);
		}
	}
}