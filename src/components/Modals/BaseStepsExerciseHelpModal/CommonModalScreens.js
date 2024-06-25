/* Las imagenes referenciadas deben agregarse al directorio math-learning-frontend/src/images */

export const MULTIPLY_SYMBOL_REQUIRED = {
    topText: "En los ejercicios debes escribir explícitamente los productos utilizando el símbolo de multiplicación \"*\" que se verá como un \"⋅\"",
        bottomText: "Nota: No es necesario para cuando multiplicamos escalares y variables (ej: \"3x\" es válido, no es necesario escribir \"3*x\")",
    image: "product-symbol.png"
}

export const INTERVAL_WITH_COMMA = {
    topText: "Cuando ingreses un intervalo en la plataforma, debés separar los extremos con coma \",\" en lugar de punto y coma \";\"",
    bottomText: "Por ejemplo, si querés ingresar el intervalo [1;3] en la plataforma debes escribirlo como [1,3]",
    image: "interval-with-comma.png"
}


export const FRACTION_WRITING =   {
    topText: "Si necesitas escribir una fracción, podes primero escribir el numerador, seleccionarlo con el mouse, y finalizar marcando la barra con tu teclado con la combinación de teclas Shift+7",
    bottomText: "Como alternativa también podes primero escribir el símbolo de dividir \"/\" para luego escribir el numerador y denominador dentro de la fracción creada",
    image: "numerators-fraction.png"
}

export const AND_OR_FOR_INEQUATIONS =   {
    topText: "La plataforma no admite la combinación de distintos operadores lógicos sin separarlos entre corchetes",
    bottomText: "Si debes escribir una \\\/ y una \/\\ debes separar por corchetes a la expresión [x<1 \\\/ x>5] \/\\ [x-2<2 \\\/ x>0] ",
    image: "inequality-and-or.png"
}

export const INEQUALITY_EXPLANATION =   {
    topText: "Para estos ejercicios debes resolver las inecuaciones paso a paso hasta llegar a un intervalo o a una unión de intervalos",
    bottomText: "Vas a encontrar los simbolos necesarios en la tabla de la izquierda para expresar uniones de intervalos y los intervalos abiertos y cerrados",
    image: "explanation-inequality.png"
}

export const TRIANGLE_EXPLANATION =   {
    topText: "Para resolver el triángulo debes ingresar todos los valores de sus lados y angulos faltantes",
    bottomText: "Al finalizar debés ingresar el area del mismo para poder entregar el ejercicio, recordá usar punto decimal \".\" en lugar de coma \",\" para los decimales (ej: 251.03)",
    image: "triangle-solved.png"
}

export const DOMAIN_EXPLANATION =   {
    topText: "En estos ejercicios debemos paso a paso analizar el dominio de la funcion hasta llevarlo a un intervalo o unión de intervalos",
    bottomText: "Si detectás mas de un limitante, podes escribir el dominio como una interseccion de dominios como en este ejemplo provisto",
    image: "domain-explanation.png"
}

export const INTERVAL_REAL_EXCEPTION =   {
    topText: "En caso de que el intervalo a representar sea la recta real con excepciones finitas, puede escribirse tanto como un conjunto de uniones o como el conjunto real menos las excepciones",
    bottomText: "Ambas representaciones son válidas para la plataforma",
    image: "interval-representation.png"
}

export const EXPONENTIAL_EXPLANATION =   {
    topText: "En estos ejercicios debemos ir resolviendo paso a paso la ecuación exponencial o logarítmica hasta llegar a los valores de x posibles.",
    bottomText: "Tener en cuenta que si hay más de un valor de x posible, se deben colocar todos separados por operadores OR.",
    image: "exercise_ln.png"
}

export const FACTOR_EXPLANATION =   {
    topText: "En estos ejercicios debemos ir factorizando paso a paso hasta llegar a la mínima expresión posible.",
    bottomText: "En este caso observamos un ejemplo de una diferencia de cuadrados.",
    image: "factor-exercise.png"
}

export const IMAGE_EXPLANATION = {
    topText: "En estos ejercicios debes escribir el conjunto imagen de la función del enunciado",
    bottomText: "El resultado final será un intervalo",
    image: "helpImage.png"
}

export const INTERSECTION_EXPLANATION_BASIC = {
    topText: "Para hallar la intersección debes resolver paso a paso la ecuación",
    bottomText: "El resultado final serán las soluciones a dicha ecuación",
    image: "helpIntersection.png"
}

export const INTERSECTION_RESULT_FORMAT = {
    topText: "El resultado puede ser ninguna solución, una única solucion, un conjunto finito de soluciones o un intervalo de soluciones como en los siguientes ejemplos",
    bottomText: "Usa el formato de respuesta apropiado según el caso a resolver",
    image: "helpResponsesIntersection.png"
}



export const getScreensForExercise = (exerciseType) => {
    if (exerciseType === 'domain') {
        return [DOMAIN_EXPLANATION, INTERVAL_WITH_COMMA, INTERVAL_REAL_EXCEPTION, FRACTION_WRITING, MULTIPLY_SYMBOL_REQUIRED]
    } else if (exerciseType === 'inequality') {
        return [INEQUALITY_EXPLANATION, AND_OR_FOR_INEQUATIONS, INTERVAL_WITH_COMMA, MULTIPLY_SYMBOL_REQUIRED]
    } else if (exerciseType === "intersection") {
        return [INTERSECTION_EXPLANATION_BASIC, INTERSECTION_RESULT_FORMAT, INTERVAL_WITH_COMMA, FRACTION_WRITING, MULTIPLY_SYMBOL_REQUIRED] // TODO ADD SPECIFIC EXPLANATION
    } else if (exerciseType === "exponential") {
        return [EXPONENTIAL_EXPLANATION, FRACTION_WRITING, MULTIPLY_SYMBOL_REQUIRED]
    } else if (exerciseType === "factorisable") {
        return [FACTOR_EXPLANATION, MULTIPLY_SYMBOL_REQUIRED, FRACTION_WRITING]
    } else if (exerciseType === 'image') {
        return [IMAGE_EXPLANATION, INTERVAL_WITH_COMMA, FRACTION_WRITING, MULTIPLY_SYMBOL_REQUIRED]
    } else if (exerciseType === 'trigonometry') {
        return [TRIANGLE_EXPLANATION]
    } else {
        return [FRACTION_WRITING]
    }
}