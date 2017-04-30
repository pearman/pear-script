<p align="center">
  <img src="images/logo.png"/>
</p>

# Getting Started

## Try It Now

Head to [pear-script.io](http://pear-script.io) to try it now!

## Installation

To get started simply install `pear-script` with `npm`. Note that a Node.JS installation is required.

```sh
npm install -g pear-script
```

`pear-script` can now be run from the command line.
```sh
pear-script # REPL
pear-script file.pear # Run test.pear
```

## Developement

To play with the language yourself, get started with the commands bellow. 

```sh
git clone https://github.com/pearman/pear-script.git
cd pear-script
npm install
npm run dev
```
# Description
## Hello World
To test your installation try the following command!
```ruby
'Hello World'.print()
```

## All Primitives are Tables

All primitives (numbers, strings, and booleans) are tables. That means that in order to operate on them we need to call their encapsulated methods. Let's look at some examples. 

Perhaps we want to verify that 1 + 2 is equal to 3. This could be written:

```ruby
1.+(2).is(3).print() # Prints 'true'
```

To calculate the square root of (1 + 2) * 3 we would write:

 ```ruby
1.+(2).*(3).sqrt().print() # Prints '9'
 ```

## Assignment

Variable assignment is done with `:` in a similar fashion to JSON.

```ruby
x: 'a Variable'
x.is('a Variable').print() # Prints 'true'
```

The variable will exist within the currently defined table. **All assignments return a copy of the table in which they were defined** (this will be explained more in the next section). Let's look at an example:

```ruby
table: { x: 3 }
table.x.print() # Prints '3'
```

## Tables

Tables are the fundemental data structure in pear-script. Everything is a table — meaning they have to be quite flexible. Play with all of these examples at [pear-script.io](http://pear-script.io) (click the ? in the title bar).

### Table as an Array

If no keys are defined each entry in a table literal will automatically be assigned to a numeric key.

```ruby
x: { 4 3 2 1 } # { 0:4 1:3 2:2 3:1 }
xSquared: x.map( (i){ i.^(2) } ) # { 0:16 1:9 2:4 3:1 }
xSub0: x.get(0) # 4
```

### Table as a Map

If a key is specified the value will be recored to the table as defined.

```ruby
y: { name: 'Bob' age: 19 } # { name:'Bob' age:19 }
isOver18: y.age.>(18) # true
```

### Table as both an Array and Map

Due the properties of a pear-script table, they can act simultaniously as arrays and maps. 

```ruby
z: { 98.2 85.2 90.2 75 gradesOf: 'Bob' } # { 0:98.2 1:85.2 ... gradesOf:'Bob'}
finalAverage: z.sum()./( z.length() ) # 87.15
```

### Table as a Function

Tables are like λ functions in other languages. In the example bellow we have assigned the function, `λ(x) = ((x + 1) * 2) ^ 2` , to the key `math`.  Note that the last statement in the table is the returned value.

```ruby
math: (x){ x.+(1).*(2).squared() }
math(5).print() # Prints '144'
```

## Conditional Logic

Every table has an `is` method for value comparision. In the example bellow `x.is(3)` returns `true`. The value `true` is a Boolean so we can call its `then` method which takes two arguments. The first will be returned if the boolean is `true` and the other if it is `false`.

```ruby
x: 3
x.is(3).then('X is 3' 'X is not 3').print() # Prints 'X is 3'
```

## Loops

The number object has a ruby-like looping method called `times`. It takes a table, with an optional iterator argument, as input.

```ruby
3.times((i){ 1.+(i).print() })
'BOOM'.print() # Prints '1 2 3 BOOM'
```

## Implementing a Class

Leveraging the features explored above we can now implement a simple class. Note that the arguments `x` and `y` are written as data in the table to which they are linked. Play with this example at [pear-script.io](http://pear-script.io) (click the ? in the title bar).

```ruby
# Note that 'x' and 'y' are added to the Table
# during execution, so they do not need to be
# defined within our 'Point' table.
Point: (x y) {
	add: (p) { Point(x.+(p.x) y.+(p.y)) }
	distanceTo: (p) { 
		p.x.-(x).^(2).+(p.y.-(y).^(2)).sqrt() 
	}
}

# Initialize some Points
p1: Point(0 0)
p2: p1.add(Point(1 1))

# Play with our Points
result: p1.distanceTo(p2)

result.print()
result.is( 2.sqrt() ).print()
```
