const TableHeader=({name,mail,phone,remove})=>{
    return(
        <thead>
        <tr>
          <th>{name}</th>
          <th>{mail}</th>
          <th>{phone}</th>
          <th>{remove}</th>
        </tr>
      </thead>
    )
}

export default TableHeader