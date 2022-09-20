const xlsx = require('node-xlsx');
const fs = require('fs');
const { distributor } = require('./utils');
const { NUMBER_OF_REVIEWERS } = require('./constants');

const getFirstRow = () => {
  const studentsCells = new Array(NUMBER_OF_REVIEWERS).fill(0).map((_, index) => `Student ${index + 1}`);
  return ['Reviewer', ...studentsCells];
}

const workSheetsFromFile = xlsx.parse(`${__dirname}/Participants.xlsx`);
const participants = workSheetsFromFile[0].data.slice(1).map(([, participant]) => participant);
const reviewers = distributor(participants)
console.log(reviewers);


const data = [
  getFirstRow(),
  ...reviewers,
];
const buffer = xlsx.build([{ name: 'Reviewers List', data: data }]);

fs.writeFileSync('Reviewers.xlsx', buffer)
