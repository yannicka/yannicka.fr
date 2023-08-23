var Effect;

Effect = (function() {
  function Effect(arg) {
    var damage, margin, name, nbTurns;
    name = arg.name, nbTurns = arg.nbTurns, damage = arg.damage, margin = arg.margin;
    if (name == null) {
      name = 'Effet';
    }
    if (nbTurns == null) {
      nbTurns = 0;
    }
    if (damage == null) {
      damage = 0;
    }
    if (margin == null) {
      margin = 0;
    }
    this.name = name;
    this.nbTurns = nbTurns;
    this.damage = damage;
    this.margin = margin;
    this.countTurns = 0;
  }

  Effect.prototype.update = function() {
    return this.countTurns++;
  };

  Effect.prototype.getName = function() {
    return this.name;
  };

  Effect.prototype.getNbTurns = function() {
    return this.nbTurns;
  };

  Effect.prototype.getDamage = function() {
    return this.damage;
  };

  Effect.prototype.getMargin = function() {
    return this.margin;
  };

  Effect.prototype.isFirstTurn = function() {
    return this.countTurns === 0;
  };

  Effect.prototype.isLastTurn = function() {
    return this.countTurns >= this.nbTurns;
  };

  Effect.prototype.beforePlayerAttack = function(player) {};

  Effect.prototype.afterPlayerAttack = function(player) {};

  Effect.prototype.destroy = function(player) {};

  return Effect;

})();

var EffectParalysis,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EffectParalysis = (function(superClass) {
  extend(EffectParalysis, superClass);

  function EffectParalysis(args) {
    if (args == null) {
      args = {};
    }
    EffectParalysis.__super__.constructor.call(this, args);
  }

  EffectParalysis.prototype.beforePlayerAttack = function(player) {
    player.setCanAttack(false);
    return log((player.getName()) + " ne peut pas attaqué, il est paralysé par « " + this.name + " » : " + this.damage + " dégâts");
  };

  EffectParalysis.prototype.destroy = function(player) {
    return player.setCanAttack(true);
  };

  return EffectParalysis;

})(Effect);

var EffectPoison,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EffectPoison = (function(superClass) {
  extend(EffectPoison, superClass);

  function EffectPoison(args) {
    if (args == null) {
      args = {};
    }
    EffectPoison.__super__.constructor.call(this, args);
  }

  EffectPoison.prototype.computeDamage = function() {
    var damage;
    damage = this.damage;
    return damage += Math.rand(-this.margin, this.margin);
  };

  EffectPoison.prototype.beforePlayerAttack = function(player) {
    var damage;
    damage = this.computeDamage();
    player.decreaseLife(damage);
    new Pop(this.name + " : " + damage, player.skeleton.body.x + 50, player.skeleton.body.y);
    return log((player.getName()) + " subit un poison « " + this.name + " » : " + damage + " dégâts");
  };

  return EffectPoison;

})(Effect);

var Element;

Element = (function() {
  function Element() {}

  Element.Neutral = -1;

  Element.Fire = 0;

  Element.Water = 1;

  Element.Grass = 2;

  Element.Air = 3;

  Element.Magma = 4;

  Element.Ice = 5;

  Element.Electric = 6;

  Element.Psychic = 7;

  Element.toString = function(element) {
    switch (element) {
      case Element.Neutral:
        return 'Neutre';
      case Element.Fire:
        return 'Feu';
      case Element.Water:
        return 'Eau';
      case Element.Grass:
        return 'Terre';
      case Element.Air:
        return 'Air';
      case Element.Magma:
        return 'Magma';
      case Element.Ice:
        return 'Glace';
      case Element.Electric:
        return 'Électrique';
      case Element.Psychic:
        return 'Psychique';
      default:
        return 'Inconnu';
    }
  };

  return Element;

})();


/*
Trouver inspiration :
- https://github.com/playcanvas/engine/blob/master/src/input/input_mouse.js
- https://github.com/gamelab/kiwi.js/blob/master/src/input/Mouse.ts
- https://github.com/photonstorm/phaser/blob/v2.4.3/src/input/Mouse.js
 */
var Mouse,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Mouse = (function() {
  function Mouse(el) {
    this.handleEnd = bind(this.handleEnd, this);
    this.handleMove = bind(this.handleMove, this);
    this.handleStart = bind(this.handleStart, this);
    this.el = el;
    this.x = 0;
    this.y = 0;
    this.click = null;
    this.mtime = 0;
    this.loose = null;
    this.hovered = false;
    this.el.addEventListener('touchstart', this.handleStart);
    this.el.addEventListener('touchmove', this.handleMove);
    this.el.addEventListener('touchend', this.handleEnd);
    this.el.addEventListener('mousedown', this.handleStart);
    this.el.addEventListener('mousemove', this.handleMove);
    this.el.addEventListener('mouseup', this.handleEnd);
  }

  Mouse.prototype.update = function() {
    this.setCursor();
    this.setHovered(false);
    return this.mtime++;
  };

  Mouse.prototype.getX = function() {
    return this.x;
  };

  Mouse.prototype.getY = function() {
    return this.y;
  };

  Mouse.prototype.getPos = function() {
    return {
      x: this.getX(),
      y: this.getY()
    };
  };

  Mouse.prototype.getHover = function() {
    return this.hover;
  };

  Mouse.prototype.setHovered = function(hovered) {
    return this.hovered = hovered;
  };

  Mouse.prototype.setCursor = function() {
    var bodyStyle;
    bodyStyle = document.body.style;
    if (this.hovered) {
      return bodyStyle.cursor = 'pointer';
    } else {
      return bodyStyle.cursor = 'auto';
    }
  };

  Mouse.prototype.isHovered = function() {
    return this.hovered;
  };

  Mouse.prototype.handleStart = function(e) {
    this.handleMove(e);
    return this.click = this.mtime;
  };

  Mouse.prototype.handleMove = function(e) {
    this.x = e.pageX - (this.el ? this.el.offsetLeft : 0);
    return this.y = e.pageY - (this.el ? this.el.offsetTop : 0);
  };

  Mouse.prototype.handleEnd = function(e) {
    this.loose = this.mtime;
    return this.click = null;
  };

  Mouse.prototype.up = function() {
    return this.click === null;
  };

  Mouse.prototype.down = function() {
    return this.click !== null;
  };

  Mouse.prototype.press = function() {
    return this.click === this.mtime;
  };

  Mouse.prototype.release = function() {
    return this.loose === this.mtime;
  };

  return Mouse;

})();

var Player;

