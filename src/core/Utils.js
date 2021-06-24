import {
	v4 as uuid
} from "uuid";

export class Utils {

	//Получение массива из LocalStorage
	static getFromStorage(key) {
		return JSON.parse(localStorage.getItem(`STD:${key}`) || "[]");
	}

	//Создание нового объекта в LocalStorage
	static addToStorage(obj, key) {
		const storageData = Utils.getFromStorage(key);
		storageData.push(obj);
		localStorage.setItem(`STD:${key}`, JSON.stringify(storageData));
	}

	//Изменение значения в LocalStorage
	static modifyInStorage(key, selectorKey, selectorValue, modifyKey, modifyValue) {
		const storageData = Utils.getFromStorage(key);

		for (let obj of storageData) {
			if (obj[selectorKey] === selectorValue) {
				obj[modifyKey] = modifyValue;
			}
		}

		localStorage.setItem(`STD:${key}`, JSON.stringify(storageData));
	}

	//Удаление объекта из LocalStorage
	static deleteFromStorage(key, selectorKey, selectorValue) {
		const storageData = Utils.getFromStorage(key);

		const result = storageData.filter(obj => obj[selectorKey] !== selectorValue);

		localStorage.setItem(`STD:${key}`, JSON.stringify(result));
	}

	//Случайный ID
	static createID() {
		return uuid();
	}
}