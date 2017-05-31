'use strict';

function isMobile() {
  var width = $(window).width();
  if (width < 769) {
    return true;
  } else {
    return false;
  }
}

function pushAdriver() {
  $.get('http://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&bt=21&ad=609506&pid=2478462&bid=4803287&bn=4803287&rnd=' + parseInt(Math.random() * 10000000000));
}

var screens = {
  types: {
    0: 'landing',
    1: 'map',
    2: 'advice',
    3: 'collections'
  },
  activeName: false,
  setActiveName: function setActiveName(eq) {
    this.activeName = this.types[eq];
    ga('send', 'pageview', this.activeName);
  }
};

var Share = {
  vk: function vk(purl) {
    var url = 'http://vk.com/share.php?';
    url += 'url=' + encodeURIComponent(purl);
    url += '&noparse=true';
    this.popup(url);
  },
  fb: function fb(purl) {
    var url = 'https://www.facebook.com/sharer/sharer.php?u=';
    url += encodeURIComponent(purl);
    this.popup(url);
  },
  tw: function tw(purl) {
    var url = 'https://twitter.com/intent/tweet?text=';
    url += encodeURIComponent(purl);
    this.popup(url);
  },
  popup: function popup(url) {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
  },
  init: function init() {
    var t = this;
    var shorts = { vk: 'vkontakte', tw: 'twitter', fb: 'facebook' };
    $('[data-share]').on('click', function () {
      var link = $(this).attr('data-share-link');
      var type = $(this).attr('data-share');
      if (link == '' || !link) {
        link = window.location.href;
        ga('send', 'event', 'share', shorts[type], 'on-' + screens.activeName + '-screen');
      } else {
        ga('send', 'event', 'share-place', shorts[type], link);
      }
      t[type](link);
    });
  }
};

var screenType = {
  getScreenName: function getScreenName() {
    return isMobile() ? 'mobile' : 'desktop';
  },

  now: false,
  check: function check(first) {
    var t = this;
    var thisScreen = t.getScreenName();
    if (thisScreen != t.now) {
      t.now = thisScreen;
      if (!first) {
        window.location.href = '/';
      }
    }
  },
  init: function init() {
    var t = this;
    t.check(true);
    $(window).on('resize', function () {
      t.check(false);
    });
  }
};

$.fn.setRatio = function () {
  $(this).each(function () {
    var $this = $(this);
    var ratio = parseFloat($this.attr('data-ratio'));
    function setHeight() {
      var width = $this.outerWidth();
      var height = width / ratio;
      $this.css('height', height);
    }
    setHeight();
    $(window).on('resize', setHeight);
  });
};

