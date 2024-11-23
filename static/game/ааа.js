async function sendAnswer(question, answer) {
    const url = 'http://26.244.144.230:8000/api/quiz/answer/';
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = new URLSearchParams({
        question: question,
        answer: answer
    }).toString();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

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

                const animatedTextNew = newGameMenu.querySelector('.animated-text');
                animatedTextNew.addEventListener('animationend', function () {
                    const nextButtonNew = document.createElement('button');
                    nextButtonNew.textContent = 'Далее';
                    nextButtonNew.style.fontSize = '50px';
                    nextButtonNew.style.width = '400px';
                    nextButtonNew.style.position = 'relative';
                    nextButtonNew.style.top = '-160px';
                    nextButtonNew.style.left = '1300px'; // Под картинкой Rectangle0
                    newGameMenu.appendChild(nextButtonNew);

                    nextButtonNew.onclick = function () {
                        // Удаляем текущее меню игры
                        newGameMenu.style.display = 'none';

                        // Создаем новое меню игры
                        const newGameMenu_1 = document.createElement('div');
                        newGameMenu_1.className = 'game-menu';
                        newGameMenu_1.innerHTML = `
                            <img src="../game/img/man_1.png" alt="" style="height: 700px; position: relative; top:100px; left: 500px">
                            <img src="../game/img/Rectangle0.png" alt="" style="height: 300px; position: relative; bottom:400px; left:450px">
                            <div class="animated-text-container">
                                <div class="animated-text"><p>Мы должны вернуть доверие клиентов,</p>
                                 <p>ознакомься с ситуацией.</p>
                                  </div>
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

                        // Добавляем кнопку "Далее" после окончания анимации
                        const animatedTextNew_1 = newGameMenu_1.querySelector('.animated-text');
                        animatedTextNew_1.addEventListener('animationend', function () {
                            const buttonToFirstLvl = document.createElement('button');
                            buttonToFirstLvl.textContent = 'Далее';
                            buttonToFirstLvl.style.fontSize = '50px';
                            buttonToFirstLvl.style.width = '400px';
                            buttonToFirstLvl.style.position = 'relative';
                            buttonToFirstLvl.style.top = '-160px';
                            buttonToFirstLvl.style.left = '1300px'; // Под картинкой Rectangle0
                            newGameMenu_1.appendChild(buttonToFirstLvl);

                            buttonToFirstLvl.onclick = function () {
                                // Удаляем текущее меню игры
                                newGameMenu_1.style.display = 'none';

                                // Создаем новое меню игры
                                const firstLevelMenu = document.createElement('div');
                                firstLevelMenu.className = 'first-lvl-menu';
                                firstLevelMenu.innerHTML = `
                                    <div class="info-container" style="box-shadow: 0 4px 8px rgba(44, 43, 43, 0.62); background: rgba(61,61,61,0.65);">
                                        <div class="info-text" style="width: 900px; font-size: xx-large">
                                            Вначале вам предстоит помочь Павлу в продвижении и популяризации его бизнеса.
                                            В наше время лицевым двигателем бизнеса является реклама, вам представлены 3 графика
                                            зависимости прироста клиентов и затрат на рекламу, проанализируйте их и выберите
                                            какой метод лучшее всего подойдет для Павла
                                        </div>
                                        <button id="radioButton" style="width: 400px; position: relative;top:150px">Радио</button>
                                        <button id="internetButton" style="width: 400px; position: relative;top:150px">Интернет</button>
                                        <button id="tvButton" style="width: 400px; position: relative;top:150px">Телевидение</button>
                                    </div>
                                `;
                                document.body.appendChild(firstLevelMenu);
                                document.body.style.backgroundImage = 'url("../game/img/img_5.png")';
                                document.body.style.position = 'absolute';
                                document.body.style.width = '100%';
                                document.body.style.height = '100%';

                                // Стилизуем новое меню игры, чтобы оно соответствовало стилю gameMenu
                                firstLevelMenu.style.position = 'relative';
                                firstLevelMenu.style.width = '100%';
                                firstLevelMenu.style.height = '800px';
                                firstLevelMenu.style.borderRadius = '8px';

                                // Добавляем обработчики событий для кнопок
                                const radioButton = firstLevelMenu.querySelector('#radioButton');
                                const internetButton = firstLevelMenu.querySelector('#internetButton');
                                const tvButton = firstLevelMenu.querySelector('#tvButton');
                                const infoText = firstLevelMenu.querySelector('.info-text');

                                radioButton.onclick = function () {
                                    sendAnswer('1', '1');
                                    infoText.textContent = 'В радио Павлу было бы не выгодно вкладываться, хоть она и является самой дешевой, но в наше время радио не пользуется особой популярностью, из-за чего это не рациональный выбор для Павла.';
                                }

                                internetButton.onclick = function () {
                                    sendAnswer('1', '2');
                                    infoText.textContent = 'Интернет-реклама — это оптимальный выбор для Павла, так как она позволяет точно настроить целевую аудиторию и отслеживать результаты рекламных кампаний.';
                                }

                                tvButton.onclick = function () {
                                    sendAnswer('1', '3');
                                    infoText.textContent = 'Телевидение — это дорогой и малоэффективный способ рекламы для Павла, так как он не может точно контролировать, кто увидит его рекламу.';
                                }
                            }
                        });
                    }
                });
            }
        });
    }
});