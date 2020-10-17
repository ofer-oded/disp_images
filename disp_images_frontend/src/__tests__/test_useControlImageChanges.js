import { renderHook, act } from '@testing-library/react-hooks'
import useControlImageChange from '../hooks/useControlImageChange'

test('should increment counter', () => {
    const {result} = renderHook(() => useControlImageChange(true))
    console.log('result');
  
    expect(result.current).toBe(true)
  })
