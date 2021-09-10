import { ChangeEvent, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export enum BtnSize {
  largeBtn = "largeBtn"
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string,
  onClick?: () => void,
  size?: BtnSize,
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  type?: string,
  name?: string
}