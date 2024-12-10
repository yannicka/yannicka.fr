using System;
using System.Collections.Generic;

namespace EditeurPokelike_WPF
{
    [Serializable]
    public class Creature
    {
        public string name { get; set; }
        public int base_life { get; set; }
        public int base_attack { get; set; }
        public int base_defense { get; set; }
        public List<CreatureLearnAttack> attacks { get; set; }
        public List<Fusion> fusions { get; set; }
        public Type type1;
        public Type type2;

        public Creature(String name)
        {
            this.name = name;
            this.base_life = 0;
            this.base_attack = 0;
            this.base_defense = 0;
            this.fusions = new List<Fusion>();
            this.attacks = new List<CreatureLearnAttack>();
            this.type1 = null;
            this.type2 = null;
        }

        // Ajouter une fusion
        public bool add_fusion(Creature with_creature, Creature next_creature)
        {
            bool can = true;

            if (can) // todo : vérifier que la créature n'entre pas déjà en fusion avec with_creature
            {
                fusions.Add(new Fusion(with_creature, next_creature));
                with_creature.fusions.Add(new Fusion(this, next_creature));
            }

            return can;
        }

        // Supprimer une fusion
        public bool remove_fusion(Fusion fusion)
        {
            bool cur_remove  = false;
            bool next_remove = false;

            // On supprime la fusion du côté de la créature avec laquelle celle-ci fusionnait
            foreach (Fusion a_fusion in fusion.with_creature.fusions)
            {
                if (!fusion.Equals(a_fusion) && a_fusion.with_creature.Equals(this) && a_fusion.next_creature.Equals(fusion.next_creature))
                {
                    next_remove = fusion.with_creature.fusions.Remove(a_fusion);
                    break;
                }
            }

            if (next_remove)
            {
                cur_remove = fusions.Remove(fusion);
            }

            return cur_remove && next_remove;
        }

        // Ajouter une attaque
        public bool add_attack(CreatureLearnAttack attack)
        {
            bool can = true;

            foreach (CreatureLearnAttack an_attack in attacks)
            {
                if (an_attack.attack == attack.attack && an_attack.level == attack.level)
                {
                    can = false;
                    break;
                }
            }

            if (can)
            {
                attacks.Add(attack);
            }

            return can;
        }

        // Supprimer une attaque
        public void remove_attack(CreatureLearnAttack attack)
        {
            attacks.Remove(attack);
        }
    }
}
