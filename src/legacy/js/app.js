/* globals $, console */

$(document).ready(function(){

	'use strict';
	function setupPlayer(){
		// Обьявляем все необходимые переменные
        var flag = true,
            // Уровень звука
            volumeMusic = 1,
            // Станция по умолчанию
            defStation = 2,
            // Для звука
            volumePercent,
            volumeSave,
            // Для локального хранилища
            LCSTRG,
            // Переключение станций
            next_prev_Position,
            // Обьявляем переменную присваемваем ей массив с радиостанциями 
            stantion = [{
                name: "Buffalo",
                src: "http://stream-uk1.radioparadise.com/mp3-192"
            }, {
                name: "Radio z Kryjivky",
                src: "http://stream.mjoy.ua:8000/radio-z-kryjivky"
            }, {
                name: "Amsterdam Trance",
                src: "http://sc-atr.1.fm:7700/;stream.nsv"
            }, {
                name: "MFM Station",
                src: "http://radio.mfm.ua:8080/online128"
            }],
			// Обьявляем переменную которой присваивам элемент аудио
			audio = new Audio();
		
		// Создаем обьект аудио с необходимым потоком
		function audioBegining(numerStation){
			// Указываем адресс потока
			audio.src = stantion[numerStation].src;
			// Сохраняем номер в LocalStorage
			LCSTRG.setLCSTRG(numerStation);
			// Название текущей станции
			$('#NameStation').html(stantion[numerStation].name);
			$('#NameStation').attr('title', stantion[numerStation].name);
			// Подсцветка текущей радиостанции
			$('#drop_down_streams>ol li').removeClass('orangeBG');
			$('#drop_down_streams>ol li[number="'+numerStation+'"]').addClass('orangeBG');
			// Позиция для кнопок следующая/предыдущая композиция
			next_prev_Position = numerStation;
			// Текст прелоада
			preloadAlert();		
		}

		//Реализация кнопок  следующая/предыдущая композиция
		function nexr_prev(point){
			// Определяем куда по списку двигаться
			if(point == "next"){
				if(+next_prev_Position < (stantion.length-1)){
					next_prev_Position = +next_prev_Position+1;
					audioBegining(next_prev_Position);
					audio.play();
					playButtonBG('pause');
					//Учитываем будто кнопка плей была нажата(дабы не нарушать заданные нами прежде условия)
					flag = false;
				} else if(next_prev_Position = (stantion.length-1)){
					next_prev_Position = 0;
					audioBegining(next_prev_Position);
					audio.play();
					playButtonBG('pause');
					//Учитываем будто кнопка плей была нажата(дабы не нарушать заданные нами прежде условия)
					flag = false;
				}
			} else if(point == "prev"){
				if(+next_prev_Position == 0){
					next_prev_Position = stantion.length-1;
					audioBegining(next_prev_Position);
					audio.play();
					playButtonBG('pause');
					//Учитываем будто кнопка плей была нажата(дабы не нарушать заданные нами прежде условия)
					flag = false;
				} else if(+next_prev_Position <= (stantion.length-1)){
					next_prev_Position = +next_prev_Position-1;
					audioBegining(next_prev_Position);
					audio.play();
					playButtonBG('pause');
					//Учитываем будто кнопка плей была нажата(дабы не нарушать заданные нами прежде условия)
					flag = false;
				}
			}
			// Текст прелоада
			preloadAlert();			
		}


		// Функция вывода станций в список
		function st_list(){
			for(var i = 0; i<stantion.length; i++){
				$("#drop_down_streams>ol").append('<li group="choice" number="'+i+'">'+stantion[i].name+'</li>');
			}
		} st_list();


		// Локальное хранилище последней станции
		// Сначала делаем проверку на поддержку localStorage а потом уже производим операции
		LCSTRG = {
			setLCSTRG: function(number){			
				if('localStorage' in window){
					// Удаляем из хранилища предыдущее значение ключа
					localStorage.removeItem('number');
					// Отправляем новое значение ключа
					localStorage.setItem('number', number);
				} else{
					console.log("LocalStorage is not detected!")
				}
				//Возвращаем обьект, для последовательного вызова методов
				return this;			
			}, 
			getLCSTRG: function(){
				// Переменная, для хранения полученных из хранилища данных
				var item;
				if('localStorage' in window){
					item = +localStorage.getItem('number');
					// Отправляем значение ключа
					console.log('Station - '+localStorage.getItem('number'));
					// Станция по умолчанию(усли юзер зашел первый раз == ноль)
					if(item == null){
						item = 0;
					}
					defStation = item;
				} else{
					console.log("LocalStorage is not detected!")
					defStation = 0;
				}
				//Возвращаем обьект, для последовательного вызова методов
				return this;
			},
			setBG: function(color){
				if('localStorage' in window){
					// Удаляем из хранилища предыдущее значение ключа
					localStorage.removeItem('bgColor');
					// Отправляем новое значение ключа
					localStorage.setItem('bgColor', color);
				} else{
					console.log("LocalStorage is not detected!")
				}
				//Возвращаем обьект, для последовательного вызова методов
				return this;	
			},
			getBG: function(){
				// Переменная, для хранения полученных из хранилища данных
				var item;
				if('localStorage' in window){
					item = localStorage.getItem('bgColor');
					// Отправляем новое значение ключа
					console.log('Color theme - '+localStorage.getItem('bgColor'));
					// Станция по умолчанию(усли юзер зашел первый раз == ноль)
					if(item == null){
						item = "dark";
					}
					// Присваеваем цветовую
					bgcolor(item);
				} else{
					console.log("LocalStorage is not detected!")
					bgcolor('light');
				}
				//Возвращаем обьект, для последовательного вызова методов
				return this;
			}
		};
		//Станция и фон по умолчанию 
		LCSTRG.getLCSTRG().getBG();



		// Функция смены фона
		function bgcolor(color){
			$('#player').removeClass('light').removeClass('dark').addClass(color);
			$('div[data-role=theme-switcher]').attr('themes', color);
			LCSTRG.setBG(color);
			// Подпись кнопки - противоположная цвету обложки
			if(color == "light"){
				$('div[data-role=theme-switcher]').html('Dark');
			} else if(color == "dark"){
				$('div[data-role=theme-switcher]').html('Light');
			}
		}


		// Смена фона кнопки плей
		function playButtonBG(val){
			$('#playStop').removeClass('play').removeClass('pause').addClass(val);
		}
		// Функция play/stop
		function play_stop(){
			if( flag == true ){
				audio.play();
				playButtonBG('pause')
				flag = false;
			} else{
				audio.pause();
				flag = true;
				playButtonBG('play')
			}
		};
		

		$("body").click(function(event){
			// Реализуем проигрывание
			if(event.target.id == "playStop"){
				play_stop();
			}

			//Нажатие кнопки звука 
			if(event.target.id == "volume"){				
				if($("#volume").attr("on") == "true"){
					volumeSave = audio.volume;
					volumePercent = $('.ui-widget-header').css('width');
					$('.ui-widget-header').css('width', '0');
					$("#volume").attr("on", "false")
					audio.volume = 0;		
				} else{					
					$('.ui-widget-header').css('width', volumePercent);
					$("#volume").attr("on", "true")
					audio.volume = volumeSave;
				}
			}

			// Переключение цвета фона 
			if($(event.target).attr('data-role') == "theme-switcher"){
				if($(event.target).attr('themes') == 'dark'){
					bgcolor('light')
				} else if($(event.target).attr('themes') == 'light'){
					bgcolor('dark')
				}
			}

			// Выпадающий список станций
			if(event.target.id == 'btn_streams_list'){
				if($("#btn_streams_list").attr("on") == "false"){
					$('#drop_down_streams').animate({'height':'220px'},500);
					$("#btn_streams_list").attr("on", "true")
				} else{					
					$('#drop_down_streams').animate({'height':'0'},500);
					$("#btn_streams_list").attr("on", "false")
				}
			}

			// Выбор станции в списке
			if(	$(event.target).attr('group') == "choice"){
				audio.pause();
				audioBegining($(event.target).attr('number'));
				audio.play();
				playButtonBG('pause');
				//Учитываем будто кнопка плей была нажата(дабы не нарушать заданные нами прежде условия)
				flag = false;
			}

			// Выбор станции next/prev
			if(	event.target.id == "next"){
				nexr_prev("next");
			} else if(event.target.id == "prev"){
				nexr_prev("prev");
			}
		});


		// Реализация слайдера звука(jQuery ui)
		$( ".slider" ).slider({
		 	animate: true,
		    range: "min",
		    value: 1,
		    min: 0,
		    max: 1,
			step: 0.05,		              
			//Получаем значение и выводим его на странице
		    slide: function( event, ui ) {		    	
	            if(ui.value > 0){
	            	audio.volume = ui.value;
	            	$("#volume").attr("on", "true")
	        	}
	            else if(ui.value <= 0){
	            	audio.volume = 0;
	            	$("#volume").attr("on", "false")
	            }
		    }			
		});
		// Дефолтная установка станции
		audioBegining(defStation);

		// Прелоад и сообщение
		function preloadAlert(){
			// Запоминаем название станции
			var firstItem = stantion[next_prev_Position].name;
			// Заглушка названия, во время загрузки потока
			$('#NameStation').html('Loading...');
			// Показываем название станции, после окончания загруки
			audio.addEventListener("canplaythrough", function (e) {
				console.log(e)
				$('#NameStation').html(firstItem);
			}, false);
		} preloadAlert();
	};
	setupPlayer();

});