Player = (function() {
  function Player() {
    this.name = 'Joueur';
    this.maxlife = 100;
    this.life = this.maxlife;
    this.strength = 0;
    this.defense = 0;
    this.speed = 0;
    this.magic = 0;
    this.element = Element.Fire;
    this.weapons = [];
    this.weapon = new WeaponHand();
    this.spells = [];
    this.effects = [];
    this.canAttack = true;
    this.skeleton = new Skeleton();
  }

  Player.prototype.update = function(dt) {};

  Player.prototype.draw = function(ctx) {
    return this.skeleton.draw(ctx);
  };

  Player.prototype.getName = function() {
    return this.name;
  };

  Player.prototype.getMaxlife = function() {
    return this.maxlife;
  };

  Player.prototype.getLife = function() {
    return this.life;
  };

  Player.prototype.getLifePercentage = function() {
    return this.life / this.maxlife;
  };

  Player.prototype.getStrength = function() {
    return this.strength;
  };

  Player.prototype.getDefense = function() {
    return this.defense;
  };

  Player.prototype.getSpeed = function() {
    return this.speed;
  };

  Player.prototype.getMagic = function() {
    return this.magic;
  };

  Player.prototype.getElement = function() {
    return this.element;
  };

  Player.prototype.getWeapons = function() {
    return this.weapons;
  };

  Player.prototype.getWeapon = function() {
    return this.weapon;
  };

  Player.prototype.getSpells = function() {
    return this.spells;
  };

  Player.prototype.getEffects = function() {
    return this.effects;
  };

  Player.prototype.getCanAttack = function() {
    return this.canAttack;
  };

  Player.prototype.getX = function() {
    return this.skeleton.body.x;
  };

  Player.prototype.getY = function() {
    return this.skeleton.body.y;
  };

  Player.prototype.getPos = function() {
    return {
      x: this.getX(),
      y: this.getY()
    };
  };

  Player.prototype.setName = function(name) {
    return this.name = name;
  };

  Player.prototype.setMaxlife = function(maxlife) {
    return this.maxlife = maxlife;
  };

  Player.prototype.setLife = function(life) {
    return this.life = life;
  };

  Player.prototype.setStrength = function(strength) {
    return this.strength = strength;
  };

  Player.prototype.setDefense = function(defense) {
    return this.defense = defense;
  };

  Player.prototype.setMagic = function(magic) {
    return this.magic = magic;
  };

  Player.prototype.setElement = function(element) {
    return this.element = element;
  };

  Player.prototype.setWeapon = function(weapon) {
    return this.weapon = weapon;
  };

  Player.prototype.setCanAttack = function(canAttack) {
    return this.canAttack = canAttack;
  };

  Player.prototype.setX = function(x) {
    return this.skeleton.body.x = x;
  };

  Player.prototype.setY = function(y) {
    return this.skeleton.body.y = y;
  };

  Player.prototype.setPos = function(x, y) {
    this.setX(x);
    return this.setY(y);
  };

  Player.prototype.isAlive = function() {
    return this.life > 0;
  };

  Player.prototype.isDead = function() {
    return !this.isAlive();
  };

  Player.prototype.hasSpells = function() {
    return this.spells.length > 0;
  };

  Player.prototype.hasWeaponInHand = function() {
    return !(this.weapon instanceof WeaponHand);
  };

  Player.prototype.hasWeapons = function() {
    return this.weapons.length > 0;
  };

  Player.prototype.addWeapon = function(weapon) {
    return this.weapons.push(weapon);
  };

  Player.prototype.addSpell = function(spell) {
    return this.spells.push(spell);
  };

  Player.prototype.addEffect = function(effect) {
    return this.effects.push(effect);
  };

  Player.prototype.removeEffect = function(effect) {
    var index;
    index = this.effects.indexOf(effect);
    effect.destroy(this);
    return this.effects.splice(index, 1);
  };

  Player.prototype.decreaseLife = function(life) {
    return this.life -= life;
  };

  Player.prototype.increaseLife = function(life) {
    return this.life += life;
  };

  Player.prototype.flip = function() {
    return this.skeleton.body.flipped = true;
  };

  Player.prototype.takeWeaponInHand = function() {
    var index;
    this.dropWeaponInHand();
    if (this.hasWeapons()) {
      index = Math.rand(0, this.weapons.length - 1);
      this.weapon = this.weapons[index];
      this.weapons.splice(index, 1);
      return log(this.name + " a pris en main l'arme " + (this.weapon.getName()));
    }
  };

  Player.prototype.dropWeaponInHand = function() {
    if (!(this.weapon instanceof WeaponHand)) {
      log(this.name + " a jeté son arme " + (this.weapon.getName()));
    }
    return this.weapon = new WeaponHand();
  };

  Player.prototype.turn = function(opponent) {
    var effect, i, j, len, ref, results;
    log("===== Tour de " + this.name + " =====");
    i = this.effects.length;
    while (i--) {
      effect = this.effects[i];
      effect.update();
      effect.beforePlayerAttack(this);
      if (effect.isLastTurn()) {
        this.removeEffect(effect);
      }
    }
    if (!this.canAttack) {
      log(this.name + " ne peut pas attaquer");
      return;
    }
    if (this.dice(.20)) {
      this.takeWeaponInHand();
    }
    this.attackPhase(opponent);
    ref = this.effects;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      effect = ref[j];
      results.push(effect.afterPlayerAttack(this));
    }
    return results;
  };

  Player.prototype.knock = function(opponent) {
    var damage;
    damage = this.computeDamage();
    opponent.decreaseLife(damage);
    new Pop("" + damage, opponent.getX(), opponent.getY());
    return log(this.name + " porte un coup à " + (opponent.getName()) + " avec " + (this.weapon.getName()) + " : " + damage + " dégâts");
  };

  Player.prototype.computeDamage = function() {
    var damage;
    damage = this.weapon.damage;
    damage += Math.rand(-this.weapon.getMargin(), this.weapon.getMargin());
    damage += this.strength * 2;
    return damage;
  };

  Player.prototype.evade = function(opponent) {};

  Player.prototype.goBack = function() {
    return log(this.name + " retourne à sa position initiale");
  };

  Player.prototype.attackPhase = function(opponent) {
    if (this.attack(opponent)) {
      this.dodgePhase(opponent);
    } else {
      log(this.name + " rate son attaque envers " + (opponent.getName()));
      this.goBack();
    }
    if (this.reAttack(opponent)) {
      log(this.name + " attaque à nouveau " + (opponent.getName()));
      return this.attackPhase(opponent);
    }
  };

  Player.prototype.dodgePhase = function(opponent) {
    if (this.dodge(opponent)) {
      log((opponent.getName()) + " a esquivé l'attaque de " + this.name);
      if (this.riposte(opponent)) {
        log((opponent.getName()) + " contrattaque " + this.name);
        opponent.knock(this);
      } else {
        opponent.evade(this);
      }
      return this.goBack();
    } else {
      this.knock(opponent);
      if (this.combo(opponent)) {
        log(this.name + " effectue un combo envers " + (opponent.getName()));
        return this.dodgePhase(opponent);
      } else {
        return this.goBack();
      }
    }
  };

  Player.prototype.attack = function(opponent) {
    return this.dice(this.weapon.getAttack());
  };

  Player.prototype.dodge = function(opponent) {
    return this.dice(opponent.getWeapon().getDodge());
  };

  Player.prototype.riposte = function(opponent) {
    return this.dice(opponent.getWeapon().getRiposte());
  };

  Player.prototype.combo = function(opponent) {
    return this.dice(this.weapon.getCombo());
  };

  Player.prototype.reAttack = function(opponent) {
    return this.dice(this.weapon.getReattack());
  };

  Player.prototype.dice = function(value) {
    var rand;
    rand = Math.random();
    return value >= rand;
  };

  return Player;

})();

var Bone;

