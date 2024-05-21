const swipperWrapper = document.querySelector(".swiper-wrapper");
const swipperWrapper2 = document.querySelector(".swiper-wrapper2");
const html = document.querySelector("html");
let burgerMenu = document.querySelector(".burgerMenu");
let modal = document.querySelector(".modal");
let burgerMenuBlock = document.querySelector(".burgerMenuBlock");
let burgerOpen = document.querySelector(".burgerOpen");
let burgerClose = document.querySelector(".burgerClose");
let modalClose = document.querySelector(".modalClose");
let modalBtns = document.querySelectorAll(".modalBtn");
let scrollUp = document.querySelector(".scrollUp");
let coinsArray = [];
const swiper = new Swiper(".swiper.swiper1", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  autoplay: {
    delay: 4000,
  },
  breakpoints: {
    450: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    670: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
});
const swiper2 = new Swiper(".swiper.swiper2", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  autoplay: {
    delay: 4000,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    450: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    670: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1300: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});

let coinsIds = [
  "90",
  "80",
  "518",
  "2710",
  "48543",
  "33285",
  "58",
  "54683",
  "2",
  "257",
  "45088",
  "44883",
  "2713",
  "45219",
  "2321",
  "2751",
  "48563",
  "33536",
  "1",
  "47311",
  "33833",
  "32417",
  "93841",
  "47305",
  "44863",
  "48555",
  "100423",
  "118",
  "111341",
  "33830",
];

const fetchCoins = async () => {
  let requests = coinsIds.map((item) =>
    fetch(`https://api.coinlore.net/api/ticker/?id=${item}`)
  );
  Promise.all(requests)
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    .then((data) => data.forEach((item) => coinsArray.push(item[0])))
    .then(() => {
      coinsArray.forEach((item) => {
        swipperWrapper.appendChild(
          createCryptoItem(
            item.name,
            item.symbol,
            item.percent_change_24h,
            item.price_usd,
            `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`
          )
        );
        swipperWrapper2.appendChild(
          createCryptoItem(
            item.name,
            item.symbol,
            item.percent_change_24h,
            item.price_usd,
            `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`
          )
        );
      });
    });
};
fetchCoins();

const createCryptoItem = (name, symbol, percent, price) => {
  let swiper_slide = document.createElement("div");
  swiper_slide.classList.add("swiper-slide");
  let cripto_item = document.createElement("div");
  cripto_item.classList.add("crypto_item");
  let crypto_item_title = document.createElement("div");
  crypto_item_title.classList.add("crypto_item-title");
  let crypto_item_content = document.createElement("div");
  crypto_item_content.classList.add("crypto_item-content");
  let crypto_content_price = document.createElement("span");
  crypto_content_price.classList.add("crypto__content-price");
  crypto_content_price.innerHTML = price + " $";
  let crypto_title_left = document.createElement("div");
  crypto_title_left.classList.add("crypto__title-left");
  let crypto_title_right = document.createElement("div");
  crypto_title_right.classList.add("crypto__title-right");
  let crypto_content_percent = document.createElement("span");
  crypto_content_percent.classList.add("crypto__content-percent");
  if (+percent > 0) {
    crypto_content_percent.innerHTML = "+" + percent;
    crypto_title_right.classList.add("green");
  } else {
    crypto_content_percent.innerHTML = percent;
    crypto_title_right.classList.add("red");
  }
  let crypto_title_img = document.createElement("img");
  crypto_title_img.alt = name;
  crypto_title_img.src = `images/coins/${symbol}.webp`;
  crypto_title_img.width = 30;
  crypto_title_img.title = name;
  crypto_title_img.loading = "lazy";
  let crypto_title_pair = document.createElement("span");
  crypto_title_pair.classList.add("crypto__title-pair");
  crypto_title_pair.innerHTML = `${symbol}/USD`;
  crypto_item_title.appendChild(crypto_title_left);
  crypto_title_left.appendChild(crypto_title_pair);
  crypto_title_left.appendChild(crypto_title_img);
  crypto_item_title.appendChild(crypto_title_right);
  crypto_title_right.appendChild(crypto_content_percent);
  crypto_item_content.appendChild(crypto_content_price);
  cripto_item.appendChild(crypto_item_title);
  cripto_item.appendChild(crypto_item_content);
  swiper_slide.appendChild(cripto_item);
  return swiper_slide;
};

document.querySelectorAll(".accordion-item").forEach((item) => {
  item.querySelector(".accordion-item-header").addEventListener("click", () => {
    item.classList.toggle("open");
  });
});
scrollUp.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

burgerOpen.addEventListener("click", function () {
  burgerMenuBlock.classList.toggle("active");
  burgerMenu.classList.toggle("active");
  overlay.classList.toggle("active");

  burgerOpen.classList.toggle("active");
  scrollUp.classList.remove("visiable");
  html.classList.toggle("active");
});

