# Getting Started
## Running the Interpreter

To play with the language yourself, get started with the commands bellow. Note that a Node.JS installation is required.

```sh
git clone https://github.com/pearman/g-lang.git
cd g-lang
npm install
npm run build
npm start
```
## Hello World
To test your installation try the following command!
```ruby
'Hello World'.print()
```
# Description
## All Primitives are Tables

All primitives including numbers, strings, and booleans are tables. That means that in order to operate on them we need to call their encapsulated methods. Let's look at some examples. 

Perhaps we want to verify that 1 + 2 is equal to to 3. This could be written:

```ruby
1.+(2).is(3).print() # Prints 'true'
```

To calculate the square root of (1 + 2) * 3 we would write:

 ```ruby
1.+(2).*(3).sqrt().print() # Prints '9'
 ```

## Table Creation and Local Variable Assignment

Tables are like λ functions in other languages. In the example bellow we have assigned the function, `λ(x) = ((x + 1) * 2) ^ 2` , to the key `math`.  Note that the last statement in the table is the returned value.

```ruby
math: (x){ x.+(1).*(2).squared() }
math(5).print() # Prints '144'
```
## Implementing a Class

```ruby
Point: (x, y) {
  dist: (p2) { x.-(p2.x).squared().+(y.-(p2.y).squared()).sqrt() }
  this.new()
}

p1: Point(1, 2)
p2: Point(3, 2)

p1.dist(p2).print()
```
