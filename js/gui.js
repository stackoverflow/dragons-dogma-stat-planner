var character = {
  level: 0,
  hp: 0,
  st: 0,
  attack: 0,
  defense: 0,
  mattack: 0,
  mdefense: 0
};

var vocs = ['fighter', 'strider', 'mage', 'warrior', 'ranger', 'sorcerer', 'mknight', 'assassin', 'marcher'];

var initChoosen = false;

var initBuilder = function(v) {
  return 'HP: ' + v.init_hp + '<br/>ST: ' + v.init_st + '<br/>Attack: ' +
    v.init_attack + '<br/>Defense: ' + v.init_defense + '<br/>M. Attack: ' +
    v.init_mattack + '<br/>M.&nbsp;Defense:&nbsp;' + v.init_mdefense;
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

var onInit = function(vocation) {
  character = planner.init(vocation);
  character = planner.levelUp(character, vocation, 'to10', 9);
  setChar(character);
  initChoosen = true;
  _.each(vocs, function(v) {
    $('#' + v + '-pre-100').val('');
    $('#' + v + '-pos-100').val('');
  });
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
    totalPre100 = totalPre100 + lv;
    char = onLevel(char, v, 'to100', lv);

    lv = parseInt($('#' + v + '-pos-100').val(), 10) || 0;
    lv = verifyPos100(totalPos100, lv, v);
    totalPos100 = totalPos100 + lv;
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
  $('#fighter-btn').popover({trigger: 'hover', html: true, content: initBuilder(planner.fighter)});
  $('#strider-btn').popover({trigger: 'hover', html: true, content: initBuilder(planner.strider)});
  $('#mage-btn').popover({trigger: 'hover', html: true, content: initBuilder(planner.mage)});

  $('#fighter-btn').click(function(e) {
    e.preventDefault();
    onInit('fighter');
  });

  $('#strider-btn').click(function(e) {
    e.preventDefault();
    onInit('strider');
  });

  $('#mage-btn').click(function(e) {
    e.preventDefault();
    onInit('mage');
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
});