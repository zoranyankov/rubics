// const optionsDB = require('../../data/options.json');
const optionsDB = [
    { "opId": "1", "value": "1 - Very Easy" },
    { "opId": "2", "value": "2 - Easy" },
    { "opId": "3", "value": "3 - Medium (Standard 3x3)" },
    { "opId": "4", "value": "4 - Intermediate" },
    { "opId": "5", "value": "5 - Expert" },
    { "opId": "6", "value": "6 - Hardcore" }
];

const selectActiveDifficulty = (currentDifficulty) => optionsDB.map(row => {  
    if (row.opId == currentDifficulty) {
        row.isSelected = 'selected=true';
    } else if (row.isSelected) {
        delete row.isSelected;
    }
    return row;
});

const clearSelected = () => optionsDB.map(row => { 
    if (row.isSelected) {
        delete row.isSelected;
    }
    return row;
});

module.exports = {
    selectActiveDifficulty,
    clearSelected,
}