Bone = (function() {
  function Bone(img, x, y, pivot) {
    if (pivot == null) {
      pivot = {
        x: 0,
        y: 0
      };
    }
    this.img = img;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.pivot = pivot;
    this.subBones = [];
    this.drawAtLast = false;
    this.flipped = false;
  }

  Bone.prototype.addBone = function(bone) {
    return this.subBones.push(bone);
  };

  Bone.prototype.draw = function(ctx) {
    var bone, i, len, ref;
    ctx.save();
    ctx.translate(this.x + this.pivot.x, this.y + this.pivot.y);
    ctx.rotate(this.angle * Math.PI / 180);

    /*
    		ctx.beginPath()
    		ctx.arc(0, 0, 5, 0, 2 * Math.PI)
    		ctx.fillStyle = rgb(255, 5, 128)
    		ctx.fill()
     */
    ctx.translate(-this.pivot.x, -this.pivot.y);
    if (this.flipped) {
      ctx.scale(-1, 1);
    }
    if (!this.drawAtLast && this.img) {
      ctx.drawImage(this.img, 0, 0);
    }
    ref = this.subBones;
    for (i = 0, len = ref.length; i < len; i++) {
      bone = ref[i];
      bone.draw(ctx);
    }
    if (this.drawAtLast && this.img) {
      ctx.drawImage(this.img, 0, 0);
    }
    return ctx.restore();
  };

  return Bone;

})();

var Skeleton;

Skeleton = (function() {
  function Skeleton() {
    this.body = new Bone(null, 140, 80);
    this.torso = new Bone(Img.get('body'), 0, 0, {
      x: 26,
      y: 0
    });
    this.head = new Bone(Img.get('head'), -27, -78, {
      x: 47,
      y: 88
    });
    this.frontTopArm = new Bone(Img.get('upLeftArm'), -15, 6, {
      x: 15,
      y: 0
    });
    this.frontBottomArm = new Bone(Img.get('bottomLeftArm'), 0, 30, {
      x: 17,
      y: 0
    });
    this.frontHand = new Bone(Img.get('leftHand'), 6, 24, {
      x: 8,
      y: 3
    });
    this.rearTopArm = new Bone(Img.get('upRightArm'), 27, 0, {
      x: 9,
      y: 1
    });
    this.rearBottomArm = new Bone(Img.get('bottomRightArm'), 3, 28, {
      x: 9,
      y: 0
    });
    this.rearHand = new Bone(Img.get('rightHand'), -11, 23, {
      x: 17,
      y: 3
    });
    this.frontThigh = new Bone(Img.get('upLeftLeg'), -1, 48, {
      x: 14,
      y: 0
    });
    this.frontShin = new Bone(Img.get('bottomLeftLeg'), -8, 33, {
      x: 21,
      y: 2
    });
    this.frontFoot = new Bone(Img.get('leftFoot'), 0, 28, {
      x: 14,
      y: 0
    });
    this.rearThigh = new Bone(Img.get('upRightLeg'), 19, 48, {
      x: 15,
      y: 0
    });
    this.rearShin = new Bone(Img.get('bottomRightLeg'), 4, 25, {
      x: 15,
      y: 0
    });
    this.rearFoot = new Bone(Img.get('rightFoot'), 0, 24, {
      x: 15,
      y: 6
    });

    /*
    		@frontBottomArm.drawAtLast = yes
    		@rearBottomArm.drawAtLast = yes
    
    		@frontShin.drawAtLast = yes
    		@rearShin.drawAtLast = yes
     */
    this.body.addBone(this.rearThigh);
    this.body.addBone(this.frontThigh);
    this.body.addBone(this.torso);
    this.torso.addBone(this.rearTopArm);
    this.torso.addBone(this.frontTopArm);
    this.torso.addBone(this.head);
    this.frontTopArm.addBone(this.frontBottomArm);
    this.frontBottomArm.addBone(this.frontHand);
    this.rearTopArm.addBone(this.rearBottomArm);
    this.rearBottomArm.addBone(this.rearHand);
    this.frontThigh.addBone(this.frontShin);
    this.frontShin.addBone(this.frontFoot);
    this.rearThigh.addBone(this.rearShin);
    this.rearShin.addBone(this.rearFoot);
  }

  Skeleton.prototype.update = function(dt) {
    if (this.time <= 0) {
      this.incr = 0.1;
    } else if (this.time >= 1) {
      this.incr = -0.1;
    }
    return this.time += this.incr;

    /*
    		player.angle = 20
    		head.angle = -20
    		head.x += 8
    
    		upLeftArm.angle = -70
    		bottomLeftArm.angle = -20
    		bottomLeftArm.y -= 4
    		upLeftArm.x += 18
    		upLeftArm.y += 8
    
    		upRightArm.x -= 28
    		upRightArm.y += 14
    		upRightArm.angle = 70
    		bottomRightArm.angle = -41
    		rightHand.angle -= 50
    
    		upLeftLeg.angle = -106
    		bottomLeftLeg.angle = 20
    		upLeftLeg.x += 8
    		upLeftLeg.y += 16
    		leftFoot.angle = -18
    
    		upRightLeg.angle = 60
    		bottomRightLeg.angle = 16
    		upRightLeg.x -= 12
    		upRightLeg.y += 4
    		rightFoot.angle = -40
     */

    /*
    		AplayerAngle = [ 0, 20 ]
    		AheadAngle = [ 0, -20 ]
    		AheadX = [ -27, -19 ]
    
    		AupLeftArmAngle = [ 0, -70 ]
    		AbottomLeftArmAngle = [ 0, -20 ]
    		AbottomLeftArmY = [ 30, 26 ]
    		AupLeftArmX = [ -15, 3 ]
    		AupLeftArmY = [ 6, 14 ]
    
    		AupRightArmX = [ 27, -1 ]
    		AupRightArmY = [ 0, 14 ]
    		AupRightArmAngle = [ 0, 70 ]
    		AbottomRightArmAngle = [ 0, -41 ]
    		ArightHandAngle = [ 0, -50 ]
    
    		AupLeftLegAngle = [ 0, -106 ]
    		AbottomLeftLegAngle = [ 0, 20 ]
    		AupLeftLegX = [ -1, 7 ]
    		AupLeftLegY = [ 48, 64 ]
    		AleftFootAngle = [ 0, -18 ]
    
    		AupRightLegAngle = [ 0, 60 ]
    		AbottomRightLegAngle = [ 0, 16 ]
    		AupRightLegX = [ 19, 7 ]
    		AupRightLegY = [ 48, 52 ]
    		ArightFootAngle = [ 0, -40 ]
    
    		@skeleton.angle = linear(AplayerAngle, @time)
    		@head.angle = linear(AheadAngle, @time)
    		@head.x = linear(AheadX, @time)
    
    		@upLeftArm.angle = linear(AupLeftArmAngle, @time)
    		@bottomLeftArm.angle = linear(AbottomLeftArmAngle, @time)
    		@bottomLeftArm.y = linear(AbottomLeftArmY, @time)
    		@upLeftArm.x = linear(AupLeftArmX, @time)
    		@upLeftArm.y = linear(AupLeftArmY, @time)
    
    		@upRightArm.x = linear(AupRightArmX, @time)
    		@upRightArm.y = linear(AupRightArmY, @time)
    		@upRightArm.angle = linear(AupRightArmAngle, @time)
    		@bottomRightArm.angle = linear(AbottomRightArmAngle, @time)
    		@rightHand.angle = linear(ArightHandAngle, @time)
    
    		@upLeftLeg.angle = linear(AupLeftLegAngle, @time)
    		@bottomLeftLeg.angle = linear(AbottomLeftLegAngle, @time)
    		@upLeftLeg.x = linear(AupLeftLegX, @time)
    		@upLeftLeg.y = linear(AupLeftLegY, @time)
    		@leftFoot.angle = linear(AleftFootAngle, @time)
    
    		@upRightLeg.angle = linear(AupRightLegAngle, @time)
    		@bottomRightLeg.angle = linear(AbottomRightLegAngle, @time)
    		@upRightLeg.x = linear(AupRightLegX, @time)
    		@upRightLeg.y = linear(AupRightLegY, @time)
    		@rightFoot.angle = linear(ArightFootAngle, @time)
     */
  };

  Skeleton.prototype.draw = function(ctx) {
    return this.body.draw(ctx);
  };

  return Skeleton;

})();

