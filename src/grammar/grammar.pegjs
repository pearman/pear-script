
Prog "prog"
  = Block*

Block "block"
  = Assignment
  / Chain

Table "table"
  = "(" _ args:Object* _ ")" _ "{" _ block:Prog _ "}" { return {type: "table", args, block} }

Assignment "assignment"
  = parent:Chain _ ":" _ child:Chain { return {type: "assignment", parent, child} }

Chain "chain"
  = parent:Statement _ "." _ child:Chain { return [].concat(parent).concat(child) }
  / statement:Statement

Statement "statement"
  = statement:Object _ { return statement }
  / statement:Table _  { return statement }

PropertyObject "propertyObject"
  = Method
  / Property

Object "object"
  = Method
  / Atom
  / Table

Method "method"
  = method:Property "(" _ args:Chain*  _ ")" { return { type: "method", method, args } }

Atom "atom"
  = value:Decimal _   { return {type: "number", value } }
  / value:Integer _   { return {type: "number", value } } 
  / value:Boolean _ { return {type: "boolean", value: (value === 'true') ? true : false } }
  / value:Property _  { return {type: "property", value } }
  / value:String _ { return {type: "string", value } }

Boolean "boolean"
  = "true"
  / "false"

Property "property"
  = [a-zA-Z+\-/%*?#=]+[0-9]* { return text() }

Decimal "decimal"
  = int1:Integer "." int2:Integer { return parseFloat(`${int1}.${int2}`) }

Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }
  
String
  = '"' chars:DoubleStringCharacter* '"' { return chars.join(''); }
  / "'" chars:SingleStringCharacter* "'" { return chars.join(''); }

DoubleStringCharacter
  = !('"' / "\\") char:. { return char; }
  / "\\" sequence:EscapeSequence { return sequence; }

SingleStringCharacter
  = !("'" / "\\") char:. { return char; }
  / "\\" sequence:EscapeSequence { return sequence; }

EscapeSequence
  = "'"
  / '"'
  / "\\"
  / "b"  { return "\b";   }
  / "f"  { return "\f";   }
  / "n"  { return "\n";   }
  / "r"  { return "\r";   }
  / "t"  { return "\t";   }
  / "v"  { return "\x0B"; }

_ "whitespace"
  = [ \t\n\r]*