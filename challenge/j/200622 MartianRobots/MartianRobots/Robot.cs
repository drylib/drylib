using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MartianRobots {
    public enum Dir {N,S,E,W}
    public enum Cmd {L,R,F}
    public static partial class Ext {
        public static bool Vert(this Dir @this){return @this == Dir.N || @this == Dir.S;}
        public static bool Inc(this Dir @this){return @this == Dir.N || @this == Dir.E;}
    }
    public class Robot{
        public Grid Grid = new Grid{Width=1, Height=1};
        public Cell Cell = new Cell{X=0, Y=0};
        public Dir Dir = Dir.N;
        public bool Debug = false;

        public bool IsValid{get{return !Grid.IsEmpty
            && Cell.X >= 0 && Cell.X <= Grid.Width-1
            && Cell.Y >= 0 && Cell.Y <= Grid.Height-1
        ;}}
        public bool Dangerous{get{return false
            || Cell.X == 0 && Dir == Dir.W
            || Cell.X == Grid.Width-1 && Dir == Dir.E
            || Cell.Y == 0 && Dir == Dir.S
            || Cell.Y == Grid.Height-1 && Dir == Dir.N
        ;}}
        public void Forward(){
            if(!IsValid)
                return;
            if(Dangerous)
                if(Grid.Scent.Contains(Cell))
                    return; // ignore command
                else
                    Grid.Scent.Add(Cell);
                    // let it move and crash
            if(!Dir.Vert())
                if(Dir.Inc())
                    Cell.X++;
                else
                    Cell.X--;
            else
                if(Dir.Inc())
                    Cell.Y++;
                else
                    Cell.Y--;
        }
        public void Left(){
            switch(Dir){
                case Dir.N: Dir = Dir.W; break;
                case Dir.W: Dir = Dir.S; break;
                case Dir.S: Dir = Dir.E; break;
                case Dir.E: Dir = Dir.N; break;
            }
        }
        public void Right(){Left();Left();Left();}

        public void Do(Cmd cmd){
            switch(cmd){
                case Cmd.L: Left(); break;
                case Cmd.R: Right(); break;
                case Cmd.F: Forward(); break;
            }
        }
        override public string ToString(){
            var ret = new StringBuilder();
            ret.AppendFormat("{0} {1} {2:G}", Cell.X, Cell.Y, Dir);
            if(!IsValid)
                ret.Append(" LOST");
            return ret.ToString();
        }

        public void Do(string cmds){
            foreach(var turn in cmds){
                if(Debug) {
                    Console.WriteLine();
                    Console.Write("// from: " + ToString() + "   Do: " + turn);
                }
                Do(turn.ToString().ToEnum<Cmd>());
                if(Debug) Console.Write(" to: " + ToString());
            }
        }
    }
}