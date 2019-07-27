

$(document).ready(function() {

    // this shitty code was written with love by Arman ...(*￣０￣)ノ


    /* checks whether it is a mobile device or not */

    const ifMobile = () => {
        return (typeof window.orientation !== "undefined");
    }

    const breakSite = () => {
        if(ifMobile() == true) {
            $(".lang-selector, .clock, .modal, .bar").css("display", "none");
            $(".mb-dialog").css("display", "block");
        }
    }

    breakSite();



    //a function for converting rgb to hex, rgb inputed in this form: rgba(34, 34, 34, 1), opacity will be ignored
    const rgb2hex = (rgb) => {
        /*for(let c in rgb) {
            if(c == "#") {
                return rgb;
            }
        }*/

        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    };

    


    const wdEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];

    const wdFR = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    const monthsFR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    const wdHY = ['կիրակի', 'երկուշաբթի', 'երեքշաբթի', 'չորեքշաբթի', 'հինգշաբթի', 'ուրբաթ', 'շաբաթ'];
    const monthsHY = ['հունվար', 'փետրվար', 'մարտ', 'ապրիլ', 'մայիս', 'հունիս', 'հուլիս', 'օգոստոս', 'սեպտեմբեր', 'հոկտեմբեր', 'նոյեմբեր', 'դեկտեմբեր'];

    const wdRU = ['воскресение', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суботта'];
    const monthsRU = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    const wdAR = ['الأحد', 'الأثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعه', 'السبت'];
    const monthsAR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سمتمبر', 'أكتوبر', 'نوفمبر', 'ديسيمبر'];
    
    let spanColor; 

    const bcUp = 200; // a variable for choosing a timeout duration for the form values update




    const setValues = () => {
        let $body = $('.body');
        let $clock = $('.clock');

        //                      F O R   T H E   R E G U L A R   T O O L B A R



        // span color
        spanColor = undefined; //seems to work, but play around it
        
        // background color
        $('#c-cbackground').prop('value', rgb2hex($body.css('background-color'))); 

        // font color
        $('#c-color').prop('value', rgb2hex($clock.css('color'))); 

        // span font color
        //$(".clock span").removeAttr("style");
        $("#c-scolor").prop('value', rgb2hex($('.clock span').css('color')));

        // alignment 
        $("#c-align").val($clock.css('text-align'));

        // font family 
        $("#c-font").val($clock.css('font-family'));




        //                      F O R   T H E   A D V A N C E D   T O O L B A R

        $(".modal input").each(function(){
            let $this = $(this);
            let property = $(this).attr("data-prop"); 
            if($this.hasClass("forClock") == true) {
                $this.attr("placeholder", $(".clock").css(property));
            } else if ($this.hasClass("forBody") == true) {
                $this.attr("placeholder", $("body").css(property));
            } else if($this.hasClass("forClockDc") == true) {
                $this.attr("placeholder", $(".clock .dc p").css(property));
            } else if($this.hasClass("forClockDate") == true) {
                $this.attr("placeholder", $(".clock .date").css(property));
            } else if($this.hasClass("forSpan") == true) {
                $this.attr("placeholder", $(".clock .dc span").css(property));
            }
        })


        // this part isn't about setting the default values, it's to delete the inputed data of the forms in the modal

        $(".modal input").each(function(){
            let $this = $(this);
            $this.prop('value', "");
        })

        
    }

    setValues();







    const addZero = (u) => {
        if(u <= 9) {
            return  `0${u}`;
        } else {
            return u;
        }
    }

    let activeFlag = "en";
    //let timeFormat = 24;
    let pmoram;



/* to make 12-format clock work */
    
    const toPM = (hour) => {

        let newHour;
        if(hour => 12) {
            newHour = hour-12;
            pmoram = "PM";
        } else {
            pmoram = "AM";
        }

        return newHour;

    }


    $(".format-switcher").on("click", function() {
        $(".dc").toggleClass("c12");
    })


/* the main function for updating the time */

    const timeUpdate = () => {

        // a function for converting to arabic digits, will be used later on in else if(activeflag==ar)

        function toAr(str) {
            
            string = str.toString();

            return string.replace(/\d/g, d =>  '٠١٢٣٤٥٦٧٨٩'[d])
        }
        
        let d = new Date();
        let hour;
        let $dc = $(".dc");


        pmoram = "";
        if(!$dc.hasClass("c12")) {
            hour = addZero(d.getHours());
        } else if($dc.hasClass("c12")) {
            hour = addZero(toPM(d.getHours()));
        }
        
        let min = addZero(d.getMinutes());
        let sec = addZero(d.getSeconds());
        let weekdayEN = wdEN[d.getDay()];
        let monEN = monthsEN[d.getMonth()];
    
        let weekdayFR = wdFR[d.getDay()];
        let monFR = monthsFR[d.getMonth()];
    
        let weekdayHY = wdHY[d.getDay()];
        let monHY = monthsHY[d.getMonth()];

        let weekdayAR = wdAR[d.getDay()];
        let monAR = monthsAR[d.getMonth()];

        let weekdayRU = wdRU[d.getDay()];
        let monRU = monthsRU[d.getMonth()];
    
        
        let day = d.getDate();

        if(activeFlag !== "ar") {
            $('.dc p').html(`${hour}:${min}`);
            $('.dc span').html(sec);
        }
        $('.dc div i').html(pmoram);
        $('.dc div span').css({'color': spanColor});


        if(activeFlag == "en") {
            $('.date').html(`${monEN} ${day}, ${weekdayEN}`);
        } else if(activeFlag == "fr") {
            $('.date').html(`${weekdayFR}, ${day} ${monFR}`);
        } else if(activeFlag == "hy") {
            $('.date').html(`${day}-ը ${monHY}ի, ${weekdayHY}`);
        } else if(activeFlag == "ar") {
            $('.dc p').html(`${toAr(hour)}:${toAr(min)}`);
            $('.dc span').html(toAr(sec));
            $('.date').html(`${monAR} ${day}, ${weekdayAR}`);
        } else if(activeFlag == "ru") {
            $('.date').html(`${day} ${monRU}, ${weekdayRU}`);
        };
    
    
        setTimeout(timeUpdate, 500);
    }

    timeUpdate();

    // the bar toggler button
    $('.bar-toggler-u').on('click', function() {
        let barTop = $('.bar').offset().top;
        //console.log(barTop);
        if(barTop < 0) {
            $('.bar').css("transform", "translateY(0)");
            $(this).removeClass('bar-toggler-u');
            $(this).addClass('bar-toggler-o');
            $('.bar').addClass('bar-o');
        } else if (barTop == 0) {
            $('.bar').css('transform', 'translateY(-100%)');
            $(this).removeClass('bar-toggler-o');
            $(this).addClass('bar-toggler-u');
            $('.bar').addClass('bar-u');
        }
    })
    
    

    // for selecting one of the default themes

    let previousVal;
    let newVal;
    

    $('.theme-selector').on('focus', function() {
        previousVal = $(this).val();
        //console.log(previousVal);
    }).on('change', function() {
        newVal = $(this).val();
        //console.log(newVal);
        $('body, .clock, .clock .dc, .clock .dc p, .clock .dc span, .clock .date').removeAttr('style');
        $('body, .clock').removeClass(previousVal).addClass(newVal);
        setTimeout(setValues, bcUp);
        $(this).blur();
    })

    // for selecting an image background

    $('.ibackground-selector').on('change', function() {
        let newVal = $(this).val();
        //console.log(newVal);
        $('body').addClass('newBackground');// to specify a transition for it in css
        $('body').css({'background-image': `url('${newVal}')`});
        $(this).blur();

    })

    // for selecting a plain color background

    $('.cbackground-selector').on('change', function() {
        let newVal = $(this).val();
        //console.log(newVal);
        $('body').addClass('newBackground');
        $('body').css({'background-image': 'none'});
        $('body').css({'background-color': newVal});
        $(this).blur();

    })

    // for selecting a color

    $('.color-selector').on('change', function() {
        let newVal = $(this).val();
        //console.log(newVal);
        $('.clock').css({'color': newVal});
    })


    // for selecting a semi color

    $('.scolor-selector').on('change', function() {
        spanColor = $(this).val();
        //console.log(newVal);
    })


    // for selecting a type of alignment

    $('.align-selector').on('change', function() {
        let newVal = $(this).val();
        //console.log(newVal);
        $('.clock').css({'text-align': newVal});
    })


    // for selecting a font 

    $('.font-selector').on('change', function() {
        let newVal = $(this).val();
        /*console.log(newVal);*/
        $('.clock').css({'font-family': newVal});
    })
  
    







    $(".apply").on('click', function(){

        $(".modal input").each(function(){

            if($(this).val() !== "") {
                if($(this).hasClass('forClock') == true) {
                
                    let property = $(this).attr("data-prop");
                    let rule = $(this).val();
                    $(".clock").css(property, rule);
                } else if($(this).hasClass('forClockDc') == true) {
                    let property = $(this).attr("data-prop");
                    let rule = $(this).val();
                    $(".clock .dc p").css(property, rule);
                } else if($(this).hasClass('forClockDate') == true) {
                    let property = $(this).attr("data-prop");
                    let rule = $(this).val();
                    $(".clock .date").css(property, rule);
                }   else if($(this).hasClass('forBody') == true) {
                    let property = $(this).attr("data-prop");
                    let rule = $(this).val();
                    $("body").css(property, rule);
                } else if($(this).hasClass('forSpan') == true) {
                    let property = $(this).attr("data-prop");
                    let rule = $(this).val();
                    $(".clock .dc span").css(property, rule);
                    console.log(rule);
                }
            } 
            
        })

        setTimeout(setValues, 100)
    
    
    
    })


    //for triggering "apply" on pressing enter

    $(".modal-body input").on("keyup", function(event) {
        if(event.keyCode === 13) {
            $(".apply").trigger("click");
        }
    })







// T R A N S L A T I O N S 


    const translations = {
        en: {
            labels: ["Choose a theme: ", "Background image: ", "Background color: ", "Font color: ", "Seconds' font color: ", "Alignment: ", "Font family: "],
            intro: "← Pick one of the themes <br> Or create your own →", 
            alignment: ["Left", "Center", "Right"],
            theme: 'Theme',
            background: 'Background',
            //advanced options
            advancedTrigger: "Advanced options...",
            advancedH2: "Advanced options",
            advancedH3: "Edit these styles manually: ",
            alert: "<strong>Note!</strong> you must be familiar with CSS.",
            advancedLabels: ["Background image: ", "Clock font size: ", "Seconds' font size: ", "Date font size: ", "Clock background color: ", "Clock border: ", "Clock border radius: ", "Clock Y: ", "Clock X: "],
            apply: "Apply",
        },
        hy: {
            labels: ["Ընտրեք թեմա: ", "Ֆոնի նկար: ", "Ֆոնի գույն: ", "Տառատեսակի գույնը: ", "Վայրկենացույցի տ-ի գույնը: ", "Տողաշտկում: ", "Տառատեսակը: "],
            intro: "← Ընտրեք թեմաներից մեկը <br> Կամ ստեղծեք ձերը →", 
            alignment: ["Ձախից", "Մեջտեղից", "Աջից"],
            theme: 'Թեմա',
            background: 'Ֆոն',
            //advanced options
            advancedTrigger: "Լրացուցիչ...",
            advancedH2: "Լրացուցիչ կայանքներ",
            advancedH3: "Կարգավորեք այս ոճերը ինքնուրույն․ ",
            alert: "<strong>Հիշեք!</strong> դուք պետք է ծանոթ լինեք CSS-ի հետ։",
            advancedLabels: ["Ետնապատկերը։ ", "Ժամացույցի տառաչափը։ ", "Վայրկենացույցի տառաչափը։ ", "Ամսաթվի տառաչափը։ ", "Ժամացույցի ետնագույնը։ ", "Ժամացույցի եզրագիծը։ ", "Ժամացույցի եզրագծի շառավիղը։ ", "Ժամացույցի Y-ը։ ", "Ժամացույցի X-ը։ "],
            apply: "Կիրառել",
        },
        fr: {
            labels: ["Choisissez un thème: ", "Image de fond: ", "Couleur de fond: ", "Couleur de la police: ", "Couleur des secondes: ", "Alignement: ", "Famille de polices: "],
            intro: "← Choisissez l'un des thèmes <br> Ou créez le vôtre →",
            alignment: ["La gauche", "La centre", "La droite"],
            theme: 'Thème',
            background: 'Fond',
            //advanced options
            advancedTrigger: "Options avancées...",
            advancedH2: "Options avancées",
            advancedH3: "Editer ces styles manuellement: ",
            alert: "<strong>Notez!</strong> vous devez être familier avec CSS.",
            advancedLabels: ["Image de fond: ", "Taille de la police: ", "Taille de la police en secondes: ", "Date taille de la police: ", "Couleur de fond de l'horloge: ", "Frontière horloge: ", "Rayon de l'horloge: ", "Horloge Y: ", "Horloge X: "],
            apply: "Appliquer",
            
        },
        ru: {
            labels: ["Выберите тему: ", "Фоновое изображение: ", "Цвет фона: ", "Цвет шрифта: ", "Цвет шрифта секунд: ", "Выравнивание: ", "Шрифт: "],
            intro: "← Выберите одну из тем <br> Или собирайте свой →", 
            alignment: ["Слева", "С середины", "Справа"],
            theme: 'Тема',
            background: 'Фон',
            //advanced options
            advancedTrigger: "Дополнительное...",
            advancedH2: "Дополнительные настройки",
            advancedH3: "Настройте вручную: ",
            alert: "<strong>Обратите внимание!</strong> вы должны быть знакомы с CSS.",
            advancedLabels: ["Фоновое изображение: ", "Размер шрифта часов: ", "Размер шрифта секунд: ", "Размер шрифта даты: ", "Цвет фона часов: ", "Граница часов: ", "Радиус границы часов: ", "Y часов: ", "X часов: "],
            apply: "Применять",
        },
        ar: {
            labels: ["اختيار موضوع ", "الصورة الخلفية ", "لون الخلفية ", "لون الخط ", "لون خط الثواني ", "انتقام ", "خط العائلة "],
            intro: "← اختيار واحد من الموضوعات <br> أو إنشاء الخاصة بك →", 
            alignment: ["اليسار", "مركز", "حق"],
            theme: 'موضوع',
            background: 'خلفية',
            //advanced options
            advancedTrigger: "خيارات متقدمة...",
            advancedH2: "خيارات متقدمة",
            advancedH3: "تحرير هذه الأنماط يدويا",
            alert: "<strong>ملحوظة!</strong> يجب أن تكون على دراية CSS.",
            advancedLabels: ["الصورة الخلفية ", "حجم الخط على مدار الساعة ", "حجم الخط ثانية ", "حجم الخط التاريخ ", "لون خلفية الساعة ", "حدود الساعة ", "دائرة نصف قطرها على مدار الساعة ", "ساعة حائط Y ", "ساعة حائط X "],
            apply: "تطبيق",
        }
    };


    function toTranslate(lang, dir) {

        if(lang !== undefined) {
            activeFlag = lang;
        }

        $('label').each(function(i=0) {
            $(this).html(translations[lang].labels[i]);
            i++;
        });
        $('.intro').html(translations[lang].intro);
        $('#c-align option').each(function(i=0) {
            $(this).html(translations[lang].alignment[i]);
            i++;
        });
        $('#theme option').each(function(i=0) {
            $(this).html(`${translations[lang].theme} ${i+1}`);
        });
        $('#c-ibackground option').each(function(i=0) {
            $(this).html(`${translations[lang].background} ${i+1}`);
        });

        //advanced options part

        $(".advanced-trigger").html(translations[lang].advancedTrigger);
        $(".modal-header h2").html(translations[lang].advancedH2);
        $(".modal-body h3").html(translations[lang].advancedH3);
        $(".modal-body .alert").html(translations[lang].alert);
        $(".modal-body label").each(function(i=0) {
            $(this).html(translations[lang].advancedLabels[i]);
            i++;
        });
        $(".modal-body .apply").html(translations[lang].apply);

        //other things, not related to the translation directly


        if(dir == "ltr") {

            //for checking if it is already ltr or not
            if($("body").attr("dir") == "rtl") {

                //set the body direction
                $(".body").attr("dir", dir);

                //for reversing the position of the language selector
                let lfl = $(".lang-selector").css("left");
                $(".lang-selector").css({"left": "", "right": lfl});
                $(".lang-selector").attr("dir", "rtl");

                //for making the forms of the bar reverse
        //        $(".bar div").css("float", "left")

                //for reversing the position of the bar toggler
                let btr = $(".bar .bar-toggler").css("right");
                $(".bar .bar-toggler").css({"right": "", "left": btr});

                //for reversing the position of the modal close button
                $(".modal-header .close").css("float", "right");
            }

        } else if (dir == "rtl") {

            //for checking if it is already ltr or not
            if($("body").attr("dir") == "ltr") {

                //set the body direction
                $(".body").attr("dir", dir);

                //for reversing the position of the language selector
                let lfr = $(".lang-selector").css("right");
                console.log(lfr);
                $(".lang-selector").css({"right": "", "left": lfr});
                $(".lang-selector").attr("dir", "ltr");

                //for making the forms of the bar reverse
        //        $(".bar div").css("float", "right")

                //for reversing the position of the bar toggler
                let btl = $(".bar .bar-toggler").css("left");
                $(".bar .bar-toggler").css({"left": "", "right": btl});

                //for reversing the position of the modal close button
                $(".modal-header .close").css("float", "left");

            }

        }


        
    }



    // attaching an event on the language flags
    $(".flag-picker").on('click', function(){
        //console.log('ye');
        if($(this).hasClass('selected') == false) {
            let locale = $(this).attr("alt");
            let direction = $(this).attr("data-dir");
            toTranslate(locale, direction);
            $(".flag-picker").removeClass('selected');
            $(this).addClass('selected');

            let parent = $(".lang-selector")[0];
            let flag = $(this)[0];

            parent.insertBefore(flag, parent.childNodes[0]);
        }
    })




})
