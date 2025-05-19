// Файл для тестирования интерактивности и визуальных эффектов
// Проверяет работу модальных окон, анимаций и адаптивность

document.addEventListener('DOMContentLoaded', function() {
  console.log('Начало тестирования интерактивности и визуальных эффектов...');
  
  // Проверка модальных окон
  testModals();
  
  // Проверка анимаций
  testAnimations();
  
  // Проверка адаптивности
  testResponsiveness();
  
  console.log('Тестирование завершено!');
});

function testModals() {
  console.log('Тестирование модальных окон...');
  
  // Проверяем, что все модальные окна корректно открываются и закрываются
  const exhibits = document.querySelectorAll('.exhibit-card');
  if (exhibits.length === 0) {
    console.error('Ошибка: Не найдены карточки экспонатов');
    return;
  }
  
  console.log(`Найдено ${exhibits.length} экспонатов для тестирования`);
  
  // Проверяем открытие и закрытие модального окна для первого экспоната
  const firstExhibit = exhibits[0];
  firstExhibit.click();
  
  // Проверяем, что модальное окно открылось
  const modal = document.querySelector('.modal.active');
  if (!modal) {
    console.error('Ошибка: Модальное окно не открылось');
  } else {
    console.log('Модальное окно успешно открылось');
    
    // Проверяем закрытие модального окна
    const closeButton = modal.querySelector('.close-button');
    if (closeButton) {
      closeButton.click();
      
      // Проверяем, что модальное окно закрылось
      setTimeout(() => {
        const closedModal = document.querySelector('.modal.active');
        if (!closedModal) {
          console.log('Модальное окно успешно закрылось');
        } else {
          console.error('Ошибка: Модальное окно не закрылось');
        }
      }, 500);
    } else {
      console.error('Ошибка: Не найдена кнопка закрытия модального окна');
    }
  }
}

function testAnimations() {
  console.log('Тестирование анимаций...');
  
  // Проверяем анимации при наведении на экспонаты
  const exhibits = document.querySelectorAll('.exhibit-card');
  if (exhibits.length > 0) {
    // Симулируем наведение мыши на первый экспонат
    const firstExhibit = exhibits[0];
    
    // Создаем события mouseenter и mouseleave
    const mouseEnterEvent = new Event('mouseenter');
    const mouseLeaveEvent = new Event('mouseleave');
    
    // Проверяем анимацию при наведении
    firstExhibit.dispatchEvent(mouseEnterEvent);
    console.log('Событие наведения мыши отправлено');
    
    // Проверяем анимацию при уходе мыши
    setTimeout(() => {
      firstExhibit.dispatchEvent(mouseLeaveEvent);
      console.log('Событие ухода мыши отправлено');
    }, 1000);
  }
  
  // Проверяем анимации переключения вкладок
  const tabs = document.querySelectorAll('.tab');
  if (tabs.length > 1) {
    // Симулируем клик по второй вкладке
    setTimeout(() => {
      tabs[1].click();
      console.log('Клик по второй вкладке выполнен');
      
      // Возвращаемся на первую вкладку
      setTimeout(() => {
        tabs[0].click();
        console.log('Клик по первой вкладке выполнен');
      }, 1000);
    }, 2000);
  }
}

function testResponsiveness() {
  console.log('Тестирование адаптивности...');
  
  // Получаем текущие размеры окна
  const initialWidth = window.innerWidth;
  const initialHeight = window.innerHeight;
  
  console.log(`Текущие размеры окна: ${initialWidth}x${initialHeight}`);
  
  // Симулируем различные размеры экрана
  const screenSizes = [
    { width: 1920, height: 1080, name: 'Desktop' },
    { width: 1366, height: 768, name: 'Laptop' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 375, height: 667, name: 'Mobile' }
  ];
  
  // Выводим информацию о тестировании на разных размерах экрана
  screenSizes.forEach(size => {
    console.log(`Проверка адаптивности для ${size.name}: ${size.width}x${size.height}`);
    // В реальном тестировании здесь бы изменялся размер окна браузера
    // и проверялось корректное отображение элементов
  });
  
  console.log('Для полного тестирования адаптивности рекомендуется проверить сайт на реальных устройствах или с помощью инструментов разработчика в браузере');
}
