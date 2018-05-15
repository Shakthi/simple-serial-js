"use strict";
class Serializable {



	toJson() {

		function toJsonEntity(entity) {
			switch (typeof(entity)) {
				case 'number':
				case 'string':
				case 'boolean':
					return entity;


				case 'object':
					if (entity === null) {
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



		_serialize(this).forEach(function(argument) {
			data[argument] = toJsonEntity(this[argument]);
		}, this);

		return data;

	}


	fromJson(data,factoryIf) {

		function fromJsonEntity(self, entity) {
			switch (typeof(entity)) {
				case 'number':
				case 'string':
				case 'boolean':
					return entity;


				case 'object':
					if (entity === null) {
						return entity;

					} else if (Array.isArray(entity)) {
						return entity.map(function(argument) {
							return fromJsonEntity(self, argument);
						});
					} else if (entity) {

						if (entity.constructorName) {
							

							const outObject = Object.create(factoryIf[entity.constructorName].prototype);
							outObject.fromJson(entity.content,factoryIf);

							return outObject;
						} else {

							return entity;
						}

					}

			}

		}


		_serialize(this, data).forEach(function(argument) {
			this[argument] = fromJsonEntity(this, data[argument]);
		}, this);

	}


	serialize() {
		const ret = [];
		ret.add = function() {
			const args = Array.from(arguments);
			args.forEach(function(argument) {
				ret.push(argument);
			});
			return this;
		};
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

};


function _serialize(self, data) {
	var fields = self.serialize();
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