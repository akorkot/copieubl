(function ($) {

    /**********************************************************/
    // Actus a la une
    var ubl_changeActuUne = function (e) {
        var windowW = window.innerWidth;
        e.parent().parent().parent().find('.active').removeClass('active');
        e.parent().parent().addClass('active');
        e.parent().parent().find('.categorie-node').addClass('active');
        if (windowW >= 480) {
            $('#block-views-block-actus-a-la-une-block-1 .views-field-field-image-1').hide();
            e.siblings('.views-field-field-image-1').show();
        } else {
            var wrapDiv = $('#block-views-block-actus-a-la-une-block-1 .mobileimg');
            if (!wrapDiv.length) {
                $('#block-views-block-actus-a-la-une-block-1 .view-content').prepend('<div class="mobileimg"></div>');
                wrapDiv = $('#block-views-block-actus-a-la-une-block-1 .mobileimg');
            }
            wrapDiv.html('');
            e.siblings('.views-field-field-image-1').find('img:first').clone().appendTo('#block-views-block-actus-a-la-une-block-1 .mobileimg').show();
        }
    };
    $('#block-views-block-actus-a-la-une-block-1 .views-field-title').on('mouseover', function () {
        ubl_changeActuUne($(this));
    });
    ubl_changeActuUne($('#block-views-block-actus-a-la-une-block-1 .views-row:first-child .views-field-title'));

    var ubl_actuWall = function (e) {
        var windowW = window.innerWidth;
        if (windowW < 480) {

            var controls = '<div class="view-footer">' +
                '<!-- Left and right controls -->' +
                '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">' +
                '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
                '<span class="sr-only">Previous</span>' +
                '</a>' +
                '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">' +
                '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span>' +
                '</a>' +
                '</div>';

            $('<div style="position:relative;clear:both;"><div id="wall_tw_car" class="carousel-div carousel-div-1col"></div>' + controls + '</div>').insertBefore('#block-socialwallwidgetblock #tab-now .row:nth-child(2) .panel:last');
            $('#block-socialwallwidgetblock #tab-now .row:nth-child(2) .panel').not(':first').not(':last').prependTo('#wall_tw_car');

        }
    };
    ubl_actuWall();


    var ubl_home_wall = function (e) {
        var windowW = window.innerWidth;
        if (windowW < 480) {

            // Twitter
            var controls = '<div class="view-footer">' +
                '<!-- Left and right controls -->' +
                '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">' +
                '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
                '<span class="sr-only">Previous</span>' +
                '</a>' +
                '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">' +
                '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span>' +
                '</a>' +
                '</div>';

            $('#block-socialwallblock #tab-now .row:nth-child(1) > div:first-child .row').addClass('carousel-div carousel-div-1col');
            $(controls).insertAfter('#block-socialwallblock #tab-now .row:nth-child(1) > div:first-child .row');

            // Actus
            $('<div style="position:relative;clear:both;"><div id="wall_hp_car1" class="carousel-div carousel-div-1col"></div>' + controls + '</div>')
                .prependTo('#block-socialwallblock #tab-now .row:nth-child(2)');
            $('#block-socialwallblock #tab-now .row:nth-child(2) .panel:nth-child(2)').appendTo('#wall_hp_car1');
            $('#block-socialwallblock #tab-now .row:nth-child(2) .panel:nth-child(2)').appendTo('#wall_hp_car1');
            $('#block-socialwallblock #tab-now .row:nth-child(2) .panel:nth-child(2)').appendTo('#wall_hp_car1');
            $('#block-socialwallblock #tab-now .row:nth-child(2) .panel:nth-child(4)').appendTo('#wall_hp_car1');
            $('#block-socialwallblock #tab-now .row:nth-child(2) .panel:nth-child(4)').appendTo('#wall_hp_car1');

        }
    };
    ubl_home_wall();

    /**********************************************************/
    // Agenda a la une
    var ubl_changeAgendaUne = function (e) {
        var windowW = window.innerWidth;
        e.parent().parent().parent().find('.active').removeClass('active');
        e.parent().parent().addClass('active');
        e.parent().parent().find('.categorie-node').addClass('active');
        if (windowW >= 480) {
            $('#block-views-block-agenda-a-la-une-block-1 .views-field-field-miniature-1').hide();
            e.siblings('.views-field-field-miniature-1').show();
        } else {
            var wrapDiv = $('#block-views-block-agenda-a-la-une-block-1 .mobileimg');
            if (!wrapDiv.length) {
                $('#block-views-block-agenda-a-la-une-block-1 .view-content').prepend('<div class="mobileimg"></div>');
                wrapDiv = $('#block-views-block-agenda-a-la-une-block-1 .mobileimg');
            }
            wrapDiv.html('');
            e.siblings('.views-field-field-miniature').find('img:first').clone().appendTo('#block-views-block-agenda-a-la-une-block-1 .mobileimg').show();
        }
    };
    $('#block-views-block-agenda-a-la-une-block-1 .views-field-title').on('mouseover', function () {
        ubl_changeAgendaUne($(this));
    });
    ubl_changeAgendaUne($('#block-views-block-agenda-a-la-une-block-1 .views-row:first-child .views-field-title'));

    /**********************************************************/
    // Social wall filter
    $('.grid .filters li').on('click', function () {

        var id = $(this).data('tab');

        var filters = $('.grid .filters');
        var curFilter = $(this);

        filters.find('li').removeClass('active');
        curFilter.addClass('active');
        filters.parent().find('.grid-tab').removeClass('active');
        filters.parent().find('#tab-' + id).addClass('active');

    });

    /**********************************************************/
    // Sidebar sliders
    var sidebar_sliders_move = function (wrapper, sens) {
        var currentLi = wrapper.find('.active');
        var newLi;
        if (sens == 'prev') {
            newLi = currentLi.prev();
        } else if (sens == 'next') {
            newLi = currentLi.next();
        }
        if (!jQuery.isEmptyObject(newLi) && newLi.length > 0) {
            var heightBox = wrapper.height();
            wrapper.css('height', heightBox);
            currentLi.hide('quick', function () {
                currentLi.removeClass('active');
                newLi.addClass('active').show();
                wrapper.css('height', 'auto');
            });
        }
    };
    $('.slide-nav .prev').on('click', function () {
        sidebar_sliders_move($(this).parent().siblings('ul'), 'prev');
    });
    $('.slide-nav .next').on('click', function () {
        sidebar_sliders_move($(this).parent().siblings('ul'), 'next');
    });
    /**********************************************************/
    // Modification image header sur les pages
    if (typeof header_img != 'undefined' && header_img != '') {
        $('#page-top .slide-wrapper').attr('background-image', 'url(' + header_img + ')');
    }

    /**********************************************************/
    // Slider HP

    $('.slider-nav .nav-item').on('click', function () {
        var slideId = $(this).data('slide');

        var curSlide = $('.slider-wrapper .slide-wrapper.active');
        var nextSlide = $('.slider-wrapper .slide-' + slideId);
        var curSlideNav = $('.slider-nav .nav-item.active');
        var nextSlideNav = $(this);

        curSlideNav.removeClass('active');
        nextSlideNav.addClass('active');
        curSlide.fadeOut('quick', function () {
            curSlide.removeClass('active');
            curSlide.css('display','');
            nextSlide.addClass('active');
        });
    });

    var ubl_hpslider_prev = function () {
        var slider = $('#page-top .slider-wrapper');
        var active_slide = slider.find('.slide-wrapper.active');
        var active_slide_nav = slider.find('.slider-nav .nav-item.active');
        var prev_slide = active_slide.prev();
        var prev_slide_nav = active_slide_nav.prev();
        if (active_slide.is(':first-child')) {
        } else {
            active_slide.removeClass('active');
            prev_slide.addClass('active');
            active_slide_nav.removeClass('active');
            prev_slide_nav.addClass('active');
        }
    };
    var ubl_hpslider_next = function () {
        var slider = $('#page-top .slider-wrapper');
        var active_slide = slider.find('.slide-wrapper.active');
        var active_slide_nav = slider.find('.slider-nav .nav-item.active');
        var next_slide = active_slide.next();
        var next_slide_nav = active_slide_nav.next();
        if (active_slide.next().is(':last-child')) {
        } else {
            active_slide.removeClass('active');
            next_slide.addClass('active');
            active_slide_nav.removeClass('active');
            next_slide_nav.addClass('active');
        }
    };
    $('#page-top .slider-wrapper .slider-nav .view-footer .left').on('click', function () {
        ubl_hpslider_prev();
    });
    $('#page-top .slider-wrapper .slider-nav .view-footer .right').on('click', function () {
        ubl_hpslider_next();
    });

    /**********************************************************/
    // Services

    $('#sidebar h3').on('click', function () {
        var windowW = window.innerWidth;
        if (windowW < 480) {
            $('#sidebar ul').toggle();
        }
    });

    /**********************************************************/
    // Block child pages

    $('#block-siblingsmenu h2').on('click', function () {
        var windowW = window.innerWidth;
        if (windowW < 480) {
            $('#block-siblingsmenu .menu').toggle();
        }
    });

    /**********************************************************/
    //$('.equalize-row').equalize({children: '.views-col'});
    $(window).on("load", function () {
        $('.equalize-row').equalize();
    });
    /**********************************************************/
    /**
     * Slider detail event
     */
    var ubl_slider_events_container = $('.node--type-ubl-events .field--name-field-miniature');
    var ubl_slider_events_next = function () {
        var curSlide = ubl_slider_events_container.find('.active');
        var nextSlide = curSlide.next();

        if (!nextSlide.length) {
            nextSlide = ubl_slider_events_container.find('.field__item').first();
        }

        curSlide.fadeOut('quick', function () {
            curSlide.removeClass('active');
            nextSlide.addClass('active').show();
        });

    };

    var ubl_slider_events_setup = function () {
        ubl_slider_events_container.find('.field__item').first().addClass('active');

        if (ubl_slider_events_container.find('.field__item').length > 1) {
            setInterval(function () {
                ubl_slider_events_next();
            }, 3000);
        }
    };
    ubl_slider_events_setup();

    /**********************************************************/

    var ubl_diaporama_setup = function (selector) {

        $(selector).each(function (y) {
            var diaporama = $(this);
            var children = diaporama.children();
            var items = [];
            var htmlNav = '';
            var nb_items_show = 3;
            if (children.length > 1) {
                //
                diaporama.addClass('diaporama-id-' + y);

                // On ajoute la nav
                var courrouselNav = '<div class="view-footer"><!-- Left and right controls --><a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
                var diaporama_nav = $('<div class="diaporama-nav "><ul class="carousel-div carousel-div-3col"></ul>' + courrouselNav + '</div>').insertAfter(diaporama);

                // On construit la nav pour chaque item du diaporama
                children.each(function (i) {
                    var item = $(this).find('img').first();
                    items[items.length] = {
                        src: item.attr('src'),
                        alt: item.attr('alt'),
                    };
                    /**/
                    var classes = '';
                    if (i < 1) {
                        classes = 'active';
                    }
                    var newLi = $('<li data-diapid="' + y + '" data-diapoid="' + i + '" class="' + classes + '"><img src="' + item.attr('src') + '" alt="' + item.attr('alt') + '"></li>');
                    diaporama_nav.children('ul').append(newLi);
                    if (i >= nb_items_show) {
                        newLi.hide();
                    }
                });
            }
        });

        $('.diaporama-nav li').on('click', function () {
            $(this).parent().find('.active').removeClass('active');
            $(this).addClass('active');
            var diapId = $(this).data('diapid');
            var diapoId = $(this).data('diapoid');
            $('.diaporama-id-' + diapId).children().hide().promise().done(function () {
                $('.diaporama-id-' + diapId).children(':nth-child(' + (diapoId + 1) + ')').show();
            });
        });

    };
    ubl_diaporama_setup('.field--name-field-image.field__items');

    /**********************************************************/

    var ubl_carousel_resize = function () {

        var windowW = window.innerWidth;

        $('.carousel-div').each(function () {

            var carrousel = $(this),            // on cible le bloc du carrousel
                nbItemsShow = carrousel.children(':visible').length;

            // On calcul le nombre d'items à afficher
            var nbItemsToShow = 1;
            if (carrousel.hasClass('carousel-div-1col')) {
                nbItemsToShow = 1;
            } else if (carrousel.hasClass('carousel-div-2col')) {
                nbItemsToShow = 2;
                if (windowW < 768) {
                    nbItemsToShow = 4;
                }
            } else if (carrousel.hasClass('carousel-div-3col')) {
                nbItemsToShow = 3;
                if (windowW < 480) {
                    nbItemsToShow = 1;
                } else if (windowW < 768) {
                    nbItemsToShow = 2;
                }
            } else if (carrousel.hasClass('carousel-div-4col')) {
                nbItemsToShow = 4;
                if (windowW < 480) {
                    nbItemsToShow = 1;
                } else if (windowW < 768) {
                    nbItemsToShow = 3;
                }
                if (carrousel.hasClass('carousel-div-xs-2col')) {
                    nbItemsToShow = 2;
                }
            } else if (carrousel.hasClass('carousel-div-5col')) {
                nbItemsToShow = 5;
                if (windowW < 480) {
                    nbItemsToShow = 1;
                } else if (windowW < 768) {
                    nbItemsToShow = 3;
                }
            }

            // Mode XS
            if (windowW < 480) {
                nbItemsToShow = 1;
                if (carrousel.hasClass('carousel-div-xs-2col')) {
                    nbItemsToShow = 2;
                }
                if (carrousel.hasClass('carousel-div-xs-3col')) {
                    nbItemsToShow = 3;
                }
                if (carrousel.hasClass('carousel-div-xs-4col')) {
                    nbItemsToShow = 4;
                }
            }

            // Si on a plus d'éléments affiché que nécessaire
            if (nbItemsShow != nbItemsToShow) {
                if (nbItemsShow > nbItemsToShow) {
                    // On cache les X derniers items
                    for (i = nbItemsToShow; i < nbItemsShow; ++i) {
                        carrousel.children(':visible:nth-child(' + (i + 1) + ')').hide();
                    }
                }
                // Si on a moins d'élément affiché que nécessaire
                else {
                    // On cache tout et on affiche que ce qu'il faut
                    carrousel.children(':visible').hide();
                    for (var i = 0; i < nbItemsToShow; i++) {
                        carrousel.children(':nth-child(' + (i + 1) + ')').show();
                    }
                }
            }

        });
    };
    var ubl_carousel_setup = function () {
        $('.carousel-div').each(function () {

            // On récupère les X premiers elements
            var carrousel = $(this),            // on cible le bloc du carrousel
                items = carrousel.children(),   // on cible les images contenues dans le carrousel
                indexItems = items.length - 1;  // on définit l'index du dernier élément

            // On cache tous les items
            carrousel.children().hide();

            // On réaffiche les X premiers items
            var defaultNbItemsShow = nbItemsShow = 4;

            if (carrousel.hasClass('carousel-div-1col')) {
                nbItemsShow = 1;
            }
            if (carrousel.hasClass('carousel-div-2col')) {
                nbItemsShow = 2;
            }
            if (carrousel.hasClass('carousel-div-3col')) {
                nbItemsShow = 3;
            }
            if (carrousel.hasClass('carousel-div-5col')) {
                nbItemsShow = 5;
            }

            if ($(this).data('nbitems') > 0) {
                nbItemsShow = $(this).data('nbitems');
            }
            for (var i = 0; i < nbItemsShow; i++) {
                var item = carrousel.children(':nth-child(' + (i + 1) + ')');
                item.show();
                if(nbItemsShow == 1){
                    carrousel.children().css('width','100%');
                }
            }

        });
        ubl_carousel_resize();
    };
    ubl_carousel_setup();

    var ubl_carousel_prev = function (carousel) {
        var nbVisibleItems = carousel.children(':visible').length;
        var firstItem = carousel.children(':visible').first();
        var lastItem = carousel.children(':visible').last();
        var prevItem = firstItem.prev();

        var curItems = carousel.children(':visible');
        var prevItems = firstItem.prevAll().slice(0, nbVisibleItems);
        var nbPrevItems = prevItems.length;

        // On vérifie qu'on a assez d'élément à afficher
        if( !firstItem.hasClass('active') ) {
            if (nbPrevItems >= nbVisibleItems) {
                curItems.fadeOut('fast', function () {
                    prevItems.fadeIn();
                });
            } else {
                if (prevItem.length > 0) {
                    lastItem.fadeOut('fast', function () {
                        prevItem.fadeIn();
                    });
                }
            }
        }

    };
    var ubl_carousel_next = function (carousel) {
        var nbVisibleItems = carousel.children(':visible').length;
        var firstItem = carousel.children(':visible').first();
        var lastItem = carousel.children(':visible').last();
        var nextItem = lastItem.next();
        var curItems = carousel.children(':visible:lt('+nbVisibleItems+')');
        var nextItems = lastItem.nextAll().slice(0, nbVisibleItems);
        var nbNextItems = nextItems.length;

        // On vérifie qu'on a assez d'élément à afficher
        if( !lastItem.hasClass('active') ) {
            if(nbNextItems>=nbVisibleItems){
                curItems.fadeOut('fast', function () {
                    nextItems.fadeIn();
                });
            } else {
                if (nextItem.length > 0) {
                    firstItem.fadeOut('fast', function () {
                        nextItem.fadeIn();
                    });
                }
            }
        }

        /*
        */

    };
    $('.carousel-control.left').on('click', function (e) {
        e.preventDefault();
        var carousel = $(this).parent().parent().find('.carousel-div');
        ubl_carousel_prev(carousel);
    });
    $('.carousel-control.right').on('click', function (e) {
        e.preventDefault();
        var carousel = $(this).parent().parent().find('.carousel-div');
        ubl_carousel_next(carousel);
    });
    $(window).on('resize', function () {
        ubl_carousel_resize();
    });

    /**********************************************************/
    /**
     * Menu principal responsive
     */

    var ubl_responsive_menu = function () {
        var windowW = window.innerWidth;
        if (windowW < 768) {
            $('#menu-main > .menu > li').each(function () {
                $(this).children('a').on('click', function (e) {
                    if ($(this).parent().hasClass('menu-item--expanded')) {
                        e.preventDefault();
                    }
                    if ($(this).parent().hasClass('active')) {
                        $(this).parent().removeClass('active');
                    } else {
                        $(this).parent().parent().find('.active').removeClass('active');
                        $(this).parent().addClass('active');
                    }
                });
                $(this).children('.sub-menu-wrapper').children('.menu').children().each(function () {
                    $(this).children('a').on('click', function (e) {
                        if ($(this).parent().hasClass('menu-item--expanded')) {
                            e.preventDefault();
                        }
                        if ($(this).parent().hasClass('active')) {
                            $(this).parent().removeClass('active');
                        } else {
                            $(this).parent().parent().find('.active').removeClass('active');
                            $(this).parent().addClass('active');
                        }
                    });
                });
            });
        }
    };
    $(window).on('resize', function () {
        ubl_responsive_menu();
    });
    ubl_responsive_menu();

    /**********/

    $('.share-mobile').on('click', function () {
        var sibling = $(this).siblings('.socials');
        if (sibling.is(':visible')) {
            sibling.hide();
        } else {
            sibling.show();
        }
    });
    $('.search-mobile .btn-default').on('click', function (e) {
        var search_input = $('.search-mobile .form-control');
        if (search_input.is(':visible')) {
            search_input.hide();
        } else {
            e.preventDefault();
            search_input.show();
        }
    });

    /**********************************************************/
    $('#edit-periode-min').datepicker({
        language: 'fr'
    });
    $('#edit-periode-max').datepicker({
        language: 'fr'
    });
    /**********************************************************/
    /**
     * Responsive
     */

    var ubl_responsive = function () {
        var windowW = window.innerWidth;
        if (windowW < 768) {
            // Page ACTU CHRONIQUES
            $('#block-views-block-actus-les-plus-lus-block-1').appendTo('#block-views-block-actus-en-ce-moment-block-1 .equalize-row');
            if (windowW < 480) {

            }
        } else {
            // Page ACTU CHRONIQUES
            $('#block-views-block-actus-les-plus-lus-block-1').insertAfter('#block-views-block-actus-en-ce-moment-block-1');
        }
    };

    $(window).on('resize', function () {
        ubl_responsive();
    });
    ubl_responsive();

    /**********************************************************/

}(jQuery));