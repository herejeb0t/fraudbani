document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener("scroll", function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 75) {
    navbar.style = 'background: rgba(50,50,50,.1); backdrop-filter: blur(3px);'
  } else {
   navbar.style = '--bs-bg-opacity: 0;'
  }
})

const subir = document.querySelector('.subir');
const share = document.querySelector('.share');

if(subir && share) {
  window.addEventListener('scroll', function () {
  if (window.scrollY > 1000) {
    subir.style = 'display: block;'
  } else {
    subir.style = 'display: none;'
  }
  })
  
  subir.addEventListener('click', () => { 
    window.scrollTo(0,0)
    //location.href = './iframe.html'
  })
  
  share.addEventListener('click', () => { 
    sharePage()
    //location.href = './iframe.html'
  })
  
const sharePage = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Fraudbani',
      text: 'Chécalo 👀',
      url: window.location.href
    })
    .catch(err => console.log('Share cancelado', err))
  } else {
    alert('Tu navegador no soporta compartir')
  }
}
}
  const stars = document.querySelectorAll('#rating i')
  const ratingInput = document.getElementById('rating-value')
  let selectedRating = 0

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      fillStars(star.dataset.value)
    })

    star.addEventListener('click', () => {
      selectedRating = star.dataset.value
      ratingInput.value = selectedRating
    })

    star.addEventListener('mouseout', () => {
      fillStars(selectedRating)
    })
  })

  function fillStars(value) {
    stars.forEach(star => {
      if (star.dataset.value <= value) {
        star.classList.remove('bi-star')
        star.classList.add('bi-star-fill')
      } else {
        star.classList.remove('bi-star-fill')
        star.classList.add('bi-star')
      }
    })
  }
  
  const fileInput = document.getElementById('file')
  const preview = document.querySelector('.imgPrev')

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]
    if (!file) return

    preview.src = URL.createObjectURL(file)
  })
  
  document.querySelector('.sendCommentBtn').addEventListener('click', (e) => {
    e.preventDefault()
    
    const comentario = document.querySelector('.comentario')
    const rating = document.querySelector('.ratingInpt')
    
    if (!comentario.value || !rating.value || comentario.value.length <= 3) {
      comentario.style.borderColor = '#F434AA'
      }
      else
      {
    document.querySelector('.commentForm').submit()
      }
  })
  
  document.getElementById("showAllBtn")?.addEventListener("click", () => {
    document.getElementById("allComments").style.display = "block";
    document.querySelector('.viewComments').style.display = 'none'
    document.querySelector('.viewComments').innerHTML = ''
    document.getElementById("showAllBtn").style.display = "none";
  })
  
  
    // ── Carrusel ──
  const cards = Array.from(document.querySelectorAll('.dwnCard'));
  const dotsContainer = document.getElementById('dots');
  const total = cards.length;
  let current = 0;
  let animating = false;

  // Crear dots
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  });

  function getDots() { return Array.from(dotsContainer.querySelectorAll('.dot')); }

  function applyStates(cur) {
    cards.forEach((card, i) => {
      const rel = (i - cur + total) % total;
      card.className = 'dwnCard ' + (
        rel === 0 ? 'active' :
        rel === 1 ? 'behind' :
        rel === total - 1 ? 'behind-left' :
        'hidden'
      );
    });
    getDots().forEach((d, i) => {
      d.className = 'dot' + (i === cur ? ' active' : '');
    });
  }

  function goTo(target) {
    if (animating || target === current) return;
    animating = true;

    const dir = ((target - current + total) % total) <= total / 2 ? 1 : -1;

    // Card saliente
    cards[current].className = 'dwnCard ' + (dir > 0 ? 'behind' : 'behind-left');
    // Card entrante
    cards[target].className = 'dwnCard active';
    getDots().forEach((d, i) => d.className = 'dot' + (i === target ? ' active' : ''));

    current = target;
    setTimeout(() => {
      applyStates(current);
      animating = false;
    }, 650);
  }

  document.getElementById('nextBtn').addEventListener('click', () => goTo((current + 1) % total));
  document.getElementById('prevBtn').addEventListener('click', () => goTo((current - 1 + total) % total));

  // Swipe táctil
  let tx = 0;
  document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) dx < 0 ? goTo((current+1)%total) : goTo((current-1+total)%total);
  });

  // Drag mouse
  let mx = 0, dragging = false;
  document.addEventListener('mousedown', e => { mx = e.clientX; dragging = true; });
  document.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - mx;
    if (Math.abs(dx) > 60) dx < 0 ? goTo((current+1)%total) : goTo((current-1+total)%total);
  });

  // Autoplay
  let auto = setInterval(() => goTo((current+1)%total), 3500);
  document.querySelector('.stage').addEventListener('mouseenter', () => clearInterval(auto));
  document.querySelector('.stage').addEventListener('mouseleave', () => {
    auto = setInterval(() => goTo((current+1)%total), 3500);
  });
  
  
  document.querySelectorAll('img').forEach((img) => img.setAttribute('inert', 'true'))
  
})