const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getIndexById = (id, arr) => {
  let targetIndex;
  arr.forEach((element, index) => {
    if(element.id.toString() === id){
      targetIndex = index;
    }
  });
  return targetIndex
}

module.exports = {
  getRandomElement,
  getIndexById
};
