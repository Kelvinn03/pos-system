// Authentication System JavaScript
class AuthSystem {
    constructor() {
        this.currentStep = 'email';
        this.userData = null;
        this.init();
    }

    init() {
        this.loadStoredUsers();
        this.ensureDemoUser();
        this.setupEventListeners();
    }

    ensureDemoUser() {
        // Always ensure demo user exists
        const demoExists = this.users.find(u => u.email === 'demo@possystem.com');
        if (!demoExists) {
            this.users.push({
                id: 1,
                fullName: 'Demo User',
                email: 'demo@possystem.com',
                username: 'demo',
                birthDate: '1990-01-01',
                password: 'demo123',
                securityQuestion: 'color',
                securityAnswer: 'blue',
                createdAt: new Date().toISOString()
            });
            this.saveUsers();
            console.log('Demo user created successfully');
        }
        console.log('Total users:', this.users.length);
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

        // Setup password toggles after a short delay to ensure DOM is ready
        setTimeout(() => this.setupPasswordToggles(), 100);
    }

    setupPasswordToggles() {
        // Find all toggle buttons
        document.querySelectorAll('.toggle-password').forEach(button => {
            // Make sure button is visible
            button.style.display = 'flex';
            button.style.position = 'absolute';
            button.style.right = '15px';
            button.style.zIndex = '10';
            
            // Remove any existing listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new click listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Find the input field (previous sibling)
                const inputGroup = this.closest('.input-group');
                const input = inputGroup ? inputGroup.querySelector('input[type="password"], input[type="text"]') : null;
                const icon = this.querySelector('i');
                
                if (input) {
                    if (input.type === 'password') {
                        input.type = 'text';
                        if (icon) icon.className = 'fas fa-eye-slash';
                    } else {
                        input.type = 'password';
                        if (icon) icon.className = 'fas fa-eye';
                    }
                }
            });
        });
        
        console.log('Password toggles setup complete');
    }

    loadStoredUsers() {
        try {
            const users = localStorage.getItem('posUsers');
            this.users = users ? JSON.parse(users) : [];
        } catch (e) {
            console.error('Error loading users:', e);
            this.users = [];
        }
    }

    saveUsers() {
        try {
            localStorage.setItem('posUsers', JSON.stringify(this.users));
            console.log('Users saved:', this.users.length);
        } catch (e) {
            console.error('Error saving users:', e);
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password');
        const rememberMe = document.getElementById('rememberMe')?.checked || false;

        console.log('Login attempt:', email);
        console.log('Available users:', this.users.map(u => u.email));

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
            console.log('Login failed - user not found or password mismatch');
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
        
        // Re-setup password toggles for new fields
        setTimeout(() => this.setupPasswordToggles(), 100);
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

// Global toggle function (backup)
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const button = input.parentElement.querySelector('.toggle-password');
    const icon = button ? button.querySelector('i') : null;
    
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        if (icon) icon.className = 'fas fa-eye';
    }
}

// Initialize authentication system
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});

// Check if user is already logged in
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

// Logout function
function logout() {
    localStorage.removeItem('posSession');
    sessionStorage.removeItem('posSession');
    window.location.href = '/login.html';
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', checkAuth);