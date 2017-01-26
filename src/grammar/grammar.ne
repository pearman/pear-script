
@builtin "whitespace.ne"
@builtin "number.ne"
@builtin "string.ne"
@builtin "postprocessors.ne"

Main -> _ Prog                  {% d => d[1] %}

Prog -> Statement:+    

Statement -> Block _            {% d => d[0] %}
        | Assignment _          {% d => d[0] %}
        | Chain _               {% d => d[0] %}

Block -> "(" _ Arg:* _ ")" _ "[" _ (Prog | null)  _ "]"    {% d => ({type: 'block', args: d[2], block: d[8]}) %}

Assignment -> Chain _ ":" _ Chain   {% d => ({ type: 'assignment', parent: d[0], child: d[4]}) %}

Chain -> Step                   {% d => d[0] %}
        | Step _ "." _ Chain    {% d => ({ type: 'chain', parent: d[0], child: d[4]})%}

Step -> Property _ "(" _ (Arg:+ | null) _ ")"  {% d => ({ type: 'method', method: d[0], args: d[4] }) %}
        | Atom                             {% d => d[0] %}
                  
Arg -> Atom _                   {% d => d[0] %}

Atom -> Property                {% d => ({ type: 'property',  value: d[0] }) %}
        | decimal               {% d => ({ type: 'number', value: d[0] }) %}
        | sqstring              {% d => ({ type: 'string', value: d[0] }) %}
        | dqstring              {% d => ({ type: 'string', value: d[0] }) %}

Property -> Label [0-9]:*       {% d => d[0] + d[1].join().replace(/,/g, '') %}
Label -> [a-zA-Z]:+             {% d => d[0].join().replace(/,/g, '') %}