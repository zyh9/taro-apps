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
    isOpened: false,
    closeOnClickOverlay: true
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
    }
  }

  handleClickOverlay() {
    if (this.props.closeOnClickOverlay) {
      this.setState(
        {
          _isOpened: false
        },
        this.handleClose
      );
    }
  }

  handleClose() {
    if (typeof this.props.onClose === "function") {
      this.props.onClose();
    }
  }

  render() {
    const { _isOpened } = this.state;
    const rootClass = classNames(
      "modal",
      {
        "modal--active": _isOpened
      },
      this.props.className
    );

    return (
      <View catchMove className={rootClass}>
        <View
          className="modal__overlay"
          onClick={this.handleClickOverlay.bind(this)}
        />
        <View className="modal__container">{this.props.children}</View>
      </View>
    );
  }
}

export default Index;
