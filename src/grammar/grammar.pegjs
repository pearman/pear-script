
{
	function parseBlock(args, block) {
    	var result = {};
      var i = 0;
      block.forEach(function(statement) {
        var object = statement;
        if (statement.length 
            || statement._method 
            || statement._comment 
            || statement._property 
            || typeof statement !== 'object') {
          var temp = {};
          temp[i++] = statement;
          object = temp;
        }
        return Object.assign(result, object);
      })
      Object.assign(result, {_args: args})
      return result;
  }
}

Prog
  = _ block:Block* { return block }

Block
  = Assignment
  / Chain
  / Comment

Table
  = args:ArgBlock _ "{" _ block:Prog _ "}" { return parseBlock(args, block)}
  / "{" _ block:Prog _ "}" { return parseBlock([], block)}
  
ArgBlock
	= "(" _ args:Object* _ ")" { return args }

Assignment
  = parent:Chain _ ":" _ child:Chain {
    var result = parent;
    if (parent.length) {
      result = parent.map(function(value) { return value._property }).join('.');
    } else {
      result = parent._property;
    }
    var output = {};
    output[result] = child;
    return output; 
  }

Chain
  = parent:Statement _ "." _ child:Chain { return [].concat(parent).concat(child) }
  / statement:Statement
  
Comment
  = _ "#" comment:[^\n]* _ { return { _comment: comment.join('') } }

Statement
  = statement:Object _ { return statement }
  / statement:Table _  { return statement }

PropertyObject
  = Method
  / Property

Object
  = Method
  / Atom
  / Table

Method
  = method:Property "(" _ args:Chain*  _ ")" { return { _method: method, _args: args } }

Atom
  = value:Decimal _   { return value }
  / value:Integer _   { return value } 
  / value:Boolean _ { return (value === 'true') ? true : false }
  / value:Property _  { return { _property: value }}
  / value:String _ { return value }

Boolean
  = "true"
  / "false"

Property
  = [a-zA-Z+\-/%*?=\^<>]+[0-9]* { return text() }

Decimal
  = int1:Integer "." int2:Integer { return parseFloat('' + int1 + '.' + int2) }

Integer
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