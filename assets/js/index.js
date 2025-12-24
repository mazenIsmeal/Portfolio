// ^ Write your JavaScript code here
// open & off settings-toggle
var btnSetting = document.querySelector("#settings-toggle");

btnSetting.addEventListener("click", function () {
  document
    .querySelector("#settings-sidebar")
    .classList.remove("translate-x-full");
  document.querySelector("#settings-sidebar").classList.add("translate-x-0");
  btnSetting.style.right = "20rem";
});

var closeSettings = document.querySelector("#close-settings");
var main = document.querySelector("#main-content");

main.addEventListener("click", closeIcon);
closeSettings.addEventListener("click", closeIcon);

function closeIcon() {
  document.querySelector("#settings-sidebar").classList.add("translate-x-full");
  btnSetting.style.right = "0";
}

var scrollBtn = document.getElementById("scroll-to-top");
var navitem = document.querySelectorAll(".nav-links a");
var sections = [];

// ~scroll to top
window.addEventListener("scroll", function () {
  if (window.scrollY === 0) {
    scrollBtn.classList.replace("opacity-100", "opacity-0");
    scrollBtn.classList.replace("visible", "invisible");
  } else {
    scrollBtn.classList.replace("opacity-0", "opacity-100");
    scrollBtn.classList.replace("invisible", "visible");
  }
});
scrollBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ~nav active

navitem.forEach(function (item) {
  var section = document.querySelector(item.getAttribute("href"));
  if (section) sections.push(section);
  item.addEventListener("click", function () {
    navitem.forEach(function (nav) {
      nav.classList.remove("active");
    });
    item.classList.add("active");
  });
});

window.addEventListener("scroll", function () {
  var scrollnav = window.scrollY + 100;
  sections.forEach(function (section, index) {
    if (
      scrollnav >= section.offsetTop &&
      scrollnav < section.offsetTop + section.offsetHeight
    ) {
      navitem.forEach(function (nav) {
        nav.classList.remove("active");
      });
      navitem[index].classList.add("active");
    }
  });
});

// Dark Mode
var toggleMode = document.querySelector("#theme-toggle-button");
var html = document.querySelector("html");

if (localStorage.getItem("dark") === null) {
  html.classList.add("dark");
  localStorage.setItem("dark", "dark");
} else if (localStorage.getItem("dark") === "dark") {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

toggleMode.addEventListener("click", function () {
  html.classList.toggle("dark");

  localStorage.setItem(
    "dark",
    html.classList.contains("dark") ? "dark" : "light"
  );
});

// Selected font
var btnSelectedFont = document.querySelectorAll(".font-option");
var savedFont = localStorage.getItem("font");

if (savedFont) {
  document.body.style.fontFamily = savedFont;
} else {
  document.body.style.fontFamily = "tajawal";
}

btnSelectedFont.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var changeFont = this.getAttribute("data-font");
    document.body.style.fontFamily = changeFont;
    localStorage.setItem("font", changeFont);
  });
});

// naves & tabs
var btnProduct = document.querySelectorAll(".portfolio-filter");
var allProduct = Array.from(document.querySelectorAll(".portfolio-item"));

btnProduct.forEach(function (btnProd) {
  btnProd.addEventListener("click", function () {
    btnProduct.forEach(function (btn) {
      btn.classList.remove(
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white"
      );
      btn.classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300"
      );
      btn.setAttribute("aria-pressed", "false");
    });

    this.classList.add(
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white"
    );
    this.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300"
    );
    this.setAttribute("aria-pressed", "true");

    // ---- filter logic ----
    var filterValue = this.getAttribute("data-filter");

    allProduct.forEach(function (prod) {
      prod.style.display = "none";
    });

    if (filterValue === "all") {
      allProduct.forEach(function (prod) {
        prod.style.display = "block";
      });
    } else {
      var filtered = allProduct.filter(function (prod) {
        return prod.getAttribute("data-category") === filterValue;
      });

      filtered.forEach(function (prod) {
        prod.style.display = "block";
      });
    }
  });
});

// form
var customSelect = document.querySelector(".custom-select");
var submit = document.querySelector("#submit");

customSelect.addEventListener("click", showSelectOptions);
submit.addEventListener("click", function (e) {
  if (e.target.id == "submit") {
    showSelectOptions();
  }
});

function showSelectOptions() {
  document.querySelector(".custom-options").classList.toggle("hidden");
  selectItem();
}

