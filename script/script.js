
        // --- 1. SISTEMA DE PARTÍCULAS ---
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particlesArray;

        // Ajustar tamaño del canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Manejar redimensionamiento
        window.addEventListener('resize', function(){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        // Clase Partícula
        class Particle {
            constructor(){
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.directionX = (Math.random() * 0.4) - 0.2; // Velocidad X muy lenta
                this.directionY = (Math.random() * 0.4) - 0.2; // Velocidad Y muy lenta
                this.size = Math.random() * 10; // Tamaño pequeño
                this.color = 'rgba(245, 132, 228, ' + (Math.random() * 0.5 + 0.1) + ')'; // Color Dorado (Gold)
            }
            // Dibujar partícula
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            // Actualizar posición
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        // Inicializar partículas
        function initParticles(){
            particlesArray = [];
            // Cantidad de partículas basada en el tamaño de pantalla
            let numberOfParticles = (canvas.height * canvas.width) / 15000;
            for (let i = 0; i < numberOfParticles; i++){
                particlesArray.push(new Particle());
            }
        }

        // Bucle de animación
        function animateParticles(){
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++){
                particlesArray[i].update();
            }
        }

        // Iniciar sistema
        initParticles();
        animateParticles();


        // --- 2. FUNCIONALIDAD DEL SITIO ---

        // Función WhatsApp
        function contact(service) {
            const phone = "573016848410";
            const msg = `Hola Vivisnails, quisiera agendar cita para: ${service}`;
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
        }

        // Lógica Menú Móvil
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar menú al hacer click en enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-xmark');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });

        // Efecto Luz Glassmorphism en Tarjetas
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            const glow = card.querySelector('.mouse-glow');
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                glow.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
            });
        });

        // --- 3. LOGICA SLIDER AUTOMÁTICO (NUEVO) ---
        
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        const totalSlides = slides.length;
        const slideIntervalTime = 5000; // Cambia cada 5 segundos
        let slideInterval;

        function showSlide(index) {
            // Remover clase activa de todos
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Asegurar loop
            if (index >= totalSlides) currentSlide = 0;
            else if (index < 0) currentSlide = totalSlides - 1;
            else currentSlide = index;

            // Activar actual
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, slideIntervalTime);
        }

        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }

        // Función global para usar en HTML onclick
        window.goToSlide = function(index) {
            showSlide(index);
            resetAutoSlide();
        };

        // Iniciar Slider automático
        startAutoSlide();


        // Iniciar animacion automático

        document.addEventListener("DOMContentLoaded", () => {
        const elements = document.querySelectorAll(".animate-on-scroll");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            const animation = entry.target.dataset.animate || "animate__slideIn";

            if (entry.isIntersecting) {

                // Reiniciar animación
                entry.target.classList.remove("animate__animated", animation);
                void entry.target.offsetWidth;

                // Aplicar animación
                entry.target.classList.add("animate__animated", animation);
                entry.target.style.opacity = 1;

            } else {
                // Ocultar al salir
                entry.target.classList.remove("animate__animated", animation);
                entry.target.style.opacity = 0;
            }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => observer.observe(el));
        });
