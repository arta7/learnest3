export const createArrayByLength = (length, staticValue = "##") => {
  const arr = [];
  if (length === 1) {
    return [null];
  }
  for (let i = 0; i < length; i++) {
    arr.push(staticValue);
  }

  return arr;
};

export const just_persian = (str) => {
  var p = /^[\u0600-\u06FF\s]+$/;

  if (!p.test(str)) return false;
  else return true;
};
export const hasPersianCharacter = (str) => {
  const symbols = [" ", ".", "-", "_", "=", ")", "(", ",", "<", ">", "?"];
  let hasPersian = false;

  str.split("").every((char) => {
    if (!symbols.includes(char)) {
      if (just_persian(char)) {
        hasPersian = true;
        return false;
      }
    }
    return true;
  });

  return hasPersian;
};

export const now = () => {
  let convertedDate = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return convertedDate;
};

export const convertDate = (date) => {
  let convertedDate = new Date(date).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return convertedDate;
};

export const convertFullDateAndTime = (date) => {
  let convertedDate = new Date(date).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return convertedDate;
};

export const getToday = () => {
  const date = new Date();
  return date.getDate();
};

export const deleteAllCookies = () => {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export const toFixedIfIsFloat = (number, floatCount = 3) => {
  if (number === null || typeof number === undefined) return;
  if (number === 0) return 0;
  if (number?.toString()?.split(".")?.length > 1) {
    if (floatCount === 0) {
      const firstpart = number.toString().split(".")[0];
      return firstpart;
    }
    let newNumber =
      number?.toString()?.split(".")[0] +
      "." +
      number?.toString()?.split(".")[1]?.substring(0, floatCount);
    return newNumber;
  } else return number;
};

export const getShouldBeScrolled = () => {
  const appHeight = parseInt(
    getComputedStyle(
      document.querySelector(".hidden-scrollbar")
    ).height.replace("px", "")
  );
  if (
    document.querySelector(".hidden-scrollbar").scrollHeight - appHeight >
    100
  ) {
    return true;
  }
  return false;
};

export function fitText({ outputSelector, currentFontSize }) {
  // max font size in pixels
  const maxFontSize = 12.8;
  // get the DOM output element by its selector
  let outputDiv = document.getElementById(outputSelector);
  // get element's width
  let width = outputDiv.clientWidth;
  // get content's width
  let contentWidth = outputDiv.scrollWidth;
  // get fontSize
  let fontSize = currentFontSize;

  // if content's width is bigger then elements width - overflow
  if (contentWidth > width) {
    fontSize = Math.ceil((fontSize * width) / contentWidth, 10);
    fontSize = fontSize > maxFontSize ? (fontSize = maxFontSize) : fontSize - 1;
    return fontSize + "px";
    // outputDiv.style.fontSize = fontSize + "px";
  } else {
    // content is smaller then width... let's resize in 1 px until it fits
    while (contentWidth === width && fontSize < maxFontSize) {
      fontSize = Math.ceil(fontSize) + 1;
      fontSize = fontSize > maxFontSize ? (fontSize = maxFontSize) : fontSize;
      // outputDiv.style.fontSize = fontSize + "px";
      // update widths
      width = outputDiv.clientWidth;
      contentWidth = outputDiv.scrollWidth;
      if (contentWidth > width) {
        // outputDiv.style.fontSize = fontSize - 1 + "px";
        return fontSize - 1 + "px";
      }
      if (fontSize === maxFontSize) {
        return maxFontSize;
      }
    }
  }
}

export const convertTimeSpan = (timeSpan) => {
  const fixedTime = toFixedIfIsFloat(timeSpan, 0).split(":");

  const hours = parseInt(fixedTime[0]);
  const minutes = parseInt(fixedTime[1]);
  const seconds = parseInt(fixedTime[2]);

  let str = "";
  if (hours) {
    str += `${hours} ساعت  `;
    if (minutes) {
      str += " و ";
    } else if (seconds) {
      str += " و ";
    }
  }
  if (minutes) {
    str += ` ${minutes} دقیقه  `;
    if (seconds) {
      str += " و ";
    }
  }
  if (seconds) {
    str += ` ${seconds} ثانیه  `;
  }

  return str;
};
