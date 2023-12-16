///////////////// UTILS
const createArrayByLength = (length, staticValue = "##") => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(staticValue);
  }
  return arr;
};

const getRandomNumber = (max) => {
  const rand = Math.floor(max * Math.random());
  return rand;
};

function getMultipleRandom(arr) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled;
}

/////////////////////////////////////////////////////////////

const createQuestion = (vocabItem, vocabsList, vocabsLength) => {
  const question = {
    qustionId: vocabItem.id,
    qustionTitle: vocabItem.phrase,
    correctAnswer: vocabItem.meaning,
    answers: createArrayByLength(4),
  };

  // vocabList = []
  // vocabItem =[{}]

  let trueIndex = vocabsList.indexOf(vocabItem); // index of true Answer

  let index1 = getRandomNumber(vocabsLength); // give a number between "0" until "vocabsLength-1"
  while (trueIndex === index1) {
    index1 = getRandomNumber(vocabsLength);
  }

  let index2 = getRandomNumber(vocabsLength);
  while (index2 === index1 || index2 === trueIndex) {
    index2 = getRandomNumber(vocabsLength);
  }

  let index3 = getRandomNumber(vocabsLength);
  while (index3 === index1 || index3 === trueIndex || index3 === index2) {
    index3 = getRandomNumber(vocabsLength);
  }

  /////////////////////////////////////////////////////////////

  let randomValue0 = getRandomNumber(4);

  let randomValue1 = getRandomNumber(4);
  while (randomValue0 === randomValue1) {
    randomValue1 = getRandomNumber(4);
  }

  let randomValue2 = getRandomNumber(4);
  while (randomValue2 === randomValue1 || randomValue2 === randomValue0) {
    randomValue2 = getRandomNumber(4);
  }

  let randomValue3 = getRandomNumber(4);
  while (
    randomValue3 === randomValue1 ||
    randomValue3 === randomValue0 ||
    randomValue3 === randomValue2
  ) {
    randomValue3 = getRandomNumber(4);
  }

  question.answers[randomValue0] = vocabsList[trueIndex].meaning;
  question.answers[randomValue1] = vocabsList[index1].meaning;
  question.answers[randomValue2] = vocabsList[index2].meaning;
  question.answers[randomValue3] = vocabsList[index3].meaning;

  return question;
};

export const createQuestionList = (vocabularies) => {
  const questions = [];
  getMultipleRandom(vocabularies).forEach((item) => {
    const question = createQuestion(item, vocabularies, vocabularies.length);
    questions.push(question);
  });

  return questions;
};
