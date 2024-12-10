(function() {
  var __create = Object.create ? Object.create : function(prototype) {
    return {'__proto__': prototype};
  };

  function __extends(derived, base) {
    derived.prototype = __create(base.prototype);
    derived.prototype.constructor = derived;
  }

  var __imul = Math.imul ? Math.imul : function(a, b) {
    return (a * (b >>> 16) << 16) + a * (b & 65535) | 0;
  };

  function assert(truth) {
    if (!truth) {
      throw Error('Assertion failed');
    }
  }

  // Point d'entrée de l'application
  function main() {
    // Images à charger
    var images = in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(in_StringMap.insert(new Map(), 'player', 'player.png'), 'wall', 'wall.png'), 'ground', 'ground.png'), 'font', 'font.png'), 'font2', 'font2.png'), 'barrel', 'block-barrel.png'), 'mine', 'block-mine.png'), 'dynamite', 'block-dynamite.png'), 'crate', 'block-crate.png'), 'bullet', 'bullet-normal.png'), 'rocketLauncherBullet', 'bullet-rocket-launcher.png'), 'grenade', 'bullet-grenade.png'), 'miniatures', 'miniatures-weapons.png'), 'bonusIncreaseHealth', 'bonus-increase-health.png');

    // Création de l'application
    var game = new Game();

    // Évènement : redimensionnement
    in_HTMLWindow.addEventListener1(window, 'resize', function() {
      game.resize();
    });

    // Charge les images et lance l'application une fois qu'elles sont chargées
    Img.setPath('assets/img');
    Img.setCallback(function() {
      game.init();
    });
    Img.load(images);
  }

  // Couleur RGB
  // à faire : compiler en un entier plutôt qu'en une chaine
  function rgb1(r, g, b) {
    return 'rgb(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ')';
  }

  // Couleur RGBA
  // à faire : compiler en un entier plutôt qu'en une chaine ?
  function rgb2(r, g, b, a) {
    return 'rgba(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ', ' + a.toString() + ')';
  }

  // Détermine si l'appareil utilisé est un mobile ou non
  function mobilecheck() {
    var ref1;
    var ref;
    var userAgent = (ref1 = navigator.userAgent) !== null ? ref1 : (ref = navigator.vendor) !== null ? ref : window.opera;
    var check = false;

    if (new RegExp('(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino', 'i').test(userAgent) || new RegExp('1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-', 'i').test(userAgent.substr(0, 4))) {
      check = true;
    }

    return check;
  }

  // Récupération du timestamp
  function timestamp() {
    return in_HTMLPerformance.now(window.performance);
  }

  // Créer une animation
  function Animation(image, frames, frameWidth, frameHeight) {
    this.image = null;
    this.frames = null;
    this.frameDuration = 0;
    this.looped = false;
    this.frameWidth = 0;
    this.frameHeight = 0;
    this.timer = 0;
    this.currentIndex = 0;
    this.image = image;
    this.frames = frames;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameDuration = 0.1;
    this.looped = true;
    this.timer = 0;
    this.currentIndex = 0;
  }

  Animation.prototype.update = function(dt) {
    // Si l'animation est terminée et qu'elle le boucle pas, la fonction est
    // stoppée
    if (this.isCurrentAnimationFinished()) {
      return;
    }

    // Met à jour le compteur
    this.timer += dt;

    // Si le compteur dépasse le temps entre deux frames :
    // - On passe à la frame suivante ;
    // - Si la nouvelle frame n'existe pas et que l'animation est bouclée, on
    //   revient à la première frame ;
    // - On remet le compteur à zéro.
    if (this.timer > this.frameDuration) {
      this.currentIndex = this.currentIndex + 1 | 0;

      if (this.currentIndex >= this.frames.length && this.looped) {
        this.currentIndex = 0;
      }

      this.timer = 0;
    }
  };

  // Rendu de l'animation (affiche la frame courante)
  Animation.prototype.render = function(ctx) {
    in_CanvasRenderingContext2D.drawImageByIndex(ctx, this.image, 0, 0, this.currentFrame(), this.frameWidth, this.frameHeight);
  };

  // Retourne l'index de la frame courante
  Animation.prototype.currentFrame = function() {
    return in_List.get(this.frames, this.currentIndex);
  };

  // L'animation courante est-elle terminée ?
  Animation.prototype.isCurrentAnimationFinished = function() {
    return this.currentIndex >= this.frames.length && !this.looped;
  };

  function AnimationManager(image, frameWidth, frameHeight) {
    this.image = null;
    this.frameWidth = 0;
    this.frameHeight = 0;
    this.animations = null;
    this.currentAnimation = null;
    this.image = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.animations = new Map();
    this.currentAnimation = null;
  }

  AnimationManager.prototype.update = function(dt) {
    if (this.hasCurrentAnimation()) {
      this.currentAnimation.update(dt);
    }
  };

  AnimationManager.prototype.render = function(ctx) {
    if (this.hasCurrentAnimation()) {
      this.currentAnimation.render(ctx);
    }

    else if (!this.hasAnimations()) {
      ctx.drawImage(this.image, 0, 0);
    }
  };

  AnimationManager.prototype.addAnimation = function(name, frames) {
    var animation = new Animation(this.image, frames, this.frameWidth, this.frameHeight);
    in_StringMap.set(this.animations, name, animation);
  };

  AnimationManager.prototype.hasCurrentAnimation = function() {
    return this.currentAnimation != null;
  };

  AnimationManager.prototype.getAnimation = function(name) {
    return in_StringMap.get1(this.animations, name);
  };

  AnimationManager.prototype.hasAnimations = function() {
    return !(this.animations.size == 0);
  };

  function Circle(x, y, radius) {
    this.position = null;
    this.radius = 0;
    this.position = new Point(x, y);
    this.radius = radius;
  }

  // Récupérer la position x du cercle
  Circle.prototype.x = function() {
    return this.position.x;
  };

  // Récupérer la position y du cercle
  Circle.prototype.y = function() {
    return this.position.y;
  };

  function Explosion(x, y, radius, damages) {
    Circle.call(this, x, y, radius);
    this.damages = 0;
    this.circleSprite = null;
    this.damages = damages;
    this.updateCircleSprite();
  }

  __extends(Explosion, Circle);

  // Mettre à jour l'image du rayon de l'explosion
  Explosion.prototype.updateCircleSprite = function() {
    var can = document.createElement('canvas');
    can.width = this.radius * 2 + 1 | 0;
    can.height = can.width;
    this.circleSprite = in_HTMLCanvasElement.getContext2D(can);
    in_CanvasRenderingContext2D.setFillStyle(this.circleSprite, rgb2(255, 0, 0, 0.1));
    in_CanvasRenderingContext2D.setStrokeStyle(this.circleSprite, rgb2(255, 0, 0, 0.4));
    in_CanvasRenderingContext2D.drawPixelatedCircle(this.circleSprite, this.radius, this.radius, this.radius);
  };

  // Déclenche l'explosion
  Explosion.prototype.explode = function(b) {
    if (b.canBeRemoved()) {
      return;
    }

    Level.launchExplosion(this);

    for (var i = 0, list = this.playersInExplosionRay(), count = list.length; i < count; i = i + 1 | 0) {
      var player = in_List.get(list, i);
      player.decreaseHealth(this.damages);
      player.setInvicibleDelay(4);
    }

    for (var i1 = 0, list1 = this.blocksInExplosionRay(), count1 = list1.length; i1 < count1; i1 = i1 + 1 | 0) {
      var b2 = in_List.get(list1, i1);

      if (b == b2) {
        continue;
      }

      b2.onExplosion(this);
    }
  };

  // Joueurs se trouvant dans le rayon de l'explosion
  Explosion.prototype.playersInExplosionRay = function() {
    return Level.getPlayersInRay(this);
  };

  // Blocs se trouvant dans le rayon de l'explosion
  Explosion.prototype.blocksInExplosionRay = function() {
    return Level.getBlocksInRay(this);
  };

  function Game() {
    this.can = null;
    this.ctx = null;
    this.player = null;
    this.inventory = null;
    this.playerInfo = null;
    this.now = 0;
    this.dt = 0;
    this.last = 0;
    this.kb = null;
    this.mouse = null;
    this.mousePos = null;
    this.buttons = null;
    this.stick = null;
    this.can = document.getElementById('app');
  }

  // à faire : ne pas créer d'objet dans une boucle aussi géante et ne pas tester ce qui
  // est hors de l'écran.
  // à appeler seulement au déplacement
  Game.collide = function(dt, p) {
    var blocks = Level.getBlocksAround(p.circle());
    var vx = p.xnorm * Player.maxspeed * dt;
    var vy = p.ynorm * Player.maxspeed * dt;
    var c = new Rect(p.x() + vx, p.y() + vy, p.width, p.height);
    var cx = new Rect(p.x() + vx, p.y(), p.width, p.height);
    var cy = new Rect(p.x(), p.y() + vy, p.width, p.height);

    for (var i = 0, count = blocks.length; i < count; i = i + 1 | 0) {
      var b = in_List.get(blocks, i);

      if (Hit.rectHitRect(c, b)) {
        if (b.isSolid()) {
          if (Hit.rectHitRect(cx, b)) {
            if (vx < 0) {
              vx = b.x() + b.width - p.x();
            }

            else if (vx > 0) {
              vx = b.x() - p.x() - p.width;
            }
          }

          if (Hit.rectHitRect(cy, b)) {
            if (vy < 0) {
              vy = b.y() + b.height - p.y();
            }

            else if (vy > 0) {
              vy = b.y() - p.y() - p.height;
            }
          }
        }

        else {
          b.onPlayerOverlaps(p);
        }
      }
    }

    p.setX(p.x() + vx);
    p.setY(p.y() + vy);
  };

  Game.prototype.init = function() {
    this.ctx = in_HTMLCanvasElement.getContext2D(this.can);
    this.resize();

    // var btnLogin = document.getElementById("btn-login")

    // btnLogin.addEventListener("click", => {
    // 	launchGame
    // })

    // Gestion du temps, des durées, ...
    this.now = timestamp();
    this.dt = 0;
    this.last = timestamp();

    // Génération du niveau
    // Placement du joueur sur la première case libre du niveau
    // Génération du rendu de la carte des éléments fixes
    Level.generate();
    Level.generateRender();
    this.launchGame();
    this.frame();
  };

  Game.prototype.launchGame = function() {
    var self = this;
    Game.isInGame = true;

    // Joueur
    var name = document.getElementById('input-name').value;
    self.player = new Player(name);
    new Player('Computer');

    // Cacher la zone de saisie du pseudonyme
    document.querySelector('.login').style.display = 'none';

    // Souris
    if (isMobile) {
      self.mouse = new input.Touch(self.can);
    }

    else {
      self.mouse = new input.Mouse(self.can);
    }

    // Position de la soursis
    self.mousePos = new Point(0, 0);

    // Clavier
    self.kb = new input.Keyboard();

    // Informations sur le joueur
    self.playerInfo = new ui.PlayerInfo();
    self.playerInfo.bindTo(self.player);

    // Inventaire
    self.inventory = new ui.Inventory();
    self.inventory.bindTo(self.player);

    // ------------------------------
    // Mise à jour du choix de l'arme
    // ------------------------------
    in_HTMLDocument.addEventListener6(document, 'wheel', function(e) {
      var ref;
      var wheelValue = e.deltaY;
      var direction = PointerDirection.NONE;

      if (wheelValue < 0) {
        direction = PointerDirection.BOTTOM;
      }

      else if (wheelValue > 0) {
        direction = PointerDirection.TOP;
      }

      (ref = self.player).currentWeaponIndex = ref.currentWeaponIndex + in_PointerDirection.toInt(direction) | 0;

      if (self.player.currentWeaponIndex > (self.player.weapons.length - 1 | 0)) {
        self.player.currentWeaponIndex = self.player.weapons.length - 1 | 0;
      }

      else if (self.player.currentWeaponIndex < 0) {
        self.player.currentWeaponIndex = 0;
      }
    });

    // Boutons pour mobile
    if (isMobile) {
      var btnUp = new widget.Button(30, 30, 20, 20, Position.BOTTOM_LEFT).on('hover', function() {
        self.player.velocity.y -= 180;
      });
      var btnDown = new widget.Button(30, 5, 20, 20, Position.BOTTOM_LEFT).on('hover', function() {
        self.player.velocity.y += 180;
      });
      var btnLeft = new widget.Button(5, 5, 20, 20, Position.BOTTOM_LEFT).on('hover', function() {
        self.player.velocity.x -= 180;
      });
      var btnRight = new widget.Button(55, 5, 20, 20, Position.BOTTOM_LEFT).on('hover', function() {
        self.player.velocity.x += 180;
      });
      var btnPreviousWeapon = new widget.Button(4, 24, 16, 16, Position.TOP_LEFT).on('click', function() {
        var ref;

        if (self.player.currentWeaponIndex == 0) {
          self.player.currentWeaponIndex = self.player.weapons.length - 1 | 0;
        }

        else {
          (ref = self.player).currentWeaponIndex = ref.currentWeaponIndex - 1 | 0;
        }
      });
      var btnNextWeapon = new widget.Button(4, 56, 16, 16, Position.TOP_LEFT).on('click', function() {
        var ref;

        if (self.player.currentWeaponIndex == (self.player.weapons.length - 1 | 0)) {
          self.player.currentWeaponIndex = 0;
        }

        else {
          (ref = self.player).currentWeaponIndex = ref.currentWeaponIndex + 1 | 0;
        }
      });
      self.buttons = [btnUp, btnDown, btnLeft, btnRight, btnPreviousWeapon, btnNextWeapon];
      self.stick = new widget.Stick(20, 20, 20, Position.BOTTOM_RIGHT);
    }
  };

  // Boucle de jeu
  // Voir http://bit.ly/1PNVNem (http://codeincomplete.com/)
  Game.prototype.frame = function() {
    var self = this;
    self.now = timestamp();
    self.dt = self.dt + Math.min(1, (self.now - self.last) / 1000);

    while (self.dt > Game.STEP) {
      self.dt = self.dt - Game.STEP;
      self.update(Game.STEP);
    }

    self.render();
    self.last = self.now;

    if (Game.isInGame) {
      self.mouse.update();
      self.mousePos = self.mouse.getCanvasCoordinates();
    }

    requestAnimationFrame(function() {
      self.frame();
    });
  };

  Game.prototype.update = function(step) {
    if (!Game.isInGame) {
      return;
    }

    // ---------------------
    // Déplacement du joueur
    // ---------------------
    // Si le support n'est pas un mobile, ou que le curseur est levé :
    // - Annulation des déplacements du joueur
    if (isNotMobile || !this.mouse.down()) {
      this.player.velocity.x = 0;
      this.player.velocity.y = 0;
    }

    // Déplacement à gauche lorsque touche Gauche ou Q enfoncée
    if (this.kb.down(Key.Left) || this.kb.down(Key.Q)) {
      this.player.velocity.x -= 180;
    }

    // Déplacement à droite lorsque touche Droite ou D enfoncée
    if (this.kb.down(Key.Right) || this.kb.down(Key.D)) {
      this.player.velocity.x += 180;
    }

    // Déplacement en haut lorsque touche Haut ou Z enfoncée
    if (this.kb.down(Key.Up) || this.kb.down(Key.Z)) {
      this.player.velocity.y -= 180;
    }

    // Déplacement en bas lorsque touche Bas ou S enfoncée
    if (this.kb.down(Key.Down) || this.kb.down(Key.S)) {
      this.player.velocity.y += 180;
    }

    // Correction des déplacements
    this.player.updateNorm();

    // ----------
    // Collisions
    // ----------
    // Si le joueur est en déplacement :
    // - Test des collisions entre le joueur et les murs
    if (this.player.velocity.x != 0 || this.player.velocity.y != 0) {
      Game.collide(step, this.player);
    }

    // ------
    // Joueur
    // ------
    // Le joueur pointe vers le curseur
    this.player.angleTo(this.mousePos);

    // Mise à jour des informations du joueur
    this.player.update(step);

    // ------
    // Camera
    // ------
    // Met à jour la position de la caméra
    Game.camera.setPosition(-(this.player.x() + (this.player.width / 2 | 0)) + ((Game.width / Game.scale | 0) / 2 | 0), -(this.player.y() + (this.player.height / 2 | 0)) + ((Game.height / Game.scale | 0) / 2 | 0));

    // Si n'est pas mobile et curseur enfoncé :
    // - Tirer
    // Sinon si est mobile et stick de tir pressé :
    // - Tirer
    if (isNotMobile && this.mouse.down()) {
      // Tir vers le curseur
      this.player.fire(this.mousePos);
    }

    else if (isMobile && this.stick.pressed) {
      // Tir dans l'angle du stick
      var pos = this.player.center().add(this.stick.getStickPosition());
      this.player.fire(pos);
    }

    // ---------------------
    // Mise à jour des blocs
    // ---------------------
    for (var i = 0, list = Level.blocks, count = list.length; i < count; i = i + 1 | 0) {
      var b = in_List.get(list, i);
      b.update(step);
    }

    in_List.removeIf(Level.blocks, function(block) {
      return block.canBeRemoved();
    });

    // ------
    // Balles
    // ------
    for (var i1 = 0, list1 = Level.projectiles, count1 = list1.length; i1 < count1; i1 = i1 + 1 | 0) {
      var b1 = in_List.get(list1, i1);
      b1.update(step);
    }

    in_List.removeIf(Level.projectiles, function(projectile) {
      return projectile.canBeRemoved();
    });
    in_List.removeIf(Level.blocks, function(block) {
      return block.canBeRemoved();
    });

    // ------
    // Traînées
    // ------
    for (var i2 = 0, list2 = Level.trails, count2 = list2.length; i2 < count2; i2 = i2 + 1 | 0) {
      var trail = in_List.get(list2, i2);
      trail.update(step);
    }

    in_List.removeIf(Level.trails, function(trail) {
      return trail.canBeRemoved();
    });
    this.bulletsOverlaps();

    // ----------
    // Particules
    // ----------
    Particle.updateAll(step);

    // --------------------
    // Boutons pour mobile
    // -------------------
    // Si touché :
    // - Annulation des déplacements du joueur
    // - Si bouton appuyé : exécution de l'action « hover » de celui-ci
    if (isMobile && this.mouse.down()) {
      this.player.velocity.x = 0;
      this.player.velocity.y = 0;

      for (var i3 = 0, list3 = this.buttons, count3 = list3.length; i3 < count3; i3 = i3 + 1 | 0) {
        var button = in_List.get(list3, i3);

        if (this.mouse.inRect(button.rect())) {
          if (this.mouse.down()) {
            button.fire('hover');
          }

          if (this.mouse.press()) {
            button.fire('click');
          }
        }
      }
    }

    // ------------
    // Stick de tir
    // ------------
    // Appui sur le stick de tir :
    // - Stick de tir pressé
    // - Vise vers le doigt
    if (isMobile && this.mouse.press()) {
      if (this.mouse.inRect(this.stick.rect())) {
        this.stick.pressed = true;
        this.stick.pointsTo = this.mouse.getPositionRelativeTo(this.stick.rect());
      }
    }

    // Doigt levé, si stick de tir pressé :
    // - Stick de tir n'est plus pressé
    // - Vise vers le centre (= ne vise plus)
    if (this.mouse.release()) {
      if (isMobile && this.stick.pressed) {
        this.stick.pressed = false;
        this.stick.setRelativeMousePosition(new Point(0, 0));
      }
    }

    // Si le stick de tir est pressé :
    // - Récupération de la position relative du touché à l'intérieur du stick de tir
    // - Vise cette position relative
    if (isMobile && this.stick.pressed) {
      var position = this.stick.getPosition();
      var touchPosition = this.stick.pointsTo;
      var relativeTouchPosition = touchPosition.subtract(position.multiply1(Game.scale));
      relativeTouchPosition = relativeTouchPosition.subtract1(this.stick.radius * Game.scale);
      this.stick.setRelativeMousePosition(relativeTouchPosition);
    }
  };

  Game.prototype.render = function() {
    // Fond
    in_CanvasRenderingContext2D.setFillStyle(this.ctx, rgb1(18, 5, 32));
    this.ctx.fillRect(0, 0, this.can.width, this.can.height);

    // ---------------------------
    // Éléments suivants la caméra
    // ---------------------------
    // Déplacement de la zone de jeu affiché selon la position de la caméra
    this.ctx.save();
    this.ctx.translate(Game.camera.x() | 0, Game.camera.y() | 0);

    // Niveau
    this.renderLevel();
    this.renderBullets();
    this.renderTrails();
    this.renderPlayers();
    this.renderParticles();

    // Curseur
    this.renderCursor();
    this.ctx.restore();

    // ---------------------
    // Interface utilisateur
    // ---------------------
    this.renderUi();

    // -----------------------------
    // Masque pour les non-connectés
    // -----------------------------
    this.renderEffects();
  };

  Game.prototype.renderLevel = function() {
    this.ctx.drawImage(Level.level.canvas, 0, 0);

    for (var i = 0, list = Level.blocks, count = list.length; i < count; i = i + 1 | 0) {
      var block = in_List.get(list, i);
      block.render(this.ctx);
    }
  };

  Game.prototype.renderUi = function() {
    if (!Game.isInGame) {
      return;
    }

    // Informations du joueur
    this.playerInfo.render(this.ctx);

    // Inventaire
    this.inventory.render(this.ctx);

    // Nombre de balles
    if (this.player.currentWeapon().hasInfiniteAmmo()) {
      in_CanvasRenderingContext2D.drawPixelatedText(this.ctx, '∞', 112, 5);
    }

    else {
      in_CanvasRenderingContext2D.drawPixelatedText(this.ctx, this.player.currentWeapon().ammo.toString(), 112, 5);
    }

    // Boutons pour mobile
    if (isMobile) {
      for (var i = 0, list = this.buttons, count = list.length; i < count; i = i + 1 | 0) {
        var button = in_List.get(list, i);
        button.render(this.ctx);
      }

      this.stick.render(this.ctx);
    }
  };

  Game.prototype.renderCursor = function() {
    if (!Game.isInGame || isMobile) {
      return;
    }

    this.ctx.globalCompositeOperation = 'exclusion';

    // ctx.globalCompositeOperation = webgl.GlobalCompositeOperation.Exclusion
    in_CanvasRenderingContext2D.setFillStyle(this.ctx, rgb1(255, 255, 255));
    this.ctx.fillRect(this.mousePos.x - 3, this.mousePos.y - 0.5, 6, 1);
    this.ctx.fillRect(this.mousePos.x - 0.5, this.mousePos.y - 3, 1, 6);
    this.ctx.globalCompositeOperation = 'source-over';

    // ctx.globalCompositeOperation = webgl.GlobalCompositeOperation.SourceOver # défaut
  };

  Game.prototype.renderBullets = function() {
    for (var i = 0, list = Level.projectiles, count = list.length; i < count; i = i + 1 | 0) {
      var bullet = in_List.get(list, i);
      bullet.render(this.ctx);
    }
  };

  Game.prototype.renderTrails = function() {
    for (var i = 0, list = Level.trails, count = list.length; i < count; i = i + 1 | 0) {
      var trail = in_List.get(list, i);
      trail.render(this.ctx);
    }
  };

  Game.prototype.renderPlayers = function() {
    for (var i = 0, list = Level.players, count = list.length; i < count; i = i + 1 | 0) {
      var player = in_List.get(list, i);
      player.render(this.ctx);
    }
  };

  Game.prototype.renderParticles = function() {
    Particle.renderAll(this.ctx);
  };

  Game.prototype.renderEffects = function() {
    if (Game.isInGame) {
      return;
    }

    in_CanvasRenderingContext2D.setFillStyle(this.ctx, rgb2(0, 0, 0, 0.5));
    this.ctx.fillRect(0, 0, Game.width, Game.height);
  };

  Game.prototype.bulletsOverlaps = function() {
    var i = Level.projectiles.length;

    while (i > 0) {
      i = i - 1 | 0;
      var bullet = in_List.get(Level.projectiles, i);
      var blocks = Level.getBlocksAround(bullet.circle());

      for (var i1 = 0, count = blocks.length; i1 < count; i1 = i1 + 1 | 0) {
        var b = in_List.get(blocks, i1);

        if (Hit.pointHitRect(bullet.center(), b)) {
          b.onFired(bullet);
          bullet.onCollision(b);
        }
      }

      for (var i2 = 0, list = Level.players, count1 = list.length; i2 < count1; i2 = i2 + 1 | 0) {
        var player = in_List.get(list, i2);

        if (Hit.pointHitRect(bullet.center(), player)) {
          bullet.onPlayerOverlaps(player);
        }
      }
    }
  };

  Game.prototype.resize = function() {
    Game.scale = 1;

    // Zoom max = 20
    while (Game.scale < 20) {
      if (__imul(Game.GAME_WIDTH, Game.scale) >= window.innerWidth || __imul(Game.GAME_HEIGHT, Game.scale) >= window.innerHeight) {
        Game.scale = Game.scale - 1 | 0;
        break;
      }

      else {
        Game.scale = Game.scale + 1 | 0;
      }
    }

    if (Game.scale < 1) {
      Game.scale = 1;
    }

    this.can.width = __imul(Game.GAME_WIDTH, Game.scale);
    this.can.height = __imul(Game.GAME_HEIGHT, Game.scale);
    Game.widthScaled = Game.width / Game.scale | 0;
    Game.heightScaled = Game.height / Game.scale | 0;
    Game.width = this.can.width;
    Game.height = this.can.height;
    this.ctx.scale(Game.scale, Game.scale);

    if (this.ctx.mozImageSmoothingEnabled) {
      this.ctx.mozImageSmoothingEnabled = false;
    }

    if (this.ctx.msImageSmoothingEnabled) {
      this.ctx.msImageSmoothingEnabled = false;
    }

    if (this.ctx.imageSmoothingEnabled) {
      this.ctx.imageSmoothingEnabled = false;
    }

    Game.camera.setSize(Game.width, Game.height);
  };

  // Collisions
  var Hit = {};

  // Point <-> Rect
  Hit.pointHitRect = function(p, r) {
    return r.x() <= p.x && p.x <= r.x() + r.width && (r.y() <= p.y && p.y <= r.y() + r.width);
  };

  // Point <-> Circle
  Hit.pointHitCircle = function(p, c) {
    return Math.pow(p.x - c.x(), 2) + Math.pow(p.y - c.y(), 2) < Math.pow(c.radius, 2);
  };

  // Rect <-> Rect
  Hit.rectHitRect = function(r1, r2) {
    return r1.x() < r2.x() + r2.width && r1.x() + r1.width > r2.x() && r1.y() < r2.y() + r2.height && r1.y() + r1.height > r2.y();
  };

  // Gestion du chargement des images
  //
  // Fonctionnement :
  //	  Img.setPath('assets/img')
  //	  Img.setCallback(run)
  //	  Img.load(images)
  var Img = {};

  // Obtenir une image par son nom
  Img.get = function(name) {
    return in_StringMap.get1(Img.images, name);
  };

  // Définir le chemin dans lequel les images sont chargées (sans la barre
  // oblique (slash) finale).
  Img.setPath = function(path) {
    Img.path = path + '/';
  };

  // Définir la fonction appelée une fois les images chargées.
  Img.setCallback = function(callback) {
    Img.callback = callback;
  };

  // Obtenir le chemin dans lequel les images sont chargées
  Img.getPath = function() {
    return Img.path;
  };

  // Exécute le chargement des images et lance la fonction callback une fois le
  // chargement terminé.
  // Note : si toutes les images ne sont pas chargées (par exemple une URL
  // incorrecte), la fonction callback n'est pas appelée.
  Img.load = function(images) {
    var nbImagesToLoad = images.size;

    // Évènement lorsqu'une image est chargée :
    // - décrémenter le compteur
    // - lancer le callback si le nombre d'images à charger est descendu à zéro
    var imageLoaded = function() {
      nbImagesToLoad = nbImagesToLoad - 1 | 0;

      if (nbImagesToLoad == 0) {
        Img.callback();
      }
    };

    // L'image n'a pas pu charger
    var imageError = function(e) {
      var srcImageError = e.target.src;

      throw new Error("Impossible de charger l'image « " + srcImageError + ' »');
    };

    // Chargement des images
    in_StringMap.each(images, function(name, url) {
      var img = document.createElement('img');
      in_HTMLElement.addEventListener1(img, 'load', imageLoaded);
      in_HTMLElement.addEventListener2(img, 'error', imageError);
      img.src = Img.getPath() + url;
      img.name = name;
      in_StringMap.set(Img.images, name, img);
    });
  };

  var Level = {};

  Level.getCellValue = function(x, y) {
    var value = -1;

    if (y >= 0 && y < Level.walls.length && in_List.get(Level.walls, y) != null) {
      if (x >= 0 && x < in_List.get(Level.walls, y).length && in_List.get(Level.walls, y)[x] !== null) {
        value = in_List.get(in_List.get(Level.walls, y), x);
      }
    }

    return value;
  };

  // à faire : prendre en compte le rayon
  Level.getBlocksAround = function(circle) {
    // Copie de la liste des blocs mais en gardant les références
    var rects = in_List.slice1(Level.blocks, 0);
    var pos = circle.position.divide1(Game.TILE_SIZE);

    for (var x = (pos.x | 0) - 2 | 0, count1 = (pos.x | 0) + 2 | 0; x < count1; x = x + 1 | 0) {
      for (var y = (pos.y | 0) - 2 | 0, count = (pos.y | 0) + 2 | 0; y < count; y = y + 1 | 0) {
        if (Level.getCellValue(x, y) != -1) {
          var b = new block.Wall(__imul(x, Game.TILE_SIZE), __imul(y, Game.TILE_SIZE));
          rects.push(b);
        }
      }
    }

    return rects;
  };

  // Obtenir les joueurs dans un rayon
  Level.getPlayersInRay = function(ray) {
    var playersInRay = [];

    for (var i = 0, list = Level.players, count = list.length; i < count; i = i + 1 | 0) {
      var player = in_List.get(list, i);

      if (Hit.pointHitCircle(player.center(), ray)) {
        playersInRay.push(player);
      }
    }

    return playersInRay;
  };

  // Obtenir les joueurs dans un rayon
  Level.getBlocksInRay = function(ray) {
    var blocksInRay = [];

    for (var i = 0, list = Level.blocks, count = list.length; i < count; i = i + 1 | 0) {
      var b = in_List.get(list, i);

      if (Hit.pointHitCircle(b.center(), ray)) {
        blocksInRay.push(b);
      }
    }

    return blocksInRay;
  };

  // Génère une explosion
  // à faire : générer une explosion qui correspond à la taille du rayon
  Level.launchExplosion = function(ray) {
    for (var _ = 0, count = ray.radius | 0; _ < count; _ = _ + 1 | 0) {
      var p = new Particle().position(ray.position).speed(80, 100).life(0.4, 0.6).radius(6, 12).angle(0, 360).color(Particle.colors);
      Particle.particles.push(p);
    }
  };

  // Génère la carte
  // à faire : ajouter des bordures au niveau afin qu'il ne soit pas sans fin
  Level.generate = function() {
    var cells = new Uint8Array(__imul(Game.W, Game.H));
    Level.worm(cells, Game.W, Game.H, 0, 0, 3, 5, 500);
    Level.worm(cells, Game.W, Game.H, Game.W, 0, 3, 5, 500);
    Level.worm(cells, Game.W, Game.H, 0, Game.H, 3, 5, 500);
    Level.worm(cells, Game.W, Game.H, Game.W, Game.H, 3, 5, 500);

    for (var x = 0; x < Game.W; x = x + 1 | 0) {
      cells[x] = 0;
      cells[__imul(Game.H - 1 | 0, Game.W) + x | 0] = 0;
    }

    for (var y = 0; y < Game.H; y = y + 1 | 0) {
      cells[__imul(y, Game.W)] = 0;
      cells[__imul(y + 1 | 0, Game.W) - 1 | 0] = 0;
    }

    Level.walls = [];
    in_List.resize(Level.walls, Game.H, []);

    for (var y1 = 0; y1 < Game.H; y1 = y1 + 1 | 0) {
      in_List.set(Level.walls, y1, []);
      in_List.resize(in_List.get(Level.walls, y1), Game.W, 0);
    }

    for (var i = 0, count = cells.length - 1 | 0; i < count; i = i + 1 | 0) {
      var x1 = i % Game.W | 0;
      var y2 = i / Game.W | 0;
      var cell = cells[i];

      if (cell == 0) {
        in_List.set(in_List.get(Level.walls, y2), x1, 0);
      }

      else {
        in_List.set(in_List.get(Level.walls, y2), x1, -1);
      }
    }

    Level.blocks = [];

    for (var y3 = 0; y3 < Game.H; y3 = y3 + 1 | 0) {
      for (var x2 = 0; x2 < Game.W; x2 = x2 + 1 | 0) {
        if (in_List.get(in_List.get(Level.walls, y3), x2) == -1) {
          if (Math.random() > 0.995) {
            Level.blocks.push(new block.Barrel(__imul(x2, Game.TILE_SIZE), __imul(y3, Game.TILE_SIZE)));
          }

          else if (Math.random() > 0.995) {
            Level.blocks.push(new block.bonus.IncreaseHealth(__imul(x2, Game.TILE_SIZE), __imul(y3, Game.TILE_SIZE)));
          }

          else if (Math.random() > 0.995) {
            Level.blocks.push(new block.Mine(__imul(x2, Game.TILE_SIZE), __imul(y3, Game.TILE_SIZE)));
          }

          else if (Math.random() > 0.995) {
            Level.blocks.push(new block.Crate(__imul(x2, Game.TILE_SIZE), __imul(y3, Game.TILE_SIZE)));
          }
        }
      }
    }
  };

  Level.worm = function(cells, w, h, x, y, min_r, base_r, max_path) {
    var noise1 = new OSimplexNoise();
    var noise2 = new OSimplexNoise();
    noise1.setSeed1();
    noise2.setSeed1();
    var dir_x = 1;
    var dir_y = 1;

    for (var i = 0, count2 = max_path; i < count2; i = i + 1 | 0) {
      var angle = noise1.noise2D(i / 100, i / 100) * in_Math.PI();
      var radius = min_r + (noise2.noise2D(i / 500, i / 500) + 1) / 2 * base_r | 0;

      for (var j = 0, count1 = __imul(2, radius); j < count1; j = j + 1 | 0) {
        for (var k = 0, count = __imul(2, radius); k < count; k = k + 1 | 0) {
          if (__imul(j - radius | 0, j - radius | 0) > __imul(radius, radius) || __imul(k - radius | 0, k - radius | 0) > __imul(radius, radius)) {
            continue;
          }

          // y * width + x
          // cf. http://stackoverflow.com/a/2151141/1974228
          var xpos = x + j - radius | 0;
          var ypos = y + k - radius | 0;
          var index = xpos + __imul(ypos, w) | 0;
          cells[index] = 1;
        }
      }

      x += Math.cos(angle) * dir_x;
      y += Math.sin(angle) * dir_y;

      if (x < 0 || x >= w) {
        dir_x = -dir_x;
      }

      if (y < 0 || y >= h) {
        dir_y = -dir_y;
      }

      x = in_Math.clamp1(x, 0, w - 1 | 0);
      y = in_Math.clamp1(y, 0, h - 1 | 0);
    }
  };

  // Place le joueur du la carte
  // Actuellement sur le premier emplacement libre
  Level.putPlayer = function(player) {
    for (var y = 0; y < Game.H; y = y + 1 | 0) {
      for (var x = 0; x < Game.W; x = x + 1 | 0) {
        if (in_List.get(in_List.get(Level.walls, y), x) == -1) {
          player.setX(__imul(x, Game.TILE_SIZE));
          player.setY(__imul(y, Game.TILE_SIZE));
          return;
        }
      }
    }
  };

  // Génère le rendu du niveau
  Level.generateRender = function() {
    var tmpCan = document.createElement('canvas');
    tmpCan.width = __imul(Game.W, Game.TILE_SIZE);
    tmpCan.height = __imul(Game.H, Game.TILE_SIZE);
    Level.level = in_HTMLCanvasElement.getContext2D(tmpCan);

    // level = webgl.WebGLCanvas.new(tmpCan) as Context

    for (var y = 0; y < Game.H; y = y + 1 | 0) {
      for (var x = 0; x < Game.W; x = x + 1 | 0) {
        in_CanvasRenderingContext2D.drawImageByIndex(Level.level, Img.get('ground'), __imul(x, Game.TILE_SIZE), __imul(y, Game.TILE_SIZE), in_Math.irand(0, 7), Game.TILE_SIZE, Game.TILE_SIZE);

        // Ajout d'ombres
        // var tileIndex = getTileIndexExtended(x, y)
        //
        // level.fillStyle = rgb(0, 0, 0, 0.2)
        //
        // if tileIndex > 128 || tileIndex in [ 3, 6, 7, 15 ] {
        // 	level.fillRect(x * Game.TILE_SIZE, y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE)
        // } else if tileIndex == 1 {
        // 	level.beginPath
        // 	level.moveTo(x * Game.TILE_SIZE, y * Game.TILE_SIZE)
        // 	level.lineTo((x + 1) * Game.TILE_SIZE, y * Game.TILE_SIZE)
        // 	level.lineTo(x * Game.TILE_SIZE, (y + 1) * Game.TILE_SIZE)
        // 	level.fill
        // }
      }
    }

    for (var y1 = 0; y1 < Game.H; y1 = y1 + 1 | 0) {
      for (var x1 = 0; x1 < Game.W; x1 = x1 + 1 | 0) {
        if (in_List.get(in_List.get(Level.walls, y1), x1) != -1) {
          Level.level.fillRect(__imul(x1, Game.TILE_SIZE), __imul(y1, Game.TILE_SIZE), Game.TILE_SIZE, Game.TILE_SIZE);
        }
      }
    }

    for (var y2 = 0; y2 < Game.H; y2 = y2 + 1 | 0) {
      for (var x2 = 0; x2 < Game.W; x2 = x2 + 1 | 0) {
        if (in_List.get(in_List.get(Level.walls, y2), x2) != -1) {
          in_CanvasRenderingContext2D.drawImageByIndex(Level.level, Img.get('wall'), __imul(x2, Game.TILE_SIZE), __imul(y2, Game.TILE_SIZE), in_List.get(in_List.get(Level.walls, y2), x2), Game.TILE_SIZE, Game.TILE_SIZE);
        }
      }
    }
  };

  function OSimplexNoise() {
    this.seed = 0;
    this.randArray = null;
    this.seed = 0;
    this.randArray = new Int8Array(256);
  }

  OSimplexNoise.prototype.setSeed1 = function() {
    for (var i = 0; i < 256; i = i + 1 | 0) {
      this.randArray[i] = Math.random() * 256 | 0;
    }
  };

  OSimplexNoise.prototype.extrapolate2D = function(xsb, ysb, dx, dy) {
    var gradients = new Int8Array([5, 2, 2, 5, -5, 2, -2, 5, 5, -2, 2, -5, -5, -2, -2, -5]);
    var idx = this.randArray[this.randArray[xsb & 255] + ysb & 255] & 14;
    return gradients[idx] * dx + gradients[idx + 1 | 0] * dy;
  };

  OSimplexNoise.prototype.noise2D = function(x, y) {
    x = +x;
    y = +y;
    var stretchOffset = (x + y) * OSimplexNoise.STRETCH_CONSTANT_2D;
    var xs = x + stretchOffset;
    var ys = y + stretchOffset;
    var xsb = Math.floor(xs) | 0;
    var ysb = Math.floor(ys) | 0;
    var squishOffset = (xsb + ysb | 0) * OSimplexNoise.SQUISH_CONSTANT_2D;
    var xb = xsb + squishOffset;
    var yb = ysb + squishOffset;
    var xins = xs - xsb;
    var yins = ys - ysb;
    var inSum = xins + yins;
    var dx0 = x - xb;
    var dy0 = y - yb;
    var dxExt = 0;
    var dyExt = 0;
    var xsvExt = 0;
    var ysvExt = 0;
    var value = 0;
    var dx1 = dx0 - 1 - OSimplexNoise.SQUISH_CONSTANT_2D;
    var dy1 = dy0 - 0 - OSimplexNoise.SQUISH_CONSTANT_2D;
    var attn1 = 2 - dx1 * dx1 - dy1 * dy1;

    if (attn1 > 0) {
      attn1 *= attn1;
      value += attn1 * attn1 * this.extrapolate2D(xsb + 1 | 0, ysb + 0 | 0, dx1, dy1);
    }

    var dx2 = dx0 - 0 - OSimplexNoise.SQUISH_CONSTANT_2D;
    var dy2 = dy0 - 1 - OSimplexNoise.SQUISH_CONSTANT_2D;
    var attn2 = 2 - dx2 * dx2 - dy2 * dy2;

    if (attn2 > 0) {
      attn2 *= attn2;
      value += attn2 * attn2 * this.extrapolate2D(xsb + 0 | 0, ysb + 1 | 0, dx2, dy2);
    }

    if (inSum <= 1) {
      var zins = 1 - inSum;

      if (zins > xins || zins > yins) {
        if (xins > yins) {
          xsvExt = xsb + 1 | 0;
          ysvExt = ysb - 1 | 0;
          dxExt = dx0 - 1;
          dyExt = dy0 + 1;
        }

        else {
          xsvExt = xsb - 1 | 0;
          ysvExt = ysb + 1 | 0;
          dxExt = dx0 + 1;
          dyExt = dy0 - 1;
        }
      }

      else {
        xsvExt = xsb + 1 | 0;
        ysvExt = ysb + 1 | 0;
        dxExt = dx0 - 1 - 2 * OSimplexNoise.SQUISH_CONSTANT_2D;
        dyExt = dy0 - 1 - 2 * OSimplexNoise.SQUISH_CONSTANT_2D;
      }
    }

    else {
      var zins1 = 2 - inSum;

      if (zins1 < xins || zins1 < yins) {
        if (xins > yins) {
          xsvExt = xsb + 2 | 0;
          ysvExt = ysb + 0 | 0;
          dxExt = dx0 - 2 - 2 * OSimplexNoise.SQUISH_CONSTANT_2D;
          dyExt = dy0 + 0 - 2 * OSimplexNoise.SQUISH_CONSTANT_2D;
        }

        else {
          xsvExt = xsb + 0 | 0;
          ysvExt = ysb + 2 | 0;
          dxExt = dx0 + 0 - 2 * OSimplexNoise.SQUISH_CONSTANT_2D;
          dyExt = dy0 - 2 - 2 * OSimplexNoise.SQUISH_CONSTANT_2D;
        }
      }

      else {
        dxExt = dx0;
        dyExt = dy0;
        xsvExt = xsb;
        ysvExt = ysb;
      }

      xsb = xsb + 1 | 0;
      ysb = ysb + 1 | 0;
      dx0 = dx0 - 1 - 2 * OSimplexNoise.SQUISH_CONSTANT_2D;
      dy0 = dy0 - 1 - 2 * OSimplexNoise.SQUISH_CONSTANT_2D;
    }

    var attn0 = 2 - dx0 * dx0 - dy0 * dy0;

    if (attn0 > 0) {
      attn0 *= attn0;
      value += attn0 * attn0 * this.extrapolate2D(xsb, ysb, dx0, dy0);
    }

    var attnExt = 2 - dxExt * dxExt - dyExt * dyExt;

    if (attnExt > 0) {
      attnExt *= attnExt;
      value += attnExt * attnExt * this.extrapolate2D(xsvExt, ysvExt, dxExt, dyExt);
    }

    return value / OSimplexNoise.NORM_CONSTANT_2D;
  };

  // Créer une particule
  function Particle() {
    this.m_position = null;
    this.m_velocity = null;
    this.m_life = 0;
    this.m_maxLife = 0;
    this.m_radius = 0;
    this.m_maxRadius = 0;
    this.m_speed = 0;
    this.m_color = null;
    this.m_position = new Point(0, 0);
    this.m_velocity = new Point(0, 0);
    this.m_life = 0;
    this.m_maxLife = 0;
    this.m_radius = 0;
    this.m_maxRadius = 0;
    this.m_speed = 0;
    this.m_color = rgb1(255, 255, 255);
  }

  // Mise à jour d'une particule
  Particle.prototype.update = function(dt) {
    this.m_life -= dt;

    if (this.m_life > 0) {
      var ageRatio = this.m_life / this.m_maxLife;
      this.m_radius = this.m_maxRadius * ageRatio;
      this.m_position = this.m_position.add(this.m_velocity.multiply1(dt));
    }
  };

  // Affichage d'une particule
  Particle.prototype.render = function(ctx) {
    in_CanvasRenderingContext2D.setFillStyle(ctx, this.m_color);
    in_CanvasRenderingContext2D.setStrokeStyle(ctx, this.m_color);
    in_CanvasRenderingContext2D.drawPixelatedCircle(ctx, this.m_position.x, this.m_position.y, this.m_radius);
  };

  Particle.prototype.position = function(p) {
    this.m_position = p;
    return this;
  };

  Particle.prototype.speed = function(min, max) {
    this.m_speed = in_Math.rand(min, max);
    return this;
  };

  Particle.prototype.life = function(min, max) {
    this.m_maxLife = in_Math.rand(min, max);
    this.m_life = this.m_maxLife;
    return this;
  };

  Particle.prototype.radius = function(min, max) {
    this.m_maxRadius = in_Math.rand(min, max);
    this.m_radius = this.m_maxRadius;
    return this;
  };

  Particle.prototype.angle = function(min, max) {
    var angle = in_Math.rand(min, max);
    var angleInRadians = in_Math.degreesToRadians(angle);
    this.m_velocity = new Point(this.m_speed * Math.cos(angleInRadians), -this.m_speed * Math.sin(angleInRadians));
    return this;
  };

  Particle.prototype.color = function(colors) {
    this.m_color = in_List.randomElement(colors);
    return this;
  };

  // Mettre à jour les particules
  Particle.updateAll = function(dt) {
    var i = Particle.particles.length;

    while (((i = i - 1 | 0) - -1 | 0) > 0) {
      var particle = in_List.get(Particle.particles, i);
      particle.update(dt);

      if (particle.m_life <= 0) {
        in_List.removeAt(Particle.particles, i);
      }
    }
  };

  // Dessiner les particules
  Particle.renderAll = function(ctx) {
    for (var i = 0, list = Particle.particles, count = list.length; i < count; i = i + 1 | 0) {
      var particle = in_List.get(list, i);
      particle.render(ctx);
    }
  };

  // Créer un point : x et y
  function Point(x, y) {
    this.x = 0;
    this.y = 0;
    this.x = x;
    this.y = y;
  }

  Point.angleBetween = function(p1, p2) {
    return Math.atan2(p1.y - p2.y, p1.x - p2.x);
  };

  // Cloner le point
  Point.prototype.clone = function() {
    return new Point(this.x, this.y);
  };

  // « Taille » du point
  Point.prototype.magnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  // Normalise les valeurs du point (vecteur) entre 0 et 1
  Point.prototype.normalized = function() {
    var magnitude = this.magnitude();

    if (magnitude == 0) {
      return this.clone();
    }

    else {
      return this.clone().divide1(magnitude);
    }
  };

  // Addition Point + Point
  Point.prototype.add = function(p) {
    return new Point(this.x + p.x, this.y + p.y);
  };

  // Soustrait Point + Point
  Point.prototype.subtract = function(p) {
    return new Point(this.x - p.x, this.y - p.y);
  };

  // Soustrait Point + nombre
  Point.prototype.subtract1 = function(d) {
    return new Point(this.x - d, this.y - d);
  };

  // Multiplie Point + nombre
  Point.prototype.multiply1 = function(d) {
    return new Point(this.x * d, this.y * d);
  };

  // Divise Point + nombre
  Point.prototype.divide1 = function(d) {
    return new Point(this.x / d, this.y / d);
  };

  var Position = {
    // En haut à gauche
    TOP_LEFT: 0,

    // En bas à droite
    BOTTOM_RIGHT: 2,

    // En bas à gauche
    BOTTOM_LEFT: 3,

    // Au centre
    MIDDLE: 4
  };

  // Création d'un rectangle : x, y, largeur et hauteur
  function Rect(x, y, width, height) {
    this.position = null;
    this.width = 0;
    this.height = 0;
    this.position = new Point(x, y);
    this.width = width;
    this.height = height;
  }

  Rect.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
  };

  Rect.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
  };

  Rect.prototype.x = function() {
    return this.position.x;
  };

  Rect.prototype.y = function() {
    return this.position.y;
  };

  Rect.prototype.setX = function(value) {
    this.position.x = value;
  };

  Rect.prototype.setY = function(value) {
    this.position.y = value;
  };

  // Récupérer la position du centre du rectangle
  Rect.prototype.center = function() {
    return new Point(this.x() + (this.width / 2 | 0), this.y() + (this.height / 2 | 0));
  };

  // Récupère le cercle correspondant
  Rect.prototype.circle = function() {
    var position = this.center();
    var radius = (this.width + this.height | 0) / 2 | 0;
    return new Circle(position.x, position.y, radius);
  };

  // à faire : cette classe est-elle utile ?
  function Camera() {
    Rect.call(this, 0, 0, 0, 0);
  }

  __extends(Camera, Rect);

  // Créer un sprite : x, y, largeur et hauteur
  function Sprite(x, y, width, height) {
    Rect.call(this, x, y, width, height);
    this.velocity = null;
    this.health = 0;
    this.maxhealth = 0;
    this.animations = null;
    this.xnorm = 0;
    this.ynorm = 0;
    this.angle = 0;
    this.drawFrom = 0;
    this.removable = false;
    this.velocity = new Point(0, 0);
    this.health = 1;
    this.maxhealth = 1;
    this.angle = 0;

    // ou Position.MIDDLE
    this.drawFrom = Position.TOP_LEFT;
    this.animations = null;
    this.removable = true;
  }

  __extends(Sprite, Rect);

  // Met à jour le sprite
  Sprite.prototype.update = function(dt) {
    if (this.animations != null) {
      this.animations.update(dt);
    }
  };

  // Affiche le sprite
  Sprite.prototype.render = function(ctx) {
    ctx.save();

    if (this.drawFrom == Position.MIDDLE) {
      ctx.translate(this.center().x | 0, this.center().y | 0);
    }

    else {
      ctx.translate(this.x() | 0, this.y() | 0);
    }

    if (this.angle != 0) {
      ctx.rotate(this.angle);
    }

    if (this.drawFrom == Position.MIDDLE) {
      ctx.translate((-this.width | 0) / 2 | 0, (-this.height | 0) / 2 | 0);
    }

    if (this.animations != null) {
      this.animations.render(ctx);
    }

    else {
      in_CanvasRenderingContext2D.setFillStyle(ctx, rgb1(0, 0, 0));
      ctx.fillRect((-this.width | 0) / 2 | 0, (-this.height | 0) / 2 | 0, this.width, this.height);
    }

    ctx.restore();

    if (!RELEASE) {
      ctx.save();
      ctx.translate(this.center().x | 0, this.center().y | 0);
      in_CanvasRenderingContext2D.setFillStyle(ctx, rgb1(0, 255, 0));
      ctx.fillRect(-0.5, -0.5, 1, 1);
      ctx.restore();
    }
  };

  // Charge une image
  Sprite.prototype.loadImage = function(image, width, height) {
    this.animations = new AnimationManager(image, width, height);
  };

  // Ajoute une animation
  Sprite.prototype.addAnimation = function(name, frames) {
    this.animations.addAnimation(name, frames);
  };

  // Met à jour la position normalisée
  Sprite.prototype.updateNorm = function() {
    var vx = this.velocity.x;
    var vy = this.velocity.y;
    var theta = 0;

    if (vy == 0) {
      theta = vx >= 0 ? 0 : in_Math.PI();
    }

    else if (vx == 0) {
      theta = vy >= 0 ? in_Math.PI() / 2 : -in_Math.PI() / 2;
    }

    else if (vx >= 0) {
      theta = Math.atan(vx / vy);
    }

    else {
      theta = Math.atan(vx / vy) + in_Math.PI();
    }

    this.xnorm = Math.cos(theta);
    this.ynorm = Math.sin(theta);
  };

  // Jouer une animation sans la forcer
  Sprite.prototype.play1 = function(name) {
    this.play2(name, false);
  };

  // Jouer une animation
  Sprite.prototype.play2 = function(name, force) {
    var nextAnimation = this.animations.getAnimation(name);

    if (this.animations.currentAnimation != nextAnimation || force) {
      this.animations.currentAnimation = nextAnimation;
    }
  };

  // L'objet est-il encore « vivant » ?
  Sprite.prototype.isDead = function() {
    return this.health <= 0;
  };

  // Obtention du pourcentage de vie restant
  Sprite.prototype.getHealthPercentage = function() {
    return this.health / this.maxhealth;
  };

  // Baisser la vie
  Sprite.prototype.decreaseHealth = function(value) {
    this.health -= value;

    if (this.health < 0) {
      this.health = 0;
    }
  };

  // Monter la vie
  Sprite.prototype.increaseHealth = function(value) {
    this.health += value;

    if (this.health > this.maxhealth) {
      this.health = this.maxhealth;
    }
  };

  // Tue le sprite
  Sprite.prototype.kill = function() {
    this.health = 0;
  };

  // Le sprite peut-il être supprimé ?
  Sprite.prototype.canBeRemoved = function() {
    return this.health <= 0 && this.removable;
  };

  function Player(name) {
    Sprite.call(this, 0, 0, 14, 15);
    this.name = null;
    this.dir = null;
    this.weapons = null;
    this.currentWeaponIndex = 0;
    this.invincibleDelay = 0;
    this.name = name;
    this.loadImage(Img.get('player'), this.width, this.height);
    this.addAnimation('idle_front', [0]);
    this.addAnimation('idle_back', [8]);
    this.addAnimation('idle_side_right', [12]);
    this.addAnimation('idle_side_left', [4]);
    this.addAnimation('walk_front', [0, 1, 2, 3]);
    this.addAnimation('walk_back', [8, 9, 10, 11]);
    this.addAnimation('walk_side_right', [12, 13, 14, 15]);
    this.addAnimation('walk_side_left', [4, 5, 6, 7]);
    this.play1('idle_front');
    this.dir = 'front';
    this.weapons = [new weapon.Dynamite(), new weapon.Grenade(), new weapon.Gun(), new weapon.Mine(), new weapon.Shotgun(), new weapon.RocketLauncher(), new weapon.SubmachineGun(), new weapon.Flamethrower(), new weapon.SmokeGrenade(), new weapon.Raygun()];

    for (var i = 0, list = this.weapons, count = list.length; i < count; i = i + 1 | 0) {
      var w = in_List.get(list, i);
      w.addAmmo(1000);
    }

    this.currentWeaponIndex = 0;
    this.maxhealth = 100;
    this.health = this.maxhealth;
    this.invincibleDelay = 0;
    Level.players.push(this);
    Level.putPlayer(this);
  }

  __extends(Player, Sprite);

  Player.prototype.update = function(dt) {
    Sprite.prototype.update.call(this, dt);

    if (this.invincibleDelay > 0) {
      this.invincibleDelay -= dt;
    }

    else {
      this.invincibleDelay = 0;
    }

    for (var i = 0, list = this.weapons, count = list.length; i < count; i = i + 1 | 0) {
      var weapon = in_List.get(list, i);
      weapon.update(dt);
    }

    if (this.velocity.x != 0 || this.velocity.y != 0) {
      this.play1('walk_' + this.dir);
    }

    else {
      this.play1('idle_' + this.dir);
    }
  };

  Player.prototype.render = function(ctx) {
    if (this.invincibleDelay == 0) {
      Sprite.prototype.render.call(this, ctx);
    }

    else if ((this.invincibleDelay * 2000 | 0) % 1000 < 1000) {
      Sprite.prototype.render.call(this, ctx);
    }

    var width = in_CanvasRenderingContext2D.computeTextWidth(ctx, this.name);
    in_CanvasRenderingContext2D.drawPixelatedText(ctx, this.name, (this.center().x | 0) - (width / 2 | 0) | 0, (this.y() | 0) - 12 | 0);
  };

  Player.prototype.angleTo = function(p) {
    var angle = Point.angleBetween(p, this.center()) / in_Math.PI();

    if (angle >= 0.25 && angle < 0.75) {
      this.dir = 'front';
    }

    else if (angle >= -0.75 && angle < -0.25) {
      this.dir = 'back';
    }

    else if (angle >= -0.25 && angle < 0.25) {
      this.dir = 'side_right';
    }

    else if (angle >= -1 && angle < -0.75 || angle > 0.75 && angle < 1) {
      this.dir = 'side_left';
    }
  };

  Player.prototype.fire = function(mouse) {
    this.currentWeapon().fire(this.center(), mouse);
  };

  Player.prototype.setInvicibleDelay = function(delay) {
    this.invincibleDelay = delay;
  };

  Player.prototype.currentWeapon = function() {
    return in_List.get(this.weapons, this.currentWeaponIndex);
  };

  function Trail(projectile) {
    Sprite.call(this, 0, 0, 0, 0);
    this.projectilePosition = null;
    this.endPosition = null;
    this.projectile = null;
    this.projectile = projectile;
    this.velocity = projectile.velocity.clone();
    Level.trails.push(this);
  }

  __extends(Trail, Sprite);

  Trail.prototype.update = function(dt) {
    if (!this.projectile.isDead()) {
      this.projectilePosition = this.projectile.center();
      this.endPosition = this.projectile.basePosition;
    }

    else {
      this.endPosition = this.endPosition.add(this.velocity.multiply1(dt));
    }

    // à faire
    var diff = this.projectilePosition.subtract(this.endPosition);

    if (diff.x > -4 && diff.x < 4 && diff.y > -4 && diff.y < 4) {
      this.kill();
    }
  };

  Trail.prototype.render = function(ctx) {
    var gradient = ctx.createLinearGradient(this.endPosition.x, this.endPosition.y, this.projectilePosition.x, this.projectilePosition.y);
    gradient.addColorStop(0, rgb2(255, 255, 255, 0));
    gradient.addColorStop(0.5, rgb2(255, 255, 255, 0));
    gradient.addColorStop(1, rgb2(255, 255, 255, 0.2));
    in_CanvasRenderingContext2D.setStrokeStyle2(ctx, gradient);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.endPosition.x, this.endPosition.y);
    ctx.lineTo(this.projectilePosition.x, this.projectilePosition.y);
    ctx.stroke();
  };

  var block = {};

  block.Block = function(x, y, width, height) {
    Sprite.call(this, x, y, width, height);
    this.solid = false;
    this.explosion = null;
    this.timeBeforeExplosion = 0;
    this.active = false;
    this.solid = true;
  };

  __extends(block.Block, Sprite);

  block.Block.prototype.update = function(dt) {
    Sprite.prototype.update.call(this, dt);
  };

  // Le bloc est-il solide ?
  block.Block.prototype.isSolid = function() {
    return this.solid;
  };

  block.Block.prototype.activate = function() {
    if (!this.active) {
      this.active = true;
    }
  };

  block.Block.prototype.unactivate = function() {
    if (this.active) {
      this.active = false;
    }
  };

  // Évènement : lorsque le bloc se fait toucher par une balle
  block.Block.prototype.onFired = function(projectile) {
  };

  // Évènement : lorsque le bloc se fait survolé par le joueur
  block.Block.prototype.onPlayerOverlaps = function(player) {
  };

  // Évènement : lorsque le bloc se trouve dans une explosion
  block.Block.prototype.onExplosion = function(explosion) {
  };

  block.Barrel = function(x, y) {
    block.Block.call(this, x, y, 24, 24);
    this.loadImage(Img.get('barrel'), this.width, this.height);
    this.health = 100;
    this.maxhealth = 100;
    this.explosion = new Explosion(this.center().x, this.center().y, 0, 30);
    this.timeBeforeExplosion = 0.6;
    this.removable = false;
  };

  __extends(block.Barrel, block.Block);

  block.Barrel.prototype.update = function(dt) {
    block.Block.prototype.update.call(this, dt);

    if (this.active) {
      this.timeBeforeExplosion -= dt;

      if (this.timeBeforeExplosion <= 0) {
        this.explode();
        this.timeBeforeExplosion = 0.6;
        this.unactivate();

        if (this.health <= 0) {
          this.removable = true;
        }
      }
    }
  };

  block.Barrel.prototype.render = function(ctx) {
    // Dessine le rayon de l'explosion sous le baril
    ctx.drawImage(this.explosion.circleSprite.canvas, this.center().x - this.explosion.radius, this.center().y - this.explosion.radius);
    Sprite.prototype.render.call(this, ctx);
  };

  block.Barrel.prototype.explode = function() {
    // Met à jour le rayon de l'explosion
    this.explosion.radius = (this.maxhealth - this.health) / this.maxhealth * 100;
    this.explosion.updateCircleSprite();

    // Explosion du baril
    this.explosion.explode(this);
  };

  block.Barrel.prototype.onFired = function(projectile) {
    // Les barils sont insensibles aux grenades et aux roquettes (pour la
    // roquette, c'est l'explosion qui fait les dégâts)
    if (projectile instanceof weapon.projectile.Grenade || projectile instanceof weapon.projectile.Rocket) {
      return;
    }

    // Baisse la vie à cause des dégâts du projectile
    this.decreaseHealth(projectile.damages);

    // Déclenche l'explosion
    this.activate();
  };

  block.Barrel.prototype.onExplosion = function(explosion) {
    // Baisse la vie à cause des dégâts de l'explosion
    this.decreaseHealth(explosion.damages);

    // Déclenche l'explosion
    this.activate();
  };

  block.Crate = function(x, y) {
    block.Block.call(this, x, y, 24, 24);
    this.loadImage(Img.get('crate'), this.width, this.height);
  };

  __extends(block.Crate, block.Block);

  block.Crate.prototype.render = function(ctx) {
    Sprite.prototype.render.call(this, ctx);
  };

  block.Mine = function(x, y) {
    block.Block.call(this, x, y, 10, 10);
    this.timeBeforeCanExplode = 0;
    this.canExplode = false;
    this.loadImage(Img.get('mine'), this.width, this.height);
    this.timeBeforeCanExplode = 1;
    this.timeBeforeExplosion = 0.6;
    this.explosion = new Explosion(this.center().x, this.center().y, 46, 30);
    this.solid = false;
    this.active = false;
    this.canExplode = false;
  };

  __extends(block.Mine, block.Block);

  block.Mine.prototype.update = function(dt) {
    block.Block.prototype.update.call(this, dt);

    if (this.active && this.canExplode) {
      this.timeBeforeExplosion -= dt;

      if (this.timeBeforeExplosion <= 0) {
        this.explode();
        this.timeBeforeExplosion = 0.6;
        this.kill();
      }
    }

    else if (!this.canExplode) {
      this.timeBeforeCanExplode -= dt;

      if (this.timeBeforeCanExplode <= 0) {
        this.canExplode = true;
      }
    }
  };

  block.Mine.prototype.render = function(ctx) {
    // Dessine le rayon de l'explosion sous la mine
    ctx.drawImage(this.explosion.circleSprite.canvas, this.center().x - this.explosion.radius, this.center().y - this.explosion.radius);
    Sprite.prototype.render.call(this, ctx);
  };

  block.Mine.prototype.explode = function() {
    this.explosion.explode(this);
  };

  block.Mine.prototype.onPlayerOverlaps = function(player) {
    // Si le bloc n'est pas actif et qu'il est explosible, alors
    // ceclui-ci est activé et explosera après la latence d'explosion
    if (!this.active && this.canExplode) {
      this.activate();
    }
  };

  block.Mine.prototype.onFired = function(projectile) {
    // Les mines sont insensibles aux grenades
    if (projectile instanceof weapon.projectile.Grenade) {
      return;
    }

    // Explosion de la mine
    this.explode();

    // Suppression de la mine
    this.kill();
  };

  block.Mine.prototype.onExplosion = function(explosion) {
    // Si la mine se trouve dans le rayon d'une explosion, elle est
    // activée et explosera après le temps de latence d'explosion
    this.activate();
  };

  block.Dynamite = function(x, y) {
    block.Mine.call(this, x, y);
    this.width = 5;
    this.height = 12;
    this.loadImage(Img.get('dynamite'), this.width, this.height);
    this.drawFrom = Position.MIDDLE;
    this.timeBeforeExplosion = 4;
    this.explosion = new Explosion(this.center().x, this.center().y, 58, 30);
    this.active = true;
  };

  __extends(block.Dynamite, block.Mine);

  block.Wall = function(x, y) {
    block.Block.call(this, x, y, Game.TILE_SIZE, Game.TILE_SIZE);
  };

  __extends(block.Wall, block.Block);

  // à faire
  // à faire
  // à faire
  block.bonus = {};

  block.bonus.Bonus = function(x, y, width, height) {
    block.Block.call(this, x, y, width, height);
    this.solid = false;
  };

  __extends(block.bonus.Bonus, block.Block);

  block.bonus.IncreaseHealth = function(x, y) {
    block.bonus.Bonus.call(this, x, y, 12, 12);
    this.loadImage(Img.get('bonusIncreaseHealth'), this.width, this.height);
  };

  __extends(block.bonus.IncreaseHealth, block.bonus.Bonus);

  block.bonus.IncreaseHealth.prototype.onPlayerOverlaps = function(player) {
    player.increaseHealth(50);
    this.kill();
  };

  var Key = {};
  var input = {};

  input.Keyboard = function() {
    var self = this;
    self.keys = null;
    self.lasts = null;
    self.keys = new Map();
    self.lasts = [];
    in_HTMLDocument.addEventListener3(document, 'keyup', function(e) {
      self.onkeyup(e);
    });
    in_HTMLDocument.addEventListener3(document, 'keydown', function(e) {
      self.onkeydown(e);
    });
  };

  input.Keyboard.prototype.onkeyup = function(e) {
    this.lasts.push(e.keyCode);
    in_IntMap.set(this.keys, e.keyCode, false);
  };

  input.Keyboard.prototype.onkeydown = function(e) {
    in_IntMap.set(this.keys, e.keyCode, true);
  };

  // Tant que la touche est appuyée
  input.Keyboard.prototype.down = function(k) {
    return this.keys.has(k) && in_IntMap.get1(this.keys, k);
  };

  // à faire : ajouter une action au roulement de la molette

  input.Mouse = function(el) {
    var self = this;
    self.el = null;
    self.position = null;
    self.click = null;
    self.mtime = 0;
    self.loose = null;
    self.wheelValue = 0;
    self.el = el;
    self.position = new Point(0, 0);
    self.click = null;
    self.mtime = 0;
    self.loose = null;
    in_HTMLDocument.addEventListener4(document, 'mousedown', function(e) {
      self.onmousedown(e);
    });
    in_HTMLDocument.addEventListener4(document, 'mousemove', function(e) {
      self.onmousemove(e);
    });
    in_HTMLDocument.addEventListener4(document, 'mouseup', function(e) {
      self.onmouseup(e);
    });
    in_HTMLDocument.addEventListener6(document, 'wheel', function(e) {
      self.onwheel(e);
    });
  };

  // à faire : trouver une méthode pour éviter un appel à une méthode, comme
  // dans la classe Keyboard
  input.Mouse.prototype.update = function() {
    this.mtime = this.mtime + 1 | 0;
    this.wheelValue = 0;
  };

  input.Mouse.prototype.onmousedown = function(e) {
    this.onmousemove(e);
    this.click = this.mtime;
  };

  input.Mouse.prototype.onmousemove = function(e) {
    this.position.x = e.pageX - (this.el != null ? this.el.offsetLeft : 0) | 0;
    this.position.y = e.pageY - (this.el != null ? this.el.offsetTop : 0) | 0;
  };

  input.Mouse.prototype.onmouseup = function(e) {
    this.loose = this.mtime;
    this.click = null;
  };

  input.Mouse.prototype.onwheel = function(e) {
    this.wheelValue = e.deltaY;
  };

  input.Mouse.prototype.getCanvasCoordinates = function() {
    var x = this.position.x;
    var y = this.position.y;
    x /= Game.scale;
    y /= Game.scale;
    x -= Game.camera.x();
    y -= Game.camera.y();
    return new Point(x, y);
  };

  input.Mouse.prototype.getPositionRelativeTo = function(rect) {
    return this.position;
  };

  // Tant que le bouton est baissé
  input.Mouse.prototype.down = function() {
    return this.click !== null;
  };

  // Au moment où le bouton est enfoncé
  input.Mouse.prototype.press = function() {
    return this.click === this.mtime;
  };

  // Au moment où le bouton est levé
  input.Mouse.prototype.release = function() {
    return this.loose === this.mtime;
  };

  input.Mouse.prototype.inRect = function(rect) {
    return Hit.pointHitRect(this.position, rect);
  };

  input.Touch = function(el) {
    var self = this;
    self.el = null;
    self.positions = null;
    self.click = null;
    self.mtime = 0;
    self.loose = null;
    self.el = el;
    self.positions = new Map();
    self.click = null;
    self.mtime = 0;
    self.loose = null;
    in_HTMLDocument.addEventListener5(document, 'touchstart', function(e) {
      self.ontouchstart(e);
    });
    in_HTMLDocument.addEventListener5(document, 'touchmove', function(e) {
      self.ontouchmove(e);
    });
    in_HTMLDocument.addEventListener5(document, 'touchend', function(e) {
      self.ontouchend(e);
    });
  };

  // à faire : trouver une méthode pour éviter un appel à une méthode, comme dans la
  // classe Keyboard
  input.Touch.prototype.update = function() {
    this.mtime = this.mtime + 1 | 0;
  };

  input.Touch.prototype.ontouchstart = function(e) {
    this.click = this.mtime;

    for (var i = 0, list = in_HTMLTouchEvent.touches(e), count = list.length; i < count; i = i + 1 | 0) {
      var ev = in_List.get(list, i);
      var x = ev.pageX - (this.el != null ? this.el.offsetLeft : 0) | 0;
      var y = ev.pageY - (this.el != null ? this.el.offsetTop : 0) | 0;
      in_IntMap.set(this.positions, ev.identifier, new Point(x, y));
    }
  };

  input.Touch.prototype.ontouchmove = function(e) {
    for (var i = 0, list = in_HTMLTouchEvent.touches(e), count = list.length; i < count; i = i + 1 | 0) {
      var ev = in_List.get(list, i);

      if (this.positions.has(ev.identifier)) {
        var position = in_IntMap.get1(this.positions, ev.identifier);
        var x = ev.pageX - (this.el != null ? this.el.offsetLeft : 0) | 0;
        var y = ev.pageY - (this.el != null ? this.el.offsetTop : 0) | 0;
        position.x = x;
        position.y = y;
      }
    }
  };

  input.Touch.prototype.ontouchend = function(e) {
    this.loose = this.mtime;
    this.click = null;

    for (var i = 0, list = in_HTMLTouchEvent.touches(e), count = list.length; i < count; i = i + 1 | 0) {
      var ev = in_List.get(list, i);
      this.positions.delete(ev.identifier);
    }
  };

  input.Touch.prototype.getCanvasCoordinates = function() {
    return new Point(0, 0);
  };

  input.Touch.prototype.getPositionRelativeTo = function(rect) {
    var result = null;
    in_IntMap.each(this.positions, function(index, position) {
      if (Hit.pointHitRect(position, rect)) {
        result = position;
      }
    });
    return result;
  };

  // Tant que le bouton est baissé
  input.Touch.prototype.down = function() {
    return this.click !== null;
  };

  // Au moment où le bouton est enfoncé
  input.Touch.prototype.press = function() {
    return this.click === this.mtime;
  };

  // Au moment où le bouton est levé
  input.Touch.prototype.release = function() {
    return this.loose === this.mtime;
  };

  input.Touch.prototype.inRect = function(rect) {
    var result = false;
    in_IntMap.each(this.positions, function(index, position) {
      if (Hit.pointHitRect(position, rect)) {
        result = true;
      }
    });
    return result;
  };

  var PointerDirection = {
    NONE: 0,
    TOP: 1,
    BOTTOM: 2
  };

  var ui = {};

  ui.Inventory = function() {
    this.player = null;
  };

  ui.Inventory.prototype.bindTo = function(player) {
    this.player = player;
  };

  ui.Inventory.prototype.render = function(ctx) {
    if (isMobile) {
      ctx.save();
      ctx.translate(4, 40);
      this.player.currentWeapon().renderMiniature(ctx);
      ctx.restore();
    }

    else {
      ctx.save();
      ctx.translate(4, 30);
      ctx.lineWidth = 1;
      in_CanvasRenderingContext2D.setStrokeStyle(ctx, rgb1(202, 84, 42));

      for (var i = 0, list = this.player.weapons, count = list.length; i < count; i = i + 1 | 0) {
        var weapon = in_List.get(list, i);
        weapon.renderMiniature(ctx);

        if (weapon == this.player.currentWeapon()) {
          ctx.strokeRect(0.5, 0.5, 16, 16);
        }

        ctx.translate(0, 20);
      }

      ctx.restore();
    }
  };

  // Créer une barre de vie
  ui.Lifebar = function() {
    Rect.call(this, 19, 14, 60, 4);
    this.player = null;
  };

  __extends(ui.Lifebar, Rect);

  // Lie la barre de vie au joueur, ainsi lorsque la vie du joueur change, la
  // barre de vie est automatiquement mise à jour
  ui.Lifebar.prototype.bindTo = function(player) {
    this.player = player;
  };

  // Affiche la barre de vie
  ui.Lifebar.prototype.render = function(ctx) {
    var offset = 5;
    var lifebarWidth = this.player.getHealthPercentage() * this.width | 0;

    // Fond vert transparent
    in_CanvasRenderingContext2D.setFillStyle(ctx, rgb2(255, 255, 255, 0.3));
    ctx.beginPath();
    ctx.moveTo(this.x(), this.y());
    ctx.lineTo(this.x() + this.width, this.y());
    ctx.lineTo(this.x() + this.width + offset, this.y() + this.height);
    ctx.lineTo(this.x() + offset, this.y() + this.height);
    ctx.fill();

    // Fond vert
    in_CanvasRenderingContext2D.setFillStyle(ctx, rgb1(51, 182, 0));
    ctx.beginPath();
    ctx.moveTo(this.x(), this.y());
    ctx.lineTo(this.x() + lifebarWidth, this.y());
    ctx.lineTo(this.x() + lifebarWidth + offset, this.y() + this.height);
    ctx.lineTo(this.x() + offset, this.y() + this.height);
    ctx.fill();

    // Texte
    in_CanvasRenderingContext2D.drawPixelatedText(ctx, this.player.health.toString(), this.x() + 20, this.y() - 10);
  };

  ui.PlayerInfo = function() {
    this.lifebar = null;
    this.weaponLatency = null;
    this.lifebar = new ui.Lifebar();
    this.weaponLatency = new ui.WeaponLatency();
  };

  ui.PlayerInfo.prototype.bindTo = function(player) {
    this.lifebar.bindTo(player);
    this.weaponLatency.bindTo(player);
  };

  ui.PlayerInfo.prototype.render = function(ctx) {
    var offset = 23;

    // Barre de vie et latence de tir
    ctx.save();
    ctx.translate(5, 5);

    // Fond noir transparent
    in_CanvasRenderingContext2D.setFillStyle(ctx, rgb2(0, 0, 0, 0.8));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(66, 0);
    ctx.lineTo(66 + offset | 0, 20);
    ctx.lineTo(offset, 20);
    ctx.fill();
    this.lifebar.render(ctx);
    this.weaponLatency.render(ctx);
    ctx.restore();
    ctx.restore();
  };

  // Créer une barre de vie
  ui.WeaponLatency = function() {
    Rect.call(this, 8, 19, 62, 1);
    this.player = null;
  };

  __extends(ui.WeaponLatency, Rect);

  // Lie la barre de vie au joueur, ainsi lorsque la vie du joueur change, la
  // barre de vie est automatiquement mise à jour
  ui.WeaponLatency.prototype.bindTo = function(player) {
    this.player = player;
  };

  // Affiche la barre de vie
  ui.WeaponLatency.prototype.render = function(ctx) {
    var latency = this.player.currentWeapon().getLatencyPercentage();

    // Barre de latence blanche
    in_CanvasRenderingContext2D.setFillStyle(ctx, rgb2(255, 255, 255, 0.3));
    ctx.fillRect(this.x() + 1, this.y() + 1, this.width - latency * this.width, this.height);
  };

  var FontManager = {};
  var weapon = {};

  // Créer une arme
  weapon.Weapon = function(name) {
    this.name = null;
    this.infiniteAmmo = false;
    this.ammo = 0;
    this.baseLatency = 0;
    this.latency = 0;
    this.bulletSpeed = 0;
    this.name = name;
    this.infiniteAmmo = false;
    this.ammo = 0;
    this.baseLatency = 0;
    this.latency = 0;
    this.bulletSpeed = 0;
  };

  // Mise à jour de l'arme
  weapon.Weapon.prototype.update = function(dt) {
    // Mise à jour de la latence de tir
    if (this.latency > 0) {
      this.latency -= dt;
    }

    if (this.latency < 0) {
      this.latency = 0;
    }
  };

  // Est-il possible de tirer ?
  // Il n'est possible de tirer que si la latence entre deux tirs est terminée
  // et que le nombre de munitions est illimité ou supérieur à zéro
  weapon.Weapon.prototype.canFire = function() {
    return this.latency <= 0 && (this.hasInfiniteAmmo() || this.hasAmmo());
  };

  // L'arme dispose-t-elle d'un nombre de munitions infini ?
  weapon.Weapon.prototype.hasInfiniteAmmo = function() {
    return this.infiniteAmmo;
  };

  // L'arme dispose-t-elle encore de munitions ?
  weapon.Weapon.prototype.hasAmmo = function() {
    return this.ammo > 0;
  };

  // Baisse la quantité de munitions restantes
  weapon.Weapon.prototype.decreaseAmmo = function() {
    if (!this.hasInfiniteAmmo()) {
      this.ammo = this.ammo - 1 | 0;
    }
  };

  // Ajoute des munitions à l'arme
  weapon.Weapon.prototype.addAmmo = function(quantity) {
    this.ammo = this.ammo + quantity | 0;
  };

  // Réinitialise le temps de latence entre deux tirs
  weapon.Weapon.prototype.resetLatency = function() {
    this.latency = this.baseLatency;
  };

  // Pourcentage de latence
  weapon.Weapon.prototype.getLatencyPercentage = function() {
    return this.latency / this.baseLatency;
  };

  weapon.Flamethrower = function() {
    weapon.Weapon.call(this, 'Lance-flammes');
  };

  __extends(weapon.Flamethrower, weapon.Weapon);

  weapon.Flamethrower.prototype.fire = function(position, direction) {
    var angle = Point.angleBetween(direction, position);
    angle = -in_Math.radiansToDegrees(angle);

    for (var i = 0; i < 3; i = i + 1 | 0) {
      var p = new Particle().position(position).speed(180, 220).life(0.3, 0.7).radius(3, 6).angle(angle - 30, angle + 30).color([rgb1(255, 0, 0), rgb1(255, 140, 0), rgb1(255, 215, 0)]);
      Particle.particles.push(p);
    }
  };

  weapon.Flamethrower.prototype.renderMiniature = function(ctx) {
    ctx.drawImage(Img.get('miniatures'), 112, 0, 16, 16, 0, 0, 16, 16);
  };

  weapon.Grenade = function() {
    weapon.Weapon.call(this, 'Grenade');
    this.baseLatency = 0.5;
    this.bulletSpeed = 400;
  };

  __extends(weapon.Grenade, weapon.Weapon);

  weapon.Grenade.prototype.fire = function(position, direction) {
    if (!this.canFire()) {
      return;
    }

    this.decreaseAmmo();
    this.resetLatency();
    var angle = Point.angleBetween(direction, position);
    new weapon.projectile.Grenade(position.x, position.y, angle, this.bulletSpeed);
  };

  weapon.Grenade.prototype.renderMiniature = function(ctx) {
    ctx.drawImage(Img.get('miniatures'), 16, 0, 16, 16, 0, 0, 16, 16);
  };

  weapon.Gun = function() {
    weapon.Weapon.call(this, 'Pistolet');
    this.baseLatency = 0.5;
    this.bulletSpeed = 300;
  };

  __extends(weapon.Gun, weapon.Weapon);

  weapon.Gun.prototype.fire = function(position, direction) {
    if (!this.canFire()) {
      return;
    }

    this.decreaseAmmo();
    this.resetLatency();
    var angle = Point.angleBetween(direction, position);
    new weapon.projectile.Bullet(position.x, position.y, angle, this.bulletSpeed);
  };

  weapon.Gun.prototype.renderMiniature = function(ctx) {
    ctx.drawImage(Img.get('miniatures'), 32, 0, 16, 16, 0, 0, 16, 16);
  };

  weapon.Mine = function() {
    weapon.Weapon.call(this, 'Mine');
    this.baseLatency = 0.5;
  };

  __extends(weapon.Mine, weapon.Weapon);

  weapon.Mine.prototype.fire = function(position, direction) {
    if (!this.canFire()) {
      return;
    }

    this.decreaseAmmo();
    this.resetLatency();
    var mine = new block.Mine(position.x, position.y);
    Level.blocks.push(mine);
  };

  weapon.Mine.prototype.renderMiniature = function(ctx) {
    ctx.drawImage(Img.get('miniatures'), 48, 0, 16, 16, 0, 0, 16, 16);
  };

  weapon.Raygun = function() {
    weapon.Weapon.call(this, 'Pistolet laser');
    this.ray = null;
  };

  __extends(weapon.Raygun, weapon.Weapon);

  weapon.Raygun.prototype.fire = function(position, direction) {
    if (this.ray == null) {
      this.ray = new weapon.projectile.Ray(position.x, position.y, 5, 5);
    }
  };

  weapon.Raygun.prototype.renderMiniature = function(ctx) {
    ctx.drawImage(Img.get('miniatures'), 144, 0, 16, 16, 0, 0, 16, 16);
  };

  weapon.RocketLauncher = function() {
    weapon.Weapon.call(this, 'Lance-roquettes');
    this.baseLatency = 2;
    this.bulletSpeed = 460;
  };

  __extends(weapon.RocketLauncher, weapon.Weapon);

  weapon.RocketLauncher.prototype.fire = function(position, direction) {
    if (!this.canFire()) {
      return;
    }

    this.decreaseAmmo();
    this.resetLatency();
    var angle = Point.angleBetween(direction, position);
    new weapon.projectile.Rocket(position.x, position.y, angle, this.bulletSpeed);
  };

  weapon.RocketLauncher.prototype.renderMiniature = function(ctx) {
    ctx.drawImage(Img.get('miniatures'), 64, 0, 16, 16, 0, 0, 16, 16);
  };

  weapon.Shotgun = function() {
    weapon.Weapon.call(this, 'Fusil à pompe');
    this.baseLatency = 1;
    this.bulletSpeed = 420;
  };

  __extends(weapon.Shotgun, weapon.Weapon);

  weapon.Shotgun.prototype.fire = function(position, direction) {
    if (!this.canFire()) {
      return;
    }

    this.decreaseAmmo();
    this.resetLatency();
    var angleRandom1 = 0.2;
    var angleRandom2 = 0.1;
    var angleRandom3 = 0.1;
    var angleRandom4 = 0.2;
    var angle = Point.angleBetween(direction, position);
    new weapon.projectile.ShotgunBullet(position.x, position.y, angle - angleRandom1, this.bulletSpeed);
    new weapon.projectile.ShotgunBullet(position.x, position.y, angle - angleRandom2, this.bulletSpeed);
    new weapon.projectile.ShotgunBullet(position.x, position.y, angle, this.bulletSpeed);
    new weapon.projectile.ShotgunBullet(position.x, position.y, angle + angleRandom3, this.bulletSpeed);
    new weapon.projectile.ShotgunBullet(position.x, position.y, angle + angleRandom4, this.bulletSpeed);
  };

  weapon.Shotgun.prototype.renderMiniature = function(ctx) {
    ctx.drawImage(Img.get('miniatures'), 80, 0, 16, 16, 0, 0, 16, 16);
  };

  weapon.SmokeGrenade = function() {
    weapon.Weapon.call(this, 'Fumigène');
    this.baseLatency = 2;
    this.bulletSpeed = 400;
  };

  __extends(weapon.SmokeGrenade, weapon.Weapon);

  weapon.SmokeGrenade.prototype.fire = function(position, direction) {
    if (!this.canFire()) {
      return;
    }

    this.decreaseAmmo();
    this.resetLatency();
    var angle = Point.angleBetween(direction, position);
    new weapon.projectile.SmokeGrenade(position.x, position.y, angle, this.bulletSpeed);
  };

  weapon.SmokeGrenade.prototype.renderMiniature = function(ctx) {
    ctx.drawImage(Img.get('miniatures'), 128, 0, 16, 16, 0, 0, 16, 16);
  };

  weapon.SubmachineGun = function() {
    weapon.Weapon.call(this, 'Mitraillette');
    this.baseLatency = 0.1;
    this.bulletSpeed = 400;
  };

  __extends(weapon.SubmachineGun, weapon.Weapon);

  weapon.SubmachineGun.prototype.fire = function(position, direction) {
    // Tir impossible : annulation
    if (!this.canFire()) {
      return;
    }

    // Diminue le nombre de balles de un
    this.decreaseAmmo();

    // Remet à zéro la latence
    this.resetLatency();

    // à faire : avoir des balles différentes de celles du pistolet
    // Création de la balle
    var angle = Point.angleBetween(direction, position);
    new weapon.projectile.Bullet(position.x, position.y, angle, this.bulletSpeed);
  };

  weapon.SubmachineGun.prototype.renderMiniature = function(ctx) {
    ctx.drawImage(Img.get('miniatures'), 96, 0, 16, 16, 0, 0, 16, 16);
  };

  weapon.Dynamite = function() {
    weapon.Weapon.call(this, 'Dynamite');
    this.baseLatency = 0.5;
  };

  __extends(weapon.Dynamite, weapon.Weapon);

  weapon.Dynamite.prototype.fire = function(position, direction) {
    if (!this.canFire()) {
      return;
    }

    this.decreaseAmmo();
    this.resetLatency();
    var dynamite = new block.Dynamite(position.x, position.y);
    Level.blocks.push(dynamite);
  };

  weapon.Dynamite.prototype.renderMiniature = function(ctx) {
    ctx.drawImage(Img.get('miniatures'), 0, 0, 16, 16, 0, 0, 16, 16);
  };

  weapon.projectile = {};

  // Créer une balle
  weapon.projectile.Projectile = function(x, y, width, height, angle, speed) {
    Sprite.call(this, x, y, 5, 3);
    this.damages = 0;
    this.explosion = null;
    this.basePosition = null;
    this.basePosition = this.position.clone();
    this.angle = angle;
    this.damages = 2;
    this.health = 3;
    this.drawFrom = Position.MIDDLE;
    this.velocity = new Point(Math.cos(angle), Math.sin(angle)).multiply1(speed);
    Level.projectiles.push(this);
  };

  __extends(weapon.projectile.Projectile, Sprite);

  // Mettre à jour la balle
  weapon.projectile.Projectile.prototype.update = function(dt) {
    Sprite.prototype.update.call(this, dt);

    // Réduit la vie de la balle
    this.health -= dt;

    // Déplace la balle
    this.position = this.position.add(this.velocity.multiply1(dt));
  };

  // Évènement : lorsque le projectile touche un bloc
  weapon.projectile.Projectile.prototype.onCollision = function(b) {
  };

  // Évènement : lorsque le projectile touche un joueur
  weapon.projectile.Projectile.prototype.onPlayerOverlaps = function(player) {
  };

  weapon.projectile.Grenade = function(x, y, angle, speed) {
    weapon.projectile.Projectile.call(this, x, y, 8, 9, angle, speed);
    this.loadImage(Img.get('grenade'), this.width, this.height);
    this.health = 100;
    this.explosion = new Explosion(this.center().x, this.center().y, 40, 50);
  };

  __extends(weapon.projectile.Grenade, weapon.projectile.Projectile);

  weapon.projectile.Grenade.prototype.update = function(dt) {
    weapon.projectile.Projectile.prototype.update.call(this, dt);

    // Ralenti la grenade
    this.velocity = this.velocity.multiply1(0.98);

    // Met à jour la position de l'explosion
    this.explosion.position = this.center();

    // Si la grenade va trop lentement, la grenade explose puis est
    // supprimée
    if (this.velocity.x > -8 && this.velocity.x < 8 && this.velocity.y > -8 && this.velocity.y < 8) {
      this.explode();
      this.kill();
    }
  };

  weapon.projectile.Grenade.prototype.explode = function() {
    // Déclenche l'explosion
    this.explosion.explode(this);
  };

  // à faire : le rebondissement doit être calculé et non faire comme ici
  // un simple inversement de direction
  weapon.projectile.Grenade.prototype.onCollision = function(b) {
    // Si le bloc n'est pas solide, la suite est ignorée
    if (!b.isSolid()) {
      return;
    }

    // Collision verticale : rebond vertical
    if (this.hitVerticalBlock(b)) {
      this.velocity.x = -this.velocity.x;
    }

    // Collision horizontale : rebond horizontal
    if (this.hitHorizontalBlock(b)) {
      this.velocity.y = -this.velocity.y;
    }
  };

  // à faire : y a-t-il une collision verticale ?
  weapon.projectile.Grenade.prototype.hitVerticalBlock = function(b) {
    return true;
  };

  // à faire : y a-t-il une collision horizontale ?
  weapon.projectile.Grenade.prototype.hitHorizontalBlock = function(b) {
    return true;
  };

  weapon.projectile.Grenade.prototype.render = function(ctx) {
    // Dessine un cercle sous la grenade
    in_CanvasRenderingContext2D.setFillStyle(ctx, rgb2(255, 0, 0, 0.1));
    in_CanvasRenderingContext2D.setStrokeStyle(ctx, rgb2(255, 0, 0, 0.4));
    in_CanvasRenderingContext2D.drawPixelatedCircle(ctx, this.center().x, this.center().y, this.explosion.radius);
    Sprite.prototype.render.call(this, ctx);
  };

  weapon.projectile.Bullet = function(x, y, angle, speed) {
    weapon.projectile.Projectile.call(this, x, y, 5, 3, angle, speed);
    this.loadImage(Img.get('bullet'), this.width, this.height);
    this.damages = 10;
    this.health = 3;
    new Trail(this);
    this.position = this.position.add(this.velocity.multiply1(0.032));
  };

  __extends(weapon.projectile.Bullet, weapon.projectile.Projectile);

  weapon.projectile.Bullet.prototype.render = function(ctx) {
    Sprite.prototype.render.call(this, ctx);
  };

  weapon.projectile.Bullet.prototype.onCollision = function(b) {
    // Supprime la balle si le bloc est solide
    if (b.isSolid()) {
      this.kill();
    }
  };

  weapon.projectile.Bullet.prototype.onPlayerOverlaps = function(player) {
    // Baisse la vie du joueur
    player.decreaseHealth(this.damages);

    // Supprime la balle
    this.kill();
  };

  weapon.projectile.Ray = function(x, y, angle, speed) {
    Sprite.call(this, x, y, 0, 0);
  };

  __extends(weapon.projectile.Ray, Sprite);

  weapon.projectile.Ray.prototype.update = function(dt) {
  };

  weapon.projectile.Ray.prototype.render = function(ctx) {
    ctx.lineWidth = 2;
    ctx.moveTo(this.x(), this.y());
    ctx.lineTo(this.x() + 20, this.y() + 20);
  };

  weapon.projectile.Rocket = function(x, y, angle, speed) {
    weapon.projectile.Projectile.call(this, x, y, 17, 5, angle, speed);
    this.loadImage(Img.get('rocketLauncherBullet'), this.width, this.height);
    this.explosion = new Explosion(this.center().x, this.center().y, 40, 50);
    this.position = this.position.add(this.velocity.multiply1(0.032));

    // Les dommages de la roquette proviennent de l'explosion
    this.damages = 0;
  };

  __extends(weapon.projectile.Rocket, weapon.projectile.Projectile);

  weapon.projectile.Rocket.prototype.update = function(dt) {
    weapon.projectile.Projectile.prototype.update.call(this, dt);

    // Met à jour la position de l'explosion
    this.explosion.position = this.center();

    for (var i = 0, count = in_Math.irand(1, 2); i < count; i = i + 1 | 0) {
      var p = new Particle().position(this.center()).speed(20, 40).life(0.4, 0.6).radius(1, 3).angle(0, 360).color([rgb1(255, 140, 0), rgb1(200, 100, 0), rgb1(160, 60, 0)]);
      Particle.particles.push(p);
    }
  };

  weapon.projectile.Rocket.prototype.explode = function() {
    // Déclenche l'explosion
    this.explosion.explode(this);
  };

  weapon.projectile.Rocket.prototype.onCollision = function(b) {
    // Pas de collision sur le bonus de vie
    if (b instanceof block.bonus.IncreaseHealth) {
      return;
    }

    // Explose la roquette
    this.explode();

    // Supprime la roquette
    this.kill();
  };

  weapon.projectile.Rocket.prototype.onPlayerOverlaps = function(player) {
    // Baisse la vie du joueur
    player.decreaseHealth(this.damages);

    // Explose la roquette
    this.explode();

    // Supprime la roquette
    this.kill();
  };

  weapon.projectile.ShotgunBullet = function(x, y, angle, speed) {
    weapon.projectile.Bullet.call(this, x, y, angle, speed);
    this.damages = 12;
    this.health = 0.5;
  };

  __extends(weapon.projectile.ShotgunBullet, weapon.projectile.Bullet);

  weapon.projectile.SmokeGrenade = function(x, y, angle, speed) {
    weapon.projectile.Projectile.call(this, x, y, 8, 9, angle, speed);
    this.colors = null;
    this.loadImage(Img.get('grenade'), this.width, this.height);

    // Durée de vie : 10 secondes
    this.health = 10;
    var rand = in_Math.irand(0, 3);
    var colors = in_List.get([[rgb1(255, 255, 255), rgb1(233, 233, 233), rgb1(211, 211, 211)], [rgb1(255, 255, 0), rgb1(233, 233, 0), rgb1(211, 211, 0)], [rgb1(0, 255, 255), rgb1(0, 233, 233), rgb1(0, 211, 211)], [rgb1(255, 0, 255), rgb1(233, 0, 233), rgb1(211, 0, 211)]], rand);
    this.colors = colors;
  };

  __extends(weapon.projectile.SmokeGrenade, weapon.projectile.Projectile);

  weapon.projectile.SmokeGrenade.prototype.update = function(dt) {
    weapon.projectile.Projectile.prototype.update.call(this, dt);
    this.health -= 1 * dt;

    // 3 premières secondes : ralentit le fumigène
    // 7 dernières secondes : libère de la fumée
    if (this.health >= 7) {
      this.velocity = this.velocity.multiply1(0.97);
    }

    else {
      this.velocity = new Point(0, 0);
      var p = new Particle().position(this.position).speed(120, 240).life(0.6, 2).radius(20, 60).angle(0, 360).color(this.colors);
      Particle.particles.push(p);
    }
  };

  // à faire : le rebondissement doit être calculé et non faire comme ici
  // un simple inversement de direction
  weapon.projectile.SmokeGrenade.prototype.onCollision = function(b) {
    // Si le bloc n'est pas solide, la suite est ignorée
    if (!b.isSolid()) {
      return;
    }

    // Collision verticale : rebond vertical
    if (this.hitVerticalBlock(b)) {
      this.velocity.x = -this.velocity.x;
    }

    // Collision horizontale : rebond horizontal
    if (this.hitHorizontalBlock(b)) {
      this.velocity.y = -this.velocity.y;
    }
  };

  // à faire : y a-t-il une collision verticale ?
  weapon.projectile.SmokeGrenade.prototype.hitVerticalBlock = function(b) {
    return true;
  };

  // à faire : y a-t-il une collision horizontale ?
  weapon.projectile.SmokeGrenade.prototype.hitHorizontalBlock = function(b) {
    return true;
  };

  var widget = {};

  widget.Widget = function(x, y, relativeTo) {
    this.position = null;
    this.events = null;
    this.relativeTo = 0;
    this.relativeTo = relativeTo;
    this.position = new Point(x, y);
    this.events = {};
  };

  widget.Widget.prototype.x = function() {
    return this.position.x;
  };

  widget.Widget.prototype.y = function() {
    return this.position.y;
  };

  widget.Widget.prototype.on = function(name, callback) {
    this.events[name] = callback;
    return this;
  };

  widget.Widget.prototype.fire = function(name) {
    if (name in this.events) {
      this.events[name]();
    }
  };

  widget.Stick = function(x, y, radius, relativeTo) {
    widget.Widget.call(this, x, y, relativeTo);
    this.stickPosition = null;
    this.pressed = false;
    this.radius = 0;
    this.relativeMousePosition = null;
    this.pointsTo = null;
    this.radius = radius;
    this.stickPosition = new Point((-radius | 0) / 2 | 0, 0);
    this.pressed = false;
    this.relativeMousePosition = new Point(0, 0);
  };

  __extends(widget.Stick, widget.Widget);

  widget.Stick.prototype.render = function(ctx) {
    var stickPosition = this.getStickPosition().multiply1(this.radius / 2);
    ctx.save();

    switch (this.relativeTo) {
      case Position.BOTTOM_LEFT: {
        ctx.translate(this.x(), Game.heightScaled - this.radius - this.y());
        break;
      }

      case Position.BOTTOM_RIGHT: {
        ctx.translate(Game.widthScaled - this.radius - this.x(), Game.heightScaled - this.radius - this.y());
        break;
      }
    }

    in_CanvasRenderingContext2D.setFillStyle(ctx, rgb2(255, 255, 255, 0.6));
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, in_Math.PI() * 2);
    ctx.closePath();
    ctx.fill();
    in_CanvasRenderingContext2D.setFillStyle(ctx, rgb2(0, 0, 0, 0.6));
    ctx.beginPath();
    ctx.arc(stickPosition.x, stickPosition.y, this.radius / 2, 0, in_Math.PI() * 2);
    ctx.closePath();
    ctx.fill();
    in_CanvasRenderingContext2D.setStrokeStyle(ctx, rgb2(0, 0, 0, 0.8));
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(stickPosition.x, stickPosition.y, this.radius / 2.7, 0, in_Math.PI() * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(stickPosition.x, stickPosition.y, this.radius / 4, 0, in_Math.PI() * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(stickPosition.x, stickPosition.y, this.radius / 8, 0, in_Math.PI() * 2);
    ctx.stroke();
    ctx.restore();
  };

  widget.Stick.prototype.setRelativeMousePosition = function(point) {
    this.relativeMousePosition = point;
  };

  widget.Stick.prototype.getRelativeMousePosition = function() {
    return this.relativeMousePosition;
  };

  widget.Stick.prototype.getStickPosition = function() {
    var touch = this.getRelativeMousePosition();
    touch = touch.normalized();
    return touch;
  };

  widget.Stick.prototype.getPosition = function() {
    return new Point(Game.widthScaled - this.radius * 2 - this.x(), Game.heightScaled - this.radius * 2 - this.y());
  };

  widget.Stick.prototype.rect = function() {
    var position = this.getPosition();
    return new Rect(position.x * Game.scale, position.y * Game.scale, __imul(__imul(this.radius | 0, 2), Game.scale), __imul(__imul(this.radius | 0, 2), Game.scale));
  };

  widget.Button = function(x, y, width, height, relativeTo) {
    widget.Widget.call(this, x, y, relativeTo);
    this.width = 0;
    this.height = 0;
    this.width = width;
    this.height = height;
  };

  __extends(widget.Button, widget.Widget);

  widget.Button.prototype.render = function(ctx) {
    ctx.save();

    switch (this.relativeTo) {
      case Position.TOP_LEFT: {
        ctx.translate(this.x(), this.y());
        break;
      }

      case Position.BOTTOM_LEFT: {
        ctx.translate(this.x(), (Game.heightScaled - this.height | 0) - this.y());
        break;
      }

      case Position.BOTTOM_RIGHT: {
        ctx.translate((Game.widthScaled - this.width | 0) - this.x(), (Game.heightScaled - this.height | 0) - this.y());
        break;
      }
    }

    in_CanvasRenderingContext2D.setFillStyle(ctx, rgb2(255, 255, 255, 0.6));
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  };

  widget.Button.prototype.getPosition = function() {
    switch (this.relativeTo) {
      case Position.TOP_LEFT: {
        return new Point(this.x(), this.y());
      }

      case Position.BOTTOM_LEFT: {
        return new Point(this.x(), (Game.heightScaled - this.height | 0) - this.y());
      }

      case Position.BOTTOM_RIGHT: {
        return new Point((Game.widthScaled - this.width | 0) - this.x(), (Game.heightScaled - this.height | 0) - this.y());
      }
    }

    return null;
  };

  widget.Button.prototype.rect = function() {
    var position = this.getPosition();
    return new Rect(position.x * Game.scale, position.y * Game.scale, __imul(this.width, Game.scale), __imul(this.height, Game.scale));
  };

  var HTML = {};

  HTML.asList = function(listLike) {
    var list = [];

    for (var i = 0, count = listLike.length; i < count; i = i + 1 | 0) {
      list.push(listLike[i]);
    }

    return list;
  };

  HTML.on = function(target, type, listener) {
    target.addEventListener(type, listener);
  };

  var in_List = {};

  in_List.get = function(self, index) {
    assert(0 <= index && index < self.length);
    return self[index];
  };

  in_List.set = function(self, index, value) {
    assert(0 <= index && index < self.length);
    return self[index] = value;
  };

  in_List.resize = function(self, count, defaultValue) {
    assert(count >= 0);

    while (self.length < count) {
      self.push(defaultValue);
    }

    while (self.length > count) {
      in_List.removeLast(self);
    }
  };

  in_List.removeLast = function(self) {
    assert(!(self.length == 0));
    self.pop();
  };

  in_List.removeAt = function(self, index) {
    assert(0 <= index && index < self.length);
    self.splice(index, 1);
  };

  in_List.removeIf = function(self, callback) {
    var index = 0;

    // Remove elements in place
    for (var i = 0, count1 = self.length; i < count1; i = i + 1 | 0) {
      if (!callback(in_List.get(self, i))) {
        if (index < i) {
          in_List.set(self, index, in_List.get(self, i));
        }

        index = index + 1 | 0;
      }
    }

    // Shrink the array to the correct size
    while (index < self.length) {
      in_List.removeLast(self);
    }
  };

  // Retourne un élément en le sélectionnant aléatoirement dans la liste
  in_List.randomElement = function(self) {
    return in_List.get(self, in_Math.irand(0, self.length - 1 | 0));
  };

  in_List.slice1 = function(self, start) {
    assert(0 <= start && start <= self.length);
    return self.slice(start);
  };

  var in_StringMap = {};

  in_StringMap.set = function(self, key, value) {
    self.set(key, value);
    return value;
  };

  in_StringMap.insert = function(self, key, value) {
    self.set(key, value);
    return self;
  };

  in_StringMap.each = function(self, x) {
    self.forEach(function(value, key) {
      x(key, value);
    });
  };

  in_StringMap.get1 = function(self, key) {
    assert(self.has(key));
    return self.get(key);
  };

  var in_IntMap = {};

  in_IntMap.set = function(self, key, value) {
    self.set(key, value);
    return value;
  };

  in_IntMap.insert = function(self, key, value) {
    self.set(key, value);
    return self;
  };

  in_IntMap.get = function(self, key, defaultValue) {
    var value = self.get(key);

    // Compare against undefined so the key is only hashed once for speed
    return value !== void 0 ? value : defaultValue;
  };

  in_IntMap.each = function(self, x) {
    self.forEach(function(value, key) {
      x(key, value);
    });
  };

  in_IntMap.get1 = function(self, key) {
    assert(self.has(key));
    return self.get(key);
  };

  var in_Math = {};

  in_Math.PI = function() {
    return 3.141592653589793;
  };

  in_Math.clamp1 = function(x, min, max) {
    return x < min ? min : x > max ? max : x;
  };

  // Aléatoire entre min et max inclus (entier)
  in_Math.irand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min | 0;
  };

  // Aléatoire entre min et max inclus (flottant)
  in_Math.rand = function(min, max) {
    return Math.random() * (max - min) + min;
  };

  // Converti des degrés en radians
  in_Math.degreesToRadians = function(degrees) {
    return degrees * (in_Math.PI() / 180);
  };

  // Converti des radians en degrés
  in_Math.radiansToDegrees = function(radians) {
    return radians * (180 / in_Math.PI());
  };

  var in_string = {};

  in_string.get1 = function(self, index) {
    assert(0 <= index && index < self.length);
    return self.charCodeAt(index);
  };

  var in_PointerDirection = {};

  in_PointerDirection.toInt = function(dir) {
    switch (dir) {
      case PointerDirection.TOP: {
        return 1;
      }

      case PointerDirection.BOTTOM: {
        return -1;
      }

      default: {
        return 0;
      }
    }
  };

  var in_CanvasRenderingContext2D = {};

  // Afficher un morceau d'image selon un index
  in_CanvasRenderingContext2D.drawImageByIndex = function(self, img, x, y, index, width, height) {
    // Nombre de tiles par ligne
    var nbTilesByLine = Math.ceil(img.width / width | 0) | 0;

    // Position x depuis laquelle découper le morceau
    var basex = index % nbTilesByLine | 0;
    basex = __imul(basex, width);

    // Position y depuis laquelle découper le morceau
    var basey = Math.floor(index / nbTilesByLine | 0);
    basey = basey * height;

    // Afficher le morceau d'image
    self.drawImage(img, basex, basey, width, height, x, y, width, height);
  };

  in_CanvasRenderingContext2D.setPixel = function(self, x, y) {
    self.fillRect(x | 0, y | 0, 1, 1);
  };

  // cf. http://members.chello.at/easyfilter/canvas.html
  in_CanvasRenderingContext2D.drawPixelatedCircle = function(self, xm, ym, r) {
    var xn = xm | 0;
    var yn = ym | 0;

    // Dessine le fond du cercle
    self.beginPath();
    self.arc(xn, yn, r, 0, in_Math.PI() * 2, false);
    self.fill();

    // Dessine le contour du cercle
    var tmp = in_CanvasRenderingContext2D.fillStyle(self);
    in_CanvasRenderingContext2D.setFillStyle(self, in_CanvasRenderingContext2D.strokeStyle(self));
    var x = -r;
    var y = 0;
    var err = 2 - 2 * r;

    while (x < 0) {
      in_CanvasRenderingContext2D.setPixel(self, xn - x, yn + y | 0);
      in_CanvasRenderingContext2D.setPixel(self, xn - y | 0, yn - x);
      in_CanvasRenderingContext2D.setPixel(self, xn + x, yn - y | 0);
      in_CanvasRenderingContext2D.setPixel(self, xn + y | 0, yn + x);
      r = err;

      if (r <= y) {
        err += __imul(y = y + 1 | 0, 2) + 1 | 0;
      }

      if (r > x || err > y) {
        err += ++x * 2 + 1;
      }
    }

    in_CanvasRenderingContext2D.setFillStyle(self, tmp);
  };

  in_CanvasRenderingContext2D.drawPixelatedText = function(self, text, x, y) {
    var charSize = 9;
    var font = Img.get(FontManager.pixelatedFont);
    text = text.toLowerCase();

    for (var i = 0, count = text.length; i < count; i = i + 1 | 0) {
      var char = in_string.get1(text, i);
      var codeUnit = in_CanvasRenderingContext2D.codeUnitToFontTableIndex(self, char);
      in_CanvasRenderingContext2D.drawImageByIndex(self, font, x, y, codeUnit, charSize, charSize);
      x += charSize;
    }
  };

  in_CanvasRenderingContext2D.computeTextWidth = function(self, text) {
    var charSize = 9;
    return __imul(charSize, text.length);
  };

  in_CanvasRenderingContext2D.codeUnitToFontTableIndex = function(self, codeUnit) {
    return in_IntMap.get(in_StringMap.get1(FontTable, FontManager.pixelatedFont), codeUnit, 0);
  };

  // colors and styles
  // (default: "black")
  in_CanvasRenderingContext2D.strokeStyle = function(self) {
    return self.strokeStyle;
  };

  // (default: "black")
  in_CanvasRenderingContext2D.fillStyle = function(self) {
    return self.fillStyle;
  };

  in_CanvasRenderingContext2D.setStrokeStyle = function(self, value) {
    self.strokeStyle = value;
  };

  in_CanvasRenderingContext2D.setStrokeStyle2 = function(self, value) {
    self.strokeStyle = value;
  };

  in_CanvasRenderingContext2D.setFillStyle = function(self, value) {
    self.fillStyle = value;
  };

  var in_HTMLCanvasElement = {};

  in_HTMLCanvasElement.getContext2D = function(self) {
    try {
      return self.getContext('2d');
    }

    catch (e) {
    }

    return null;
  };

  var in_HTMLPerformance = {};

  in_HTMLPerformance.now = function(self) {
    return self && self.now ? self.now() : +new Date();
  };

  var in_HTMLWindow = {};

  in_HTMLWindow.addEventListener1 = function(self, type, listener) {
    HTML.on(self, type, listener);
  };

  var in_HTMLDocument = {};

  in_HTMLDocument.addEventListener3 = function(self, type, listener) {
    HTML.on(self, type, listener);
  };

  in_HTMLDocument.addEventListener4 = function(self, type, listener) {
    HTML.on(self, type, listener);
  };

  in_HTMLDocument.addEventListener5 = function(self, type, listener) {
    HTML.on(self, type, listener);
  };

  in_HTMLDocument.addEventListener6 = function(self, type, listener) {
    HTML.on(self, type, listener);
  };

  var in_HTMLTouchEvent = {};

  in_HTMLTouchEvent.touches = function(self) {
    return HTML.asList(self.touches);
  };

  var in_HTMLElement = {};

  in_HTMLElement.addEventListener1 = function(self, type, listener) {
    HTML.on(self, type, listener);
  };

  in_HTMLElement.addEventListener2 = function(self, type, listener) {
    HTML.on(self, type, listener);
  };

  var RELEASE = false;
  var FontTable = in_StringMap.insert(in_StringMap.insert(new Map(), 'font', in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(new Map(), 48, 0), 49, 1), 50, 2), 51, 3), 52, 4), 53, 5), 54, 6), 55, 7), 56, 8), 57, 9), 8734, 10), 97, 15), 98, 16), 99, 17), 100, 18), 101, 19), 102, 20), 103, 21), 104, 22), 105, 23), 106, 24), 107, 25), 108, 26), 109, 27), 110, 28), 111, 29), 112, 30), 113, 31), 114, 32), 115, 33), 116, 34), 117, 35), 118, 36), 119, 37), 120, 38), 121, 39), 122, 40)), 'font2', in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(in_IntMap.insert(new Map(), 48, 0), 49, 1), 50, 2), 51, 3), 52, 4), 53, 5), 54, 6), 55, 7), 56, 8), 57, 9), 8734, 10));

  // Stocke la valeur de la fonction précédente, et son inverse
  var isMobile = mobilecheck();
  var isNotMobile = !isMobile;
  Game.scale = 2;
  Game.W = 200;
  Game.H = 200;
  Game.TILE_SIZE = 16;
  Game.STEP = 1 / 60;
  Game.GAME_WIDTH = __imul(30, Game.TILE_SIZE);
  Game.GAME_HEIGHT = __imul(22, Game.TILE_SIZE);
  Game.width = 200;
  Game.height = 200;
  Game.widthScaled = 200;
  Game.heightScaled = 200;
  Game.camera = new Camera();
  Game.isInGame = false;

  // Images chargées
  Img.images = new Map();

  // Chemin où sont recupérées les images
  Img.path = 'img/';

  // Fonction appelée une fois les images chargées
  Img.callback = null;

  // Balles
  Level.projectiles = [];

  // Joueurs
  Level.players = [];

  // Blocs
  Level.blocks = [];

  // Murs
  Level.walls = [];

  // Niveau
  Level.level = null;

  // Traînées
  Level.trails = [];

  // (1/sqrt(2+1)-1)/2
  OSimplexNoise.STRETCH_CONSTANT_2D = -0.2113248654051871;

  // (sqrt(2+1)-1)/2
  OSimplexNoise.SQUISH_CONSTANT_2D = 0.36602540378443865;
  OSimplexNoise.NORM_CONSTANT_2D = 47;
  Particle.colors = [rgb1(255, 50, 8), rgb1(232, 98, 14), rgb1(240, 188, 37), rgb1(35, 117, 179)];
  Particle.particles = [];
  Player.maxspeed = 180;
  Key.Left = 37;
  Key.Up = 38;
  Key.Right = 39;
  Key.Down = 40;
  Key.D = 68;
  Key.Q = 81;
  Key.S = 83;
  Key.Z = 90;
  FontManager.pixelatedFont = 'font';

  main();
})();
