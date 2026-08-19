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
  const shareBtns = document.querySelectorAll('.share');

  const sharePage = () => {
    if (navigator.share) {
      navigator.share({
        title: '',
        text: 'Chécalo 👀',
        url: window.location.href
      })
      .catch(err => console.log('Share cancelado', err))
    } else {
      alert('Tu navegador no soporta compartir')
    }
  }

  if (shareBtns[0]) {
    shareBtns.forEach((share) => {
      share.addEventListener('click', () => {
        sharePage()
      })
    })
  }

  if (subir) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 1000) {
        subir.style = 'display: block;'
      } else {
        subir.style = 'display: none;'
      }
    })

    subir.addEventListener('click', () => {
      window.scrollTo(0, 0)
    })
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
  
  document.addEventListener('change', (e) => {
  if (e.target.matches('.replyForm input[type="file"]')) {
    const file = e.target.files[0]
    if (!file) return
    const preview = e.target.closest('.replyFormTop').querySelector('.replyImgPrev')
    preview.src = URL.createObjectURL(file)
  }
})

  document.querySelector('.sendCommentBtn').addEventListener('click', (e) => {
    e.preventDefault()

    const comentario = document.querySelector('.comentario')
    const rating = document.querySelector('.ratingInpt')

    if (!comentario.value || !rating.value || comentario.value.length <= 3) {
      comentario.style.borderColor = '#F434AA'
    } else {
      document.querySelector('.commentForm').submit()
    }
  })

  // ── Comentarios: mostrar todos + paginación ──
  document.getElementById("showAllBtn")?.addEventListener("click", (e) => {
  document.getElementById("allComments").style.display = "block";
  e.target.style.display = "none"
  document.querySelector('.viewComments').style.display = 'none'
  document.querySelector('.viewComments').innerHTML = ''
  loadComments(1)
})

  document.getElementById('commentsPrevBtn')?.addEventListener('click', () => {
    if (currentPage > 1) loadComments(currentPage - 1)
  })

  document.getElementById('commentsNextBtn')?.addEventListener('click', () => {
    if (currentPage < totalPages) loadComments(currentPage + 1)
  })

  // ── Carrusel ──
  const cards = Array.from(document.querySelectorAll('.dwnCard'));
  const dotsContainer = document.getElementById('dots');
  const total = cards.length;
  let current = 0;
  let animating = false;

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

    cards[current].className = 'dwnCard ' + (dir > 0 ? 'behind' : 'behind-left');
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

  let tx = 0;
  document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) dx < 0 ? goTo((current + 1) % total) : goTo((current - 1 + total) % total);
  });

  let mx = 0, dragging = false;
  document.addEventListener('mousedown', e => { mx = e.clientX; dragging = true; });
  document.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - mx;
    if (Math.abs(dx) > 60) dx < 0 ? goTo((current + 1) % total) : goTo((current - 1 + total) % total);
  });

  let auto = setInterval(() => goTo((current + 1) % total), 3500);
  document.querySelector('.stage').addEventListener('mouseenter', () => clearInterval(auto));
  document.querySelector('.stage').addEventListener('mouseleave', () => {
    auto = setInterval(() => goTo((current + 1) % total), 3500);
  });

  document.querySelectorAll('img').forEach((img) => img.setAttribute('inert', 'true'))
})

let currentPage = 1
let totalPages = 1

function timeAgo(dateStr) {
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000)

  const intervals = {
    año: 31536000,
    mes: 2592000,
    semana: 604800,
    día: 86400,
    hora: 3600,
    minuto: 60
  }

  for (let key in intervals) {
    const interval = Math.floor(seconds / intervals[key])
    if (interval >= 1) {
      return `Hace ${interval} ${key === 'mes' && interval > 1 ? key + 'e' : key}${interval > 1 ? 's' : ''}`
    }
  }

  return 'Hace unos segundos'
}

function devBadge(isDev) {
  if (!isDev) return ''
  return `<span class="dev-badge">DEV</span>`
}

function renderComment(c) {
  const repliesHtml = (c.replies || []).map(r => `
    <div class="reply">
      <div class="replyHeader">
        <img class="replyAvatar" src="${r.photo}">
        <div class="replyMeta">
          <div class="replyNameRow">
            <strong class="replyName">${r.name}</strong>
            ${devBadge(r.itsAFraudbaniDev)}
          </div>
          <small class="replyTime">${timeAgo(r.createdAt)}</small>
        </div>
      </div>
      <p class="replyText">${r.comment}</p>
      ${r.img ? `<img class="replyImg" src="${r.img}">` : ''}
    </div>
  `).join('')

  return `
    <div class="comment bg-body-tertiary" style="padding: 15px;">
      <div class="commentHeader">
        <img class="commentAvatar" src="${c.photo}">
        <div class="commentMeta">
          <div class="commentNameRow">
            <strong class="commentName">${c.name}</strong>
            ${devBadge(c.itsAFraudbaniDev)}
            ${c.pinned ? '<span class="pinnedBadge"><i class="bi bi-pin-angle-fill"></i> Fijado</span>' : ''}
          </div>
          <small class="commentTime">${timeAgo(c.createdAt)}</small>
        </div>
      </div>
      <p class="commentText" style="padding: 10px;">${c.comment}</p>
      ${c.img ? `<img src="${c.img}" style="margin-bottom: 10px; object-fit:contain;width:100%;">` : ''}
      <span class="poppinsBalance" style="padding:10px;"><i class="bi bi-star-fill"></i> ${c.rating}</span>
      ${c.replies?.length ? `
        <button class="toggleRepliesBtn replyBtn" onclick="toggleReplies('${c._id}', this)" style="margin-top:10px;">
          Ver respuestas (${c.replies.length})
        </button>
        <div class="replies" id="replies-${c._id}" style="display:none;">${repliesHtml}</div>
      ` : ''}
      <button class="replyBtn" onclick="toggleReply('${c._id}', this)">Responder</button>
    </div>
    <form action="/comment" method="POST" class="replyForm" id="reply-${c._id}" style="display:none;" enctype="multipart/form-data">
      <input type="hidden" name="parentId" value="${c._id}">
      <div class="replyFormTop">
        <label for="replyFile-${c._id}" class="reply-file-btn">
          <img class="replyImgPrev" src="/./img/avatar.png">
          <div class="reply-edit"><i class="bi bi-camera-fill"></i></div>
        </label>
        <input type="file" id="replyFile-${c._id}" name="file" accept="image/*" hidden>
        <input class="replyNameInput" type="text" name="name" placeholder="Nombre (opcional)">
      </div>
      <div class="txtGp">
        <textarea class="rplCom" name="comment" placeholder="Escribe tu respuesta..." required></textarea>
        <button class="replySendBtn" type="submit"><i class="bi bi-send-fill"></i></button>
      </div>
    </form>
    <br>
  `
}

async function loadComments(page = 1) {
  const container = document.getElementById('commentsContainer')
  container.innerHTML = '<p class="poppinsLabel text-center">Cargando...</p>'

  try {
    const res = await fetch(`/comment/s?page=${page}`)
    const data = await res.json()

    currentPage = data.page
    totalPages = data.totalPages

    container.innerHTML = data.comments.map(renderComment).join('')
    document.getElementById('pageInfo').textContent = `Página ${currentPage} de ${totalPages}`
    document.getElementById('commentsPrevBtn').disabled = currentPage <= 1
    document.getElementById('commentsNextBtn').disabled = currentPage >= totalPages
  } catch (err) {
    container.innerHTML = '<p class="poppinsLabel text-center">Error al cargar comentarios</p>'
    console.error(err)
  }
}