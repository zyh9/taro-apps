import Taro, { Component } from '@tarojs/taro';
import { View, Canvas, CoverView } from '@tarojs/components';
import WeCropper from 'we-cropper';
const device = Taro.getSystemInfoSync();
const devicePixelRatio = device.pixelRatio;
const windowWidth = device.windowWidth;
const windowHeight = device.windowHeight;

let cropper = {
	width: `${windowWidth}px`,
	height: `${windowHeight}px`
};

let target = {
	width: `${devicePixelRatio * windowWidth}px`,
	height: `${devicePixelRatio * windowHeight}px`
}

import './index.less';

class Upload extends Component {
	config = {
		navigationBarTitleText: '图片裁剪'
	};

	constructor() {
		super();
		this.state = {
			cropperOpt: {
				id: 'cropper',
				targetId: 'target',
				pixelRatio: devicePixelRatio,
				width: windowWidth,
				height: windowHeight,
				scale: 2.5,
				zoom: 8,
				cut: {
					x: (windowWidth - 300) / 2,
					y: (windowHeight - 300) / 2,
					width: 300,
					height: 300
				}
			},
			wecropper: null,
		};
	}

	componentDidMount() {
		let wecropperObj = new WeCropper(this.state.cropperOpt)
			.on('ready', (ctx) => {
				// console.log(`wecropper准备工作`)
			})
			.on('beforeImageLoad', (ctx) => {
				// console.log(`在图片加载之前，我可以做一些事情`)
				// console.log(`当前画布上下文:`, ctx)
				Taro.showToast({
					title: '上传中',
					icon: 'loading',
					duration: 20000
				});
			})
			.on('imageLoad', (ctx) => {
				// console.log(`图片加载...`)
				// console.log(`当前画布上下文:`, ctx)
				Taro.hideToast();
			})
			.on('beforeDraw', (ctx, instance) => {
				// console.log(`在画布画之前，我可以做点什么`)
				// console.log(`当前画布上下文:`, ctx)
			});
		this.setState({
			wecropper: wecropperObj
		});
	}

	touchStart(e) {
		this.state.wecropper.touchStart(e);
	}

	touchMove(e) {
		this.state.wecropper.touchMove(e);
	}

	touchEnd(e) {
		this.state.wecropper.touchEnd(e);
	}

	//上传图片
	uploadTap() {
		Taro.chooseImage({
			count: 1, // 默认9
			sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有  sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: res => {
				let src = res.tempFilePaths[0];
				// 获取裁剪图片资源后，给data添加src属性及其值
				this.state.wecropper.pushOrign(src);
			}
		});
	}

	//生成图片
	getCropperImage() {
		Taro.showLoading({
			title: '生成中',
		});
		// 通过then链式调用  参数v1.3.3支持
		// 参考链接 https://we-plugin.github.io/we-cropper/#/api?id=wecroppergetcropperimageoptcallback
		this.state.wecropper.getCropperImage({
			original: true, //是否使用原图模式（默认值 false）
			quality: 1, //图片的质量，目前仅对jpg有效。取值范围为 (0,1]，不在范围内时当作1.0处理
			fileType: String //目标文件的类型
		}).then(src => {
			console.log(src)
			return;
			Taro.uploadFile({
				url: util.baseUrl + 'ImageUpload', //上传图片接口
				filePath: tmpPath,
				name: 'ImageFile',
				formData: {
					//参数...
				},
				header: util.commonHeader(), //公共header
				success: res => {
					// console.log(res)
					let tempFilePaths = JSON.parse(res.data).Body.ImageUrl;
					// 存储返回图片链接
					Taro.setStorageSync('cutImg', tempFilePaths);
					setTimeout(_ => {
						Taro.hideLoading();
						Taro.navigateBack({
							delta: 1
						});
					}, 300)
				},
				fail: err => {
					console.log(err, 'fail')
				}
			})
		})
	}

	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }

	render() {
		return (
			<View className="upload">
				<Canvas
					className="canvas"
					canvas-id="cropper"
					disable-scroll="true"
					onTouchStart={this.touchStart}
					onTouchMove={this.touchMove}
					onTouchEnd={this.touchEnd}
					style={cropper}
				/>
				<Canvas
					className="target"
					canvas-id="target"
					style={target}
				/>
				<CoverView className="cropper-buttons">
					<CoverView className="uploadImg" onClick={this.uploadTap}>
						上传图片
					</CoverView>
					<CoverView className="getCropperImage" onClick={this.getCropperImage}>
						生成图片
					</CoverView>
				</CoverView>
			</View>
		);
	}
}

export default Upload;
