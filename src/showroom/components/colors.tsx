import { useEffect, useState } from 'react'
import { Waves } from 'lucide-react'
import { Header } from '../header'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function ColorsExample(): JSX.Element {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const body = document.querySelector('body')
    if (body) {
      body.className = darkMode ? 'dark' : ''
    }
  }, [darkMode])

  return (
    <>
      <Header>Colours in UI</Header>
      <div className='col-span-2'>
        <div className='cursor-pointer flex items-center gap-2 text-sm' onClick={() => setDarkMode(!darkMode)}>
          <Switch checked={darkMode} />
          <span>Darkmode</span>
        </div>
      </div>

      <div>

        <Alert className='shadow-3xl border-none'>
          <Waves className='h-4 w-4' />
          <AlertTitle>Alert!</AlertTitle>

          <AlertDescription className='flex flex-col gap-6'>
            <Avatar>
              <AvatarImage src='https://github.com/ttab.png' alt='Elephant' />
              <AvatarFallback>TT</AvatarFallback>
            </Avatar>

            <div>
              Place content, the actual text, or description, of this alert in this space where it fits.
            </div>

            <div className='flex gap-3'>
              <Badge>Primary</Badge>
              <Badge variant='secondary'>Secondary</Badge>
              <Badge variant='destructive'>Destructive</Badge>
              <Badge variant='outline'>Outline</Badge>
            </div>

            <div className='flex gap-3'>
              <Input placeholder='Job title' className='' />
              <Select>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Theme' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Col b</TableHead>
              <TableHead>Col c</TableHead>
              <TableHead>Col a</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow data-state='focused'>
              <TableCell>Key A1</TableCell>
              <TableCell>Key A2</TableCell>
              <TableCell>Key A3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Key B1</TableCell>
              <TableCell>Key B2</TableCell>
              <TableCell>Key B3</TableCell>
            </TableRow>
            <TableRow data-state='selected'>
              <TableCell>Key C1</TableCell>
              <TableCell>Key C2</TableCell>
              <TableCell>Key C3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Key D1</TableCell>
              <TableCell>Key D2</TableCell>
              <TableCell>Key D3</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Header>Colours</Header>

      <div className='flex flex-row gap-6 w-full p-4 flex-wrap col-span-2'>
        <div className='flex flex-col gap-8 pb-8'>
          <Color cssVar='background' />
          <Color cssVar='foreground' />
        </div>
        <div className='flex flex-col gap-8 pb-8'>
          <Color cssVar='primary' />
          <Color cssVar='primary-foreground' />
          <Color cssVar='secondary' />
          <Color cssVar='secondary-foreground' />
        </div>
        <div className='flex flex-col gap-8 pb-8'>
          <Color cssVar='input' />
          <Color cssVar='ring' />
          <Color cssVar='border' />
        </div>
        <div className='flex flex-col gap-8 pb-8'>
          <Color cssVar='destructive' />
          <Color cssVar='destructive-foreground' />
          <Color cssVar='muted' />
          <Color cssVar='muted-foreground' />
          <Color cssVar='accent' />
          <Color cssVar='accent-foreground' />
          <Color cssVar='accent2' />
          <Color cssVar='accent2-foreground' />
        </div>
        <div className='flex flex-col gap-8 pb-8'>
          <Color cssVar='popover' />
          <Color cssVar='popover-foreground' />
          <Color cssVar='card' />
          <Color cssVar='card-foreground' />
        </div>
        <div className='flex flex-col gap-8 pb-8'>
          <Color cssVar='table-bg' />
          <Color cssVar='table-bg-focused' />
          <Color cssVar='table-bg-selected' />
        </div>
      </div>
    </>
  )
}


function Color({ cssVar }: {
  cssVar: string
}): JSX.Element {
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue(`--${cssVar}`)

  return (
    <div className='text-center'>
      <div
        className='w-28 h-16 border-4 shadow-3xl'
        style={{
          backgroundColor: bgColor,
          borderColor: bgColor
        }}
      >
      </div>
      <span className='text-xs opacity-60 px-[3px]'>
        {`${cssVar}`}
      </span>
    </div>
  )
}
