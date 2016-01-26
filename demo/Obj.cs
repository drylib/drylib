using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DRY.Core.Ext;

namespace DRY.Demo {
   [TestClass]
   public class Tests {
      enum Fruit {Orange, Banana, Raspberry, Apple, Persimmon}
      enum Color {Red, Blue, Green}

      [TestMethod]
      public void Pos() {
         var orange = Fruit.Orange;
         Assert.AreEqual(0,orange.Pos(Fruit.Orange, Fruit.Raspberry));
         Assert.AreEqual(-1,orange.Pos(Fruit.Persimmon, Fruit.Apple));
         Assert.AreEqual(-1,Fruit.Persimmon.Pos());
         Assert.AreEqual(2,Fruit.Banana.Pos(Fruit.Orange, Fruit.Raspberry, Fruit.Banana));

         Assert.AreNotEqual(null,Fruit.Banana.Pos(Fruit.Orange, Fruit.Raspberry, Fruit.Banana));
      }

      [TestMethod]
      public void In() {
         var fruit = Fruit.Orange;
         Assert.IsTrue(fruit.In(Fruit.Orange, Fruit.Raspberry));
         Assert.IsFalse(fruit.In(Fruit.Raspberry, Fruit.Persimmon));

         Assert.IsFalse(1.In(2,3));
         Assert.IsTrue(2.In(2,3));

         Assert.IsTrue(Color.Blue.In(Color.Blue, Color.Green));
         Assert.IsFalse(Color.Red.In(Color.Blue, Color.Green));

         Assert.IsFalse(Color.Red.In(null));
         Assert.IsFalse(((Color?)null).In(null));
      }
   }
}
