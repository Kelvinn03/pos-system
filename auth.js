// Authentication System JavaScript
class AuthSystem {
    constructor() {
        this.currentStep = 'email'; // email, question, answer, newPassword
        this.userData = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStoredUsers();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
            this.setupPasswordValidation();
        }

        // Forgot password form
        const forgotForm = document.getElementById('forgotPasswordForm');
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
        }

        // Password strength indicator
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', () => this.checkPasswordStrength());
        }
    }

    loadStoredUsers() {
        const users = localStorage.getItem('posUsers');
        this.users = users ? JSON.parse(users) : [];
    }

    saveUsers() {
        localStorage.setItem('posUsers', JSON.stringify(this.users));
    }

    handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rememberMe = document.getElementById('rememberMe').checked;

        const user = this.users.find(u => 
            (u.email === email || u.username === email) && u.password === password
        );

        if (user) {
            // Store session
            const sessionData = {
                userId: user.id,
                email: user.email,
                fullName: user.fullName,
                loginTime: new Date().toISOString()
            };

            if (rememberMe) {
                localStorage.setItem('posSession', JSON.stringify(sessionData));
            } else {
                sessionStorage.setItem('posSession', JSON.stringify(sessionData));
            }

            this.showMessage('Login berhasil!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            this.showMessage('Email/username atau password salah!', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const userData = {
            id: Date.now(),
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            birthDate: formData.get('birthDate'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            securityQuestion: formData.get('securityQuestion'),
            securityAnswer: formData.get('securityAnswer'),
            agreeTerms: document.getElementById('agreeTerms').checked
        };

        // Validation
        if (!this.validateRegistration(userData)) {
            return;
        }

        // Check if user already exists
        if (this.users.find(u => u.email === userData.email)) {
            this.showMessage('Email sudah terdaftar!', 'error');
            return;
        }

        // Add user
        this.users.push({
            id: userData.id,
            fullName: userData.fullName,
            email: userData.email,
            birthDate: userData.birthDate,
            password: userData.password,
            securityQuestion: userData.securityQuestion,
            securityAnswer: userData.securityAnswer,
            createdAt: new Date().toISOString()
        });

        this.saveUsers();
        this.showMessage('Registrasi berhasil! Silakan login.', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }

    validateRegistration(userData) {
        // Check required fields
        if (!userData.fullName || !userData.email || !userData.password || 
            !userData.securityQuestion || !userData.securityAnswer) {
            this.showMessage('Semua field harus diisi!', 'error');
            return false;
        }

        // Check password match
        if (userData.password !== userData.confirmPassword) {
            this.showMessage('Password dan konfirmasi password tidak cocok!', 'error');
            return false;
        }

        // Check password strength
        if (!this.isPasswordStrong(userData.password)) {
            this.showMessage('Password harus minimal 8 karakter dengan kombinasi huruf, angka, dan simbol!', 'error');
            return false;
        }

        // Check terms agreement
        if (!userData.agreeTerms) {
            this.showMessage('Anda harus menyetujui syarat dan ketentuan!', 'error');
            return false;
        }

        return true;
    }

    handleForgotPassword(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');

        if (this.currentStep === 'email') {
            const user = this.users.find(u => u.email === email);
            if (user) {
                this.userData = user;
                this.showSecurityQuestion(user);
            } else {
                this.showMessage('Email tidak ditemukan!', 'error');
            }
        } else if (this.currentStep === 'answer') {
            const answer = formData.get('securityAnswer');
            if (answer.toLowerCase() === this.userData.securityAnswer.toLowerCase()) {
                this.showNewPasswordForm();
            } else {
                this.showMessage('Jawaban keamanan salah!', 'error');
            }
        } else if (this.currentStep === 'newPassword') {
            const newPassword = formData.get('newPassword');
            const confirmPassword = formData.get('confirmNewPassword');
            
            if (newPassword !== confirmPassword) {
                this.showMessage('Password dan konfirmasi password tidak cocok!', 'error');
                return;
            }

            if (!this.isPasswordStrong(newPassword)) {
                this.showMessage('Password harus minimal 8 karakter dengan kombinasi huruf, angka, dan simbol!', 'error');
                return;
            }

            // Update password
            const userIndex = this.users.findIndex(u => u.id === this.userData.id);
            if (userIndex !== -1) {
                this.users[userIndex].password = newPassword;
                this.saveUsers();
                this.showMessage('Password berhasil diubah! Silakan login.', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        }
    }

    showSecurityQuestion(user) {
        this.currentStep = 'answer';
        document.getElementById('securityQuestionGroup').style.display = 'block';
        document.getElementById('securityAnswerGroup').style.display = 'block';
        document.getElementById('securityQuestion').value = this.getSecurityQuestionText(user.securityQuestion);
        document.getElementById('submitBtn').innerHTML = '<i class="fas fa-check"></i> Verifikasi Jawaban';
    }

    showNewPasswordForm() {
        this.currentStep = 'newPassword';
        document.getElementById('newPasswordGroup').style.display = 'block';
        document.getElementById('confirmNewPasswordGroup').style.display = 'block';
        document.getElementById('submitBtn').innerHTML = '<i class="fas fa-save"></i> Simpan Password Baru';
    }

    getSecurityQuestionText(questionKey) {
        const questions = {
            'pet': 'Apa nama hewan peliharaan pertama Anda?',
            'school': 'Di sekolah mana Anda bersekolah di SD?',
            'city': 'Di kota mana Anda dilahirkan?',
            'food': 'Makanan favorit Anda adalah?',
            'color': 'Warna favorit Anda adalah?'
        };
        return questions[questionKey] || questionKey;
    }

    setupPasswordValidation() {
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirmPassword');
        
        if (confirmInput) {
            confirmInput.addEventListener('input', () => {
                const password = passwordInput.value;
                const confirm = confirmInput.value;
                
                if (confirm && password !== confirm) {
                    confirmInput.setCustomValidity('Password tidak cocok');
                } else {
                    confirmInput.setCustomValidity('');
                }
            });
        }
    }

    checkPasswordStrength() {
        const password = document.getElementById('password').value;
        const strengthDiv = document.getElementById('passwordStrength');
        
        if (!strengthDiv) return;

        const strength = this.calculatePasswordStrength(password);
        strengthDiv.innerHTML = this.getPasswordStrengthHTML(strength);
    }

    calculatePasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        return score;
    }

    getPasswordStrengthHTML(strength) {
        const levels = ['Sangat Lemah', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'];
        const colors = ['#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#2f855a'];
        
        return `
            <div class="strength-bar">
                <div class="strength-fill" style="width: ${(strength / 5) * 100}%; background-color: ${colors[strength - 1] || '#e53e3e'}"></div>
            </div>
            <span class="strength-text" style="color: ${colors[strength - 1] || '#e53e3e'}">${levels[strength - 1] || 'Sangat Lemah'}</span>
        `;
    }

    isPasswordStrong(password) {
        return this.calculatePasswordStrength(password) >= 3;
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;

        const form = document.querySelector('.auth-form');
        form.insertBefore(messageDiv, form.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Utility functions
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Initialize authentication system
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});

// Check if user is already logged in
function checkAuth() {
    const session = localStorage.getItem('posSession') || sessionStorage.getItem('posSession');
    if (session && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    } else if (!session && !window.location.pathname.includes('login.html') && 
               !window.location.pathname.includes('register.html') && 
               !window.location.pathname.includes('forgot-password.html')) {
        window.location.href = 'login.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('posSession');
    sessionStorage.removeItem('posSession');
    window.location.href = 'login.html';
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', checkAuth);
