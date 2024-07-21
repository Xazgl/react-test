import { TableCell,TableRow } from '@mui/material';
import { Skeleton } from '@mui/material';

export function  LoadingTable () {

  return (
    <>
          {Array.from(new Array(10)).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton variant="text" /></TableCell>
              <TableCell><Skeleton variant="text" /></TableCell>
              <TableCell><Skeleton variant="text" /></TableCell>
              <TableCell><Skeleton variant="text" /></TableCell>
              <TableCell><Skeleton variant="text" /></TableCell>
            </TableRow>
          ))}
    </>
  );
};

