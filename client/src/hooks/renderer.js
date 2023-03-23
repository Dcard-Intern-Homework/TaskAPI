import { useState } from  'react'

export default function useRenderer(){
    const [renderer, setRenderer] = useState(false)
    return [renderer, setRenderer]
}