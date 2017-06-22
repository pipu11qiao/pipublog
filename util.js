//-->> Created by pipu on 2017/6/22.
exports.md5 =   function (input) {
	return require('crypto').createHash('md5').update('1').update(input).digest('hex');// 以16进制表示输出值
}