var planner = {};

planner.vanilla = false;

var vocs = ['fighter', 'strider', 'mage', 'warrior', 'ranger', 'sorcerer', 'mknight', 'assassin', 'marcher'];

planner.fighter = {
  init_hp: 450,
  init_st: 540,
  init_attack: 80,
  init_defense: 80,
  init_mattack: 60,
  init_mdefense: 60,
  to10: {
    hp: 30,
    st: 20,
    attack: 4,
    defense: 3,
    mattack: 2,
    mdefense: 2
  },
  to100: {
    hp: 37,
    st: 15,
    attack: 4,
    defense: 4,
    mattack: 2,
    mdefense: 1
  },
  to200: {
    hp: 15,
    st: 5,
    attack: 1,
    defense: 3,
    mattack: 0,
    mdefense: 0
  }
};

planner.strider = {
  init_hp: 430,
  init_st: 540,
  init_attack: 70,
  init_defense: 70,
  init_mattack: 70,
  init_mdefense: 70,
  to10: {
    hp: 25,
    st: 25,
    attack: 3,
    defense: 3,
    mattack: 3,
    mdefense: 2
  },
  to100: {
    hp: 25,
    st: 25,
    attack: 3,
    defense: 3,
    mattack: 3,
    mdefense: 2
  },
  to200: {
    hp: 5,
    st: 15,
    attack: 1,
    defense: 1,
    mattack: 1,
    mdefense: 1
  }
};

planner.mage = {
  init_hp: 410,
  init_st: 540,
  init_attack: 60,
  init_defense: 60,
  init_mattack: 80,
  init_mdefense: 80,
  to10: {
    hp: 22,
    st: 20,
    attack: 2,
    defense: 3,
    mattack: 4,
    mdefense: 3
  },
  to100: {
    hp: 21,
    st: 10,
    attack: 2,
    defense: 1,
    mattack: 4,
    mdefense: 4
  },
  to200: {
    hp: 10,
    st: 10,
    attack: 0,
    defense: 0,
    mattack: 2,
    mdefense: 2
  }
};

planner.warrior = {
  to100: {
    hp: 40,
    st: 10,
    attack: 5,
    defense: 3,
    mattack: 2,
    mdefense: 1
  },
  to200: {
    hp: 5,
    st: 15,
    attack: 2,
    defense: 2,
    mattack: 0,
    mdefense: 0
  }
};

planner.ranger = {
  to100: {
    hp: 21,
    st: 30,
    attack: 4,
    defense: 2,
    mattack: 3,
    mdefense: 2
  },
  to200: {
    hp: 5,
    st: 15,
    attack: 2,
    defense: 1,
    mattack: 0,
    mdefense: 1
  }
};

planner.sorcerer = {
  to100: {
    hp: 16,
    st: 15,
    attack: 2,
    defense: 1,
    mattack: 5,
    mdefense: 5
  },
  to200: {
    hp: 10,
    st: 10,
    attack: 0,
    defense: 0,
    mattack: 3,
    mdefense: 1
  }
};

planner.mknight = {
  to100: {
    hp: 30,
    st: 20,
    attack: 2,
    defense: 3,
    mattack: 3,
    mdefense: 3
  },
  to200: {
    hp: 15,
    st: 5,
    attack: 1,
    defense: 1,
    mattack: 1,
    mdefense: 1
  }
};

planner.assassin = {
  to100: {
    hp: 22,
    st: 27,
    attack: 6,
    defense: 2,
    mattack: 2,
    mdefense: 1
  },
  to200: {
    hp: 5,
    st: 15,
    attack: 3,
    defense: 1,
    mattack: 0,
    mdefense: 0
  }
};

planner.marcher = {
  to100: {
    hp: 21,
    st: 20,
    attack: 2,
    defense: 3,
    mattack: 3,
    mdefense: 4
  },
  to200: {
    hp: 10,
    st: 10,
    attack: 1,
    defense: 0,
    mattack: 1,
    mdefense: 2
  }
};

planner.init = function(vocation) {
  return {
    level: 1,
    hp: planner[vocation].init_hp,
    st: planner[vocation].init_st,
    attack: planner[vocation].init_attack,
    defense: planner[vocation].init_defense,
    mattack: planner[vocation].init_mattack,
    mdefense: planner[vocation].init_mdefense
  };
};

planner.levelUp = function(char, vocation, to, times) {
  return {
    level: char.level + times,
    hp: char.hp + (planner[vocation][to].hp * times),
    st: char.st + (planner[vocation][to].st * times),
    attack: char.attack + (planner[vocation][to].attack * times),
    defense: char.defense + (planner[vocation][to].defense * times),
    mattack: char.mattack + (planner[vocation][to].mattack * times),
    mdefense: char.mdefense + (planner[vocation][to].mdefense * times)
  };
};

planner.toggleVanilla = function() {
  planner.vanilla = !planner.vanilla; //toggle state .. vanilla == true means original
  planner.marcher.to200.mattack = planner.vanilla ? 0 : 1; // alter stat growth values
  planner.marcher.to200.mdefense = planner.vanilla ? 3 : 2; // ditto
};