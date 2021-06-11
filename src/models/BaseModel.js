import {
	v4 as uuid
} from "uuid";

export class BaseModel {
	constructor() {
		this.id = uuid();
	}
	//обновление uid
	updateUid(uid) {
		this.id = uid;
	}
}