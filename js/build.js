var readInput = function(name) {
  var input = parseInt($(name).val(), 10) || 0;
  input = input.toString(16);
  if(input.length < 2) {
    input = '0' + input;
  }
  return input;
};

var readVals = function() {
  var url = planner.vanilla ? 'v' : 'a';
  var isFighter = $('#fighter-btn').hasClass('active');
  var isStrider = $('#strider-btn').hasClass('active');
  var isMage = $('#mage-btn').hasClass('active');
  if(isFighter) {
    url += 'f';
  } else if(isStrider) {
    url += 's';
  } else if(isMage) {
    url += 'm';
  } else return null;

  _.each(vocs, function(v) {
    url += readInput('#' + v + '-pre-100');
  });

  _.each(vocs, function(v) {
    url += readInput('#' + v + '-pos-100');
  });

  _.each(vocs, function(v) {
	if(v === 'fighter' || v === 'strider' || v === 'mage') {
		url += readInput('#' + v + '-pre-10');
	}
  });
  
  return url;
};

var setUrl = function() {
  var vals = readVals();
  if(vals) {
    location.href = '#' + vals;
  } else {
    var index = location.href.indexOf('#');
    if(index > 0) {
      location.href = location.href.substring(0, index);
    }
  }
};

var readUrl = function() {
  var val = /#\w+/.exec(location.href);
  var from = function(v, s) {return parseInt(v.substring(s, s + 2), 16);};
  if(val) {
    val = val[0].substring(1);
    var vanilla = val[0] === 'v';
    if(vanilla) {
      planner.toggleVanilla();
    }

    val = val.substring(1);
    var start = val[0];
    if(start === 'f') $('#fighter-btn').click();
    if(start === 's') $('#strider-btn').click();
    if(start === 'm') $('#mage-btn').click();

    var n = from(val, 1);
    $('#fighter-pre-100').val(n);
    n = from(val, 3);
    $('#strider-pre-100').val(n);
    n = from(val, 5);
    $('#mage-pre-100').val(n);
    n = from(val, 7);
    $('#warrior-pre-100').val(n);
    n = from(val, 9);
    $('#ranger-pre-100').val(n);
    n = from(val, 11);
    $('#sorcerer-pre-100').val(n);
    n = from(val, 13);
    $('#mknight-pre-100').val(n);
    n = from(val, 15);
    $('#assassin-pre-100').val(n);
    n = from(val, 17);
    $('#marcher-pre-100').val(n);

    n = from(val, 19);
    $('#fighter-pos-100').val(n);
    n = from(val, 21);
    $('#strider-pos-100').val(n);
    n = from(val, 23);
    $('#mage-pos-100').val(n);
    n = from(val, 25);
    $('#warrior-pos-100').val(n);
    n = from(val, 27);
    $('#ranger-pos-100').val(n);
    n = from(val, 29);
    $('#sorcerer-pos-100').val(n);
    n = from(val, 31);
    $('#mknight-pos-100').val(n);
    n = from(val, 33);
    $('#assassin-pos-100').val(n);
    n = from(val, 35);
    $('#marcher-pos-100').val(n);
	
	if(val.length > 37) {
		n = from(val, 37);
		$('#fighter-pre-10').val(n);
		n = from(val, 39);
		$('#strider-pre-10').val(n);
		n = from(val, 41);
		$('#mage-pre-10').val(n);
	} else {
		if(start === 'f') $('#fighter-pre-10').val(9);
		if(start === 's') $('#strider-pre-10').val(9);
		if(start === 'm') $('#mage-pre-10').val(9);
	}
	
    return true;
  } else return false;
};