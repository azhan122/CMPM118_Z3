import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");

const solver = new Solver();

/*
const x = Int.const('x');  // x is a Z3 integer
solver.add(And(x.le(10), x.ge(9)));  // x <= 10, x >=9

// Run Z3 solver, find solution and sat/unsat

if (await solver.check() === "sat") {

    // Extract value for x
    let model = solver.model();
    let xVal = parseInt(model.eval(x).toString());
    console.log(`sat. A valid value for x is: ${xVal}`);

} else {

    console.log("unsat. Could not find a valid value for x.");

}
*/

// Re-solving the four pets puzzle
const x = Int.const('x'); // Bob
const y = Int.const('y'); // Mary
const z = Int.const('z'); // Cathy
const w = Int.const('w'); // Sue

solver.add(And(x.eq(2))); // x (Bob) has a dog (2nd pet)
solver.add(And(y.le(3), y.ge(1))); // y (Mary) does not have a fish (Any pet but fish which is 4th)
solver.add(And(z.le(4), z.ge(1))); // z (Cathy) could have any pet
solver.add(And(w.eq(3))); // w (Sue) has a pet with two legs (Bird, 3rd pet)
solver.add(Distinct(x, y, z, w)); // Everyone has a different pet

if (await solver.check() === "sat") {
    let model = solver.model();
    let xVal = parseInt(model.eval(x).toString());
    console.log(`sat. A valid value for x is: ${xVal}`);
    let yVal = parseInt(model.eval(y).toString());
    console.log(`sat. A valid value for y is: ${yVal}`);
    let zVal = parseInt(model.eval(z).toString());
    console.log(`sat. A valid value for z is: ${zVal}`);
    let wVal = parseInt(model.eval(w).toString());
    console.log(`sat. A valid value for w is: ${wVal} \n`);
} else {
    console.log("unsat. Could not find a valid value. \n");
}


/* In a tile based game world, there is a rectangular fenced-in area.
The left fence side is at tile x=5, the right fence side is at x=10,
the top fence side is at y=15, the bottom fence side is at y=25. Using Z3,
express the constraint of being "inside" the fence, and then generate one
possible value for x and y of being inside the fence (for example, we want
to use Z3 to pick the value for where to place a cow inside the fence). */

const l = Int.const('l'); // left
const r = Int.const('r'); // right
const t = Int.const('t'); // top
const b = Int.const('b'); // bottom

solver.add(And(l.eq(5)));
solver.add(And(r.eq(10)));
solver.add(And(t.eq(15)));
solver.add(And(b.eq(25)));