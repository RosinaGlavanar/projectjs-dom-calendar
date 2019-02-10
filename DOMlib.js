var DOMlib = {
// 1. Взимане на съществуващ DOM елемент от страницата.
getElement: function (selector){
  return document.querySelector(selector)
},

// 2. Добавяне на не съществуващ елемент към произволен елемент,
// вече съществуващ на HTML страницата.
addElementTo: function (selector, tag) {
  var newEl = document.createElement(tag);
  var element = this.getElement(selector);
  element.appendChild(newEl);
},

// 3. Изтриване на съществуващ елемент от HTML страницата.
deleteElement: function (selector){
  var item = document.querySelector(selector);
  item.parentNode.removeChild(item);
},

// 4. Промяна на свойствата на избран елемент, в това число:
// a. Промяна на атрибутите на елемента(id/class/data/name)
changeAttr: function (selector, attribute, value){
  document.querySelector(selector).setAttribute(attribute, value);
},

// b. Промяна и връщане на текстово съдържание
changeText: function (selector, text){
  document.querySelector(selector).innerText = text;
},

getText: function (selector){
  return document.querySelector(selector).innerText;
},

// c. Промяна и връщане на HTML съдържание на елемента
changeHTML: function (selector, content){
  document.querySelector(selector).innerHTML = content;
},

getHTML: function (selector){
  return document.querySelector(selector).innerHTML;
},

// d. Промяна на съществуващи стилове, както и добавяне
// на множество стилове под формата на обект.
changeStyle: function (selector, key, parametr){
  var el = document.querySelector(selector);
  el.style.setProperty(key, parametr);
},

// 5. Контрол на траверсирането спрямо селектираният елемент, в това число:
// • Достъп до родител(parent element)
getParentElement: function (selector){
  return document.querySelector(selector).parentElement;
},

// • Достъп до роднина, над елемент(sibling element)
getPreviousSiblingElement: function (selector){
  return document.querySelector(selector).previousSibling;
},

// • Достъп до роднина под елемент(sibling element)
getNextSiblingElement: function (selector){
  return document.querySelector(selector).nextSibling;
},

// • Достъп до всички деца на елемента(children elements)
getChildElement:function (selector){
  return document.querySelector(selector).childNodes;
},

// 6. Имплементирайте събитиен модел който да ползва
// вградените в системата обекти за събития.
addEvent: function(selector, event, func){
  document.querySelector(selector).addEventListener(event, func);
}
};