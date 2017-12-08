class Serializable {



	toJson() {

		function toJsonEntity(entity) {
			switch (typeof(entity)) {
				case 'number':
				case 'string':
				case 'boolean':
					return entity;


				case 'object':
					if (entity == null) {
						return entity;

					} else if (Array.isArray(entity)) {
						return entity.map(function(argument) {
							return toJsonEntity(argument);
						});

					} else if (entity) {
						const data = {
							constructorName: entity.constructor.name,
							content: entity.toJson()

						};
						return data;

					}

			}

		}

		const data = {};

		const self = this;


		_serialize(this).forEach(function(argument) {
			data[argument] = toJsonEntity(self[argument]);
		})

		return data;

	}


	fromJson(data) {

		function fromJsonEntity(self, entity) {
			switch (typeof(entity)) {
				case 'number':
				case 'string':
				case 'boolean':
					return entity;


				case 'object':
					if (entity == null) {
						return entity;

					} else if (Array.isArray(entity)) {
						return entity.map(function(argument) {
							return fromJsonEntity(self, argument);
						});
					} else if (entity) {
						if (entity.constructorName) {
							const factory = self.factory();
							const outObject = Object.create(factory[entity.constructorName].prototype);
							outObject.fromJson(entity.content);

							return outObject;
						} else {

							return entity;
						}



					}

			}

		}

		const self = this;
		_serialize(self,data).forEach(function(argument) {
			self[argument] = fromJsonEntity(self, data[argument]);
		})

	}


	serialize() {
		const ret = [];
		ret.add = function() {
			const args = Array.from(arguments);
			args.forEach(function(argument) {
				ret.push(argument);
			})
			return this;
		}
		return ret;
	}

	factory() {

		const ret = {};
		ret.add = function() {
			const args = Array.from(arguments);
			args.forEach(function(argument) {
				ret[argument.prototype.constructor.name] = argument;
			})
			return this;
		}
		return ret;
	}



}

Serializable.mixin = function(object) {

	Object.defineProperty(object, 'factory', {
		value: Serializable.prototype.factory,
		writable: true,
		enumerable: false,
		configurable: true
	});

	Object.defineProperty(object, 'serialize', {
		value: Serializable.prototype.serialize,
		writable: true,
		enumerable: false,
		configurable: true
	});


	Object.defineProperty(object, 'fromJson', {
		value: Serializable.prototype.fromJson,
		writable: true,
		enumerable: false,
		configurable: true
	});

	Object.defineProperty(object, 'toJson', {
		value: Serializable.prototype.toJson,
		writable: true,
		enumerable: false,
		configurable: true
	});

}


function _serialize (self, data) {
	var fields = self.serialize()
	if (!fields) {
		return [];
	}

	if (!fields.length) {

		if (data === undefined) {
			data = self;
		}

		for (var prop in data) {
			fields.push(prop);
		}
	}

	return fields;

}


module.exports = Serializable;
