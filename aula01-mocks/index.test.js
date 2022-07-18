const { error } = require('./src/constants')
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
	{	
		const filePath = './mocks/emptyFile-invalid.csv';
		const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE);
		const result = File.csvJson(filePath);
		await rejects(result, rejection)
	}
	{
		const filePath = './mocks/fourItems-invalid.csv';
		const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
		const result = File.csvJson(filePath);
		await rejects(result, rejection);
	}
	{
		const filePath = './mocks/threeItems-valid.csv';
		const result = await File.csvJson(filePath);
		const expected = [
			{
				"id": 1,
				"name": "walter",
				"profession": "js",
				"age": 2002
			},
			{
				"id": 2,
				"name": "joao",
				"profession": "php",
				"age": 1992
			},
			{
				"id": 3,
				"name": "maria",
				"profession": "java",
				"age": 1997
			}
		];

		deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
	}
})();
