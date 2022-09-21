const { NUMBER_OF_REVIEWERS } = require('./constants');

const CHOOSE_REVIEWER_ATTEMPTS = NUMBER_OF_REVIEWERS * 2;

const chooseReviewer = (reviewers, exclude) => {
  let reviewer;
  let randomIndex;
  let attempts = 0;
  do {
    attempts++;
    randomIndex = Math.floor(Math.random() * reviewers.length)
    reviewer = reviewers[randomIndex];
  } while (exclude.includes(reviewer) && attempts < CHOOSE_REVIEWER_ATTEMPTS);
  if (attempts >= CHOOSE_REVIEWER_ATTEMPTS) {
    console.log(`More than ${CHOOSE_REVIEWER_ATTEMPTS} attempts.`, reviewers, exclude);
    return 0;
  }
  return randomIndex;
}

const distribute = (participants, numberOfReviewer) => {
  const participantsCopyArr = new Array(numberOfReviewer).fill(0).map(() => [...participants]);
  const result = []
  for (let currentParticipantIndex = 0; currentParticipantIndex < participants.length; currentParticipantIndex++) {
    const currentParticipant = participants[currentParticipantIndex];
    result[currentParticipantIndex] = [currentParticipant];
    for (const participantsCopy of participantsCopyArr) {
      const reviewerIndex = chooseReviewer(participantsCopy, result[currentParticipantIndex]);
      const reviewer = participantsCopy[reviewerIndex];
      result[currentParticipantIndex].push(reviewer);
      participantsCopy.splice(reviewerIndex, 1);
    }
  }
  return result;
}




const isValid = (reviewersList) => reviewersList.every((reviewers) =>
  new Set(reviewers).size === reviewers.length
);

exports.distributor = (participants) => {
  let reviewersList;
  let iteration = 0;
  do {
    iteration++;
    console.log(`Iteration number [${iteration}].`);
    reviewersList = distribute(participants, NUMBER_OF_REVIEWERS);
  } while(!isValid(reviewersList));
  return reviewersList;
}

