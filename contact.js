// Contact Page JavaScript
class ContactPage {
    constructor() {
        this.init();
    }

    init() {
        this.loadUserInfo();
        this.setupEventListeners();
    }

    loadUserInfo() {
        const session = localStorage.getItem('posSession') || sessionStorage.getItem('posSession');
        if (session) {
            const userData = JSON.parse(session);
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = userData.fullName || 'User';
            }
        }
    }

    setupEventListeners() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }
    }

    handleContactForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const contactData = {
            id: Date.now(),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            date: new Date().toISOString(),
            status: 'pending'
        };

        // Save contact message
        const contacts = JSON.parse(localStorage.getItem('posContacts') || '[]');
        contacts.push(contactData);
        localStorage.setItem('posContacts', JSON.stringify(contacts));

        this.showMessage('Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.', 'success');
        e.target.reset();
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.contact-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `contact-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;

        const contactForm = document.getElementById('contactForm');
        contactForm.insertBefore(messageDiv, contactForm.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Initialize Contact Page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contactPage = new ContactPage();
});
