cd interpreter

java -jar ../venv/lib/antlr-4.10.1-complete.jar Language.g4 -no-visitor
javac Language*.java
java org.antlr.v4.gui.TestRig Language language_file -gui

rm *.java
rm *.class
