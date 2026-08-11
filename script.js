document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const formData = new FormData(form);

  button.disabled = true;
  button.textContent = 'Sending...';
  status.textContent = '';
  status.className = 'form-status';

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });

    if (!response.ok) throw new Error('Submission failed');

    form.reset();
    status.textContent = 'Thank you! Your message has been received. Nathan will be in touch soon.';
    status.className = 'form-status success';
  } catch (error) {
    status.textContent = 'Something went wrong. Please try again or contact Nathan directly.';
    status.className = 'form-status error';
  } finally {
    button.disabled = false;
    button.textContent = 'Start the Conversation';
  }
});
