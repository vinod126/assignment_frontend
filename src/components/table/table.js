function TableHead(props) {
  let heads = props.heads;
  return (
    <thead>
      <tr>
        {heads.map((head, i) => (
          <th key={`table_head_${i}`}>{head}</th>
        ))}
      </tr>
    </thead>
  );
}

function TableRow(props) {
  let row = props.row;
  return (
    <tr>
      {row.map((td, i) => (
        <td key={`table_row_${i}`} colSpan={props.colSpan ? props.colSpan : 1}>
          {td}
        </td>
      ))}
    </tr>
  );
}

export { TableHead, TableRow };
