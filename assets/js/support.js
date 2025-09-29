// Support Center JavaScript
class SupportCenter {
    constructor() {
        this.init();
    }

    init() {
        this.loadUserInfo();
        this.setupEventListeners();
        this.setupFAQ();
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
        const supportForm = document.getElementById('supportForm');
        if (supportForm) {
            supportForm.addEventListener('submit', (e) => this.handleSupportForm(e));
        }

        const feedbackForm = document.getElementById('feedbackForm');
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', (e) => this.handleFeedbackForm(e));
        }
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-answer').style.display = 'none';
                        otherItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle current item
                if (isOpen) {
                    answer.style.display = 'none';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    answer.style.display = 'block';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    handleSupportForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const supportData = {
            id: Date.now(),
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            priority: formData.get('priority'),
            message: formData.get('message'),
            date: new Date().toISOString(),
            status: 'open'
        };

        // Save support ticket
        const tickets = JSON.parse(localStorage.getItem('posSupportTickets') || '[]');
        tickets.push(supportData);
        localStorage.setItem('posSupportTickets', JSON.stringify(tickets));

        this.showMessage('Tiket support berhasil dibuat! Tim kami akan segera menangani permintaan Anda.', 'success');
        e.target.reset();
    }

    handleFeedbackForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const feedbackData = {
            id: Date.now(),
            rating: formData.get('rating'),
            category: formData.get('category'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };

        // Save feedback
        const feedbacks = JSON.parse(localStorage.getItem('posFeedbacks') || '[]');
        feedbacks.push(feedbackData);
        localStorage.setItem('posFeedbacks', JSON.stringify(feedbacks));

        this.showMessage('Feedback berhasil dikirim! Terima kasih atas masukan Anda.', 'success');
        e.target.reset();
        
        // Reset rating stars
        document.querySelectorAll('input[name="rating"]').forEach(radio => {
            radio.checked = false;
        });
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.support-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `support-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;

        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(messageDiv, mainContent.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Initialize Support Center when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.supportCenter = new SupportCenter();
});
