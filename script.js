// localStorage.clear();
// document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, name => location.hostname.split('.').reverse().reduce(domain => (domain=domain.replace(/^\.?[^.]+/, ''),document.cookie=`${name}=;max-age=0;path=/;domain=${domain}`,domain), location.hostname));

let siteName = "siteNameVarTemp";
let siteShortHand = `tfmsa`;
let cookiesSetting;
let cookiesSettingArr;
let usrResBannerClosed;
let usrResBannerButton;
let bUserResponseBannerDisplayed = false;
let darkMode = false;
let settings;
let escapeKeyPressed = false;
let panelOpen = false;

function noCallback() {}
function logConsole(message) {
  let styleA = "font-size: 8px";
  let styleB =
    "background-color: rgb(65, 109, 229); color: #000;font-family:'Times New Roman', 'Times', 'serif';padding-left:5px;padding-right:5px;padding-top:2px;padding-bottom:2px;font-weight:700;";
  let styleC = "font-family:'Times New Roman', 'Times', 'serif';";
  console.log(
    `%c%s\n%c${siteName}\n%c---\n%c${message}`,
    styleA,
    Date.now(),
    styleB,
    "",
    styleC,
  );
}
function setCookie(
  type,
  cookieName,
  cookieValue,
  expiryDay,
  specialCookieReason = "",
) {
  const d = new Date();
  d.setTime(d.getTime() + expiryDay * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  cookiePermissionAllowed = false;
  if (cookiesSetting[0] == 1 && type == 0) cookiePermissionAllowed = true;
  if (cookiesSetting[1] == 1 && type == 1) cookiePermissionAllowed = true;
  if (cookiesSetting[2] == 1 && type == 2) cookiePermissionAllowed = true;
  if (cookiesSetting[3] == 1 && type == 3) cookiePermissionAllowed = true;
  if (type == 5)
    cookiePermissionAllowed = confirm(
      `Allow us to save a cookie for the following reason:\n${specialCookieReason}`,
    );
  if (cookiePermissionAllowed) {
    document.cookie =
      cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }
}
function getCookie(cookieName) {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function getUserResponse(
  _callback,
  _question,
  _optionCount,
  _optionA,
  _optionB,
  _optionC = "",
  _optionD = "",
  _optionE = "",
  _bRememberByDefault = true,
) {
  if (!bUserResponseBannerDisplayed) {
    let uid = Math.floor(Math.random() * 10000);
    bUserResponseBannerDisplayed = true;
    let usrResBannerClosed = false;
    let usrResBannerButton = "Q";

    let documentHider = document.createElement("div");
    documentHider.classList = "documentHider";
    documentHider.id = `documentHider${uid}`;

    let banner = document.createElement("div");
    banner.classList = "banner usrResBanner";
    banner.id = `usrResBanner${uid}`;

    let h2 = document.createElement("h2");
    h2.innerText = _question;

    let btnA = document.createElement("button");
    btnA.innerText = _optionA;
    btnA.onclick = function () {
      usrResBannerButton = "A";
      usrResBannerClosed = true;
    };
    let btnB = document.createElement("button");
    btnB.innerText = _optionB;
    btnB.onclick = function () {
      usrResBannerButton = "B";
      usrResBannerClosed = true;
    };
    let btnC = document.createElement("button");
    btnC.innerText = _optionC;
    btnC.onclick = function () {
      usrResBannerButton = "C";
      usrResBannerClosed = true;
    };
    let btnD = document.createElement("button");
    btnD.innerText = _optionD;
    btnD.onclick = function () {
      usrResBannerButton = "D";
      usrResBannerClosed = true;
    };
    let btnE = document.createElement("button");
    btnE.innerText = _optionE;
    btnE.onclick = function () {
      usrResBannerButton = "E";
      usrResBannerClosed = true;
    };

    let input = document.createElement("input");
    input.type = "checkbox";
    input.name = "rememberChoiceForURB";
    input.id = "rememberChoiceForURB";
    if (_bRememberByDefault) input.checked = true;
    let label = document.createElement("label");
    label.textContent = "Remember choice?";
    label.for = "rememberChoiceForURB";

    banner.append(h2);
    banner.append(btnA);
    if (btnB.innerText) banner.append(btnB);
    if (btnC.innerText) banner.append(btnC);
    if (btnD.innerText) banner.append(btnD);
    if (btnE.innerText) banner.append(btnE);
    banner.append(input);
    banner.append(label);

    document.body.append(documentHider);
    document.body.append(banner);

    let intervalGUR = setInterval(() => {
      if (usrResBannerClosed) {
        eval(
          `${_callback}("${usrResBannerButton}", ${document.getElementById("rememberChoiceForURB").checked});`,
        );
        document.body.removeChild(
          document.getElementById(`documentHider${uid}`),
        );
        document.body.removeChild(
          document.getElementById(`usrResBanner${uid}`),
        );
        bUserResponseBannerDisplayed = false;
        clearInterval(intervalGUR);
      }
    }, 100);
    return;
  } else {
    let intervalWFGUR = setInterval(() => {
      if (!bUserResponseBannerDisplayed) {
        getUserResponse(
          _callback,
          _question,
          _optionCount,
          _optionA,
          _optionB,
          _optionC,
          _optionD,
          _optionE,
          _bRememberByDefault,
        );
        clearInterval(intervalWFGUR);
      }
    }, 500);
  }
}
function settingsPanelOpen() {
  let uid = Math.floor(Math.random() * 10000);
  settings = [
    Number(cookiesSetting) > 0,
    localStorage.getItem(`${siteShortHand}_darkMode`) == "true",
  ];
  panelOpen = true;
  let openCookiesCustomiserDOnClose = false;
  let saveChanges = null;

  let documentHider = document.createElement("div");
  documentHider.classList = "documentHider";
  documentHider.id = `documentHider${uid}`;

  let banner = document.createElement("div");
  banner.classList = "usrResBanner";
  banner.id = `sttngBnr${uid}`;

  let h2 = document.createElement("h2");
  h2.innerText = "Settings";

  let btnA = document.createElement("button");
  btnA.innerText = "Reset Changes";
  btnA.onclick = function () {
    // settinsBtnClearAll();
  };

  let inputA = document.createElement("input");
  inputA.type = "checkbox";
  inputA.name = `cookies${uid}`;
  inputA.id = `cookies${uid}`;
  if (settings[0]) inputA.checked = true;
  let labelA = document.createElement("label");
  labelA.textContent = "Use cookies?";
  labelA.for = "Use cookies?";

  let inputB = document.createElement("input");
  inputB.type = "checkbox";
  inputB.name = `dkTheme${uid}`;
  inputB.id = `dkTheme${uid}`;
  if (settings[1]) inputB.checked = true;
  let labelB = document.createElement("label");
  labelB.textContent = "Use Dark Theme?";
  labelB.for = "Use Dark Theme?";

  let btnB = document.createElement("button");
  btnB.innerText = "Close";
  btnB.onclick = function () {
    panelOpen = false;
  };
  let btnC = document.createElement("button");
  btnC.innerText = "Close & Don't save";
  btnC.onclick = function () {
    panelOpen = false;
    saveChanges = false;
  };

  banner.append(h2);
  // banner.append(btnA);
  // banner.append(document.createElement("br"));
  // banner.append(document.createElement("br"));
  banner.append(inputA);
  banner.append(labelA);
  banner.append(document.createElement("br"));
  banner.append(document.createElement("br"));
  banner.append(inputB);
  banner.append(labelB);
  banner.append(document.createElement("br"));
  banner.append(document.createElement("br"));
  banner.append(btnB);
  // banner.append(btnC);

  document.body.append(documentHider);
  document.body.append(banner);

  let bDarkTheme = document.getElementById(`dkTheme${uid}`).checked;
  let bCookies = document.getElementById(`cookies${uid}`).checked;
  let prev_darkTheme = bDarkTheme;
  let prev_cookies = bCookies;
  let intervalSP = setInterval(() => {
    if (!panelOpen) {
      document.body.removeChild(document.getElementById(`documentHider${uid}`));
      document.body.removeChild(document.getElementById(`sttngBnr${uid}`));
      if (openCookiesCustomiserDOnClose) askForCookkies();
      clearInterval(intervalSP);
    } else {
      bDarkTheme = document.getElementById(`dkTheme${uid}`).checked;
      bCookies = document.getElementById(`cookies${uid}`).checked;
      if (prev_darkTheme != bDarkTheme) {
        prev_darkTheme = bDarkTheme;
        toggleDarkModeTo(bDarkTheme);
      }
      if (prev_cookies != bCookies) {
        prev_cookies = bCookies;
        openCookiesCustomiserDOnClose = true;
      }
      if (escapeKeyPressed) panelOpen = false;
    }
  }, 100);
  return;
}
function toggleDarkModeTo(_A) {
  if (_A) {
    setDarkLightTheme("A");
  } else {
    setDarkLightTheme("B");
  }
}
function homeButtonPressed() {
  url = new URL(window.location.href)
  if(url.href != `${url.origin}/home/`) {
    document.location.href = `${url.origin}/home/`;
  }else{
    docBodClsLst = document.body.classList;
    document.body.classList += " loadingMouse";
    setTimeout(() => {
      document.body.classList = docBodClsLst[0];
    }, (Math.floor((Math.random()*4)-0.00001)*Math.floor((Math.random()*500)+200)));
  }
}
function escapeKeyPressedFunc() {
  setTimeout(() => {
    escapeKeyPressed = false;
  }, 3000);
}

// Checks if Escape key has been pressed recetenly
if (true) {
  let docBody = document.body;
  let keys = [];
  docBody.addEventListener("keydown", function (event) {
    keys.push(event.code);
    if (event.code == "Escape") {
      escapeKeyPressed = true;
      escapeKeyPressedFunc();
    }
  });
}

  // highlighting for #id section
if (false) {
  let url = document.location.href;
  if (url.match(/.*\/#.*/)) {
    let transparency = 255;
    document.getElementById(url.match(/.*\/#(.*)/)[1]).style =
      `border-radius: 15px;background-color: rgba(230, 230, 20, ${transparency});`;
    let _r = 230;
    let _g = 230;
    let _b = 23;
    let _c = 10;
    let _d = 0;
    setTimeout(() => {
      bHighlightedRunning = true;
      let decreaseHighlightingInterval = setInterval(
        () => {
          if (bHighlightedRunning) {
            logConsole(_d);
            _d++;
            if (_r + _g + _b > 30) {
              if (transparency < 3) transparency = 3;
              transparency = transparency - 1;
              _r = _r - 5 * (1 / _c);
              _g = _g - 5 * (1 / _c);
              _b = _b - 1;
              document.getElementById(url.match(/.*\/#(.*)/)[1]).style =
                `border-radius: 15px;background-color: rgba(${_r}, ${_g}, ${_b}, ${transparency});`;
              if (_r < 1) _r = 0;
              if (_g < 1) _g = 0;
              if (_b <= 2) _b = 0;
              if (_c != 0 && Math.random >= 0.5) _c = _c - 1;
            } else {
              if (transparency < 10) transparency = (transparency + 1) * _c;
              if (_c > 1.5) _c = _c / 2;
              _c = _c - 0.1;
              if (_c < 1) _c = _c + 1;
              transparency = transparency / 1.2;
              _r = _r / _c;
              _g = _g / _c;
              _b = 0;
            }
          }
          if (_r + _g + _b == 0 || transparency < 1 || _d > 500) {
            bHighlightedRunning = false;
            clearInterval(decreaseHighlightingInterval);
          }
        },
        (_r + _g) / (2 * ((_c + 1) * (_b + 2))) - transparency,
      );
    }, 800);
  }
}

  // deleting all cookies and/or local storage based off of user preferance
if (true) {
  if (localStorage.getItem(`${siteShortHand}_fgtAllLclStrgACks`)) {
    type = localStorage.getItem(`${siteShortHand}_fgtAllLclStrgACks`);

    switch (type) {
      case "0":
        break;

      case "1":
        document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, (name) =>
          location.hostname
            .split(".")
            .reverse()
            .reduce(
              (domain) => (
                (domain = domain.replace(/^\.?[^.]+/, "")),
                (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`),
                domain
              ),
              location.hostname,
            ),
        );
        break;

      case "2":
        localStorage.clear();
        break;

      case "3":
        localStorage.clear();
        document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, (name) =>
          location.hostname
            .split(".")
            .reverse()
            .reduce(
              (domain) => (
                (domain = domain.replace(/^\.?[^.]+/, "")),
                (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`),
                domain
              ),
              location.hostname,
            ),
        );
        break;

      default:
        logConsole(
          `You have expressed a prefernace to have your cookies and/or local storage cleared everytime you visit this site.\nUnfortunatly, the code responsible for this has ran into a problem. To clear your cookies/localstorage please do at least one of the following:\n  - Manually delete all of them in the developer tab.\n  - set the local storage key '${siteShortHand}_fgtAllLclStrgACks' to '3'\n  - Paste the below code into the console:\n    localStorage.clear();\n    document.cookie.replace(/(?<=^|;).+?(?=\\=|;|$)/g, name => location.hostname.split('.').reverse().reduce(domain => (domain=domain.replace(/^\\.?[^.]+/, ''),document.cookie=\`\${name}=;max-age=0;path=/;domain=\${domain}\`,domain), location.hostname));`,
        );
        break;
    }

    localStorage.setItem(`${siteShortHand}_fgtAllLclStrgACks`, type);
  }
}

// adding in html via js
if (true) {
  document.getElementById("1").outerHTML = `
    <div class="top-banner banner">
      <a><span class="pointerMouse" style="display: inline" onclick="homeButtonPressed()"><img style="display:block;padding-top:0.25em;" src="https://dummyimage.com/500x500/456de5/cccccc.png" height="15em" /></span></a>
      <a href="/home" style="display: inline">Home</a>
      <a href="/more" style="display: inline">more</a>
      <a href="/about" style="display: inline">about</a>
      <a><span class="pointerMouse" style="display: inline" onclick="settingsPanelOpen()">⚙</span></a>
    </div>
    `;
  let bottomBarImageHeight = 15;
  document.getElementById("2").outerHTML = `
    <div class="bottomBannerPadding" id="bottomBannerPadding"></div>
    <div class="banner bottomBanner " id="bottomBanner">
        <p>${siteName}, No Rights Reserved, Licensed under <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a></p>
        <img src="/images/CC0_button.png" height="${bottomBarImageHeight}px" width="auto" />
        <br>
        <img src="/images/notbyai/Assisted-By-Humans-Not-By-AI-Badge-black@2x.png" height="${bottomBarImageHeight}px" width="auto" />
        <img src="/images/notbyai/Authored-By-Humans-Not-By-AI-Badge-black@2x.png" height="${bottomBarImageHeight}px" width="auto" />
        <img src="/images/notbyai/Created-By-Humans-Not-By-AI-Badge-black@2x.png" height="${bottomBarImageHeight}px" width="auto" />
        <img src="/images/notbyai/Designed-By-Humans-Not-By-AI-Badge-black@2x.png" height="${bottomBarImageHeight}px" width="auto" />
        <img src="/images/notbyai/Developed-By-Humans-Not-By-AI-Badge-black@2x.png" height="${bottomBarImageHeight}px" width="auto" />
        <img src="/images/notbyai/Produced-By-Humans-Not-By-AI-Badge-black@2x.png" height="${bottomBarImageHeight}px" width="auto" />
        <img src="/images/notbyai/Researched-By-Humans-Not-By-AI-Badge-black@2x.png" height="${bottomBarImageHeight}px" width="auto" />
        <img src="/images/notbyai/Written-By-Humans-Not-By-AI-Badge-black@2x.png" height="${bottomBarImageHeight}px" width="auto" />
        <!-- Only relevant images included, if you believe another category would match this project please tell me at name.a1729@proton.me -->
    </div>
    `;
  // document.getElementById("3").outerHTML = ``;
}

// adding padding based on size of bottom banner
if (true) {
  if (document.getElementById("bottomBannerPadding")) {
    setTimeout(() => {
      document.getElementById("bottomBannerPadding").style =
        `min-height: calc(${document.getElementById("bottomBanner").getBoundingClientRect().height}px + 1em)`;
    }, 100);
    setTimeout(() => {
      document.getElementById("bottomBannerPadding").style =
        `min-height: calc(${document.getElementById("bottomBanner").getBoundingClientRect().height}px + 1em)`;
    }, 1000);
    setInterval(() => {
      document.getElementById("bottomBannerPadding").style =
        `min-height: calc(${document.getElementById("bottomBanner").getBoundingClientRect().height}px + 1em)`;
    }, 10000);
  } else {
    setTimeout(() => {
      setInterval(() => {
        document.getElementById("bottomBannerPadding").style =
          `min-height: calc(${document.getElementById("bottomBanner").getBoundingClientRect().height}px + 1em)`;
      }, 10000);
    }, 10000);
  }
}

// light/dark mode
if (true) {
  function setDarkLightTheme(_iADMeLM, _rULS = true) {
    if (_iADMeLM == "A") {
      darkMode = true;
      if (_rULS) localStorage.setItem(`${siteShortHand}_darkMode`, "true");
    } else {
      darkMode = false;
      if (_rULS) localStorage.setItem(`${siteShortHand}_darkMode`, "false");
    }
    if (localStorage.getItem(`${siteShortHand}_darkMode`) == "true") {
      darkMode = true;
    }
    if (darkMode) {
      document.body.classList = "darkMode";
      // document.body.querySelectorAll("*").forEach(tag => {
      //   tag.classList += "darkMode";
      // });
    } else {
      document.body.classList = "lightMode";
      // document.body.querySelectorAll("*").forEach(tag => {
      //   tag.classList += "lightMode";
      // });
    }
  }
  if (localStorage.getItem(`${siteShortHand}_darkMode`)) {
    if (localStorage.getItem(`${siteShortHand}_darkMode`) == "true") {
      darkMode = true;
    }
    if (darkMode) {
      document.body.classList = "darkMode";
      // document.body.querySelectorAll("*").forEach(tag => {
      //   tag.classList += "darkMode";
      // });
    } else {
      document.body.classList = "lightMode";
      // document.body.querySelectorAll("*").forEach(tag => {
      //   tag.classList += "lightMode";
      // });
    }
  } else {
    getUserResponse(
      "setDarkLightTheme",
      "Use dark mode, or light mode?",
      2,
      "Dark",
      "Light",
    );
  }
}

// cookies
if (true) {
  function askForCookkies() {
    getUserResponse(
      "setCookies",
      "Allow Cookies?",
      5,
      "Allow functional cookies only",
      "Allow functional, and quality of life cookies only",
      "Allow all cookies",
      "Allow no cookies (including functional)",
      "Customize individually",
      false,
    );
  }
  function discernCookiesSettings(_rem = false) {
    if (
      cookiesSettingArr[0] &&
      !cookiesSettingArr[1] &&
      !cookiesSettingArr[2] &&
      !cookiesSettingArr[3]
    ) {
      cookiesSetting = "A";
    } else if (
      cookiesSettingArr[0] &&
      cookiesSettingArr[1] &&
      !cookiesSettingArr[2] &&
      !cookiesSettingArr[3]
    ) {
      cookiesSetting = "B";
    } else if (
      cookiesSettingArr[0] &&
      cookiesSettingArr[1] &&
      cookiesSettingArr[2] &&
      cookiesSettingArr[3]
    ) {
      cookiesSetting = "C";
    } else if (
      !cookiesSettingArr[0] &&
      !cookiesSettingArr[1] &&
      !cookiesSettingArr[2] &&
      !cookiesSettingArr[3]
    ) {
      cookiesSetting = "D";
    } else {
      cookiesSetting = "E";
    }
    cookiesSetting = `${cookiesSettingArr[0]}${cookiesSettingArr[1]}${cookiesSettingArr[2]}${cookiesSettingArr[3]}`;
    if (_rem) {
      localStorage.setItem(`${siteShortHand}_cookiesSetting`, cookiesSetting);
    } else {
      if (_rem == false) {
        getUserResponse(
          "customCookiesPanelB",
          "Your cookies settings won't be saved, as we either use cookies or local storage to remember your cookies settings (which you opt-ed out of both).\nIf you'd like us to use localStorage instead to save your cookies preference click 'Remember choice?' to save your choices without cookies. Or allow the use of functional (or quality of life) cookies to save your preferences.",
          2,
          "Close",
          "Adjust settings",
        );
      }
    }
    _rem = false;
    if (cookiesSettingArr[0] == 1) {
      _rem = true;
    } else if (cookiesSettingArr[1] == 1) {
      _rem = true;
    } else if (cookiesSettingArr[3] == 1) {
      _rem = true;
    }
    if (_rem) {
      let cookiesSettingAF = `${cookiesSettingArr[0]}${cookiesSettingArr[1]}${cookiesSettingArr[2]}${cookiesSettingArr[3]}`;
      setCookie(0, "cookies", cookiesSettingAF, 365);
      setCookie(1, "cookies", cookiesSettingAF, 365);
      setCookie(3, "cookies", cookiesSettingAF, 365);
    }
  }
  function customCookiesPanelB(_res, _rem) {
    cookiesSetting = `${cookiesSettingArr[0]}${cookiesSettingArr[1]}${cookiesSettingArr[2]}${cookiesSettingArr[3]}`;
    if (_res == "A") {
      if (_rem) {
        localStorage.setItem(`${siteShortHand}_cookiesSetting`, cookiesSetting);
      }
      _rem = false;
      if (cookiesSettingArr[0] == 1) {
        _rem = true;
      } else if (cookiesSettingArr[1] == 1) {
        _rem = true;
      } else if (cookiesSettingArr[3] == 1) {
        _rem = true;
      }
      if (_rem) {
        let cookiesSettingAF = `${cookiesSettingArr[0]}${cookiesSettingArr[1]}${cookiesSettingArr[2]}${cookiesSettingArr[3]}`;
        setCookie(0, "cookies", cookiesSettingAF, 365);
        setCookie(1, "cookies", cookiesSettingAF, 365);
        setCookie(3, "cookies", cookiesSettingAF, 365);
      }
      return;
    } else {
      customCookiesPanel(null);
    }
  }
  function customCookiesPanel(_rem = true) {
    if (!bUserResponseBannerDisplayed) {
      bUserResponseBannerDisplayed = true;
      let usrCksBannerClosed = false;
      let documentHider = document.createElement("div");
      documentHider.classList = "documentHider";
      documentHider.id = "documentHider";
      let banner = document.createElement("div");
      banner.classList = "banner usrResBanner";
      banner.id = "usrResBanner";
      let h2 = document.createElement("h2");
      h2.innerText = "Custom Cookies";
      let p = document.createElement("p");
      p.innerText = "Your preferences will be saved";

      let inputA = document.createElement("input");
      inputA.type = "checkbox";
      inputA.name = "inputA";
      inputA.id = "inputA";
      inputA.checked = true;
      if (_rem == null) inputA.checked = false;
      let labelA = document.createElement("label");
      labelA.textContent = "Functional";
      labelA.for = "inputA";

      let inputB = document.createElement("input");
      inputB.type = "checkbox";
      inputB.name = "inputB";
      inputB.id = "inputB";
      inputB.checked = true;
      if (_rem == null) inputB.checked = false;
      let labelB = document.createElement("label");
      labelB.textContent = "Quality of Life";
      labelB.for = "inputB";

      let inputC = document.createElement("input");
      inputC.type = "checkbox";
      inputC.name = "inputC";
      inputC.id = "inputC";
      inputC.checked = false;
      let labelC = document.createElement("label");
      labelC.textContent = "Advertising";
      labelC.for = "inputC";

      let inputD = document.createElement("input");
      inputD.type = "checkbox";
      inputD.name = "inputD";
      inputD.id = "inputD";
      inputD.checked = false;
      let labelD = document.createElement("label");
      labelD.textContent = "Tracking";
      labelD.for = "inputD";

      let btnA = document.createElement("button");
      btnA.innerText = "Close";
      btnA.id = "btnA";
      btnA.onclick = function () {
        usrCksBannerClosed = true;
      };

      banner.append(h2);
      banner.append(document.createElement("br"));
      banner.append(inputA);
      banner.append(labelA);
      banner.append(document.createElement("br"));
      banner.append(document.createElement("br"));
      banner.append(inputB);
      banner.append(labelB);
      banner.append(document.createElement("br"));
      banner.append(document.createElement("br"));
      banner.append(inputC);
      banner.append(labelC);
      banner.append(document.createElement("br"));
      banner.append(document.createElement("br"));
      banner.append(inputD);
      banner.append(labelD);
      banner.append(document.createElement("br"));
      banner.append(document.createElement("br"));
      banner.append(document.createElement("br"));
      banner.append(btnA);

      if (_rem) {
        banner.append(p);
      }

      document.body.append(documentHider);
      document.body.append(banner);

      let interval = setInterval(() => {
        if (usrCksBannerClosed) {
          cookiesSettingArr = [
            document.getElementById("inputA").checked,
            document.getElementById("inputB").checked,
            document.getElementById("inputC").checked,
            document.getElementById("inputD").checked,
          ];
          discernCookiesSettings(_rem);
          // logConsole(cookiesSettingArr);
          document.body.removeChild(document.getElementById("documentHider"));
          document.body.removeChild(document.getElementById("usrResBanner"));
          bUserResponseBannerDisplayed = false;
          clearInterval(interval);
        } else {
          if (escapeKeyPressed) bUserResponseBannerDisplayed = false;
        }
      }, 100);
    } else {
      let intervalCCP = setInterval(() => {
        if (!bUserResponseBannerDisplayed) {
          customCookiesPanel(_rem);
          clearInterval(intervalCCP);
        }
      }, 500);
    }
  }
  function setCookies(_choice, _remember) {
    cookiesSetting = _choice;
    switch (cookiesSetting) {
      case "A":
        cookiesSettingArr = [1, 0, 0, 0];
        break;
      case "B":
        cookiesSettingArr = [1, 1, 0, 0];
        break;
      case "C":
        cookiesSettingArr = [1, 1, 1, 1];
        break;
      case "D":
        cookiesSettingArr = [0, 0, 0, 0];
        break;
      case "E":
        customCookiesPanel(_remember);
        return;
        break;
      default:
        customCookiesPanel(true);
        return;
        break;
    }
    cookiesSetting = `${cookiesSettingArr[0]}${cookiesSettingArr[1]}${cookiesSettingArr[2]}${cookiesSettingArr[3]}`;
    if (_remember)
      localStorage.setItem(`${siteShortHand}_cookiesSetting`, cookiesSetting);
    let _rem = false;
    if (cookiesSettingArr[0] == 1) {
      _rem = true;
    } else if (cookiesSettingArr[1] == 1) {
      _rem = true;
    } else if (cookiesSettingArr[3] == 1) {
      _rem = true;
    }
    if (_rem) {
      let cookiesSettingAF = cookiesSetting;
      setCookie(0, "cookies", cookiesSettingAF, 365);
      setCookie(1, "cookies", cookiesSettingAF, 365);
      setCookie(3, "cookies", cookiesSettingAF, 365);
    }
  }
  function recCookies(_choice, _method) {
    cookiesSetting = _choice;
    cookiesSettingArr = [_choice[0], _choice[1], _choice[2], _choice[3]];

    if (!_method) {
      localStorage.setItem(`${siteShortHand}_cookiesSetting`, cookiesSetting);
    }
    let _rem = false;
    if (cookiesSettingArr[0] == 1) _rem = true;
    if (cookiesSettingArr[1] == 1) _rem = true;
    if (cookiesSettingArr[3] == 1) _rem = true;
    if (_rem) {
      let cookiesSettingAF = `${cookiesSettingArr[0]}${cookiesSettingArr[1]}${cookiesSettingArr[2]}${cookiesSettingArr[3]}`;
      setCookie(0, "cookies", cookiesSettingAF, 365);
      setCookie(1, "cookies", cookiesSettingAF, 365);
      setCookie(3, "cookies", cookiesSettingAF, 365);
    }
  }

  function getCookiesSettings() {
    cookiesSetting = getCookie("cookies");
    if (cookiesSetting != "") {
      recCookies(cookiesSetting, true);
    } else {
      cookiesSetting = localStorage.getItem(`${siteShortHand}_cookiesSetting`);
      if (cookiesSetting) {
        recCookies(cookiesSetting, false);
      } else {
        askForCookkies();
      }
    }
  }
  
  setTimeout(() => {
    let intervalGCSI = setInterval(() => {
      if (!panelOpen && !bUserResponseBannerDisplayed) {
        getCookiesSettings();
        clearInterval(intervalGCSI);
      }
    }, 100);
  }, 3000);
}
