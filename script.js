document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (menuToggle && mainNavUl) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNavUl.classList.toggle('active');

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

    document.querySelectorAll('a[href^="#"], a[href^="https://wa.me/"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const isWhatsAppLink = this.getAttribute('href').startsWith('https://wa.me/');
            
            if (mainNavUl && mainNavUl.classList.contains('active') && this.closest('.main-nav')) {
                // Se for um link do menu mobile E NÃO for um link externo (WhatsApp)
                if (!isWhatsAppLink && this.getAttribute('href').startsWith("#")) {
                     // Fecha o menu
                    mainNavUl.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    menuToggle.setAttribute('aria-label', 'Abrir menu');
                } else if (isWhatsAppLink) {
                    // Se for link do WhatsApp no menu mobile, apenas deixa abrir e não fecha o menu
                    // O comportamento padrão do navegador de abrir o link já é suficiente.
                    // Poderia fechar o menu aqui também, se desejado:
                    /*
                    mainNavUl.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    // ... (resto do código para mudar ícone)
                    */
                }
            }

            const targetId = this.getAttribute('href');
            if (!isWhatsAppLink && targetId.length > 1 && targetId.startsWith("#") && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lembre-se de substituir SEU_EMAIL_AQUI no action do formulário no HTML
    // por seu e-mail real para o FormSubmit funcionar.
    const contactForm = document.querySelector('.contact-form-container form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // O FormSubmit cuida da validação básica e do envio.
            // Você pode adicionar validações JS mais complexas aqui se desejar,
            // mas lembre-se que a validação client-side é apenas para UX.
            console.log('Formulário preparado para FormSubmit.');
        });
    }
});
