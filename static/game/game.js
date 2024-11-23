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
            <img src="../game/img/man_1.png" alt="" style="height: 700px; position: relative; top:100px; left: 500px">
            <img src="../game/img/Rectangle0.png" alt="" style="height: 300px; position: relative; bottom:400px; left:400px">
            <div class="animated-text-container">
                <div class="animated-text"><p>Привет, я процесс менеджер Паша.</p>
                    <p>Это ты менеджер по найму?</p></div>
            </div>
        `;

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

        // Добавляем кнопку "Далее" после окончания анимации
        const animatedText = document.body.querySelector('.animated-text');
        animatedText.addEventListener('animationend', function () {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Далее';
            nextButton.style.fontSize = '50px';
            nextButton.style.width = '400px';
            nextButton.style.position = 'relative';
            nextButton.style.top = '-100px';
            nextButton.style.left = '1300px'; // Под картинкой Rectangle0
            gameMenu.appendChild(nextButton);

            nextButton.onclick = function () {
                // Удаляем текущее меню игры
                gameMenu.style.display = 'none';

                // Создаем новое меню игры
                const newGameMenu = document.createElement('div');
                newGameMenu.className = 'game-menu';
                newGameMenu.innerHTML = `
            <img src="../game/img/man_1.png" alt="" style="height: 700px; position: relative; top:100px; left: 500px">
            <img src="../game/img/Rectangle0.png" alt="" style="height: 300px; position: relative; bottom:400px; left:450px">
            <div class="animated-text-container">
                <div class="animated-text"><p>Отлично, ты должен помочь мне спасти </p>
                 <p>мой бизнес, от меня уже отвернулись все инвесторы,</p>
                  <p>я несу большой убыток...</p></div>
            </div>
        `;
                document.body.appendChild(newGameMenu);
                document.body.style.backgroundImage = 'url("../game/img/img.png")';
                document.body.style.position = 'absolute';
                document.body.style.width = '100%';
                document.body.style.height = '100%';

                // Стилизуем новое меню игры, чтобы оно соответствовало стилю gameMenu
                newGameMenu.style.position = 'relative';
                newGameMenu.style.width = '100%';
                newGameMenu.style.height = '800px';
                newGameMenu.style.borderRadius = '8px';
            }
        });
    }

    const nextButton_1 = document.createElement('button');
    nextButton_1.onclick = function () {

            newGameMenu.document.style.display = 'none';

        const newGameMenu_1 = document.createElement('div');
                newGameMenu_1.className = 'game-menu';
                newGameMenu_1.innerHTML = `<img src="../game/img/man_1.png" alt="" style="height: 700px; position: relative; top:100px; left: 500px">
            <img src="../game/img/Rectangle0.png" alt="" style="height: 300px; position: relative; bottom:400px; left:450px">
            <div class="animated-text-container">
                <div class="animated-text"><p>Отлично, ты должен помочь мне спасти </p>
                 <p>уллулулулу</p>
                  <p>я несу большой убыток...</p></div>
             </div>
        `;
                document.body.appendChild(newGameMenu_1);
                document.body.style.backgroundImage = 'url("../game/img/img.png")';
                document.body.style.position = 'absolute';
                document.body.style.width = '100%';
                document.body.style.height = '100%';

                // Стилизуем новое меню игры, чтобы оно соответствовало стилю gameMenu
                newGameMenu_1.style.position = 'relative';
                newGameMenu_1.style.width = '100%';
                newGameMenu_1.style.height = '800px';
                newGameMenu_1.style.borderRadius = '8px';
            }
        });
    }