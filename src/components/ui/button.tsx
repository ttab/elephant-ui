import * as React from 'react'
import { useRender } from '@base-ui/react/use-render'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import buttonVariants from './buttonVariants'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref): React.JSX.Element => {
    const computedClass = cn(buttonVariants({ variant, size, className }))
    return useRender({
      render: asChild && React.isValidElement(children) ? children : undefined,
      props: { className: computedClass, children, ...props } as Record<string, unknown>,
      ref,
      defaultTagName: 'button'
    })
  }
)
Button.displayName = 'Button'

export { Button }
