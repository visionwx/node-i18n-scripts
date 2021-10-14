const xlsx = require('node-xlsx');
const fs = require('fs');

const sheet = xlsx.parse('./sources/Boom-desktop-i18n.xlsx')


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

const isExist = fs.existsSync('./desktop-lang');

if(!isExist) {
    fs.mkdirSync('./desktop-lang');
}

fs.writeFileSync('./desktop-lang/zh.ts', 'export default ' + JSON.stringify(fieldsZH, null, 4))

console.log('saved zh.ts');


fs.writeFileSync('./desktop-lang/en.ts', 'export default ' + JSON.stringify(fieldsEN, null, 4))

console.log('saved en.ts');