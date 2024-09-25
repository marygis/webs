// Variables
const articleForm = document.getElementById('articleForm')
const articlesContainer = document.getElementById('articlesContainer')

// Event listener para guardar artículo
articleForm.addEventListener('submit', function (event) {
 event.preventDefault()

 const title = document.getElementById('title').value
 const content = document.getElementById('content').value
 const imageInput = document.getElementById('image')

 // Validar que la imagen se haya seleccionado
 if (imageInput.files.length === 0) {
  alert('Por favor, sube una imagen.')
  return
 }

 const reader = new FileReader()
 reader.onload = function () {
  const imageData = reader.result

  const article = {
   title,
   content, // Aquí se incluye el contenido del artículo
   image: imageData,
  }

  // Guardar artículo en Local Storage
  saveArticleToLocalStorage(article)
  displayArticles()

  // Limpiar el formulario
  articleForm.reset()
 }

 reader.readAsDataURL(imageInput.files[0])
})

// Guardar artículo en Local Storage
function saveArticleToLocalStorage(article) {
 let articles = localStorage.getItem('articles')
 if (articles === null) {
  articles = []
 } else {
  articles = JSON.parse(articles)
 }

 articles.push(article)
 localStorage.setItem('articles', JSON.stringify(articles))
}

// Mostrar artículos almacenados
function displayArticles() {
 articlesContainer.innerHTML = ''
 let articles = localStorage.getItem('articles')
 if (articles === null) {
  return
 }

 articles = JSON.parse(articles)

 articles.forEach(function (article) {
  const articleElement = document.createElement('article')
  articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.content}</p>
            <img src="${article.image}" alt="${article.title}">
        `
  articlesContainer.appendChild(articleElement)
 })
}

// Cargar los artículos al inicio
document.addEventListener('DOMContentLoaded', displayArticles)