var Spell;

Spell = (function() {
  function Spell(arg) {
    var damage, element, margin, name;
    name = arg.name, damage = arg.damage, margin = arg.margin, element = arg.element;
    if (name == null) {
      name = 'Sort';
    }
    if (damage == null) {
      damage = 0;
    }
    if (margin == null) {
      margin = 0;
    }
    if (element == null) {
      element = Element.Neutral;
    }
    this.name = name;
    this.damage = damage;
    this.margin = margin;
    this.element = element;
    this.effects = [];
    this.image = {
      small: null
    };
  }

  Spell.prototype.getName = function() {
    return this.name;
  };

  Spell.prototype.getDamage = function() {
    return this.damage;
  };

  Spell.prototype.getMargin = function() {
    return this.margin;
  };

  Spell.prototype.getElement = function() {
    return this.element;
  };

  Spell.prototype.getSmallImage = function() {
    return this.image.small;
  };

  Spell.prototype.setSmallImage = function(img) {
    return this.image.small = img;
  };

  Spell.prototype.addEffect = function(effect) {
    return this.effects.push(effect);
  };

  return Spell;

})();

var SpellFireball,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SpellFireball = (function(superClass) {
  extend(SpellFireball, superClass);

  function SpellFireball() {
    SpellFireball.__super__.constructor.call(this, {
      name: 'Boule de feu',
      damage: 20,
      margin: 3,
      element: Element.Fire
    });
    this.setSmallImage(Img.get('spell-small-fireball'));
    this.addEffect(new EffectPoison({
      name: 'Brûlure',
      nbTurns: 2,
      damage: 3,
      margin: 1
    }));
  }

  return SpellFireball;

})(Spell);

var SpellIceball,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SpellIceball = (function(superClass) {
  extend(SpellIceball, superClass);

  function SpellIceball() {
    SpellIceball.__super__.constructor.call(this, {
      name: 'Boule de glace',
      damage: 14,
      margin: 6,
      element: Element.Ice
    });
    this.setSmallImage(Img.get('spell-small-iceball'));
    this.addEffect(new EffectParalysis({
      name: 'Glacé',
      nbTurns: 2,
      damage: 0,
      margin: 0
    }));
  }

  return SpellIceball;

})(Spell);

var InterfaceElement;

InterfaceElement = (function() {
  function InterfaceElement(x, y, parent) {
    this.position = new Point(x, y);
    this.parent = parent;
    this.children = [];
    this.visible = true;
    this.spriteCanvas = document.createElement('canvas');
    this.spriteCanvas.width = Game.getWidth();
    this.spriteCanvas.height = Game.getHeight();
    this.sprite = this.spriteCanvas.getContext('2d');
    this.sprite.textBaseline = 'top';
  }

  InterfaceElement.prototype.update = function(dt) {};

  InterfaceElement.prototype.computeDraw = function() {};

  InterfaceElement.prototype.draw = function(ctx) {
    var child, i, len, position, ref, results, x, y;
    position = this.getAbsolutePosition();
    x = position.getX();
    y = position.getY();
    ctx.save();
    ctx.translate(x, y);
    this.sprite.clearRect(0, 0, this.spriteCanvas.width, this.spriteCanvas.height);
    if (this.visible) {
      this.computeDraw();
    }
    ctx.drawImage(this.spriteCanvas, 0, 0);
    ctx.restore();
    ref = this.children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      results.push(child.draw(ctx));
    }
    return results;
  };

  InterfaceElement.prototype.getRelativePosition = function() {
    return this.position;
  };

  InterfaceElement.prototype.getPosition = function() {
    return this.getRelativePosition();
  };

  InterfaceElement.prototype.getAbsolutePosition = function() {
    var position;
    position = new Point(this.position.getX(), this.position.getY());
    if (this.parent) {
      position.add(this.parent.getAbsolutePosition());
    }
    return position;
  };

  InterfaceElement.prototype.getParent = function() {
    return this.parent;
  };

  InterfaceElement.prototype.getX = function() {
    return this.position.getX();
  };

  InterfaceElement.prototype.getY = function() {
    return this.position.getY();
  };

  InterfaceElement.prototype.getVisible = function() {
    return this.visible;
  };

  InterfaceElement.prototype.setX = function(x) {
    return this.position.setX(x);
  };

  InterfaceElement.prototype.setY = function(y) {
    return this.position.setY(y);
  };

  InterfaceElement.prototype.setPosition = function(position) {
    this.setX(position.x);
    return this.setY(position.y);
  };

  InterfaceElement.prototype.setParent = function(parent) {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    return this.parent = parent;
  };

  InterfaceElement.prototype.setVisible = function(visible) {
    return this.visible = visible;
  };

  InterfaceElement.prototype.hasChildren = function() {
    return this.children.length > 0;
  };

  InterfaceElement.prototype.hasParent = function() {
    return this.parent !== null;
  };

  InterfaceElement.prototype.addChild = function(child) {
    child.setParent(this);
    return this.children.push(child);
  };

  InterfaceElement.prototype.removeChild = function(child) {
    var index;
    index = this.children.indexOf(value);
    if (index !== -1) {
      return this.children.splice(index, 1);
    }
  };

  InterfaceElement.prototype.clearChildren = function() {
    return this.children = [];
  };

  return InterfaceElement;

})();

var Lifebar,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Lifebar = (function(superClass) {
  extend(Lifebar, superClass);

  function Lifebar(x, y, arg) {
    var reversed;
    reversed = arg.reversed;
    Lifebar.__super__.constructor.call(this, x, y);
    this.reversed = reversed;
    this.percentage = 100;
    this.width = 240;
    if (this.reversed) {
      this.setX(this.getX() - 12);
    }
  }

  Lifebar.prototype.computeDraw = function() {
    if (this.reversed) {
      this.sprite.save();
      this.sprite.translate(Game.getWidth(), 0);
      this.sprite.scale(-1, 1);
    }
    if (this.percentage > 0) {
      this.sprite.drawImage(Img.get('lifebar'), 0, 0, 4, 14, 0, 0, 4, 14);
      this.sprite.drawImage(Img.get('lifebar'), 4, 0, 4, 14, 4, 0, this.percentage * this.width - 8, 14);
      this.sprite.drawImage(Img.get('lifebar'), 17, 0, 4, 14, this.percentage * this.width - 5, 0, 4, 14);
    }
    if (this.reversed) {
      return this.sprite.restore();
    }
  };

  Lifebar.prototype.getWidth = function() {
    return this.width;
  };

  Lifebar.prototype.getPercentage = function() {
    return this.percentage;
  };

  Lifebar.prototype.setWidth = function(width) {
    return this.width = width;
  };

  Lifebar.prototype.setPercentage = function(percentage) {
    return this.percentage = percentage;
  };

  return Lifebar;

})(InterfaceElement);

