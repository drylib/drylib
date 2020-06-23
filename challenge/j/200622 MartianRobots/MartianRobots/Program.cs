using System;
using System.IO;
using System.Linq;

namespace MartianRobots
{
    class Program
    {
        static void Main(string[] args) {
            var lines = File.ReadLines(@"..\..\in.txt");
            var gridSize = lines.First().Split(' ').Select(e => int.Parse(e));
            var grid = new Grid{Width = gridSize.First(), Height = gridSize.Last()};
            Robot robot = null;
            bool first = true;
            foreach(var line in lines.Skip(1)){
                if(first){
                    first = false;
                    var pos = line.Split(' ');
                    robot = new Robot{Grid = grid, Cell = new Cell{X = int.Parse(pos[0]), Y=int.Parse(pos[1])}, Dir = pos[2].ToEnum<Dir>(), Debug = false};
                }else{
                    first = true;
                    robot.Do(line);
                    Console.WriteLine(robot.ToString());
                }
            }
            Console.ReadKey();
        }
    }
    public static partial class Ext {
        public static T ToEnum<T>(this string value) {return (T) Enum.Parse(typeof(T), value, false);}
    }
}
