import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonContainer, ButtonVariant } from './index.styles'

type ButtonProps = {
  variant?: ButtonVariant
  children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = 'primary',
  ...btnProps
}: ButtonProps) {
  return (
    <ButtonContainer {...btnProps} variant={variant}>
      {children}
    </ButtonContainer>
  )
}
