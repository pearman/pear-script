<p align="center">
  <img src="images/logo.png"/>
</p>

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
table: () { x: 3 }
table().x.print() # Prints '3'
```

## Tables

Tables are like λ functions in other languages. In the example bellow we have assigned the function, `λ(x) = ((x + 1) * 2) ^ 2` , to the key `math`.  Note that the last statement in the table is the returned value.

```ruby
math: (x){ x.+(1).*(2).squared() }
math(5).print() # Prints '144'
```
If we want to use our table as a simple map we can use the following pattern:

```ruby
user: () { name: 'Gabe' age: 23 }
user().name.print() # Prints 'Gabe'
```

Since assignments return a copy of the table in which they were defined, the last statement `age: 23` will return a copied table when `user` is called. I hope that this will encourage immutability.

## Implementing a Class

Leveraging the features explored above we can now implement a simple class. Note that the arguments `x` and `y` are written as data in the table to which they are linked.

```ruby
Point: (x y) {
    add: (p) { Point(x.+(p.x) y.+(p.y)) }
    distanceTo: (p) { 
        p.x.-(x).squared().+(p.y.-(y).squared()).sqrt() 
    }
}
p1: Point(0 0)
p2: p1.add(Point(1 1))
p1.distanceTo(p2).is(2.sqrt()).print() # Prints 'true'
```

-----

## Bugs

```ruby
x: 5
y: () { x: 4 }
y.x.print() # Prints '5', should throw an error!
```

