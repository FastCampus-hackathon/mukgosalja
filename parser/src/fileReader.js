const selector = require("./selector");

const date = new Date();

const fileTitle = selector + "_";

const fileName = `${fileTitle}${date.getFullYear()}${
  date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
}${date.getDate()}`;

const datas = require(`../jsonFiles/${fileName}.json`);

module.exports = datas;
