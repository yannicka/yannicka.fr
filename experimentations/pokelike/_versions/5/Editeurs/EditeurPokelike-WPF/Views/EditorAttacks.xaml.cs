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
    public partial class EditorAttacks : Page
    {
        private Creatures creatures;

        //private Creature.Attack cur_attack;

        public EditorAttacks()
        {
            //InitializeComponent();
            DataContext = this;
        }

        private void page_editor_attacks_Loaded(object sender, RoutedEventArgs e)
        {
            creatures = new Creatures();

            DataContext = creatures.attacks;
        }
    }
}
