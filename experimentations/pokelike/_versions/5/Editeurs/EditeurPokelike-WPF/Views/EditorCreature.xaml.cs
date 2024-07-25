using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace EditeurPokelike_WPF
{
    public partial class EditorCreature : Page
    {
        private Creatures creatures;

        private Creature cur_creature;

        public EditorCreature()
        {
            InitializeComponent();
            DataContext = this;

        }

        // Une fois la page chargée
        private void page_editor_creatures_Loaded(object sender, RoutedEventArgs e)
        {
            creatures = new Creatures();

            /*
            Type neutre = new Type("Neutre", new List<WeaknessType>());
            Type feu = new Type("Feu", new List<WeaknessType>());
            Type eau = new Type("Eau", new List<WeaknessType>());
            Type air = new Type("Air", new List<WeaknessType>());
            Type terre = new Type("Terre", new List<WeaknessType>());
            Type shadow = new Type("Ombre", new List<WeaknessType>());
            Type light = new Type("Lumière", new List<WeaknessType>());

            neutre.weaknesses.Add(new WeaknessType(neutre, 1));
            neutre.weaknesses.Add(new WeaknessType(feu, 1));
            neutre.weaknesses.Add(new WeaknessType(eau, 1));
            neutre.weaknesses.Add(new WeaknessType(air, 1));
            neutre.weaknesses.Add(new WeaknessType(terre, 1));
            neutre.weaknesses.Add(new WeaknessType(shadow, 1));
            neutre.weaknesses.Add(new WeaknessType(light, 1));

            feu.weaknesses.Add(new WeaknessType(neutre, 1));
            feu.weaknesses.Add(new WeaknessType(feu, 1));
            feu.weaknesses.Add(new WeaknessType(eau, 1));
            feu.weaknesses.Add(new WeaknessType(air, 1));
            feu.weaknesses.Add(new WeaknessType(terre, 1));
            feu.weaknesses.Add(new WeaknessType(shadow, 1));
            feu.weaknesses.Add(new WeaknessType(light, 1));

            eau.weaknesses.Add(new WeaknessType(neutre, 1));
            eau.weaknesses.Add(new WeaknessType(feu, 1));
            eau.weaknesses.Add(new WeaknessType(eau, 1));
            eau.weaknesses.Add(new WeaknessType(air, 1));
            eau.weaknesses.Add(new WeaknessType(terre, 1));
            eau.weaknesses.Add(new WeaknessType(shadow, 1));
            eau.weaknesses.Add(new WeaknessType(light, 1));

            air.weaknesses.Add(new WeaknessType(neutre, 1));
            air.weaknesses.Add(new WeaknessType(feu, 1));
            air.weaknesses.Add(new WeaknessType(eau, 1));
            air.weaknesses.Add(new WeaknessType(air, 1));
            air.weaknesses.Add(new WeaknessType(terre, 1));
            air.weaknesses.Add(new WeaknessType(shadow, 1));
            air.weaknesses.Add(new WeaknessType(light, 1));

            terre.weaknesses.Add(new WeaknessType(neutre, 1));
            terre.weaknesses.Add(new WeaknessType(feu, 1));
            terre.weaknesses.Add(new WeaknessType(eau, 1));
            terre.weaknesses.Add(new WeaknessType(air, 1));
            terre.weaknesses.Add(new WeaknessType(terre, 1));
            terre.weaknesses.Add(new WeaknessType(shadow, 1));
            terre.weaknesses.Add(new WeaknessType(light, 1));

            shadow.weaknesses.Add(new WeaknessType(neutre, 1));
            shadow.weaknesses.Add(new WeaknessType(feu, 1));
            shadow.weaknesses.Add(new WeaknessType(eau, 1));
            shadow.weaknesses.Add(new WeaknessType(air, 1));
            shadow.weaknesses.Add(new WeaknessType(terre, 1));
            shadow.weaknesses.Add(new WeaknessType(shadow, 1));
            shadow.weaknesses.Add(new WeaknessType(light, 1));

            light.weaknesses.Add(new WeaknessType(neutre, 1));
            light.weaknesses.Add(new WeaknessType(feu, 1));
            light.weaknesses.Add(new WeaknessType(eau, 1));
            light.weaknesses.Add(new WeaknessType(air, 1));
            light.weaknesses.Add(new WeaknessType(terre, 1));
            light.weaknesses.Add(new WeaknessType(shadow, 1));
            light.weaknesses.Add(new WeaknessType(light, 1));

            creatures.types.Clear();
            creatures.types.Add(neutre);
            creatures.types.Add(feu);
            creatures.types.Add(eau);
            creatures.types.Add(air);
            creatures.types.Add(terre);
            creatures.types.Add(shadow);
            creatures.types.Add(light);*/
            
            cmb_select_attack.ItemsSource = creatures.attacks;

            cmb_type1.ItemsSource = creatures.types;
            cmb_type2.ItemsSource = creatures.types;

            DataContext = creatures.creatures;
        }

        /* Menu gauche
        --------------- */
        // Séléction d'une nouvelle créature dans la liste des créatures
        private void cmb_select_creature_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            cur_creature = (Creature)cmb_select_creature.SelectedItem;
        }

        // Créer une créature
        private void btn_create_creature_Click(object sender, RoutedEventArgs e)
        {
            String name = cmb_select_creature.Text;

            creatures.add_creature(new Creature(name));

            System.Windows.MessageBox.Show("Créature créée ; Nombre de créatures : " + creatures.creatures.Count);

            cmb_select_creature.SelectedIndex = creatures.creatures.Count - 1;

            cmb_select_creature.Items.Refresh();
        }

        // Supprimer une créature
        private void btn_delete_creature_Click(object sender, RoutedEventArgs e)
        {
            if (cur_creature != null)
            {
                creatures.remove_creature(cur_creature);

                cmb_select_creature.SelectedIndex = 0;
                cmb_select_creature.Items.Refresh();
            }
        }

        /* Onglet informations générales
        ---------------------------------*/
        // Valider les modifications des informations générales
        private void btn_valid_edition_Click(object sender, RoutedEventArgs e)
        {
            String edit_name = txt_edit_name_creature.Text;

            if (cur_creature != null && edit_name != null)
            {
                cur_creature.name = edit_name;

                try
                {
                    cur_creature.base_life = int.Parse(txt_base_life.Text);
                    cur_creature.base_attack = int.Parse(txt_base_attack.Text);
                    cur_creature.base_defense = int.Parse(txt_base_defense.Text);

                    cur_creature.type1 = (Type)cmb_type1.SelectedItem;
                    cur_creature.type2 = (Type)cmb_type2.SelectedItem;
                }
                catch (Exception err)
                {
                    MessageBox.Show("La validation des modifications a échoué. Vérifiez que vous avez bien saisies des informations valides.", "Validation de modifications échoué", MessageBoxButton.OK, MessageBoxImage.Warning);
                }

                cmb_select_creature.Text = edit_name;
                cmb_select_creature.Items.Refresh();

                System.Windows.MessageBox.Show("Modifications effectuées");
            }
        }

        /* Onglet fusion
        ----------------- */
        // Ajout d'une fusion
        private void btn_add_fusion_Click(object sender, RoutedEventArgs e)
        {
            Creature creature_with = (Creature)cmb_select_with_creature.SelectedItem; // avec
            Creature creature_next = (Creature)cmb_select_next_creature.SelectedItem; // suivant (à / forme)

            if (cur_creature != null && creature_with != null && creature_next != null)
            {
                cur_creature.add_fusion(creature_with, creature_next);

                list_fusions.Items.Refresh();
            }
        }

        // Suppression d'une fusion
        private void btn_delete_fusion_Click(object sender, RoutedEventArgs e)
        {
            Fusion cur_fusion = (Fusion)list_fusions.SelectedItem;

            if (cur_creature != null && cur_fusion != null)
            {
                if (cur_creature.remove_fusion(cur_fusion))
                {
                    list_fusions.Items.Refresh();
                }
                else
                {
                    MessageBox.Show("La suppression de la fusion a échoué. Vérifiez que vous avez bien sélectionné une fusion à supprimer.", "Suppression de fusion échouée", MessageBoxButton.OK, MessageBoxImage.Warning);
                }
            }
        }

        /* Onglet attaque
        ------------------ */
        // Quand le slider du niveau de l'attaque change
        private void sld_lvl_new_attack_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            if (grb_lvl_attack != null)
            {
                grb_lvl_attack.Header = "Niveau " + sld_lvl_new_attack.Value.ToString();
            }
        }

        // Sélection d'une nouvelle attaque dans la liste des attaques
        private void list_attacks_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            CreatureLearnAttack cur_attack = (CreatureLearnAttack)list_attacks.SelectedItem;

            if (cur_attack != null)
            {
                sld_lvl_new_attack.Value = cur_attack.level;
                cmb_select_attack.SelectedItem = cur_attack.attack;
            }
        }

        // Ajouter une attaque
        private void btn_add_attack_Click(object sender, RoutedEventArgs e)
        {
            Attack cur_attack = (Attack)cmb_select_attack.SelectedItem;
            Int16 cur_level = (short)sld_lvl_new_attack.Value;

            if (cur_creature != null && cur_attack != null)
            {
                if (cur_creature.add_attack(new CreatureLearnAttack(cur_attack, cur_level)))
                {
                    cur_creature.attacks.Sort((x, y) => x.level.CompareTo(y.level));

                    list_attacks.Items.Refresh();
                }
                else
                {
                    MessageBox.Show("L'ajout de l'attaque a échoué. Vérifiez que cette créature n'apprend pas déjà cette attaque au même niveau.", "Ajout d'attaque échoué", MessageBoxButton.OK, MessageBoxImage.Warning);
                }
            }
        }

        // Supprimer une attaque
        private void btn_delete_attack_Click(object sender, RoutedEventArgs e)
        {
            CreatureLearnAttack cur_attack = (CreatureLearnAttack)list_attacks.SelectedItem;

            if (cur_creature != null && cur_attack != null)
            {
                cur_creature.remove_attack(cur_attack);

                list_attacks.Items.Refresh();
            }
        }

        // Modifier une attaque
        private void btn_edit_attack_Click(object sender, RoutedEventArgs e)
        {
            CreatureLearnAttack cur_attack = (CreatureLearnAttack)list_attacks.SelectedItem;

            if (cur_attack != null)
            {
                Int16 new_level = (short)sld_lvl_new_attack.Value;
                Attack new_attack = (Attack)cmb_select_attack.SelectedItem;

                if (new_attack != null)
                {
                    cur_attack.level = new_level;
                    cur_attack.attack = new_attack;

                    cur_creature.attacks.Sort((x, y) => x.level.CompareTo(y.level));

                    list_attacks.Items.Refresh();
                }
            }
        }

        private void btn_save_all_Click(object sender, RoutedEventArgs e)
        {
            if (creatures.save())
            {
                MessageBox.Show("Sauvegarde réussie");
            }
            else
            {
                MessageBox.Show("La sauvegarde a échoué", "Sauvegarde échouée", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }

        private void verify_input_txt_base(object sender, KeyEventArgs e)
        {
            if ((e.Key >= Key.NumPad0 && e.Key <= Key.NumPad9) || (Keyboard.IsKeyDown(Key.LeftShift) && e.Key >= Key.D0 && e.Key <= Key.D9))
            {
                if (((TextBox)sender).Text.Length > 2 && ((TextBox)sender).SelectedText.Length == 0)
                {
                    e.Handled = true;
                    return;
                }

                e.Handled = false;
                return;
            }

            e.Handled = true;
        }

        private void cmb_type1_Loaded(object sender, RoutedEventArgs e)
        {
            //cmb_type1.SelectedItem = cur_creature.type1;
        }

        private void cmb_type2_Loaded(object sender, RoutedEventArgs e)
        {
            //cmb_type2.SelectedItem = cur_creature.type2;
        }
    }
}
