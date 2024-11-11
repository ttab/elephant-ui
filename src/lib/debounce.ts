export const debounce = (asyncCall: (str: string) => Promise<void>, delay: number) => {
  let timer: ReturnType<typeof setTimeout>

  return (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      asyncCall(value).catch((error) => console.error(error))
    }, delay)
  }
}
