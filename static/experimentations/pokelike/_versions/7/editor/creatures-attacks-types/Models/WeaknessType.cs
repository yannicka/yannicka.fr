using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EditeurPokelike_WPF
{
    [Serializable]
    public class WeaknessType
    {
        public Type type { get; set; }
        public int rate { get; set; }

        public WeaknessType(Type type, int rate)
        {
            this.type = type;
            this.rate = rate;
        }
    }
}
