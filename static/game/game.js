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
                                            какой метод лучшее всего подойдет для Павла, если его бюджет на рекламу составляет 40 - 80 тысяч рублей?
                                        </div>
                                        <div class="card-container">
                                            <img src="../game/img/radio.PNG" alt="" style="width: 500px; height:261px; position: relative; top: 70px; left:50px">
                                            <button id="radioButton" style="width: 400px; position: relative;bottom:-150px; left:-410px">Радио</button>
                                        </div>
                                        <div class="card-container">
                                            <img src="../game/img/Inet.PNG" alt="" style="width: 500px; height:261px; position: relative;bottom: 229px; left:600px">
                                            <button id="internetButton" style="width: 400px; position: relative;bottom:150px; right:-140px">Интернет</button>
                                        </div>
                                        <div class="card-container">
                                            <img src="../game/img/tv.PNG" alt="" style="width: 500px; height:261px; position: relative; bottom: 529px; left:1150px">
                                            <button id="tvButton" style="width: 400px; position: relative; bottom:450px; right:-690px">Телевидение</button>
                                        </div>
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
                                                    infoText.textContent = 'В радио Павлу было бы невыгодно вкладываться, хоть она и является самой дешевой, но в наше время радио не пользуется особой популярностью, из-за чего это нерациональный выбор для Павла.  Подумайте ещё над вопросом и внимательно проанализируйте графики';
                                                }

                                                tvButton.onclick = function () {
                                                    sendAnswer('1', '3');
                                                    infoText.textContent = 'Телевидение охватывает, не самое большое кол-во людей и стоит дороже конкурентов.  Подумайте ещё над вопросом и внимательно проанализируйте графики';
                                                }

                                                internetButton.onclick = function () {
                                                    sendAnswer('1', '2');
                                                    infoText.textContent = 'И это абсолютно верно, так как в наше время интернет прибрел огромные масштабы, и реклама в таких местах как различные соц сети или видео хостинги принесет Павлу намного больший прирост клиентов хоть и потребует средних затрат';

                                                    const buttonToSecondLvl = document.createElement('button');
                                                    buttonToSecondLvl.textContent = 'Далее';
                                                    buttonToSecondLvl.style.fontSize = '50px';
                                                    buttonToSecondLvl.style.width = '400px';
                                                    buttonToSecondLvl.style.position = 'relative';
                                                    buttonToSecondLvl.style.top = '-120px';
                                                    buttonToSecondLvl.style.left = '1315px';
                                                    firstLevelMenu.appendChild(buttonToSecondLvl);

                                                    buttonToSecondLvl.onclick = function () {
                                                        // Удаляем текущее меню игры
                                                        firstLevelMenu.style.display = 'none';

                                                        // Создаем новое меню игры
                                                        const secondLevelMenu = document.createElement('div');
                                                        secondLevelMenu.className = 'second-lvl-menu';
                                                        secondLevelMenu.innerHTML = `
                                                        <div class="info-container" style="box-shadow: 0 4px 8px rgba(44, 43, 43, 0.62); background: rgba(61,61,61,0.65);">
                                                            <div class="info-text" style="width: 900px; font-size: xx-large">
                                                                Анализируя работников, Павел заметил что один из сотрудников,
                                                                а точнее аналитик финансовых данных Сергей, приносит его компании огромные убытки,
                                                                он постоянно опаздывает на работу, а на самой работе спит, и его знания в финансовой
                                                                аналитике не превышают средних. Павел принял решение его уволить, и ваша задача помочь
                                                                Павлу выбрать достойную замену Сергея. На выбор вам представлены 3 кандидата, проанализируйте
                                                                резюме каждого и выберите кого Павлу будет выгоднее нанять на работу.
                                                            </div>
                                                            <div class="card-container">
                                                                <div class = "info-text" style="font-size: 30px; width: 500px; height:261px; position: relative; top: 70px; left:50px"> Производительность: 50%
                                                                                                                                                 Требуемый доход: 25 Т.Р. в месяц
                                                                                                                                                 Знание в финансовой аналитике: Средние
                                                                                                                                                 Качество:”Хорошее чувство юмора, но отсутствует дисциплина”
                                                                                                                                                 </div>
                                                                <button id="maksButton" style="width: 400px; position: relative;bottom:-50px; left: 90px">Максим Алексеевич</button>
                                                            </div>
                                                            <div class="card-container">
                                                                <div class = "info-text" style="font-size: 30px; width: 500px; height:261px; position: relative;top: -265px; left:600px"> Производительность: 70%
                                                                                                                                                     Требуемый доход: 35 Т.Р. в месяц
                                                                                                                                                     Знание в финансовой аналитике: Выше среднего
                                                                                                                                                     Качество:”Хороший и работящий, но имеет страх публики” </div>   
                                                                <button id="timaButton" style="width: 400px; position: relative;bottom:280px; right:-640px">Тимофей Юрьевич</button>
                                                            </div>
                                                            <div class="card-container">
                                                                <div class = "info-text" style="font-size: 30px; width: 500px; height:261px; position: relative; top: -605px; left:1150px">Производительность: 75%
                                                                                                                                                      Требуемый доход: 37 Т.Р. в месяц
                                                                                                                                                      Знание в финансовой аналитике: Отличное
                                                                                                                                                      Качество:”Умный и общительный, но выпевает все кофе на работе”
                                                                                                                                                       </div> 
                                                                <button id="vovaButton" style="width: 400px; position: relative; bottom:620px; right:-1210px">Владимер Евгениевич</button>
                                                            </div>
                                                        </div>
                                                    `;

                                                        document.body.appendChild(secondLevelMenu);
                                                        document.body.style.backgroundImage = 'url("../game/img/gff.png")';
                                                        document.body.style.position = 'absolute';
                                                        document.body.style.width = '100%';
                                                        document.body.style.height = '100%';

                                                        // Стилизуем новое меню игры, чтобы оно соответствовало стилю gameMenu
                                                        secondLevelMenu.style.position = 'relative';
                                                        secondLevelMenu.style.width = '100%';
                                                        secondLevelMenu.style.height = '800px';
                                                        secondLevelMenu.style.borderRadius = '8px';

                                                        const maksButton = secondLevelMenu.querySelector('#maksButton');
                                                        const timaButton = secondLevelMenu.querySelector('#timaButton');
                                                        const vovaButton = secondLevelMenu.querySelector('#vovaButton');
                                                        const infoText = secondLevelMenu.querySelector('.info-text');

                                                        maksButton.onclick = function () {
                                                            sendAnswer('2', '1');
                                                            infoText.textContent = 'Не правильный выбор, есть более хороший кандидат';
                                                        }
                                                        timaButton.onclick = function () {
                                                            sendAnswer('2', '2');
                                                            infoText.textContent = 'Не правильный выбор, есть более хороший кандидат';
                                                        }
                                                        vovaButton.onclick = function () {
                                                            sendAnswer('2', '3');
                                                            infoText.textContent = 'Владимир хоть и требует самую большую зарплату,' +
                                                                ' но является самым качественным в исполнении и не имеет черт мешающих его работе,' +
                                                                ' из за чего он поможет достичь успеха компании Павла намного сильнее чем остальные кандидаты.';

                                                            const buttonToThirdLvl = document.createElement('button');
                                                            buttonToThirdLvl.textContent = 'Далее';
                                                            buttonToThirdLvl.style.fontSize = '50px';
                                                            buttonToThirdLvl.style.width = '400px';
                                                            buttonToThirdLvl.style.position = 'relative';
                                                            buttonToThirdLvl.style.top = '-120px';
                                                            buttonToThirdLvl.style.left = '1335px';
                                                            secondLevelMenu.appendChild(buttonToThirdLvl);

                                                            buttonToThirdLvl.onclick = function () {
                                                                // Удаляем текущее меню игры
                                                                secondLevelMenu.style.display = 'none';

                                                                const thirdLevelMenu = document.createElement('div');
                                                                thirdLevelMenu.className = 'third-lvl-menu';
                                                                thirdLevelMenu.innerHTML = `
                                                        <div class="info-container" style="box-shadow: 0 4px 8px rgba(44, 43, 43, 0.62); background: rgba(61,61,61,0.65);">
                                                            <div class="info-text" style="width: 900px; font-size: xx-large">
                                                                В заключение поможем Павлу выбрать наилучшие место для расположения помещение,
                                                                где будет находиться банк. Вам представлены 2 критерия каждого из места: "Стоимость
                                                                помещения" и "Средняя проходимость" этих районов. Выберите наиболее подходящий 
                                                                вариант для Павла.
                                                                <div class="card-container">
                                                                <div class = "info-text" style="font-size: 30px; width: 500px; height:261px; position: relative; top: 170px; left:-300px"> Проходимость: Минимальная
                                                                                                                                                                                        Цена: 20 Т.Р. в месяц
                                                                                                                                                                                        </div>
                                                                <button id="mihalovkaButton" style="width: 400px; position: relative;bottom:-50px; left: -500px">Михайловка</button>
                                                            </div>
                                                            <div class="card-container">
                                                                <div class = "info-text" style="font-size: 30px; width: 500px; height:261px; position: relative;top: -175px; left:300px"> Проходимость: Выше среднего
                                                                                                                                                                                          Цена: 40 Т.Р. в месяц 
                                                                                                                                                                                          </div>   
                                                                <button id="grechesButton" style="width: 400px; position: relative;bottom:305px; right:-110px">ул. Греческая</button>
                                                            </div>
                                                            <div class="card-container">
                                                                <div class = "info-text" style="font-size: 30px; width: 500px; height:261px; position: relative; top: -520px; left:850px"> Проходимость: Максимальная
                                                                                                                                                                                            Цена: 70 Т.P. в месяц
                                                                                                                                                                                            </div> 
                                                                <button id="petrovskaButton" style="width: 400px; position: relative; bottom:650px; right:-650px">ул. Петровская</button>
                                                            </div>
                                                        </div>
                                                                
                                                `;
                                                                document.body.appendChild(thirdLevelMenu);
                                                                document.body.style.backgroundImage = 'url("../game/img/img_8.png")';
                                                                document.body.style.position = 'absolute';
                                                                document.body.style.width = '100%';
                                                                document.body.style.height = '100%';

                                                                // Стилизуем новое меню игры, чтобы оно соответствовало стилю gameMenu
                                                                thirdLevelMenu.style.position = 'relative';
                                                                thirdLevelMenu.style.width = '100%';
                                                                thirdLevelMenu.style.height = '800px';
                                                                thirdLevelMenu.style.borderRadius = '8px';

                                                                const mihalovkaButton = thirdLevelMenu.querySelector('#mihalovkaButton');
                                                                const grechesButton = thirdLevelMenu.querySelector('#grechesButton');
                                                                const petrovskaButton = thirdLevelMenu.querySelector('#petrovskaButton');
                                                                const infoText = thirdLevelMenu.querySelector('.info-text');

                                                                mihalovkaButton.onclick = function () {
                                                                    sendAnswer('3', '1');
                                                                    infoText.textContent = 'Это помещение хоть и дешевое но находиться в районе с минимальной проходимостью,из за чего его аренда не самая выгодная.';
                                                                }
                                                                grechesButton.onclick = function () {
                                                                    sendAnswer('3', '2');
                                                                    infoText.textContent = 'Абсолютно верно, этот вариант ответа является самым оптимизированным для Павла,' +
                                                                        ' поздравляю, теперь вы понимаете в финансовой грамотности немного больше чем раньше,' +
                                                                        ' спасибо за участие в игре, удачи!!';
                                                                }
                                                                petrovskaButton.onclick = function () {
                                                                    sendAnswer('3', '3');
                                                                    infoText.textContent = 'Данное место обладает отличной проходимостью, но стоимость этого места слишком велика';

                                                                }
                                                            }
                                                        }


                                                    }
                                                }


                                            }
                                        }
                                    )
                                    ;
                                }
                            }
                        )
                        ;
                    }
                }
            )
            ;
        }
    }
)
;