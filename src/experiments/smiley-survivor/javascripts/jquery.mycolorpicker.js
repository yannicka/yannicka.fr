/**
 * Créez un joli sélecteur de couleur en jQuery
 * par Jay Salvat - http://blog.jaysalvat.com/
 */
(function($) {
   $.fn.myColorPicker = function() {
      return this.each(function(){
         var $$ = $(this);   
         var x  = $$.offset().left;
         var y  = $$.offset().top + $$.outerHeight(true);
         
         // Lorsque le curseur entre dans le champ de saisi
         $$.focus(function() {
            buildColorPicker();
         });

         // Fonction de création de la palette
         function buildColorPicker() {
            // On supprime d'éventuelles autres palettes déja ouvertes
            removeColorPicker();

            // On construit le Html de la palette
            var values  = ['00', '33', '66', '99', 'CC', 'FF']; 
            var content = '';
            content += '<div id="myColorPicker">';
            content += '<ul>';
            for(r = 0; r < 6; r++) { 
               for(g = 0; g < 6; g++) { 
                  for(b = 0; b < 6; b++) { 
                     color = '#' + values[r] + values[g] + values[b]; 
                     content += '<li><a rel="'+ color +'" style="background:'+ color +'" title="'+ color +'"></a></li>';
                   } 
               } 
            }
            content += '</ul>'; 
            content += '<a class="close">Fermer</a>'; 
            content += '</div>'; 

            // On la place dans la page aux coordonnées du textfield
            $(content).css({ 
               position:'absolute', 
               left:x, 
               top:y,
			   backgroundColor: $$.val()
            }).appendTo('body');

            // Lorsqu'une couleur est cliqué, on affiche la valeur dans le textfield
            $('#myColorPicker a').not('.close').click(function() {
               $$.val( $(this).attr('rel') );
			   $$.css({'background-color': $(this).attr('rel') });
			   actPixelCouleur = $(this).attr('rel');
               removeColorPicker();
               return false;
            });
			
            // Au survol d'une couleur, on change le fond de la palette
            $('#myColorPicker a').hover(function() {				
                $('#myColorPicker').css('backgroundColor', $(this).attr('rel') );
            }, function() {
				$('#myColorPicker').css('backgroundColor', $$.val() );		
			});
			
            // On supprime la palette si le lien "Fermer" est cliqué
            $('#myColorPicker a.close').click(function() {
               removeColorPicker();
               return false;
            });   
         }

         // Fonction de suppression de la palette
         function removeColorPicker() {
            $('#myColorPicker').remove();
         }   
      });
   };
})(jQuery);