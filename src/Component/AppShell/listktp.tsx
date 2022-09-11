import { Button, Input } from '@mantine/core';
import React, {Dispatch, SetStateAction} from 'react'
// import { useLocation } from 'react-router-dom';
interface ChildProps {
    data: any;
    archive:any;
    setData: React.Dispatch<React.SetStateAction<number>>;
    setArchive: React.Dispatch<React.SetStateAction<any>>;
  }
const ListKTP = ({setData, setArchive, archive,  data }: ChildProps) => {
    // const location = useLocation()
    // console.log(location)
const onArchive = (value: any)=>{
    setData(data.filter((item :any) => item !== value))
    setArchive([...archive, value])
}
    return (
        <div>
           {data.length > 0 && data.map((item:any, key:number) => {
            return <div key={key}>
                 <ul>
                        <li>{item.name}</li>
                        <li>{item.email}</li>
                        <li>{item.telp}</li>
                        <li>{item.ktp}</li>
                    </ul>
                    <button onClick={() => onArchive(item)}>archive</button>
            </div>
           })}
        </div>
    )
}
export default ListKTP;