function selectItem() {
  var option = Array.from(customSelect.nextElementSibling.children);
  option.forEach(function (item) {
    item.addEventListener("click", function () {
      document.querySelector(".selected-text").textContent =
        item.getAttribute("data-value");
      document.querySelector(".custom-options").classList.add("hidden");
    });
  });
}

var selectB = document.querySelector('[data-name="budget"]');

selectB.addEventListener("click", function () {
  document.querySelector("#showOption").classList.toggle("hidden");
  var option = Array.from(selectB.nextElementSibling.children);
  option.forEach(function (item) {
    item.addEventListener("click", function () {
      document.querySelector("#selectedText").textContent =
        item.getAttribute("data-value");
      document.querySelector("#showOption").classList.add("hidden");
    });
  });
});

// validation

var fullName = document.querySelector("#full-name");
var email = document.querySelector("#email");
var details = document.querySelector("#project-details");

var showErrorName = document.querySelector("#showErrorName");
var showErrorEmail = document.querySelector("#showErrorEmail");
var showErrorDetails = document.querySelector("#showErrorDetails");

submit.addEventListener("submit", function (e) {
  e.preventDefault();

  var regex = {
    name: /^\w{2,20}\s?\w{2,20}?$/i,
    details: /^\w{2,50}?$/i,
    email: /^\w{2,20}@(gmail|yhaoo)\.com$/,
  };

  if (regex.name.test(fullName.value) == false) {
    showErrorName.classList.remove("hidden");
  } else {
    showErrorName.classList.add("hidden");
  }

  if (regex.details.test(details.value) == false) {
    showErrorDetails.classList.remove("hidden");
  } else {
    showErrorDetails.classList.add("hidden");
  }

  if (regex.email.test(email.value) == false) {
    showErrorEmail.classList.remove("hidden");
  } else {
    showErrorEmail.classList.add("hidden");
  }

  // check true show alert
  if (
    regex.name.test(fullName.value) &&
    regex.details.test(details.value) &&
    regex.email.test(email.value)
  ) {
    document.querySelector(".model").style.display = "flex";
    setTimeout(function () {
      document.querySelector(".model").style.display = "none";
    }, 8000);
  }
});

var testimonial = document.querySelectorAll(".testimonial-card");
var carousel = document.querySelector("#testimonials-carousel");
var prev = document.querySelector("#prev-testimonial");
var next = document.querySelector("#next-testimonial");
var indicators = document.querySelectorAll(".carousel-indicator");

var currentIndex = 0;

function updateCarousel() {
  var cardWidth =
    testimonial[0].offsetWidth +
    parseInt(getComputedStyle(testimonial[0]).marginRight || 0);
  var maxIndex = testimonial.length - 1;

  if (currentIndex > maxIndex) currentIndex = 0;
  if (currentIndex < 0) currentIndex = maxIndex;

  var moveX = cardWidth * currentIndex;
  carousel.style.transform = `translateX(${moveX}px)`;

  indicators.forEach((dot) => {
    dot.classList.remove("bg-accent");
    dot.setAttribute("aria-selected", "false");
  });

  if (indicators[currentIndex]) {
    indicators[currentIndex].classList.add("bg-accent");
    indicators[currentIndex].setAttribute("aria-selected", "true");
  }
}

next.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex >= 4) {
    currentIndex = 0;
  }

  updateCarousel();
});

prev.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = 3;
  }
  updateCarousel();
});

indicators.forEach((dot) => {
  dot.addEventListener("click", function () {
    currentIndex = Number(this.dataset.index);
    updateCarousel();
  });
});

window.addEventListener("resize", updateCarousel);

updateCarousel();

// change color
var themeColor = document.querySelector("#theme-colors-grid");
// button 1
var buttonColor = document.createElement("button");
var btnClass = buttonColor.classList.add("btnClass", "colorOne");
themeColor.appendChild(buttonColor);
// button 2
var buttonColorTwo = document.createElement("button");
var btnClass = buttonColorTwo.classList.add("btnClass", "colorTwo");
themeColor.appendChild(buttonColorTwo);

var buttonColorThree = document.createElement("button");
var btnClass = buttonColorThree.classList.add("btnClass", "colorThree");
themeColor.appendChild(buttonColorThree);

var buttonColorFour = document.createElement("button");
var btnClass = buttonColorFour.classList.add("btnClass", "colorFour");
themeColor.appendChild(buttonColorFour);

var buttonColorFive = document.createElement("button");
var btnClass = buttonColorFive.classList.add("btnClass", "colorFive");
themeColor.appendChild(buttonColorFive);

var buttonColorSix = document.createElement("button");
var btnClass = buttonColorSix.classList.add("btnClass", "colorSix");
themeColor.appendChild(buttonColorSix);

