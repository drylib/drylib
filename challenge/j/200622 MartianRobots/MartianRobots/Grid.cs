using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace MartianRobots{
    public class Grid{
        public int Width,Height; // number of positions (not 0 based)
        public HashSet<Cell> Scent = new HashSet<Cell>();
        public bool IsEmpty{get{return Width < 1 || Height < 1;}}
    }
    public struct Cell{
        public int X,Y; // 0-based
    }
}
