// document.addEventListener("DOMContentLoaded", function () {
//
//     const userLogin = localStorage.getItem('userLogin');
//     const userLoginElement = document.getElementById('user-login');
//     const userRoleElement = document.getElementById('user-role');
//
//     if (userLogin) {
//         userLoginElement.textContent = userLogin;
//
//         fetch('http://26.244.144.230:8000/api/user/me/', {
//             method: 'GET',
//             headers: {
//                 'accept': 'application/json',
//                 'Authorization': `Bearer ${userLogin}`
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.login && data.role) {
//                     userRoleElement.textContent = data.role;
//                 } else {
//                     console.error('Ошибка получения данных пользователя:', data.detail);
//                 }
//             })
//             .catch((error) => {
//                 console.error('Ошибка получения данных пользователя:', error);
//             });
//     } else {
//         console.error('Логин пользователя не найден в локальном хранилище');
//     }
// })
// ;
// Get button, modal, and overlay elements
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
        // Здесь можно добавить логику для обработки данных формы
        alert('Форма отправлена!');
        modal.style.display = 'none';
    });
});