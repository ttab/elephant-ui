import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindAnimate from 'tailwindcss-animate'

const fontFamily = defaultTheme.fontFamily

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      fhd: '1920px',
      qhd: '2560px',
      uhd: '3840px'
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1536px',
        fhd: '1920px',
        qhd: '2560px',
        uhd: '3840px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['inter', ...fontFamily.sans]
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        accent2: {
          DEFAULT: 'hsl(var(--accent2))',
          foreground: 'hsl(var(--accent2-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        table: {
          DEFAULT: 'hsl(var(--table-bg))',
          focused: 'hsl(var(--table-bg-focused))',
          selected: 'hsl(var(--table-bg-selected))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      boxShadow: {
        '3xl': `0 -1px 0px hsl(0deg 0% 0% / 0.075),
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075),
            0 5px 10px 30px  hsl(0deg 0% 0% / 0.015)`
      },
      borderColor: {
        gray: {
          75: '#F5F5F7'
        }
      },
      backgroundColor: {
        gray: {
          75: '#F5F5F7'
        }
      }
    }
  },
  plugins: [tailwindAnimate]
} satisfies Config