var Miniature,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Miniature = (function(superClass) {
  extend(Miniature, superClass);

  function Miniature(img, text, x, y, width, height, arg) {
    var reversed;
    reversed = arg.reversed;
    Miniature.__super__.constructor.call(this, x, y);
    this.img = img;
    this.setPosition(new Point(x, y));
    this.width = width;
    this.height = height;
    this.reversed = reversed;
    this.tooltip = new Tooltip(0, 0, text);
    this.addChild(this.tooltip);
    this.hovered = false;
  }

  Miniature.prototype.update = function(dt) {
    var mouse, mousePos, position, ref, x, y;
    mouse = Game.getMouse();
    mousePos = mouse.getPos();
    position = this.getAbsolutePosition();
    ref = [position.getX(), position.getY()], x = ref[0], y = ref[1];
    if (mousePos.x > x && mousePos.x <= x + this.width && mousePos.y > y && mousePos.y <= y + this.height) {
      this.hovered = true;
      return mouse.setHovered(true);
    } else {
      return this.hovered = false;
    }
  };

  Miniature.prototype.computeDraw = function() {
    var mouse, pos, x, y;
    this.sprite.drawImage(this.img, 0, 0, this.width, this.height);
    mouse = Game.getMouse();
    if (this.hovered) {
      pos = this.getAbsolutePosition();
      x = mouse.getX() - pos.getX() + 8;
      y = mouse.getY() - pos.getY() + 14;
      if (this.reversed) {
        x -= this.tooltip.getWidth() + 8;
      }
      this.tooltip.setVisible(true);
      this.tooltip.setX(x);
      return this.tooltip.setY(y);
    } else {
      return this.tooltip.setVisible(false);
    }
  };

  return Miniature;

})(InterfaceElement);

var Panel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Panel = (function(superClass) {
  extend(Panel, superClass);

  function Panel(arg) {
    var reversed;
    reversed = arg.reversed;
    Panel.__super__.constructor.call(this, 4, 20);
    this.reversed = reversed;
    this.playerName = new PlayerName(0, -19, {
      reversed: this.reversed
    });
    this.lifebar = new Lifebar(2, 2, {
      reversed: this.reversed
    });
    this.weaponsPanel = new WeaponsPanel(64, 20, {
      reversed: this.reversed
    });
    this.spellsPanel = new SpellsPanel(0, 82, {
      reversed: this.reversed
    });
    this.informations = new PlayerInformations(2, 17, {
      reversed: this.reversed
    });
    this.addChild(this.lifebar);
    this.addChild(this.playerName);
    this.addChild(this.weaponsPanel);
    this.addChild(this.spellsPanel);
    this.addChild(this.informations);
  }

  Panel.prototype.update = function(dt) {
    this.informations.update(dt);
    this.weaponsPanel.update(dt);
    return this.spellsPanel.update(dt);
  };

  Panel.prototype.computeDraw = function() {
    if (this.reversed) {
      this.sprite.save();
      this.sprite.scale(-1, 1);
      this.sprite.drawImage(Img.get('user-informations'), -Game.getWidth() + 8, 0);
      return this.sprite.restore();
    } else {
      return this.sprite.drawImage(Img.get('user-informations'), 0, 0);
    }
  };

  Panel.prototype.getLifebar = function() {
    return this.lifebar;
  };

  Panel.prototype.fillInformationsWithPlayer = function(player) {
    this.lifebar.setPercentage(player.getLifePercentage());
    this.playerName.setName(player.getName());
    this.informations.fillTextWithPlayer(player);
    this.weaponsPanel.fillWeaponsWithPlayer(player);
    return this.spellsPanel.fillSpellsWithPlayer(player);
  };

  return Panel;

})(InterfaceElement);

var PlayerInformations,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PlayerInformations = (function(superClass) {
  extend(PlayerInformations, superClass);

  function PlayerInformations(x, y, arg) {
    var reversed;
    reversed = arg.reversed;
    PlayerInformations.__super__.constructor.call(this, x, y);
    this.reversed = reversed;
    this.width = 58;
    this.height = 58;
    this.texts = '';
    if (this.reversed) {
      this.setX(Game.getWidth() - 68);
    }
    this.tooltip = new Tooltip(0, 0, 'Hello');
    this.addChild(this.tooltip);
    this.hovered = false;
  }

  PlayerInformations.prototype.update = function(dt) {
    var height, mouse, mousePos, ref, width, x, y;
    mouse = Game.getMouse();
    mousePos = mouse.getPos();
    ref = this.getBounds(), x = ref.x, y = ref.y, width = ref.width, height = ref.height;
    if (mousePos.x > x && mousePos.x <= x + width && mousePos.y > y && mousePos.y <= y + height) {
      this.hovered = true;
      return mouse.setHovered(true);
    } else {
      return this.hovered = false;
    }
  };

  PlayerInformations.prototype.computeDraw = function() {
    var mouse, pos, x, y;
    if (this.hovered) {
      mouse = Game.getMouse();
      pos = this.getAbsolutePosition();
      x = mouse.getX() - pos.getX() + 8;
      y = mouse.getY() - pos.getY() + 14;
      if (this.reversed) {
        x -= this.tooltip.getWidth() + 8;
      }
      this.tooltip.setVisible(true);
      this.tooltip.setX(x);
      return this.tooltip.setY(y);
    } else {
      return this.tooltip.setVisible(false);
    }
  };

  PlayerInformations.prototype.getBounds = function() {
    var position, x, y;
    position = this.getAbsolutePosition();
    x = position.getX();
    y = position.getY();
    return {
      x: x,
      y: y,
      width: this.width,
      height: this.height
    };
  };

  PlayerInformations.prototype.setText = function(text) {
    return this.tooltip.setText(text);
  };

  PlayerInformations.prototype.fillTextWithPlayer = function(player) {
    var text;
    text = "**Vie :** " + player.life + "/" + player.maxlife + "\n**Force :** " + player.strength + "\n**Défense :** " + player.defense + "\n**Vitesse :** " + player.speed + "\n**Magie :** " + player.magic + "\n**Élément :** " + (Element.toString(player.element));
    return this.setText(text);
  };

  return PlayerInformations;

})(InterfaceElement);

var PlayerName,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PlayerName = (function(superClass) {
  extend(PlayerName, superClass);

  function PlayerName(x, y, arg) {
    var reversed;
    reversed = arg.reversed;
    PlayerName.__super__.constructor.call(this, x, y);
    this.reversed = reversed;
    this.setName('Inconnu');
    this.lineWidth = 2;
    this.sprite.strokeStyle = rgb(41, 35, 26);
    this.sprite.fillStyle = rgb(255, 255, 255);
    this.sprite.font = 'bold 22px Grobold';
    this.sprite.lineWidth = this.lineWidth;
  }

  PlayerName.prototype.computeDraw = function() {
    this.sprite.fillText(this.name, this.lineWidth, this.lineWidth);
    return this.sprite.strokeText(this.name, this.lineWidth, this.lineWidth);
  };

  PlayerName.prototype.setName = function(name) {
    var width;
    this.name = name;
    if (this.reversed) {
      width = this.sprite.measureText(this.name).width;
      return this.setX(Game.getWidth() - width - 10);
    }
  };

  return PlayerName;

})(InterfaceElement);

