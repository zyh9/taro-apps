import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { add, minus, asyncAdd } from '../../actions/counter';

import './index.less';

@connect(
	({ counter }) => ({
		counter
	}),
	(dispatch) => ({
		add() {
			dispatch(add());
		},
		dec() {
			dispatch(minus());
		},
		asyncAdd() {
			dispatch(asyncAdd());
		}
	})
)
class Index extends Component {
	config = {
		navigationBarTitleText: '首页'
	};

	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}

	componentWillUnmount() {}

	componentDidShow() {}

	componentDidHide() {}

	openOther = _ => {
		Taro.navigateTo({
			url: '/pagesOther/other/index'
		});
	};

	render() {
		return (
			<View className="index">
				<Button className="add_btn" onClick={this.props.add}>
					+
				</Button>
				<Button className="dec_btn" onClick={this.props.dec}>
					-
				</Button>
				<Button className="dec_btn" onClick={this.props.asyncAdd}>
					async
				</Button>
				<View>
					<Text>redux的值：{this.props.counter.num}</Text>
				</View>
				<View>
					<Text onClick={this.openOther}>进入其它页面</Text>
				</View>
			</View>
		);
	}
}

export default Index;
