const xlsx = require('node-xlsx');
const fs = require('fs');
const { distributor } = require('./utils');
const { NUMBER_OF_REVIEWERS } = require('./constants');

const getFirstRow = () => {
  const reviewersCells = new Array(NUMBER_OF_REVIEWERS).fill(0).map((_, index) => `Reviewer ${index + 1}`);
  return ['Student name', ...reviewersCells];
}

const workSheetsFromFile = xlsx.parse(`${__dirname}/Participants.xlsx`);
const participants = workSheetsFromFile[0].data.map(([, participant]) => participant);
const reviewers = distributor(participants)
console.log(reviewers);


const data = [
  getFirstRow(),
  ...reviewers,
];
const buffer = xlsx.build([{ name: 'Reviewers List', data: data }]);

fs.writeFileSync('Reviewers.xlsx', buffer)
