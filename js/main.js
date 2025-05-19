document.addEventListener('DOMContentLoaded', function() {
    // Переключение вкладок
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Удаляем активный класс со всех вкладок и контента
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс на выбранную вкладку
            tab.classList.add('active');
            
            // Показываем соответствующий контент
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Анимируем временную шкалу
            updateTimeline(tabId);
        });
    });
    
    // Обработка кликов по карточкам экспонатов
    const exhibitCards = document.querySelectorAll('.exhibit-card');
    
    exhibitCards.forEach(card => {
        card.addEventListener('click', () => {
            const exhibitId = card.getAttribute('data-id');
            const modal = document.getElementById(`modal-${exhibitId}`);
            if (modal) {
                modal.style.display = 'flex';
                // Добавляем анимацию появления
                setTimeout(() => {
                    modal.querySelector('.modal-content').style.transform = 'translateY(0)';
                    modal.querySelector('.modal-content').style.opacity = '1';
                }, 10);
            }
        });
    });
    
    // Закрытие модальных окон
    const closeButtons = document.querySelectorAll('.close-button');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            // Добавляем анимацию исчезновения
            modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
            modal.querySelector('.modal-content').style.opacity = '0';
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    });
    
    // Закрытие модального окна при клике вне его содержимого
    window.addEventListener('click', (event) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                // Добавляем анимацию исчезновения
                modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
                modal.querySelector('.modal-content').style.opacity = '0';
                
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // Обработка викторины
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Находим родительский контейнер вопроса
            const questionContainer = this.closest('.quiz-question');
            const feedbackElement = questionContainer.querySelector('.quiz-feedback');
            const allOptions = questionContainer.querySelectorAll('.quiz-option');
            
            // Сбрасываем все предыдущие выборы
            allOptions.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
                opt.disabled = true;
            });
            
            // Проверяем ответ
            const isCorrect = this.getAttribute('data-correct') === 'true';
            
            if (isCorrect) {
                this.classList.add('correct');
                feedbackElement.textContent = 'Правильно! 👍';
                feedbackElement.classList.add('correct-feedback');
                feedbackElement.classList.remove('incorrect-feedback');
            } else {
                this.classList.add('incorrect');
                
                // Показываем правильный ответ
                allOptions.forEach(opt => {
                    if (opt.getAttribute('data-correct') === 'true') {
                        opt.classList.add('correct');
                    }
                });
                
                feedbackElement.textContent = 'Неправильно! Попробуйте еще раз. 👎';
                feedbackElement.classList.add('incorrect-feedback');
                feedbackElement.classList.remove('correct-feedback');
            }
            
            // Показываем обратную связь
            feedbackElement.style.display = 'block';
            
            // Через 3 секунды сбрасываем викторину
            setTimeout(() => {
                allOptions.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                    opt.disabled = false;
                });
                feedbackElement.style.display = 'none';
            }, 3000);
        });
    });
    
    // Функция для анимации временной шкалы
    function updateTimeline(tabId) {
        const timelineProgress = document.querySelector('.timeline-progress');
        const timelineMarkers = document.querySelectorAll('.timeline-marker');
        
        timelineMarkers.forEach((marker, index) => {
            if (marker.getAttribute('data-tab') === tabId) {
                const percentage = (index / (timelineMarkers.length - 1)) * 100;
                timelineProgress.style.width = `${percentage}%`;
            }
        });
    }
    
    // Инициализация временной шкалы
    updateTimeline('mainframe');
});
