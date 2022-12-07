// script init
console.info('script loaded 🟢')

/** ------------- Define Functions ------------------ */

/**
 * Generate Invoice Id.
 * 
 * This function will generate a UID
 * that contain a timestamp which can be extracted.
 * 
 * @uses simplyhexagonal/short-unique-id
 * @package https://github.com/simplyhexagonal/short-unique-id

 * @param {string}	prefix	UID prefix
 * 
 * @returns string Id
 */
const generateInvoiceId = (prefix) => {
	let uid = new ShortUniqueId();

	return prefix + uid.stamp(10);
}

/**
 * Mutate DOM element with given text content.
 * 
 * @param	{string}	htmlElementSelector	html element selector
 * @param	{string}	textContent	text string to append
 * 
 * @return void
 */
const mutateDomElement = (htmlElementSelector, textContent) => {
	let element = document.querySelector(htmlElementSelector);

	element.innerHTML += textContent;
}

// UNSTABLE CODE
const generateTableRow = () => {
	let newColumn = document.createElement('tr');

	newColumn.innerHTML = '<td><a class="cut">-</a><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span data-prefix>$</span><span contenteditable>0.00</span></td>' +
		'<td><span data-prefix>$</span><span>0.00</span></td>';

	return newColumn;
}

/* Prototyping
/* ========================================================================== */

(function (window, ElementPrototype, ArrayPrototype, polyfill) {
	function NodeList() {
		[polyfill]
	}
	NodeList.prototype.length = ArrayPrototype.length;

	ElementPrototype.matchesSelector = ElementPrototype.matchesSelector ||
		ElementPrototype.mozMatchesSelector ||
		ElementPrototype.msMatchesSelector ||
		ElementPrototype.oMatchesSelector ||
		ElementPrototype.webkitMatchesSelector ||
		function matchesSelector(selector) {
			return ArrayPrototype.indexOf.call(this.parentNode.querySelectorAll(selector), this) > -1;
		};

	ElementPrototype.ancestorQuerySelectorAll = ElementPrototype.ancestorQuerySelectorAll ||
		ElementPrototype.mozAncestorQuerySelectorAll ||
		ElementPrototype.msAncestorQuerySelectorAll ||
		ElementPrototype.oAncestorQuerySelectorAll ||
		ElementPrototype.webkitAncestorQuerySelectorAll ||
		function ancestorQuerySelectorAll(selector) {
			for (var cite = this, newNodeList = new NodeList; cite = cite.parentElement;) {
				if (cite.matchesSelector(selector)) ArrayPrototype.push.call(newNodeList, cite);
			}

			return newNodeList;
		};

	ElementPrototype.ancestorQuerySelector = ElementPrototype.ancestorQuerySelector ||
		ElementPrototype.mozAncestorQuerySelector ||
		ElementPrototype.msAncestorQuerySelector ||
		ElementPrototype.oAncestorQuerySelector ||
		ElementPrototype.webkitAncestorQuerySelector ||
		function ancestorQuerySelector(selector) {
			return this.ancestorQuerySelectorAll(selector)[0] || null;
		};
})(this, Element.prototype, Array.prototype);



const onContentLoad = () => {
	const onClick = (e) => {
		let element = e.target.querySelector('[contenteditable]');
		let row;

		element && e.target != document.documentElement && e.target != document.body && element.focus();

		if (e.target.matchesSelector('.add')) {
			document.querySelector('table tbody').appendChild(generateTableRow());
		} else if (e.target.className == 'cut') {
			row = e.target.ancestorQuerySelector('tr');

			row.parentNode.removeChild(row);
		}

	}

	if (window.addEventListener) {
		document.addEventListener('click', onClick);
	}

}

onContentLoad();

/** ------------- Invoke Functions ------------------ */

/** Set invoice number */
mutateDomElement('#invoiceNumber', generateInvoiceId('mf'));

/** Set invoice date */
mutateDomElement('#invoiceDate', moment().format('MMMM Do, YYYY'));