const xlsx = require('node-xlsx');
const fs = require('fs');

const sheet = xlsx.parse('./sources/Boom-i18n-change.xlsx')


const data = sheet[0].data;

const fieldsZH = {};
const fieldsEN = {};

data.forEach((item, index) => {
    if(index) {
        if( item[1] && item[2]) {
            fieldsZH[item[1]] = item[2]
        }
        if( item[1] && item[3]) {
            fieldsEN[item[1]] = item[3]
        }
    }
})


const isExist = fs.existsSync('./web-lang');

if(!isExist) {
    fs.mkdirSync('./web-lang');
}

fs.writeFileSync('./web-lang/zh.js', 'export default ' + JSON.stringify(fieldsZH, null, 4))

console.log('saved zh.ts');


fs.writeFileSync('./web-lang/en.js', 'export default ' + JSON.stringify(fieldsEN, null, 4))

console.log('saved en.ts');