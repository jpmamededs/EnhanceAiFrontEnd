'use client';

import React from 'react';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { PrimitiveIcon, UIIcon } from '@gluestack-ui/core/icon/creator';
import {
  withStyleContext,
  useStyleContext,
} from '@gluestack-ui/utils/nativewind-utils';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { createSelect } from '@gluestack-ui/core/select/creator';
import { cssInterop } from 'nativewind';
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetScrollView,
  ActionsheetVirtualizedList,
  ActionsheetFlatList,
  ActionsheetSectionList,
  ActionsheetSectionHeaderText,
} from './select-actionsheet';
import { Pressable, View, TextInput } from 'react-native';

const SelectTriggerWrapper = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable>
>(function SelectTriggerWrapper({ ...props }, ref) {
  return <Pressable {...props} ref={ref} />;
});

const selectIconStyle = tva({
  base: '',
});

const selectStyle = tva({
  base: '',
});

const selectTriggerStyle = tva({
  base: '',
});

const selectInputStyle = tva({
  base: '',
});

const UISelect = createSelect(
  {
    Root: View,
    Trigger: withStyleContext(SelectTriggerWrapper),
    Input: TextInput,
    Icon: UIIcon,
  },
  {
    Portal: Actionsheet,
    Backdrop: ActionsheetBackdrop,
    Content: ActionsheetContent,
    DragIndicator: ActionsheetDragIndicator,
    DragIndicatorWrapper: ActionsheetDragIndicatorWrapper,
    Item: ActionsheetItem,
    ItemText: ActionsheetItemText,
    ScrollView: ActionsheetScrollView,
    VirtualizedList: ActionsheetVirtualizedList,
    FlatList: ActionsheetFlatList,
    SectionList: ActionsheetSectionList,
    SectionHeaderText: ActionsheetSectionHeaderText,
  }
);

cssInterop(UISelect, { className: 'style' });
cssInterop(UISelect.Input, {
  className: { target: 'style', nativeStyleToProp: { textAlign: true } },
});
cssInterop(SelectTriggerWrapper, { className: 'style' });

cssInterop(PrimitiveIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
});

type ISelectProps = VariantProps<typeof selectStyle> &
  React.ComponentProps<typeof UISelect> & { className?: string };

const Select = React.forwardRef<
  React.ComponentRef<typeof UISelect>,
  ISelectProps
>(function Select({ className, ...props }, ref) {
  return (
    <UISelect
      className={selectStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  );
});

type ISelectTriggerProps = VariantProps<typeof selectTriggerStyle> &
  React.ComponentProps<typeof UISelect.Trigger> & { className?: string };

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof UISelect.Trigger>,
  ISelectTriggerProps
>(function SelectTrigger(
  { className, ...props },
  ref
) {
  return (
    <UISelect.Trigger
      className={selectTriggerStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  );
});

type ISelectInputProps = VariantProps<typeof selectInputStyle> &
  React.ComponentProps<typeof UISelect.Input> & { className?: string };

const SelectInput = React.forwardRef<
  React.ComponentRef<typeof UISelect.Input>,
  ISelectInputProps
>(function SelectInput({ className, ...props }, ref) {
  return (
    <UISelect.Input
      className={selectInputStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  );
});

type ISelectIcon = VariantProps<typeof selectIconStyle> &
  React.ComponentProps<typeof UISelect.Icon> & { className?: string };

const SelectIcon = React.forwardRef<
  React.ComponentRef<typeof UISelect.Icon>,
  ISelectIcon
>(function SelectIcon({ className, ...props }, ref) {
  return (
    <UISelect.Icon
      className={selectIconStyle({ class: className })}
      ref={ref}
      {...props}
    />
  );
});

Select.displayName = 'Select';
SelectTrigger.displayName = 'SelectTrigger';
SelectInput.displayName = 'SelectInput';
SelectIcon.displayName = 'SelectIcon';

// Actionsheet Components
const SelectPortal = UISelect.Portal;
const SelectBackdrop = UISelect.Backdrop;
const SelectContent = UISelect.Content;
const SelectDragIndicator = UISelect.DragIndicator;
const SelectDragIndicatorWrapper = UISelect.DragIndicatorWrapper;
const SelectItem = UISelect.Item;
const SelectScrollView = UISelect.ScrollView;
const SelectVirtualizedList = UISelect.VirtualizedList;
const SelectFlatList = UISelect.FlatList;
const SelectSectionList = UISelect.SectionList;
const SelectSectionHeaderText = UISelect.SectionHeaderText;

export {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectScrollView,
  SelectVirtualizedList,
  SelectFlatList,
  SelectSectionList,
  SelectSectionHeaderText,
};
