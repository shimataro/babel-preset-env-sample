/*! ES6文法をトランスパイル
 * import
 * class
 * let/const
 * デフォルト引数
 * アロー演算子
 * Promise
 * async/await
 */
import path from "path";

async function main()
{
	const pathname = "path/to/file.ext";
	console.log(`extention of "${pathname}" is "${path.extname(pathname)}"`);

	const testClass = new TestClass();
	for(let i = 0; i < 10; i++)
	{
		const val = await testClass.delay(i + 1);
		console.log(val);
	}
	console.log("END");
}

class TestClass
{
	constructor(sec = 1)
	{
		this._sec = sec;
	}

	delay(value)
	{
		return new Promise((resolve, reject) =>
		{
			setTimeout(() =>
			{
				resolve(value);
			}, this._sec * 1000);
		});
	}
}

main();
