babel-preset-env sample
===

[babel-preset-env](https://github.com/babel/babel-preset-env)のつかいかたサンプル

## ビルド
```bash
$ npm update
$ npm run build
```

[`original.es6`](./original.es6) をNode.js用、ブラウザ用にトランスパイルしたものが `dist` 以下にできる
（それぞれ `server.js`, `client.js`）

* サーバ用は `node dist/server.js` で確認
* クライアント用は [`test.html`](./test.html) をブラウザに食わせて確認
* 対応バージョンを変える場合は [`gulpfile.js`](./gulpfile.js) の最初の方にあるオプションをいじる