var ScreenAnimation = {
  animations: {
    1: {
      back1: $('@an-main-b1')[0],
      back2: $('@an-main-b2')[0],
      message: $('@an-main-message')[0],
      logo: $('@an-main-logo')[0],
      title: $('@an-main-title')[0],
      text: $('@an-main-text')[0],
      downLink: $('@an-main-down-link')[0],
      forward: function forward() {
        var t = this;
        TweenLite.fromTo(t.back1, .5, { opacity: 0, y: 100 }, { delay: 0.5, opacity: 1, y: 0 });
        TweenLite.fromTo(t.back2, .5, { opacity: 0, y: 150 }, { delay: 0.55, opacity: 1, y: 0 });
        TweenLite.fromTo(t.message, .5, { opacity: 0, y: 100 }, { delay: 0.6, opacity: 1, y: 0 });
        TweenLite.fromTo(t.title, .5, { opacity: 0, y: 100 }, { delay: 0.65, opacity: 1, y: 0 });
        TweenLite.fromTo(t.text, .5, { opacity: 0, y: 100 }, { delay: 0.7, opacity: 1, y: 0 });
        TweenLite.fromTo(t.logo, .5, { opacity: 0, y: 100 }, { delay: 0.75, opacity: 1, y: 0 });
        TweenLite.fromTo(t.downLink, .5, { opacity: 0, y: 100 }, { delay: 0.75, opacity: 1, y: 0 });
      },
      back: function back() {
        var t = this;
        TweenLite.fromTo(t.back1, .5, { opacity: 0, y: -200 }, { delay: .0 + .5, opacity: 1, y: 0, ease: Power2.easeOut }); // .1
        TweenLite.fromTo(t.back2, .5, { opacity: 0, y: -250 }, { delay: .05 + .5, opacity: 1, y: 0, ease: Power2.easeOut }); // .05
        TweenLite.fromTo(t.message, .5, { opacity: 0, y: -200 }, { delay: .1 + .5, opacity: 1, y: 0, ease: Power2.easeOut }); // .0
        TweenLite.fromTo(t.title, .5, { opacity: 0, y: -200 }, { delay: .1 + .5, opacity: 1, y: 0, ease: Power2.easeOut }); // .0
        TweenLite.fromTo(t.text, .5, { opacity: 0, y: -200 }, { delay: .05 + .5, opacity: 1, y: 0, ease: Power2.easeOut }); // .05
        TweenLite.fromTo(t.logo, .5, { opacity: 0, y: -200 }, { delay: .0 + .5, opacity: 1, y: 0, ease: Power2.easeOut }); // .1
        TweenLite.fromTo(t.downLink, .5, { opacity: 0, y: -200 }, { delay: .0 + .5, opacity: 1, y: 0, ease: Power2.easeOut }); // .1
      },
      fadeBack: function fadeBack() {
        var t = this;
        TweenLite.fromTo(t.back1, .5, { opacity: 1, y: 0 }, { delay: .1, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.back2, .5, { opacity: 1, y: 0 }, { delay: .05, opacity: 0, y: -250, ease: Power2.easeIn });
        TweenLite.fromTo(t.message, .5, { opacity: 1, y: 0 }, { delay: 0, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.title, .5, { opacity: 1, y: 0 }, { delay: 0, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.text, .5, { opacity: 1, y: 0 }, { delay: .05, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.logo, .5, { opacity: 1, y: 0 }, { delay: .1, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.downLink, .5, { opacity: 1, y: 0 }, { delay: .1, opacity: 0, y: -200, ease: Power2.easeIn });
      }
    },
    2: {
      favorites: $('@an-map-favorites')[0],
      title: $('@an-map-title')[0],
      desc: $('@an-map-desc')[0],
      category: $('@an-map-category-wrap')[0],
      choose: $('@an-map-choose')[0],
      map: $('@an-map-map')[0],
      forward: function forward() {
        var t = this;
        // TweenLite.fromTo(t.favorites, .5, {opacity: 0, y: 200}, {delay: 0.5, opacity: 1, y: 0, ease: Power2.easeOut});
        TweenLite.fromTo(t.title, .5, { opacity: 0, y: 200 }, { delay: 0.55, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.desc, .5, { opacity: 0, y: 200 }, { delay: 0.6, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.category, .5, { opacity: 0, y: 200 }, { delay: 0.65, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.map, .5, { opacity: 0, y: 0 }, { delay: 0.7, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.choose, .5, { opacity: 0, y: 200 }, { delay: 0.8, opacity: 1, y: 0, ease: Power2.easeOut });
      },
      back: function back() {
        var t = this;
        // TweenLite.fromTo(t.favorites, .5, {opacity: 0, y: -200}, {delay: 0.8, opacity: 1, y: 0, ease: Power2.easeOut});
        TweenLite.fromTo(t.title, .5, { opacity: 0, y: -200 }, { delay: 0.75, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.desc, .5, { opacity: 0, y: -200 }, { delay: 0.7, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.category, .5, { opacity: 0, y: -200 }, { delay: 0.65, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.map, .5, { opacity: 0, y: 0 }, { delay: 0.6, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.choose, .5, { opacity: 0, y: -200 }, { delay: 0.5, opacity: 1, y: 0, ease: Power2.easeOut });
      },
      fadeBack: function fadeBack() {
        var t = this;
        // TweenLite.fromTo(t.favorites, .5, {opacity: 1, y: 0}, {delay: 0, opacity: 0, y: -200, ease: Power2.easeIn});
        TweenLite.fromTo(t.title, .5, { opacity: 1, y: 0 }, { delay: 0.05, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.desc, .5, { opacity: 1, y: 0 }, { delay: 0.1, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.category, .5, { opacity: 1, y: 0 }, { delay: 0.15, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.choose, .5, { opacity: 1, y: 0 }, { delay: .3, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.map, .5, { opacity: 1, y: 0 }, { delay: 0, opacity: 0, y: 0, ease: Power2.easeIn });
      },
      fadeForward: function fadeForward() {
        var t = this;
        // TweenLite.fromTo(t.favorites, .5, {opacity: 1, y: 0}, {delay: .3, opacity: 0, y: 200, ease: Power2.easeIn});
        TweenLite.fromTo(t.title, .5, { opacity: 1, y: 0 }, { delay: .25, opacity: 0, y: 200, ease: Power2.easeIn });
        TweenLite.fromTo(t.desc, .5, { opacity: 1, y: 0 }, { delay: .2, opacity: 0, y: 200, ease: Power2.easeIn });
        TweenLite.fromTo(t.category, .5, { opacity: 1, y: 0 }, { delay: .15, opacity: 0, y: 200, ease: Power2.easeIn });
        TweenLite.fromTo(t.map, .5, { opacity: 1, y: 0 }, { delay: 0, opacity: 0, y: 0, ease: Power2.easeIn });
        TweenLite.fromTo(t.choose, .5, { opacity: 1, y: 0 }, { delay: 0, opacity: 0, y: 200, ease: Power2.easeIn });
      }
    },
    3: {
      favorite: $('@an-advice-favorite')[0],
      title: $('@an-advice-title')[0],
      preview: $('@an-advice-preview')[0],
      desc: $('@an-advice-desc')[0],
      count: $('@an-advice-count')[0],
      slideTitle: $('@an-advice-slide-title')[0],
      slideDesc: $('@an-advice-slide-desc')[0],
      circle: $('@an-advice-circle')[0],
      circle2: $('@an-advice-circle2')[0],
      slider: $('@an-advice-slider')[0],
      forward: function forward() {
        var t = this;
        // TweenLite.fromTo(t.favorite, .5, {opacity: 0, y: 200}, {delay: .5, opacity: 1, y: 0, ease: Power2.easeOut});
        TweenLite.fromTo(t.title, .5, { opacity: 0, y: 200 }, { delay: .55, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.preview, .5, { opacity: 0, y: 250 }, { delay: .6, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.desc, .5, { opacity: 0, y: 300 }, { delay: .65, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.count, .5, { opacity: 0, y: 200 }, { delay: .65, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.slider, .5, { opacity: 0, y: 200 }, { delay: .7, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.slideDesc, .5, { opacity: 0, y: 100 }, { delay: .75, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.circle2, .5, { opacity: 0, y: 0 }, { delay: .8, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.circle, .5, { opacity: 0, y: 0 }, { delay: .85, opacity: 1, y: 0, ease: Power2.easeOut });
      },
      back: function back() {
        var t = this;
        // TweenLite.fromTo(t.favorite, .5, {opacity: 0, y: -200}, {delay: .85, opacity: 1, y: 0, ease: Power2.easeOut}); // .5
        TweenLite.fromTo(t.title, .5, { opacity: 0, y: -200 }, { delay: .8, opacity: 1, y: 0, ease: Power2.easeOut }); // .55
        TweenLite.fromTo(t.preview, .5, { opacity: 0, y: -250 }, { delay: .75, opacity: 1, y: 0, ease: Power2.easeOut }); // .6
        TweenLite.fromTo(t.desc, .5, { opacity: 0, y: -300 }, { delay: .7, opacity: 1, y: 0, ease: Power2.easeOut }); // .65
        TweenLite.fromTo(t.count, .5, { opacity: 0, y: -200 }, { delay: .7, opacity: 1, y: 0, ease: Power2.easeOut }); // .65
        TweenLite.fromTo(t.slider, .5, { opacity: 0, y: -200 }, { delay: .65, opacity: 1, y: 0, ease: Power2.easeOut }); // .7
        TweenLite.fromTo(t.slideDesc, .5, { opacity: 0, y: -100 }, { delay: .6, opacity: 1, y: 0, ease: Power2.easeOut }); // .75
        TweenLite.fromTo(t.circle2, .5, { opacity: 0, y: 0 }, { delay: .55, opacity: 1, y: 0, ease: Power2.easeOut }); // .8
        TweenLite.fromTo(t.circle, .5, { opacity: 0, y: 0 }, { delay: .5, opacity: 1, y: 0, ease: Power2.easeOut }); // .85
      },
      fadeBack: function fadeBack() {
        var t = this;
        // TweenLite.fromTo(t.favorite, .5, {opacity: 1, y: 0}, {delay: 0, opacity: 0, y: -200, ease: Power2.easeIn});
        TweenLite.fromTo(t.title, .5, { opacity: 1, y: 0 }, { delay: .05, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.preview, .5, { opacity: 1, y: 0 }, { delay: .1, opacity: 0, y: -250, ease: Power2.easeIn });
        TweenLite.fromTo(t.desc, .5, { opacity: 1, y: 0 }, { delay: .15, opacity: 0, y: -300, ease: Power2.easeIn });
        TweenLite.fromTo(t.count, .5, { opacity: 1, y: 0 }, { delay: .15, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.slider, .5, { opacity: 1, y: 0 }, { delay: .2, opacity: 0, y: -200, ease: Power2.easeIn });
        TweenLite.fromTo(t.slideDesc, .5, { opacity: 1, y: 0 }, { delay: .2, opacity: 0, y: 50, ease: Power2.easeIn });
        TweenLite.fromTo(t.circle2, .5, { opacity: 1, y: 0 }, { delay: .3, opacity: 0, y: 0, ease: Power2.easeIn });
        TweenLite.fromTo(t.circle, .5, { opacity: 1, y: 0 }, { delay: .35, opacity: 0, y: 0, ease: Power2.easeIn });
      },
      fadeForward: function fadeForward() {
        var t = this;
        // TweenLite.fromTo(t.favorite, .5, {opacity: 1, y: 0}, {delay: .85-.5, opacity: 0, y: 200, ease: Power2.easeIn});
        TweenLite.fromTo(t.title, .5, { opacity: 1, y: 0 }, { delay: .8 - .5, opacity: 0, y: 200, ease: Power2.easeIn });
        TweenLite.fromTo(t.preview, .5, { opacity: 1, y: 0 }, { delay: .75 - .5, opacity: 0, y: 250, ease: Power2.easeIn });
        TweenLite.fromTo(t.desc, .5, { opacity: 1, y: 0 }, { delay: .7 - .5, opacity: 0, y: 300, ease: Power2.easeIn });
        TweenLite.fromTo(t.count, .5, { opacity: 1, y: 0 }, { delay: .7 - .5, opacity: 0, y: 200, ease: Power2.easeIn });
        TweenLite.fromTo(t.slider, .5, { opacity: 1, y: 0 }, { delay: .65 - .5, opacity: 0, y: 200, ease: Power2.easeIn });
        TweenLite.fromTo(t.slideDesc, .5, { opacity: 1, y: 0 }, { delay: .6 - .5, opacity: 0, y: 100, ease: Power2.easeIn });
        TweenLite.fromTo(t.circle2, .5, { opacity: 1, y: 0 }, { delay: .55 - .5, opacity: 0, y: 0, ease: Power2.easeIn });
        TweenLite.fromTo(t.circle, .5, { opacity: 1, y: 0 }, { delay: .5 - .5, opacity: 0, y: 0, ease: Power2.easeIn });
      }
    },
    4: {
      favorite: $('@an-collection-favorite')[0],
      title: $('@an-collection-title')[0],
      collection: $('@an-collection-item'),
      info: $('@an-collection-info'),
      forward: function forward() {
        var t = this;
        // TweenLite.fromTo(t.favorite, .5, {opacity: 0, y: 200}, {delay: 0.5, opacity: 1, y: 0, ease: Power2.easeOut});
        TweenLite.fromTo(t.title, .5, { opacity: 0, y: 200 }, { delay: 0.55, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.collection[0], .5, { opacity: 0, y: 300 }, { delay: 0.6, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.collection[1], .5, { opacity: 0, y: 300 }, { delay: 0.65, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.collection[2], .5, { opacity: 0, y: 300 }, { delay: 0.7, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.collection[3], .5, { opacity: 0, y: 300 }, { delay: 0.75, opacity: 1, y: 0, ease: Power2.easeOut });
        TweenLite.fromTo(t.info, .5, { opacity: 0, y: 300 }, { delay: 0.75, opacity: 1, y: 0, ease: Power2.easeOut });
      },
      back: function back() {
        var t = this;
      },
      fadeBack: function fadeBack() {
        var t = this;
      },
      fadeForward: function fadeForward() {
        var t = this;
        // TweenLite.fromTo(t.favorite, .5, {opacity: 1, y: 0}, {delay: .25, opacity: 0, y: 200, ease: Power2.easeIn});
        TweenLite.fromTo(t.title, .5, { opacity: 1, y: 0 }, { delay: .2, opacity: 0, y: 200, ease: Power2.easeIn });
        TweenLite.fromTo(t.collection[0], .5, { opacity: 1, y: 0 }, { delay: .175, opacity: 0, y: 300, ease: Power2.easeIn });
        TweenLite.fromTo(t.collection[1], .5, { opacity: 1, y: 0 }, { delay: .15, opacity: 0, y: 300, ease: Power2.easeIn });
        TweenLite.fromTo(t.collection[2], .5, { opacity: 1, y: 0 }, { delay: .1, opacity: 0, y: 300, ease: Power2.easeIn });
        TweenLite.fromTo(t.collection[3], .5, { opacity: 1, y: 0 }, { delay: .0, opacity: 0, y: 300, ease: Power2.easeIn });
        TweenLite.fromTo(t.info, .5, { opacity: 1, y: 0 }, { delay: .0, opacity: 0, y: 300, ease: Power2.easeIn });
      }
    }
  },
  get: function get(index, nextIndex) {
    if (this.animations[nextIndex]) {
      this.animations[nextIndex][nextIndex > index ? 'forward' : 'back']();
    }
    if (this.animations[index]) {
      this.animations[index][index > nextIndex ? 'fadeForward' : 'fadeBack']();
    }
  }
};

var fullPage = {
  setActiveMenuItem: function setActiveMenuItem(number) {
    var actualNumber = number - 2;
    var $nav = $('@right-nav');
    var $links = $('@right-link');
    var $share = $('@fixed-share');
    var $favorites = $('@fixed-favorites');
    var $logo = $('@fixed-logo');
    if (actualNumber >= 0) {
      $nav.hasClass('isActive') ? '' : $nav.addClass('isActive');
      $links.eq(actualNumber).addClass('isActive').siblings().removeClass('isActive');
      $share.addClass('isActive');
      $logo.addClass('isActive');
      $favorites.addClass('isActive');
    } else {
      $links.removeClass('isActive');
      $nav.removeClass('isActive');
      $share.removeClass('isActive');
      $logo.removeClass('isActive');
      $favorites.removeClass('isActive');
    }
    screens.setActiveName(number - 1);
  },
  init: function init() {
    var t = this;
    pushAdriver();
    screens.setActiveName(0);
    ScreenAnimation.get(0, 1);
    var delay = 500;
    var timeoutId;
    var animationIsFinished = true;
    $('@container').fullpage({
      normalScrollElements: '@categories-main-list, @favorites-container',
      anchors: ['', 'map', 'advice', 'collections'],
      onLeave: function onLeave(index, nextIndex, direction) {
        var curTime = new Date().getTime();
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
          animationIsFinished = true;
          $.fn.fullpage.moveTo(nextIndex);
          t.setActiveMenuItem(nextIndex);
          pushAdriver();
        }, delay);
        if (animationIsFinished) {
          ScreenAnimation.get(index, nextIndex);
        }
        return animationIsFinished;
      },

      responsiveWidth: 768
    });
    $('@right-link').on('click', function () {
      ga('send', 'event', 'right-navigation', 'go-to-' + $(this).attr('href').substr(1), 'on-' + screens.activeName + '-screen');
    });
  }
};

var svgImages = {
  init: function init() {
    $('@svg').each(function () {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      jQuery.get(imgURL, function (data) {
        var $svg = jQuery(data).find('svg');
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
      }, 'xml');
    });
  }
};

var customScroll = {
  init: function init() {
    if (isMobile()) {
      $('@place-scroll, @categories-main-list, @favorites-container, @categories-container').mCustomScrollbar({
        scrollbarPosition: 'outside'
      });
    } else {
      $('@place-scroll, @categories-main-list, @places-container, @favorites-container, @categories-container').mCustomScrollbar({
        scrollbarPosition: 'outside'
      });
    }
  }
};

function getByInsideValue(index, value, array) {
  var output = [];
  $.each(array, function (i, v) {
    if (v[index] == value) {
      output.push(v);
    }
  });
  return output;
}

function saveOriginalMapCoords() {
  $('map area').each(function () {
    $(this).attr('data-original-coords', $(this).attr('coords'));
  });
}

function getTag(tags, nobr) {
  if (tags) {
    if (tags.length) {
      return '#' + tags[0].replace(/\s/g, '') + (nobr ? '' : '<br>');
    }
  } else {
    return '';
  }
}

var moscowMap = {
  $regionClose: $('@region-close'),
  $regionScreen: $('@region-screen'),
  $regionImage: $('[data-region-image]'),
  $regionLink: $('[data-region-link]'),
  $openCategories: $('@choose-category-link'),
  $openCategoriesContainer: $('@choose-category-container'),
  $categoriesMainList: $('@categories-main-list'),
  $categoryPreviewContainer: $('@category-preview-container'),
  $categoryDescription: $('@category-description'),
  $favoritesOpen: $('@favorites-open'),
  $favoritesClose: $('@favorites-close'),
  $favorites: $('@favorites'),
  $places: $('@places'),
  $place: $('@place'),
  $categories: $('@categories'),
  $closePlace: $('@place-close'),
  $closeCategories: $('@categories-close'),
  $zoom: $('@region-zoom'),
  $regionsWrap: $('@regions-wrap'),
  $like: $('@current-place-like'),
  state: {
    region: false,
    category: false,
    place: false,
    zoom: false
  },
  setCategoryPreviewHeight: function setCategoryPreviewHeight() {
    var t = this;
    function setHeight() {
      var sectionTop = t.$categoryPreviewContainer.parents('.section').offset().top;
      var bottom = parseInt(t.$openCategoriesContainer.css('bottom'));
      var top = t.$categoryPreviewContainer.offset().top;
      var height = $(window).height() - (top - sectionTop + bottom);
      if (isMobile()) {
        t.$categoryPreviewContainer.css('height', 'auto');
      } else {
        t.$categoryPreviewContainer.css('height', height);
      }
    }
    setHeight();
    $(window).on('resize', function () {
      setHeight();
    });
  },
  setPlacesContainerHeight: function setPlacesContainerHeight(noTrigger) {
    var t = this;
    var $container = $('@places-container');
    var height = $(window).height() - $container.offset().top;
    setTimeout(function () {
      $container.css({
        height: height
      });
    }, 100);
  },
  setCategory: function setCategory(id) {
    var t = this;
    t.state.category = id;
    t.$places.addClass('isActive');
    var category = DB.categories[id];
    var thisEvents;
    $('@current-category-title').html(category.name);
    $('@current-category-desc').html(category.desc);
    $('@current-category-shortDesc').html(category.short_desc);
    var eventsCount;
    if (id == 'all') {
      eventsCount = DB.events.length;
    } else {
      eventsCount = getByInsideValue('category', id, DB.events).length;
    }
    $('@current-category-count').html(eventsCount + ' ' + declOfNum(eventsCount, ['место', 'места', 'мест']));
    $('@current-category-icon').css({
      'background-image': 'url(images/categories/' + category.icon + ')'
    });
    if (id == 'all') {
      thisEvents = DB.events;
      $('@category-info-regular').hide();
      $('@category-info-all').show();
      var categoriesHTML = [];
      $.each(DB.categories, function (i, v) {
        if (i == 'all') return;
        categoriesHTML.push('<div class="categories-all-item"><div class="icon" style="background-image: url(images/categories/' + v.icon + ')"></div><div class="text" data-count-region="' + i + '" data-just-number="1"></div></div>');
      });
      $('@categories-all-list').html(categoriesHTML.join(''));
    } else {
      thisEvents = getByInsideValue('category', id, DB.events);
      $('@category-info-regular').show();
      $('@category-info-all').hide();
    }
    var examplesHTML = [];
    var examplesI = 0;
    $.each(thisEvents, function (i, v) {
      if (examplesI > 1) return;
      var tag = getTag(v.tags);
      examplesHTML.push('<a href="#" data-place-link="' + v.id + '" onclick="ga(\'send\', \'event\', \'open-place\', \'' + v.site_url + '\', \'on-map-screen\');" class="category-example"><span class="title">' + v.title + '</span><span class="desc">' + tag + v.subway + '</span></a>');
      examplesI++;
    });
    $('@current-category-examples').html(examplesHTML.join(''));
    t.closeCategories();
    t.putPlaces();
    t.setDots();
    t.setPlacesContainerHeight();
    t.countCategories();
    if (isMobile()) {
      CategoryDrag.calcMax();
      CategoryDrag.setHeight(0);
      CategoryDrag.isOpened = false;
      mobilePopup.close('categories');
      $('@category-select-list').find('[data-category-link="' + id + '"]').hide().siblings().show();
    }
  },
  putPlaces: function putPlaces() {
    var t = this;
    if (!(t.state.category !== false && t.state.region !== false)) return;
    var placesArray = [];
    var eventsByCategory;
    if (t.state.category == 'all') {
      eventsByCategory = DB.events;
    } else {
      eventsByCategory = getByInsideValue('category', t.state.category, DB.events);
    }
    var thisEvents = [];
    $.each(eventsByCategory, function (i, v) {
      if (v.region == t.state.region) {
        thisEvents.push(v);
      }
    });
    var eventsHTML = [];
    $.each(thisEvents, function (i, v) {
      var tag = getTag(v.tags);
      eventsHTML.push('<dt data-place-link="' + v.id + '" class="place" onclick="ga(\'send\', \'event\', \'open-place\', \'' + v.site_url + '\', \'from-categories-list\');">\n                        <div class="title">' + v.title + '</div>\n                        <div class="desc">' + tag + v.subway + '</div>\n                      </dt>');
    });
    var $placesList = $('@places-list');
    if (thisEvents.length == 0) {
      var exampleCategories = [];
      var emptyHTML = [];
      var count = 0;
      var regionObj = REGIONS[t.state.region];
      emptyHTML.push('<dt class="place -empty">\n                        <div class="empty-text">\u0412&nbsp;' + regionObj.name + ' \u043D\u0435&nbsp;\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0441\u043E\u0431\u044B\u0442\u0438\u0439  \u043A \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438.<br>\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0432\u0430\u0441 \u0437\u0430\u0438\u043D\u0442\u0443\u0440\u0435\u0441\u0443\u044E\u0442  \u0434\u0440\u0443\u0433\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438?</div>\n                      </dt>');
      $.each(DB.categories, function (i, v) {
        if (count > 2) return;
        if (i != t.state.category && i != 'all' && t.state.count[i] != 0) {
          emptyHTML.push('<div data-category-link="' + i + '" class="category-description -link">\n                            <div class="left-side">\n                              <div class="icon" style="background-image: url(images/categories/' + v.icon + ');"></div>\n                            </div>\n                            <div class="right-side">\n                              <div class="category-card -inList">\n                                <div class="title">' + v.name + '</div>\n                                <div class="desc"><span class="text">' + v.short_desc + '</span><span class="count" data-count-region="' + i + '"></span></div>\n                              </div>\n                            </div>\n                          </div>');
          count++;
        }
      });
      $placesList.html(emptyHTML.join(''));
    } else {
      $placesList.html(eventsHTML.join(''));
    }
  },
  closeCategories: function closeCategories() {
    var t = this;
    t.$categoryDescription.removeClass('isHidden');
    t.$categoriesMainList.removeClass('isActive');
    t.$openCategories.removeClass('isActive');
    t.$openCategoriesContainer.removeClass('isActive');
    t.$categories.removeClass('isActive');
  },
  openPlace: function openPlace(id) {
    var t = this;
    t.state.place = id;
    t.$place.addClass('isActive');
    t.closeFavorites();
    var event = getByInsideValue('id', id, DB.events)[0];
    $('@current-place-title').html(event.title);
    $('@current-place-tag').html(getTag(event.tags, true));
    $('@current-place-description').html(event.description);
    $('@current-place-subway').html(event.subway);
    $('@current-place-address').html(event.address);
    $('@current-place-link').attr('href', event.site_url);
    $('@current-place-image').css({
      'background-image': 'url(' + event.images[0].image + ')'
    });
    $('@popup-share [data-share]').each(function () {
      $(this).attr('data-share-link', event.site_url);
    });
    var favorite_places = [];
    if (localStorage.getItem('favorite_places')) {
      favorite_places = localStorage.getItem('favorite_places').split(',');
    }
    if ($.inArray(id + '', favorite_places) > -1) {
      t.$like.addClass('isActive');
    } else {
      t.$like.removeClass('isActive');
    }
    if (!t.state.region) {
      t.openRegion(event.region);
      if (!isMobile()) {
        $.fn.fullpage.setAllowScrolling(false);
      }
    } else {
      t.setRegion(event.region);
    }
    $('@dot[data-place-link="' + id + '"]').addClass('isActive').siblings().removeClass('isActive');
    if (isMobile()) {
      mobilePopup.close('popular');
    }
  },
  closePlace: function closePlace() {
    var t = this;
    t.state.place = false;
    t.$place.removeClass('isActive');
    $('@dot[data-place-link]').removeClass('isActive');
  },
  openCategories: function openCategories() {
    var t = this;
    t.$categoryDescription.addClass('isHidden');
    t.$categoriesMainList.addClass('isActive');
    t.$openCategories.addClass('isActive');
    t.$openCategoriesContainer.addClass('isActive');
    t.$places.removeClass('isActive');
    t.$place.removeClass('isActive');
    t.$categories.addClass('isActive');
  },

  mapHoverTimeout: false,
  mapHover: function mapHover($elem, remove) {
    var t = this;
    var region = $elem.data('region-link');
    var regionObj = REGIONS[region];
    var $regionElems = $('.-region-' + region + ', [data-region-label="' + region + '"]');
    var $regionTitle = $('@region-title');
    clearTimeout(t.mapHoverTimeout);
    if (remove) {
      $regionElems.removeClass('isHovered');
      if (t.state.region) {
        t.mapHoverTimeout = setTimeout(function () {
          $regionTitle.html(REGIONS[t.state.region].name);
        }, 150);
      }
    } else {
      $regionElems.addClass('isHovered');
      $regionTitle.html(regionObj.name);
    }
  },
  setRegion: function setRegion(region) {
    var t = this;
    t.state.region = region;
    var regionObj = REGIONS[region];
    var $region = $('[data-region="' + region + '"]');
    $region.addClass('isActive').siblings('[data-region]').removeClass('isActive');
    var $regionSvg = $('.-region-' + region);
    $regionSvg.addClass('isActive').siblings('.region').removeClass('isActive');
    t.setRegionSize();
    t.countCategories();
    $('@title-select-list').find('[data-region-link="' + region + '"]').hide().siblings().show();
    RegionSelect.close();
  },
  setRegionSize: function setRegionSize(onlyPosition) {
    var t = this;
    var region = t.state.region;
    if (!region) return;
    var $region = $('[data-region="' + region + '"]');
    var $map = $region.find('map');
    var $image = $region.find('@region-image');
    var $wrap = $('@regions-wrap');
    var regionObj = REGIONS[region];
    // var percentsHeight = parseInt(regionObj.imageSizes.h / (1235 / 100));
    var percentsHeight = regionObj.mapHeight;
    if (isMobile()) percentsHeight = percentsHeight * 1.5;
    var cof = t.state.zoom ? 1.5 : 1;
    var regionMaxWH = $wrap.height() > $wrap.width() ? $wrap.width() * cof : $wrap.height() * cof;
    var pixelsHeight = regionMaxWH * (percentsHeight / 100);
    var changePercents = pixelsHeight / (regionObj.imageSizes.h / 100) / 100;
    var pixelsWidth = regionObj.imageSizes.w * changePercents;
    if (!onlyPosition) {
      $image.css({
        height: pixelsHeight
      });
      $map.find('area').each(function () {
        var newCoords = [];
        var oldCoords = $(this).attr('data-original-coords').split(',');
        $.each(oldCoords, function (i, v) {
          newCoords.push(v * changePercents);
        });
        $(this).attr('coords', newCoords.join(','));
      });
    }
    var newPosition = {
      top: $wrap.height() / 2 - pixelsHeight / 2 + t.state.changePosition.y,
      left: $wrap.width() / 2 - pixelsWidth / 2 + t.state.changePosition.x
    };
    if (newPosition.top > $wrap.height() / 2) {
      newPosition.top = $wrap.height() / 2;
    }
    if (newPosition.left > $wrap.width() / 2) {
      newPosition.left = $wrap.width() / 2;
    }
    if (newPosition.top < $wrap.height() / 2 - pixelsHeight) {
      newPosition.top = $wrap.height() / 2 - pixelsHeight;
    }
    if (newPosition.left < $wrap.width() / 2 - pixelsWidth) {
      newPosition.left = $wrap.width() / 2 - pixelsWidth;
    }
    $region.css({
      top: newPosition.top,
      left: newPosition.left
    });
  },
  setDots: function setDots() {
    var t = this;
    if (!(t.state.region && t.state.category !== false)) return;
    var $wrap = $('@dots-container');
    $wrap.empty();
    var eventsByCategory;
    if (t.state.category == 'all') {
      eventsByCategory = DB.events;
    } else {
      eventsByCategory = getByInsideValue('category', t.state.category, DB.events);
    }
    var thisEvents = [];
    $.each(eventsByCategory, function (i, v) {
      if (v.region == t.state.region) {
        thisEvents.push(v);
      }
    });
    $.each(thisEvents, function (i, v) {
      var coords = REGIONS[t.state.region].coords;
      var left = (v.coords.lon - coords.left) / ((coords.right - coords.left) / 100);
      var top = (v.coords.lat - coords.top) / ((coords.bottom - coords.top) / 100) * 0.875;
      if (v.id == 28717) left = 6; // KOSTYL'
      $wrap.append('<a style="top: ' + top + '%; left: ' + left + '%;" data-place-link="' + v.id + '" onclick="ga(\'send\', \'event\', \'open-place\', \'' + v.site_url + '\', \'from-region-map\');" role="dot" class="dot"></a>');
    });
  },
  openRegion: function openRegion(region) {
    var t = this;
    t.zoomOut();
    t.$regionScreen.show();
    MobileMapTabs.show('map');
    var regionObj = REGIONS[region];
    var $region = $('[data-region="' + region + '"]');
    $('@region-title').html(regionObj.name);
    $region.siblings('[data-region]').removeClass('isTransition');
    setTimeout(function () {
      $region.addClass('isTransition');
      t.$regionScreen.addClass('isActive');
    }, 10);
    t.setRegion(region);
    t.putPlaces();
    t.setDots();
    if (t.state.category) {
      t.setPlacesContainerHeight();
    }
    ga('send', 'pageview', 'region-' + region);
    if (!isMobile()) {
      $.fn.fullpage.setAllowScrolling(false);
    }
  },
  closeRegion: function closeRegion() {
    var t = this;
    t.state.region = false;
    t.$regionScreen.removeClass('isActive');
    setTimeout(function () {
      t.$regionScreen.hide();
    }, 400);
    $('.region').removeClass('isActive');
    if (!isMobile()) {
      $.fn.fullpage.setAllowScrolling(true);
    }
    t.countCategories();
  },
  openFavorites: function openFavorites() {
    var t = this;
    t.$favorites.addClass('isActive');
  },
  closeFavorites: function closeFavorites() {
    var t = this;
    t.$favorites.removeClass('isActive');
  },
  putCategories: function putCategories() {
    var t = this;
    var mainHTML = [];
    var regionHTML = [];
    var selectHTML = [];
    $.each(DB.categories, function (i, v) {
      var select = '<div data-category-link="' + i + '" class="category-description">\n                      <div class="left-side">\n                        <div class="icon" style="background-image: url(images/categories/' + v.icon + ');"></div>\n                      </div>\n                      <div class="right-side">\n                        <div class="category-card">\n                          <div class="title">' + v.name + '</div>\n                        </div>\n                      </div>\n                    </div>';
      selectHTML.push(select);
      if (i == 'all') return;
      var main = '<div data-category-link="' + i + '" class="category-description -link">\n                    <div class="left-side">\n                      <div class="icon" style="background-image: url(images/categories/' + v.icon + ');"></div>\n                    </div>\n                    <div class="right-side">\n                      <div class="category-card -xs">\n                        <div class="title">' + v.name + '</div>\n                        <div class="desc"><span class="text">' + v.short_desc + '</span><span class="count" data-count-region="' + i + '"></span></div>\n                      </div>\n                    </div>\n                  </div>';
      var region = '<div data-category-link="' + i + '" class="category-description -link">\n                      <div class="left-side">\n                        <div class="icon" style="background-image: url(images/categories/' + v.icon + ');"></div>\n                      </div>\n                      <div class="right-side">\n                        <div class="category-card -inList">\n                          <div class="title">' + v.name + '</div>\n                          <div class="desc"><span class="text">' + v.short_desc + '</span><span class="count" data-count-region="' + i + '"></span></div>\n                        </div>\n                      </div>\n                    </div>';
      mainHTML.push(main);
      regionHTML.push(region);
    });
    $('@categories-main-list').html(mainHTML.join(''));
    $('@categories-region-list').html(regionHTML.join(''));
    $('@mobile-categories').html(regionHTML.join(''));
    $('@category-select-list').html(selectHTML.join(''));
    t.countCategories();
  },
  countCategories: function countCategories() {
    var t = this;
    t.state.count = {};
    $('[data-count-region], [data-count-category]').each(function () {
      var region, category;
      if ($(this).is('[data-count-category]')) {
        region = $(this).attr('data-count-category');
        category = t.state.category;
      } else {
        region = t.state.region;
        category = parseInt($(this).attr('data-count-region'));
      }
      var $this = $(this);
      var placesInCategory = 0;
      var events;
      if (category == 'all') {
        events = DB.events;
      } else {
        events = getByInsideValue('category', category, DB.events);
      }
      if (region) {
        $.each(events, function (i, v) {
          if (v.region == region) {
            placesInCategory++;
          }
        });
      } else {
        placesInCategory = events.length;
      }
      t.state.count[category] = placesInCategory;
      $this.html(placesInCategory + ($this.attr('data-just-number') == 1 ? '' : ' ' + declOfNum(placesInCategory, ['место', 'места', 'мест'])));
    });
  },
  zoomIn: function zoomIn() {
    var t = this;
    t.$zoom.addClass('isActive');
    t.$regionsWrap.addClass('isZoom');
    setTimeout(function () {
      t.setRegionSize();
    }, 10);
    t.state.zoom = true;
  },
  zoomOut: function zoomOut() {
    var t = this;
    t.state.zoom = false;
    t.state.changePosition = { x: 0, y: 0 };
    t.$zoom.removeClass('isActive');
    t.$regionsWrap.removeClass('isZoom');
    t.setRegionSize();
  },
  regionDrag: function regionDrag(e) {
    var t = this;
    var startX = t.allowDrag.pageX;
    var startY = t.allowDrag.pageY;
    var nowX = cursorPosition(e).x;
    var nowY = cursorPosition(e).y;
    var changeX = nowX - startX + t.allowDrag.lastX;
    var changeY = nowY - startY + t.allowDrag.lastY;
    t.state.changePosition = {
      x: changeX,
      y: changeY
    };
    t.setRegionSize(true);
  },
  enableDrag: function enableDrag(e) {
    var t = this;
    t.allowDrag = {
      pageX: cursorPosition(e).x,
      pageY: cursorPosition(e).y,
      lastX: t.state.changePosition.x,
      lastY: t.state.changePosition.y
    };
    $('[data-region=' + t.state.region + ']').removeClass('isTransition');
  },
  disableDrag: function disableDrag() {
    var t = this;
    if (!t.allowDrag) return;
    t.allowDrag = false;
    $('[data-region=' + t.state.region + ']').addClass('isTransition');
  },
  showLikePopup: function showLikePopup() {
    var t = this;
    $('@popup-like').show();
    clearTimeout(t.likeTimeout);
  },
  closeLikePopup: function closeLikePopup() {
    var t = this;
    t.likeTimeout = setTimeout(function () {
      $('@popup-like').hide();
    }, 500);
  },
  like: function like(id) {
    var t = this;
    if (!id) {
      id = t.state.place;
    }
    var placesArray = localStorage.getItem('favorite_places');
    if (placesArray == null || !placesArray) {
      placesArray = [];
    } else {
      placesArray = placesArray.split(',');
    }
    if ($.inArray(id + '', placesArray) > -1) {
      var index = placesArray.indexOf(id + '');
      if (index > -1) {
        placesArray.splice(index, 1);
      }
      t.$like.removeClass('isActive');
    } else {
      placesArray.push(id);
      t.$like.addClass('isActive');
      t.showLikePopup();
    }
    localStorage.setItem('favorite_places', placesArray);
    t.putFavorites();
  },
  putFavorites: function putFavorites() {
    var t = this;
    var places = localStorage.getItem('favorite_places');
    if (places) {
      places = places.split(',');
    }
    var favoritesHTML = [];
    $.each(places, function (i, v) {
      var place = getByInsideValue('id', v, DB.events)[0];
      if (!place) return;
      var tag = getTag(place.tags);
      favoritesHTML.push('<dt class="place" data-place-link="' + v + '">\n                            <div class="title">' + place.title + '</div>\n                            <div class="desc">' + tag + place.address + '</div><a href="#" class="delete" data-place-id="' + v + '" role="favorite-delete">\n                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\n                              <polygon id="Rectangle_3_copy_3" points="25.022 22.191 22.193 25.021 13 15.829 3.808 25.022 0.979 22.192 10.171 13 0.979 3.808 3.808 0.979 13 10.17 22.192 0.979 25.021 3.808 15.83 13"></polygon>\n                            </svg></a>\n                          </dt>');
    });
    $('@favorites-places').html(favoritesHTML.join(''));
  },
  openPopular: function openPopular(region) {
    var t = this;
    var $list = $('@popular-list');
    var html = [];
    var count = 0;
    $.each(DB.events, function (i, v) {
      if (count < 2 && v.region == region && (v.category == t.state.category || t.state.category == 'all')) {
        var tag = getTag(v.tags);
        html.push('<a href="#" class="popular-item" data-place-link="' + v.id + '">\n                    <span class="title">' + v.title + '</span>\n                    <span class="desc">' + tag + v.subway + '</span>\n                  </a>');
        count++;
      }
    });
    $list.html(html.join(''));
    $('@region-popular-title').html(REGIONS[region].name);
    mobilePopup.open('popular');
  },
  init: function init() {
    var t = this;
    t.putCategories();
    t.putFavorites();
    t.setCategory('all');
    t.$regionLink.on('mouseenter touchstart', function () {
      t.mapHover($(this));
      var region = $(this).attr('data-region-link');
      if ($(this).attr('data-a') == 'region-link-on-map') {
        ga('send', 'event', 'region-hover', region, 'on-map-screen');
      }
      if ($(this).attr('data-a') == 'region-link-on-mini-map') {
        ga('send', 'event', 'region-hover', region, 'on-region-screen');
      }
    }).on('mouseleave touchend', function () {
      t.mapHover($(this), true);
    }).on('click tap', function (e) {
      if (t.tapped) {
        setTimeout(function () {
          t.tapped = false;
        }, 500);
        return;
      }
      e.preventDefault();
      var region = $(this).data('region-link');
      t.openRegion(region);
      if ($(this).attr('data-a') == 'region-link-on-map') {
        ga('send', 'event', 'region-click', region, 'on-map-screen');
      }
      if ($(this).attr('data-a') == 'region-link-on-mini-map') {
        ga('send', 'event', 'region-click', region, 'on-region-screen');
      }
    }).on('taphold', function (e) {
      t.tapped = true;
      t.openPopular($(this).data('region-link'));
      e.stopPropagation();
      e.preventDefault();
      return false;
    });
    t.setCategoryPreviewHeight();
    t.$openCategories.on('click', function (e) {
      e.preventDefault();
      t.openCategories();
    });
    t.$regionClose.on('click', function (e) {
      e.preventDefault();
      t.closeRegion();
      ga('send', 'event', 'button', 'region-close', 'on-region-screen');
    });
    t.$favoritesOpen.on('click', function (e) {
      e.preventDefault();
      t.openFavorites();
      ga('send', 'event', 'button', 'open-favorites', 'on-' + screens.activeName + '-screen');
    });
    t.$favoritesClose.on('click', function (e) {
      e.preventDefault();
      t.closeFavorites();
    });
    $('@map-moscow-screen').on('click', function (e) {
      t.closeFavorites();
    });
    $(document).on('click', '[data-category-link]', function (e) {
      e.preventDefault();
      t.setCategory($(this).data('category-link'));
    });
    $(document).on('click', '[data-place-link]', function (e) {
      e.preventDefault();
      t.openPlace($(this).data('place-link'));
    });
    $(document).on('mouseenter', '[data-place-link]', function () {
      var id = $(this).attr('data-place-link');
      $('[data-place-link="' + id + '"]').addClass('isHovered');
    });
    $(document).on('mouseleave', '[data-place-link]', function () {
      var id = $(this).attr('data-place-link');
      $('[data-place-link="' + id + '"]').removeClass('isHovered');
    });
    t.$closePlace.on('click', function (e) {
      e.preventDefault();
      t.closePlace();
    });
    t.$closeCategories.on('click', function (e) {
      e.preventDefault();
      t.closeCategories();
    });
    $(window).on('resize', function () {
      t.setRegionSize();
    });
    t.$zoom.on('click', function () {
      if (t.state.zoom) {
        t.zoomOut();
        ga('send', 'event', 'button', 'zoom-out', 'on-region-screen');
      } else {
        t.zoomIn();
        ga('send', 'event', 'button', 'zoom-in', 'on-region-screen');
      }
    });
    $('@region-image').on('mousedown', function (e) {
      e.preventDefault();
    });
    t.$regionsWrap.on('mousedown touchstart', function (e) {
      t.enableDrag(e);
    });
    t.$regionsWrap.on('mousewheel', function (e) {
      if (e.deltaY < 0) {
        t.zoomOut();
      } else {
        t.zoomIn();
      }
    });
    $('@region-screen').on('swipeleft', function (e) {
      MobileMapTabs.show('map');
    }).on('swiperight', function (e) {
      MobileMapTabs.show('list');
    });
    var regionHammer = new Hammer(t.$regionsWrap[0], {});
    regionHammer.get('pinch').set({ enable: true });
    regionHammer.on('pinchout', function (ev) {
      t.zoomIn();
    });
    regionHammer.on('pinchin', function (ev) {
      t.zoomOut();
    });
    $(document).on('mouseup touchend', function () {
      t.disableDrag();
    });
    $(document).on('mousemove touchmove', function (e) {
      if (t.allowDrag && t.state.zoom) {
        e.preventDefault();
        t.regionDrag(e);
      }
    });
    $(document).on('click', '@favorite-delete', function (e) {
      e.preventDefault();
      e.stopPropagation();
      t.like($(this).attr('data-place-id'));
      ga('send', 'event', 'button', 'remove-from-favorites', 'from-favorites');
    });
    t.$like.on('click', function (e) {
      e.preventDefault();
      t.like();
      if ($(this).hasClass('isActive')) {
        ga('send', 'event', 'button', 'remove-from-favorites', 'on-region-screen');
      } else {
        ga('send', 'event', 'button', 'add-to-favorites', 'on-region-screen');
      }
    });
    t.$like.on('mouseenter', function (e) {
      e.preventDefault();
      if ($(this).hasClass('isActive')) {
        t.showLikePopup();
        placeShare.hide();
      }
    });
    $(window).on('resize', function () {
      if (t.state.category) {
        t.setPlacesContainerHeight(true);
      }
    });
    t.$like.add($('@popup-like')).on('mouseleave', function () {
      t.closeLikePopup();
    }).on('mouseenter', function () {
      clearTimeout(t.likeTimeout);
    });
  }
};

function declOfNum(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

var advice = {
  $slider: $('@advice-slider'),
  formatNumber: function formatNumber(n) {
    if ((n + '').length == 1) {
      return '0' + n;
    } else {
      return n;
    }
  },
  count: function count(amount, current) {
    var t = this;
    var $current = $('@advice-current');
    var $amount = $('@advice-amount');
    $amount.html(t.formatNumber(amount));
    $current.html(t.formatNumber(current + 1));
  },
  init: function init() {
    var t = this;
    t.$slider.on('beforeChange init', function (event, slick, currentSlide, nextSlide) {
      t.count(slick.slideCount, nextSlide ? nextSlide : 0);
    });
    t.$slider.slick({
      infinite: isMobile() ? false : true,
      nextArrow: '<button class="slick-next" onclick="ga(\'send\', \'event\', \'advice-navigation\', \'next\', \'on-advice-screen\');"><img src="images/icon-slider_next.svg" role="svg"></button>',
      prevArrow: '<button class="slick-prev" onclick="ga(\'send\', \'event\', \'advice-navigation\', \'prev\', \'on-advice-screen\');"><img src="images/icon-slider_prev.svg" role="svg"></button>'
    });
    $('@advice-current').on('click', function () {
      t.$slider.slick('slickNext');
    });
  }
};

var shareLink = {
  init: function init() {
    var timeout;
    var $link = $('@share-link');
    if (!isMobile()) {
      $link.on('mouseenter', function (e) {
        clearTimeout(timeout);
        $(this).addClass('isActive');
      });
    }
    $link.on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      clearTimeout(timeout);
      $(this).toggleClass('isActive');
    }).on('mouseleave', function (e) {
      var $this = $(this);
      timeout = setTimeout(function () {
        $this.removeClass('isActive');
      }, 500);
    });
    $(document).on('click', function () {
      $link.removeClass('isActive');
    });
  }
};

var placeTooltip = {
  $tooltip: $('@place-tooltip'),
  $text: $('@place-tooltip-text'),
  $showTootlip: $('[data-place-tooltip]'),
  show: function show($elem, e) {
    var t = this;
    var text = $elem.data('place-tooltip');
    var coordsArray = $elem.attr('coords').split(',');
    var coords = [];
    for (var i = 0; i < coordsArray.length; i = i + 2) {
      coords.push({
        x: parseInt(coordsArray[i]),
        y: parseInt(coordsArray[i + 1])
      });
    }
    var topPoint = {
      x: 0,
      y: 999999
    };
    $.each(coords, function (i, v) {
      if (v.y < topPoint.y) {
        topPoint = v;
      }
    });
    var $region = $('[data-region].isActive');
    var tooltipPosition = {
      x: topPoint.x + $region.offset().left,
      y: topPoint.y + $region.offset().top
    };
    t.$tooltip.show();
    t.$text.html(text);
    t.$tooltip.css({
      left: tooltipPosition.x,
      top: tooltipPosition.y
    });
  },
  hide: function hide() {
    var t = this;
    t.$tooltip.hide();
  },
  init: function init() {
    var t = this;
    t.$showTootlip.on('mouseenter', function (e) {
      var region = moscowMap.state.region;
      ga('send', 'event', 'map-place-hover', $(this).attr('data-place-tooltip'), region);
    });
    t.$showTootlip.on('mousemove', function (e) {
      if (!isMobile()) {
        t.show($(this));
      }
    }).on('mouseleave', function () {
      t.hide();
    });
  }
};

var hint = {
  $hint: $('@hint-tooltip'),
  $hintShow: $('@hint-show'),
  $hintLink: $('@hint-link'),
  timeout: false,
  activeId: false,
  show: function show($this) {
    var t = this;
    clearTimeout(t.timeout);
    var top = $this.offset().top;
    var left = $this.offset().left + $this.width() / 2;
    t.$hint.show().css({
      left: left,
      top: top
    });
    var id = $this.attr('data-hint');
    var hintObj = HINTS[id];
    t.activeId = id;
    $('@hint-title').html(hintObj.title);
    $('@hint-desc').html(hintObj.desc);
    if (t.$hint.outerHeight() + 25 > top) {
      t.$hint.addClass('isUpSide');
    } else {
      t.$hint.removeClass('isUpSide');
    }
  },
  hide: function hide() {
    var t = this;
    t.timeout = setTimeout(function () {
      t.$hint.hide();
      t.activeId = false;
    }, 150);
  },
  link: function link() {
    var t = this;
    window.location.hash = 'advice';
    moscowMap.closeRegion();
    $('@advice-slider').slick('slickGoTo', t.activeId);
    ga('send', 'event', 'map-advice-hint', 'read-more', region);
    t.hide();
  },
  init: function init() {
    var t = this;
    var i = 0;
    t.$hintShow.each(function () {
      if (!HINTS[i]) i = 0;
      $(this).attr('data-hint', i);
      i++;
    });
    t.$hint.on('mouseenter', function () {
      clearTimeout(t.timeout);
    });
    t.$hintShow.on('mouseenter mousemove', function () {
      t.show($(this));
    });
    t.$hintShow.on('mouseenter', function () {
      var region = moscowMap.state.region;
      ga('send', 'event', 'map-advice-hint', 'hover', region);
    });
    t.$hint.add(t.$hintShow).on('mouseleave', function () {
      t.hide();
    });
    t.$hintLink.on('click', function (e) {
      t.link();
      e.preventDefault();
    });
  }
};

function cursorPosition(e) {
  var obj;
  if (e.pageX) {
    obj = {
      x: e.pageX,
      y: e.pageY
    };
  } else {
    obj = {
      x: e.originalEvent.touches[0].clientX,
      y: e.originalEvent.touches[0].clientY
    };
  }
  return obj;
}

var responsiveMap = {
  setSize: function setSize() {
    $('@responsive-map').each(function () {
      var $img = $('img[usemap="#' + $(this).attr('name') + '"]');
      var originalWidth = $img.attr('data-width');
      var actualWidth = $img.width();
      var percent = actualWidth / (originalWidth / 100) / 100;
      $(this).find('area').each(function () {
        var newCoords = [];
        var oldCoords = $(this).attr('data-original-coords').split(',');
        $.each(oldCoords, function (i, v) {
          newCoords.push(v * percent);
        });
        $(this).attr('coords', newCoords.join(','));
      });
    });
  },
  init: function init() {
    var t = this;
    t.setSize();
    $(window).on('resize', function () {
      t.setSize();
    });
    $('img[usemap]').on('load', function () {
      t.setSize();
    });
  }
};

var placeShare = {
  $link: $('@place-share'),
  $popup: $('@popup-share'),
  timeout: false,
  show: function show() {
    var t = this;
    clearTimeout(t.timeout);
    t.$popup.show();
    t.$link.addClass('isActive');
    moscowMap.closeLikePopup();
  },
  hide: function hide() {
    var t = this;
    t.timeout = setTimeout(function () {
      t.$popup.hide();
      t.$link.removeClass('isActive');
    }, 300);
  },
  init: function init() {
    var t = this;
    t.$link.on('mouseenter', function (e) {
      e.preventDefault();
      t.show();
      ga('send', 'event', 'place-share', 'hover', 'on-region-screen');
    });
    t.$popup.on('mouseenter', function () {
      clearTimeout(t.timeout);
    });
    t.$link.add(t.$popup).on('mouseleave', function () {
      t.hide();
    });
  }
};

var scroll = {
  on: true,
  disable: function disable() {
    this.on = false;
  },
  enable: function enable() {
    this.on = true;
  },
  init: function init() {
    var t = this;
    $(document.body).on('touchmove', function (event) {
      if (!t.on) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }
};

var mobileScreens = {
  $section: $('@container section'),
  $mfs: $('@container section.-mfs'),
  $next: $('@mobile-next'),
  $prev: $('@mobile-prev'),
  $share: $('@fixed-share'),
  activeEq: false,
  show: function show(eq) {
    var t = this;
    t.activeEq = eq;
    var $thisSection = t.$section.filter('[data-mobile-screen-eq="' + eq + '"]');
    $('html, body').animate({
      scrollTop: $thisSection.offset().top
    });
    if (eq > 0) {
      t.$share.addClass('isActive');
    } else {
      t.$share.removeClass('isActive');
    }
    pushAdriver();
    screens.setActiveName(eq);
  },
  next: function next() {
    var t = this;
    t.show(t.activeEq + 1);
  },
  prev: function prev() {
    var t = this;
    t.show(t.activeEq - 1);
  },
  setScreenHeight: function setScreenHeight() {
    var t = this;
    t.$mfs.each(function () {
      if (window.screen) {
        $(this).css('height', screen.availHeight);
      } else {
        $(this).css('height', window.outerHeight);
      }
    });
  },
  setActiveScreen: function setActiveScreen() {
    var scroll = $(window).scrollTop();
    var screen;
    $('[data-mobile-screen-eq]').each(function () {
      var $this = $(this);
      var wHeight = $(window).height();
      var height = $this.outerHeight();
      var top = $(this).offset().top;
      var diff = top - scroll;
      if (diff < wHeight * 0.2 && diff > wHeight * 0.2 - height) {
        screen = $this.attr('data-mobile-screen-eq');
      }
    });
    if (screen) {
      this.activeEq = screen;
      $('[data-mobile-header]').removeClass('isActive');
      $('[data-mobile-header="' + screen + '"]').addClass('isActive');
      if (screen > 0) {
        this.$share.addClass('isActive');
      } else {
        this.$share.removeClass('isActive');
      }
    }
  },
  init: function init() {
    var t = this;
    /*t.$next.on('click tap', function(e){
      t.next();
      e.preventDefault();
    });
    t.$prev.on('click tap', function(e){
      t.prev();
      e.preventDefault();
    });*/
    t.setActiveScreen();
    $(window).on('scroll', function () {
      t.setActiveScreen();
    });
    $('[data-show-screen]').on('click tap', function (e) {
      t.show(parseInt($(this).attr('data-show-screen')));
      mobilePopup.close('menu');
      e.preventDefault();
    });
    t.show(0);
    t.setScreenHeight();
    /*$(window).on('resize scroll', function(){
      t.setScreenHeight();
    });*/
  }
};

var MobileMapTabs = {
  show: function show(name) {
    $('[data-mobile-tab="' + name + '"],\n       [data-mobile-tab-link="' + name + '"]').addClass('isActive').siblings().removeClass('isActive');
  },
  init: function init() {
    var t = this;
    $('[data-mobile-tab-link]').on('click', function (e) {
      e.preventDefault();
      t.show($(this).attr('data-mobile-tab-link'));
    });
  }
};

var mobilePopup = {
  $open: $('[data-popup-link]'),
  $close: $('[data-popup-close]'),
  open: function open(popup) {
    var $popup = $('[data-popup="' + popup + '"]');
    $popup.show();
    setTimeout(function () {
      $popup.addClass('isActive');
    }, 10);
  },
  close: function close(popup) {
    var $popup = $('[data-popup="' + popup + '"]');
    $popup.removeClass('isActive');
    setTimeout(function () {
      $popup.hide();
    }, 600);
  },
  init: function init() {
    var t = this;
    t.$open.on('click', function (e) {
      e.preventDefault();
      t.open($(this).attr('data-popup-link'));
    });
    t.$close.on('click', function (e) {
      e.preventDefault();
      t.close($(this).attr('data-popup-close'));
    });
  }
};

var CategoryDrag = {
  $dragger: $('@category-dragger'),
  $container: $('@category-description'),
  $inner: $('@category-description-inner'),
  $hintText: $('@category-dragger-text'),
  min: 35,
  max: 0,
  calcMax: function calcMax() {
    this.max = this.$inner.outerHeight();
  },
  setHeight: function setHeight(height, animation) {
    var t = this;
    if (height < t.min) height = t.min;
    if (height > t.max) height = t.max;
    var opacity = (height - t.min) / ((t.max - t.min) / 100) / 100;
    if (animation) {
      TweenLite.to(t.$container[0], .5, { height: height, ease: Power2.ease });
      TweenLite.to(t.$inner[0], .5, { opacity: opacity, ease: Power2.ease });
      TweenLite.to(t.$hintText[0], .5, { opacity: 1 - opacity, ease: Power2.ease });;
    } else {
      t.$container.css({
        'height': height
      });
      t.$inner.css({
        'opacity': opacity
      });
      t.$hintText.css({
        'opacity': 1 - opacity
      });
    }
    t.activeHeight = height;
  },
  startDrag: function startDrag(e) {
    this.moveAllow = e;
    this.moveAllow.activeHeight = parseInt(this.activeHeight + '');
  },
  endDrag: function endDrag() {
    var t = this;
    if (!this.moveAllow) return;
    this.moveAllow = false;
    var percent = (t.activeHeight - t.min) / ((t.max - t.min) / 100);
    if (t.isOpened) {
      t.setHeight(t.min, true);
      t.isOpened = false;
    } else {
      t.setHeight(t.max, true);
      t.isOpened = true;
    }
  },
  moveDrag: function moveDrag(e) {
    var t = this;
    if (!t.moveAllow) return true;
    e.preventDefault();
    var shift = t.moveAllow.activeHeight + cursorPosition(e).y - cursorPosition(t.moveAllow).y;
    t.setHeight(shift);
  },
  init: function init() {
    var t = this;
    t.calcMax();
    $(window).on('resize', function () {
      t.calcMax();
    });
    t.setHeight(t.min);
    t.$dragger.on('touchstart', function (e) {
      t.startDrag(e);
    });
    $(document).on('touchmove', function (e) {
      t.moveDrag(e);
    });
    $(document).on('touchend', function (e) {
      t.endDrag();
    });
  }
};

var CategorySelect = {
  $open: $('@category-select-open'),
  $list: $('@category-select-list'),
  toggle: function toggle() {
    this.$open.toggleClass('isActive');
    this.$list.toggle();
  },
  close: function close() {
    this.$open.removeClass('isActive');
    this.$list.hide();
  },
  init: function init() {
    var t = this;
    t.$open.on('click', function (e) {
      t.toggle();
    });
    t.$list.on('click', function (e) {
      t.close();
    });
  }
};

var RegionSelect = {
  $open: $('@title-select-open'),
  $list: $('@title-select-list'),
  toggle: function toggle() {
    this.$open.toggleClass('isActive');
    this.$list.toggle();
  },
  close: function close() {
    this.$open.removeClass('isActive');
    this.$list.hide();
  },
  init: function init() {
    var t = this;
    t.$open.on('click', function (e) {
      t.toggle();
    });
    t.$list.on('click', function (e) {
      t.close();
    });
  }
};

var Animation = {
  startAnimation: function startAnimation($this, context, img) {
    function setItNow(first) {
      if (!$this.is(':visible') && !first) return;
      var steps = parseInt($this.attr('data-steps'));
      var next = $this.attr('data-next');
      var size = {
        w: parseInt($this.attr('width')),
        h: parseInt($this.attr('height'))
      };
      var number;
      if (!next) {
        number = 0;
      } else {
        number = parseInt(next);
      }
      if (number == steps - 1) {
        $this.attr('data-next', 0);
      } else {
        $this.attr('data-next', number + 1);
      }
      // context.webkitImageSmoothingEnabled = false;
      // context.mozImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;
      context.clearRect(0, 0, size.w, size.h);
      context.drawImage(img, 0, size.h * -number, size.w, size.h * steps);
    }
    setItNow(true);
    setInterval(setItNow, 80);
  },
  init: function init() {
    var t = this;
    $('@canvas-animation').each(function () {
      var $this = $(this);
      var canvas = $this[0];
      var context = canvas.getContext('2d');
      var img = new Image();
      img.src = $(this).attr('data-image');
      img.onload = function () {
        t.startAnimation($this, context, img);
      };
    });
  }
};

function setEventsAmount() {
  var eventsCount = DB.events.length;
  var places = declOfNum(eventsCount, ['место', 'места', 'мест']);
  var winter = declOfNum(eventsCount, ['зимнее', 'зимних', 'зимних']);
  $('@events-amount').html(eventsCount + ' ' + winter + '<br class="ms"> ' + places + ' \u041C\u043E\u0441\u043A\u0432\u044B');
}

$(function () {
  $.getJSON('/db.json', function (data) {
    DB = data;
    setEventsAmount();
    saveOriginalMapCoords();
    $('[data-ratio]').setRatio();
    responsiveMap.init();
    moscowMap.init();
    if (!isMobile()) {
      fullPage.init();
    } else {
      mobileScreens.init();
    }
    shareLink.init();
    customScroll.init();
    advice.init();
    svgImages.init();
    placeTooltip.init();
    hint.init();
    placeShare.init();
    screenType.init();
    scroll.init();
    Share.init();
    Animation.init();
    if (isMobile()) {
      MobileMapTabs.init();
      mobilePopup.init();
      CategoryDrag.init();
      CategorySelect.init();
      RegionSelect.init();
      $('@collections-mobile').slick({
        arrows: false,
        loop: false
      });
    }
    $('html').removeClass('isNotLoaded');
    $('@main-kagocel').on('click', function () {
      ga('send', 'event', 'product-links', 'click-banner', 'on-' + screens.activeName + '-screen');
    });
  });
});
//# sourceMappingURL=app.js.map
