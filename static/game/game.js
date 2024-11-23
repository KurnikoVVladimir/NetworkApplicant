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
            <img src="../game/img/man_1.png" alt="" style="height: 700px; position: relative; top:100px; left: 300px">
            <img src="../game/img/Rectangle0.png" alt="" style="height: 300px; position: relative; bottom:400px; left: 100px">
        `;
// /* image 5 */
// position: absolute;
// width: 1728px;
// height: 1117px;
// left: 0;
// top: 0;
        // Добавляем меню игры в body
        document.body.appendChild(gameMenu);
        document.body.style.backgroundImage = 'url("../game/img/img.png")';
        document.body.style.position = 'absolute';
        document.body.style.width = '100%';
        document.body.style.height = '100%';


        // Стилизуем меню игры, чтобы оно соответствовало стилю info-container
        gameMenu.style.position = 'relative';
        gameMenu.style.width = '100%';
        gameMenu.style.height = '800px';
        gameMenu.style.borderRadius = '8px';
    }
});