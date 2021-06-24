import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../styles/style.css";

const parser = new DOMParser();

export class Component {
	constructor(componentName) {
		this.componentName = componentName;
		components[componentName] = {};
		components[componentName]['functions'] = [];
	}

	//Создание компонента при помощи метода "createBody"
	static defineComponents() {
		const componentsList = require.context('../components/', true, /\.js$/);
		componentsList.keys().forEach((path) => {
			require(`../components/${path.slice(2)}`);
		});
	}

	/**
	 * Определение объекта DOM по названию
	 * targetName - название
	 * node - объект DOM, полученный методом "querySelector"
	 */
	static defineTarget(targetName, node) {
		targets[targetName] = node;
	}


	//Сохранение HTML-кода в виде шаблона для рендеринга компонента
	createBody(html) {
		components[this.componentName]['body'] = html;
	}

	// Сохранение функции в текущий объект для ее инициирования после рендеринга компонента
	addFunction(func) {
		components[this.componentName]['functions'].push(func);
	}

	/**
	 *  Замена свойств специальными символами (%tag%) в теле компонента
	 *  Парсинг строки в DOM-объект и добавление ее в target
	 *  Инициирование функций
	 */
	static renderComponent(target, componentList, props = {}) {
		targets[target].innerHTML = '';

		function render(target, componentName, props = {}) {
			if (!components[componentName]) {
				console.error(`Component ${componentName} does not exists!!!`);
				return;
			}

			let html = components[componentName]['body'];

			if (Object.keys(props).length !== 0) {

				for (let key in props) {
					const pattern = new RegExp(`%${key}%`, 'g');
					html = html.replace(pattern, props[key]);
				}

				const pattern = new RegExp('%.*%', 'g');
				html = html.replace(pattern, '');
			}
			const node = parser.parseFromString(html, 'text/html').body.childNodes[0];

			targets[target].appendChild(node);

			const functions = components[componentName]['functions'];
			if (functions.length !== 0) {
				functions.forEach((func => func(props)));
			}
		}

		if (Array.isArray(componentList)) {
			for (let component of componentList) {
				render(target, component.name, component.props);
			}
		} else {
			render(target, componentList, props);
		}
	}
}

const targets = {};
const components = {};