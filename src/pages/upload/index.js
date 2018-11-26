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
			srcUrl: '',
			targetCtx: null
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
			})
			.updateCanvas();
		this.setState({
			wecropper: wecropperObj,
			targetCtx: wx.createCanvasContext('target')
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
				this.setState({
					srcUrl: res.tempFilePaths[0]
				})
				// const src = res.tempFilePaths[0];
				// 获取裁剪图片资源后，给data添加src属性及其值
				// this.state.wecropper.pushOrign(src);
			}
		});
	}

	//生成图片
	getCropperImage() {
		Taro.showToast({
			title: '生成中',
			icon: 'loading',
			mask: true
		});
		let {
			imgLeft,
			imgTop,
			scaleWidth,
			scaleHeight
		} = this.state.wecropper; // 获取图片在原画布坐标位置及宽高
		let {
			x,
			y,
			width,
			height
		} = this.state.wecropper.cut; // 获取裁剪框位置及大小
		// 所有参数乘设备像素比
		imgLeft = imgLeft * devicePixelRatio;
		imgTop = imgTop * devicePixelRatio;
		scaleWidth = scaleWidth * devicePixelRatio;
		scaleHeight = scaleHeight * devicePixelRatio;
		x = x * devicePixelRatio;
		y = y * devicePixelRatio;
		width = width * devicePixelRatio;
		height = height * devicePixelRatio;
		// 这里是目标canvas画布的id值
		console.log(this.state.srcUrl, imgLeft, imgTop, scaleWidth, scaleHeight, x, y, width, height)
		this.state.targetCtx.drawImage(this.state.srcUrl, imgLeft, imgTop, scaleWidth, scaleHeight) // 第一个参数代表被裁剪图片的临时路径
		this.state.targetCtx.draw();
		setTimeout(_ => {
			wx.canvasToTempFilePath({
				canvasId: 'target',
				x,
				y,
				width,
				height,
				success: res => {
					const tmpPath = res.tempFilePath;
					if (tmpPath) {
						wx.uploadFile({
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
								wx.setStorageSync('cutImg', tempFilePaths);
								setTimeout(_ => {
									wx.hideToast()
									wx.navigateBack({
										delta: 1
									});
								}, 300)
							},
							fail: err => {
								console.log(err, 'fail')
							}
						})
					} else {
						console.log('获取图片地址失败，请稍后重试')
					}
				}
			})
		}, 200)
		// this.state.wecropper.getCropperImage((src) => {
		// 	if (src) {
		// 		console.log(src);
		// 		Taro.uploadFile({
		// 			url: util.baseUrl + 'ImageUpload', //上传图片接口
		// 			filePath: src,
		// 			name: 'ImageFile',
		// 			formData: {
		// 				//参数...
		// 			},
		// 			header: util.commonHeader(), //公共header
		// 			success: (res) => {
		// 				// console.log(res)
		// 				let tempFilePaths = JSON.parse(res.data).Body.ImageUrl;
		// 				Taro.setStorageSync('cutImg', tempFilePaths);
		// 				setTimeout(_ => {
		// 					Taro.hideToast();
		// 					Taro.navigateBack({
		// 						delta: 1
		// 					});
		// 				}, 300);
		// 			},
		// 			fail: (err) => {
		// 				console.log(err, 'fail');
		// 			}
		// 		});
		// 	} else {
		// 		console.log('获取图片地址失败，请稍后重试');
		// 	}
		// });
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
