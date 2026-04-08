document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("pops");
  const closeBtn = document.querySelector(".close-btn");
  const estimateBtns = document.querySelectorAll(".estimate-btn");
  const carInput = document.getElementById("wr_11");
  const header = document.getElementById("hd");

  function openPopup(prefillText = "") {
    if (popup) {
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
    if (carInput && prefillText) {
      carInput.value = prefillText;
    }
  }

  function closePopup() {
    if (popup) {
      popup.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  estimateBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();

      const sop = btn.closest(".sop");
      const carTitle = sop?.querySelector(".ref .cp1 .hd");
      const value = carTitle ? carTitle.textContent.trim() : "";

      openPopup(value);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      closePopup();
    }
  });

  function setupTicker(containerSelector, direction = "left") {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const content = container.querySelector(".scroll_content");
    if (!content) return;

    const original = content.innerHTML.trim();
    content.innerHTML = `${original} ${original} ${original} ${original}`;

    let pos = direction === "left" ? 0 : -(content.scrollWidth / 2);

    function animate() {
      pos += direction === "left" ? -0.35 : 0.35;

      if (direction === "left" && Math.abs(pos) >= content.scrollWidth / 2) {
        pos = 0;
      }
      if (direction === "right" && pos >= 0) {
        pos = -(content.scrollWidth / 2);
      }

      content.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(animate);
    }

    content.style.willChange = "transform";
    animate();
  }

  setupTicker(".scroll_left", "left");
  setupTicker(".scroll_right", "right");

  window.addEventListener("scroll", function () {
    if (!header) return;
    if (window.scrollY > 100) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });

  const telInputs = document.querySelectorAll('input[name="wr_2"]');
  telInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d]/g, "").slice(0, 11);
    });
  });

  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const name = form.querySelector('input[name="wr_name"]');
      const phone = form.querySelector('input[name="wr_2"]');
      const agree = form.querySelector('input[name="agree"]');

      if (!name || !name.value.trim()) {
        e.preventDefault();
        alert("이름을 입력해주세요.");
        name?.focus();
        return;
      }

      if (!phone || phone.value.trim().length < 10) {
        e.preventDefault();
        alert("연락처를 정확히 입력해주세요.");
        phone?.focus();
        return;
      }

      if (agree && !agree.checked) {
        e.preventDefault();
        alert("개인정보처리방침 동의가 필요합니다.");
      }
    });
  });
});

function fnMove(seq) {
  const target = document.getElementById("mct_0" + seq);
  if (!target) return;
  window.scrollTo({
    top: target.offsetTop - 90,
    behavior: "smooth"
  });
}

function fnMove2(seq) {
  const target = document.querySelector(".wz" + seq);
  if (!target) return;
  window.scrollTo({
    top: target.offsetTop - 250,
    behavior: "smooth"
  });
}