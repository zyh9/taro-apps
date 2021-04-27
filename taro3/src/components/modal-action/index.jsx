import { Component } from "react";
import Taro from "@tarojs/taro";
import {
  View,
  Image,
  Text,
  Swiper,
  SwiperItem,
  Input,
  Button,
  Textarea,
  Picker,
  ScrollView,
  WebView
} from "@tarojs/components";
import classNames from "classnames";
import "./index.scss";

class Index extends Component {
  constructor(props) {
    super(props);
    const { isOpened } = props;

    this.state = {
      _isOpened: isOpened
    };
  }

  static defaultProps = {
    isOpened: false
  };

  static options = {
    addGlobalClass: true
  };

  componentWillReceiveProps(nextProps) {
    const { isOpened } = nextProps;
    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened
      });

      !isOpened && this.handleClose();
    }
  }
  //TODO 关闭弹窗
  handleClose() {
    if (typeof this.props.onClose === "function") {
      this.props.onClose();
    }
  }
  //TODO 扩展 => 底部取消
  handleCancel() {
    if (typeof this.props.onCancel === "function") {
      return this.props.onCancel();
    }
    this.close();
  }

  close() {
    this.setState(
      {
        _isOpened: false
      },
      this.handleClose
    );
  }

  render() {
    const { _isOpened } = this.state;

    const rootClass = classNames(
      "modal-action",
      {
        "modal-action--active": _isOpened
      },
      this.props.className
    );

    return (
      <View catchMove className={rootClass}>
        <View
          onClick={this.close.bind(this)}
          className="modal-action__overlay"
        />
        <View className="modal-action__container">{this.props.children}</View>
      </View>
    );
  }
}

export default Index;
