using System;

namespace EditeurPokelike_WPF
{
    [Serializable]
    public class Fusion
    {
        public Creature with_creature { get; set; }
        public Creature next_creature { get; set; }

        public Fusion(Creature with_creature, Creature next_creature)
        {
            this.with_creature = with_creature;
            this.next_creature = next_creature;
        }
    }
}
