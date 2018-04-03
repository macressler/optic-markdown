
import {InvalidTransformationDefinition} from "../Errors";
import {extractAskCalls, extractFunction} from "../helpers/TransformationCode";

export class Transformation {

	constructor(yields, input, output, script, range) {
		this.yields = yields;
		this.input = input;
		this.output = output;
		this.ask = extractAskCalls(script).toJsonSchema();
		this.script = extractFunction(script, 'transform');
		this.range = range
	}


	errors() {
		const errors = []

		if (!this.yields) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define "yields"'))
		}

		if (!this.input) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define an "input"'))
		}

		if (!this.output) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define an "output"'))
		}


		if (this.script === null) {
			return errors.push(new InvalidTransformationDefinition(`Transformation code does not contain a valid Javascript Function named "transform"`))
		}

		if (!this.script) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define a script'))
		}

		return errors
	}

	isValid() {
		return !this.errors().length
	}
}