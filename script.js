//Filtrar paquetes turísticos
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const departmentSelect = document.getElementById('departmentSelect');
  const durationSelect = document.getElementById('durationSelect');
  const packages = document.querySelectorAll('.package');
  const message = document.getElementById('message'); // Contenedor del mensaje
  const resultsContainer = document.getElementById('results'); // Contenedor de resultados

  searchButton.addEventListener('click', () => {
      const selectedDepartment = departmentSelect.value;
      const selectedDuration = durationSelect.value;

      let resultsFound = false; // Variable para rastrear si hay resultados

      packages.forEach(packageItem => {
          const packageDepartment = packageItem.getAttribute('data-department');
          const packageDuration = packageItem.getAttribute('data-duration');

          // Verificar si el paquete coincide con los filtros seleccionados
          if (
              (selectedDepartment === '' || selectedDepartment === packageDepartment) &&
              (selectedDuration === '' || selectedDuration === packageDuration)
          ) {
              packageItem.style.display = 'block'; // Mostrar el paquete
              resultsFound = true; // Marcar que se encontró un resultado
          } else {
              packageItem.style.display = 'none'; // Ocultar el paquete
          }
      });

      // Actualizar el mensaje
      if (resultsFound) {
          message.style.display = 'block';
          message.textContent = '✔ Se encontraron resultados para tu búsqueda.';
          //message.style.color = 'green';
      } else {
          message.style.display = 'block';
          message.textContent = '❌ No se encontraron los elementos de búsqueda.';
          //message.style.color = 'red';
      }

      // Desplazar a la sección de paquetes con espacio superior
      const offset = 240; // Altura del margen superior en píxeles
      const elementPosition = resultsContainer.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
      });
  });
});

//Sincronizar los captions con el carrusel
const carousel = document.querySelector('#carouselExampleAutoplaying');
const captions = document.querySelectorAll('#captions .caption-item');

carousel.addEventListener('slide.bs.carousel', (event) => {
  captions.forEach((caption, index) => {
    if (index === event.to) {
      caption.classList.remove('d-none'); // Mostrar el caption correspondiente
    } else {
      caption.classList.add('d-none'); // Ocultar los demás
    }
  });
}); 

// Selecciona todos los enlaces de navegación
const navLinks = document.querySelectorAll('#menu .nav-link');
const sections = document.querySelectorAll('section'); // Suponiendo que tus secciones están en <section>

// Función para actualizar el enlace activo
function updateActiveLink() {
  let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  sections.forEach((section, index) => {
    if (section.offsetTop <= scrollPosition + 50 && section.offsetTop + section.offsetHeight > scrollPosition) {
      // Remover la clase 'active' de todos los enlaces
      navLinks.forEach(link => link.classList.remove('active'));
      // Agregar la clase 'active' al enlace correspondiente
      navLinks[index].classList.add('active');
    }
  });
}

// Escuchar el evento de scroll para actualizar el enlace activo
window.addEventListener('scroll', updateActiveLink);

// Llamar a la función al cargar la página para establecer el estado inicial
updateActiveLink();

