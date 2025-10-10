// Authentication System JavaScript
class AuthSystem {
    constructor() {
        this.currentStep = 'email';
        this.userData = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStoredUsers();
        this.ensureDemoUser();
    }

    ensureDemoUser() {
        if (this.users.length === 0) {
            this.users.push({
                id: 1,
                fullName: 'Demo User',
                email: 'demo@possystem.com',
                birthDate: '1990-01-01',
                password: 'demo123',
                securityQuestion: 'color',
                securityAnswer: 'blue',
                createdAt: new Date().toISOString()
            });
            this.saveUsers();
        }
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
            this.setupPasswordValidation();
        }

        const forgotForm = document.getElementById('forgotPasswordForm');
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
        }

        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', () => this.checkPasswordStrength());
        }

        this.setupPasswordToggles();
    }

    setupPasswordToggles() {
        const toggleButtons = document.querySelectorAll('.toggle-password');
        toggleButtons.forEach(button => {
            button.style.display = 'flex';
            button.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const icon = this.querySelector('i');
                
                if (input && input.tagName === 'INPUT') {
                    if (input.type === 'password') {
                        input.type = 'text';
                        icon.className = 'fas fa-eye-slash';
                    } else {
                        input.type = 'password';
                        icon.className = 'fas fa-eye';
                    }
                }
            });
        });
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
        const rememberMe = document.getElementById('rememberMe')?.checked || false;

        const user = this.users.find(u => 
            (u.email === email || u.username === email) && u.password === password
        );

        if (user) {
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
                window.location.href = '/dashboard.html';
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

        if (!this.validateRegistration(userData)) {
            return;
        }

        if (this.users.find(u => u.email === userData.email)) {
            this.showMessage('Email sudah terdaftar!', 'error');
            return;
        }

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
            window.location.href = '/login.html';
        }, 2000);
    }

    validateRegistration(userData) {
        if (!userData.fullName || !userData.email || !userData.password || 
            !userData.securityQuestion || !userData.securityAnswer) {
            this.showMessage('Semua field harus diisi!', 'error');
            return false;
        }

        if (userData.password !== userData.confirmPassword) {
            this.showMessage('Password dan konfirmasi password tidak cocok!', 'error');
            return false;
        }

        if (!this.isPasswordStrong(userData.password)) {
            this.showMessage('Password harus minimal 8 karakter dengan kombinasi huruf, angka, dan simbol!', 'error');
            return false;
        }

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

            const userIndex = this.users.findIndex(u => u.id === this.userData.id);
            if (userIndex !== -1) {
                this.users[userIndex].password = newPassword;
                this.saveUsers();
                this.showMessage('Password berhasil diubah! Silakan login.', 'success');
                setTimeout(() => {
                    window.location.href = '/login.html';
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

        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

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

document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});

function checkAuth() {
    const urlAuthDisabled = new URLSearchParams(window.location.search).get('authDisabled') === 'true';
    const authDisabled = (window.AUTH_DISABLED === true) || (localStorage.getItem('authDisabled') === 'true') || urlAuthDisabled;
    if (authDisabled) {
        return;
    }
    const session = localStorage.getItem('posSession') || sessionStorage.getItem('posSession');
    if (session && window.location.pathname.includes('login.html')) {
        window.location.href = '/dashboard.html';
    } else if (!session && !window.location.pathname.includes('login.html') && 
               !window.location.pathname.includes('register.html') && 
               !window.location.pathname.includes('forgot-password.html')) {
        window.location.href = '/login.html';
    }
}

function logout() {
    localStorage.removeItem('posSession');
    sessionStorage.removeItem('posSession');
    window.location.href = '/login.html';
}

document.addEventListener('DOMContentLoaded', checkAuth);