let slideIndex = 0;
showSlides();

function showSlides() {
  let i;

  let slides = document.getElementsByClassName("banner-image");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  } //fsheh gjithe imazhet 

  slides[slideIndex].style.display = "block"; //shfaq imazhin

  slideIndex++;

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  } //ben loop kur arrihet te imazhi i fundit

  setTimeout(showSlides, 5000);//pret 5s para se te rifiloj
}

// Funksionaliteti i butonit scroll
document.addEventListener('DOMContentLoaded', function() {
  const scrollButtons = document.querySelectorAll('.scroll-button');

  scrollButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Gjej .orderList parent
      const orderList = this.closest('.orderFrom').querySelector('.orderList');

      // Sasia e scrollimit në pixel
      const scrollAmount = 300;

      if (this.classList.contains('left')) {
        orderList.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      } else if (this.classList.contains('right')) {
        orderList.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Funksionaliteti i zvarritjes me maus për listën e porosive
document.addEventListener('DOMContentLoaded', function() {
  const orderLists = document.querySelectorAll('.orderList');

  orderLists.forEach(orderList => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let animationId = null;

    // Mausi poshtë - fillo zvarritjen
    orderList.addEventListener('mousedown', (e) => {
      isDown = true;
      orderList.style.cursor = 'grabbing';
      startX = e.pageX - orderList.offsetLeft;
      scrollLeft = orderList.scrollLeft;
      lastX = e.pageX;
      lastTime = Date.now();
      
      // Anulo ndonjë animacion në vazhdim
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });

    // Mausi largohet - ndal zvarritjen
    orderList.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        orderList.style.cursor = 'grab';
        applyInertia();
      }
    });

    // Maus lart - ndal zvarritjen
    orderList.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        orderList.style.cursor = 'grab';
        applyInertia();
      }
    });

    // Lëvizja e mausit - scrolling
    orderList.addEventListener('mousemove', (e) => {
      if (!isDown) return;

      const x = e.pageX - orderList.offsetLeft;
      const walk = (x - startX) * 1.2; // Shpejtësia e zvarritjes
      orderList.scrollLeft = scrollLeft - walk;
      
      // Llogarit shpejtësinë për inertinë
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime;
      if (timeDelta > 0) {
        velocity = (lastX - e.pageX) / timeDelta;
      }
      lastX = e.pageX;
      lastTime = currentTime;
    });

    // Zbaton inerti në scrolling
    function applyInertia() {
      if (Math.abs(velocity) < 0.1) return;
      
      animationId = requestAnimationFrame(() => {
        orderList.scrollLeft += velocity * 16;
        velocity *= 0.5; // Ngadalësim i butë
        
        if (Math.abs(velocity) > 0.1) {
          applyInertia();
        }
      });
    }

    // Shton grab cursor
    orderList.addEventListener('mouseenter', () => {
      orderList.style.cursor = 'grab';
    });
  });
});
