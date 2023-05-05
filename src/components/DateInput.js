import React, {Component} from 'react';
import {StyleSheet, TextInput, Animated, TouchableOpacity} from 'react-native';

import {COLORS, FONTFAMILY, SIZES} from '../constants';
import {Icon} from 'native-base';
import {TextInputMask} from 'react-native-masked-text';

export default class MaterialTextField extends Component {
  static defaultProps = {
    placeholder: '',
    value: '',
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      val: props.value ? props.value : '',
      maxHeight: 0,
      minHeight: 52,
      expanded: false,
      icon: 'eye',
      showText: true,
    };
  }

  _animatedIsFocused = new Animated.Value(this.props.value == '' ? 0 : 1);
  animation = new Animated.Value(0);

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this.validate);
    }
    this.animation.setValue(this.state.minHeight);
  }

  handleFocus = () => {
    this.animate(1);
  };
  handleBlur = () => this.animate(this.props.value ? 1 : 0);
  animate = toValue => {
    Animated.timing(this._animatedIsFocused, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.spring(this.animation, {
      toValue: this.state.expanded
        ? 18 + this.state.minHeight
        : this.state.minHeight,
      useNativeDriver: false,
    }).start();
  };
  labelStyle = {
    position: 'absolute',
    top: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -15],
    }),
    fontSize: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [SIZES.h18, SIZES.h16],
    }),
    color: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.grey, COLORS.primary],
    }),
  };

  borderColorStyle = {
    borderColor: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.grey, COLORS.primary],
    }),
  };

  borderStyle = {
    borderBottomWidth: 1,
  };

  focus = () => {
    this.textInput.focus();
  };

  setFocus = () => {
    this.textInput.focus();
  };

  render() {
    console.log('props ======> ', this.props.value);
    return (
      <Animated.View
        style={[
          {
            height: this.animation,
            marginVertical: SIZES.fifteen,
          },
        ]}>
        <Animated.View
          style={[this.borderColorStyle, styles.borderStyle, this.borderStyle]}>
          <Animated.Text
            style={[this.props.labelStyle, this.labelStyle]}
            numberOfLines={1}>
            {this.props.placeholder}
          </Animated.Text>

          <TextInputMask
            type={'datetime'}
            options={{
              format: 'YYYY/MM/DD',
            }}
            ref={ref => (this.textInput = ref)}
            style={[styles.txtInputStyle]}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={this.props.value}
            secureTextEntry={this.props.password ? this.state.showText : false}
            selectionColor={COLORS.primary}
            onChangeText={text => {
              this.props.onChangeText(text);
            }}
          />

          {/* <TextInput
            ref={ref => (this.textInput = ref)}
            style={[styles.txtInputStyle]}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={this.props.value}
            secureTextEntry={this.props.password ? this.state.showText : false}
            selectionColor={COLORS.primary}
            onChangeText={text => {
              this.props.onChangeText(text);
            }}
          /> */}

          {this.props.password ? (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                if (this.state.icon === 'eye') {
                  this.setState({icon: 'eye-slash', showText: false});
                } else {
                  this.setState({icon: 'eye', showText: true});
                }
              }}>
              <Icon
                name={'eye'}
                type={'FontAwesome'}
                style={{fontSize: SIZES.twenty, color: COLORS.primary}}
              />
            </TouchableOpacity>
          ) : null}
        </Animated.View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  txtInputStyle: {
    minHeight: 52,
    color: COLORS.black,

    alignSelf: 'stretch',
    flex: 1,
  },

  borderStyle: {
    borderRadius: 4,
    flexDirection: 'row',

    alignItems: 'center',
  },
});
