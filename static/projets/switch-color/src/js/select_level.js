// Generated by CoffeeScript 1.7.1
var random_level_ul, random_level_ul_style;

if (!localStorage.getItem('cur_level')) {
  localStorage.setItem('cur_level', 0);
}

if (!localStorage.getItem('medals')) {
  localStorage.setItem('medals', JSON.stringify({}));
}

load_file('data/level.csv', function(response) {
  var choice, cur_level, i, lvl, lvl_medal, medal, medals, nb_grids, _i;
  medals = JSON.parse(localStorage.getItem('medals'));
  nb_grids = parse_csv(response).length;
  cur_level = parseInt(localStorage.getItem('cur_level'));
  choice = document.getElementById('choice');
  for (i = _i = 0; _i < nb_grids; i = _i += 1) {
    lvl = document.createElement('li');
    lvl.setAttribute('data-level', i.toString());
    lvl.appendChild(document.createTextNode((i + 1).toString()));
    if (i === cur_level) {
      lvl.className = 'current';
    } else if (i < cur_level) {
      lvl.className = 'finished';
    }
    if (medals[i] > 0) {
      lvl_medal = document.createElement('span');
      medal = (function() {
        switch (medals[i]) {
          case 1:
            return 'bronze';
          case 2:
            return 'silver';
          case 3:
            return 'gold';
        }
      })();
      lvl_medal.className = "medal-" + medal;
      lvl.appendChild(lvl_medal);
    }
    choice.appendChild(lvl);
  }
});

random_level_ul = document.getElementById('tab_random_level');

random_level_ul_style = random_level_ul.style;

random_level_ul.style.display = 'none';

new Finger().add_event('tap', function(e) {
  var cur_level, target, target_level;
  if (e.target.hasAttribute('data-level') || e.target.id === 'random_level') {
    target = e.target;
  } else {
    target = e.target.parentNode;
  }
  if (target.getAttribute('data-level')) {
    target_level = parseInt(target.getAttribute('data-level'));
    cur_level = parseInt(localStorage.getItem('cur_level'));
    if (cur_level >= target_level) {
      localStorage.setItem('go_level', target_level);
      location.href = 'game.html';
    }
  } else if (e.target.id === 'random_level') {
    if (random_level_ul_style.display === 'block') {
      random_level_ul_style.display = 'none';
    } else {
      random_level_ul_style.display = 'block';
    }
  }
});
