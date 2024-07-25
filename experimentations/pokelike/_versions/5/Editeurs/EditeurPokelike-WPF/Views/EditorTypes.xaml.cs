using System;
using System.Collections.Generic;
using System.Linq;
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

namespace EditeurPokelike_WPF.Views
{
    public partial class EditorTypes : Page
    {
        private Creatures creatures;

        public EditorTypes()
        {
            InitializeComponent();
        }

        private void page_editor_types_Loaded(object sender, RoutedEventArgs e)
        {
            creatures = new Creatures();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            // On ajoute le type
            creatures.types.Add(new Type(txt_name_type.Text, new List<WeaknessType>()));

            // On vide la grille
            grid_weaknesses_types.RowDefinitions.Clear();
            grid_weaknesses_types.ColumnDefinitions.Clear();
            grid_weaknesses_types.Children.Clear();

            // On recréer toutes les lignes
            for (int i = 0; i < creatures.types.Count + 1; i++)
            {
                grid_weaknesses_types.RowDefinitions.Add(new RowDefinition());
            }

            // On recréer toutes les colonnes
            for (int i = 0; i < creatures.types.Count + 1; i++)
            {
                grid_weaknesses_types.ColumnDefinitions.Add(new ColumnDefinition());
            }

            // On remplie les cellules
            for (int i = 0; i < creatures.types.Count + 1; i++) // i : colonne
            {
                for (int j = 0; j < creatures.types.Count + 1; j++) // j : ligne
                {
                    TextBlock a = new TextBlock();

                    if (i == 0)
                    {
                        a.Text = "TYPE1";
                    }
                    else if (j == 0)
                    {
                        a.Text = "TYPE2";
                    }
                    else
                    {
                        a.Text = "1";
                    }

                    Grid.SetRow(a, j);
                    Grid.SetColumn(a, i);

                    grid_weaknesses_types.Children.Add(a);
                }
            }
        }
    }
}
