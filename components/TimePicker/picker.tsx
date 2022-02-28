import React, { useContext, useRef, useState, ReactElement } from 'react';
import { Dayjs } from 'dayjs';
import Trigger from '../Trigger';
import { PickerProps, CalendarValue } from './interface';
import { isArray, isDayjs } from '../_util/is';
import { ConfigContext } from '../ConfigProvider';
import {
  getDayjsValue,
  getSortedDayjsArray,
  isDayjsArrayChange,
  isDayjsChange,
  isValidTimeString,
  toLocal,
} from '../_util/dayjs';
import IconClockCircle from '../../icon/react-icon/IconClockCircle';
import Input from '../_class/picker/input';
import InputRange from '../_class/picker/input-range';
import useMergeProps from '../_util/hooks/useMergeProps';
import PickerContext from './context';

function getFormat(props) {
  return props.format || 'HH:mm:ss';
}

interface InnerPickerProps extends PickerProps {
  defaultValue?: CalendarValue | CalendarValue[];
  value?: CalendarValue | CalendarValue[];
  onSelect?: (value: string | string[], dayjsValue: Dayjs | Dayjs[]) => void;
  onChange?: (value: string | string[], dayjsValue: Dayjs | Dayjs[]) => void;
  isRangePicker?: boolean;
  picker?: ReactElement;
  hideFooter?: boolean;
  order?: boolean;
}

const defaultProps: InnerPickerProps = {
  allowClear: true,
  position: 'bl',
  format: 'HH:mm:ss',
  editable: true,
  order: true,
  scrollSticky: true,
};