var Pop,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Pop = (function(superClass) {
  extend(Pop, superClass);

  Pop.all = [];

  Pop.maxLife = 800;

  Pop.midLife = 400;

  function Pop(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.life = Pop.maxLife;
    Pop.all.push(this);
  }

  Pop.prototype.update = function(dt) {
    var index;
    this.life -= dt;
    this.y -= 0.2;
    if (this.life <= 0) {
      index = Pop.all.indexOf(this);
      return Pop.all.splice(index, 1);
    }
  };

  Pop.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.life < Pop.midLife) {
      ctx.scale(this.life / Pop.midLife, this.life / Pop.midLife);
    }
    ctx.font = 'bold 30px Grobold';
    ctx.fillStyle = rgb(255, 255, 255);
    ctx.strokeStyle = rgb(0, 0, 0);
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    ctx.fillText(this.text, 0, 0);
    ctx.strokeText(this.text, 0, 0);
    return ctx.restore();
  };

  return Pop;

})(InterfaceElement);

var SpellsPanel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SpellsPanel = (function(superClass) {
  extend(SpellsPanel, superClass);

  function SpellsPanel(x, y, arg) {
    var reversed;
    reversed = arg.reversed;
    SpellsPanel.__super__.constructor.call(this, x, y);
    this.reversed = reversed;
    if (this.reversed) {
      this.setX(Game.getWidth() - 24);
    }
  }

  SpellsPanel.prototype.update = function(dt) {
    var i, len, miniature, ref, results;
    ref = this.children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      miniature = ref[i];
      results.push(miniature.update(dt));
    }
    return results;
  };

  SpellsPanel.prototype.fillSpellsWithPlayer = function(player) {
    var incr, spells;
    spells = player.getSpells();
    incr = this.reversed ? -20 : 20;
    return spells.forEach((function(_this) {
      return function(spell, index) {
        var miniature;
        miniature = new Miniature(spell.getSmallImage(), spell.getName(), index * incr, 0, 16, 16, {
          reversed: _this.reversed
        });
        return _this.addChild(miniature);
      };
    })(this));
  };

  return SpellsPanel;

})(InterfaceElement);

var Tooltip,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Tooltip = (function(superClass) {
  extend(Tooltip, superClass);

  function Tooltip(x, y, text) {
    Tooltip.__super__.constructor.call(this, x, y);
    this.padding = 10;
    this.sprite.font = '14px normal Arial';
    this.sprite.fillStyle = rgb(0, 0, 0);
    this.sprite.textAlign = 'left';
    this.lineHeight = 18;
    this.setText(text);
  }

  Tooltip.prototype.setText = function(text) {
    var i, len, maxWidth, ref, texts, width;
    texts = text.split("\n");
    texts = texts.map(function(str) {
      return str.trim();
    });
    this.texts = texts;
    maxWidth = 0;
    ref = this.texts;
    for (i = 0, len = ref.length; i < len; i++) {
      text = ref[i];
      width = Math.ceil(this.sprite.measureText(text).width + this.padding * 2);
      if (width > maxWidth) {
        maxWidth = width;
      }
    }
    this.width = maxWidth;
    return this.height = this.texts.length * this.lineHeight - 2;
  };

  Tooltip.prototype.computeDraw = function() {
    var i, len, parts, re, ref, results, text, width, y;
    this.sprite.drawDialog(0, 0, this.width, this.height);
    y = 10;
    ref = this.texts;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      text = ref[i];
      re = /\*\*(.+)\*\*(.+)/;
      parts = text.split(re);
      if (parts.length === 4) {
        this.sprite.font = 'bold 12px Arial';
        this.sprite.fillText(parts[1], 8, y);
        width = this.sprite.measureText(parts[1]).width;
        this.sprite.font = '12px Arial';
        this.sprite.fillText(parts[2], 8 + width, y);
      } else {
        this.sprite.fillText(text, 8, y);
      }
      results.push(y += this.lineHeight);
    }
    return results;
  };

  Tooltip.prototype.getWidth = function() {
    return this.width;
  };

  return Tooltip;

})(InterfaceElement);

var WeaponsPanel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WeaponsPanel = (function(superClass) {
  extend(WeaponsPanel, superClass);

  function WeaponsPanel(x, y, arg) {
    var reversed;
    reversed = arg.reversed;
    WeaponsPanel.__super__.constructor.call(this, x, y);
    this.reversed = reversed;
    if (this.reversed) {
      this.setX(Game.getWidth() - 88);
    }
  }

  WeaponsPanel.prototype.update = function(dt) {
    var i, len, miniature, ref, results;
    ref = this.children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      miniature = ref[i];
      results.push(miniature.update(dt));
    }
    return results;
  };

  WeaponsPanel.prototype.fillWeaponsWithPlayer = function(player) {
    var incr, weapons;
    weapons = player.getWeapons();
    incr = this.reversed ? -20 : 20;
    return weapons.forEach((function(_this) {
      return function(weapon, index) {
        var miniature;
        miniature = new Miniature(weapon.getSmallImage(), weapon.getName(), index * incr, 0, 16, 16, {
          reversed: _this.reversed
        });
        return _this.addChild(miniature);
      };
    })(this));
  };

  return WeaponsPanel;

})(InterfaceElement);

var Weapon;

Weapon = (function() {
  function Weapon(arg) {
    var attack, combo, damage, dodge, margin, name, reattack, riposte;
    name = arg.name, damage = arg.damage, margin = arg.margin, dodge = arg.dodge, riposte = arg.riposte, attack = arg.attack, reattack = arg.reattack, combo = arg.combo;
    if (name == null) {
      name = 'Attaque';
    }
    if (damage == null) {
      damage = 5;
    }
    if (margin == null) {
      margin = 0;
    }
    if (dodge == null) {
      dodge = .05;
    }
    if (riposte == null) {
      riposte = .05;
    }
    if (attack == null) {
      attack = .95;
    }
    if (reattack == null) {
      reattack = .05;
    }
    if (combo == null) {
      combo = .05;
    }
    this.name = name;
    this.damage = damage;
    this.margin = margin;
    this.dodge = dodge;
    this.riposte = riposte;
    this.attack = attack;
    this.reattack = reattack;
    this.combo = combo;
    this.image = {
      big: null,
      small: null
    };
  }

  Weapon.prototype.getName = function() {
    return this.name;
  };

  Weapon.prototype.getDamage = function() {
    return this.damage;
  };

  Weapon.prototype.getMargin = function() {
    return this.margin;
  };

  Weapon.prototype.getDodge = function() {
    return this.dodge;
  };

  Weapon.prototype.getRiposte = function() {
    return this.riposte;
  };

  Weapon.prototype.getAttack = function() {
    return this.attack;
  };

  Weapon.prototype.getReattack = function() {
    return this.reattack;
  };

  Weapon.prototype.getCombo = function() {
    return this.combo;
  };

  Weapon.prototype.getBigImage = function() {
    return this.image.big;
  };

  Weapon.prototype.getSmallImage = function() {
    return this.image.small;
  };

  Weapon.prototype.setBigImage = function(img) {
    return this.image.big = img;
  };

  Weapon.prototype.setSmallImage = function(img) {
    return this.image.small = img;
  };

  return Weapon;

})();

