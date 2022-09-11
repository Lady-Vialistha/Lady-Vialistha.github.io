import React from 'react'
interface ChildProps {
    archive:any;
  }
const ArchiveKTP = ({archive}:ChildProps ) =>{
    return (
        <div>
             {archive.length > 0 && archive.map((item:any, key:number) => {
            return <div key={key}>
                 <ul>
                        <li>{item.name}</li>
                        <li>{item.email}</li>
                        <li>{item.telp}</li>
                        <li>{item.ktp}</li>
                    </ul>
            </div>
           })}
        </div>
    )
}
export default ArchiveKTP;