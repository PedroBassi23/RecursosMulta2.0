document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (menuToggle && mainNavUl) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNavUl.classList.toggle('active');

            // Change icon based on state
            const icon = menuToggle.querySelector('i');
            if (mainNavUl.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                menuToggle.setAttribute('aria-label', 'Fechar menu');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
    }

    // Smooth scroll for anchor links & close mobile menu on click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if it's a nav link inside the mobile menu
            if (mainNavUl && mainNavUl.classList.contains('active') && this.closest('.main-nav')) {
                mainNavUl.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }

            // Only prevent default and scroll if it's an actual page anchor
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // (Opcional) Basic form validation feedback - more robust validation should be server-side
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Example: Check if name is filled (you'd add more checks)
            const nameInput = contactForm.querySelector('#nome');
            if (nameInput && nameInput.value.trim() === '') {
                // You could add visual feedback here, like adding a class to the input
                // For now, just a console log and preventing submission for demo
                console.log('Nome é obrigatório.');
                // alert('Por favor, preencha seu nome.'); // Simple alert
                // e.preventDefault(); // Uncomment to prevent submission if validation fails
            }
            // IMPORTANT: Remember to configure your form's 'action' attribute
            // to point to a backend script or service that processes the form data.
            // Example: action="https://formspree.io/f/YOUR_FORM_ID"
            console.log('Formulário enviado (simulação). Configure o backend!');
        });
    }

});