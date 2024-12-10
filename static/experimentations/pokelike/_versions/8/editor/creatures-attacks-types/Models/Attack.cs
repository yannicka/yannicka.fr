using System;

namespace EditeurPokelike_WPF
{
    [Serializable]
    public class Attack
    {
        public String name { get; set; }

        public Attack(String name)
        {
            this.name = name;
        }
    }
}
