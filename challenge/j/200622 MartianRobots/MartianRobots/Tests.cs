using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MartianRobots
{
    [TestClass]
    public class Tests {

        [TestMethod]
        public void JustTurn1() {
            var grid = new Grid{ Width=1, Height=1 };
            var robot = new Robot{ Grid = grid, Cell=new Cell{ X=0, Y=0 }, Dir = Dir.N };
            robot.Right();
            Assert.AreEqual(Dir.E, robot.Dir);
        }
        [TestMethod]
        public void TwoMovesToFall() {
            var grid = new Grid{ Width=2, Height=2 };
            var robot = new Robot{ Grid = grid, Cell=new Cell{ X=0, Y=0 }, Dir = Dir.N };
            robot.Forward(); Assert.IsTrue(robot.IsValid);
            robot.Forward(); Assert.IsFalse(robot.IsValid); // crash
        }
        [TestMethod]
        public void Circle() {
            var grid = new Grid{ Width=2, Height=2 };
            var robot = new Robot{ Grid = grid, Cell=new Cell{ X=0, Y=0 }, Dir = Dir.E };
            robot.Forward(); Assert.IsTrue(robot.IsValid);robot.Left(); Assert.AreEqual(new Cell{ X=1, Y=0 }, robot.Cell);
            robot.Forward(); Assert.IsTrue(robot.IsValid);robot.Left(); Assert.AreEqual(new Cell{ X=1, Y=1 }, robot.Cell);
            robot.Forward(); Assert.IsTrue(robot.IsValid);robot.Left(); Assert.AreEqual(new Cell{ X=0, Y=1 }, robot.Cell);
            robot.Forward(); Assert.IsTrue(robot.IsValid);robot.Left(); Assert.AreEqual(new Cell{ X=0, Y=0 }, robot.Cell);
            Assert.AreEqual(Dir.E, robot.Dir);
        }
       [TestMethod]
        public void Scent1() {
            var grid = new Grid{ Width=2, Height=2 };
            var robot = new Robot{ Grid = grid, Cell=new Cell{ X=0, Y=0 }, Dir = Dir.N };
            robot.Forward();robot.Left();robot.Forward(); Assert.IsTrue(grid.Scent.Contains(new Cell{ X=0, Y=1 }));
            robot = new Robot{ Grid = grid, Cell=new Cell{ X=0, Y=0 }, Dir = Dir.N };
            robot.Forward();robot.Left(); robot.Forward(); Assert.IsTrue(robot.IsValid);robot.Forward();robot.Forward(); // ignoring moves into scented crash
            robot.Right();robot.Forward(); Assert.IsTrue(robot.IsValid); //should not crash here even in diff direction
        }
     }
}
