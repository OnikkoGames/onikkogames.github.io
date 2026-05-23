/* ----------- image-hole-section ----------- */

(function () {
  const fixedBg = document.querySelector(".fixed-bg");
  const holeSection = document.querySelector(".image-hole-section");
  if (fixedBg && holeSection && "IntersectionObserver" in window) {
    fixedBg.style.backgroundImage = 'url("images/Image_1room.jpg")';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fixedBg.style.opacity = "1";
          } else {
            fixedBg.style.opacity = "0";
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(holeSection);
  } else if (fixedBg) {
    fixedBg.style.backgroundImage = 'url("images/Image_1room.jpg")';
  }

  const front = document.querySelector(".hero-bg--front");
  const back = document.querySelector(".hero-bg--back");
  const subtitle = document.querySelector(".hero-subtitle");
  if (!front || !back || !subtitle) return;

  const images = [
    "images/Image_1room.jpg",
    "images/images/hero-2.jpg",
  ];
  const subtitles = [
    "( 1room 砂漠シェルターからの脱出 )",
    "( 1room 箱舟ハイツからの脱出 )",
  ];

  if (!images.length) return;

  let index = 0;
  let isFrontActive = true;

  function showNextImage() {
    const active = isFrontActive ? front : back;
    const next = isFrontActive ? back : front;

    /* ----------- HERO-SECTION ----------- */

    subtitle.classList.add("is-hidden");

    setTimeout(() => {
      next.style.backgroundImage = `url("${images[index]}")`;
      if (subtitles[index]) {
        subtitle.textContent = subtitles[index];
      }

      active.classList.remove("is-active");
      next.classList.add("is-active");

      subtitle.classList.remove("is-hidden");

      index = (index + 1) % images.length;
      isFrontActive = !isFrontActive;
    }, 200);
  }

  front.style.backgroundImage = `url("${images[index]}")`;
  if (subtitles[index]) {
    subtitle.textContent = subtitles[index];
  }
  index = (index + 1) % images.length;

  setInterval(showNextImage, 3000);
})();


/* ----------- HEADER ----------- */

const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const icon = document.querySelector(".hamburger-icon");
//const games = document.querySelector(".games");

/* ----------- 下層ページは最初からscrolled ----------- */

if (header && !hero) {
  header.classList.add("scrolled");
}

/* ----------- スクロールでヘッダー色変更 ----------- */

window.addEventListener("scroll", () => {
  if (!hero || !header) return;
  header.classList.toggle("scrolled", window.scrollY > hero.offsetHeight);
});

/* ----------- ハンバーガーメニュー ----------- */

if (hamburger && nav && icon && header) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    header.classList.toggle("menu-open"); // ← ここ重要

    if (nav.classList.contains("open")) {
      icon.textContent = "close";
      document.body.style.overflow = "hidden";
    } else {
      icon.textContent = "menu";
      document.body.style.overflow = "";
    }
  });
}

/* ----------- SP時の.games開閉 ----------- */

const games = document.querySelector(".games");
const toggleBtn = document.querySelector(".accordion-toggle");
const toggleIcon = document.querySelector(".toggle-icon");

if (games && toggleBtn && toggleIcon) {
  toggleBtn.addEventListener("click", function (e) {
    e.preventDefault();

    games.classList.toggle("open");

    if (games.classList.contains("open")) {
      toggleIcon.textContent = "remove"; // −
    } else {
      toggleIcon.textContent = "add"; // ＋
    }
  });
}

function updateArrowIcon() {
  const arrows = document.querySelectorAll(".arrow");

  arrows.forEach((arrow) => {
    if (window.innerWidth <= 768) {
      arrow.textContent = "chevron_right";   // SP ▶
    } else {
      arrow.textContent = "expand_more";     // PC ▼
    }
  });
}

updateArrowIcon();
window.addEventListener("resize", updateArrowIcon);

const siteHeader = document.querySelector('.site-header');
const menuLinks = document.querySelectorAll('.menu a');

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    siteHeader.classList.remove('menu-open');

    icon.textContent = 'menu';

    document.body.style.overflow = '';
  });
});



/* ----------- ゲーム一覧_アコーディオン ----------- */

function toggleAccordion(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.icon');

  content.classList.toggle('open');

  const isOpen = content.classList.contains('open');

  icon.textContent = isOpen ? 'remove' : 'add';
}
