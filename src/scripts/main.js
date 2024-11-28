'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  const onLeftClick = (event) => {
    if (event.button === 0) {
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', onLeftClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  // eslint-disable-next-line no-shadow
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  const onBothClick = () => {
    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    isLeftClicked = true;
    onBothClick();
  });

  // eslint-disable-next-line no-shadow
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    isRightClicked = true;
    onBothClick();
  });
});

const success = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;

  body.append(div);
};

const errorHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'error';
  div.textContent = message;

  body.append(div);
};

firstPromise
  .then((message) => success(message))
  .catch((error) => errorHandler(error));

secondPromise.then((message) => success(message));

thirdPromise.then((message) => success(message));
