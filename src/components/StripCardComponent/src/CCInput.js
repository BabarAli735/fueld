import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
  Image,
} from 'react-native';
import EditText from '../../EditText';
import {COLORS, FONTFAMILY, FONTS, SIZES, STYLES} from '../../../constants';
import {Icon} from 'native-base';
import CreditCard from './CardView';
import defaultIcons from './Icons';

const s = StyleSheet.create({
  baseInputStyle: {
    color: 'black',
  },
});

export default class CCInput extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(['valid', 'invalid', 'incomplete']),

    containerStyle: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
    additionalInputProps: PropTypes.shape(TextInput.propTypes),
  };

  static defaultProps = {
    label: '',
    value: '',
    status: 'incomplete',
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => {},
    onChange: () => {},
    onBecomeEmpty: () => {},
    onBecomeValid: () => {},
    additionalInputProps: {},
  };

  componentWillReceiveProps = newProps => {
    const {status, value, onBecomeEmpty, onBecomeValid, field} = this.props;
    const {status: newStatus, value: newValue} = newProps;

    if (value !== '' && newValue === '') onBecomeEmpty(field);
    if (status !== 'valid' && newStatus === 'valid') onBecomeValid(field);
  };

  focus = () => this.refs.input.focus();

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = value => this.props.onChange(this.props.field, value);

  render() {
    const {
      label,
      value,
      placeholder,
      status,
      keyboardType,
      containerStyle,
      inputStyle,
      labelStyle,
      validColor,
      invalidColor,
      placeholderColor,
      additionalInputProps,
      customIcons,
    } = this.props;

    const Icons = {...defaultIcons, ...customIcons};
    return (
      <TouchableOpacity
        // style={STYLES.CardStyle}
        onPress={this.focus}
        activeOpacity={0.99}>
        {!!label && <Text style={[labelStyle]}>{label}</Text>}
        <View
          style={[
            STYLES.CardStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: SIZES.fifteen,
            },
          ]}>
          {label === 'CARD NUMBER' ? (
            <Image
              style={STYLES.CardImage}
              source={Icons[this.props.brand]}
              resizeMode="contain"
            />
          ) : null}
          <TextInput
            ref="input"
            {...additionalInputProps}
            keyboardType={keyboardType}
            autoCapitalise="words"
            autoCorrect={false}
            style={[
              FONTS.mediumFont12,
              {flex: 1, paddingLeft: SIZES.ten},
              // s.baseInputStyle,
              // inputStyle,
              validColor && status === 'valid'
                ? {color: COLORS.black}
                : invalidColor && status === 'invalid'
                ? {color: invalidColor}
                : {color: COLORS.black},
            ]}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={COLORS.brownGrey}
            placeholder={placeholder}
            value={value}
            onFocus={this._onFocus}
            onChangeText={this._onChange}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
