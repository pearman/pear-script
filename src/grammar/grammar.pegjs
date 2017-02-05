
Prog "prog"
  = Block _ Prog
  / Block

Block "block"
  = parent:Statement "." child:Block { return {parent, child} }
  / Statement

Statement "statement"
  = Access
  / Assign
  / Object

Assign "assign"
  = object: Object ":" property: Object { return {type: "assignment", object, property} }

Access "access"
  = object: Object "." property: Object { return {type: "access", object, property} }

Object "object"
  = Method
  / Atom

Method "method"
  = method:Property "(" args:Atom* ")" { return { method, args } }

Atom "atom"
  = int:Integer _ { return int }
  / dec:Decimal _ { return dec }
  / prop:Property _ { return prop }

Property "property"
  = [a-zA-Z]+[0-9]* { return text() }

Decimal "decimal"
  = Integer "." Integer

Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*