import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';

import './index.less';

class Other extends Component {
	config = {
		navigationBarTitleText: '其它'
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
				<Text>其它</Text>
			</View>
		);
	}
}

export default Other;
