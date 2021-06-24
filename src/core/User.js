import {
	Component
} from "./Component";
import {
	Utils
} from "./Utils";

export class User {

	/**
	 * Сохранение нового пользователя в LocalStorage
	 * roleCode: 0 - user, 1 - admin
	 */
	static createUser(login, password, roleCode = '0') {
		if (userExists(login)) return false;

		let role;
		switch ('' + roleCode) {
			case '0':
				role = 'user';
				break;
			case '1':
				role = 'admin';
				break;
		}
		const user = {
			login: login,
			password: password,
			role: role,
			email: '',
			phone: ''
		}

		Utils.addToStorage(user, 'Users');

		return true;
	}

	//Проверка логина, пароля
	static authUser(login, password) {
		const user = userExists(login);

		if (user) {
			if (user.password === password) {
				User.setCurrentUser(login, user.role);
				return user.role;
			} else {
				return 'Password is wrong!!!';
			}
		} else {
			return 'User does not exists!!!';
		}
	}

	//Возвращение объекта пользователя из LocalStorage
	static getUserData(login) {
		return userExists(login);
	}

	//Возвращение логина пользователя
	static getCurrentUser() {
		return currentUser['login'];
	}

	//Возвращение роли пользователя
	static getCurrentRole() {
		return currentUser['role'];
	}

	//Установка логина-пароля пользователя
	static setCurrentUser(login, role) {
		currentUser = {
			login: login,
			role: role
		};
	}

	//Разлогирование пользователя и закрытие Kanban-доски
	static logOut() {
		Component.renderComponent('menu', 'authForm');

		const props = {
			message: 'You log out'
		}

		Component.renderComponent('board', 'messageBlock', props);

		User.setCurrentUser(null, null);
	}
}

//Проверка логина в LocalStorage
function userExists(login) {
	return Utils.getFromStorage('Users').filter(user => user['login'] === login)[0];
}

let currentUser;