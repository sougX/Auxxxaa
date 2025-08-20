// Función para ocultar la barra de direcciones en dispositivos móviles
function hideAddressBar() {
    if(!window.location.hash) {
        if(document.height < window.outerHeight) {
            document.body.style.height = (window.outerHeight + 50) + 'px';
        }
        setTimeout(function() {
            window.scrollTo(0, 1);
        }, 50);
    }
}

// Ejecutar al cargar y al cambiar orientación
window.addEventListener('load', hideAddressBar);
window.addEventListener('orientationchange', hideAddressBar);

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay una sesión activa
    const isLoggedIn = sessionStorage.getItem('shrineLoggedIn');
    
    if (isLoggedIn === 'true') {
        // Si ya está autenticado, mostrar el contenido principal
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }
    
    // Funcionalidad de login
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    
    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (username === 'sougx' && password === '127113') {
            // Credenciales correctas, guardar sesión y mostrar contenido
            sessionStorage.setItem('shrineLoggedIn', 'true');
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
        } else {
            // Credenciales incorrectas, mostrar mensaje de error
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
            errorMessage.style.display = 'block';
            
            // Limpiar el mensaje de error después de 3 segundos
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });
    
    // Permitir login con Enter en los campos de texto
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
    
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });
    
    // La funcionalidad de cierre de sesión ha sido eliminada
    
    // Funcionalidad para los checkboxes
    const checkboxes = document.querySelectorAll('.checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
            if (this.classList.contains('checked')) {
                this.style.backgroundColor = '#8A2BE2'; // Color morado
                // Añadir flecha de verificación blanca
                if (!this.querySelector('.check-arrow')) {
                    const checkArrow = document.createElement('div');
                    checkArrow.className = 'check-arrow';
                    
                    // Crear imagen SVG de flecha de verificación
                    const svgCheck = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svgCheck.setAttribute('width', '16');
                    svgCheck.setAttribute('height', '16');
                    svgCheck.setAttribute('viewBox', '0 0 24 24');
                    
                    // Crear el path de la flecha de verificación
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z');
                    path.setAttribute('fill', '#ffffff');
                    
                    // Añadir el path al SVG
                    svgCheck.appendChild(path);
                    
                    // Añadir el SVG al contenedor
                    checkArrow.appendChild(svgCheck);
                    
                    checkArrow.style.position = 'absolute';
                    checkArrow.style.top = '50%';
                    checkArrow.style.left = '50%';
                    checkArrow.style.transform = 'translate(-50%, -50%)';
                    
                    this.appendChild(checkArrow);
                }
            } else {
                this.style.backgroundColor = 'transparent';
                // Eliminar flecha blanca
                const arrow = this.querySelector('.check-arrow');
                if (arrow) {
                    this.removeChild(arrow);
                }
                // También eliminar el logo de Drive si existe (para compatibilidad)
                const driveLogo = this.querySelector('.drive-logo');
                if (driveLogo) {
                    this.removeChild(driveLogo);
                }
            }
        });
    });

    // Funcionalidad para los radio buttons
    const radios = document.querySelectorAll('.radio');
    
    radios.forEach(radio => {
        radio.addEventListener('click', function() {
            // Desmarcar todos los radios
            radios.forEach(r => {
                r.classList.remove('selected');
            });
            
            // Marcar el radio actual
            this.classList.add('selected');
        });
    });

    // Funcionalidad para el slider
    const slider = document.querySelector('input[type="range"]');
    const sliderValue = document.querySelector('.slider span');
    
    slider.addEventListener('input', function() {
        sliderValue.textContent = `Fov ${this.value}`;
    });

    // Funcionalidad para el dropdown
    const dropdown = document.querySelector('.dropdown');
    
    dropdown.addEventListener('change', function() {
        console.log('Opción seleccionada:', this.value);
    });

    // Funcionalidad para el botón de inyectar
    const injectButton = document.querySelector('.button');
    
    // Funcionalidad para las pestañas
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.content');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Desactivar todas las pestañas
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.backgroundColor = '#8A2BE2'; // Restaurar color morado
                t.style.color = 'white';
            });
            
            // Activar la pestaña actual
            tab.classList.add('active');
            tab.style.backgroundColor = 'white'; // Cambiar a blanco cuando está activo
            tab.style.color = '#333';
            
            // Ocultar todos los contenidos
            contents.forEach(c => c.style.display = 'none');
            
            // Mostrar el contenido actual
            contents[index].style.display = 'block';
        });
    });
    
    // Inicializar la primera pestaña como activa
    if (tabs.length > 0) {
        tabs[0].click();
    }
});