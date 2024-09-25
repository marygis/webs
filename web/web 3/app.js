// Variables
let loggedInUser = null // Variable global para almacenar el usuario que ha iniciado sesión

const registerForm = document.getElementById('registerForm')
const loginForm = document.getElementById('loginForm')
const preferencesForm = document.getElementById('preferencesForm')
const preferencesSection = document.getElementById('preferencesSection')
const contentSection = document.getElementById('contentSection')

// Almacenar usuario en Local Storage
function storeUser(user) {
 localStorage.setItem('user', JSON.stringify(user))
}

// Manejar el registro
registerForm.addEventListener('submit', function (event) {
 event.preventDefault()
 const username = registerForm.querySelector('input[type="text"]').value
 const email = registerForm.querySelector('input[type="email"]').value
 const password = registerForm.querySelector('input[type="password"]').value

 // Guardar el usuario en localStorage
 storeUser({ username, email, password })
 alert('Registro exitoso. Ahora puedes iniciar sesión.')
})

// Manejar el inicio de sesión
loginForm.addEventListener('submit', function (event) {
 event.preventDefault()
 const email = loginForm.querySelector('input[type="email"]').value
 const password = loginForm.querySelector('input[type="password"]').value

 const user = JSON.parse(localStorage.getItem('user'))

 if (user && user.email === email && user.password === password) {
  loggedInUser = user
  alert('Inicio de sesión exitoso.')
  showPreferences()
 } else {
  alert('Credenciales incorrectas.')
 }
})

// Mostrar la sección de preferencias
function showPreferences() {
 document.getElementById('authSection').style.display = 'none'
 preferencesSection.style.display = 'block'
}

// Manejar la encuesta de preferencias
preferencesForm.addEventListener('submit', function (event) {
 event.preventDefault()
 const favoriteTopic = preferencesForm.favoriteTopic.value

 let news = ''

 switch (favoriteTopic) {
  case 'tecnologia':
   news =
    'Últimas noticias de tecnología: La inteligencia artificial está revolucionando la forma en que trabajamos y vivimos. Nuevos avances en el aprendizaje automático están transformando industrias enteras.'
   break
  case 'ciencia':
   news =
    'Últimas noticias de ciencia: Investigadores han descubierto una nueva especie de delfín en aguas profundas. Este hallazgo podría tener implicaciones importantes para la conservación de la vida marina.'
   break
  case 'arte':
   news =
    'Últimas noticias de arte: La exposición de arte contemporáneo en el Museo Nacional ha atraído a miles de visitantes, destacando la fusión de tecnología y arte en el mundo moderno.'
   break
  case 'deportes':
   news =
    'Últimas noticias de deportes: El equipo nacional de fútbol ha logrado avanzar a las semifinales de la Copa Mundial tras un impresionante partido contra su rival histórico.'
   break
  case 'medio_ambiente':
   news =
    'Últimas noticias sobre medio ambiente: Un nuevo informe revela que las emisiones de carbono han disminuido significativamente en varias ciudades tras la implementación de políticas ecológicas.'
   break
 }

 document.getElementById('personalizedContent').innerText = news
 preferencesSection.style.display = 'none'
 contentSection.style.display = 'block'
})
