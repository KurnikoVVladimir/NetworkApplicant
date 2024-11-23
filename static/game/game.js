document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.querySelector('.close');
    const startGameBtn = document.querySelector('.info-container button');
    const gameMenu = document.createElement('div');
    gameMenu.className = 'game-menu';

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

    startGameBtn.onclick = function () {
        // Скрываем информационный блок
        document.querySelector('.info-container').style.display = 'none';

        // Создаем и добавляем меню игры
        gameMenu.innerHTML = `
            <h2>Выберите направление бизнеса:</h2>
            <button>Производство</button>
            <button>Сервисы</button>
            <button>Торговля</button>
            <button>Инвестиции</button>
        `;

        // Добавляем меню игры в body
        document.body.appendChild(gameMenu);

        // Стилизуем меню игры, чтобы оно соответствовало стилю info-container
        gameMenu.style.position = 'relative';
        gameMenu.style.left ='10px';
        gameMenu.style.width = '100%';
        gameMenu.style.height = '800px';
        gameMenu.style.backgroundColor = 'rgba(158, 215, 178, 0.49)';
        gameMenu.style.borderRadius = '8px';
        gameMenu.style.boxShadow = '0 4px 8px rgba(44, 43, 43, 0.62)';
    }
});