burgerClose.addEventListener("click", function () {
  burgerMenuBlock.classList.toggle("active");
  burgerMenu.classList.toggle("active");
  overlay.classList.toggle("active");
  burgerOpen.classList.toggle("active");
  scrollUp.classList.add("visiable");
  html.classList.toggle("active");
});
modalBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    modal.classList.add("active");
    html.classList.add("active");
    overlay.classList.add("active");
  });
});
modalClose.addEventListener("click", function () {
  modal.classList.remove("active");
  html.classList.remove("active");
  overlay.classList.remove("active");
});
let submitBtns = document.querySelectorAll("button[type=button].btn");
let notificationblock = document.querySelector(".notification");
submitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    notificationblock.classList.add("active");
    modal.classList.remove("active");
    html.classList.remove("active");
    overlay.classList.remove("active");
    setTimeout(() => {
      notificationblock.classList.remove("active");
    }, 5000);
  });
});

let forms = document.querySelectorAll("form");
forms.forEach((form) => {
  const inputs = form.querySelectorAll("input[required]");
  const button = form.querySelector("button");
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const emailError = form.querySelector(".emailError");
  const formError = form.querySelector(".formError");
  const phoneInput = form.querySelector("input[type=tel]");

  const popularDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "yandex.com",
    "mail.ru",
    "protonmail.com",
    "zoho.com",
    "gmx.com",
    "me.com",
    "live.com",
    "msn.com",
    "ymail.com",
    "inbox.com",
    "fastmail.com",
    "hushmail.com",
    "rocketmail.com",
    "qq.com",
    "naver.com",
    "163.com",
    "126.com",
    "sina.com.cn",
    "sina.com",
    "sohu.com",
    "i.ua",
  ];
  const validateEmail = (email) => {
    const re = new RegExp(
      `^[a-zA-Z0-9._%+-]+@(${popularDomains.join("|").replace(/\./g, "\\.")})$`,
      "i"
    );
    return re.test(String(email).toLowerCase());
  };
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const allFilled = Array.from(inputs).every(
        (input) => input.value.trim() !== ""
      );
      const passRegex = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
      );
      const emailValid = validateEmail(emailInput.value);
      const phoneValid = phoneInput.value.trim().length >= 10;
      let passValid = passRegex.test(String(passwordInput.value));
      if (allFilled && emailValid && phoneValid && passValid) {
        button.disabled = false;
        formError.style.display = "none";
        emailError.style.display = "none";
      } else {
        formError.style.display = "block";
        button.disabled = true;

        if (!emailValid && emailInput.value.trim() !== "") {
          emailError.style.display = "block";
        } else {
          emailError.style.display = "none";
        }
      }
    });
  });
});

const phoneInput = document.querySelector("#phoneInput");
const phoneInput2 = document.querySelector("#phoneInput2");

const iti =
  phoneInput &&
  window.intlTelInput(phoneInput, {
    // utilsScript:
    //   "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js",
    utilsScript: "/intl-tel-input/js/utils.js?1715508103106",
    initialCountry: "auto",
    geoIpLookup: (callback) => {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback("us"));
    },
  });

const iti2 =
  phoneInput2 &&
  window.intlTelInput(phoneInput2, {
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js",
    initialCountry: "auto",
    geoIpLookup: (callback) => {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback("us"));
    },
  });
iti2 &&
  iti2.promise.then(() => {
    const countryCode = iti2.getSelectedCountryData().iso2;
    iti2.setCountry(countryCode);
  });
iti &&
  iti.promise.then(() => {
    const countryCode = iti.getSelectedCountryData().iso2;
    iti.setCountry(countryCode);
  });

phoneInput &&
  phoneInput.addEventListener("countrychange", function () {
    const countryCode = iti.getSelectedCountryData().iso2;

    this.value = "+" + iti.getSelectedCountryData().dialCode + " ";
  });
phoneInput2 &&
  phoneInput2.addEventListener("countrychange", function () {
    const countryCode = iti2.getSelectedCountryData().iso2;
    this.value = "+" + iti.getSelectedCountryData().dialCode + " ";
  });

function phoneMask(e) {
  this.value = this.value.replace(/[^\d.+]/g, "");
  if (this.value.length > 15) {
    this.value = this.value.slice(0, -1);
  }
}
phoneInput && phoneInput.addEventListener("input", phoneMask);
phoneInput2 && phoneInput2.addEventListener("input", phoneMask);

function showCookieNotice() {
  const cookieNotice = document.getElementById("cookies");
  cookieNotice.classList.add("active");
}

function acceptCookie() {
  const cookieNotice = document.getElementById("cookies");
  cookieNotice.classList.remove("active");
  localStorage.setItem("cookieNoticeAccepted", new Date().toISOString());
  setCookie("cookieNoticeAccepted", new Date().toISOString(), 1);
}

document.getElementById("acceptCookie").addEventListener("click", acceptCookie);

const lastAccepted = localStorage.getItem("cookieNoticeAccepted");
if (lastAccepted) {
  const now = new Date();
  const lastAcceptedDate = new Date(lastAccepted);
  const oneDay = 24 * 60 * 60 * 1000;
  if (now - lastAcceptedDate > oneDay) {
    showCookieNotice();
  }
} else {
  showCookieNotice();
}
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