var root = document.documentElement;

var savedColor = localStorage.getItem("convertColor");
if (savedColor) {
  savedColor = JSON.parse(savedColor);
  root.style.setProperty("--color-primary", savedColor.colorMain);
  root.style.setProperty("--color-secondary", savedColor.colorSecondary);
  root.style.setProperty("--color-accent", savedColor.accent);
}

document.querySelector(".colorOne").addEventListener("click", function () {
  root.style.setProperty("--color-primary", "#6366f1");
  root.style.setProperty("--color-secondary", "#8b5cf6");
  root.style.setProperty("--color-accent", "#a855f7");
  var color = {
    colorMain: getComputedStyle(root).getPropertyValue("--color-primary"),
    colorSecondary:
      getComputedStyle(root).getPropertyValue("--color-secondary"),
    accent: getComputedStyle(root).getPropertyValue("--color-accent"),
  };
  console.log(color);
  localStorage.setItem("convertColor", JSON.stringify(color));
});

document.querySelector(".colorTwo").addEventListener("click", function () {
  root.style.setProperty("--color-primary", "#ec4899");
  root.style.setProperty("--color-secondary", "#f97316");
  root.style.setProperty("--color-accent", "#fb923c");
  var color = {
    colorMain: getComputedStyle(root).getPropertyValue("--color-primary"),
    colorSecondary:
      getComputedStyle(root).getPropertyValue("--color-secondary"),
    accent: getComputedStyle(root).getPropertyValue("--color-accent"),
  };
  console.log(color);
  localStorage.setItem("convertColor", JSON.stringify(color));
});
document.querySelector(".colorThree").addEventListener("click", function () {
  root.style.setProperty("--color-primary", "#10b981");
  root.style.setProperty("--color-secondary", "#059669");
  root.style.setProperty("--color-accent", "#34d399");
  var color = {
    colorMain: getComputedStyle(root).getPropertyValue("--color-primary"),
    colorSecondary:
      getComputedStyle(root).getPropertyValue("--color-secondary"),
    accent: getComputedStyle(root).getPropertyValue("--color-accent"),
  };
  console.log(color);
  localStorage.setItem("convertColor", JSON.stringify(color));
});
document.querySelector(".colorFour").addEventListener("click", function () {
  root.style.setProperty("--color-primary", "#3b82f6");
  root.style.setProperty("--color-secondary", "#06b6d4");
  root.style.setProperty("--color-accent", "#22d3ee");
  var color = {
    colorMain: getComputedStyle(root).getPropertyValue("--color-primary"),
    colorSecondary:
      getComputedStyle(root).getPropertyValue("--color-secondary"),
    accent: getComputedStyle(root).getPropertyValue("--color-accent"),
  };
  console.log(color);
  localStorage.setItem("convertColor", JSON.stringify(color));
});
document.querySelector(".colorFive").addEventListener("click", function () {
  root.style.setProperty("--color-primary", "#ef4444");
  root.style.setProperty("--color-secondary", "#f43f5e");
  root.style.setProperty("--color-accent", "#fb7185");
  var color = {
    colorMain: getComputedStyle(root).getPropertyValue("--color-primary"),
    colorSecondary:
      getComputedStyle(root).getPropertyValue("--color-secondary"),
    accent: getComputedStyle(root).getPropertyValue("--color-accent"),
  };
  console.log(color);
  localStorage.setItem("convertColor", JSON.stringify(color));
});
document.querySelector(".colorSix").addEventListener("click", function () {
  root.style.setProperty("--color-primary", "#f59e0b");
  root.style.setProperty("--color-secondary", "#ea580c");
  root.style.setProperty("--color-accent", "#fbbf24");
  var color = {
    colorMain: getComputedStyle(root).getPropertyValue("--color-primary"),
    colorSecondary:
      getComputedStyle(root).getPropertyValue("--color-secondary"),
    accent: getComputedStyle(root).getPropertyValue("--color-accent"),
  };
  console.log(color);
  localStorage.setItem("convertColor", JSON.stringify(color));
});

// create model final submit form
var model = document.createElement("div");
var classModel = model.classList.add("model");
var textModel = document.createTextNode("تم الارسال");
var icon = document.createElement("i");
var iconClass = icon.classList.add("fa-solid", "fa-check");
var btnSend = document.createElement("button");
var btnText = document.createTextNode("ارسال");
btnSend.appendChild(btnText);
model.append(icon);
model.appendChild(textModel);
model.appendChild(btnSend);
submit.appendChild(model);
console.log(model);
