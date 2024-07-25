using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;

namespace EditeurPokelike_WPF
{
    [Serializable]
    public class Creatures
    {
        public List<Creature> creatures;
        public List<Attack> attacks;
        public List<Type> types;

        public Creatures()
        {
            FileStream stream = new FileStream("save.dat", FileMode.Open);

            try
            {
                BinaryFormatter formatter = new BinaryFormatter();
                Creatures data = (Creatures)formatter.Deserialize(stream);

                creatures = data.creatures;
                attacks = data.attacks;
                types = data.types;
            }
            catch (Exception e)
            {
                creatures = new List<Creature>();
                creatures.Add(new Creature("ok"));
                attacks = new List<Attack>();
                types = new List<Type>();
            }
            finally
            {
                stream.Close();
                stream.Dispose();
            }
        }

        // Sauvegarder les données (sérialisation binaire)
        public bool save()
        {
            try
            {
                Stream stream = File.Open("save.dat", FileMode.Create);
                BinaryFormatter formatter = new BinaryFormatter();
                formatter.Serialize(stream, this);

                save_json();

                stream.Close();
                stream.Dispose();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        // Sauvegarder les données (format json) pour le jeu
        public string save_json()
        {
            StringBuilder str = new StringBuilder();

            str.Append("{\n");

            str.Append("\t\"creatures\":[\n");

            foreach (Creature creature in creatures)
            {
                str.Append("\t\t{");
                str.Append("\n\t\t\t\"name\":\"" + creature.name + "\",");
                str.Append("\n\t\t\t\"base_life\":" + creature.base_life + ",");
                str.Append("\n\t\t\t\"base_attack\":" + creature.base_attack + ",");
                str.Append("\n\t\t\t\"base_defense\":" + creature.base_defense + ",");
                str.Append("\n\t\t\t\"attacks\":");
                str.Append("{");

                foreach (CreatureLearnAttack learn in creature.attacks)
                {
                    str.Append("\n\t\t\t\t\"" + learn.level + "\":\"" + attacks.IndexOf(learn.attack) + "\",");
                }

                if (creature.attacks.Count > 0)
                    str.Remove(str.Length - 1, 1);

                str.Append("\n\t\t\t},");
                str.Append("\n\t\t\t\"fusions\":");
                str.Append("{");

                foreach (Fusion fusion in creature.fusions)
                {
                    str.Append("\n\t\t\t\t\"" + creatures.IndexOf(fusion.with_creature) + "\":\"" + creatures.IndexOf(fusion.next_creature) + "\",");
                }

                if (creature.fusions.Count > 0)
                    str.Remove(str.Length - 1, 1);

                str.Append("\n\t\t\t}");
                str.Append("\n\t\t},\n\n");
            }

            str.Remove(str.Length - 3, 3);

            str.Append("\n\t],\n\n");

            str.Append("\t\"attacks\":[\n");

            foreach (Attack attack in attacks)
            {
                str.Append("\t\t{");
                str.Append("\"name\":\"" + attack.name + "\"");
                str.Append("},\n");
            }

            str.Remove(str.Length - 2, 2);

            str.Append("\n\t]\n");

            str.Append("}\n");

            // todo : pour le debug, laisser les sauts de lignes et tabulations, sinon les supprimer :
            //str.Replace("\n", "");
            //str.Replace("\t", "");

            File.WriteAllText("save.json", str.ToString());

            return str.ToString();
        }

        // Ajouter une créature
        public void add_creature(Creature creature)
        {
            creatures.Add(creature);
        }

        // Supprimer une créature
        public void remove_creature(Creature creature)
        {
            // On supprime les fusions avec cette créature (todo : à tester)
            foreach (Creature a_creature in creatures)
            {
                foreach (Fusion fusion in creature.fusions)
                {
                    if (fusion.with_creature == creature)
                    {
                        a_creature.remove_fusion(fusion);
                    }
                }
            }

            creatures.Remove(creature);

        }

        // Ajouter une attaque
        public void add_attack(Attack attack)
        {
            attacks.Add(attack);
        }

        // Supprimer une attaque
        public void remove_attack(Attack attack)
        {
            // On supprime les attaques apprises (todo : à tester)
            foreach (Creature creature in creatures)
            {
                foreach (CreatureLearnAttack learn in creature.attacks)
                {
                    if (learn.attack == attack)
                    {
                        creature.attacks.Remove(learn);
                    }
                }
            }

            attacks.Remove(attack);
        }
    }
}
