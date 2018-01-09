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
	
    var success = true;
    var javaStatement;
    
    if (swiftStatement.startsWith("static let ")) {
    
        var remainingSwiftStatement = swiftStatement;
        var javaDeclarationStart;

    	javaDeclarationStart = "private static final";
        remainingSwiftStatement = remainingSwiftStatement.substring("static let ".length);
        
        var variableNameAndValue = remainingSwiftStatement.split("=");
        var variableNameAndType = variableNameAndValue[0].split(":");
        var variableName = variableNameAndType[0].trim();
        var variableValue = variableNameAndValue[1].trim();
        var variableSwiftType = "";
        if (variableNameAndType.length > 1) {
        	variableSwiftType = variableNameAndType[1].trim();
        }
        else {
        	if (variableValue.startsWith("\"")) {
            	variableSwiftType = "String";
            }
            else {
            	success = false;
            }
        }
        
        javaStatement = javaDeclarationStart
          .concat(" ")
          .concat(variableSwiftType)
          .concat(" ")
          .concat(variableName)
          .concat(" = ")
          .concat(variableValue);
    }
    else {
    	success = false;
    }
    
    if (success) {
    	return javaStatement;
    }
    else {
    	return "//TODO: ".concat(swiftStatement);
    }
}

function addSemicollonIfMissing(text) {

    var updatedStatement = text;
    if (updatedStatement.slice(-1) != ';') {
    	updatedStatement = updatedStatement.concat(";");
    }
    return updatedStatement;
}
