import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';

import './index.less';

class Cart extends Component {
	config = {
		navigationBarTitleText: '购物车'
	};

	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}

	componentWillUnmount() {}

	componentDidShow() {}

	componentDidHide() {}

	render() {
		return (
			<View className="index">
				<Text>购物车</Text>
			</View>
		);
	}
}

export default Cart;
