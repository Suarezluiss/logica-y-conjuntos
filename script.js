const hero = $('.hero')
;['∪', '∩', '∈', '⊆', '∅', '∀', 'Aᶜ', 'ℕ'].forEach((s, i) =>
  hero.insertAdjacentHTML(
    'afterbegin',
    `<span class="sym" style="left:${6 + i * 12}%;top:${
      10 + ((i * 37) % 70)
    }%;animation-delay:${i * 0.7}s">${s}</span>`
  )
)

const facts = [
  [
    '#7b4dff',
    '📜',
    'Cantor y el infinito',
    'En 1874 Cantor publicó su primer trabajo sobre conjuntos infinitos y mostró que ℝ no es numerable. Su argumento diagonal es de 1891.'
  ],
  [
    '#f5a623',
    '⭕',
    'Antes de Venn',
    'Euler ya usaba círculos para representar lógica en el siglo XVIII; Venn los sistematizó en 1880.'
  ],
  [
    '#1fb58f',
    '♾️',
    'No todo infinito es igual',
    'La cardinalidad de ℕ se llama ℵ₀ (alef-cero). ℕ, ℤ y ℚ tienen la misma cardinalidad; ℝ tiene una mayor.'
  ],
  [
    '#e8467c',
    '🔢',
    'Conjunto potencia',
    'Si |A| = n, el conjunto de todos sus subconjuntos P(A) tiene 2ⁿ elementos. Cantor demostró que |P(A)| > |A| siempre.'
  ],
  [
    '#3b82f6',
    '✖️',
    'Producto cartesiano',
    'A × B es el conjunto de pares ordenados (a, b). Si A y B son finitos, |A × B| = |A| · |B|.'
  ],
  [
    '#d35400',
    '🪞',
    'De Morgan en lógica',
    '¬(P ∧ Q) ⟺ ¬P ∨ ¬Q y ¬(P ∨ Q) ⟺ ¬P ∧ ¬Q: son las mismas leyes de los conjuntos.'
  ],
  [
    '#9b59b6',
    '🤯',
    'Paradoja de Russell (1901)',
    'El "conjunto de todos los conjuntos que no se contienen a sí mismos" genera contradicción. Motivó la teoría axiomática de Zermelo–Fraenkel.'
  ],
  [
    '#27ae60',
    '🏨',
    'El hotel de Hilbert',
    'Un hotel con infinitas habitaciones, todas ocupadas, aún puede alojar a un huésped nuevo: cada huésped pasa de la habitación n a la n + 1.'
  ],
  [
    '#e67e22',
    '💻',
    'Conjuntos en programación',
    'Python, Java, JavaScript y otros lenguajes tienen la estructura «set», que no admite elementos repetidos y ofrece unión, intersección y diferencia, igual que en matemáticas.'
  ],
  [
    '#3b82f6',
    '🔍',
    'Buscadores y operadores lógicos',
    'Al buscar con AND, OR y NOT estás usando intersección, unión y complemento sobre conjuntos de páginas web.'
  ],
  [
    '#e8467c',
    '🧬',
    'Biología y datos',
    'Los diagramas de Venn se usan en ciencia para comparar grupos, por ejemplo qué genes comparten distintas especies.'
  ]
]
$('#actividades').insertAdjacentHTML(
  'beforebegin',
  `<section id="retos"><h2>💡 Curiosidades y Retos</h2><h2 style="color:#16a085">Ve más allá</h2><p class="sub">Datos históricos y matemáticos verificados, más un reto con XP.</p>
<div class="grid2">${facts
    .map(
      f =>
        `<div class="card" style="--c:${f[0]}"><h3>${f[1]} ${f[2]}</h3><p>${f[3]}</p></div>`
    )
    .join('')}</div>
<div class="grid2 ch" style="margin-top:20px"><div class="card" style="--c:#1fb58f"><h3>🎯 Reto</h3><p>En un curso de 40 estudiantes, 22 estudian inglés, 18 francés y 10 ambos. ¿Cuántos estudian al menos un idioma?</p><input id="r1" type="number" aria-label="Respuesta del reto" placeholder="?"><button class="btn" onclick="reto(1,30)">Comprobar</button><p id="r1m"></p></div></div></section>`
)
$('#rubrica').insertAdjacentHTML(
  'beforebegin',
  `<section id="logros"><h2>🏅 Mis logros</h2><p class="sub">Elige tu avatar y gana XP explorando, jugando y resolviendo. ¡Cada 100 XP subes de nivel!</p>
<div class="avs">${AV.map(
    (a, i) =>
      `<button class="avb" data-i="${i}" aria-label="Avatar ${i + 1}">${kidSvg(
        i
      )}</button>`
  ).join('')}</div>
<div class="mis" id="mis"></div>
<div class="badges">${BADGES.map(
    b =>
      `<div class="bd" data-id="${b[0]}"><i>${b[1]}</i><b>${b[2]}</b><small>${b[3]}</small></div>`
  ).join('')}</div></section>`
)
$$('.avb').forEach(b =>
  b.addEventListener('click', () => {
    S.av = +b.dataset.i
    save()
    hud()
    award('av', 5, '🧑‍🎓 Avatar elegido')
  })
)

function reto (n, ans) {
  const v = +$('#r' + n).value,
    m = $('#r' + n + 'm')
  if (v === ans) {
    m.innerHTML = '<b class="good">✅ ¡Correcto!</b>'
    confetti(80)
    award('r' + n, 30, '🎯 Reto superado')
  } else
    m.innerHTML =
      '<b class="bad">❌ Inténtalo otra vez. Pista: |F ∪ K| = |F| + |K| − |F ∩ K|</b>'
}

function tp () {
  const p = $('#proof')
  p.style.display = p.style.display === 'block' ? 'none' : 'block'
  if (p.style.display === 'block') award('p_open', 20, '🧭')
}
$$('.navmore a').forEach(a =>
  a.addEventListener('click', () => $('.navmore').removeAttribute('open'))
)

$$('#marco details').forEach((d, i) =>
  d.addEventListener(
    'toggle',
    () => d.open && award('d' + i, 5, '📖 Tema explorado')
  )
)
const io = new IntersectionObserver(
  es =>
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        if (e.target.tagName === 'SECTION' && e.target.id)
          award('s_' + e.target.id, 10, '📍 ' + e.target.id)
        io.unobserve(e.target)
      }
    }),
  { threshold: 0.15 }
)
$$('section').forEach(s => io.observe(s))
$$('.card,#marco details,.vid>div,.badges,.act').forEach(e => {
  e.classList.add('rv')
  io.observe(e)
})
hud()
