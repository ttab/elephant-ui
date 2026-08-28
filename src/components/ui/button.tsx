import * as React from 'react'
import { useRender } from '@base-ui/react/use-render'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import buttonVariants from './buttonVariants'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  render?: useRender.RenderProp
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, render, children, ...props }, ref): React.JSX.Element => {
    const computedClass = cn(buttonVariants({ variant, size, className }))
    return useRender({
      render,
      props: { className: computedClass, children, ...props } as Record<string, unknown>,
      ref,
      defaultTagName: 'button'
    })
  }
)
Button.displayName = 'Button'

export { Button }
