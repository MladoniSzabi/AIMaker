grammar Language;

language_file: rest=language_file '\n' exp=expression   #More_Expressions
            | exp=expression                            #Last_Expression
            ;

expression: STRING                                      #String_Literal
        | BOOL                                          #Bool_Literal
        | INT                                           #Int_Literal
        | FLOAT                                         #Float_Literal
        | VAR                                           #Variable
        | lhs=expression '*' rhs=expression             #Multiplication
        | lhs=expression '/' rhs=expression             #Division
        | lhs=expression '+' rhs=expression             #Addition
        | lhs=expression '-' rhs=expression             #Subtraction
        | function=VAR'()'                              #Function_Call
        | <assoc=right> lhs=VAR'='rhs=expression        #Expression_Assignment
        ;


BOOL: [true] | [false];
STRING: '"' [a-zA-Z0-9_]+ '"';
VAR: [a-zA-Z][a-zA-Z0-9_]*;
INT: [0-9]+ ;
FLOAT: [0-9]*'.'[0-9]+;
WHITESPACE: [ \t\r]+ -> skip;
MULTILINE_COMMENT : '/*' .*? '*/' -> skip;
COMMENT : '//' .*? '\n' -> skip;
