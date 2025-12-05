// Позначення активного пункту меню + бургер меню
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('#site-nav a');
  links.forEach(a => {
    const href = a.getAttribute('href');
    if(href === path){ a.setAttribute('aria-current', 'page'); }
  });

  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if(btn && nav){
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  // Поточний рік у футері
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Знайти всі елементи з класом .card і змінити їм стиль
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.backgroundColor = '#fff7cc'; // світло-жовтий фон
    card.style.padding = '15px';
    card.style.borderRadius = '10px';
  });

  // Додати новий елемент <p> в кінець <main>
  const main = document.querySelector('main');

  const newParagraph = document.createElement('p');
  newParagraph.textContent = 'Цей абзац додано динамічно за допомогою JS.';
  newParagraph.style.marginTop = '20px';
  newParagraph.style.fontStyle = 'italic';

  main.append(newParagraph);

  // --- Перемикач теми ---
const themeBtn = document.querySelector('.theme-toggle');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });
}

// --- Підсвітка пунктів меню при наведенні ---
const navLinks = document.querySelectorAll('#site-nav a');

navLinks.forEach(link => {
  
  link.addEventListener('mouseenter', () => {
    link.classList.add('hovered');
  });

  link.addEventListener('mouseleave', () => {
    link.classList.remove('hovered');
  });

});

// --- Зміна розміру шрифту клавішами ---
let fontSize = 16; // початковий розмір (можна підлаштувати)

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    fontSize += 1;
    document.body.style.fontSize = fontSize + 'px';
  }
  if (e.key === 'ArrowDown') {
    fontSize -= 1;
    document.body.style.fontSize = fontSize + 'px';
  }
});


// --- Робота з контактною формою ---
const form = document.querySelector('.contact-form');

if (form) {

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // блокуємо відправку

    // Поля
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const topic = document.getElementById('topic');
    const message = document.getElementById('message');
    const agree = document.getElementById('agree');

    // Очищаємо старі помилки
    clearErrors();

    // Перевірки
    let isValid = true;

    // Перевірка імені
    if (name.value.trim().length < 3) {
      showError(name, "Ім'я повинно містити мінімум 3 символи.");
      isValid = false;
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      showError(email, "Введіть коректну електронну адресу.");
      isValid = false;
    }

    // Тема
    if (topic.value === "") {
      showError(topic, "Оберіть тему повідомлення.");
      isValid = false;
    }

    // Повідомлення
    if (message.value.trim().length < 10) {
      showError(message, "Повідомлення повинно містити мінімум 10 символів.");
      isValid = false;
    }

    // Checkbox
    if (!agree.checked) {
      showError(agree, "Ви повинні погодитися з умовами.");
      isValid = false;
    }

    // Якщо форма валідна
    if (isValid) {
      console.log("Форма надіслана!");
      console.log({
        name: name.value,
        email: email.value,
        topic: topic.value,
        message: message.value,
        agree: agree.checked
      });

      showSuccessMessage();

      form.reset();
    }

  });

  // ---- ФУНКЦІЇ ----

  function showError(input, message) {
    input.classList.add('error');

    let error = document.createElement('p');
    error.className = 'error-text';
    error.textContent = message;

    input.closest('.form-field').append(error);
  }

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-text').forEach(el => el.remove());
  }

  function showSuccessMessage() {
    let msg = document.createElement('p');
    msg.className = 'success-message';
    msg.textContent = "Форма успішно надіслана!";
    form.append(msg);

    setTimeout(() => msg.remove(), 4000);
  }

}



})();