var WeaponBroom,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WeaponBroom = (function(superClass) {
  extend(WeaponBroom, superClass);

  function WeaponBroom() {
    WeaponBroom.__super__.constructor.call(this, {
      name: 'Balai',
      damage: 10,
      margin: 2,
      dodge: .05,
      riposte: .20,
      attack: .85,
      reattack: .10,
      combo: .05
    });
    this.setSmallImage(Img.get('miniatureWeaponBroom'));
  }

  return WeaponBroom;

})(Weapon);

var WeaponCerals,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WeaponCerals = (function(superClass) {
  extend(WeaponCerals, superClass);

  function WeaponCerals() {
    WeaponCerals.__super__.constructor.call(this, {
      name: 'Céréales',
      damage: 5,
      margin: 2,
      dodge: .10,
      riposte: .00,
      attack: .65,
      reattack: .70,
      combo: .05
    });
    this.setSmallImage(Img.get('miniatureWeaponCereals'));
  }

  return WeaponCerals;

})(Weapon);

var WeaponHand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WeaponHand = (function(superClass) {
  extend(WeaponHand, superClass);

  function WeaponHand() {
    WeaponHand.__super__.constructor.call(this, {
      name: 'Poings',
      damage: 8,
      margin: 1,
      dodge: .15,
      riposte: .50,
      attack: .95,
      reattack: .05,
      combo: .05
    });
    this.setSmallImage(Img.get('miniatureWeaponHand'));
  }

  return WeaponHand;

})(Weapon);

var WeaponSnake,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WeaponSnake = (function(superClass) {
  extend(WeaponSnake, superClass);

  function WeaponSnake() {
    WeaponSnake.__super__.constructor.call(this, {
      name: 'Serpent',
      damage: 10,
      margin: 1,
      dodge: .05,
      riposte: .05,
      attack: .80,
      reattack: .05,
      combo: .30
    });
    this.setSmallImage(Img.get('miniatureWeaponSnake'));
  }

  return WeaponSnake;

})(Weapon);

var WeaponWand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WeaponWand = (function(superClass) {
  extend(WeaponWand, superClass);

  function WeaponWand() {
    WeaponWand.__super__.constructor.call(this, {
      name: 'Baguette magique',
      damage: 6,
      margin: 2,
      dodge: .10,
      riposte: .05,
      attack: .90,
      reattack: .05,
      combo: .05
    });
    this.setSmallImage(Img.get('miniatureWeaponWand'));
  }

  return WeaponWand;

})(Weapon);

var dArr;

dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1];

CanvasRenderingContext2D.prototype.drawOutlinedImage = function(img, x, y, borderSize, color) {
  var i, j, ref;
  for (i = j = 0, ref = dArr.length; j <= ref; i = j += 2) {
    this.drawImage(img, x + dArr[i] * borderSize, y + dArr[i + 1] * borderSize);
  }
  this.globalCompositeOperation = 'source-in';
  this.fillStyle = color;
  this.fillRect(0, 0, can.width, can.height);
  this.globalCompositeOperation = 'source-over';
  return this.drawImage(img, x, y);
};

CanvasRenderingContext2D.prototype.drawDialog = function(x, y, w, h) {
  var imgDialog;
  this.save();
  this.translate(x, y);
  imgDialog = Img.get('dialog');
  this.drawImage(imgDialog, 0, 0, 8, 8, 0, 0, 8, 8);
  this.drawImage(imgDialog, 8, 0, 8, 8, 8, 0, w - 16, 8);
  this.drawImage(imgDialog, 16, 0, 8, 8, w - 8, 0, 8, 8);
  this.drawImage(imgDialog, 0, 8, 8, 8, 0, 8, 8, h);
  this.drawImage(imgDialog, 8, 8, 8, 8, 8, 8, w - 16, h);
  this.drawImage(imgDialog, 16, 8, 8, 8, w - 8, 8, 8, h);
  this.drawImage(imgDialog, 0, 16, 8, 8, 0, h + 8, 8, 8);
  this.drawImage(imgDialog, 8, 16, 8, 8, 8, h + 8, w - 16, 8);
  this.drawImage(imgDialog, 16, 16, 8, 8, w - 8, h + 8, 8, 8);
  return this.restore();
};


/*
CanvasRenderingContext2D::fillWrapText = (text, x, y, maxWidth, lineHeight) ->
	words = text.split(' ')
	line = ''

	for n in [ 0 ... words.length ]
		testLine	= line + words[n] + ' '
		metrics	 = @measureText(testLine)
		testWidth = metrics.width

		if testWidth > maxWidth
			@fillText(line, x, y)
			line = words[n] + ' '
			y	 += lineHeight
		else
			line = testLine

	@fillText(line, x, y)
 */

var Img;

Img = (function() {
  function Img() {}

  Img.images = {};

  Img.path = 'img/';

  Img.callback = function() {};

  Img.preload = function(images, callback) {
    return Img.images = Img.preloadImages(images, callback);
  };

  Img.get = function(name) {
    return Img.images[name];
  };

  Img.setAttribute = function(name, attribute, value) {
    return Img.images[name][attribute] = value;
  };

  Img.setPath = function(path) {
    return Img.path = path + '/';
  };

  Img.setCallback = function(callback) {
    return Img.callback = callback;
  };

  Img.getPath = function() {
    return Img.path;
  };

  Img.preloadImages = function(images) {
    var i, imagesLoaded, nbImagesLoaded, nbImagesToLoad, newImageLoaded, preload;
    nbImagesLoaded = 0;
    nbImagesToLoad = Object.keys(images).length;
    imagesLoaded = {};
    newImageLoaded = function() {
      return nbImagesLoaded++;
    };
    for (i in images) {
      imagesLoaded[i] = new Image();
      imagesLoaded[i].onload = newImageLoaded;
      imagesLoaded[i].src = Img.getPath() + images[i];
    }
    preload = function() {
      if (nbImagesLoaded === nbImagesToLoad) {
        return Img.callback();
      } else {
        return setTimeout(preload, 100);
      }
    };
    preload();
    return imagesLoaded;
  };

  return Img;

})();

var Point;

Point = (function() {
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.getX = function() {
    return this.x;
  };

  Point.prototype.getY = function() {
    return this.y;
  };

  Point.prototype.setX = function(x) {
    return this.x = x;
  };

  Point.prototype.setY = function(y) {
    return this.y = y;
  };

  Point.prototype.add = function(point) {
    this.x += point.getX();
    return this.y += point.getY();
  };

  return Point;

})();

var Timer;

Timer = (function() {
  function Timer() {
    this.dt = 0;
    this.last = Date.now();
    this.time = 0;
    this.cross = 0;
  }

  Timer.prototype.update = function() {
    this.dt = Date.now() - this.last;
    this.last = Date.now();
    this.time += this.dt;
    return this.cross++;
  };

  Timer.prototype.getDt = function() {
    return this.dt;
  };

  Timer.prototype.getCross = function() {
    return this.cross;
  };

  return Timer;

})();

