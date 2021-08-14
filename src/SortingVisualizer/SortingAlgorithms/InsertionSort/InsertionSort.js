import getInsertionSortAnimations from "./getInsertionSortAnimations";
import {
  changeBackgroundColor,
  changeBoxShadow,
  swapBars,
  resetBarStyleDefault,
  disableButtons,
  enableButtons,
  playCompletedSoundEffect,
} from "../../HelperFunctions.js";

const InsertionSort = (array, animationSpeed) => {
  disableButtons();
  const animations = getInsertionSortAnimations(array);

  for (let i = 0; i < animations.length; i += 4) {
    const comparingElement1 = animations[i],
      comparingElement2 = animations[i + 1],
      doSwap = animations[i + 2],
      sortedTill = animations[i + 3];
    const promise1 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        changeBackgroundColor(comparingElement1, "rgba(255,165,0, 0.9)");
        changeBackgroundColor(comparingElement2, "rgba(255,165,0, 0.9)");

        if (doSwap === true) {
          changeBackgroundColor(comparingElement1, "rgba(144,238,144, 0.9)");
          changeBackgroundColor(comparingElement2, "rgba(144,238,144, 0.9)");
          swapBars(comparingElement1, comparingElement2);
        }
      }, i * animationSpeed);

      resolve();
    });

    const promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        for (let j = 0; j <= sortedTill; j++) {
          changeBackgroundColor(j, "rgba(0, 164, 86, 0.6)");
          changeBoxShadow(j, "5px 5px 50px 5px rgba(0, 164, 86, 0.2)");
        }
        if (
          comparingElement1 === array.length - 1 &&
          comparingElement2 === array.length - 1
        )
          resolve();
      }, (i + 4) * animationSpeed);
    });

    Promise.all([promise1, promise2])
      .then(playCompletedSoundEffect)
      .then(enableButtons);
  }
  resetBarStyleDefault(array, (animations.length + 4) * animationSpeed);
};

export default InsertionSort;
