document.addEventListener("DOMContentLoaded", function() {
    const image = document.querySelector('.fade-in');
    image.style.opacity = 1;
});

document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById('registrationForm');
    const errorMessage = document.getElementById('error-message');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const status = document.querySelector('input[name="status"]:checked').value;

        const data = {
            login: login,
            password: password,
            role: status === 'student' ? 'Студент' : 'Абитуриент'
        };

        fetch('http://26.244.144.230:8000/api/user/register/', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.login) {
                // Записываем логин в локальное хранилище
                localStorage.setItem('userLogin', data.login);
                console.log('Успешная регистрация:', data);
                // Перенаправляем пользователя на /home
                window.location.href = '/home';
            } else {
                // Отображаем сообщение об ошибке
                errorMessage.textContent = data.detail;
            }
        })
        .catch((error) => {
            console.error('Ошибка регистрации:', error);
            // Отображаем сообщение об ошибке
            errorMessage.textContent = 'Произошла ошибка при регистрации';
        });
    });
});