using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EditeurPokelike_WPF
{
    [Serializable]
    public class Type
    {
        public string name { get; set; }
        public List<WeaknessType> weaknesses { get; set; }

        public Type(string name, List<WeaknessType> weaknesses)
        {
            this.name = name;
            this.weaknesses = weaknesses;
        }
    }
}
