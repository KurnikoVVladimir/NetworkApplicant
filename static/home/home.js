document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById('registrationForm');
    const errorMessage = document.getElementById('error-message');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;


        const data = {
            login: login,
            password: password
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
                    window.location.href = '#';
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
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.querySelector('.close');

    openModalBtn.onclick = function () {
        modal.style.display = 'block';
    }

    closeModalBtn.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Форма отправлена!');
        modal.style.display = 'none';

    });
});
