'use strict';

/* TODO :
	- Nettoyer le code (javascript, html ET css)
	- Le globaliser (TD.) (pour permettre l'ajout d'extensions ?)
	- Importer/Exporter les tâches
*/

/* Variable pour la ToDolist */
var TD = {};

/* Initialisation des variables */
	/* Liste des boutons, liens, canvas ou checkbox */
	TD.txt_task          = document.getElementById('txt_task');
	TD.btn_add           = document.getElementById('btn_add');
	TD.can_chks          = document.getElementById('can_chks');
	TD.table_tasks       = null;
	TD.chks_toggle_state = null;
	TD.btns_edit         = null;
	TD.btns_delete       = null;
	TD.btns_up           = null;
	TD.btns_down         = null;
	TD.links_projects    = null;

	/* Reste */
	TD.tasks          = [];
	TD.task_edit      = -1;
	TD.save_name      = 'todolist_save';
	TD.selected_color = 0;
	TD.ctx_chks       = TD.can_chks.getContext('2d');
	TD.zoom           = 22;
	TD.mouse          = { x: 0, y: 0 };
	TD.colors         = [
		[255, 255, 255], // blanc
		[128, 128, 128], // gris
		[0, 0, 0],       // noir
		[255, 100, 50],  // rouge
		[100, 255, 100], // vert
		[50, 140, 255],  // bleu
		[255, 144, 0],   // orange
		[255, 22, 158],  // rose
		[78, 42, 132],   // violet
		[132, 84, 42]    // marron
	];
	TD.nb_colors      = TD.colors.length;

/* On définit la taille du canvas de checkboxs */
TD.can_chks.width  = TD.colors.length * TD.zoom;
TD.can_chks.height = TD.zoom;

TD.drawColors = function() {
	TD.ctx_chks.clearRect(0, 0, TD.can_chks.width, TD.can_chks.height);

	for (var i = 0 ; i < TD.nb_colors ; i++) {
		TD.ctx_chks.fillStyle = 'rgb(' + TD.colors[i][0] + ', ' + TD.colors[i][1] + ', ' + TD.colors[i][2] + ')';
		TD.ctx_chks.fillRect(i * TD.zoom, 0, TD.zoom, TD.zoom);

		TD.ctx_chks.save();
		TD.ctx_chks.beginPath();
		TD.ctx_chks.arc(i * TD.zoom + (TD.zoom / 2), (TD.zoom / 2), TD.zoom / 3.5, 0, 2 * Math.PI, false);
		TD.ctx_chks.fillStyle = 'rgb(255, 255, 255)';
		TD.ctx_chks.shadowColor = 'rgb(0, 0, 0)';

		if (i == TD.selected_color) {
			TD.ctx_chks.shadowBlur = 4;
			TD.ctx_chks.shadowOffsetX = 0;
			TD.ctx_chks.shadowOffsetY = 0;
		}

		TD.ctx_chks.fill();
		TD.ctx_chks.restore();

		if (i == Math.floor(TD.mouse.x / TD.zoom) && TD.mouse.y >= 0 && TD.mouse.y <= TD.zoom) {
			TD.ctx_chks.lineWidth = 2;
			TD.ctx_chks.strokeStyle = 'rgb(180, 60, 0)';
		} else {
			TD.ctx_chks.lineWidth = 1;
			TD.ctx_chks.strokeStyle = 'rgb(77, 77, 77)';
		}

		TD.ctx_chks.stroke();

		if (i == TD.selected_color) {
			TD.ctx_chks.beginPath();
			TD.ctx_chks.arc(i * TD.zoom + (TD.zoom / 2), (TD.zoom / 2), TD.zoom / 6, 0, 2 * Math.PI, false);
			TD.ctx_chks.fillStyle = 'rgb(0, 0, 0)';
			TD.ctx_chks.fill();
		}
	}
};

TD.can_chks.onclick = function(e) {
	TD.selected_color = Math.floor(TD.mouse.x / TD.zoom);
	TD.drawColors();
};

document.onmousemove = function(e) {
	TD.mouse.x = e.pageX - TD.can_chks.offsetLeft;
	TD.mouse.y = e.pageY - TD.can_chks.offsetTop;
	TD.drawColors();
};