var linear, log, rgb,
  hasProp = {}.hasOwnProperty;

if (Object.keys == null) {
  Object.keys = function(obj) {
    var key, results;
    results = [];
    for (key in obj) {
      if (!hasProp.call(obj, key)) continue;
      results.push(key);
    }
    return results;
  };
}

Object.clone = function(obj) {
  var key, temp;
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  temp = new obj.constructor();
  for (key in obj) {
    temp[key] = Object.clone(obj[key]);
  }
  return temp;
};

Math.rand = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

linear = function(variation, value) {
  return variation[0] + (variation[1] - variation[0]) * value;
};

rgb = function(r, g, b, a) {
  if (a == null) {
    a = 1;
  }
  if (a === 1) {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  } else {
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }
};

log = function(message) {
  if (debug) {
    return console.log(message);
  }
};

var Game, debug, game, images,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Game = (function() {
  Game.mouse = null;

  Game.width = 500;

  Game.height = 300;

  Game.getMouse = function() {
    return Game.mouse;
  };

  Game.getWidth = function() {
    return Game.width;
  };

  Game.getHeight = function() {
    return Game.height;
  };

  function Game() {
    this.loopGame = bind(this.loopGame, this);
    this.init = bind(this.init, this);
    this.can = document.getElementById('game');
    this.ctx = this.can.getContext('2d');
    this.ctx.textBaseline = 'top';
    this.loadingScreen();
    this.timer = new Timer();
    Game.mouse = new Mouse(this.can);
  }

  Game.prototype.loadingScreen = function() {
    this.ctx.fillStyle = rgb(0, 0, 0);
    this.ctx.fillRect(0, 0, Game.getWidth(), Game.getHeight());
    this.ctx.font = '20px normal Arial';
    this.ctx.fillStyle = rgb(255, 255, 255);
    this.ctx.textAlign = 'center';
    return this.ctx.fillText('Chargement en cours...', Game.getWidth() / 2, Game.getHeight() / 2);
  };

  Game.prototype.init = function() {
    this.p1 = new Player();
    this.p1.setName('Joueur1');
    this.p1.setElement(Element.Ice);
    this.p1.addWeapon(new WeaponBroom());
    this.p1.addWeapon(new WeaponWand());
    this.p1.addSpell(new SpellIceball());
    this.p1.addSpell(new SpellFireball());
    this.p1.setX(100);
    this.p2 = new Player();
    this.p2.setName('Joueur2');
    this.p2.setElement(Element.Fire);
    this.p2.addWeapon(new WeaponBroom());
    this.p2.addWeapon(new WeaponWand());
    this.p2.addSpell(new SpellFireball());
    this.p2.addSpell(new SpellIceball());
    this.p2.setX(390);
    this.p2.flip();
    this.panel1 = new Panel({
      reversed: false
    });
    this.panel1.fillInformationsWithPlayer(this.p1);
    this.panel2 = new Panel({
      reversed: true
    });
    this.panel2.fillInformationsWithPlayer(this.p2);
    setTimeout((function(_this) {
      return function() {
        return _this.turnp1();
      };
    })(this), 1000);
    return this.loopGame();
  };

  Game.prototype.loopGame = function() {
    this.processInput();
    this.update();
    this.render();
    return requestAnimationFrame(this.loopGame);
  };

  Game.prototype.processInput = function() {
    return Game.mouse.update();
  };

  Game.prototype.update = function() {
    var i, pop, winner;
    this.timer.update();
    this.p1.update(this.timer.getDt());
    this.p2.update(this.timer.getDt());
    i = Pop.all.length;
    while (i--) {
      pop = Pop.all[i];
      pop.update(this.timer.getDt());
    }
    this.panel1.update();
    this.panel2.update();
    this.panel1.getLifebar().setPercentage(this.p1.getLifePercentage());
    this.panel2.getLifebar().setPercentage(this.p2.getLifePercentage());
    winner = this.getWinner();
    if (winner) {
      if (winner === this.p1) {
        new Pop('Gagnant', this.p1.getX(), this.p1.getY());
      } else if (winner === this.p2) {
        new Pop('Gagnant', this.p2.getX(), this.p2.getY());
      }
    }
    if (winner) {
      clearTimeout(this.to1);
      clearTimeout(this.to2);
    }
  };

  Game.prototype.computeFirstPlayer = function() {
    return this.p1;
  };

  Game.prototype.turnp1 = function() {
    this.p1.turn(this.p2);
    return this.to1 = setTimeout((function(_this) {
      return function() {
        return _this.turnp2();
      };
    })(this), 600);
  };

  Game.prototype.turnp2 = function() {

    /*
    		@p2.turn(@p1)
    
    		@to2 = setTimeout(=>
    			@turnp1()
    		, 600)
     */
  };

  Game.prototype.render = function() {
    var j, len, pop, ref, tmp, tmpCtx;
    tmp = document.createElement('canvas');
    tmp.width = Game.getWidth();
    tmp.height = Game.getHeight();
    tmpCtx = tmp.getContext('2d');
    this.p1.draw(tmpCtx);
    this.p2.draw(tmpCtx);
    this.ctx.clearRect(0, 0, Game.getWidth(), Game.getHeight());
    this.ctx.drawImage(Img.get('arena'), 0, 0);
    this.ctx.drawImage(tmp, 0, 20);
    ref = Pop.all;
    for (j = 0, len = ref.length; j < len; j++) {
      pop = ref[j];
      pop.draw(this.ctx);
    }
    this.panel1.draw(this.ctx);
    return this.panel2.draw(this.ctx);
  };

  Game.prototype.getWinner = function() {
    if (this.p1.isAlive() && this.p2.isDead()) {
      return this.p1;
    } else if (this.p1.isDead() && this.p2.isAlive()) {
      return this.p2;
    } else {
      return null;
    }
  };

  return Game;

})();

images = {
  head: 'player/head.png',
  body: 'player/body.png',
  upLeftArm: 'player/up-left-arm.png',
  bottomLeftArm: 'player/bottom-left-arm.png',
  leftHand: 'player/left-hand.png',
  upRightArm: 'player/up-right-arm.png',
  bottomRightArm: 'player/bottom-right-arm.png',
  rightHand: 'player/right-hand.png',
  upLeftLeg: 'player/up-left-leg.png',
  bottomLeftLeg: 'player/bottom-left-leg.png',
  leftFoot: 'player/left-foot.png',
  upRightLeg: 'player/up-right-leg.png',
  bottomRightLeg: 'player/bottom-right-leg.png',
  rightFoot: 'player/right-foot.png',
  miniatureWeaponBroom: 'weapon/small/broom.png',
  miniatureWeaponCerals: 'weapon/small/cereals.png',
  miniatureWeaponHand: 'weapon/small/hand.png',
  miniatureWeaponSnake: 'weapon/small/snake.png',
  miniatureWeaponWand: 'weapon/small/wand.png',
  'spell-small-fireball': 'spell/small/fireball.png',
  'spell-small-iceball': 'spell/small/iceball.png',
  'user-informations': 'ui/user-informations.png',
  lifebar: 'ui/lifebar.png',
  arena: 'ui/arena.png',
  dialog: 'ui/dialog.png'
};

debug = true;

game = new Game();

Img.setPath('assets/img');

Img.setCallback(game.init);

Img.preload(images);
