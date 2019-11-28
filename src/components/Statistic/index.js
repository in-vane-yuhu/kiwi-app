import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';

import * as constant from '../../style/constant';
import styles, {screenHeight, screenWidth} from '../../style';

export default class Statistic extends Component {
  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    sign: PropTypes.oneOf(['plus', 'minus', 'none']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    sign: 'none',
  };

  renderColor = sign => {
    switch (sign) {
      case 'plus':
        return constant.text_green;
      case 'minus':
        return constant.text_red;
      case 'none':
        return constant.text_dark;

      default:
        return constant.text_dark;
    }
  };

  render() {
    const {title, value, sign, width} = this.props;
    return (
      <View style={{alignItems: 'center', width: width}}>
        <Text style={{fontSize: 12, color: constant.text_gray}}>{title}</Text>
        <Text
          style={{
            fontSize: 18,
            marginTop: 4,
            fontWeight: 'bold',
            color: this.renderColor(sign),
          }}>
          {value}
        </Text>
      </View>
    );
  }
}