TD.drawColors();

/* Rafraîchissement du tableau de tâches */
TD.refresh_list_tasks = function() {
	var line_table_tasks = '';
	var project          = window.location.hash.toLowerCase();

	TD.table_tasks = document.getElementById('table_tasks');

	/* Une ligne dans le tableau pour chaque tâche */
	for (var i in TD.tasks) {
		if (TD.tasks[i].name !== undefined) {
			var checkbox = '<input type="checkbox"' + (TD.tasks[i].state == 'x' ? ' checked="checked"' : '') + ' class="toggle_state" title="Valider la t&acirc;che" data-id="' + i + '" />';
			var real_name = TD.tasks[i].name;
			var name      = real_name.replace(/^#(.+?) /, '<a href="#$1" class="linkprojet">[$1]</a> ');
			name          = TD.tasks[i].state == 'x' ? '<del>' + name + '</del>' : name;

			var a = new RegExp('^' + project + ' ', 'gi');

			if (project == '' || real_name.match(a)) {
				line_table_tasks += '' +
					'<tr>' +
						'<td style="width: 5%; text-align: center; background-color: ' + TD.tasks[i].color + ';">' + checkbox + '</td>' +
						'<td style="width: 77%;">' + name + '</td>' +
						'<td style="width: 18%;" class="action">' +
							'<button class="edit" data-id="' + i + '" title="Modifier"></button> ' +
							'<button class="delete" data-id="' + i + '" title="Supprimer"></button> ' +
							'<button class="up ' + (i == 0 ? 'hidden' : '') + '" data-id="' + i + '" title="Monter"></button> ' +
							(i != TD.tasks.length - 1 ? '<button class="down" data-id="' + i + '" title="Descendre"></button>' : '') +
						'</td>' +
					'</tr>';
			}
		}
	}

	/* Si on ne voit qu'un seul projet, on ajoute une ligne pour retourner à la liste de toutes les tâches */
	var line_back_all = (project != '') ? 
		'<tr>' +
			'<td></td>' +
			'<td><a href="#" class="linkprojet">Voir toutes les t&acirc;ches</a></td>' +
			'<td></td>' +
		'</tr>' : '';

	/* On met à jour le tableau en incluant l'entête */
	TD.table_tasks.innerHTML = '' +
		'<tr>' +
			'<th style="width: 5%;"></th>' +
			'<th style="width: 77%;">T&acirc;che</th>' +
			'<th style="width: 18%;">Actions</th>' +
		'</tr>' +
		line_back_all +
		line_table_tasks;

	/* On rafraichit la liste des boutons, checkboxs et liens */
	TD.chks_toggle_state = document.getElementsByClassName('toggle_state');
	TD.btns_edit         = document.getElementsByClassName('edit');
	TD.btns_delete       = document.getElementsByClassName('delete');
	TD.btns_up           = document.getElementsByClassName('up');
	TD.btns_down         = document.getElementsByClassName('down');
	TD.links_projects    = document.getElementsByClassName('linkprojet');

	/* Changer l'état d'une tâche choisie au clic de la checkbox */
	for (i in TD.chks_toggle_state) {
		TD.chks_toggle_state[i].onclick = function() {
			if (TD.tasks[this.getAttribute('data-id')].state == 'o') {
				TD.tasks[this.getAttribute('data-id')].state = 'x';
			} else {
				TD.tasks[this.getAttribute('data-id')].state = 'o';
			}

			TD.save();
			TD.refresh_list_tasks();
		};
	}

	/* Modifier la tâche choisie au clic sur le bouton "Modifier" */
	for (i in TD.btns_edit) {
		TD.btns_edit[i].onclick = function() {
			var id = this.getAttribute('data-id');

			TD.task_edit = id;

			TD.txt_task.value = TD.tasks[id].name;
			TD.txt_task.focus();
			TD.txt_task.className = 'red';

			for (var i = 0 ; i < TD.nb_colors ; i++) {
				if (TD.tasks[id].color == 'rgb(' + TD.colors[i][0] + ', ' + TD.colors[i][1] + ', ' + TD.colors[i][2] + ')') {
					TD.selected_color = i;
					TD.drawColors();
				}
			}

			TD.btn_add.value = 'Modifier';
			TD.btn_add.className = 'red';
		};
	}

	/* Supprimer la tâche choisie au clic sur le bouton "Supprimer" */
	for (i in TD.btns_delete) {
		TD.btns_delete[i].onclick = function() {
			var id = this.getAttribute('data-id');

			TD.tasks.splice(this.getAttribute('data-id'), 1);

			TD.save();
			TD.refresh_list_tasks();

			TD.cancel_edit();
		};
	}

	/* Monter la tâche choisie au clic sur le bouton "Monter" */
	for (i in TD.btns_up) {
		TD.btns_up[i].onclick = function() {
			var task = TD.tasks[parseInt(this.getAttribute('data-id')) - 1];

			TD.tasks[parseInt(this.getAttribute('data-id')) - 1] = TD.tasks[this.getAttribute('data-id')];
			TD.tasks[this.getAttribute('data-id')]               = task;

			TD.save();
			TD.refresh_list_tasks();

			TD.cancel_edit();
		};
	}

	/* Descendre la tâche choisie au clic sur le bouton "Descendre" */
	for (i in TD.btns_down) {
		TD.btns_down[i].onclick = function() {
			var task = TD.tasks[parseInt(this.getAttribute('data-id')) + 1];

			TD.tasks[parseInt(this.getAttribute('data-id')) + 1] = TD.tasks[this.getAttribute('data-id')];
			TD.tasks[this.getAttribute('data-id')]               = task;

			TD.save();
			TD.refresh_list_tasks();

			TD.cancel_edit();
		};
	}

	/* Clic sur le lien d'un projet */
	for (i in TD.links_projects) {
		TD.links_projects[i].onclick = function() {
			window.location.hash = this.getAttribute('href');
			TD.refresh_list_tasks();
		};
	}
};

/* Récupération des tâches enregistrés sur le navigateur */
TD.read = function() {
	TD.tasks = JSON.parse(localStorage[TD.save_name]);

	TD.txt_task.focus();
	TD.refresh_list_tasks();
};

/* Sauvegarde des tâches sur le navigateur */
TD.save = function() {
	localStorage[TD.save_name] = JSON.stringify(TD.tasks);

	return true;
};

/* Annule la modification de tâche */
TD.cancel_edit = function() {
	if (TD != -1) {
		TD.task_edit          = -1;
		TD.txt_task.value     = '';
		TD.txt_task.className = '';
		TD.btn_add.value      = 'Ajouter';
		TD.btn_add.className  = '';
	}
};

/* Ajout ou modification d'une tâche au clic du bouton "Ajouter" */
btn_add.onclick = function() {
	if (TD.txt_task.value != '') {
		/* Ajout */
		if (TD.task_edit == -1) {
			var color = 'rgb(255, 255, 255)';

			for (var i = 0 ; i < TD.nb_colors ; i++) {
				color = 'rgb(' + TD.colors[TD.selected_color][0] + ', ' + TD.colors[TD.selected_color][1] + ', ' + TD.colors[TD.selected_color][2] + ')';
			}

			TD.tasks.unshift({ state: 'o', color: color, name: txt_task.value });
		/* Modification */
		} else {
			var color = 'rgb(255, 255, 255)';

			for (var i = 0 ; i < TD.nb_colors ; i++) {
				color = 'rgb(' + TD.colors[TD.selected_color][0] + ', ' + TD.colors[TD.selected_color][1] + ', ' + TD.colors[TD.selected_color][2] + ')';
			}

			TD.tasks[TD.task_edit].name  = TD.txt_task.value;
			TD.tasks[TD.task_edit].color = color;
			TD.task_edit                 = -1;

			TD.txt_task.className = '';

			TD.btn_add.value = 'Ajouter';
			TD.btn_add.className = '';
		}

		TD.txt_task.value = '';

		TD.save();
		TD.refresh_list_tasks();
	}

	TD.txt_task.focus();
};

/* Validation automatique du formulaire lors de l'appuie sur la touche entrée */
document.onkeydown = function(e) {
	if (e.keyCode == 13) {
		TD.btn_add.click();
	}
};

/* On récupère la liste des tâches au démarrage de l'application */
TD.read();
