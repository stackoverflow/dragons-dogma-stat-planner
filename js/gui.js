var character = {
  level: 0,
  hp: 0,
  st: 0,
  attack: 0,
  defense: 0,
  mattack: 0,
  mdefense: 0
};

var initChoosen = false;
var sliderDown = false;

var copyToClipboard = function(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

var activateButton = function(which) {
  $('#fighter-btn, #strider-btn, #mage-btn').removeClass('active');
  $(which).addClass('active');
};

var initBuilder = function(v) {
  return 'HP: ' + v.init_hp + '<br/>ST: ' + v.init_st + '<br/>Attack: ' +
    v.init_attack + '<br/>Defense: ' + v.init_defense + '<br/>M. Attack: ' +
    v.init_mattack + '<br/>M.&nbsp;Defense:&nbsp;' + v.init_mdefense;
};

var popoverBuilder = function(v, to) {
  return 'HP: ' + v[to].hp + '<br/>ST: ' + v[to].st + '<br/>Attack: ' +
    v[to].attack + '<br/>Defense: ' + v[to].defense + '<br/>M. Attack: ' +
    v[to].mattack + '<br/>M.&nbsp;Defense:&nbsp;' + v[to].mdefense;
};

var incField = function(field) {
  var v = parseInt($(field).val(), 10) || 0;
  $(field).val(v + 1);
  readLevels();
  setUrl();
};

var decField = function(field) {
  var v = parseInt($(field).val(), 10) || 0;
  if(v > 0) {
    $(field).val(v - 1);
    readLevels();
    setUrl();
  }
};

var setTitle = function() {
  var text =  planner.vanilla ? "Dragon's Dogma " : "Dragon's Dogma: Dark Arisen ";
  $('#DDversion').html(text + "<small>Stat Planner</small>");
};

var toggleVersion = function() {
  planner.toggleVanilla();
  setTitle();
  $('#badge-marcher-pos-100').popover('destroy');
  $('#badge-marcher-pos-100').popover({trigger: 'hover', html: true, content: popoverBuilder(planner.marcher, 'to200')});
  if (initChoosen) {
      readLevels();   // rebuild
      setUrl();
  }
};

var setChar = function(char) {
  $('#level').text(char.level);
  $('#hp').text(char.hp);
  $('#st').text(char.st);
  $('#attack').text(char.attack);
  $('#defense').text(char.defense);
  $('#mattack').text(char.mattack);
  $('#mdefense').text(char.mdefense);
};

var resetBuild = function() {
  character = {level: 0, hp: 0, st: 0, attack: 0, defense: 0, mattack: 0, mdefense: 0};
  initChoosen = false;
  $('#fighter-btn, #strider-btn, #mage-btn').removeClass('active');
  _.each(vocs, function(v) {
    $('#' + v + '-pre-100').val('');
    $('#' + v + '-pos-100').val('');
  });
  setChar(character);
  setUrl();
};

var onInit = function(vocation) {
  character = planner.init(vocation);
  character = planner.levelUp(character, vocation, 'to10', 9);
  setChar(character);
  initChoosen = true;
  readLevels();
};

var onLevel = function(char, vocation, to, levels) {
  var lv = levels || 0;
  lv = Math.min(lv, 90);
  var nchar = null;
  if(char) {
    nchar = planner.levelUp(char, vocation, to, levels);
  }
  setChar(nchar);
  return nchar;
};

var verifyPre100 = function(current, lv, voc) {
  var total = current + lv;
  if(total > 90) {
    $('#' + voc + '-pre-100').val(90 - current);
    return 90 - current;
  }
  return lv;
};

var verifyPos100 = function(current, lv, voc) {
  var total = current + lv;
  if(total > 100) {
    $('#' + voc + '-pos-100').val(100 - current);
    return 100 - current;
  }
  return lv;
};

var readLevels = function() {
  var char = {
    level: character.level,
    hp: character.hp,
    st: character.st,
    attack: character.attack,
    defense: character.defense,
    mattack: character.mattack,
    mdefense: character.mdefense
  };
  var totalPre100 = 0;
  var totalPos100 = 0;
  _.each(vocs, function(v) {
    var lv = parseInt($('#' + v + '-pre-100').val(), 10) || 0;
    lv = verifyPre100(totalPre100, lv, v);
    totalPre100 += lv;
    char = onLevel(char, v, 'to100', lv);

    lv = parseInt($('#' + v + '-pos-100').val(), 10) || 0;
    lv = verifyPos100(totalPos100, lv, v);
    totalPos100 += lv;
    char = onLevel(char, v, 'to200', lv);
  });
};

var filterPre100 = function(i) {
  var v = parseInt(i, 10) || 0;
  return Math.min(v, 90);
};

var filterPos100 = function(i) {
  var v = parseInt(i, 10) || 0;
  return Math.min(v, 100);
};

$(function() {
  var readTime = true;
  $('#fighter-btn').popover({trigger: 'hover', html: true, content: initBuilder(planner.fighter)});
  $('#strider-btn').popover({trigger: 'hover', html: true, content: initBuilder(planner.strider)});
  $('#mage-btn').popover({trigger: 'hover', html: true, content: initBuilder(planner.mage)});

  _.each(vocs, function(v) {
    $('#badge-' + v + '-pre-100').popover({trigger: 'hover', html: true, content: popoverBuilder(planner[v], 'to100')});
    $('#badge-' + v + '-pos-100').popover({trigger: 'hover', html: true, content: popoverBuilder(planner[v], 'to200')});
  });

  $('#fighter-btn').click(function(e) {
    e.preventDefault();
    activateButton('#fighter-btn');
    onInit('fighter');
    if(!readTime) setUrl();
  });

  $('#strider-btn').click(function(e) {
    e.preventDefault();
    activateButton('#strider-btn');
    onInit('strider');
    if(!readTime) setUrl();
  });

  $('#mage-btn').click(function(e) {
    e.preventDefault();
    activateButton('#mage-btn');
    onInit('mage');
    if(!readTime) setUrl();
  });

  $('#copy-btn').click(function(e) {
    e.preventDefault();
    copyToClipboard(location.href);
  });

  $('#reset-btn').click(function(e) {
    e.preventDefault();
    resetBuild();
  });

  $('#toggle-btn').click(function(e) {
    e.preventDefault();
    toggleVersion();
  });

  _.each(vocs, function(v) {
    $('#' + v + '-pre-100').keyup(function(e) {
      if(initChoosen) {
        var lv = filterPre100($('#' + v + '-pre-100').val());
        $('#' + v + '-pre-100').val(lv);
        readLevels();
      } else {
        $('#' + v + '-pre-100').val('');
      }
    });
  });

  _.each(vocs, function(v) {
    $('#' + v + '-pos-100').keyup(function(e) {
      if(initChoosen) {
        var lv = filterPos100($('#' + v + '-pos-100').val());
        $('#' + v + '-pos-100').val(lv);
        readLevels();
      } else {
        $('#' + v + '-pos-100').val('');
      }
    });
  });

  _.each(vocs, function(v) {
    $('#' + v + '-pre-100').blur(function() {
      setUrl();
    });
    $('#' + v + '-pos-100').blur(function() {
      setUrl();
    });

    $('#' + v + '-pre-100-up, #' + v + '-pre-100-down, #' + v + '-pos-100-up, #' + v + '-pos-100-down').mousedown(function() {
      var id = $(this).prop('id');
      var fun = /-up/.exec(id) ? incField : decField;
      var field = '#' + v + '-' + (/pre-/.exec(id) ? 'pre' : 'pos') + '-100';
      fun(field);
      sliderDown = setInterval(function() {
        fun(field);
      }, 150);
    }).mouseup(function() {
      clearInterval(sliderDown);
    }).mouseout(function() {
      clearInterval(sliderDown);
    });
  });

  var res = readUrl();
  if(res) readLevels();
  setTitle();
  readTime = false;
});