// Webpack loader to remove function code from the client bundle

/**
 * 
 * @param {number} firstBracketIndex 
 * @param {string} fnLine 
 * @param {Array<string>} cuttedLines 
 */
function braketRemoving(fnLine, cuttedLines) {
  const indentation = fnLine.length - fnLine.trim().length
  const fnEndIndex = cuttedLines.findIndex((line) => {
    const lIndentation = line.length - line.trim().length
    if (line.trim().startsWith("}") && lIndentation === indentation)
      return true
  })
  cuttedLines.splice(0, fnEndIndex + 1)
}

/**
 * 
 * @param {string} file 
 * @param {string} fnName 
 */
function removeFunctionFromString(file, fnName) {

  const lines = file.split("\n")

  // Get first line of function
  const fnIndex = lines.findIndex(line => {
    if (line.includes(fnName) && line.match(/async|function|=>/)) {
      return true
    }
  })

  const cuttedLines = lines.slice(fnIndex)
  const fnLine = lines[fnIndex]

  // get last line of function

  // For arrow functions
  if (fnLine && fnLine.includes("=>")) {
    const [_, ...afterArrow] = fnLine.split("=>")
    const arrowLine = afterArrow.join("=>")
    let trimmedArrowLine = arrowLine.trim()
    if (trimmedArrowLine.startsWith("{"))
      braketRemoving(fnLine, cuttedLines)

    // If it's a one line function or a function with no brackets
    if (trimmedArrowLine.startsWith("(")) {
      // get the last bracket
      let openBracketCount = 0
      let closeBracketCount = 0
      let linesToCut = 1

      for (const line of cuttedLines.slice(1)) {
        let endOfFunction = false
        for (const char of trimmedArrowLine) {
          if (char === "(") openBracketCount++
          if (char === ")") {
            closeBracketCount++
            if (openBracketCount === closeBracketCount) {
              endOfFunction = true
              break
            }
          }
        }
        if (endOfFunction) break
        trimmedArrowLine = line
        linesToCut++
      }
      cuttedLines.splice(0, linesToCut)
    }
  }

  // For normal function
  if (fnLine && fnLine.includes("function")) {
    const fnKeywordIndex = fnLine.indexOf("function")
    const firstBracketIndex = fnLine.indexOf("{", fnKeywordIndex)
    if (firstBracketIndex !== -1)
      braketRemoving(fnLine, cuttedLines)
  }


  return lines.slice(0, fnIndex).concat(cuttedLines).join("\n")
}


function getOptions(loaderContext) {
	const query = loaderContext.query;
	if(typeof query === "string") {
		return parseQuery(loaderContext.query);
	}
	return query;
}

module.exports = function RemoveFunctionLoader(content = "", ...args) {
  const options = getOptions(this)
  let output = content
  for (const fnName of options.excludedFunctions)
    output = removeFunctionFromString(output, fnName)

  console.log(output)

  return output
}