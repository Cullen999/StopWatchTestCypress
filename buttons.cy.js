/**
 *
 * 
 * Этот файл содержит автоматизированные тесты для проверки функциональности
 * веб-приложения секундомера. Тесты охватывают основные функции:
 * - Запуск секундомера
 * - Остановка секундомера
 * - Сброс секундомера
 * - Измерение времени
 */

import { StopWatch } from "../../support/stopWatch";

const stopWatch = new StopWatch;

/**
 * Парсит строку времени в объект с компонентами времени
 * @param {string} timeString - Строка времени в формате "HH:MM:SS.mmm с"
 * @returns {Object} Объект с компонентами времени
 */
function parseTime(timeString) {
  const [times, dotMilliSeconds] = timeString.split('.');
  const [milliSeconds] = dotMilliSeconds.split(' ').slice(0, -1).map(Number);
  const [hours, minutes, seconds] = times.split(':').map(Number);

  // Для начального значения "00:00:00.000 с" возвращаем объект с обычными именами
  if (timeString === '00:00:00.000 с') {
    return { hours, minutes, seconds, milliSeconds };
  } 
  // Для других значений возвращаем объект с префиксом "current"
  else {
    return { 
      currentHours: hours, 
      currentMinutes: minutes, 
      currentSeconds: seconds, 
      currentMilliSeconds: milliSeconds 
    };
  }
}

/**
 * Селекторы элементов на странице
 */


/**
 * Тесты для веб-приложения секундомера
 */
describe('Секундомер на сайте sekundomer.net', () => {
  /**
   * Перед каждым тестом переходим на страницу секундомера
   */
 

  /**
   * Тест запуска секундомера
   * Проверяет, что секундомер запускается и время начинает изменяться
   */
  it('Старт секундомера', () => {
    // Получаем начальное время
    stopWatch.timer.invoke('text').then((initialTime) => {
      
      // Запускаем секундомер
      stopWatch.clickStart();
      
      // Ждем 2 секунды
      cy.wait(2000);
      
      // Получаем текущее время
      stopWatch.timer.invoke('text').then((currentTime) => {
        // Проверяем, что время изменилось
        expect(currentTime).to.not.equal(initialTime);
      });
    });
  });

  /**
   * Тест остановки секундомера
   * Проверяет, что секундомер останавливается и время не изменяется
   */
  it('Стоп секундомера', () => {
    // Получаем начальное время
    stopWatch.timer.invoke('text').then((initialTime) => {
      const { hours, minutes, seconds, milliSeconds } = parseTime(initialTime);
      
      // Запускаем секундомер
      stopWatch.clickStart();
      
      // Ждем 2 секунды
      cy.wait(2000);
      
      // Останавливаем секундомер (второй клик по кнопке Start)
      stopWatch.clickStart();
      
      // Получаем текущее время
      stopWatch.timer.invoke('text').then((currentTime) => {
        // Проверяем, что время не равно начальному
        expect(currentTime).to.not.equal(initialTime);
        
        // Проверяем компоненты времени
        const { currentHours, currentMinutes, currentSeconds, currentMilliSeconds } = parseTime(currentTime);
        
        // Часы и минуты должны остаться теми же
        expect(currentHours).to.equal(hours);
        expect(currentMinutes).to.equal(minutes);
        
        // Секунды и миллисекунды должны измениться
        expect(currentSeconds).to.not.equal(seconds);
        expect(currentMilliSeconds).to.not.equal(milliSeconds);
      });
    });
  });

  /**
   * Тест сброса секундомера на ноль
   * Проверяет, что секундомер сбрасывается на начальное значение
   */
  it('Обнуление', () => {
    // Получаем начальное время
    stopWatch.timer.invoke('text').then((initialTime) => {
      // Запускаем секундомер
      stopWatch.clickStart();
      
      // Ждем 2 секунды
      cy.wait(2000);
      
      // Останавливаем секундомер
      stopWatch.clickStart();
      
      // Сбрасываем секундомер на ноль
      stopWatch.clickZero();
      
      // Проверяем, что время вернулось к начальному значению
      stopWatch.timer.invoke('text').then((currentTime) => {
        expect(currentTime).to.equal(initialTime);
      });
    });
  });

  
}); 