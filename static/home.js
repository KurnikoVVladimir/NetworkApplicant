document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.querySelector('.close');
    const registrationForm = document.getElementById('registrationForm');
    const errorMessage = document.getElementById('error-message');

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

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        fetch('http://26.244.144.230:8000/api/user/register/', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    modal.style.display = 'none';
                    openModalBtn.style.display = 'none';

                    const logoutButton = document.createElement('button');
                    logoutButton.textContent = 'Выйти';
                    logoutButton.id = 'logoutButton';
                    logoutButton.style.position = 'relative';
                    logoutButton.style.left = '1300px';
                    logoutButton.style.top = '20px';

                    logoutButton.onclick = function () {
                        // Обработка выхода пользователя
                        alert('Выход выполнен!');
                        openModalBtn.style.display = 'block';
                        logoutButton.remove();
                    }

                    document.querySelector('header nav').appendChild(logoutButton);
                } else {
                    // Если регистрация не удалась, показываем сообщение об ошибке
                    errorMessage.textContent = data.message || 'Ошибка регистрации';
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
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
