using System;

namespace EditeurPokelike_WPF
{
    [Serializable]
    public class CreatureLearnAttack
    {
        public Attack attack { get; set; }
        public Int16 level { get; set; }

        public CreatureLearnAttack(Attack attack, Int16 level)
        {
            this.attack = attack;
            this.level = level;
        }
    }
}