const Picker = (baseProps: InnerPickerProps) => {
  const { locale, getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<InnerPickerProps>(
    baseProps,
    defaultProps,
    componentConfig?.TimePicker
  );
  const {
    allowClear = true,
    className,
    disableConfirm,
    style,
    placeholder,
    getPopupContainer,
    disabled,
    position,
    isRangePicker,
    picker,
    error,
    triggerProps,
    value: propsValue,
    onChange,
    icons,
    size,
    editable,
    unmountOnExit,
    order,
    utcOffset,
  } = props;

  const format = getFormat(props);

  const prefixCls = getPrefixCls('timepicker');

  function getDefaultValue() {
    let value;
    if (props.value) {
      value = getDayjsValue(props.value, format, utcOffset);
    } else if (props.defaultValue) {
      value = getDayjsValue(props.defaultValue, format, utcOffset);
    }
    return value;
  }

  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [value, setValue] = useState<Dayjs | Dayjs[]>(getDefaultValue());
  const [valueShow, setValueShow] = useState<Dayjs | Dayjs[]>();
  const [inputValue, setInputValue] = useState<string>();
  const [focusedInputIndex, setFocusedInputIndex] = useState<number>(0);

  // controlled mode / uncontrolled mode
  const mergedValue = 'value' in props ? getDayjsValue(propsValue, format, utcOffset) : value;
  const mergedPopupVisible = 'popupVisible' in props ? props.popupVisible : popupVisible;

  const refInput = useRef(null);

  function focusInput(index?: number) {
    refInput.current && refInput.current.focus && refInput.current.focus(index);
  }

  function changeFocusedInputIndex(index: number) {
    setFocusedInputIndex(index);
    setTimeout(() => focusInput(index));
  }

  function onVisibleChange(visible) {
    if (visible) {
      setOpen(visible, () => {
        setTimeout(() => focusInput());
      });
    } else {
      setOpen(false);
    }
  }

  function setOpen(visible, callback?: () => void) {
    setPopupVisible(visible);
    setInputValue(undefined);
    callback && callback();
    if (!visible) {
      setValueShow(undefined);
    }
  }

  function onConfirmValue(vs: Dayjs | Dayjs[]) {
    const newValue = isRangePicker && order ? getSortedDayjsArray(vs as Dayjs[]) : vs;
    setValue(newValue);
    setValueShow(undefined);
    setInputValue(undefined);

    onHandleChange(newValue);

    if (!disableConfirm) {
      setOpen(false);
    }
  }

  function onHandleChange(vs: Dayjs | Dayjs[]) {
    if (isArray(vs) && isDayjsArrayChange(mergedValue as Dayjs[], vs)) {
      onChange &&
        onChange(
          vs.map((t) => toLocal(t, utcOffset).format(format)),
          vs.map((t) => toLocal(t, utcOffset))
        );
    }
    if (isDayjs(vs) && isDayjsChange(mergedValue as Dayjs, vs)) {
      onChange && onChange(toLocal(vs, utcOffset).format(format), toLocal(vs, utcOffset));
    }
  }

  function renderPopup() {
    const vs = isRangePicker
      ? isArray(valueShow) && valueShow.length
        ? valueShow
        : mergedValue
      : valueShow || mergedValue;

    return (
      <div className={`${prefixCls}-container`} onClick={() => focusInput()}>
        {React.cloneElement(picker as ReactElement, {
          ...props,
          format,
          inputValue,
          setInputValue,
          onConfirmValue,
          setValueShow,
          valueShow: vs,
          value: mergedValue,
          popupVisible: mergedPopupVisible,
          focusedInputIndex,
          changeFocusedInputIndex,
        })}
      </div>
    );
  }

  function onChangeInput(e) {
    const newInputValue = e.target.value;
    if (!popupVisible) {
      setPopupVisible(true);
    }
    setInputValue(newInputValue);
    confirmInputValue(newInputValue);
  }

  function confirmInputValue(newInputValue?: string) {
    const newInputDayjs = getDayjsValue(newInputValue, format) as Dayjs;
    if (isRangePicker) {
      const newValueShow = [...(isArray(valueShow) ? valueShow : (value as Dayjs[]) || [])];
      if (isValidTimeString(newInputValue, format)) {
        newValueShow[focusedInputIndex] = newInputDayjs;
        setValueShow(newValueShow);
        setInputValue(undefined);
      }
    } else if (isValidTimeString(newInputValue, format)) {
      setValueShow(newInputDayjs);
      setInputValue(undefined);
    }
  }

  function onPressEnter() {
    if (isRangePicker) {
      if (isArray(valueShow) && valueShow.length) {
        if (inputValue && !isValidTimeString(inputValue, format)) {
          setOpen(false);
        } else if (valueShow[0] === undefined || valueShow[1] === undefined) {
          changeFocusedInputIndex(focusedInputIndex === 0 ? 1 : 0);
        } else if (valueShow.length === 2) {
          onConfirmValue(valueShow);
        }
      } else {
        setOpen(false);
      }
    } else {
      onConfirmValue(valueShow || mergedValue);
    }
  }

  function onPressTab(e) {
    e.preventDefault();
  }

  function onClear(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    onConfirmValue(undefined);
    onChange && onChange(undefined, undefined);
    props.onClear && props.onClear();
  }

  const rangePickerPlaceholder =
    isRangePicker && isArray(placeholder) ? placeholder : locale.TimePicker.placeholders;
  const inputPlaceHolder = placeholder || locale.TimePicker.placeholder;

  const suffixIcon = (icons && icons.inputSuffix) || <IconClockCircle />;

  const baseInputProps = {
    style,
    className,
    popupVisible: mergedPopupVisible,
    format,
    disabled,
    error,
    size,
    onPressEnter,
    onClear,
    suffixIcon,
    editable,
    allowClear,
  };

  return (
    <PickerContext.Provider value={{ utcOffset }}>
      <Trigger
        popup={() => renderPopup()}
        trigger="click"
        clickToClose={false}
        position={position}
        disabled={disabled}
        popupAlign={{ bottom: 4 }}
        getPopupContainer={getPopupContainer}
        onVisibleChange={onVisibleChange}
        popupVisible={mergedPopupVisible}
        classNames="slideDynamicOrigin"
        unmountOnExit={!!unmountOnExit}
        {...triggerProps}
      >
        {isRangePicker ? (
          <InputRange
            {...baseInputProps}
            ref={refInput}
            placeholder={rangePickerPlaceholder as string[]}
            value={(isArray(valueShow) && valueShow.length ? valueShow : mergedValue) as Dayjs[]}
            onChange={onChangeInput}
            inputValue={inputValue}
            changeFocusedInputIndex={changeFocusedInputIndex}
            focusedInputIndex={focusedInputIndex}
            onPressTab={onPressTab}
          />
        ) : (
          <Input
            {...baseInputProps}
            ref={refInput}
            placeholder={inputPlaceHolder}
            value={(valueShow || mergedValue) as Dayjs}
            inputValue={inputValue as string}
            onChange={onChangeInput}
          />
        )}
      </Trigger>
    </PickerContext.Provider>
  );
};

export default Picker;
