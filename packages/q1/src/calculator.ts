/* eslint-disable max-classes-per-file */

class Calculator {
  // Pattern for matching an integer with one or more digits.
  private static NUMBER_PATTERN = /[0-9]+/;

  // Matches parantheses, valid operators, integers, 'y =', or 'x'
  private static SYMBOL_PATTERN = /(y=|x|[0-9]+|\(|\)|\+|-|\*\/)/;

  /**
   * Trim whitespace and convert the expression string into array of tokens
   * @param expression the expression to lex
   * @returns array of valid tokens
   */
  public static lex(expression: string) {
    const allTokens = expression.replace(/\s/g, '').split(Calculator.SYMBOL_PATTERN);
    const filteredTokens = allTokens.filter((token) => token !== ' ' && token !== '');

    return filteredTokens;
  }

  /**
   * Converts infix notation to postfix (rpn) notation
   * @param tokens array of tokens in infix order
   * @returns array of tokens in postfix (rpn) order
   */
  private static toPostfix(tokens: string[]) {
    const precedence = {
      '*': 3,
      '/': 3,
      '+': 2,
      '-': 2,
      '(': 1,
    };
    const opstack = []; // operator stack
    let postfix = []; // final postfix array

    tokens.forEach((token) => {
      if (Calculator.NUMBER_PATTERN.test(token)) postfix = [...postfix, token];
      else if (token === '(') opstack.push(token);
      // Found a closed parantheses, keep popping stack until the open paranthese is found
      else if (token === ')') {
        let opToken = opstack.pop();
        while (opToken !== '(') {
          postfix.push(opToken);
          opToken = opstack.pop();
        }
      } else {
        // Push higher precedence operators onto postfix stack until operator stack is empty
        // or until the top of operator stack has lesser precedence than token
        while (opstack.length !== 0 && precedence[opstack[0]] >= precedence[token]) {
          postfix.push(opstack.pop());
        }
        opstack.push(token);
      }
    });

    while (opstack.length !== 0) {
      postfix.push(opstack.pop());
    }

    return postfix;
  }

  /**
   * Computes the operation from array of tokens in postfix order
   * @param postfix array of tokens in postfix order
   * @returns result of calculation
   */
  private static runCalculation(postfix: string[]) {
    const operandStack: number[] = [];
    postfix.forEach((token) => {
      if (Calculator.NUMBER_PATTERN.test(token)) operandStack.push(+token);
      else {
        const firstOp = operandStack.pop();
        const secondOp = operandStack.pop();
        if (token === '+') operandStack.push(firstOp + secondOp);
        if (token === '-') operandStack.push(secondOp - firstOp);
        if (token === '/') operandStack.push(secondOp / firstOp);
        if (token === '*') operandStack.push(firstOp * secondOp);
      }
    });
    return operandStack.reduce((prev, acc) => prev + acc, 0);
  }

  /**
   * Evalutate an expression in infix notation
   * @param expression the expression to evaluate
   * @returns result of expression
   */
  public static evaluate(expression: string) {
    const tokens = Calculator.lex(expression);
    const postfix = Calculator.toPostfix(tokens);
    return Calculator.runCalculation(postfix);
  }
}

export default Calculator;
