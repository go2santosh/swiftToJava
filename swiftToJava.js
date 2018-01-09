function convertSwiftToJava(swiftCode) {
	
    var swiftLines = swiftCode.split("\n");
    var javaLines = [];
    for (i = 0; i < swiftLines.length; i++) {
    	var swiftLine = swiftLines[i].trim();
        var javaLine;
    	if (swiftLine.startsWith("static let ")) {
        	javaLine = convertSwiftConstantDeclarationToJava(swiftLine);
        }
        else {
        	javaLine = "//TODO: ".concat(swiftLine);
        }
        javaLine = addSemicollonIfMissing(javaLine);
        javaLines.push(javaLine);
    }
    return javaCode = javaLines.join("\n");
}

function convertSwiftConstantDeclarationToJava(swiftStatement) {
	
    var remainingSwiftStatement = swiftStatement;
    var javaStatement = "";
    
    if (remainingSwiftStatement.startsWith("static let ")) {
    	javaStatement = "private static final String ";
        remainingSwiftStatement = remainingSwiftStatement.substring("static let ".length);
    }
    
    var variableNameAndValue = remainingSwiftStatement.split("=");
    var variableName = variableNameAndValue[0];
    var variableValue = variableNameAndValue[1];
    
    javaStatement = javaStatement.concat(variableName);
    javaStatement = javaStatement.concat(" = ").concat(variableName);
    
    return javaStatement;
}

function addSemicollonIfMissing(text) {

    var updatedStatement = text;
    if (updatedStatement.slice(-1) != ';') {
    	updatedStatement = updatedStatement.concat(";");
    }
    return updatedStatement;
}
